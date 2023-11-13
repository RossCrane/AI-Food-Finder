// Dependencies
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const navigate = useNavigate();
	const [allergies, setAllergies] = useState('');
	const [diets, setDiets] = useState('');

	// Testing
	// // const user = useUser();
	// // console.log(user);

	const { user, isLoaded, isSignedIn } = useUser();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log('submitting form and navigate to protected page in the future');
		navigate('/protected');

		if (!isLoaded || !isSignedIn) {
			console.error('User data is not fully loaded or user is not signed in.');
			return;
		}

		// Now you can safely access the user's data
		const clerkUserId = user.id;
		const primaryEmailAddress = user.primaryEmailAddress?.emailAddress;

		if (!primaryEmailAddress) {
			console.error('Primary email address is not available.');
			return;
		}

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
				const result = await response.json();
				// console.log('Success:', result);
				return result;
			} else {
				// Handle HTTP errors
				console.error('HTTP Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<div>
				<div className="form-input-container">
					<textarea
						className="form-input"
						placeholder="Do you have any allergies?"
						value={allergies}
						onChange={(e) => setAllergies(e.target.value)}
					/>
					<textarea
						className="form-input"
						placeholder="Are you on any diets?"
						value={diets}
						onChange={(e) => setDiets(e.target.value)}
					/>
				</div>
			</div>
			<div className="submit-button-container">
				<button className="submit-button" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Profile;
