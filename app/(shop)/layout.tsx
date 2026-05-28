"use client";

import { Geist, Geist_Mono, Mulish } from "next/font/google";
import Footer from "@/components/public/Footer";
import NavBar from "@/components/public/NavBar";
import { AuthProvider } from "@/context/context";
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
        <main className="grow flex flex-col">
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
        </main>

        <Footer />
      </body>
    </html>
  );
}
