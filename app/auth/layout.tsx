"use client";

import { Geist, Geist_Mono, Mulish } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${mulish.className} h-full antialiased`}
    >
      <body className="h-screen w-screen flex flex-col bg-gray-50">
        <header className="w-full bg-[#FF4141] py-4 px-6 flex justify-center items-center shadow-sm shrink-0">
          <Link
            href="/"
            className="flex flex-col items-center cursor-pointer select-none shrink-0"
          >
            <span className="text-2xl font-black tracking-tight text-white font-sans">
              tienda<span className="text-white font-extrabold">mia</span>
            </span>
            <div className="w-14 h-1 bg-[#7000FF] rounded-full -mt-1 self-end mr-1" />
          </Link>
        </header>

        <main className="grow flex flex-col justify-center items-center px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
