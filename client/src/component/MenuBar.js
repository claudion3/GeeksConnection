import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Menubar = () => {
	const pathName = window.location.pathname;
	// /Home
	const path = pathName === '/' ? 'Home' : pathName.substr(1);
	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<div>
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

					<Menu.Item
						name='logout'
						active={activeItem === 'logout'}
						onClick={handleItemClick}
						as={Link}
						to='/'
					/>
				</Menu.Menu>
			</Menu>
		</div>
	);
};

export default Menubar;
