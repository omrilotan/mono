const extensions = require('./lib/extensions');
const skip = require('./lib/skip');
const preprocess = skip(process.argv)
	? require('./lib/preprocess')
	: require('./lib/log')
;
const postprocess = require('./lib/postprocess');

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
