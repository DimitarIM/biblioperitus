import type { Metadata } from "next";
import { Marcellus } from "next/font/google";
import "./globals.css";
import { BookContextProvider } from "@/context/useBookContext";
import { ProfileContextProvider } from "@/context/useProfileContext";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets:["latin"],
  weight: "400"
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
