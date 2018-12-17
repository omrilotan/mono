const show = require('../show');

/**
 * Get last author date
 * @return {Promise<String>}
 */
module.exports = async () => new Date(parseInt(await show('at')) * 1000);
