// Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

// Components

// Services
import { getOptions } from '../../services/services';

// Styling
import './cook.css';

const Cook = () => {
	const navigate = useNavigate();
	const [submitted, setSubmitted] = useState(false);
	const [craving, setCraving] = useState('');
	const [notWant, setNotWant] = useState('');
	const [ingredients, setIngredients] = useState('');
	// const [message, setMessage] = useState(null);
	// const [previousChats, setPreviousChats] = useState([]);
	// const [currentTitle, setCurrentTitle] = useState(null);

	const { setApiResponse } = useAppContext();

	const handleSubmit = async () => {
		setSubmitted(true);
		const data = await getOptions(ingredients, craving, notWant);
		if (data) {
			setApiResponse(data);
			navigate('/options');
		}
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
				<button className="submit-button" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Cook;
