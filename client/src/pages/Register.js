import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { Button, Form } from 'semantic-ui-react';

import style from '../App.module.scss';

const Register = ({ history }) => {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { values, submitHandler, changeHandler } = useForm(registerUser, {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			context.login(userData);
			history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		variables: values,
	});
	function registerUser() {
		addUser();
	}

	return (
		<div className={style.form_container}>
			<Form
				onSubmit={submitHandler}
				noValidate
				className={loading ? 'loading' : ''}>
				<h1>Register</h1>
				<Form.Input
					label='Username'
					placeholder='Username..'
					name='username'
					type='text'
					value={values.username}
					error={errors.username ? true : false}
					onChange={changeHandler}
				/>
				<Form.Input
					label='Email'
					placeholder='Email..'
					name='email'
					type='email'
					value={values.email}
					error={errors.email ? true : false}
					onChange={changeHandler}
				/>
				<Form.Input
					label='Password'
					placeholder='Password..'
					name='password'
					type='password'
					value={values.password}
					error={errors.password ? true : false}
					onChange={changeHandler}
				/>
				<Form.Input
					label='Confirm Password'
					placeholder='Confirm Password..'
					name='confirmPassword'
					type='password'
					value={values.confirmPassword}
					error={errors.confirmPassword ? true : false}
					onChange={changeHandler}
				/>
				<Button type='submit' primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className='ui error message'>
					<ul className='list'>
						{Object.values(errors).map(value => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
