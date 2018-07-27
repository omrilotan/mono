const chai = require('chai');
chai.use(require('chai-string'));

Object.assign(
	global,
	chai,
	{
		sleep: (ttl = 80) => new Promise(resolve => setTimeout(resolve, ttl)),
		freeze: (ms = 0) => {
			const start = Date.now();
			while(Date.now() - start < ms) {} // eslint-disable-line no-empty
		},
	}
);

require('dont-look-up')('./packages');

process.on('unhandledRejection', error => { throw error; });
