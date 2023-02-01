//require('dotenv').config();

const { MONGO_URI } = require('../../config');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB connection SUCCESS');
	} catch (error) {
		console.log('MongoDB connection FAIL', err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
