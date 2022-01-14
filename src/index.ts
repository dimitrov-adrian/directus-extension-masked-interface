import { InterfaceConfig } from '@directus/shared/types';
import InterfaceComponent from './interface.vue';

export default {
	id: 'extension-masked-input',
	name: 'Masked Input',
	description: 'Masked text input field',
	icon: 'spellcheck',
	component: InterfaceComponent,
	types: ['string', 'integer', 'bigInteger', 'float', 'decimal'],
	group: 'standard',
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
			name: '$t:format_value',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{ text: '$t:none', value: '' },
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
						{ text: 'Static', value: 'mask' },
						{ text: 'RegEx', value: 'regex' },
						{
							text: '$t:presets',
							children: [
								{ text: 'URL', value: 'url' },
								{ text: 'Email', value: 'email' },
								{ text: 'IP Address', value: 'ip' },
								{ text: 'MAC Address', value: 'mac' },
								{ text: 'CSS Unit', value: 'cssunit' },
								{ text: 'VIN', value: 'vin' },
								{ text: 'SSN', value: 'ssn' },
							],
						},
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
				hidden: true,
				conditions: [
					{
						name: 'hide',
						rule: {
							templateType: {
								_in: ['mask', 'regex'],
							},
						},
						hidden: false,
					},
				],
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
					9 - Number
					a - Lower char
					A - Upper char
					* - Alphanumeric
					\\ - Escaping Char
					| - Alternator
					[] - Optional
					() - Grouping
					{n,[m]} - Repeater
					`,
					icon: 'help',
				},
				hidden: true,
				conditions: [
					{
						name: 'hide',
						rule: {
							templateType: {
								_in: ['mask'],
							},
						},
						hidden: false,
					},
				],
			},
		},
	],
} as InterfaceConfig;
