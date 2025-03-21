"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, LayoutDashboard, Settings, User, LogOut, Menu, ChevronRight } from "lucide-react";
import jwt from "jsonwebtoken";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (token) {
      try {
        const decoded = jwt.decode(token);
        console.log("Decoded JWT payload:", decoded);
        setUser(decoded); // Store user details from JWT payload
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    } else {
      console.log("No token found");
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <>
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 w-72 bg-gray-900 h-screen z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-xl flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">DB</span>
            </div>
            <h1 className="text-white font-bold text-xl">Dashboard</h1>
          </div>
          <button 
            onClick={toggleSidebar} 
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <div className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main
          </div>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/dashboard" 
                className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors ${
                  activeItem === "Dashboard" ? "bg-gray-800 text-white" : ""
                }`}
                onClick={() => setActiveItem("Dashboard")}
              >
                <LayoutDashboard size={18} className="mr-3" />
                <span>Dashboard</span>
                <ChevronRight size={16} className="ml-auto text-gray-600" />
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/SettingsPage" 
                className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors ${
                  activeItem === "Settings" ? "bg-gray-800 text-white" : ""
                }`}
                onClick={() => setActiveItem("Settings")}
              >
                <Settings size={18} className="mr-3" />
                <span>Settings</span>
                <ChevronRight size={16} className="ml-auto text-gray-600" />
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/Profile" 
                className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors ${
                  activeItem === "Profile" ? "bg-gray-800 text-white" : ""
                }`}
                onClick={() => setActiveItem("Profile")}
              >
                <User size={18} className="mr-3" />
                <span>Profile</span>
                <ChevronRight size={16} className="ml-auto text-gray-600" />
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Footer - User Details & Logout */}
        <div className="p-4 border-t border-gray-800">
          {user ? (
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user.name ? user.name.charAt(0) : "U"}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user.name || "User"}</p>
                  <p className="text-xs text-gray-400">{user.email || "No email"}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-red-500 hover:text-white transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Not Logged In</p>
          )}
        </div>
      </aside>

      {/* Mobile menu toggle button */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed z-20 bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
