const {resolve} = require('path');
const {readFileSync} = require('fs');
const assign = require('@(._.)/assign');

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
	selectionColor,
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
	selectionColor,
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
};

exports.decorateConfig = config => Object.assign(
	{},
	assign(defaults, config),
	{
		css: [
			readFileSync(resolve(__dirname, 'dist/styles.css')).toString(),
			config.css,
		].join('\n'),
		termCSS: [
			readFileSync(resolve(__dirname, 'dist/term.css')).toString(),
			config.css,
		].join('\n'),
	}
);

module.exports.onWindow = browserWindow => browserWindow.setVibrancy('ultra-dark');
