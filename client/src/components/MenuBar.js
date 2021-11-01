import React, { useState, useContext } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import DropdownTrigger from './DropdownTrigger';

const Menubar = () => {
	const { user, logout } = useContext(AuthContext);
	const pathName = window.location.pathname;
	// /Home
	const path = pathName === '/' ? 'Home' : pathName.substr(1);
	const [activeItem, setActiveItem] = useState(path);
	const trigger = (
		<span>
			<Image
				avatar
				src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
			/>
		</span>
	);

	const options = [
		{ key: 'user', text: 'Account', icon: 'user' },
		{
			key: 'settings',
			text: 'Settings',
			icon: 'settings',
		},
		{
			key: 'sign-out',
			text: 'Sign Out',
			icon: 'sign out',
			onClick: logout,
		},
	];

	const handleItemClick = (e, { name }) => setActiveItem(name);
	const menuBar = user ? (
		<Menu pointing secondary size='massive' color='teal'>
			<Menu.Item name='Home' active as={Link} to='/' />

			<Menu.Menu position='right'>
				<Menu.Item>
					<DropdownTrigger trigger={trigger} options={options} />
				</Menu.Item>

				{/* <Menu.Item name='logout' onClick={logout} /> */}
			</Menu.Menu>
		</Menu>
	) : (
		<Menu pointing secondary size='massive' color='teal'>
			<Menu.Item
				name='Home'
				active={activeItem === 'Home'}
				onClick={handleItemClick}
				as={Link}
				to='/'
			/>

			<Menu.Menu position='right'>
				<Menu.Item
					name='Login'
					active={activeItem === 'Login'}
					onClick={handleItemClick}
					as={Link}
					to='/Login'
				/>
				<Menu.Item
					name='Register'
					active={activeItem === 'Register'}
					onClick={handleItemClick}
					as={Link}
					to='/Register'
				/>
			</Menu.Menu>
		</Menu>
	);
	return menuBar;
};

export default Menubar;
