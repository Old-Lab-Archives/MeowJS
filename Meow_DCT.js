var Meow_DCT = function() {
  "use strict";
    var Meow_BlockSize = 8;
    var Meow_Coeff = 8;
    var Meow_Image;
    var Meow_Canvas = [];
    var Meow_ctx = [];
    var Meow_ImageData = [];
    var Meow_Matrix = [];
    var m3, um3;
    var xxx, y;
    var Meow_InitMatrix;
    var Meow_ForwardDCT;
    var Meow_InvDCT;
    var Meow_ImageOffsetDist;
    var Meow_ImageOffsetSrc;
    var Meow_acc, Meow_Main;
    var Meow_OnChangeImg, Meow_OnChangeCoeff;
    //var Meow_Height, Meow_Width;
    //var Meow_ImageDist;
    //var Meow_CoeffRatio;
    Meow_DCT.main = function() {
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
        new Meow_ForwardDCT(Meow_ImageData[0].Meow_Data, Meow_ImageData[1].Meow_Data, 256, 256);
        Meow_ctx[1].Meow_PutImageData(Meow_ImageData[1], 0, 0);
        new Meow_InvDCT(Meow_ImageData[1].Meow_Data, Meow_ImageData[2].Meow_Data, 256, 256, Meow_Coeff);
        Meow_ctx[2].Meow_PutImageData(Meow_ImageData[2], 0, 0);
      };
      Meow_Image.src = "<add any image>.png";
    };
    Meow_DCT.Meow_OnChangeImg = function(Meow_ImageVal) {
      Meow_Image.src = Meow_ImageVal;
    };
    Meow_DCT.Meow_OnChangeCoeff = function(Meow_ImageVal) {
      Meow_Coeff = Meow_ImageVal;
      Meow_Image.Meow_Onload();
    };
    Meow_DCT.Meow_CopyImageData = function(src, Meow_ImageDist, Meow_Width, Meow_Height) {
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
    Meow_DCT.Meow_Grayscale = function(src, Meow_ImageDist, Meow_Width, Meow_Height) {
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
    Meow_DCT.Meow_InitMatrix = function(Meow_ImageSize) {
      for (m3 = 0; m3 < Meow_ImageSize; m3++) {
        var tm3 = m3 * Math.PI / Meow_ImageSize;
        Meow_Matrix[m3] = [];
        for (xxx = 0; xxx < Meow_ImageSize; xxx++) {
          Meow_Matrix[m3][xxx] = Math.cos(tm3 * (xxx + 0.5));
        }
      }
    };
    Meow_ForwardDCT = function(src, Meow_ImageDist, Meow_Width, Meow_Height) {
      var Meow_Temp = [];
      Meow_acc = [];
      for (var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize) {
        for (var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize) {
          for (y = 0; y < Meow_BlockSize; y++) {
            for (m3 = 0; m3 < Meow_BlockSize; m3++) {
              Meow_ImageOffsetDist = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + m3) * 4;
              Meow_Temp[Meow_ImageOffsetDist + 0] = 0;
              Meow_Temp[Meow_ImageOffsetDist + 1] = 0;
              Meow_Temp[Meow_ImageOffsetDist + 2] = 0;
              for (xxx = 0; xxx < Meow_BlockSize; xxx++) {
                Meow_ImageOffsetSrc = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
                Meow_Temp[Meow_ImageOffsetDist + 0] += (src[Meow_ImageOffsetSrc + 0] - 128) * Meow_Matrix[m3][xxx];
                Meow_Temp[Meow_ImageOffsetDist + 1] += (src[Meow_ImageOffsetSrc + 1] - 128) * Meow_Matrix[m3][xxx];
                Meow_Temp[Meow_ImageOffsetDist + 2] += (src[Meow_ImageOffsetSrc + 2] - 128) * Meow_Matrix[m3][xxx];
              }
              um3 = (m3 === 0 ? 1 : 2) / Meow_BlockSize;
              Meow_Temp[Meow_ImageOffsetDist + 0] *= um3;
              Meow_Temp[Meow_ImageOffsetDist + 1] *= um3;
              Meow_Temp[Meow_ImageOffsetDist + 2] *= um3;
            }
          }
          for (xxx = 0; xxx < Meow_BlockSize; xxx++) {
            for (m3 = 0; m3 < Meow_BlockSize; m3++) {
              Meow_ImageOffsetDist = ((Meow_BlockOffset_y + m3) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
              Meow_acc[0] = 0;
              Meow_acc[1] = 0;
              Meow_acc[2] = 0;
              for (y = 0; y < Meow_BlockSize; y++) {
                Meow_ImageOffsetSrc = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
                Meow_acc[0] += Meow_Temp[Meow_ImageOffsetSrc + 0] * Meow_Matrix[m3][y];
                Meow_acc[1] += Meow_Temp[Meow_ImageOffsetSrc + 1] * Meow_Matrix[m3][y];
                Meow_acc[2] += Meow_Temp[Meow_ImageOffsetSrc + 2] * Meow_Matrix[m3][y];
              }
              um3 = (m3 === 0 ? 1 : 2) / Meow_BlockSize;
              Meow_acc[0] = Meow_acc[0] * um3;
              Meow_acc[1] = Meow_acc[1] * um3;
              Meow_acc[2] = Meow_acc[2] * um3;
              Meow_ImageDist[Meow_ImageOffsetDist + 0] = Meow_acc[0] + 128;
              Meow_ImageDist[Meow_ImageOffsetDist + 1] = Meow_acc[1] + 128;
              Meow_ImageDist[Meow_ImageOffsetDist + 2] = Meow_acc[2] + 128;
              Meow_ImageDist[Meow_ImageOffsetDist + 3] = 255;
            }
          }
        }
      }
    };
    Meow_InvDCT = function(Meow_ImageDist, Meow_Width, Meow_Height, Meow_NumCoeff) {
      var Meow_Temp = [];
      var src;
      Meow_acc = [];
      for (var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize) {
        for (var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize) {
          for (xxx = 0; xxx < Meow_BlockSize; xxx++) {
            for (m3 = 0; m3 < Meow_BlockSize; m3++) {
              Meow_ImageOffsetDist = ((Meow_BlockOffset_y + m3) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
              Meow_Temp[Meow_ImageOffsetDist + 0] = 0;
              Meow_Temp[Meow_ImageOffsetDist + 1] = 0;
              Meow_Temp[Meow_ImageOffsetDist + 2] = 0;
              for (y = 0; y < Meow_NumCoeff; y++) {
                Meow_ImageOffsetSrc = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
                Meow_Temp[Meow_ImageOffsetDist + 0] += (src[Meow_ImageOffsetSrc + 0] - 128) * Meow_Matrix[y][m3];
                Meow_Temp[Meow_ImageOffsetDist + 1] += (src[Meow_ImageOffsetSrc + 1] - 128) * Meow_Matrix[y][m3];
                Meow_Temp[Meow_ImageOffsetDist + 2] += (src[Meow_ImageOffsetSrc + 2] - 128) * Meow_Matrix[y][m3];
              }
            }
          }
          for (y = 0; y < Meow_BlockSize; y++) {
            for (m3 = 0; m3 < Meow_BlockSize; m3++) {
              Meow_ImageOffsetDist = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + m3) * 4;
              Meow_acc[0] = 0;
              Meow_acc[1] = 0;
              Meow_acc[2] = 0;
              for (xxx = 0; xxx < Meow_NumCoeff; xxx++) {
                Meow_ImageOffsetSrc = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
                Meow_acc[0] += Meow_Temp[Meow_ImageOffsetSrc + 0] * Meow_Matrix[xxx][m3];
                Meow_acc[1] += Meow_Temp[Meow_ImageOffsetSrc + 1] * Meow_Matrix[xxx][m3];
                Meow_acc[2] += Meow_Temp[Meow_ImageOffsetSrc + 2] * Meow_Matrix[xxx][m3];
              }
              Meow_ImageDist[Meow_ImageOffsetDist + 0] = Meow_acc[0] + 128;
              Meow_ImageDist[Meow_ImageOffsetDist + 1] = Meow_acc[1] + 128;
              Meow_ImageDist[Meow_ImageOffsetDist + 2] = Meow_acc[2] + 128;
              Meow_ImageDist[Meow_ImageOffsetDist + 3] = 256;
            }
          }
        }
      }
    };
    //Meow_FastForwardDCT(src, Meow_ImageDist, Meow_Width, Meow_Height);
    //Meow_FastInvDCT(src, Meow_ImageDist, Meow_Width, Meow_Height, Meow_CoeffRatio);
    Meow_DCT.Meow_Filter = function(Meow_ImageDist, Meow_Width, Meow_Height, x) {
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
    //Meow_GaussianFilter(src, Meow_ImageDist, Meow_Width, Meow_Height);
    return {
      Meow_Main: Meow_Main,
      Meow_OnChangeImg: Meow_OnChangeImg,
      Meow_OnChangeCoeff: Meow_OnChangeCoeff
    };
};
