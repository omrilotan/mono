/**
 * @module safe
 * @since 1.0.0
 */

/**
 * [description]
 * @param  {Function} success
 * @param  {Function} fail
 * @return {Function}
 */
module.exports = (success, fail = () => {}) => (error, ...args) => {
    if (error) {
        fail(error);
        return;
    }

    return success(...args);
};
