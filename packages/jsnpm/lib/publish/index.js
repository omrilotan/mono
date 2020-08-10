const { promisify } = require('util');

module.exports = async function publish() {
	await promisify(this.publish)();
};
