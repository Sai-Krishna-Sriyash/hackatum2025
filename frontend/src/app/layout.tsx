"use client";
import { useState } from "react";

import LayoutHeader from "@/components/layout/LayoutHeader";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { usePathname } from "next/navigation";

const rubik = Rubik({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-rubik",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname(); // 2. Get current URL

	// 3. Define which pages should NOT have the header
	const isAuthPage =
		pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || pathname.startsWith("/onboarding");

	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${rubik.variable} w-full font-sans min-h-screen flex flex-col`}>
					{!isAuthPage && <LayoutHeader />}

					<main className="flex-1">{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
