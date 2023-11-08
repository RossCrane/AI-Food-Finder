import React from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	UserButton,
	useUser,
	RedirectToSignIn,
} from '@clerk/clerk-react';
import Button from 'react-bootstrap/Button';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
	return (
		<ClerkProvider publishableKey={clerkPubKey}>
			<Header></Header>
			<SignedIn>
				<Button className="nav-buttons" variant="dark">
					Cook
				</Button>
				<Button className="nav-buttons" variant="dark">
					Go Out
				</Button>
			</SignedIn>
			<SignedOut>{/* <RedirectToSignIn /> */}</SignedOut>
		</ClerkProvider>
	);
}

/* <Welcome /> */
function Welcome() {
	return <div>Hello you are signed in</div>;
}

export default App;
