const _exists = require('./lib/exists');

let instance;

function npm() {
    return new Promise((resolve, reject) => {
        if (instance && instance.constructor.name === 'EventEmitter') {
            resolve(instance);
        }

        require('npm').load((error, instance) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(instance);
        });
    });
}

function exists(name) {
    return new Promise(resolve =>npm()
        .then(instance => _exists.call(instance, name))
        .then(result => resolve(result))
        .catch(error => {
            throw error;
        }));
}

module.exports = {
    exists,
};
