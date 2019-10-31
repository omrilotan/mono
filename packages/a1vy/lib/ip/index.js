const {networkInterfaces} = require('os');

const extipv4 = ({internal, family}) => !internal && family === 'IPv4';

module.exports = function ip(fallback = '0.0.0.0') {
	try {
		return Object.values(networkInterfaces())
			.filter(
				array => array.some(extipv4),
			)
			.pop()
			.filter(extipv4)
			.pop()
			.address;
	} catch (error) {
		return fallback;
	}
};
