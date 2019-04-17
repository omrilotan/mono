module.exports = function flatten(items) {
	return items.length && items.every(Array.isArray)
		? flatten([].concat(...items))
		: items
	;
};
