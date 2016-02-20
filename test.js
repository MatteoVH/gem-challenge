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

describe('create bit array from hex string', () => {
	describe('0', () => {
		it('[0, 0, 0, 0]', () => {
			const result = gem.createBitArrayFromHexString('0');
			assert.deepEqual([0, 0, 0, 0], result);
		});
	});

	describe('a', () => {
		it('[1, 0, 1, 0]', () => {
			const result = gem.createBitArrayFromHexString('a');
			assert.deepEqual([1, 0, 1, 0], result);
		});
	});

	describe('00', () => {
		it('[0, 0, 0, 0, 0, 0, 0, 0]', () => {
			const result = gem.createBitArrayFromHexString('00');
			assert.deepEqual([0, 0, 0, 0, 0, 0, 0, 0], result);
		});
	});

	describe('eac3eea7890caff510c3029a72a4ccbf050fe846', () => {
		it('[' + '1110101011000011111011101010011110001001000011001010111111110101000100001100001100000010100110100111001010100100110011001011111100000101000011111110100001000110'.split('').toString() + ']', () => {
			const result = gem.createBitArrayFromHexString('eac3eea7890caff510c3029a72a4ccbf050fe846');
			assert.deepEqual('1110101011000011111011101010011110001001000011001010111111110101000100001100001100000010100110100111001010100100110011001011111100000101000011111110100001000110'.split(''), result);
		});
	});
});

describe('hex to base64', () => {
	describe('empty string', () => {
		it('should return empty string', () => {
			const result = gem.hexToBase64('');
			assert.equal('', result);
		});
	});

	describe('odd number of hex characters', () => {
		it('should throw', () => {
			assert.throws(
				gem.hexToBase64
			);
		});
	});

	describe('000000', () => {
		it('should return AAAA', () => {
			const result = gem.hexToBase64('000000');
			assert.equal('AAAA', result);
		});
	});

	describe('00', () => {
		it('should return AA', () => {
			const result = gem.hexToBase64('00');
			assert.equal('AA', result);
		});
	});

	describe('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d', () => {
		it('should return SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t', () => {
			const result = gem.hexToBase64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d');
			assert.equal('SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t', result);
		});
	});
});
