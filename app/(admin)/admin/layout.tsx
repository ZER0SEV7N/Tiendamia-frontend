import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/context/context";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel de Tiendamia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("flex flex-col gap-6 font-['Mulish',_sans-serif]")}
    >
      <body className="font-sans min-h-full flex flex-col antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
