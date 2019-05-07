//https://raw.github.com/absolutejs/absolutejs-lib/09e8c6e184d6501a0c2c59d73ca64db5c0d3eb95/src/address.js
Absolute.Address = function (bytes) {
	if ("string" == typeof bytes) {
		bytes = Absolute.Address.decodeString(bytes);
	}
	this.hash = bytes;
	this.version = Absolute.Address.networkVersion;
};

Absolute.Address.networkVersion = 0x00; // mainnet

/**
* Serialize this object as a standard Absolute address.
*
* Returns the address as a base58-encoded string in the standardized format.
*/
Absolute.Address.prototype.toString = function () {
	// Get a copy of the hash
	var hash = this.hash.slice(0);

	// Version
	hash.unshift(this.version);
	var checksum = Crypto.SHA256(Crypto.SHA256(hash, { asBytes: true }), { asBytes: true });
	var bytes = hash.concat(checksum.slice(0, 4));
	return Absolute.Base58.encode(bytes);
};

Absolute.Address.prototype.getHashBase64 = function () {
	return Crypto.util.bytesToBase64(this.hash);
};

/**
* Parse a Absolute address contained in a string.
*/
Absolute.Address.decodeString = function (string) {
	var bytes = Absolute.Base58.decode(string);
	var hash = bytes.slice(0, 21);
	var checksum = Crypto.SHA256(Crypto.SHA256(hash, { asBytes: true }), { asBytes: true });

	if (checksum[0] != bytes[21] ||
			checksum[1] != bytes[22] ||
			checksum[2] != bytes[23] ||
			checksum[3] != bytes[24]) {
		throw "Checksum validation failed!";
	}

	var version = hash.shift();

	if (version != 0) {
		throw "Version " + version + " not supported!";
	}

	return hash;
};