import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

import style from '../App.module.scss';

const Login = ({ history }) => {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({} || false);

	const { values, submitHandler, changeHandler } = useForm(loginUserCallback, {
		username: '',
		password: '',
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			context.login(userData);
			history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		variables: values,
	});
	function loginUserCallback() {
		loginUser();
	}
	return (
		<div className={style.form_container}>
			<Form
				onSubmit={submitHandler}
				noValidate
				className={loading ? 'loading' : ''}>
				<h1>Login</h1>
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
					label='Password'
					placeholder='Password..'
					name='password'
					type='password'
					value={values.password}
					error={errors.password ? true : false}
					onChange={changeHandler}
				/>

				<Button type='submit' primary>
					Login
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

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			username
			createdAt
			token
		}
	}
`;

export default Login;
