import React, { useState, useContext } from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const Menubar = () => {
	const { user, logout } = useContext(AuthContext);
	const pathName = window.location.pathname;
	// /Home
	const path = pathName === '/' ? 'Home' : pathName.substr(1);
	const [activeItem, setActiveItem] = useState(path);
	const handleItemClick = (e, { name }) => setActiveItem(name);

	const trigger = (
		<span>
			<Image
				avatar
				src='https://www.choicemedwaste.com/wp-content/uploads/default-user-avatar-dc6f2da9.gif'
			/>
		</span>
	);

	const menuBar = user ? (
		<Menu pointing secondary size='massive' color='teal'>
			<Menu.Item name='Home' active as={Link} to='/' />

			<Menu.Menu position='right'>
				<Menu.Item>
					<Dropdown trigger={trigger}>
						<Dropdown.Menu style={{ marginTop: 10, fontSize: 14, padding: 20 }}>
							<Dropdown.Item
								icon='user'
								text='Account'
								name='profile'
								active={activeItem === 'profile'}
								onClick={handleItemClick}
								as={Link}
								to={`/profile/${user.id}`}
							/>
							<Dropdown.Item
								icon='sign out'
								text='Sign Out'
								name='logout'
								onClick={logout}
							/>
							<Dropdown.Divider />
							<Dropdown.Item text='Help' />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
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
