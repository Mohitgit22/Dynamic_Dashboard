// "use client";
// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Eye, EyeOff, Mail, Lock } from "lucide-react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
    
//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       setLoading(false);
//       return;
//     }
    
//     try {
//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       console.log(result);
      
//       if (result?.ok) {
//         router.push("/dashboard");
//       } else {
//         setError("Invalid email or password.");
//         setLoading(false);
//       }


//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
//       {/* Logo or branding element */}
//       <div className="mb-8">
//         <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto">
//           <span className="text-white text-xl font-bold">DB</span>
//         </div>
//       </div>
      
//       <motion.div
//         className="bg-white dark:bg-gray-800 p-8 sm:p-10 shadow-xl rounded-xl w-full max-w-md border border-gray-200 dark:border-gray-700"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Welcome Back</h2>
//         <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Enter your credentials to access your account</p>
        
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm text-center"
//           >
//             {error}
//           </motion.div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail size={18} className="text-gray-500 dark:text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
//               />
//             </div>
//           </div>
          
//           <div className="space-y-1">
//             <div className="flex items-center justify-between">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Password
//               </label>
//               <Link
//                 href="/forgot-password"
//                 className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//               >
//                 Forgot password?
//               </Link>
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock size={18} className="text-gray-500 dark:text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showPassword ? (
//                   <EyeOff size={18} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
//                 ) : (
//                   <Eye size={18} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
//                 )}
//               </button>
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-medium ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Signing in..." : "Sign in"}
//           </button>
//         </form>
        
//         <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
//           <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
//             Don't have an account?{" "}
//             <Link href="/auth/register" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </motion.div>
      
//       <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
//         © 2025 Your Company. All rights reserved.
//       </p>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password) {
            setError("Please enter both email and password.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Store token in localStorage
        localStorage.setItem("token", data.token);

            // Redirect to dashboard on success
            router.push("/dashboard");
        } catch (err) {
            setError(err.message || "An error occurred during login");
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
            <motion.div
                className="bg-white dark:bg-gray-800 p-8 sm:p-10 shadow-xl rounded-xl w-full max-w-md border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Enter your credentials to access your account</p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-500 dark:text-gray-400" />
                            </div>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-500 dark:text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                                ) : (
                                    <Eye size={18} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-medium ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-center">
                        Don't have an account?{" "}
                        <Link href="/auth/register" className="text-blue-dark hover:text-blue-light font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
