'use strict';

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

describe('traverse binary tree', () => {
	const ASCIICharacters = [];
	for (let i = 0; i < 256; i++)
		ASCIICharacters.push(String.fromCharCode(i));

	const ASCIIBinaryTree = gem.createFullBinaryTree(8, ASCIICharacters);

	describe('[ [0], [1], [0], [0], [0], [0], [0], [1] ] ASCII (65)', () => {
		it('A', () => {
			const result = gem.traverseBinaryTree(ASCIIBinaryTree, [ [0], [1], [0], [0], [0], [0], [0], [1] ]);
			assert.equal('A', result);
		});
	});

	const base64BinaryTree = gem.createFullBinaryTree(6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/');

	describe('[ [0], [0], [0], [0], [0], [0] ] base 64', () => {
		it('A', () => {
			const result = gem.traverseBinaryTree(base64BinaryTree, [ [0], [0], [0], [0], [0], [0] ]);
			assert.equal('A', result);
		});
	});

	describe('[ [1], [0], [1], [0], [1], [0] ] base 64', () => {
		it('q', () => {
			const result = gem.traverseBinaryTree(base64BinaryTree, [ [1], [0], [1], [0], [1], [0] ]);
			assert.equal('q', result);
		});
	});

	describe('[ [1], [1], [1], [1], [1], [1] ] base 64', () => {
		it('/', () => {
			const result = gem.traverseBinaryTree(base64BinaryTree, [ [1], [1], [1], [1], [1], [1] ]);
			assert.equal('/', result);
		});
	});

	const hexBinaryTree = gem.createFullBinaryTree(4, '0123456789abcdef');
	
	describe('[ [0], [0], [0], [0] ] hex', () => {
		it('0', () => {
			const result = gem.traverseBinaryTree(hexBinaryTree, [ [0], [0], [0], [0] ]);
			assert.equal('0', result);
		});
	});

	describe('[ [1], [0], [1], [0] ] hex', () => {
		it('a', () => {
			const result = gem.traverseBinaryTree(hexBinaryTree, [ [1], [0], [1], [0] ]);
			assert.equal('a', result);
		});
	});

	describe('[ [1], [1], [1], [1] ] hex', () => {
		it('f', () => {
			const result = gem.traverseBinaryTree(hexBinaryTree, [ [1], [1], [1], [1] ]);
			assert.equal('f', result);
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

	const longBitStream = '1110101011000011111011101010011110001001000011001010111111110101000100001100001100000010100110100111001010100100110011001011111100000101000011111110100001000110'.split('');

	describe('eac3eea7890caff510c3029a72a4ccbf050fe846', () => {
		it('[' + longBitStream.toString() + ']', () => {
			const result = gem.createBitArrayFromHexString('eac3eea7890caff510c3029a72a4ccbf050fe846');
			assert.deepEqual(longBitStream, result);
		});
	});
});

describe('create base 64 string from bit array', () => {
	describe('[1, 0, 0, 0, 0, 0]', () => {
		it('g', () => {
			const result = gem.createBase64StringFromBitArray([1, 0, 0, 0, 0, 0]);
			assert.equal(result, 'g');
		});
	});
	describe('[1, 0, 0, 0, 0, 0]', () => {
		it('gx', () => {
			const result = gem.createBase64StringFromBitArray([1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1]);
			assert.equal(result, 'gx');
		});
	});
});

describe('create hex string from bit array', () => {
	describe('[]', () => {
		it('empty string', () => {
			const result = gem.createHexStringFromBitArray([]);
			assert.equal('', result);
		});
	});

	describe('[0]', () => {
		it('[0, 0, 0, 0]', () => {
			const result = gem.createHexStringFromBitArray([0, 0, 0, 0]);
			assert.deepEqual('0', result);
		});
	});

	const longBitStream = '00001001100010101011000010101011000010011011110111101001'.split('');

	describe('[' + longBitStream.toString() + ']', () => {
		it('098ab0ab09bde9', () => {
			const result = gem.createHexStringFromBitArray(longBitStream);
			assert.deepEqual('098ab0ab09bde9', result);
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

describe('fixed xor', () => {
	describe('[], []', () => {
		it('empty string', () => {
			const result = gem.fixedXor('', '');
			assert.equal('', result);
		});
	});

	describe('["a"], []', () => {
		it('mismatching array lengths', () => {
			assert.throws(gem.fixedXor);
		});
	});

	describe('["1c0111001f010100061a024b53535009181c"], ["686974207468652062756c6c277320657965"]', () => {
		it('empty string', () => {
			const result = gem.fixedXor('', '');
			assert.equal('', result);
		});
	});
});

describe('remove punctuation from word', () => {
	describe('punctuationless word: hello', () => {
		it('is already stripped of punctuation', () => {
			const result = gem.removePunctuationFromWord('hello');
			assert.equal(result, 'hello');
		});
	});

	describe('word with punctuation: hello,"', () => {
		it('hello', () => {
			const result = gem.removePunctuationFromWord('hello,"');
			assert.equal(result, 'hello');
		});
	});
});

describe('check english word correctness', () => {
	describe('empty string', () => {
		it('isn\'t a word because it\'s the empty string', () => {
			assert(!gem.wordIsCorrect(''));
		});
	});

	describe('a908shv80dh089ww3lllksjvn', () => {
		it('isn\'t a word', () => {
			assert(!gem.wordIsCorrect('a908shv80dh089ww3lllksjvn'));
		});
	});

	describe('sublimation', () => {
		it('is a word', () => {
			assert(gem.wordIsCorrect('sublimation'));
		});
	});
});


describe('score english', () => {
	describe('random hex string (aka not english at all)', () => {
		it('score < 20', () => {
			const hexGibberish = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
			const result = gem.scoreEnglish(hexGibberish);
			assert(result < 20);
		});
	});
	
	describe('random hex strings mixed with english words', () => {
		it('20 < score < 80', () => {
			const halfGibberish = `49276d206b these 96e672 are 61696e20 the 6973 
				real 3206d7573 words 290f9sw-fabs;dfasdf mixed as89@#%98sdfsldfh890 in`;
			const result = gem.scoreEnglish(halfGibberish);
			assert(result > 20);
			assert(result < 80);
		});
	});

	describe('workers of the world unite', () => {
		it('score > 80', () => {
			const result = gem.scoreEnglish('Workers of the world unite!');
			assert(result > 60);
		});
	});

	describe('bushism: fool me once', () => {
		it('score > 60 (we can\'t expect too much from bush)', () => {
			const georgeBushEnglishPhrase = `There's an old saying in Tennessee. I know it's 
				in Texas, probably in Tennessee, that says, fool me once, shame on, shame 
				on you. Fool me... you can't get fooled again.`;
			const result = gem.scoreEnglish(georgeBushEnglishPhrase);
			assert(result > 60);
		});
	});

	describe('kafka passage', () => {
		it('score > 80', () => {
			const kafkaSample = `Before he dies, all his experiences in these 
				long years gather themselves in his head to one point, a question 
				he has not yet asked the doorkeeper. He waves him nearer, since he can 
				no longer raise his stiffening body. The doorkeeper has to bend low towards 
				him, for the difference in height between them has altered much to the man's 
				disadvantage. "What do you want to know now?" asks the doorkeeper; "you are 
				insatiable." "Everyone strives to reach the Law," says the man, "so how does 
				it happen that for all these many years no one but myself has ever begged for 
				admittance?" The doorkeeper recognizes that the man has reached his end, and to 
				let his failing senses catch the words roars in his ear: "No one else could ever 
				be admitted here, since this gate was made only for you. I am now going to shut it.`;
			const result = gem.scoreEnglish(kafkaSample);
			assert(result > 80);
		});
	});
});
