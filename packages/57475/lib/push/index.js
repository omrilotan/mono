/**
 * Push entry to the bulk, flush when needed
 * @param  {String} entry One formatted entry
 * @return {Number}       current size of the bulk
 */
module.exports = function push(entry) {
	this.bulk.push(entry);

	const {size} = this;

	// Accumulated size does not surpass the MTU
	if (size < this.MTU) {
		this.timer = this.timer || setTimeout(this.flush, this.TTL);
		return size;
	}

	// The accumulated size matches the MTU exactly OR
	// Metric fills the MTU on it's own
	if (size === this.MTU || this.bulk.length === 1) {
		this.flush();
		return 0;
	}

	// Bulk is full, flush without current metric
	this.bulk.pop();
	this.flush();

	return push.call(this, entry);
};
