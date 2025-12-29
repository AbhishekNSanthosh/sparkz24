"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, arrayUnion, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import { toastSuccess, toastError, toastInfo } from "@/utils/common/Toast";
import { Loader2, Smartphone, ExternalLink, AlertCircle, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { events } from "@/utils/constants/Constants";
import Image from "next/image";

export default function Register() {
  const params = useParams();
  const id = params?.id as string;
  const event = events.find((e) => e.id === id);

  const [loading, setLoading] = useState(false);
  // Dynamic form state
  const [formData, setFormData] = useState<Record<string, any>>({
    leaderName: "",
    leaderMobile: "",
    leaderCollege: "",
    leaderDepartment: "",
    leaderYear: "",
    transactionId: "",
  });
  
  // For team events
  const [teamMembers, setTeamMembers] = useState<{name: string, mobile: string}[]>([]);
  
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);
  const [existingRegistrationId, setExistingRegistrationId] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);

  const { user, loading: authLoading, refetchUserProfile } = useAuth();
  const router = useRouter();

  const STORAGE_KEY = `event_registration_${id}`;

  // Check deadline
  useEffect(() => {
    if (!event) return;

    const checkDeadline = () => {
      try {
        if (!event.regFinalDate) return;

        // Parse DD-MM-YYYY
        const [day, month, year] = event.regFinalDate.split("-").map(Number);
        
        let deadline = new Date(year, month - 1, day);
        
        // Add time if available, else end of day
        if (event.RegCloseTime) {
            deadline.setHours(event.RegCloseTime.hours);
            deadline.setMinutes(event.RegCloseTime.minutes);
            deadline.setSeconds(0);
        } else {
            deadline.setHours(23, 59, 59);
        }

        const now = new Date();
        if (now > deadline) {
            setIsRegistrationClosed(true);
        }
      } catch (err) {
        console.error("Error checking deadline:", err);
      }
    };

    checkDeadline();
  }, [event]);

  // Auth check
  useEffect(() => {
    if (!authLoading && !user) {
        toastError("Please login to register");
        router.push(`/events/${id}`);
    }
  }, [user, authLoading, router, id]);

  // Load from Local Storage
  useEffect(() => {
    if (!existingRegistrationId) {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed.formData) setFormData(parsed.formData);
                if (parsed.teamMembers) setTeamMembers(parsed.teamMembers);
            } catch (error) {
                console.error("Failed to parse saved draft:", error);
            }
        }
    }
  }, [existingRegistrationId, STORAGE_KEY]);

  // Save to Local Storage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (!existingRegistrationId) {
             localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, teamMembers }));
        }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData, teamMembers, existingRegistrationId, STORAGE_KEY]);


  // Fetch existing registration
  useEffect(() => {
    const fetchRegistration = async () => {
      if (user && event) {
        try {
          const q = query(
            collection(db, "registrations"), 
            where("eventId", "==", event.id),
            where("userId", "==", user.uid),
            limit(1)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            setExistingRegistrationId(docSnap.id);
            
            // Populate form with existing data
            const loadedData = { ...data };
            // Remove meta fields if they shouldn't be in form state
            delete loadedData.eventId;
            delete loadedData.userId;
            delete loadedData.createdAt;
            delete loadedData.updatedAt;
            
            // Separate team members if exists
            if (loadedData.teamMembers && Array.isArray(loadedData.teamMembers)) {
                setTeamMembers(loadedData.teamMembers);
                delete loadedData.teamMembers;
            }
            
            setFormData(loadedData);
            setAcknowledged(true);
            toastInfo("Loaded your existing registration.");
          }
        } catch (error) {
          console.error("Error fetching registration:", error);
        }
      }
    };

    if (!authLoading && user) {
        fetchRegistration();
    }
  }, [user, authLoading, event]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    if (!event) return;
    const max = event.memberMaxCount || 0;
    // Current total = leader + members. 
    // If leader counts as 1 member, then teamMembers.length should be < max - 1
    if (teamMembers.length + 1 < max) {
        setTeamMembers([...teamMembers, { name: "", mobile: "" }]);
    } else {
        toastError(`Maximum team size is ${max}`);
    }
  };

  const removeTeamMember = (index: number) => {
    const updated = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !user) return;
    
    // Validation
    const min = event.memberMinCount || 1;
    const max = event.memberMaxCount || 1;
    const currentCount = 1 + teamMembers.length; // Leader + members
    
    if (event.eveType === 'team') {
      if (currentCount < min) {
          toastError(`Minimum team size is ${min} (including leader)`);
          return;
      }
      if (currentCount > max) {
          toastError(`Maximum team size is ${max} (including leader)`);
          return;
      }
    }

    setLoading(true);

    try {
      const registrationData = {
        eventId: event.id,
        eventTitle: event.title,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || formData.leaderName,
        ...formData,
        teamMembers: event.eveType === 'team' ? teamMembers : [], // Ensure no members for individual events
        updatedAt: new Date()
      };

      if (existingRegistrationId) {
          // Update
          await updateDoc(doc(db, "registrations", existingRegistrationId), registrationData);
          toastSuccess("Registration updated!");
      } else {
          // Create
          await addDoc(collection(db, "registrations"), {
              ...registrationData,
              status: "pending", // Payment status
              createdAt: new Date()
          });

          // Update user profile
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
              registeredEvents: arrayUnion(event.title) // Or ID, sticking to title as per abheri
          });
          await refetchUserProfile();
          
          toastSuccess("Registered successfully!");
      }
      
      localStorage.removeItem(STORAGE_KEY);
      
      if (!existingRegistrationId) {
         router.push('/events'); // Or stay and show success state
      }

    } catch (error) {
      console.error("Registration error:", error);
      toastError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <div className="min-h-screen flex items-center justify-center text-white">Event not found</div>;

  const upiLink = event.upi1 ? `upi://pay?pa=${event.upi1}&pn=Sparkz24&tn=${encodeURIComponent(`${event.title} Reg`)}` : "#";
  const amount = event.registrationFee;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 flex items-center justify-center font-sans relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
                        {event.title} Registration
                    </h1>
                     <p className="text-gray-400 mt-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date: {event.date}
                    </p>
                </div>
                {isRegistrationClosed && (
                    <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-5 h-5" />
                        Registration Closed
                    </div>
                )}
            </div>

            {isRegistrationClosed && !existingRegistrationId ? (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-300">Registration for this event is currently closed.</p>
                    <Link href="/events" className="inline-block mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        Browse other events
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Leader Details */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-purple-300 border-b border-white/10 pb-2">
                            {event.eveType === 'team' ? "Team Leader Details" : "Participant Details"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Name <span className="text-red-500">*</span></label>
                                <input required type="text" name="leaderName" value={formData.leaderName} onChange={handleInputChange} placeholder="Full Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Mobile <span className="text-red-500">*</span></label>
                                <input required type="tel" name="leaderMobile" value={formData.leaderMobile} onChange={handleInputChange} placeholder="Mobile Number" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">College <span className="text-red-500">*</span></label>
                                <input required type="text" name="leaderCollege" value={formData.leaderCollege} onChange={handleInputChange} placeholder="College Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" />
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Department/Year <span className="text-red-500">*</span></label>
                                <input required type="text" name="leaderDepartment" value={formData.leaderDepartment} onChange={handleInputChange} placeholder="e.g. CSE S5" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Team Members */}
                    {event.eveType === 'team' && (
                        <div className="space-y-4">
                             <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <h3 className="text-xl font-semibold text-purple-300">Team Members</h3>
                                <div className="text-sm text-gray-400">
                                    Size: {teamMembers.length + 1} / {event.memberMaxCount} (Min: {event.memberMinCount})
                                </div>
                            </div>
                            
                            {teamMembers.map((member, idx) => (
                                <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3 relative group">
                                     <button type="button" onClick={() => removeTeamMember(idx)} className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input required type="text" placeholder={`Member ${idx + 2} Name`} value={member.name} onChange={(e) => handleTeamMemberChange(idx, 'name', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500/50 outline-none" />
                                        <input required type="tel" placeholder={`Member ${idx + 2} Mobile`} value={member.mobile} onChange={(e) => handleTeamMemberChange(idx, 'mobile', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500/50 outline-none" />
                                    </div>
                                </div>
                            ))}

                            {teamMembers.length + 1 < (event.memberMaxCount || 99) && (
                                <button type="button" onClick={addTeamMember} className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-purple-500/50 hover:text-purple-300 transition-all font-medium">
                                    + Add Team Member
                                </button>
                            )}
                        </div>
                    )}

                    {/* Extra Fields */}
                    {event.requiresExtraData && event.extraFields && (
                         <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-purple-300 border-b border-white/10 pb-2">Additional Information</h3>
                            <div className="grid grid-cols-1 gap-5">
                                {event.extraFields.map((field) => (
                                    <div key={field.name} className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">{field.name} <span className="text-red-500">*</span></label>
                                        <input required type={field.type || "text"} name={field.name} value={formData[field.name] || ""} onChange={handleInputChange} placeholder={`Enter ${field.name}`} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Payment Section */}
                    {event.registrationFee && event.registrationFee !== "0" && (
                         <div className="space-y-6 pt-4">
                            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                Payment Details (Fee: ₹{event.registrationFee})
                            </h3>
                             <div className="flex flex-col items-center justify-center gap-4 bg-black/40 border border-white/10 p-6 rounded-xl">
                                  {/* Using a placeholder or the abheri QR logic if generic QR not available. 
                                      Since specific QRs aren't provided in event types, using UPI link mainly. 
                                      If there's a generic QR for common pool, we could use it. 
                                      For now, sticking to UPI intent + manual Trx ID. 
                                  */}
                                  
                                  <a href={upiLink} className="w-full max-w-sm flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                        <Smartphone className="w-6 h-6" />
                                      </div>
                                      <div className="text-left">
                                        <div className="font-bold text-white group-hover:text-purple-300 text-sm transition-colors">Pay via UPI App</div>
                                        <div className="text-xs text-gray-400">{event.upi1 ? "Tap to pay" : "UPI ID not available"}</div>
                                      </div>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                  </a>

                                  {event.upi1 && (
                                     <div className="text-sm text-gray-400 font-mono bg-black/50 px-3 py-1 rounded">
                                        UPI ID: {event.upi1}
                                     </div>
                                  )}
                             </div>

                             <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Transaction ID / Reference No <span className="text-red-500">*</span></label>
                                <input required type="text" name="transactionId" value={formData.transactionId} onChange={handleInputChange} placeholder="Enter UPI Transaction ID" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 outline-none font-mono" />
                             </div>
                         </div>
                    )}

                    {/* Acknowledgement */}
                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <input id="ack" type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 bg-black/40 border-white/10 cursor-pointer" />
                        <label htmlFor="ack" className="text-sm text-gray-300 cursor-pointer select-none">
                            I confirm that the details provided are accurate and I agree to the event rules.
                        </label>
                    </div>

                    <button type="submit" disabled={loading || !acknowledged} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg disabled:grayscale">
                        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : existingRegistrationId ? "Update Registration" : "Confirm Registration"}
                    </button>
                </form>
            )}
        </div>
    </div>
  );
}