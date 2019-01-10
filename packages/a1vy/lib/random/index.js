/**
 * Retrieve a random item from a given array
 * @param  {Any[]} items
 * @return {Any}
 */
module.exports = items => items[Math.floor(Math.random() * items.length)];
