'use strict';

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

	hexToBase64: function(hexString) {
		//if string is odd length
		if (hexString.length % 2) {
			throw new Error('hex string was of odd length');
		}

		//I avoided using the Buffer class in Node.js and the ES6 TypedArray
		//class because of their built in conversion methods
		const bitArray = this.createBitArrayFromHexString(hexString);



	}
}

module.exports = gem;
