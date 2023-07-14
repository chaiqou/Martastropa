import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "../lib/utils";
import Navbar from "../components/Navbar";
import { Toaster } from "../components/ui/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Martastropa",
  description: "Generated by Martastropa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
      lang="en"
    >
      <body className="min-h-screen antialiased pt-12 bg-slate-50">
        <Navbar />
        <main className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </main>

        <Toaster />
      </body>
    </html>
  );
}
