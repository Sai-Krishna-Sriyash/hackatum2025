"use client";

import { useUser } from "@clerk/nextjs";
import { completeOnboarding } from "../actions";

// Fixed list of nationalities to choose from (for now)
const nationalities = {
	"AU": "Australia",
	"BR": "Brazil",
	"CA": "Canada",
	"CN": "China",
	"DE": "Germany",
	"EG": "Egypt",
	"ES": "Spain",
	"FR": "France",
	"GB": "United Kingdom",
	"ID": "Indonesia",
	"IN": "India",
	"IT": "Italy",
	"JP": "Japan",
	"KR": "South Korea",
	"MX": "Mexico",
	"NG": "Nigeria",
	"RU": "Russia",
	"SA": "Saudi Arabia",
	"TR": "Turkey",
	"US": "United States",
};

export default function OnboardingPage() {
	const { user } = useUser();

	return (
		<div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
			<h1 className="text-2xl font-bold mb-4">Complete your Profile</h1>
			<p className="mb-4 text-gray-600">
				Welcome, {user?.primaryEmailAddress?.emailAddress}! We just need a few more details.
			</p>

			{/* Form action calls the Server Action completeOnboarding */}
			<form action={completeOnboarding} className="flex flex-col gap-4">
				<div className="flex gap-4">
					<input name="firstName" placeholder="First Name" required className="border p-2 rounded w-full" />
					<input name="lastName" placeholder="Last Name" required className="border p-2 rounded w-full" />
				</div>

				<input name="address" placeholder="Full Address" required className="border p-2 rounded" />

				<select name="nationality" required className="border p-2 rounded bg-white">
					<option value="" disabled selected>
						Select Nationality
					</option>
					{Object.entries(nationalities).map(([shortForm, longForm]) => (
						<option key={shortForm} value={shortForm}>
							{longForm}
						</option>
					))}
				</select>

				<button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
					Save & Continue
				</button>
			</form>
		</div>
	);
}
