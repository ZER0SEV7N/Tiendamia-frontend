"use client";

import { Geist, Geist_Mono, Mulish } from "next/font/google";
import Footer from "@/components/public/Footer";
import SideBar from "@/components/public/SideBar";
import "@/app/globals.css";

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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${mulish.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <SideBar />

        <main className="grow flex flex-col">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
