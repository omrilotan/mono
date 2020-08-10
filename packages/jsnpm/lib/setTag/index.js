const { promisify } = require('util');

module.exports = async function setTag(name, version, tag) {
	return await promisify(this.distTag)('set', `${name}@${version}`, tag);
};
