import Interface from './interface.vue';

export default {
	id: 'extension-masked',
	name: 'Masked Input',
	description: 'Masked text input field',
	icon: 'spellcheck',
	component: Interface,
	types: ['string'],
	options: [
		{
			field: 'placeholder',
			name: 'Placeholder',
			meta: {
				width: 'half',
				interface: 'text-input',
			},
		},
		{
			field: 'font',
			name: 'Font',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'dropdown',
				options: {
					choices: [
						{text: 'Sans-Serif', value: 'sans-serif'},
						{text: 'Monospace', value: 'monospace'},
						{text: 'Serif', value: 'serif'},
					],
				},
			},
			schema: {
				default_value: 'sans-serif',
			},
		},
		{
			field: 'iconLeft',
			name: 'Icon Left',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'icon',
			},
		},
		{
			field: 'iconRight',
			name: 'Icon Right',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'icon',
			},
		},
		{
			field: 'storeMasked',
			name: 'Store Masked',
			type: 'boolean',
			meta: {
				width: 'half',
				interface: 'toggle',
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
				interface: 'dropdown',
				options: {
					choices: [
						{text: 'No', value: ''},
						{text: 'UPPERCASE', value: 'upper'},
						{text: 'lowercase', value: 'lower'},
						{text: 'Title', value: 'title'},
					],
				},
			},
			schema: {
				default_value: '',
			},
		},
		{
			field: 'templateType',
			name: 'Type',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'dropdown',
				options: {
					choices: [
						{text: 'Static', value: 'mask'},
						{text: 'RegEx', value: 'regex'},
					],
				},
			},
			schema: {
				default_value: 'mask',
			},
		},
		{
			field: 'template',
			name: 'Mask Template',
			type: 'string',
			meta: {
				interface: 'text-input',
				width: 'half',
			},
		},
		{
			field: 'help',
			name: 'Help',
			type: 'alias',
			meta: {
				width: 'full',
				interface: 'notice',
				options: {
					text: `
					9 - numeric
					a - alphabetical
					* - alphanumeric
					\\ - escaping char

					Repeats:
					{n} => n repeats
					masking {n,m} => from n to m

					Also {+} and {*} is allowed. + start from 1 and * start from 0.
					other chars which is not in custom definitions supposed to be fixed

					Alternator:
					The alternator syntax is like an OR statement.
					The mask can be one of the 3 choices specified in the alternator.

					To define an alternator use the |.
					ex:
						"a|9" => a or 9
						"(aaa)|(999)" => aaa or 999
						"(aaa|999|9AA)" => aaa or 999 or 9AA

					More info at: https://github.com/RobinHerbots/Inputmask
						`,
					icon: 'help',
				},
			},
		},
	],
};
