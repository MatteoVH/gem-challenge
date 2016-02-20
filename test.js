const assert = require('assert');
const gem = require('./module');

describe('hexToBitArray', () => {
	describe('0', () => {
		it('[0, 0, 0, 0]', () => {
			const result = gem.hexToBitArray('0');
			assert.deepEqual([0, 0, 0, 0], result);
		});
	});

	describe('a', () => {
		it('[1, 0, 1, 0]', () => {
			const result = gem.hexToBitArray('a');
			assert.deepEqual([1, 0, 1, 0], result);
		});
	});
});
