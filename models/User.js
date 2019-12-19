const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstname: {type: String},
	lastname: { type: String },
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	profilePic: { type: String },
	password: {	type: String, required: true },
	dob: { type: Date, default: new Date() },
	creationDate: {	type: Date,	default: Date.now },
	bio: { type: String },
	gender: {
		male: { type: String },
		female: { type: String },
		other: { type: String }
	},
	sexPref: {
		male: { type: String },
		female: { type: String },
		bi: { type: String, default: 'bisexual'}
	},
	interests: {
		first: { type: String },
		second: { type: String },
		third: { type: String },
		fourth: { type: String },
		fifth: { type: String }
	},
	profileImages: {
		image1: { type: String },
		image2: { type: String },
		image3: { type: String },
		image4: { type: String },
		image5: { type: String }
	}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;