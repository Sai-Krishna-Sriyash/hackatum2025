"use client";
import { useState } from "react";

import LayoutHeader from "@/components/layout/LayoutHeader";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

const rubik = Rubik({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-rubik",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${rubik.variable} w-full font-sans min-h-screen flex flex-col`}>
					{/* TOP HEADER */}

					<LayoutHeader />

					{/* Main Content Area */}
					<div className="flex-1 relative z-0 w-full min-h-screen">{children}</div>
				</body>
			</html>
		</ClerkProvider>
	);
}