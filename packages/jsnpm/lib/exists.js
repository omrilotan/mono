module.exports = function exists(module) {
	return new Promise((resolve, reject) => {
		if (this.constructor.name !== 'EventEmitter') {
			const error = new TypeError(`'exists' must be call on an NPM instance (EventEmitter), was called on ${this.constructor.name}`);
			reject(error);
			return;
		}

		this.view(module, 'name', error => resolve(!error));
	});
};
