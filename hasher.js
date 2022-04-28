/* 
The following code is just for user interface, i.e when the user clicks the hash button
and display the hashed output based on input values.
*/
$(document).ready(function() {
	$("#outputBlock").hide();
	$("#hash").click(function() {
		input = $("#inputText").val();
		bits = $("#bits").val();
		$("#hashedText").text(hash(input, bits));
		$("#outputBlock").show();
	});
});
/*
Hashing logic implemented in the following function
*/
function hash(input, bits) {
	// the following is arbritarily defined and can be adjusted accordingly
	base = 16; // hexadecimal
	blockSize = bits/Math.log2(base);
	chunkSize = base * 8;

	// convert input text to a base ()
	baseStr = convertToBase(input, base);
	// padding 0s to make the length divisible by chunkSize
	chunkStr = pad(baseStr, chunkSize, "0");
	// taking the first block has the initial hash value
	hashVal = chunkStr.slice(0, blockSize);

	for (i = 1; i < chunkStr.length/blockSize; i++) {
		// extracting next block
		block = chunkStr.slice(i*blockSize, (i+1)*blockSize);
		// performing xor on hash value and block
		hashVal = xor(hashVal, block, base);
		// the hash value computed will be reused in the next iteration
	}
	// converting hash value to text
	finalHash = convertToText(hashVal, base);
	return finalHash;
}
/*
Helper functions defined
*/
function convertToBase(str, base) {
	hexStr = "";
	for (var i = 0; i < str.length; i++) {
		asciiVal = str.charCodeAt(i) % 128; // only considering 128-bit ASCII
		hexVal = asciiVal.toString(base);
		hexStr += hexVal;
	}
	return hexStr;
}
function convertToText(str, base) {
    var textStr = "";
    for (var i = 0; i < str.length - 2; i++) {
    	asciiVal = (parseInt(str.slice(i, i+2), base) % 94) + 33; // only considering printable ASCII
        textStr += String.fromCharCode(asciiVal % 128);
    }
    return textStr;
}
function pad(str, size, padElem) {
	finalSize = str.length == 0 ? size : Math.ceil(str.length/size) * size;
	paddedStr = str.padEnd(finalSize, padElem);
	return paddedStr;
}
function xor(x, y, base) {
	xorStr = "";
	// assumes both 'x' and 'y' have equal number of bits
	for (var i = 0; i < x.length; i++) {
		xr = parseInt(x.charAt(i), base) ^ parseInt(y.charAt(i), base);
		xorStr += xr.toString(base);
	}
	return xorStr;
}