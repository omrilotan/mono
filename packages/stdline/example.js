const {
	update,
	end,
} = require('.');

const DELAY = 40;

console.log('processing:');

const array = new Array(100).fill(1).map((n, i) => i);

array.forEach((n, i) => setTimeout(() => update(n + '%'), i * DELAY))

setTimeout(() => {
	end('Blast off!');
	console.log('fin');
}, array.length * DELAY);
