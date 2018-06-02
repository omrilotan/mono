module.exports = function publish() {
    return new Promise((resolve, reject) => {
        if (this.constructor.name !== 'EventEmitter') {
            const error = new TypeError(`'publish' must be call on an NPM instance (EventEmitter), was called on ${this.constructor.name}`);
            reject(error);
            return;
        }

        this.publish(error => error ? reject(error) : resolve());
    });
};
