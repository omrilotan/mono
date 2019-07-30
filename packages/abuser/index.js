const { createRequireFromPath, createRequire } = require("module");

const create = createRequire || createRequireFromPath; // createRequire -> node >=12.2, createRequireFromPath -> node >=10.12

/**
 * Create modifiers to require cache based on path (e.g. `__dirname`)
 * @param  {String}   path
 * @return {Function}
 */
module.exports = function abuser(path) {
	const _require = create(require.resolve(path));

	/**
	 * Clean up a module from cache
	 * @param  {String} route
	 * @return {undefined}
	 */
	function clean(route) {
		// Resolve module location from given path
		const filename = _require.resolve(route);

		// Escape if this module is not present in cache
		if (!_require.cache[filename]) {
			return;
		}

		// Remove all children from memory, recursively
		shidu(filename);

		// Remove module from memory as well
		delete _require.cache[filename];
	}

	/**
	 * Override a module with any given thing
	 * @param  {String} route
	 * @param  {Any}    thing
	 * @return {Any}             New exports of the module
	 */
	function override(route, thing) {
		// Resolve module location from given path
		const filename = _require.resolve(route);

		// Load it into memory
		_require(filename);

		// Override exports with new value
		_require.cache[filename].exports = thing;

		// Return exports value
		return _require(filename);
	}

	/**
	 * Reset a module
	 * @param  {String}  route
	 * @return {Any}
	 */
	function reset(route) {
		// Resolve module location from given path
		const filename = _require.resolve(route);

		// Load it into memory
		_require(filename);

		// Remove all children from memory, recursively
		shidu(filename);

		// Remove module from memory as well
		delete _require.cache[filename];

		// Return exports value
		return _require(filename);
	}

	return { clean, override, reset };
};

/**
 * Remove all children from cache as well
 * @param  {String} parent
 * @return {undefined}
 */
function shidu(filename, list = []) {
	const parent = require.cache[filename];

	if (!parent) {
		return;
	}

	// We'll delete everything later
	if (list.includes(parent)) {
		return;
	}

	list.push(parent);

	// If there are children - iterate over them
	parent.children.map(({ filename }) => filename).forEach(child => {
		// Load child to memory
		require(child);

		// Remove all of its children from memory, recursively
		shidu(child, list);

		// Remove it from memory
		delete require.cache[child];
	});
}
