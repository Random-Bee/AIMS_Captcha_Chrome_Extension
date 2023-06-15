# AIMS Captcha Auto Fill Extension

This extension is designed to automatically fill in the AIMS Captcha for you. It is designed to work with the [IITH AIMS](https://aims.iith.ac.in/aims/) website.

## Building the extension

To build the extension you need to have [Yarn](https://yarnpkg.com/) installed. Then run the following commands:

```bash
yarn
yarn build
```

To install the unpacked extension in chrome, follow the instructions [here](https://developer.chrome.com/extensions/getstarted#manifest). Briefly, you need to go to `chrome://extensions/` and enable developer mode. Then click on `Load unpacked` and select the `dist` directory (the directory containing `manifest.json`).