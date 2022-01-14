# Directus extension - Masked Interface

![](https://raw.githubusercontent.com/dimitrov-adrian/directus-extension-masked-interface/main/screenshot.gif)

Input text string by template

## Installation

In your Directus installation root

```bash
npm install directus-extension-masked-interface
```

Restart directus

## How to use

The interface extension uses `string` and `numeric` types.

1. Create new standard field with `string` type
2. For interface select **Input Mask** and pick a masking type.

Available masking types:

- Template - simplified templating pattern
- RegEx - uses regular expression for defining the pattern
- Presets
  - URL
  - Email
  - IP Address (IPv4 templating pattern)
  - MAC Address (MAC address template using `:` as separators)
  - VIN
  - SIN

## How it is works

The extension utilizes [InputMask by @RobinHerbots](https://github.com/RobinHerbots/Inputmask) for masking library.
