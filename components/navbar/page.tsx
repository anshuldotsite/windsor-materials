"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../../public/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="w-full bg-white/80 backdrop-blur-sm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Title */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src={logo}
                  alt="Windsor Materials"
                  width={140}
                  height={48}
                  className="h-10 w-auto"
                  priority
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-md font-semibold text-[#243b64]">
                    Windsor Materials and Retail Supply
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/collections"
                className="text-sm uppercase tracking-wider text-[#243b64] hover:text-[#dda01e] font-medium"
              >
                Collections
              </Link>
              <Link
                href="/custom-orders"
                className="text-sm uppercase tracking-wider text-[#243b64] hover:text-[#dda01e] font-medium"
              >
                Custom Orders
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#243b64]"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link
              href="/collections"
              className="text-[#243b64] text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/custom-orders"
              className="text-[#243b64] text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Orders
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
