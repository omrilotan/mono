module.exports = null

const NEW = 'new';
const WAXING_CRESCENT = 'waxing-crescent';
const QUARTER = 'quarter';
const WAXING_GIBBOUS = 'waxing-gibbous';
const FULL = 'full';
const WANING_GIBBOUS = 'waning-gibbous';
const LAST_QUARTER = 'last-quarter';
const WANING_CRESCENT = 'waning-crescent';

const MOON_CYCLE = 29.5305882;
const YEAR_CYCLE = 365.25;
const MONTH_CYCLE = 30.6;
const PHASES = [
	'🌑',	// New Moon
	'🌒',	// Waxing Crescent Moon
	'🌓',	// Quarter Moon
	'🌔',	// Waxing Gibbous Moon
	'🌕',	// Full Moon
	'🌖',	// Waning Gibbous Moon
	'🌗',	// Last Quarter Moon
	'🌘',	// Waning Crescent Moon
];
const PHASES_CODES = [
	NEW,
	WAXING_CRESCENT,
	QUARTER,
	WAXING_GIBBOUS,
	FULL,
	WANING_GIBBOUS,
	LAST_QUARTER,
	WANING_CRESCENT,
];

const FORMAT_ICON = 'icon';
const FORMAT_CODE = 'code';
const FORMAT_NAME = 'name';
const FORMATS = [
	FORMAT_ICON,
	FORMAT_CODE,
	FORMAT_NAME,
];

const woralise = text => text.split('-').map(capitalise).join(' ');
const capitalise = word => word.charAt(0).toUpperCase() + word.slice(1);

function theMoon(...args) {
	const options = typeof args[args.length - 1] === 'object' ? args.pop() : {};
	const {format = 'moon'} = options;
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

	// ++month;

	let total_days_elapsed = year * YEAR_CYCLE + MONTH_CYCLE * month + day - 694039.09;
	total_days_elapsed /= MOON_CYCLE;
	total_days_elapsed -= parseInt(total_days_elapsed); // subtract integer part to leave fractional part of original

	let phase = Math.round(total_days_elapsed * PHASES.length);
	phase = phase >= PHASES.length ? 0 : phase; // turn 8 into 0

	switch (format) {
		case FORMAT_CODE:
			return PHASES_CODES[phase];
		case FORMAT_NAME:
			return theMoon.PHASES_NAMES[phase];
		default:
			return PHASES[phase];
	}
}

module.exports = Object.defineProperties(
	theMoon,
	{
		PHASES: {
			value: PHASES,
			enumerable: true,
		},
		PHASES_CODES: {
			value: PHASES_CODES,
			enumerable: true,
		},
		PHASES_NAMES: {
			get: () => PHASES_CODES.map(name => woralise(name) + ' Moon'),
			enumerable: true,
		},
		FORMATS: {
			value: FORMATS,
			enumerable: true,
		},
	},
);
