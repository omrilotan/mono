const {
	access,
	F_OK,
	W_OK,
} = require('fs');
const asyncAccess = require('util').promisify(access);

module.exports = async function exists(file, {quiet = true} = {}) {
	try {
		await asyncAccess(file, F_OK | W_OK);
		return true;
	} catch (error) {
		quiet || console.error(error); // eslint-disable-line no-console
		return false;
	}
};
