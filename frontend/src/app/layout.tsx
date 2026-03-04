import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "MediAI — Emergency Triage Assistant",
  description: "AI-powered multilingual medical triage with auto hospital booking. Supports English, Hindi, Telugu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased bg-black text-slate-100 min-h-screen font-sans`}>
        {children}
      </body>
    </html>
  );
}
