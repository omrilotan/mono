/**
 * @member {Function} isMap
 * @member {Function} isSet
 */
module.exports = [
	[Map, 'Map'],
	[Set, 'Set'],
].reduce(
	(accumulator, [constructor, name]) => Object.assign(
		accumulator,
		{
			[`is${name}`]: item => item instanceof constructor || (item && typeof item.toString === 'function' && item.toString() === `[object ${name}]`),
		}
	),
	{}
);

