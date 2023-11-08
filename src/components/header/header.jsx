import React from 'react';
import logo from '../../assets/utensils-solid.svg';
import './header.css';
import {
	SignInButton,
	SignUpButton,
	SignedOut,
	SignedIn,
	SignOutButton,
} from '@clerk/clerk-react';

const Header = () => {
	return (
		<header className="header">
			<img className="header-logo" src={logo} alt="logo" />
			<h1 className="header-title">AI Food Finder</h1>
			<div className="header-buttons">
				<SignedOut>
					<SignInButton mode="modal" className="nav-buttons">
						Sign In
					</SignInButton>
					<SignUpButton mode="modal" className="nav-buttons">
						Sign Up
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<SignOutButton className="nav-buttons">Sign Out</SignOutButton>
				</SignedIn>
			</div>
		</header>
	);
};

export default Header;
