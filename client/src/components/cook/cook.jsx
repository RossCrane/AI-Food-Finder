// Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import { useUser } from '@clerk/clerk-react';

// Components

// Services
import { getOptions } from '../../services/services';

// Styling
import './cook.css';

const Cook = () => {
	const navigate = useNavigate();

	// State
	const [submitted, setSubmitted] = useState(false);
	const [craving, setCraving] = useState('');
	const [notWant, setNotWant] = useState('');
	const [ingredients, setIngredients] = useState('');

	//Clerk
	const { user, isLoaded, isSignedIn } = useUser();

	// Context
	const { setApiResponse } = useAppContext();

	const handleSubmit = async () => {
		if (submitted) return;
		setSubmitted(true);

		if (!isLoaded || !isSignedIn) {
			console.error('User data is not fully loaded or user is not signed in.');
			return;
		}

		const clerkUserId = user.id;

		const data = await getOptions(clerkUserId, ingredients, craving, notWant);
		if (data) {
			setApiResponse(data);
			navigate('/options');
		}
		setSubmitted(false);
	};

	return (
		<div>
			<div className="form-input-container">
				<textarea
					className="form-input"
					placeholder="Enter on hand ingredients here..."
					value={ingredients}
					onChange={(e) => setIngredients(e.target.value)}
				/>
			</div>
			<div>
				<div className="form-input-container">
					<textarea
						className="form-input"
						placeholder="What foods are you currently craving?"
						value={craving}
						onChange={(e) => setCraving(e.target.value)}
					/>
					<textarea
						className="form-input"
						placeholder="What foods do you currently not want to eat?"
						value={notWant}
						onChange={(e) => setNotWant(e.target.value)}
					/>
				</div>
			</div>
			<div className="submit-button-container">
				<button
					className="submit-button"
					onClick={handleSubmit}
					disabled={submitted}
				>
					{submitted ? 'Loading...' : 'Submit'}
				</button>
			</div>
		</div>
	);
};

export default Cook;
