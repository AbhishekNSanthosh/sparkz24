"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import { toastSuccess, toastError } from "@/utils/common/Toast";
import { Loader2, Smartphone, ExternalLink, Copy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/utils/firebase";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bandName: "",
    collegeName: "",
    managerName: "",
    managerMobile: "",
    leaderName: "",
    leaderMobile: "",
    musiciansCount: "",
    vocalistCount: "",
    instrumentalistCount: "",
    transactionId: "",
  });

  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customInstrument, setCustomInstrument] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [existingRegistrationId, setExistingRegistrationId] = useState<
    string | null
  >(null);

  // TODO: Replace with actual UPI ID
  const UPI_ID = "jacsjjacobnellickal-1@oksbi";
  const transactionNote = `Abheri Registration ${
    formData.bandName ? `- ${formData.bandName}` : ""
  }`;
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Sparkz24&tn=${encodeURIComponent(
    transactionNote
  )}`;

  const predefinedInstruments = ["Keyboard", "Guitar", "Bass Guitar", "Drums"];

  const STORAGE_KEY = "abheri_registration_form";

  // Load from local storage on mount
  useEffect(() => {
    // Only load from local storage if we haven't already loaded an existing registration
    if (!existingRegistrationId) {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(parsed.formData);
          setSelectedInstruments(parsed.selectedInstruments);
        } catch (error) {
          toastError("Failed to load saved data.");
        }
      }
    }
  }, [existingRegistrationId]);

  const { user, loading: authLoading, refetchUserProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      toastError("Please login to register for Abheri");
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch existing registration
  useEffect(() => {
    const fetchRegistration = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, "abheri_registrations"),
            where("userId", "==", user.uid),
            limit(1)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            setExistingRegistrationId(docSnap.id);
            setFormData({
              bandName: data.bandName || "",
              collegeName: data.collegeName || "",
              managerName: data.managerName || "",
              managerMobile: data.managerMobile || "",
              leaderName: data.leaderName || "",
              leaderMobile: data.leaderMobile || "",
              musiciansCount: data.musiciansCount || "",
              vocalistCount: data.vocalistCount || "",
              instrumentalistCount: data.instrumentalistCount || "",
              transactionId: data.transactionId || "",
            });
            setSelectedInstruments(data.instruments || []);
            setScreenshotUrl(data.screenshotUrl || null);
            setAcknowledged(true); // Assuming if they registered, they acknowledged
            toastSuccess("Loaded your existing registration.");
          }
        } catch (error) {
          toastError("Failed to fetch existing registration.");
        }
      }
    };

    if (!authLoading && user) {
      fetchRegistration();
    }
  }, [user, authLoading]);

  // Save to local storage with debounce
  useEffect(() => {
    // Don't overwrite local storage with fetched data, only user edits
    // But simpliest approach is to just save current state
    const timeoutId = setTimeout(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData,
          selectedInstruments,
        })
      );
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [formData, selectedInstruments]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addInstrument = (instrument: string) => {
    if (!selectedInstruments.includes(instrument)) {
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };

  const removeInstrument = (instrument: string) => {
    setSelectedInstruments(selectedInstruments.filter((i) => i !== instrument));
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "Other") {
      setIsAddingCustom(true);
      // Reset select value visually if needed, though we act immediately
      e.target.value = "";
    } else if (value) {
      addInstrument(value);
      e.target.value = ""; // Reset dropdown
    }
  };

  const handleAddCustom = (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent
  ) => {
    e.preventDefault(); // Prevent form submission if triggered by enter key in form context
    if (customInstrument.trim()) {
      addInstrument(customInstrument.trim());
      setCustomInstrument("");
      setIsAddingCustom(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toastError("File size should be less than 5MB");
        return;
      }

      // Start background upload
      setUploading(true);
      setUploadProgress(0);
      setPaymentScreenshot(file); // Keep for display name or logic, though we upload immediately

      const storageRef = ref(
        storage,
        `abheri_payment_screenshots/${Date.now()}_${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          toastError("Upload failed. Please try again.");
          setUploading(false);
          setPaymentScreenshot(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setScreenshotUrl(downloadURL);
            setUploading(false);
            toastSuccess("Screenshot uploaded successfully!");
          });
        }
      );
    }
  };

  const handleDeleteFile = async () => {
    // If we have a URL, trying to delete it from storage would be clean
    if (screenshotUrl) {
      try {
        const fileRef = ref(storage, screenshotUrl);
        await deleteObject(fileRef);
        toastSuccess("File removed.");
      } catch (error) {
        console.error("Delete error", error);
        // Ignore error, maybe it was already gone or typical permission issue?
        // Just clear UI state.
      }
    }
    setPaymentScreenshot(null);
    setScreenshotUrl(null);
    setUploading(false);
    setUploadProgress(0);
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    toastSuccess("UPI ID copied to clipboard!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!acknowledged) {
        toastError("Please agree to the rules and regulations.");
        setLoading(false);
        return;
      }

      // Basic Fields Validation
      const requiredFields = [
        { key: "bandName", label: "Band Name" },
        { key: "collegeName", label: "College Name" },
        { key: "managerName", label: "Manager Name" },
        { key: "managerMobile", label: "Manager Mobile" },
        { key: "leaderName", label: "Leader Name" },
        { key: "leaderMobile", label: "Leader Mobile" },
        { key: "transactionId", label: "Transaction ID" },
      ];

      for (const field of requiredFields) {
        if (!formData[field.key as keyof typeof formData]) {
          toastError(`${field.label} is required`);
          setLoading(false);
          return;
        }
      }

      // Logic Validation: Check member counts
      const totalMembers = parseInt(formData.musiciansCount) || 0;
      const vocalists = parseInt(formData.vocalistCount) || 0;
      const instrumentalists = parseInt(formData.instrumentalistCount) || 0;

      if (totalMembers < 5) {
        toastError("Total Members must be at least 5");
        setLoading(false);
        return;
      }
      if (vocalists < 2) {
        toastError("Vocalists must be at least 2");
        setLoading(false);
        return;
      }
      if (instrumentalists < 3) {
        toastError("Instrumentalists must be at least 3");
        setLoading(false);
        return;
      }

      if (vocalists + instrumentalists > totalMembers) {
        toastError(
          `Total members (${totalMembers}) cannot be less than sum of vocalists and instrumentalists (${
            vocalists + instrumentalists
          })`
        );
        setLoading(false);
        return;
      }

      // Allow a small buffer? Or strict equality?
      // Usually Total = Vocalists + Instrumentalists.
      // Sometimes there are non-musical members? "Manager" is separate.
      // Let's enforce strictly or leniently? The form says "Musicians count".
      // Vocalist + Instrumentalist = Musicians.
      if (vocalists + instrumentalists !== totalMembers) {
        toastError(
          `Sum of vocalists and instrumentalists must equal total musicians count.`
        );
        setLoading(false);
        return;
      }

      if (uploading) {
        toastError("Please wait for the screenshot upload to complete.");
        setLoading(false);
        return;
      }

      if (!screenshotUrl) {
        toastError("Please upload the payment screenshot");
        setLoading(false);
        return;
      }

      // Check for duplicate Transaction ID
      const transactionQuery = query(
        collection(db, "abheri_registrations"),
        where("transactionId", "==", formData.transactionId),
        limit(1)
      );
      const transactionSnapshot = await getDocs(transactionQuery);

      if (!transactionSnapshot.empty) {
        // If we are updating, allow same ID if it belongs to this registration
        const existingDoc = transactionSnapshot.docs[0];
        if (
          existingRegistrationId &&
          existingDoc.id === existingRegistrationId
        ) {
          // It's our own ID, proceed
        } else {
          toastError("This Transaction ID has already been used.");
          setLoading(false);
          return;
        }
      }

      const registrationData = {
        ...formData,
        instruments: selectedInstruments,
        screenshotUrl: screenshotUrl,
        // Only set createdAt on new docs, maybe updatedAt on updates?
        // createdAt: new Date(),
        userId: user?.uid,
        userEmail: user?.email,
        updatedAt: new Date(),
      };

      if (existingRegistrationId) {
        // Update existing
        await updateDoc(
          doc(db, "abheri_registrations", existingRegistrationId),
          registrationData
        );
        toastSuccess("Registration updated successfully!");
      } else {
        // Create new
        await addDoc(collection(db, "abheri_registrations"), {
          ...registrationData,
          createdAt: new Date(),
        });

        if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            registeredEvents: arrayUnion("Abheri Battle of Bands"),
          });
          await refetchUserProfile();
        }
        toastSuccess("Registration successful!");
      }

      localStorage.removeItem(STORAGE_KEY); // Clear saved data on success

      // If creating new, reset form. If updating, usually we keep the data there.
      if (!existingRegistrationId) {
        setFormData({
          bandName: "",
          collegeName: "",
          managerName: "",
          managerMobile: "",
          leaderName: "",
          leaderMobile: "",
          musiciansCount: "",
          vocalistCount: "",
          instrumentalistCount: "",
          transactionId: "",
        });
        setSelectedInstruments([]);
        setIsAddingCustom(false);
        setCustomInstrument("");
        setAcknowledged(false);
        router.push("/abheri");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toastError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 flex items-center justify-center font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
          Abheri Registration
        </h1>
        <p className="text-gray-400 mb-8">
          Register your band for the ultimate musical showdown.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Band Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="bandName"
                value={formData.bandName}
                onChange={handleChange}
                placeholder="Enter band name"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                College Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Enter college name"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Contact Person/Manager <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                placeholder="Manager name"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Manager Mobile No <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="tel"
                name="managerMobile"
                value={formData.managerMobile}
                onChange={handleChange}
                placeholder="Mobile number"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Band Leader <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="leaderName"
                value={formData.leaderName}
                onChange={handleChange}
                placeholder="Leader name"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Leader Mobile No <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="tel"
                name="leaderMobile"
                value={formData.leaderMobile}
                onChange={handleChange}
                placeholder="Mobile number"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div className="h-px bg-white/10 my-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Total Members
              </label>
              <input
                type="number"
                name="musiciansCount"
                value={formData.musiciansCount}
                onChange={handleChange}
                placeholder="0"
                min="5"
                max="10"
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all no-spinner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                No of Vocalists
              </label>
              <input
                type="number"
                name="vocalistCount"
                value={formData.vocalistCount}
                onChange={handleChange}
                placeholder="0"
                min="2"
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all no-spinner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                No of Instrumentalists
              </label>
              <input
                type="number"
                name="instrumentalistCount"
                value={formData.instrumentalistCount}
                onChange={handleChange}
                placeholder="0"
                min="3"
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full bg-black/40 border appearance-none border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all no-spinner"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">
              Expected instruments on stage
            </label>

            {/* Selected Instruments Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedInstruments.map((inst, index) => (
                <div
                  key={index}
                  className="flex items-center bg-purple-600/20 border border-purple-500/50 px-3 py-1 rounded-full text-purple-200 text-sm animate-fade-in"
                >
                  <span>{inst}</span>
                  <button
                    type="button"
                    onClick={() => removeInstrument(inst)}
                    className="ml-2 hover:text-white focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Selection Input */}
            {!isAddingCustom ? (
              <div className="relative">
                <select
                  onChange={handleDropdownChange}
                  className="w-full bg-black/90 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an instrument...
                  </option>
                  {predefinedInstruments
                    .filter((i) => !selectedInstruments.includes(i))
                    .map((inst) => (
                      <option key={inst} value={inst}>
                        {inst}
                      </option>
                    ))}
                  <option value="Other">Other (Add Custom)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 animate-fade-in">
                <input
                  type="text"
                  value={customInstrument}
                  onChange={(e) => setCustomInstrument(e.target.value)}
                  placeholder="Type instrument name..."
                  autoFocus
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustom(e);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCustom}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCustom(false);
                    setCustomInstrument("");
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="bg-white/10" />

          {/* Payment Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
              Payment Details
            </h3>

            <div className="flex flex-col items-center justify-center gap-4 bg-black/40 border border-white/10 p-6 sm:p-8 rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gpay.jpeg"
                alt="Payment QR Code"
                className="w-auto h-90 sm:h-100 object-contain rounded-lg border border-white/20"
              />

              <a
                href={upiLink}
                className="w-full flex md:hidden items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white group-hover:text-purple-300 text-sm transition-colors">
                      Pay via UPI App
                    </div>
                    {/* <div className="text-xs text-gray-400">Tap to open GPay, PhonePe, Paytm</div> */}
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              <button
                type="button"
                onClick={handleCopyUPI}
                className="w-full flex md:hidden items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 gap-3 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                    <Copy className="w-5 h-5" />
                  </div>
                  <div className="text-left min-w-0 overflow-hidden flex-1">
                    <div className="font-bold text-white group-hover:text-blue-300 text-sm transition-colors truncate">
                      Copy UPI ID
                    </div>
                    <div className="text-xs text-gray-400 truncate font-mono text-[10px] sm:text-xs">
                      {UPI_ID}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter UPI transaction ID"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Payment Screenshot <span className="text-red-500">*</span>
              </label>
              <div className="w-full bg-black/40 border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                {paymentScreenshot || screenshotUrl ? (
                  <div className="relative w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        paymentScreenshot
                          ? URL.createObjectURL(paymentScreenshot)
                          : screenshotUrl!
                      }
                      alt="Payment Screenshot"
                      className={`w-full h-auto max-h-64 object-contain rounded-lg border border-white/20 ${
                        uploading ? "opacity-50" : ""
                      }`}
                    />

                    {uploading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg backdrop-blur-sm p-4">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-2" />
                        <div className="w-full max-w-[200px] h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-300 mt-2 font-medium">
                          {Math.round(uploadProgress)}% Uploading...
                        </p>
                      </div>
                    )}

                    {!uploading && (
                      <button
                        type="button"
                        onClick={handleDeleteFile}
                        className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    )}

                    <p className="text-center text-xs text-gray-400 mt-2">
                      {paymentScreenshot
                        ? paymentScreenshot.name
                        : "Uploaded Screenshot"}
                    </p>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="screenshot-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full py-8 border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-lg transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        <svg
                          className="w-6 h-6 text-gray-400 group-hover:text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300 font-medium">
                        Click to upload screenshot
                      </span>
                      <span className="text-xs text-gray-500">
                        JPG, PNG up to 5MB
                      </span>
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <input
              id="acknowledgement"
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 bg-black/40 border-white/10 cursor-pointer"
            />
            <label
              htmlFor="acknowledgement"
              className="text-sm text-gray-300 cursor-pointer select-none"
            >
              I have read and agree to the{" "}
              <Link
                href="/abheri#rules"
                target="_blank"
                className="text-purple-400 hover:text-purple-300 underline font-semibold"
              >
                rules and regulations
              </Link>
              . I understand that my team is responsible for adhering to these
              guidelines.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 disabled:grayscale"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : existingRegistrationId ? (
              "Update Registration"
            ) : (
              "Register Band"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
