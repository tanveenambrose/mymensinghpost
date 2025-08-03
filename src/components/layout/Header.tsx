'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from '@/providers/ThemeProvider';
import { FiMenu, FiX, FiSun, FiMoon, FiSearch, FiUser } from 'react-icons/fi';

const categories = [
  { name: 'সর্বশেষ', slug: 'latest' },
  { name: 'জাতীয়', slug: 'national' },
  { name: 'রাজনৈতিক', slug: 'politics' },
  { name: 'অর্থনীতি', slug: 'economy' },
  { name: 'আন্তর্জাতিক', slug: 'international' },
  { name: 'সারাদেশ', slug: 'country' },
  { name: 'খেলা', slug: 'sports' },
  { name: 'বিনোদন', slug: 'entertainment' },
  { name: 'ভ্রমণ', slug: 'travel' },
  { name: 'আপলোড', slug: 'submit-news' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className={`w-full ${isScrolled ? 'sticky top-0 z-50 shadow-md' : ''}`}>
      {/* Top bar - Empty now as we moved controls to logo section */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Logo section */}
      <div className="bg-[var(--background)] py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              MymensinghPost
            </h1>
          </Link>
          
          {/* Search, Dark Mode, and Login Options - Middle Section */}
          <div className="hidden md:flex items-center space-x-4 text-[var(--foreground)]">
            <button
              onClick={toggleSearch}
              className="p-1 rounded-full hover:bg-[var(--card)] dark:hover:bg-[var(--card-foreground)] transition-colors"
              aria-label="Search"
              title="Search button"
            >
              <FiSearch size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full hover:bg-[var(--card)] dark:hover:bg-[var(--card-foreground)] transition-colors"
              aria-label="Toggle theme"
              title="Toggle theme button"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            {session ? (
              <div className="relative group">
                <button title="User menu" className="flex items-center space-x-1 p-1 rounded-full hover:bg-[var(--card)] dark:hover:bg-[var(--card-foreground)] transition-colors">
                  <FiUser size={20} />
                  <span className="text-sm">{session.user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  {session.user && typeof session.user === 'object' && 'role' in session.user && (session.user as { role?: string }).role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-[var(--card-foreground)] hover:bg-[var(--background)] dark:hover:bg-[var(--foreground)]"
                    >
                      ড্যাশবোর্ড
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-[var(--card-foreground)] hover:bg-[var(--background)] dark:hover:bg-[var(--foreground)]"
                  >
                    লগ আউট
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm hover:underline flex items-center text-[var(--foreground)]"
              >
                <FiUser size={20} className="mr-1" />
                লগইন
              </Link>
            )}
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:flex items-center text-[var(--foreground)] text-sm font-medium border-l pl-4 border-[var(--border)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date().toLocaleDateString('bn-BD', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#0a3d62] dark:bg-black text-white hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between py-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={category.slug === 'submit-news' ? '/submit-news' : `/category/${category.slug}`}
                  className="text-white hover:text-gray-200 font-medium"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={category.slug === 'submit-news' ? '/submit-news' : `/category/${category.slug}`}
                    className="block text-gray-800 hover:text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Mobile menu controls */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleSearch}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                    aria-label="Search"
                  >
                    <FiSearch size={20} className="mr-2" />
                    <span>অনুসন্ধান</span>
                  </button>
                  
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? 
                      <>
                        <FiSun size={20} className="mr-2" />
                        <span>লাইট মোড</span>
                      </> : 
                      <>
                        <FiMoon size={20} className="mr-2" />
                        <span>ডার্ক মোড</span>
                      </>
                    }
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                {session ? (
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <FiUser size={20} className="mr-2" />
                      <span>{session.user?.name}</span>
                    </div>
                    {session.user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        ড্যাশবোর্ড
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full p-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      লগ আউট
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser size={20} className="mr-2" />
                    লগইন
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">অনুসন্ধান করুন</h2>
              <button
                onClick={toggleSearch}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <FiX size={24} className="text-gray-600" />
              </button>
            </div>
            <form className="flex">
              <input
                type="text"
                placeholder="আপনি কি খুঁজছেন?"
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-r-md hover:bg-primary/90 transition-colors"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;