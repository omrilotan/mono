const EXTENSIONS = require('./lib/extensions');
const preprocess = require('./lib/preprocess');
const postprocess = require('./lib/postprocess');

const processor = {
	preprocess,
	postprocess,
};

const processors = Object.assign(
	...EXTENSIONS.map(
		extension => ({[extension]: processor})
	)
);

module.exports = {processors};
