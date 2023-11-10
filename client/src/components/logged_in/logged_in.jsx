// Dependencies:
import React from 'react';
import {
	ClerkProvider,
	SignedIn,
	// SignedOut,
	// RedirectToSignIn,
	// SignIn,
	// SignUp,
	// UserButton,
} from '@clerk/clerk-react';
// import Button from 'react-bootstrap/Button';
import {
	Route,
	Routes,
	Link,
	useMatch,
	// BrowserRouter,
	useNavigate,
} from 'react-router-dom'; // Import Router and Link

// Styling:
import './logged_in.css';

function LoggedIn() {
	const navigate = useNavigate();
	const isCookRoute = useMatch('/cook');
	const isGoOutRoute = useMatch('/go-out');

	const handleCookClick = () => {
		navigate('/cook');
	};

	const handleGoOutClick = () => {
		navigate('/go-out');
	};

	if (isCookRoute || isGoOutRoute) {
		return null; // Hide the buttons when on /cook or /go-out routes
	}

	return (
		<div className="main-buttons">
			<button className="main-button" onClick={handleCookClick}>
				Cook
			</button>

			<button className="main-button" onClick={handleGoOutClick}>
				Go Out
			</button>
		</div>
	);
}

export default LoggedIn;

/* <Link to="/ai-options" className="main-link">
				<button className="main-button">AI Options</button>
			</Link> */

// const LoggedIn = () => {
// 	const user = useUser();
// 	console.log('User:', user);

// 	return (
// 		<div>
// 			<h2>Authenticated</h2>
// 			{/* Add your content for AI options here */}
// 		</div>
// 	);
// };
