// Dependencies
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Components
// import AIOptions from '../ai_options/ai_options.jsx';

// Styling
import './interests.css'; // You can create this CSS file for styling

const Interests = () => {
	const navigate = useNavigate();
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = () => {
		navigate('/options');
		setSubmitted(true);
	};

	return (
		<div>
			<div className="form-input-container">
				<Form.Control
					as="textarea"
					className="form-input"
					placeholder="What foods are you currently craving?"
				/>
				<Form.Control
					as="textarea"
					className="form-input"
					placeholder="What foods do you currently not want to eat?"
				/>
			</div>
			<div className="submit-button-container">
				<button className="submit-button" onClick={handleSubmit}>
					Submit
				</button>
			</div>
			<h2>Interests Page</h2>
		</div>
	);
};

export default Interests;
