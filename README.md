# TabCinema

Force a video or presentation to show in cinema mode

This is a fork of [this chrome extension](https://chrome.google.com/webstore/detail/fullscreen-anything/olcfgpmjldkkjdclidhcbonieibfhhdh), rebundled into a reusable node module

## Install

```bash
npm install --save tabcinema
```

## Usage

```javascript
const TabCinema = require('tabcinema');
```

If you use this module, you should use [browserify](https://www.npmjs.com/package/browserify) to bundle it into a script to include in your website (or browser extension).

**Toggle fullscreen mode:**

```javascript
TabCinema.toggle();
```

**Set fullscreen mode:**

```javascript
TabCinema.setFullscreen(true);
```
