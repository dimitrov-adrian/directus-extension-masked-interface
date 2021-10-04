import Interface from './interface.vue';

export default {
	id: 'extension-masked-input',
	name: 'Masked Input',
	description: 'Masked text input field',
	icon: 'spellcheck',
	component: Interface,
	types: ['string'],
	options: [
		{
			field: 'placeholder',
			name: '$t:placeholder',
			meta: {
				width: 'half',
				interface: 'text-input',
				options: {
					placeholder: '$t:enter_a_placeholder',
				},
			},
		},
		{
			field: 'font',
			name: '$t:font',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{ text: '$t:sans_serif', value: 'sans-serif' },
						{ text: '$t:monospace', value: 'monospace' },
						{ text: '$t:serif', value: 'serif' },
					],
				},
			},
			schema: {
				default_value: 'sans-serif',
			},
		},
		{
			field: 'iconLeft',
			name: '$t:icon_left',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-icon',
			},
		},
		{
			field: 'iconRight',
			name: '$t:icon_right',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-icon',
			},
		},
		{
			field: 'storeMasked',
			name: '$t:save',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'toggle',
				options: {
					label: '$t:interfaces.input-hash.masked',
				},
			},
			schema: {
				default_value: false,
			},
		},
		{
			field: 'transform',
			name: 'Transform',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{ text: '$t:not_allowed', value: '' },
						{ text: '$t:interfaces.tags.uppercase', value: 'upper' },
						{ text: '$t:interfaces.tags.lowercase', value: 'lower' },
						{ text: '$t:interfaces.tags.auto_formatter', value: 'title' },
					],
				},
			},
			schema: {
				default_value: '',
			},
		},
		{
			field: 'templateType',
			name: '$t:type',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{ text: 'Simple', value: 'mask' },
						{ text: 'RegEx', value: 'regex' },
					],
				},
			},
			schema: {
				default_value: 'mask',
			},
		},
		{
			field: 'template',
			name: '$t:template',
			type: 'string',
			meta: {
				interface: 'text-input',
				width: 'half',
			},
		},
		{
			field: 'description',
			name: '$t:description',
			type: 'alias',
			meta: {
				width: 'full',
				interface: 'presentation-notice',
				options: {
					text: `
					9 - numeric
					a - alphabetical
					* - alphanumeric
					\\ - escaping char
					| - alternator
					() - grouping
					{n,[m]} - repeats`,
					icon: 'help',
				},
			},
		},
		{
			field: 'infobuttons',
			name: '$t:documentation',
			type: 'alias',
			meta: {
				width: 'full',
				interface: 'presentation-links',
				options: {
					links: [
						{
							label: 'Static',
							url: 'https://github.com/RobinHerbots/Inputmask',
						},
						{
							label: 'RegExp',
							url: 'https://regexr.com/',
						},
					],
				},
			},
		},
	],
};
