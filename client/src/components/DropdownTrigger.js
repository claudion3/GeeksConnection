import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';

const DropdownTrigger = ({ trigger, options, click }) => (
	<Dropdown
		trigger={trigger}
		options={options}
		pointing='top left'
		icon={null}
	/>
);

export default DropdownTrigger;
