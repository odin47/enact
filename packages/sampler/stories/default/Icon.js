import Icon from '@enact/moonstone/Icon';
import Heading from '@enact/moonstone/Heading';
import iconNames from './icons';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {select, text} from '../../src/enact-knobs';
import emptify from '../../src/utils/emptify.js';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

storiesOf('Moonstone', module)
	.add(
		'Icon',
		() => {
			const size = select('size', ['small', 'large'], Icon, 'large');
			return (
				<div>
					<Icon
						size={size}
					>
						{emptify(select('src', ['', docs, factory, logo], Icon, '')) + emptify(select('icon', ['', ...iconNames], Icon, 'plus')) + emptify(text('custom icon', Icon, ''))}
					</Icon>
					<br />
					<br />
					<Heading showLine>All Icons</Heading>
					{iconNames.map((icon, index) => <Icon key={index} size={size} title={icon}>{icon}</Icon>)}
				</div>
			);
		},
		{
			info: {
				text: 'Basic usage of Icon'
			}
		}
	);
