'use strict';

// const User = require('../models/usermodel');

const APIKEY = process.env.API_KEY;

// Example prompt cost 54 tokens
const getOptions = async (req, res) => {
	res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL);
	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${APIKEY}`,
			'Content-Type': 'application/json',
		},
		// 'gpt-4-1106-preview', 'gpt-3.5-turbo'
		body: JSON.stringify({
			model: 'gpt-4-1106-preview',
			messages: [{ role: 'user', content: req.body.message }],
			max_tokens: 800,
		}),
	};
	try {
		const response = await fetch(
			'https://api.openai.com/v1/chat/completions',
			options
		);
		const data = await response.json();
		res.send(data);
	} catch (e) {
		console.error(e);
		res.status(500).send('error getting options');
	}
};

// const getEvents = async (req, res) => {
// 	res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL);
// 	try {
// 		const eventData = await Event.find({});
// 		res.send(JSON.stringify(eventData));
// 	} catch (e) {
// 		console.error(e);
// 		res.status(500).send('error getting events');
// 	}
// };

// const insertEvent = async (req, res) => {
// 	// Test
// 	// //console.log('insertEvent in event controller test');
// 	const msg = req.body;
// 	console.log(msg);
// 	try {
// 		await Event.create({
// 			title: msg.title,
// 			date: msg.date,
// 			venue: msg.venue,
// 		});
// 		res.status(200).send('Event created');
// 	} catch (e) {
// 		console.error(e);
// 		res.status(500).send('error creating event');
// 	}
// };

module.exports = { getOptions }; //getEvents, insertEvent
