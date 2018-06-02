module.exports = function viewVersion(module) {
    return new Promise((resolve, reject) => {
        if (this.constructor.name !== 'EventEmitter') {
            const error = new TypeError(`'viewVersion' must be call on an NPM instance (EventEmitter), was called on ${this.constructor.name}`);
            reject(error);
            return;
        }

        this.view(module, 'version', (error, result) => {
            if (error) {
                reject(error);

                return;
            }

            if (!Object.keys(result).length) {
                resolve(null);

                return;
            }

            resolve(result[Object.keys(result)[0]].version);
        });
    });
};
