/**
 * Create modifiers to require cache based on paths (e.g. `__dirname`)
 * @param  {...String} paths
 * @return {Function}
 */
module.exports = function abuser(...paths) {

	/**
	 * Clean up a module from cache
	 * @param  {String} route
	 * @return {undefined}
	 */
	function clean(route) {

		// Resolve module location from given paths
		const filename = require.resolve(route, {paths});

		// Escape if this module is not present in cache
		if (!require.cache[filename]) {
			return;
		}

		// Remove all children from memory, recursively
		shidu(filename);

		// Remove module from memory as well
		delete require.cache[filename];
	}

	/**
	 * Override a module with any given thing
	 * @param  {String} route
	 * @param  {Any}    thing
	 * @return {Any}             New exports of the module
	 */
	function override(route, thing) {

		// Resolve module location from given paths
		const filename = require.resolve(route, {paths});

		// Load it into memory
		require(filename);

		// Override exports with new value
		require.cache[filename].exports = thing;

		// Return exports value
		return require(filename);
	}

	/**
	 * Reset a module
	 * @param  {String}  route
	 * @return {Any}
	 */
	function reset(route) {

		// Resolve module location from given paths
		const filename = require.resolve(route, {paths});

		// Load it into memory
		require(filename);

		// Remove all children from memory, recursively
		shidu(filename);

		// Remove module from memory as well
		delete require.cache[filename];

		// Return exports value
		return require(filename);
	}

	return {clean, override, reset};
};

/**
 * Remove all children from cache as well
 * @param  {String} parent
 * @return {undefined}
 */
function shidu(filename) {
	const parent = require.cache[filename];

	if (!parent) {
		return;
	}

	// If there are children - iterate over them
	parent.children
		.map(
			({filename}) => filename
		)
		.forEach(
			child => {

				// Load child to memory
				require(child);

				// Remove all of its children from memory, recursively
				shidu(child);

				// Remove it from memory
				delete require.cache[child];
			}
		);
}
