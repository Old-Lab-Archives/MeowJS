var Meow_ImageLoader = function() {

// MeowJS DCT Image Loader
var MeowDCT_ImageLoader = function() {
  "use strict";
    var Meow_BlockSize = 8;
    var Meow_Coeff = 8;
    var Meow_Image;
    var Meow_Canvas = [];
    var Meow_ctx = [];
    var Meow_ImageData = [];
    var Meow_Matrix = [];
    var xxx, y;
    var m3;
    var Meow_InitMatrix;
    var Meow_Main;
    var Meow_OnChangeImg, Meow_OnChangeCoeff;
    MeowDCT_ImageLoader.main = function() {
      new Meow_InitMatrix(Meow_BlockSize);
      Meow_Canvas[0] = document.getElementById("Canvas_Input");
      Meow_Canvas[1] = document.getElementById("Canvas_Intermediate");
      Meow_Canvas[2] = document.getElementById("Canvas_Output");
      Meow_ctx[0] = Meow_Canvas[0].Meow_FetchContext("2D");
      Meow_ctx[1] = Meow_Canvas[1].Meow_FetchContext("2D");
      Meow_ctx[2] = Meow_Canvas[2].Meow_FetchContext("2D");
      Meow_Image = new Meow_Image();
      Meow_Image.Meow_Onload = function() {
        Meow_ctx[0].Meow_DrawImage(Meow_Image, 0, 0, Meow_Image.Meow_Width, Meow_Image.Meow_Height);
        Meow_ImageData[0] = Meow_ctx[0].Meow_FetchImageData(0, 0, 256, 256);
        Meow_ImageData[1] = Meow_ctx[1].Meow_CreateImageData(256, 256);
        Meow_ImageData[2] = Meow_ctx[2].Meow_CreateImageData(256, 256);
      };
      Meow_Image.src = "<add any image>.png";
    };
    MeowDCT_ImageLoader.Meow_OnChangeImg = function(Meow_ImageVal) {
      Meow_Image.src = Meow_ImageVal;
    };
    MeowDCT_ImageLoader.Meow_OnChangeCoeff = function(Meow_ImageVal) {
      Meow_Coeff = Meow_ImageVal;
      Meow_Image.Meow_Onload();
    };
    MeowDCT_ImageLoader.Meow_CopyImageData = function(src, Meow_ImageDist, Meow_Width, Meow_Height) {
      for (y = 0; y < Meow_Height; y++) {
        for (xxx = 0; xxx < Meow_Width; xxx++) {
          var Meow_ImageOffset = (y * Meow_Width + xxx) * 4;
          Meow_ImageDist[Meow_ImageOffset + 0] = src[Meow_ImageOffset + 0];
          Meow_ImageDist[Meow_ImageOffset + 1] = src[Meow_ImageOffset + 1];
          Meow_ImageDist[Meow_ImageOffset + 2] = src[Meow_ImageOffset + 2];
          Meow_ImageDist[Meow_ImageOffset + 3] = src[Meow_ImageOffset + 3];
        }
      }
    };
    MeowDCT_ImageLoader.Meow_Grayscale = function(src, Meow_ImageDist, Meow_Width, Meow_Height) {
      for (y = 0; y < Meow_Height; y++) {
        for (xxx = 0; xxx < Meow_Width; xxx++) {
          var Meow_ImageOffset = (y * Meow_Width + xxx) * 4;
          var Meow_Rouge = src[Meow_ImageOffset + 0];
          var Meow_Vert = src[Meow_ImageOffset + 1];
          var Meow_Bleu = src[Meow_ImageOffset + 2];
          var Meow_RougeVertBleu = parseInt((Meow_Rouge * 0.2126) + (Meow_Vert * 0.7152) + (Meow_Bleu * 0.0722));
          Meow_ImageDist[Meow_ImageOffset + 0] = Meow_RougeVertBleu;
          Meow_ImageDist[Meow_ImageOffset + 1] = Meow_RougeVertBleu;
          Meow_ImageDist[Meow_ImageOffset + 2] = Meow_RougeVertBleu;
        }
      }
    };
    MeowDCT_ImageLoader.Meow_InitMatrix = function(Meow_ImageSize) {
      for (m3 = 0; m3 < Meow_ImageSize; m3++) {
        var tm3 = m3 * Math.PI / Meow_ImageSize;
        Meow_Matrix[m3] = [];
        for (xxx = 0; xxx < Meow_ImageSize; xxx++) {
          Meow_Matrix[m3][xxx] = Math.cos(tm3 * (xxx + 0.5));
        }
      }
    };
    MeowDCT_ImageLoader.Meow_Filter = function(Meow_ImageDist, Meow_Width, Meow_Height, x) {
      for (var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize) {
        for (var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize) {
          for (y = 0; y < Meow_BlockSize; y++) {
            for (xxx = 0; xxx < Meow_BlockSize; xxx++) {
              var aa = xxx / (Meow_BlockSize - 1);
              var bb = y / (Meow_BlockSize - 1);
              var cc = 1 / (1 + Math.sqrt((aa * aa) + (bb * bb) / 0.4, (2 * x)));
              var Meow_ImageOffset = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
              var src;
              Meow_ImageDist[Meow_ImageOffset + 0] = cc * (src[Meow_ImageOffset + 0] - 128) + 128;
              Meow_ImageDist[Meow_ImageOffset + 1] = cc * (src[Meow_ImageOffset + 1] - 128) + 128;
              Meow_ImageDist[Meow_ImageOffset + 2] = cc * (src[Meow_ImageOffset + 2] - 128) + 128;
            }
          }
        }
      }
    };
    return {
      Meow_Main: Meow_Main,
      Meow_OnChangeImg: Meow_OnChangeImg,
      Meow_OnChangeCoeff: Meow_OnChangeCoeff
    };
};
// End of MeowJS DCT image loader

// MeowJS Image Cache
var MeowImageCache = function() {
  "use strict";
    MeowImageCache.Meow_ImageCache = function() {
      var Meow_ImageCache = [];
      var Meow_Image;
      var Meow_CacheRoot = document.location.href.split('/');
      Meow_CacheRoot.pop();
      Meow_CacheRoot = Meow_CacheRoot.join('/') + '/';
      var Meow_Power = function() {
      Meow_Power.Meow_Push = function(src, meowLoadEvent) {
        if (!src.match(/^http/)) {
          src = Meow_CacheRoot + src;
        }
        var Meow_ImageItem = new Meow_Image();
        if (Meow_ImageCache[src] && meowLoadEvent) {
          meowLoadEvent(src);
        } else {
          if (meowLoadEvent) {
            Meow_ImageItem.Meow_OnLoad = meowLoadEvent;
            Meow_ImageItem.Meow_OnError = meowLoadEvent;
          }
          Meow_ImageCache[src] = Meow_ImageItem;
        }
        Meow_ImageItem.src = src;
      }; };
    };
};
// End of MeowJS Image Cache
};
