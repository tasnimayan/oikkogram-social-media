"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, MessageSquare, Menu, X, Home, Users, Compass, BookMarked, User, Settings, LogOut, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);

  // Handle clicks outside of the profile menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        avatarRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would apply dark mode to the document here
    // document.documentElement.classList.toggle('dark')
  };

  return (
    //fixed top-0 left-0 right-0
    <nav className={` z-50 bg-white border-b border-gray-200 shadow-sm ${isDarkMode ? "dark bg-gray-900 border-gray-700" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className={`ml-2 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>SocialApp</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  isDarkMode ? "text-white border-purple-500" : "text-gray-900 border-purple-500"
                }`}
              >
                <Home className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link
                href="/network"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Users className="h-5 w-5 mr-1" />
                Network
              </Link>
              <Link
                href="/explore"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Compass className="h-5 w-5 mr-1" />
                Explore
              </Link>
              <Link
                href="/bookmarks"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <BookMarked className="h-5 w-5 mr-1" />
                Bookmarks
              </Link>
            </div>
          </div>

          {/* Search, Notifications, Messages, and Profile */}
          <div className="flex items-center">
            {/* Search */}
            <div className="relative mx-2 md:mx-4">
              <div
                className={`relative rounded-full transition-all duration-300 ${
                  searchFocused ? "bg-white w-48 md:w-64 shadow-md" : isDarkMode ? "bg-gray-800 w-9 md:w-40" : "bg-gray-100 w-9 md:w-40"
                }`}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className={`block w-full py-2 pl-10 pr-3 text-sm rounded-full focus:outline-none ${
                    isDarkMode
                      ? "bg-gray-800 text-white placeholder-gray-400 focus:bg-white focus:text-gray-900"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white"
                  }`}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>

            {/* Notifications */}
            <button
              className={`p-2 rounded-full relative ${
                isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Messages */}
            <button
              className={`p-2 rounded-full relative mx-1 ${
                isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="sr-only">View messages</span>
              <MessageSquare className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  ref={avatarRef}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                </button>
              </div>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div
                  ref={profileMenuRef}
                  className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <div className="py-1" role="none">
                    <div className={`px-4 py-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <p className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>John Doe</p>
                      <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>john.doe@example.com</p>
                    </div>

                    <Link
                      href="/profile"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isDarkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      role="menuitem"
                    >
                      <User className="mr-3 h-4 w-4" />
                      Your Profile
                    </Link>

                    <Link
                      href="/settings"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isDarkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      role="menuitem"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>

                    <button
                      onClick={toggleDarkMode}
                      className={`flex w-full items-center px-4 py-2 text-sm ${
                        isDarkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      role="menuitem"
                    >
                      {isDarkMode ? (
                        <>
                          <Sun className="mr-3 h-4 w-4" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="mr-3 h-4 w-4" />
                          Dark Mode
                        </>
                      )}
                    </button>

                    <Link
                      href="/logout"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isDarkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                      role="menuitem"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                }`}
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isDarkMode ? "border-purple-500 text-white bg-gray-800" : "border-purple-500 text-gray-900 bg-purple-50"
              }`}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Home
              </div>
            </Link>

            <Link
              href="/network"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isDarkMode
                  ? "border-transparent text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Network
              </div>
            </Link>

            <Link
              href="/explore"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isDarkMode
                  ? "border-transparent text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center">
                <Compass className="h-5 w-5 mr-2" />
                Explore
              </div>
            </Link>

            <Link
              href="/bookmarks"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isDarkMode
                  ? "border-transparent text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center">
                <BookMarked className="h-5 w-5 mr-2" />
                Bookmarks
              </div>
            </Link>
          </div>

          <div className={`pt-4 pb-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium">
                  JD
                </div>
              </div>
              <div className="ml-3">
                <div className={`text-base font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>John Doe</div>
                <div className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>john.doe@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                href="/profile"
                className={`block px-4 py-2 text-base font-medium ${
                  isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Your Profile
                </div>
              </Link>

              <Link
                href="/settings"
                className={`block px-4 py-2 text-base font-medium ${
                  isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </div>
              </Link>

              <button
                onClick={toggleDarkMode}
                className={`flex w-full px-4 py-2 text-base font-medium ${
                  isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  {isDarkMode ? (
                    <>
                      <Sun className="h-5 w-5 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-2" />
                      Dark Mode
                    </>
                  )}
                </div>
              </button>

              <Link
                href="/logout"
                className={`block px-4 py-2 text-base font-medium ${
                  isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign out
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
