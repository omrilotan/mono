const {promisify} = require('util');

module.exports = async function unpublish(...args) {
	await promisify(this.unpublish)(args.join('@'));
};
