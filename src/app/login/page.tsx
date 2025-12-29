"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { toastError, toastSuccess } from "@/utils/common/Toast";

export default function Page() {
  const { user, login } = useAuth();

  const handleLoginClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await login();
      toastSuccess("Successfully logged in!");
    } catch (error) {
      toastError("Failed to login.");
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg font-medium text-green-400">
          You’re already logged in ✅
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10">
    

        <p className="text-gray-400 text-center mb-8">
          Login
        </p>

        <button
          onClick={handleLoginClick}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl
                     bg-white/10 border border-white/10
                     hover:bg-white/20 transition-all
                     font-semibold text-white
                     active:scale-[0.98]"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          We use Google only for authentication. No spam, ever.
        </p>
      </div>
    </div>
  );
}
