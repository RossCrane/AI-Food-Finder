import React, { useState } from 'react';
import {
	CitySelect,
	CountrySelect,
	StateSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

import Interests from '../interests/interests.jsx';

function GoOut() {
	const [countryid, setCountryid] = useState(0);
	const [stateid, setstateid] = useState(0);
	return (
		<div>
			<h2>Country</h2>
			<CountrySelect
				onChange={(e) => {
					setCountryid(e.id);
				}}
				placeHolder="Select Country"
			/>
			<h2>State</h2>
			<StateSelect
				countryid={countryid}
				onChange={(e) => {
					setstateid(e.id);
				}}
				placeHolder="Select State"
			/>
			<h2>City</h2>
			<CitySelect
				countryid={countryid}
				stateid={stateid}
				onChange={(e) => {
					console.log(e);
				}}
				placeHolder="Select City"
			/>
			<Interests />
		</div>
	);
}

export default GoOut;
