import type { Metadata } from "next";
import { Marcellus, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BookContextProvider } from "@/store/useBookContext";
import { ProfileContextProvider } from "@/store/useProfileContext";
import Navbar from "@/components/Navbar";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets:["latin"],
  weight: "400"
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biblioperitus",
  description: "Application to find your books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${marcellus.variable} antialiased`}
      >
          <ProfileContextProvider>
            <BookContextProvider>
              {children}
            </BookContextProvider>
          </ProfileContextProvider>
      </body>
    </html>
  );
}
