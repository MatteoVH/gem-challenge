'use strict';

var fs = require('fs');
var nodehun = require('nodehun');
var affbuf = fs.readFileSync('./node_modules/nodehun/examples/dictionaries/en_US.aff');
var dictbuf = fs.readFileSync('./node_modules/nodehun/examples/dictionaries/en_US.dic');
var dict = new nodehun(affbuf,dictbuf);

const gem = {
	hexToBitArray: function(hexCharacter) {
		switch (hexCharacter) {
			case '0':
				return [0, 0, 0, 0];
			case '1':
				return [0, 0, 0, 1];
			case '2':
				return [0, 0, 1, 0];
			case '3':
				return [0, 0, 1, 1];
			case '4':
				return [0, 1, 0, 0];
			case '5':
				return [0, 1, 0, 1];
			case '6':
				return [0, 1, 1, 0];
			case '7':
				return [0, 1, 1, 1];
			case '8':
				return [1, 0, 0, 0];
			case '9':
				return [1, 0, 0, 1];
			case 'a':
				return [1, 0, 1, 0];
			case 'b':
				return [1, 0, 1, 1];
			case 'c':
				return [1, 1, 0, 0];
			case 'd':
				return [1, 1, 0, 1];
			case 'e':
				return [1, 1, 1, 0];
			case 'f':
				return [1, 1, 1, 1];
		}
	},

	createFullBinaryTree: function(totalLevels, leavesContent) {
		//if we don't receive a string or array long enough to have full bottom level, we return null
		if (leavesContent.length !== Math.pow(2, totalLevels))
			return null;

		if (totalLevels === 0)
			return null;

		let binaryTreeRoot = new Array(2);

		let leavesContentIndex = 0;
			
		function fillTree(node, level) {
			
			if (level === totalLevels) {
				node[0] = leavesContent[leavesContentIndex];
				leavesContentIndex++;
				node[1] = leavesContent[leavesContentIndex];
				leavesContentIndex++;
			} else {
				node[0] = fillTree(new Array(2), level + 1);
				node[1] = fillTree(new Array(2), level + 1);
			}

			return node;
		}

		return fillTree(binaryTreeRoot, 1);
	},

	traverseBinaryTree: function(searchTree, bits) {
		if (bits.length === 0)
			return searchTree;

		const nodeToGo = bits.shift();

		return this.traverseBinaryTree(searchTree[nodeToGo], bits);
	},

	createBitArrayFromHexString: function(hexString) {
		let bitArray = [];
		//iterate through the string
		for (let hexStringIndex = 0; hexStringIndex < hexString.length; hexStringIndex++) {
			const curChar = hexString[hexStringIndex];

			bitArray.push(...this.hexToBitArray(curChar));
		}

		return bitArray;
	},

	createBase64StringFromBitArray: function(bitArray) {
		let result = '';
		const base64BinaryTree = this.createFullBinaryTree(6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/');

		//iterate through each 6 bits in our bit array
		//base64 characters represent 6 bits
		for (let bitArrayIndex = 0; bitArrayIndex < bitArray.length; bitArrayIndex += 6) {
			let sixBits = bitArray.slice(bitArrayIndex, bitArrayIndex + 6);

			while (sixBits.length < 6)
				sixBits.push(0);
			
			result += (this.traverseBinaryTree(base64BinaryTree, sixBits));
		}

		return result;
	},

	createASCIIStringFromBitArray: function(bitArray) {
		let result = '';
		
		const ASCIICharacters = [];
		for (let i = 0; i < 256; i++)
			ASCIICharacters.push(String.fromCharCode(i));

		const ASCIIBinaryTree = this.createFullBinaryTree(8, ASCIICharacters)

		//iterate through each 8 bits in our bit array
		//ASCII characters represent 8 bits
		for (let bitArrayIndex = 0; bitArrayIndex < bitArray.length; bitArrayIndex += 8) {
			let eightBits = bitArray.slice(bitArrayIndex, bitArrayIndex + 8);

			result += (this.traverseBinaryTree(ASCIIBinaryTree, eightBits));
		}

		return result;
	},

	createHexStringFromBitArray: function(bitArray) {
		let result = '';
		const hexBinaryTree = this.createFullBinaryTree(4, '0123456789abcdef');

		for (let bitArrayIndex = 0; bitArrayIndex < bitArray.length; bitArrayIndex += 4) {
			const fourBits = bitArray.slice(bitArrayIndex, bitArrayIndex + 4);
			result += this.traverseBinaryTree(hexBinaryTree, fourBits);
		}

		return result;
	},

	hexToBase64: function(hexString) {
		//if string is odd length
		if (hexString.length % 2)
			throw new Error('hex string was of odd length');

		//I avoided using the Buffer class in Node.js and the ES6 TypedArray
		//class because of their built in conversion methods
		const bitArray = this.createBitArrayFromHexString(hexString);

		return this.createBase64StringFromBitArray(bitArray);
	},

	hexToASCII: function(hexString) {
		//if string is oddLength
		if (hexString.length % 2)
			throw new Error('hex string was of odd length');
		
		const bitArray = this.createBitArrayFromHexString(hexString);

		return this.createASCIIStringFromBitArray(bitArray);
	},


	fixedXor: function(hexString1, hexString2) {
		let result = '';

		//pad whichever string is shorter with zeroes to equal the lengths
		while (hexString1.length < hexString2.length)
			hexString1 += '0';

		while (hexString1.length > hexString2.length)
			hexString2 += '0';

		const bitStream1 = this.createBitArrayFromHexString(hexString1);
		const bitStream2 = this.createBitArrayFromHexString(hexString2);

		const resultBitStream = [];

		for (let bitStreamIndex = 0; bitStreamIndex < bitStream1.length; bitStreamIndex++) {
			resultBitStream.push(bitStream1[bitStreamIndex] ^ bitStream2[bitStreamIndex]);
		}

		return this.createHexStringFromBitArray(resultBitStream);
	},

	//remove all normal english punctuation, while leaving that
	//which would punish strings with non-standard ascii characters
	removePunctuationFromWord: function(word) {
		return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g, "");
	},

	wordIsCorrect: function(word) {
		if (word === '')
			return false;

		//if the word has non numeric characters, it is not a word
		//for some reason our dictionary allows such words
		if (word.match(/[^a-zA-Z]/g))
			return false;

		return dict.isCorrectSync(word);
	},

	//returns a value between 0 and 100 according to how english-like a passage is
	scoreEnglish: function(input) {
		const wordList = input.split(' ');
		const wordCount = wordList.length;

		if (wordCount === 1)
			return 0;

		//remove punctuation from each split word
		//this will have negligible effect on hex gibberish, but will increase
		//the score of actual english passages immensely
		const punctuationlessWordList = wordList.map((word) => {
			return this.removePunctuationFromWord(word);
		});

		const correctWordCount = punctuationlessWordList.reduce((countSoFar, word) => {

			if (this.wordIsCorrect(word))
				return countSoFar + 1;
			else
				return countSoFar;
		}, 0);

		return correctWordCount / wordCount * 100;
	}
}

module.exports = gem;
