"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FiDownload, FiSearch } from "react-icons/fi";
import { toastError } from "@/utils/common/Toast";
import { Event } from "@/utils/types/event";

interface UserRegistration {
    id: string;
    name: string;
    email: string;
    college: string;
    phone?: string; // If available
}

export default function RegistrationsManagement() {
    const { userData } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>("");
    const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
    const [loading, setLoading] = useState(false);
    const [eventsLoading, setEventsLoading] = useState(true);

    useEffect(() => {
        if (userData) fetchEvents();
    }, [userData]);

    useEffect(() => {
        if (selectedEventId) {
            fetchRegistrations(selectedEventId);
        } else {
            setRegistrations([]);
        }
    }, [selectedEventId]);

    const fetchEvents = async () => {
        try {
            setEventsLoading(true);
            let q;
            if (userData?.role === 'superAdmin') {
                q = query(collection(db, "events"));
            } else if (userData?.role === 'admin' && userData?.department) {
                q = query(collection(db, "events"), where("department", "==", userData.department));
            } else {
                setEvents([]);
                setEventsLoading(false);
                return;
            }

            const querySnapshot = await getDocs(q);
            const eventsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Event[];
            
            setEvents(eventsList);
        } catch (error) {
            console.error("Error fetching events:", error);
            // toastError("Failed to fetch events");
        } finally {
            setEventsLoading(false);
        }
    };

    const fetchRegistrations = async (eventId: string) => {
        setLoading(true);
        try {
            // Query registrations collection directly
            const q = query(collection(db, "registrations"), where("eventId", "==", eventId));
            const querySnapshot = await getDocs(q);
            
            const regs = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.leaderName || data.userName || "N/A",
                    email: data.userEmail || "N/A",
                    college: data.leaderCollege || "N/A",
                    phone: data.leaderMobile || "N/A",
                    ...data // Keep other data for export potentially
                };
            }) as UserRegistration[];
            
            setRegistrations(regs);
        } catch (error) {
            console.error("Error fetching registrations:", error);
            toastError("Failed to fetch registrations");
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = () => {
        if (registrations.length === 0) return;

        const eventName = events.find(e => e.id === selectedEventId)?.title || "Event";
        
        // Prepare data for export
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const dataToExport = registrations.map((reg: any) => {
             const base = {
                Name: reg.name,
                Email: reg.email,
                College: reg.college,
                Phone: reg.phone,
                "Transaction ID": reg.transactionId || "N/A",
                "Status": reg.status || "N/A"
             };
             
             // If team members exist, format them string
             if (reg.teamMembers && Array.isArray(reg.teamMembers)) {
                 reg.teamMembers.forEach((m: any, idx: number) => {
                     /* eslint-disable @typescript-eslint/ban-ts-comment */
                     // @ts-ignore
                     base[`Member ${idx + 2} Name`] = m.name;
                     // @ts-ignore
                     base[`Member ${idx + 2} Phone`] = m.mobile;
                 });
             }
             
             return base;
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(wb, ws, "Registrations");
        XLSX.writeFile(wb, `${eventName}_Registrations.xlsx`);
    };

    if (!userData) return null;

    return (
        <div className="text-white max-w-7xl mx-auto">
             <h1 className="text-3xl font-bold mb-8">Registrations</h1>

             <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-2">Select Event</label>
                <div className="relative max-w-xl">
                    <select 
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-indigo-500"
                        disabled={eventsLoading}
                    >
                        <option value="">-- Choose an Event --</option>
                        {events.map(event => (
                            <option key={event.id} value={event.id}>
                                {event.title} ({event.department})
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        ▼
                    </div>
                </div>
             </div>

             {selectedEventId && (
                 <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-gray-800 flex justify-between items-center flex-wrap gap-4">
                        <div>
                            <h2 className="text-xl font-semibold">
                                {events.find(e => e.id === selectedEventId)?.title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {registrations.length} Total Registrations
                            </p>
                        </div>
                        <button 
                            onClick={exportToExcel}
                            disabled={registrations.length === 0}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-emerald-500/20"
                        >
                            <FiDownload /> Export Excel
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-800/50">
                                    <th className="p-4 font-semibold text-gray-400 text-sm whitespace-nowrap">Name</th>
                                    <th className="p-4 font-semibold text-gray-400 text-sm whitespace-nowrap">Email</th>
                                    <th className="p-4 font-semibold text-gray-400 text-sm whitespace-nowrap">College</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-gray-500">
                                            Loading registrations...
                                        </td>
                                    </tr>
                                ) : registrations.length > 0 ? (
                                    registrations.map((reg) => (
                                        <tr key={reg.id} className="hover:bg-gray-800/30">
                                            <td className="p-4 font-medium">{reg.name}</td>
                                            <td className="p-4 text-gray-400">{reg.email}</td>
                                            <td className="p-4 text-gray-400">{reg.college}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-gray-500">
                                            No registrations found for this event.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                 </div>
             )}


        </div>
    );
}
