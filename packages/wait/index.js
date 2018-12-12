/**
* A waiting promise
* @param  {Number} ms
* @return {Promise}
*/
module.exports = ms => new Promise(resolve => setTimeout(resolve, ms));
