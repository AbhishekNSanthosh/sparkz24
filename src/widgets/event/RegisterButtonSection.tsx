"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CountdownTimer from "@/widgets/event/CountdownTimer";
import { events } from "@/utils/constants/Constants";
import parseDate from "@/utils/parseDate";
import {
  FaClock,
  FaArrowLeft,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

interface Props {
  eventId: string;
}

const RegisterButtonSection: React.FC<Props> = ({ eventId }) => {
  const [registrationsByEvent, setRegistrationsByEvent] = useState<
    Record<string, number>
  >({});
  const [loading, setLoading] = useState(true);

  const event = events.find((e) => e.id === eventId);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setRegistrationsByEvent({ "just-imagine": 12, "code-battle": 5 });
      setLoading(false);
    };
    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="relative rounded-2xl border border-white/10 bg-linear-to-br from-gray-900/50 to-gray-800/30 p-6 backdrop-blur-xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-white/10 rounded-lg"></div>
          <div className="h-32 bg-white/5 rounded-xl"></div>
          <div className="flex gap-4">
            <div className="h-12 flex-1 bg-white/10 rounded-full"></div>
            <div className="h-12 w-32 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const isOpenForRegistration =
    event?.regFinalDate &&
    parseDate(
      event.regFinalDate,
      event.RegCloseTime?.hours,
      event.RegCloseTime?.minutes
    ) >= new Date() &&
    (typeof event.maxParticipation !== "undefined"
      ? registrationsByEvent[event.id] <
        Number(
          event.maxParticipation
            .replace(/Teams?/i, "")
            .replace(/Participants?/i, "")
            .trim()
        )
      : true);

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5 rounded-3xl blur-3xl" />

      <div className="relative rounded-3xl border border-white/10 bg-linear-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-2xl overflow-hidden">
        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Countdown Timer Section */}
          {isOpenForRegistration && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaClock className="text-amber-400 text-xl" />
                <h3 className="text-lg font-semibold text-white">
                  Registration closes in
                </h3>
              </div>
              <div className="">
                <CountdownTimer
                  targetDate={event!.regFinalDate}
                  RegCloseTime={event!.RegCloseTime}
                />
              </div>
            </div>
          )}
          {/* Registration Closed State */}
          {!isOpenForRegistration && (
            <div className="rounded-2xl border border-white/10 bg-linear-to-br from-gray-800/50 to-gray-900/50 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-gray-700 to-gray-800 mb-4">
                <FaLock className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Registration Closed
              </h3>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                The registration period for this event has ended. Check out our
                other exciting events!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4">
            {isOpenForRegistration ? (
              <div className="space-y-4">
                <Link
                  href={`./${eventId}/register`}
                  className="group opacity-50 pointer-events-none relative flex items-center justify-center gap-3 w-full rounded-xl bg-linear-to-r from-indigo-600 via-fuchsia-600 to-amber-500 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_2rem_-0.5rem_#4f46e5]"
                >
                  <span className="text-lg font-bold text-white">
                    Starting Soon
                  </span>
                  <FaArrowRight className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ) : (
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-linear-to-r from-gray-800 to-gray-900 px-8 py-4 font-medium text-white hover:from-gray-700 hover:to-gray-800 transition-all w-full"
              >
                <FaArrowLeft />
                <span>Explore Other Events</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterButtonSection;
