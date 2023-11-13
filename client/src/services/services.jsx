export const getOptions = async (ingredients, craving, notWant) => {
	const cravingText = craving ? ` I am craving ${craving}` : '';
	const notWantText = notWant ? ` and I do not want ${notWant}` : '';

	const options = {
		method: 'POST',
		body: JSON.stringify({
			// Input here the data you want to send to the server and collect all the info needed so far.
			message: `I am hungry and looking to cook. I have ${ingredients} on hand.${cravingText}${notWantText} Please provide me with five options and no additional text before or after. I understand that your data can be out of date, just give me the best options you can.`,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch('http://localhost:5000/completions', options);
		const data = await response.json();
		console.log(data);
		return data;
		// setMessage(data.choices[0].message);
	} catch (error) {
		console.log(error);
	}
	// Make a GET request to the server to get the options
	// return <AIOptions />;
};

export const getDetailedRecipe = async (recipeTitle) => {
	const options = {
		method: 'POST',
		body: JSON.stringify({
			message: `Can you give me more details for ${recipeTitle}?`,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch('http://localhost:5000/completions', options);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const getGoOutOptions = async (
	countryName,
	stateName,
	cityName,
	craving,
	notWant
) => {
	const cravingText = craving ? ` I am craving ${craving}` : '';
	const notWantText = notWant ? ` and I do not want ${notWant}` : '';

	const options = {
		method: 'POST',
		body: JSON.stringify({
			message: `I am hungry and looking to go out to a restaurant. My location is ${countryName}, ${stateName}, ${cityName}.${cravingText}${notWantText} Please provide me with five options and remove the preface text before the five options. I understand that your data can be out of date, just give me the best options you can.`,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch('http://localhost:5000/completions', options);
		const data = await response.json();
		console.log(data);
		return data;
		// setMessage(data.choices[0].message);
	} catch (error) {
		console.log(error);
	}
	// Make a GET request to the server to get the options
	// return <AIOptions />;
};

// useEffect(() => {
// 	if (!currentTitle && value && message) {
// 		setCurrentTitle(value);
// 	}
// 	if (currentTitle && value && message) {
// 		setPreviousChats((prevChats) => [
// 			...prevChats,
// 			{ title: currentTitle, role: 'user', content: value },
// 			{ title: currentTitle, role: message.role, content: message.content },
// 		]);
// 	}
// }, [message, currentTitle]);
