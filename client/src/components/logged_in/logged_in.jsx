// Dependencies:
import React, { useEffect } from 'react';
import {
	useUser,
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
//import { useEffect } from 'react';

function LoggedIn() {
	const navigate = useNavigate();
	const isCookRoute = useMatch('/cook');
	const isGoOutRoute = useMatch('/go-out');
	const { isSignedIn, user, isLoaded } = useUser();

	const tuser = useUser();
	console.log(tuser);

	useEffect(() => {
		if (isLoaded && isSignedIn) {
			// User data is loaded and user is signed in
			const emailAddress = user.primaryEmailAddress?.emailAddress;
			const userId = user.id;
			if (emailAddress) {
				console.log("User's email address:", emailAddress);
				// Here you can store the email address or send it to the backend
			}
		}
	}, [isLoaded, isSignedIn, user]);

	const handleCookClick = () => {
		// setMessage(null);
		// setValue('');
		// setCurrentTitle(null);
		navigate('/cook');
	};

	const handleGoOutClick = () => {
		// setMessage(null);
		// setValue('');
		// setCurrentTitle(null);
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

// const user = useUser();
// console.log(user);
// const emailAddress = user ? user.primaryEmailAddress.emailAddress : null;
// console.log(emailAddress);

// const user = useUser();
// //console.log(user);
// if (!user || !user.primaryEmailAddress) {
// 	// User data not loaded yet, show loading message or return null
// 	console.log('Waiting for user data to load...');
// 	return <div>Loading user data...</div>; // or return null;
// }

// // User data is loaded
// const emailAddress = user.primaryEmailAddress.emailAddress;
// console.log("User's email address:", emailAddress);
