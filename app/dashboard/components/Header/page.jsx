"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="bg-black dark:bg-black dark:text-white shadow-md p-4 flex justify-between items-center md:px-6">
      {/* Sidebar Toggle Icon on the Left */}
      <button onClick={toggleSidebar} className="text-gray-600 dark:text-white text-xl">
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;