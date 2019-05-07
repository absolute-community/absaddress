(function (wallets, qrCode) {
	var single = wallets.singlewallet = {
		isOpen: function () {
			return (document.getElementById("singlewallet").className.indexOf("selected") != -1);
		},

		open: function () {
			if (document.getElementById("btcaddress").innerHTML == "") {
				single.generateNewAddressAndKey();
			}
			document.getElementById("singlearea").style.display = "block";
		},

		close: function () {
			document.getElementById("singlearea").style.display = "none";
		},

		// generate absolute address and private key and update information in the HTML
		generateNewAddressAndKey: function () {
			try {
				var key = new Absolute.ECKey(false);
				key.setCompressed(true);
				var absoluteAddress = key.getAbsoluteAddress();
				var privateKeyWif = key.getAbsoluteWalletImportFormat();
				document.getElementById("btcaddress").innerHTML = absoluteAddress;
				document.getElementById("btcprivwif").innerHTML = privateKeyWif;
				var keyValuePair = {
					"qrcode_public": absoluteAddress,
					"qrcode_private": privateKeyWif
				};
				qrCode.showQrCode(keyValuePair, 4);
			}
			catch (e) {
				// browser does not have sufficient JavaScript support to generate a absolute address
				alert(e);
				document.getElementById("btcaddress").innerHTML = "error";
				document.getElementById("btcprivwif").innerHTML = "error";
				document.getElementById("qrcode_public").innerHTML = "";
				document.getElementById("qrcode_private").innerHTML = "";
			}
		}
	};
})(ninja.wallets, ninja.qrCode);