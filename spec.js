const assert = require('assert');
const chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
const sinon = require('sinon');
const abuser = require('abuser');
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
		abuser,
	},
);

require('dont-look-up')('./packages');

process.on('unhandledRejection', error => { throw error; });
