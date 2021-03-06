import Button from '@enact/moonstone/Button';
import CheckboxItem from '@enact/moonstone/CheckboxItem';
import RadioItem from '@enact/moonstone/RadioItem';
import SwitchItem from '@enact/moonstone/SwitchItem';

import ToggleButton from '@enact/moonstone/ToggleButton';
import Group from '@enact/ui/Group';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {boolean, select} from '../../src/enact-knobs';
import {action} from '../../src/utils';

// Set up some defaults for info and knobs
const prop = {
	children: {
		'Button': Button,
		'CheckboxItem': CheckboxItem,
		'RadioItem': RadioItem,
		'SwitchItem': SwitchItem,
		'ToggleButton': ToggleButton
	}
};

const getComponent = (name) => prop.children[name];

Group.displayName = 'Group';

storiesOf('UI', module)
	.add(
		'Group',
		() => (
			<Group
				childComponent={getComponent(select('childComponent', Object.keys(prop.children), Group, 'CheckboxItem'))}
				itemProps={{
					inline: boolean('ItemProps-Inline', Group)
				}}
				select={select('select', ['single', 'radio', 'multiple'], Group, 'radio')}
				selectedProp="selected"
				defaultSelected={0}
				onSelect={action('onSelect')}
			>
				{['Item 1', 'Item 2', 'Item 3']}
			</Group>
		),
		{
			info: {
				text: 'Basic usage of Group'
			}
		}
	);
