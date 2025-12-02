import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"
import { ClerkProvider } from "@clerk/nextjs";


const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stamina Labs",
  description: "AI Teaching Platform for Personalized Learning Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="fijlxhgxBZmHouzyiGo4NwfsBWsrWr_c9QcOHGeftoo" />
        
      </head>
      
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{ }}>
        <Navbar />
        {children}
        </ClerkProvider>
        </body>
    </html>
  );
}
