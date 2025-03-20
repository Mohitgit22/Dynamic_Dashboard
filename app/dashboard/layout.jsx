"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Header from "./components/Header/page";
import Sidebar from "./components/Sidebar/page";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
