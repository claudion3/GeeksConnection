import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const changeHandler = event => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const submitHandler = event => {
		event.preventDefault();
		callback();
	};

	return { changeHandler, submitHandler, values };
};
