const chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));
const wait = require('./packages/wait');

Object.assign(
	global,
	chai,
	{
		sleep: (ttl = 80) => new Promise(resolve => setTimeout(resolve, ttl)),
		wait,
		freeze: (ms = 0) => {
			const start = Date.now();
			while(Date.now() - start < ms) {} // eslint-disable-line no-empty
		},
	}
);

require('dont-look-up')('./packages');

process.on('unhandledRejection', error => { throw error; });
