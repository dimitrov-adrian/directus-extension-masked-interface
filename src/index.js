import Interface from "./interface.vue";

const i18n = {
  t: (s) => s,
}

export default {
  id: "extension-masked",
  name: "Masked Input",
  description: "Masked input field",
  icon: "edit",
  component: Interface,
  types: ["string"],
  options: [
    {
      field: 'placeholder',
      name: i18n.t('placeholder'),
      meta: {
        width: 'half',
        interface: 'text-input',
        options: {
          placeholder: i18n.t('enter_a_placeholder'),
        },
      },
    },
    {
      field: 'font',
      name: i18n.t('font'),
      type: 'string',
      meta: {
        width: 'half',
        interface: 'dropdown',
        options: {
          choices: [
            { text: i18n.t('sans_serif'), value: 'sans-serif' },
            { text: i18n.t('monospace'), value: 'monospace' },
            { text: i18n.t('serif'), value: 'serif' },
          ],
        },
      },
      schema: {
        default_value: 'sans-serif',
      },
    },
    {
      field: 'iconLeft',
      name: i18n.t('icon_left'),
      type: 'string',
      meta: {
        width: 'half',
        interface: 'icon',
      },
    },
    {
      field: 'iconRight',
      name: i18n.t('icon_right'),
      type: 'string',
      meta: {
        width: 'half',
        interface: 'icon',
      },
    },
    {
      field: 'storeMasked',
      name: i18n.t('interfaces.datetime.include_seconds'),
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
      name: i18n.t('transform'),
      type: 'string',
      meta: {
        width: 'half',
        interface: 'dropdown',
        options: {
          choices: [
            { text: i18n.t('No'), value: '' },
            { text: i18n.t('Uppercase'), value: 'uppercase' },
            { text: i18n.t('Lowercase'), value: 'lowercase' },
          ],
        },
      },
      schema: {
        default_value: '',
      },
    },
    {
      field: 'help',
      name: i18n.t('Help'),
      type: 'alias',
      meta: {
        width: 'full',
        interface: 'notice',
        options: {
          text: `
            0 - any digit
            a - any letter
            * - any char
            other chars which is not in custom definitions supposed to be fixed
            [] - make input optional
            {} - include fixed part in unmasked value
            \` - prevent symbols shift back
          `,
          icon: 'share',
        },
      },
    },
    {
      field: 'masks',
      name: i18n.t('interfaces.color.preset_colors'),
      type: 'string',
      meta: {
        width: 'full',
        interface: 'repeater',
        options: {
          addLabel: i18n.t('interfaces.color.preset_colors_add_label'),
          template: '{{ mask }}',
          fields: [
            {
              field: 'type',
              name: i18n.t('type'),
              type: 'string',
              meta: {
                width: 'half',
                interface: 'dropdown',
                options: {
                  choices: [
                    { text: i18n.t('simple'), value: '' },
                    { text: i18n.t('regex'), value: 'regex' },
                  ],
                },
              },
              schema: {
                default_value: '',
              },
            },
            {
              field: 'mask',
              type: 'string',
              name: i18n.t('name'),
              meta: {
                interface: 'text-input',
                width: 'half',
                options: {
                  placeholder: i18n.t('interfaces.color.name_placeholder'),
                },
              },
            },
          ],
        },
      },
    },
  ],
};
