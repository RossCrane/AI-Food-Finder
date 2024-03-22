'use strict';

// gpt-4-0125-preview

const User = require('../models/usermodel');

const API_KEY = process.env.OPENAI_API_KEY;

// Helper Functions

async function callOpenAI(prompt) {
	const url = `https://api.openai.com/v1/chat/completions`; // Correct endpoint for chat completions.
	console.log('Prompt:', prompt);

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${API_KEY}`, // Ensure your API_KEY is correctly set up.
			},
			body: JSON.stringify({
				model: 'gpt-4-0125-preview', // Confirm this is the correct model identifier.
				messages: [
					// Note the use of 'messages' instead of 'message'
					{
						role: 'system',
						content: 'You are a food specialized food assistant.',
					},
					{ role: 'user', content: prompt },
				],
				max_tokens: 800,
			}),
		});

		if (!response.ok) {
			console.error('Response Status:', response.status);
			const errorBody = await response.text();
			console.error('Response Body:', errorBody);
			throw new Error(`HTTP Error: ${response.statusText}`);
		}
		return await response.json();
	} catch (error) {
		console.error('There was a problem with your fetch operation:', error);
		throw error;
	}
}

function constructPrompt(type, details, userPreferences) {
	const { ingredients, craving, notWant, countryName, stateName, cityName } =
		details;
	const { diets, allergies } = userPreferences || {};

	// Basic prompt parts that depend on the request type
	const basicPrompt = {
		cook: `I am hungry and looking to cook. I have ${
			ingredients || 'some ingredients'
		} on hand.`,
		'go out': `I am hungry and looking to go out. My location is ${cityName}, ${stateName}, ${countryName}.`,
	};

	// Additional instructions specific to cooking or going out
	const helperText =
		type === 'cook'
			? `Please provide me with five recipes descriptions that I can cook with the ingredients I have. Assume I have most household essentials. Remove any leading or additional text, only returning the recipes.`
			: `Please provide me with five restaurant options that I can go to with a few details. Remove any leading or additional text, only returning the restaurants.`;

	// Conditional parts based on user preferences or input
	const cravingText = craving ? ` I am craving ${craving}.` : '';
	const notWantText = notWant ? ` I do not want ${notWant}.` : '';
	const dietsText = diets ? ` I am on a ${diets} diet.` : '';
	const allergiesText = allergies ? ` I am allergic to ${allergies}.` : '';

	const aiDirectivesText =
		' I understand that your data can be out of date, just give me the best options you can.';

	// Construct the full prompt
	return `${basicPrompt[type]}${cravingText}${notWantText}${dietsText}${allergiesText} ${helperText}${aiDirectivesText}`;
}

const getCookingOptions = async (req, res) => {
	const details = { ...req.body };
	let userPreferences = null;

	if (req.body.clerkUserId) {
		const user = await User.findOne({ clerkUserId: req.body.clerkUserId });
		if (user) {
			userPreferences = { diets: user.diets, allergies: user.allergies };
		}
	}

	const prompt = constructPrompt('cook', details, userPreferences);

	try {
		const data = await callOpenAI(prompt);
		res.json(data);
	} catch (error) {
		res.status(500).send('Error fetching cooking options');
	}
};

const getGoingOutOptions = async (req, res) => {
	const details = { ...req.body };
	let userPreferences = null;

	if (req.body.clerkUserId) {
		const user = await User.findOne({ clerkUserId: req.body.clerkUserId });
		if (user) {
			userPreferences = { diets: user.diets, allergies: user.allergies };
		}
	}

	const prompt = constructPrompt('go out', details, userPreferences);

	try {
		const data = await callOpenAI(prompt);
		res.json(data);
	} catch (error) {
		res.status(500).send('Error fetching going out options');
	}
};

async function getDetailsOfAiOption(req, res) {
	const { AiOption } = req.body; // Extract the AiOption directly

	try {
		// Construct the prompt here in the backend
		const prompt = `Can you give me more details for ${AiOption}?`;
		const data = await callOpenAI(prompt);

		res.json(data);
	} catch (error) {
		console.error('Error fetching details:', error);
		res
			.status(500)
			.send({ error: 'Failed to fetch details from the AI service.' });
	}
}

const getOptions = async (req, res) => {};

const updateUserPreferences = async (req, res) => {
	try {
		// console.log('Request Body:', req.body);
		const { clerkUserId, emailAddress, allergies, diets } = req.body;

		// Find the user by Clerk user ID and update their preferences
		const updatedUser = await User.findOneAndUpdate(
			{ clerkUserId: clerkUserId },
			{
				$set: {
					emailAddress: emailAddress,
					allergies: allergies,
					diets: diets,
				},
			},
			{ new: true, upsert: true }
		);

		if (!updatedUser) {
			console.log('User not found');
			return res.status(404).json({ error: 'User not found' });
		}

		// console.log('Updated User:', updatedUser);

		res.json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getUserPreferences = async (req, res) => {
	try {
		const { clerkUserId } = req.query;
		// console.log('Clerk User ID:', clerkUserId);

		if (!clerkUserId) {
			return res.status(400).json({ error: 'Clerk user ID is required' });
		}

		const user = await User.findOne({ clerkUserId: clerkUserId });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Send back the user's allergies and diets
		res.json({ allergies: user.allergies, diets: user.diets });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// TEST image reading

//What ingredients are in this image?

// async function callOpenAIWithImage(base64Image) {
// 	const url = `https://api.openai.com/v1/chat/completions`;

// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${API_KEY}`, // Make sure API_KEY is defined in your environment variables
// 			},
// 			body: JSON.stringify({
// 				model: 'gpt-4-vision-preview',
// 				messages: [
// 					{
// 						role: 'system',
// 						content: 'You are a helpful assistant.',
// 					},
// 					{
// 						role: 'user',
// 						content: [
// 							{ type: 'text', text: 'What ingredients are in this image?' },
// 							{ type: 'image', data: base64Image },
// 						],
// 					},
// 				],
// 				max_tokens: 300,
// 			}),
// 		});

// 		if (!response.ok) {
// 			console.error('Response Status:', response.status);
// 			const errorBody = await response.text();
// 			console.error('Response Body:', errorBody);
// 			throw new Error(`HTTP Error: ${response.statusText}`);
// 		}
// 		return await response.json();
// 	} catch (error) {
// 		console.error('There was a problem with your fetch operation:', error);
// 		throw error;
// 	}
// }

// // This function handles the image processing request
// async function analyzeImage(req, res) {
// 	// Assuming `req.body.image` contains the base64 encoded image string
// 	const { image: base64Image } = req.body;

// 	if (!base64Image) {
// 		return res.status(400).send('No image data provided.');
// 	}

// 	try {
// 		const data = await callOpenAIWithImage(base64Image);
// 		res.json(data);
// 	} catch (error) {
// 		console.error('Error processing image with OpenAI:', error);
// 		res.status(500).send('Failed to process the image with OpenAI.');
// 	}
// }

// const { exec } = require('child_process');
// const path = require('path');

// // Assuming `req` is the request object that contains the image encoded in base64 within its body
// async function analyzeImage(req) {
// 	// Assuming the base64 image data is sent in the request body under the key "image"
// 	const base64Image = req.body.image; // Make sure to extract the base64 string correctly from the request

// 	console.log(base64Image); // This should now log the actual base64 string, not the request object

// 	return new Promise((resolve, reject) => {
// 		const scriptPath = path.join(__dirname, 'image_controller.py'); // Adjust the path as necessary
// 		const command = `python "${scriptPath}" '${base64Image}'`;

// 		exec(command, (error, stdout, stderr) => {
// 			if (error) {
// 				console.error(`exec error: ${error}`);
// 				reject(error);
// 				return;
// 			}
// 			if (stderr) {
// 				console.error(`stderr: ${stderr}`);
// 				reject(new Error(stderr));
// 				return;
// 			}
// 			console.log(`stdout: ${stdout}`);
// 			resolve(stdout); // Assuming stdout contains the response we want to send back
// 		});
// 	});
// }

// Usage example
// analyzeImage(yourBase64ImageStringHere)
// 	.then((result) => console.log(result))
// 	.catch((error) => console.error(error));

module.exports = {
	getOptions,
	getCookingOptions,
	getGoingOutOptions,
	getDetailsOfAiOption,
	updateUserPreferences,
	getUserPreferences,
	// TEST image reading
	// callOpenAIWithImage,
	// analyzeImage,
};
