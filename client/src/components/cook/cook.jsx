import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { useUser } from '@clerk/clerk-react';
import {
	getCookingOptions,
	analyzeImageWithBase64,
} from '../../services/services'; // Import the new service function

import './cook.css';

const Cook = () => {
	const navigate = useNavigate();
	const [submitted, setSubmitted] = useState(false);
	const [formState, setFormState] = useState({
		craving: '',
		notWant: '',
		ingredients: '',
	});
	const [image, setImage] = useState(null); // New state for managing the image

	const { user } = useUser();
	const { setApiResponse } = useAppContext();

	const handleFormStateChange = (e) => {
		setFormState((prevFormState) => ({
			...prevFormState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file); // Update the state with the selected file
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (submitted) return;
		setSubmitted(true);

		// New block to handle image conversion and submission
		if (image) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				try {
					// Now using the base64 result to call analyzeImageWithBase64
					const base64 = reader.result;
					const imageData = await analyzeImageWithBase64(base64); // This function should exist in your services
					console.log(imageData); // Log or use the response as needed
					setApiResponse(imageData); // Assuming you want to handle the image analysis response similarly
					navigate('/options');
				} catch (error) {
					console.error('Error analyzing image:', error);
				}
			};
			reader.readAsDataURL(image);
		} else {
			// Existing logic for handling form submission without an image
			const clerkUserId = user?.id || null;
			try {
				const data = await getCookingOptions(clerkUserId, formState);
				if (data) {
					setApiResponse(data);
					navigate('/options');
				}
			} catch (error) {
				console.error('Error fetching cooking options:', error);
			}
		}
		setSubmitted(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<div className="form-input-container">
					{/* <input type="file" onChange={handleImageChange} accept="image/*" /> */}
					<textarea
						className="form-input"
						placeholder="Enter on hand ingredients here..."
						value={formState.ingredients}
						name="ingredients"
						onChange={handleFormStateChange}
					/>
				</div>
				<div>
					<div className="form-input-container">
						<textarea
							className="form-input"
							placeholder="What foods are you currently craving?"
							value={formState.craving}
							name="craving"
							onChange={handleFormStateChange}
						/>
						<textarea
							className="form-input"
							placeholder="What foods do you currently not want to eat?"
							value={formState.notWant}
							name="notWant"
							onChange={handleFormStateChange}
						/>
					</div>
				</div>
				<div className="submit-button-container">
					<button type="submit" className="submit-button" disabled={submitted}>
						{submitted ? 'Loading...' : 'Submit'}
					</button>
				</div>
			</div>
		</form>
	);
};

export default Cook;
