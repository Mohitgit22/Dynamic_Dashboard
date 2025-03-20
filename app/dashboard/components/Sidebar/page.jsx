"use client";
import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react"; // Close icon

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 w-64 bg-black h-screen p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Close Icon */}
      <button onClick={toggleSidebar} className="text-white text-xl absolute top-4 right-4">
        <X size={24} />
      </button>

      {/* Navigation Links */}
      <nav className="space-y-4 mt-10">
        <Link href="/dashboard" className="block p-2 text-gray-100 hover:bg-gray-900 rounded">
          Dashboard
        </Link>
        <Link href="/dashboard/SettingsPage" className="block p-2 text-gray-100 hover:bg-gray-900 rounded">
           Settings
        </Link>
        <Link href="/dashboard/Profile" className="block p-2 text-gray-100 hover:bg-gray-900 rounded">
           Profile
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
