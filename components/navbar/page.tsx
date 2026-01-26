'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from '../../public/logo.png';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      <nav 
        className={`flex w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-sm py-4 border-b border-gray-200 fixed top-0' 
            : 'bg-white/40 backdrop-blur-md py-6 fixed top-0'
        }`}
      >
        <div className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center">
          {/* Logo */}
          <div className="flex shrink-0">
            <Link href="/" className="group">
              <Image 
                src={logo} 
                alt="Windsor Materials" 
                width={180} 
                height={60}
                className="h-12 w-auto transition-opacity group-hover:opacity-80"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <div className="flex items-center space-x-12">
              <Link
                href="/collections"
                className="text-sm tracking-widest uppercase transition-colors text-[#243b64] hover:text-[#dda01e] font-bold"
              >
                Collections
              </Link>
              <Link
                href="/products"
                className="text-sm tracking-widest uppercase transition-colors text-[#243b64] hover:text-[#dda01e] font-bold"
              >
                Products
              </Link>
              <Link
                href="/custom-orders"
                className="text-sm tracking-widest uppercase transition-colors text-[#243b64] hover:text-[#dda01e] font-bold"
              >
                Custom Orders
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors text-[#243b64]"
            >
              <span className="sr-only">Menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="flex flex-col w-full bg-white border-b border-gray-100 py-4 px-4 shadow-xl md:hidden fixed top-24 z-40">
          <div className="flex flex-col space-y-4">
            <Link
              href="/collections"
              className="text-[#243b64] text-lg font-bold hover:text-[#dda01e] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/products"
              className="text-[#243b64] text-lg font-bold hover:text-[#dda01e] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/custom-orders"
              className="text-[#243b64] text-lg font-bold hover:text-[#dda01e] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
