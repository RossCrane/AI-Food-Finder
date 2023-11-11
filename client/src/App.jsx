// Dependencies
import React from 'react';
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
	SignIn,
	SignUp,
	// UserButton,
} from '@clerk/clerk-react';
import {
	BrowserRouter,
	Route,
	Routes,
	useNavigate,
	// Link,
	// useMatch,
} from 'react-router-dom'; // Import Router and Link

// Components
import Header from './components/header/header.jsx';
import LoggedIn from './components/logged_in/logged_in.jsx';
import Cook from './components/cook/cook.jsx';
import GoOut from './components/go_out/go_out';
import AIOptions from './components/ai_options/ai_options.jsx';
import { AppProvider } from './AppContext';

// Styles
import './App.css';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function PublicPage() {
	return (
		<>
			<Header></Header>
			<h1>Public page</h1>
		</>
	);
}

function ClerkProviderWithRoutes() {
	const navigate = useNavigate();

	return (
		<ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
			<Routes>
				<Route path="/" element={<PublicPage />} />
				<Route
					path="/sign-in/*"
					element={<SignIn routing="path" path="/sign-in" />}
				/>
				<Route
					path="/sign-up/*"
					element={<SignUp routing="path" path="/sign-up" />}
				/>
				<Route
					path="/protected"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<LoggedIn />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/cook"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<Cook />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/go-out"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<GoOut />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/options"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<AIOptions />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route
					path="/recipe"
					element={
						<>
							<SignedIn>
								<Header></Header>
								<Cook />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Routes>
		</ClerkProvider>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppProvider>
				<ClerkProviderWithRoutes />
			</AppProvider>
		</BrowserRouter>
	);
}

export default App;

// attempt
// function App() {
// 	return (
// 		<ClerkProvider publishableKey={clerkPubKey}>
// 			<Router>
// 				<Header />
// 				<Routes>
// 					<Route path="/cook" element={<Cook />} />
// 					<Route path="/go-out" element={<GoOut />} />
// 					<Route path="/ai-options" element={<AIOptions />} />
// 					{/* Add a route for LoggedIn */}
// 					<Route
// 						path="/logged-in"
// 						element={
// 							<SignedIn>
// 								<LoggedIn />
// 							</SignedIn>
// 						}
// 					/>
// 					<Route path="/*" element={<MainButtons />} />
// 				</Routes>
// 			</Router>
// 		</ClerkProvider>
// 	);
// }

// function MainButtons() {
// 	return (
// 		<div className="main-buttons">
// 			<Link to="/cook" className="main-link">
// 				<button className="main-button">Cook</button>
// 			</Link>

// 			<Link to="/go-out" className="main-link">
// 				<button className="main-button">Go Out</button>
// 			</Link>
// 		</div>
// 	);
// }

// Older attempt

// <SignedOut>{/* <RedirectToSignIn /> */}</SignedOut>

/* <Welcome /> */
// function Welcome() {
// 	return <div>Hello you are signed in</div>;
// }
