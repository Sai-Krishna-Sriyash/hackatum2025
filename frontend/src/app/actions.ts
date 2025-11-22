"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not logged in");
	}

	const rawData = {
		firstName: formData.get("firstName"),
		lastName: formData.get("lastName"),
		address: formData.get("address"),
		nationality: formData.get("nationality"),
		userId: userId, // We link the data to the Clerk ID
	};

	console.log("Received Data for DB:", rawData);

	// TODO: Here is where you will run:
	// await supabase.from('users').insert(rawData)

	// Once data is saved, send them to the dashboard
	redirect("/");
}
