import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import PageNavigation from './Components/Navigation'
import { Suspense } from "react";
import NavSkeleton from "./Components/NavSkeleton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Partho Mukherjee | Full Stack Web Developer (MERN)",
  description:
    "My personal portfolio website. I'm Partho Mukherjee, a Full Stack Web Developer (MERN) from Dhaka, Bangladesh. Here you can see my skills, projects, and contact details. I build modern, scalable web applications with React, Next.js, Node.js, Express.js, and MongoDB.",
  openGraph: {
    title: "Partho Mukherjee | Full Stack Web Developer (MERN)",
    description:
      "My personal portfolio website. I'm Partho Mukherjee, a Full Stack Web Developer (MERN) from Dhaka, Bangladesh. Here you can see my skills, projects, and contact details.",
    url: "https://my-portfolio-website-orpin-eight.vercel.app/",
    siteName: "Partho Mukherjee — Portfolio",
    type: "website",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#0B0F19]">
        <Suspense fallback={<NavSkeleton/>}>
          <NavBar />
          <main className="flex-1">{children}</main>
          <PageNavigation />
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
