'use strict';

const User = require('../models/usermodel');

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

module.exports = {}; //getEvents, insertEvent
