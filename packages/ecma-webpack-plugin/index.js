const errors = require('./lib/errors');
const message = require('./lib/message');

const defaults = {
	extensions: [
		'js', 'mjs',
	],
};

/**
 * @class
 * A webpack plugin that checks es version parser does not throw errors
 * @see https://webpack.js.org/api/plugins/
 */
module.exports = class EcmaPlugin {
	/**
	 * @param  {Object} options Acorn settings
	 */
	constructor(options = {}) {
		this.options = Object.assign({}, defaults, options);
	}

	apply(compiler) {
		const { options } = this;

		compiler.hooks.emit.tapPromise(
			'EcmaPlugin',
			compilation => new Promise((resolve, reject) => {
				const err = errors(compilation, options);
				const msg = message(err);

				msg
					? reject(msg)
					: resolve()
				;
			}),
		);

	}
};
