import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/context/ThemeContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Update metadata globally
export const metadata = {
  title: "Dynamic Dashboard",
  description: "A dynamic dashboard application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> {children}</body>
    </html>
  );
}
