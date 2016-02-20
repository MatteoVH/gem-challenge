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

describe('create full binary tree', () => {
	describe('4 levels, hexadecimal values', () => {
		it('tree of level 4', () => {
			const result = gem.createFullBinaryTree(4, '0123456789abcdef');
			assert.deepEqual(
				JSON.parse('[[[["0","1"],["2","3"]],[["4","5"],["6","7"]]],[[["8","9"],["a","b"]],[["c","d"],["e","f"]]]]'),
				result);
		});
	});
});

describe('six bits to base64', () => {
	describe('[ [0], [0], [0], [0], [0], [0] ]', () => {
		it('A', () => {
			const result = gem.sixBitsToBase64([ [0], [0], [0], [0], [0], [0] ]);
			assert.equal('A', result);
		});
	});

	describe('[ [1], [0], [1], [0], [1], [0] ]', () => {
		it('q', () => {
			const result = gem.sixBitsToBase64([ [1], [0], [1], [0], [1], [0] ]);
			assert.equal('q', result);
		});
	});
});
