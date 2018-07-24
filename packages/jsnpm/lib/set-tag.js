module.exports = function setTag(module, tag) {
	return new Promise((resolve, reject) => {
		if (this.constructor.name !== 'EventEmitter') {
			const error = new TypeError(`'setTag' must be call on an NPM instance (EventEmitter), was called on ${this.constructor.name}`);
			reject(error);
			return;
		}

		this.distTag('set', module, tag, error => error ? reject(error) : resolve());
	});
};
