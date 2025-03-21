"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import jwt from "jsonwebtoken";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
            try {
                const decoded = jwt.decode(token);
                setUser(decoded);
            } catch (error) {
                console.error("Error decoding token:", error);
                setUser(null);
                router.push("/auth/login");
            }
        } else {
            router.push("/auth/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/auth/login");
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-30">
            <div className="flex items-center gap-3">
                <button 
                    onClick={toggleSidebar} 
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    <Menu size={20} />
                </button>
                <div className="hidden md:flex items-center gap-2">
                    {/* Replace with your actual logo */}
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                        D
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
                </div>
                <h1 className="md:hidden text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
            </div>

            {user ? (
                <div className="relative">
                    <button 
                        onClick={toggleProfileMenu}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <User size={16} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="hidden sm:block text-left">
                            {user.name && <div className="font-medium">{user.name}</div>}
                            {user.email && <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">{user.email}</div>}
                        </div>
                        <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
                    </button>

                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-40 border border-gray-200 dark:border-gray-700">
                            <div className="px-4 py-2 sm:hidden">
                                {user.name && <div className="font-medium">{user.name}</div>}
                                {user.email && <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</div>}
                            </div>
                            <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 my-1"></div>
                            <a href="/dashboard/Profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Profile
                            </a>
                            <a href="/dashboard/SettingsPage" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Settings
                            </a>
                            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                            <button 
                                onClick={handleLogout} 
                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center">
                    <a href="/auth/login" className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        Sign In
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;