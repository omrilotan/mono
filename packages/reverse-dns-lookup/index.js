const execute = require("async-execute");

class ReverseDNSLookupError extends Error {
	get name() {
		return "ReverseDNSLookupError";
	}
}

/**
 * Throws errors on mismatches
 * @param  {String}    ip
 * @param  {...String} domain
 * @return {undefined}
 */
async function source(ip, ...domains) {
	const forward = await execute(`host ${ip}`);
	if (!new RegExp(`(${domains.join("|")}).?$`).test(forward)) {
		throw new ReverseDNSLookupError(
			`${ip} does not match domain ${domains.join(
				", "
			)}. (resolves to ${forward.split(" ").pop()})`
		);
	}

	const backward = await execute(`host ${forward.split(" ").pop()}`);
	if (!new RegExp(`${ip}.?$`).test(backward)) {
		throw new ReverseDNSLookupError(
			`${backward} does not resolve back to ${ip}`
		);
	}
}

/**
 * Catch ReverseDNSLookupError and return boolean
 * @param  {String}    ip
 * @param  {...String} domain
 * @return {Boolean}
 */
async function reverseDNSLookup(ip, ...domains) {
	try {
		await source(ip, domains);
		return true;
	} catch (error) {
		if (error instanceof ReverseDNSLookupError) {
			return false;
		}

		throw error;
	}
}

reverseDNSLookup.source = source;

module.exports = reverseDNSLookup;
