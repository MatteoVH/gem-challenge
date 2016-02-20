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
	}
}

module.exports = gem;
