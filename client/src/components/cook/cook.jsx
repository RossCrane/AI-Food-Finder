// Dependencies
import React from 'react';
import { Button, Form } from 'react-bootstrap';

// Components
import Interests from '../interests/interests.jsx';

// Styling
import './cook.css';

// change second form to a checkbox of yes or no for if your willing to go to the store
// <Form.Check type="checkbox" label="I am willing to go to the store" />

const Cook = () => {
	return (
		<div>
			<div className="form-input-container">
				<Form.Control
					as="textarea"
					className="form-input"
					placeholder="Enter on hand ingredients here..."
				/>
				<Form.Control
					as="textarea"
					className="form-input"
					placeholder="Input 2"
				/>
			</div>
			<h2>Cook Page</h2>
			<Interests />
		</div>
	);
};

export default Cook;
