/**
 * Retrieve a random item from the arguments
 * @param  {...Any} items
 * @return {Any}
 */
module.exports = (...items) => items[Math.floor(Math.random() * items.length)];
