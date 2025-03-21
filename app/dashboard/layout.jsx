


// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { isAuthenticated } from "@/lib/auth";
// import Header from "./components/Header/page";
// import Sidebar from "./components/Sidebar/page";

// const DashboardLayout = ({ children }) => {
//   const router = useRouter();
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       router.push("/auth/login");
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col">
//       {/* Header */}
//       <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
//       <div className="flex flex-1 relative">
//         {/* Sidebar */}
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
//         {/* Main Content - adjusts width based on sidebar state */}
//         <main 
//           className={`flex-1 p-4 transition-all duration-300 ease-in-out ${
//             isSidebarOpen ? "md:ml-72" : "ml-0"
//           }`}
//         >
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




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
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Section */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        {/* Header - Stays at top and adjusts width */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
