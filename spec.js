const chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));
const assert = require('assert');
const sinon = require('sinon');
const wait = require('./packages/wait');
const sleep = require('./packages/sleep');

Object.assign(
	global,
	chai,
	sinon,
	{
		chai,
		assert,
		sinon,
		wait,
		sleep,
	}
);

require('dont-look-up')('./packages');

process.on('unhandledRejection', error => { throw error; });
