const extensions = require('./lib/extensions');
const skip = require('./lib/skip');
const preprocess = require('./lib/preprocess');
const postprocess = skip(process.argv)
	? require('./lib/postprocess')
	: require('./lib/log')
;

const processor = {
	preprocess,
	postprocess,
	supportsAutofix: true,
};

const processors = Object.assign(
	...extensions.map(
		extension => ({[extension]: processor})
	)
);

module.exports = {processors};
