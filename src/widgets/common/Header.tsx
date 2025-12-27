"use client";
import { navItems } from "@/utils/constants/Constants";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#04050b]/90 backdrop-blur-lg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(79,70,229,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.12),transparent_35%)] opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(79,70,229,0.1),transparent_50%),linear-gradient(240deg,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:flex-nowrap sm:gap-6 sm:px-6 sm:py-5">
          {/* Left nav - Desktop Only */}
          <div className="hidden flex-1 items-center gap-4 text-sm text-white/80 sm:flex sm:gap-6">
            {navItems?.slice(0, 2).map((item, index) => (
              <Link
                key={index}
                href={item?.to}
                className="rounded-full border border-transparent px-3 py-2 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                {item?.title}
              </Link>
            ))}
          </div>

          {/* Brand - Centered in Desktop */}
          <div className="flex flex-[1.2] items-center justify-start sm:justify-center">
            <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/90 shadow-[0_10px_40px_rgba(79,70,229,0.25)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-xl font-bold">
                Sparkz{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-fuchsia-300 to-amber-200 animate-[pulse_7s_ease-in-out_infinite]">
                  &apos;25
                </span>
              </h1>
            </div>
          </div>

          {/* Right nav + CTA - Desktop Only */}
          <div className="hidden flex-1 items-center justify-end gap-4 text-sm text-white/80 sm:flex">
            {navItems?.slice(2, 4).map((item, index) => (
              <Link
                key={index}
                href={item?.to}
                className="rounded-full border border-transparent px-3 py-2 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                {item?.title}
              </Link>
            ))}
            <Link
              href={"/login"}
              className="inline-flex overflow-hidden items-center justify-center bg-linear-to-r from-indigo-500 via-fuchsia-500 to-amber-400 gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:from-indigo-600 hover:via-fuchsia-600 hover:to-amber-500 hover:scale-[1.02] active:scale-95"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-[#04050b]/95 backdrop-blur-lg transition-all duration-300 ease-in-out sm:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          {/* Brand in Menu */}
          {/* <div className="mb-12">
            <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white/90 shadow-[0_10px_40px_rgba(79,70,229,0.25)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-2xl font-bold">
                Sparkz{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-amber-200">
                  &apos;25
                </span>
              </h1>
            </div>
          </div> */}

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
            {navItems?.map((item, index) => (
              <Link
                key={index}
                href={item?.to}
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-4 text-lg font-medium text-white/90 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-[1.02]"
              >
                {item?.title}
              </Link>
            ))}

            {/* Mobile CTA Button */}
            <Link
              href={"/login"}
              onClick={() => setIsMenuOpen(false)}
              className="w-full mt-6 py-4 text-lg font-semibold text-white rounded-2xl bg-linear-to-r from-indigo-500 via-fuchsia-500 to-amber-400 hover:from-indigo-600 hover:via-fuchsia-600 hover:to-amber-500 transition-all hover:scale-[1.02] active:scale-95"
            >
              Login
            </Link>

            {/* Close Hint */}
            {/* <p className="mt-8 text-sm text-white/50">Tap anywhere to close</p> */}
          </nav>
        </div>
      </div>
    </>
  );
}
