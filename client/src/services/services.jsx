export const getCookingOptions = async (
	clerkUserId,
	{ ingredients, craving, notWant }
) => {
	console.log('cooking options called in services/frontend');
	try {
		const response = await fetch('http://localhost:5000/get-cooking-options', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				clerkUserId, // Pass this as null or undefined if user is not logged in
				ingredients,
				craving,
				notWant,
			}),
		});

		if (!response.ok) throw new Error(`HTTP Error: ${response.statusText}`);
		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

export const getGoOutOptions = async (clerkUserId, details) => {
	const payload = {
		clerkUserId, // It's okay if this is null or undefined
		...details, // Spread operator to include countryName, stateName, cityName, craving, notWant
	};

	try {
		const response = await fetch(
			'http://localhost:5000/get-going-out-options',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) {
			// Log more detailed error info for debugging
			console.error(`HTTP Error: ${response.status} ${response.statusText}`);
			const errorBody = await response.text(); // Assuming error details are in text format
			console.error('Error Body:', errorBody);
			throw new Error('Failed to fetch going out options.');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching going out options:', error);
		throw new Error('Error fetching going out options.'); // Rethrowing a generic error for consumer handling
	}
};

export const getDetailsOfAiOption = async (AiOption) => {
	const options = {
		method: 'POST',
		body: JSON.stringify({ AiOption }), // Just send the AiOption
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch('http://localhost:5000/details', options);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching details:', error);
		throw error; // It's good practice to throw the error so the caller can handle it
	}
};

export const analyzeImageWithBase64 = async (base64Image) => {
	try {
		const response = await fetch('http://localhost:5000/analyze-image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ image: base64Image }),
		});

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error sending image for analysis:', error);
		throw error;
	}
};

export const submitUserPreferences = async (
	clerkUserId,
	primaryEmailAddress,
	allergies,
	diets
) => {
	try {
		const response = await fetch('http://localhost:5000/user/preferences', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				clerkUserId,
				emailAddress: primaryEmailAddress,
				allergies,
				diets,
			}),
		});

		if (response.ok) {
			return await response.json();
		} else {
			throw new Error(`HTTP Error: ${response.statusText}`);
		}
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
