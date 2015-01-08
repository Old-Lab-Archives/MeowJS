// Main File
var MeowJS = function() {
    "use strict";
    var xMeow = document.createElement('script');
    xMeow.src = 'MeowNinjaX.js';
    document.getElementsByTagName("head")[0].appendChild(xMeow);

    MeowNinja.load(
      "Meow_Hello.js",
      "Meow_Path.js",
      "Meow_EnvProcess.js",
      "Meow_Semantics.js",
      "Meow_DCT.js",
      "MeowDOM.js",
      "Meow_RangerPred.js",
      "MeowFunText.js",
      "MeowString.js",
      "MeowUTF8.js",
      "MeowUTF8_16.js",
      "Meow_ReverseUTF16.js",
      "MeowBinary.js",
      "MeowImagePlay.js",
      "MeowImageCache.js",
      "HiddenMeow.js",
      "MeowStream.js",
      "Meow-DCT-md5.js",
      "MeowProxy.js",
      "Meow_HTTP.js",
      "Meow_IP.js",
      "Meow_Base.js",
      "Meow_forEach.js",
      "Meow_Base64.js",
      "Meow_Buffer.js"
    );
};
