"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="bg-white dark:bg-gray-800 dark:text-white shadow-md p-4 flex justify-between items-center md:px-6">
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
