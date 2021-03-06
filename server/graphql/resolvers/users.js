require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const checkAuth = require('../../utils/checkAuth');
const User = require('../../models/User');
const {
	validateRegisterInput,
	validateLoginInput,
} = require('../../utils/validators');

const generateToken = user => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		process.env.SECRET_KEY,
		{ expiresIn: '1h' },
	);
};

module.exports = {
	Query: {
		//Get All users
		async getUsers() {
			try {
				const users = await User.find().sort({ createdAt: -1 });
				return users;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async updateUser(_, args, context) {
			const user = checkAuth(context);
			//const user = await User.findById(userId);

			const userUpdated = await User.findByIdAndUpdate(
				args.userId,
				{
					username: args.username,
					password: args.password,
					confirmPassword: args.confirmPassword,
					email: args.email,
				},
				{ new: true },
			);

			return userUpdated;
		},
		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			const user = await User.findOne({ username });

			if (!user) {
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = 'Wrong credential';
				throw new UserInputError('Wrong credential', { errors });
			}
			const token = generateToken(user);
			return {
				...user._doc,
				id: user.id,
				token,
			};
		},
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

			const token = generateToken(res);

			return {
				...res._doc,
				id: res.id,
				token,
			};
		},
	},
};
