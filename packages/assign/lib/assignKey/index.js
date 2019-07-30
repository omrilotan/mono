const assignable = require('../assignable');
const clone = require('../clone');

const secureKeys = [
	'__proto__',
	'constructor',
	'prototype',
];

/**
 * assign one key from one object to the target
 * @private
 * @param {Object} target Target object to assign to
 * @param {Object} source The object to assign value
 * @param {String|Symbol} key
 * no return value
 */
module.exports = function assignKey(target, source, key) {
	if (secureKeys.includes(key)) {

		// Ignore silently to avoid malicious construct prototype pollution
		return;
	}

	target[key] = !(key in target) || !assignable(source[key])
		? source[key]
		: require('../assign')(clone(target[key]), source[key])
	;
};
