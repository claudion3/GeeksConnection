require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

module.exports = {
	Mutation: {
		async register(_, { registerInput: { username, email, password } }) {
			//Hash password and create an auth token
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				username,
				password,
				email,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			//const token = generateToken(res);
			const token = jwt.sign(
				{
					id: res.id,
					username: res.username,
					email: res.email,
				},
				process.env.SECRET_KEY,
				{ expiresIn: '1h' },
			);
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
