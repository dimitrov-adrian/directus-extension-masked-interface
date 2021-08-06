> ### This extension is in development and most probably will have file structure change when Directus 9 official releases. Meanwhile breaking changes are possible in anytime.

# Directus Masked Input Interface

Input text string by template

## Installation

### Directus as npm package

If using Directus as npm package, you can include the extension as package in your `package.json` file as:

```json
"dependencies": {
	"directus-extension-masked-interface": "https://github.com/dimitrov-adrian/directus-extension-masked-interface/releases/latest/download/masked-interface.zip"
}
```

### Docker installation / extensions directory

If you want to use in docker container or into the extension directory, you need to add it
manualy from the package tar

```bash
cd <your directus extensions directory>/interfaces
curl -LO https://github.com/dimitrov-adrian/directus-extension-editorjs-interface/releases/latest/download/editorjs.zip
unzip editorjs.zip
```

### Build by yourself

You can also clone this repository and build it by yourself.

## How to use it

# Masked text input

Handler

\+ ( **_ ) _** **\_ \_**

**\_** @ **\_** . \_\_

Or for example vehicles plate number like

P4096 HB

aa 9999 aa
