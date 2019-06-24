const colors = require('colors');
const length = require('./lib/length');
const themes = require('./themes.json');

/**
 * Get the length of the longest item
 * @param  {...string}
 * @return {number}
 */
const maxLength = (...args) => args.reduce((max, arg) => Math.max(length(arg), max), 0);

/**
 * Returns an array of n repetitions
 * @param  {string} content
 * @param  {number} length
 * @return {Array} n repetition of an item
 *
 * @example arrayOf('-', 3) // ['-', '-', '-']
 */
const arrayOf = (content, length) => new Array(length + 1).join(content);

/**
 * default boxedOptions colour
 * @type {String}
 */
const BOX_COLOR = 'yellow';

/**
 * default boxedOptions padding
 * @type {Number}
 */
const PADDING = 2;

/**
 * default boxedOptions theme
 * @type {String}
 */
const THEME = 'single';

/**
 * default align value
 * @type {String}
 */
const ALIGN = 'center';

/**
 * @typedef boxedOptions
 * @type {Object}
 * @property {string} [color='yellow']
 * @property {number} [padding=2]
 * @property {string} [theme='single']
 * @property {string} [align='center']
 * @property {string} [title]
 */

/**
 * Box a message (visually)
 * @param  {string} message
 * @param  {boxedOptions} options
 * @return {string}
 *
 * @example
 * boxt('Celebrate what you want to see more of');
 *
 * ┌──────────────────────────────────────────┐
 * │                                          │
 * │  Celebrate what you want to see more of  │
 * │                                          │
 * └──────────────────────────────────────────┘
 */
module.exports = function boxed(message, {
	color = BOX_COLOR,
	padding = PADDING,
	theme = THEME,
	align = ALIGN,
	title,
} = {}) {

	if (!Object.prototype.hasOwnProperty.call(colors, color)) {
		throw new Error(`colors does not support color "${color}"`);
	}
	if (!Object.prototype.hasOwnProperty.call(themes, theme)) {
		throw new Error(`themes do not include a "${theme}" theme`);
	}

	const lines = message.split('\n');
	const width = maxLength(...message.split('\n'));
	const space = width + padding * 2;
	const times = (string = ' ', length = space) => arrayOf(string, length);

	// Themed borders
	const [
		h,
		v,
		tl,
		tr,
		bl,
		br,
		ml,
		mr,
	] = [
		'h',
		'v',
		'tl',
		'tr',
		'bl',
		'br',
		'ml',
		'mr',
	].map(item => themes[theme][item][color]);

	const lineMap = line => {
		const w = width + line.length - length(line); // white space width including style chars

		const content = (() => {
			switch (align) {
				case 'left':
				case 'start':
					return line.padEnd(w, ' ');
				case 'right':
				case 'end':
					return line.padStart(w, ' ');
				case 'center':
				default:
					return line.padEnd(Math.ceil(w - (w - length(line)) / 2), ' ').padStart(w, ' ');
			}
		})();

		return [
			v,
			times(' ', padding),
			content,
			times(' ', padding),
			v,
		];
	};

	const titleLines = title ? [
		lineMap(title),
		[v, times(' '), v],
		[ml, times(h), mr],
		[v, times(' '), v],
	] : [];

	return [
		[''],
		[tl, times(h), tr],
		[v, times(' '), v],
		...titleLines,
		...lines.map(lineMap),
		[v, times(' '), v],
		[bl, times(h), br],
		[''],
	].map(item => item.join('')).join('\n');
};
