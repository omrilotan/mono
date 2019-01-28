const {
	MOON_CYCLE,
	YEAR_CYCLE,
	MONTH_CYCLE,
} = require('./lib/cycles');
const {
	FORMAT_ICON,
	FORMAT_CODE,
	FORMAT_NAME,
	FORMATS,
} = require('./lib/formats');
const {
	ICONS,
	CODES,
} = require('./lib/names');
const word = require('./lib/word');
const NINETEEN_HUNDRED = 694039.09;
const SUFFIX = 'Moon';

function moon(...args) {
	const options = typeof args[args.length - 1] === 'object' ? args.pop() : {};
	const {format = FORMAT_ICON} = options;
	const now = new Date();
	let [
		year = now.getFullYear(),
		month = now.getMonth() + 1,
		day = now.getDate(),
	] = args;

	if (month < 3) {
		year--;
		month += 12;
	}

	let total_days_elapsed = year * YEAR_CYCLE + month * MONTH_CYCLE + day - NINETEEN_HUNDRED;
	total_days_elapsed /= MOON_CYCLE;
	total_days_elapsed -= parseInt(total_days_elapsed); // subtract integer part to leave fractional part of original

	let phase = Math.round(total_days_elapsed * ICONS.length);
	phase = phase >= ICONS.length ? 0 : phase; // turn 8 into 0

	switch (format) {
		case FORMAT_CODE:
			return CODES[phase];
		case FORMAT_NAME:
			return [word(CODES[phase]), SUFFIX].join(' ');
		default:
			return ICONS[phase];
	}
}

module.exports = Object.defineProperties(
	moon,
	{
		ICONS: {
			value: ICONS,
			enumerable: true,
		},
		CODES: {
			value: CODES,
			enumerable: true,
		},
		NAMES: {
			get: () => CODES.map(
				name => [word(name), SUFFIX].join(' ')
			),
			enumerable: true,
		},
		FORMATS: {
			value: FORMATS,
			enumerable: true,
		},
	},
);
