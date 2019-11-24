/**
 * @module Twinsies
 */

const fs = require('fs');

const { readFile } = fs.promises;
const recursiveReaddir = require('recursive-readdir');
const outputFile = require('output-file');
const safe = require('./lib/safe');

/**
 * @typedef TwinsiesOptions
 * @type {Object}
 * @property {Object.<String>}   [source='./'] Source directory
 * @property {Object.<String>}   [target='./'] Destination directory
 * @property {Object.<RegExp[]>} [matches=[]]  List of files to watch
 * @property {Object.<Function>} [process=(data) => data]
 */

/**
 * @class Twinsies
 * @param  {TwinsiesOptions} options
 * @member {String}          source
 * @member {String}          target
 * @member {RegExp[]}        matches
 * @member {Function}        process
 * @member {FSWatcher}       watcher
 * @member {Function[]}      callbacks
 *
 * @example
 * new Twinsies({
 *   source,
 *   target,
 *   matches,
 *   process
 * }).register(
 *   (...files) => console.log(
 *		 files.map(file => `Written ${file}`).join('\n')
 *   )
 * ).start();
 */
module.exports = class Twinsies {
	/**
	 * constructor
	 * @param  {TwinsiesOptions}
	 */
	constructor({
		source = './',
		target = './',
		matches = [/.*/],
		process = data => data,
	} = {}) {
		Object.assign(this, {source, target, matches, process});
		this.watcher = null;
		this.callbacks = [];
	}

	/**
	 * register a callback to be fired after initial copy
	 * @param  {Function} callback
	 * @return self
	 */
	register(callback) {
		this.callbacks.push(callback);

		return this;
	}

	callback(...args) {
		this.callbacks.forEach(callback => callback(...args));
	}

	/**
	 * scout and start watching
	 * @return self
	 */
	start() {
		fs.mkdir(this.target, () => this.scout().watch());

		return this;
	}

	/**
	 * scout Initial watch over files (before they are watched)
	 * @return {[type]} [description]
	 */
	scout() {
		recursiveReaddir(
			this.source,
			safe(this.copyList.bind(this), console.error), // eslint-disable-line no-console
		);

		return this;
	}

	/**
	 * Copy a list of files
	 * @param  {String[]} files
	 * @return self
	 */
	copyList(files) {
		const list = files.filter(this.filter.bind(this));

		let count = list.length;

		count || this.callback(...list);

		[...list].forEach(
			filename => this.copy(
				filename, () => (--count || this.callback(list)),
			),
		);

		return this;
	}

	/**
	 * Create a watcher no the root dir
	 * @return self
	 */
	watch() {
		this.watcher = fs.watch(
			this.source,
			{ encoding: 'buffer' },
			this.respond.bind(this),
		);

		return this;
	}

	/**
	 * close the watcher
	 * @return self
	 */
	unwatch() {
		this.watcher && this.watcher.close();
		this.watcher = null;

		return this;
	}

	/**
	 * respond
	 * @param  {Enum} eventType
	 * @param  {String} filename The file that changed
	 * @return self
	 */
	respond(eventType, filename) {
		return this.copy(filename.toString(), () => this.callback(filename));
	}

	/**
	 * Should we copy this file?
	 * @param  {String} filename
	 * @return {Boolean}
	 */
	filter(filename) {
		return this.matches.some(regex => regex.test(filename));
	}

	/**
	 * copy
	 * @param  {String}	 filename
	 * @param  {Function} callback
	 * @return self
	 */
	copy(filename, done = () => {}) {
		readFile(filename)
			.then(
				buffer => outputFile(
					this.target + filename.replace(this.source, ''),
					this.process(buffer.toString()),
				),
			)
			.then(
				() => safe(done, console.error), // eslint-disable-line no-console
			)
			.catch(error => {
				console.error(error); // eslint-disable-line no-console
				done();
			});

		return this;
	}
};
