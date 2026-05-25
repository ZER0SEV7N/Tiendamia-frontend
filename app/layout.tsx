"use client";

import { Geist, Geist_Mono, Mulish } from "next/font/google";
import { usePathname } from "next/navigation"; 
import Footer from "@/components/public/Footer";
import SideBar from "@/components/public/SideBar";
import { AuthProvider } from "@/context/context";
import "./globals.css";

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
  const pathname = usePathname();
  const esPaginaRegistro = pathname === "/registro";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${mulish.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        
        {/* CONDICIONAL PARA EL HEADER / NAVBAR */}
        {esPaginaRegistro ? (
          <header className="w-full bg-[#FF3C3C] py-4 flex justify-center items-center shadow-md shrink-0">
            <div className="flex flex-col items-center cursor-pointer select-none">
              {/* Tipografía idéntica en minúsculas y grosores correspondientes */}
              <span className="text-3xl font-black tracking-tight text-white font-sans lowercase">
                tienda<span className="text-white font-extrabold">mia</span>
              </span>
              {/* La pestaña/línea morada característica debajo de "mia" */}
              <div className="w-14 h-1 bg-[#7000FF] rounded-full -mt-0.5 self-end mr-1" />
            </div>
          </header>
        ) : (
          <SideBar />
        )}

        {/* CONTENEDOR PRINCIPAL */}
        <main className="flex-grow flex flex-col">
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>

        {/* CONDICIONAL PARA EL FOOTER */}
        {esPaginaRegistro ? (
          <footer className="w-full bg-white border-t border-gray-200 py-4 text-center text-xs text-neutral-400 shrink-0">
            © 2014 - 2026 - Tiendamia - Todos los derechos reservados
          </footer>
        ) : (
          <Footer />
        )}

      </body>
    </html>
  );
}