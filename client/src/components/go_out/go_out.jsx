// Dependencies
import React, { useState } from 'react';
import {
	CitySelect,
	CountrySelect,
	StateSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

// Services
import { getGoOutOptions } from '../../services/services';

// Components
// import Interests from '../interests/interests.jsx';

const GoOut = () => {
	const navigate = useNavigate();

	// State
	const [countryid, setCountryid] = useState('');
	const [countryName, setCountryName] = useState(''); // State for country name
	const [stateid, setStateid] = useState('');
	const [stateName, setStateName] = useState(''); // State for state name
	const [cityid, setCityid] = useState('');
	const [cityName, setCityName] = useState(''); // State for city name
	const [submitted, setSubmitted] = useState(false);
	const [craving, setCraving] = useState('');
	const [notWant, setNotWant] = useState('');

	// Context
	const { setApiResponse } = useAppContext();

	const handleSubmit = async () => {
		if (submitted) return;
		setSubmitted(true);

		const data = await getGoOutOptions(
			countryName,
			stateName,
			cityName,
			craving,
			notWant
		);
		if (data) {
			setApiResponse(data); // Update the context with the fetched data
			navigate('/options');
		}
		setSubmitted(false);
	};

	return (
		<div>
			<h2>Country</h2>
			<CountrySelect
				value={countryid}
				onChange={(e) => {
					setCountryid(e.id);
					setCountryName(e.name); // Set country name
				}}
				placeHolder="Select Country"
			/>
			<h2>State</h2>
			<StateSelect
				countryid={countryid}
				value={stateid}
				onChange={(e) => {
					setStateid(e.id);
					setStateName(e.name); // Set state name
				}}
				placeHolder="Select State"
			/>
			<h2>City</h2>
			<CitySelect
				countryid={countryid}
				stateid={stateid}
				value={cityid}
				onChange={(e) => {
					setCityid(e.id);
					setCityName(e.name); // Set city name
				}}
				placeHolder="Select City"
			/>
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
				<div className="submit-button-container">
					<button
						className="submit-button"
						onClick={handleSubmit}
						disabled={submitted}
					>
						{submitted ? 'Loading...' : 'Submit'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default GoOut;

// console.log({
// 	Country: countryName,
// 	State: stateName,
// 	City: cityName,
// 	Craving: craving,
// 	NotWant: notWant,
// });
