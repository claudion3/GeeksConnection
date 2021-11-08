import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';

import { Input } from 'semantic-ui-react';
import style from '../App.module.scss';

function Profile({ props }) {
	const { user } = useContext(AuthContext);
	const [img, setImg] = useState(
		'https://www.choicemedwaste.com/wp-content/uploads/default-user-avatar-dc6f2da9.gif',
	);
	const [username, setUsername] = useState(user.username);
	const imgHandler = () => {
		setImg();
	};
	const usernameHandler = () => {
		setUsername();
	};

	const profile = user ? (
		<div className={style.profile}>
			<div className={style.image}>
				<img src={img} alt='profile' onClick={imgHandler} />
			</div>
			<div className={style.username}>
				<Input
					action='edit'
					name='username'
					value={username}
					onChange={usernameHandler}
				/>
			</div>
		</div>
	) : (
		<div>
			<h2>Sorry no profile found</h2>
		</div>
	);
	return profile;
}

export default Profile;
