'use strict';

const mongoose = require('.');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: String,
	// allergies: String,
	// diets: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
