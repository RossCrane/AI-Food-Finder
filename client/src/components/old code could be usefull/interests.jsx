// // Dependencies
// import React, { useState } from 'react';
// import { Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// // Components
// // import AIOptions from '../ai_options/ai_options.jsx';

// // Styling
// import './interests.css'; // You can create this CSS file for styling
// // import { set } from 'mongoose';

// const Interests = () => {
// 	const navigate = useNavigate();
// 	const [submitted, setSubmitted] = useState(false);
// 	const [craving, setCraving] = useState('');
// 	const [notWant, setNotWant] = useState('');
// 	const [message, setMessage] = useState(null);
// 	const [previousChats, setPreviousChats] = useState([]);
// 	const [currentTitle, setCurrentTitle] = useState(null);

// 	// const handleSubmit = () => {
// 	// 	navigate('/options');
// 	// 	setSubmitted(true);
// 	// };

// 	const getOptions = async () => {
// 		const options = {
// 			method: 'POST',
// 			body: JSON.stringify({
// 				// Input here the data you want to send to the server and collect all the info needed so far.
// 				message: craving + ' ' + notWant,
// 			}),
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		};
// 		navigate('/options');
// 		setSubmitted(true);
// 		try {
// 			const response = await fetch(
// 				'http://localhost:5000/completions',
// 				options
// 			);
// 			const data = await response.json();
// 			console.log(data);
// 			setMessage(data.choices[0].message);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 		// Make a GET request to the server to get the options
// 		// return <AIOptions />;
// 	};

// 	// useEffect(() => {
// 	// 	if (!currentTitle && value && message) {
// 	// 		setCurrentTitle(value);
// 	// 	}
// 	// 	if (currentTitle && value && message) {
// 	// 		setPreviousChats((prevChats) => [
// 	// 			...prevChats,
// 	// 			{ title: currentTitle, role: 'user', content: value },
// 	// 			{ title: currentTitle, role: message.role, content: message.content },
// 	// 		]);
// 	// 	}
// 	// }, [message, currentTitle]);

// 	return (
// 		<div>
// 			<div className="form-input-container">
// 				<Form.Control
// 					as="textarea"
// 					className="form-input"
// 					placeholder="What foods are you currently craving?"
// 					value={craving}
// 					onChange={(e) => setCraving(e.target.value)}
// 				/>
// 				<Form.Control
// 					as="textarea"
// 					className="form-input"
// 					placeholder="What foods do you currently not want to eat?"
// 					value={notWant}
// 					onChange={(e) => setNotWant(e.target.value)}
// 				/>
// 			</div>
// 			<div className="submit-button-container">
// 				<button className="submit-button" onClick={getOptions}>
// 					Submit
// 				</button>
// 			</div>
// 			<h2>Interests Page</h2>
// 		</div>
// 	);
// };

// export default Interests;
