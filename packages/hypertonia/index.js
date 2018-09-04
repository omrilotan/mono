const {resolve} = require('path');
const {readFileSync} = require('fs');

const {
	red,
	green,
	yellow,
	blue,
	magenta,
	cyan,
	white,
	black,
	lightBlack,
	lightRed,
	lightGreen,
	lightYellow,
	lightBlue,
	lightMagenta,
	lightCyan,
	lightWhite,
	foregroundColor,
	backgroundColor,
	cursorColor,
	overlap,
} = require('./lib/colours');

const defaults = {
	fontFamily: 'monospace',
	fontSize: 14,
	fontWeight: 400,
	fontWeightBold: 700,
	foregroundColor,
	backgroundColor,
	borderColor: overlap,
	cursorColor,
};

exports.decorateConfig = config => Object.assign(
	{},
	defaults,
	config,
	{
		colors: {
			black,
			red,
			green,
			yellow,
			blue,
			magenta,
			cyan,
			white,
			lightBlack,
			lightRed,
			lightGreen,
			lightYellow,
			lightBlue,
			lightMagenta,
			lightCyan,
			lightWhite,
		},
		css: [
			config.css,
			readFileSync(resolve(__dirname, 'dist/styles.css')).toString(),
		].join('\n'),
	}
);

module.exports.onWindow = browserWindow => browserWindow.setVibrancy('ultra-dark');
