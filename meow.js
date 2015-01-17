// Main File
var MeowJS = function() {
    "use strict";
    var xMeow = document.createElement('script');
    xMeow.src = 'MeowNinjaX.js';
    document.getElementsByTagName("head")[0].appendChild(xMeow);

    MeowNinja.load(
      "Meow_Hello.js",
      "Meow_ColorParser.js",
      "Meow_Path.js",
      "Meow_EnvProcess.js",
      "Meow_Semantics.js",
      "Meow_ImageLoader.js",
      "MeowDOM.js",
      "MeowFunText.js",
      "MeowString.js",
      "MeowUTF.js",
      "meowSVG_Loader.js",
      "HiddenMeow.js",
      "MeowStream.js",
      "MeowProxy.js",
      "Meow_HTTP.js",
      "Meow_IP.js",
      "Meow_Base.js",
      "Meow_forEach.js",
      "Meow_Base64.js",
      "Meow_Buffer.js"
    );
};
