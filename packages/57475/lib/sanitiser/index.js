/**
 * Leave only letters, numbers, underscore and dots. Lowercase everything
 * @param  {String} string
 * @return {String}
 */
module.exports = string => `${string}`.replace(/(?!\.)\W/g, '_').toLowerCase();
