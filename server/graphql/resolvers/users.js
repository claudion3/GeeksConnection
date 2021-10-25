require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { validateRegisterInput } = require('../../utils/validators');

module.exports = {
	Mutation: {
		async register(
			_,
			{ registerInput: { username, email, password, confirmPassword } },
		) {
			//Validation user data
			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword,
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			//Make sure user doesn't already exist
			const user = await User.findOne({ username });

			if (user) {
				throw new UserInputError('Username is taken', {
					errors: {
						username: 'This username is taken',
					},
				});
			}
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
