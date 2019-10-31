const chai = require('chai');
const sinon = require('sinon');
const abuser = require('abuser');

chai.use(require('chai-as-promised'));
chai.use(require('chai-string'));
chai.use(require('deep-equal-in-any-order'));
chai.use(require('sinon-chai'));

Object.assign(
	global,
	chai,
	sinon,
	{
		sinon,
		abuser,
	}
);
