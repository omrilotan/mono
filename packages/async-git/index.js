const exec = require('async-execute');

const formats = new Map();
formats.set('name', 'an');
formats.set('email', 'ae');
formats.set('sha', 'H');
formats.set('short', 'h');
formats.set('message', 'B');

const show = async part => await exec(`git show -s --format=%${formats.get(part)}`);

const getters = {
    name: async () => await exec('basename -s .git `git config --get remote.origin.url`'),
    branch: async () => await exec('git rev-parse --abbrev-ref HEAD'),
    author: async () => await show('name'),
    email: async () => await show('email'),
    sha: async () => await show('sha'),
    short: async () => await show('short'),
    message: async () => await show('message'),
};

/**
 * @typedef           gitGet
 * @description       Get git info
 * @type     {Object}
 * @property {Promise<String>} name    Project name
 * @property {Promise<String>} branch  Current branch name
 * @property {Promise<String>} author  Author name of the last commit
 * @property {Promise<String>} email   Author email of the last commit
 * @property {Promise<String>} sha     Unique identifier of the last commit
 * @property {Promise<String>} short   7 Character Unique identifier of the last commit
 * @property {Promise<String>} message Most recent commit message
 */
module.exports = Object.defineProperties(
    {},
    Object.entries(getters).reduce(
        (props, [key, value]) => {
            return Object.assign(
                props,
                {
                    [key]: {
                        get: async () => await value(),
                        configurable: true,
                    }
                }
            )
        },
        {}
    )
);
