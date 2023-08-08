import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "../lib/utils";
import Navbar from "../components/shared/Navbar";
import { Toaster } from "../components/ui/Toaster";
import Providers from "../components/shared/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit",
  description: "Generated by Reddit",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
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
        <Providers>
          {/* @ts-expect-error-server-component */}
          <Navbar />
          {authModal}
          <main className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </main>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
