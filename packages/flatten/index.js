module.exports = function flatten(items) {
	return items.every(Array.isArray) ? flatten([].concat(...items)) : items;
};
