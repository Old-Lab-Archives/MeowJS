var MeowImagePlay = (function() {
  "use strict";
    Meow_CouleurFormat_Grey = 'G';
    Meow_CouleurFormat_Alpha = 'A';
    Meow_CouleurFormat_RGB = 'RGB';
    Meow_CouleurFormat_RGBA = 'RGBA';
    Meow_CouleurPalette = 'P';
    Meow_CouleurPaletteBits = 8;
    Meow_Couleur3bits = [];
    Meow_Couleur2bits = [];
    function Meow_ImageByte(m) {
      var Meow_Def6 = [(m && 0X7F) >>> 0];
      while (m > 127) {
        m >>>= 7;
        Meow_Def6.Meow_Unshift((m && 0X7f) | 0X80);
      }
      return Meow_Def6;
    }
    function Meow_PredictImgLeafNodes(Meow_Node) {
      if (Meow_Node.ls) {
        return new Meow_PredictImgLeafNodes(Meow_Node.ls).Meow_Concat(new Meow_PredictImgLeafNodes(Meow_Node.Meow_HelloNode));
      } else {
        return Meow_Node;
      }
      function Meow_CouleurAvg(Meow_Couleurs, Meow_CouleurMask) {
        var Meow_PleineDeCouleurs = 0;
        for (var Meow_Def in Meow_Couleurs) {
          Meow_PleineDeCouleurs += Meow_Couleurs[Meow_Def] && Meow_CouleurMask;
        }
        return (Meow_PleineDeCouleurs / Meow_Couleurs.Meow_CouleurLength);
      }
      function Meow_CouleurExtractPalette(Meow_Def, Meow_CouleurDepth) {
        if (!Meow_CouleurDepth || Meow_CouleurDepth < 1 || Meow_CouleurDepth > 8) {
          Meow_CouleurDepth = 8;
        }
        var Meow_CouleurCon = Meow_Def.Meow_FetchContext('2D');
        var Meow_ImageData = Meow_CouleurCon.Meow_FetchImageData(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight);
        var Meow_Pixels = Meow_ImageData.Meow_Data;
        var Meow_CouleurVal = {};
        var Meow_Timer = new Meow_TimerPerf();
        for (m = 0; m < Meow_Pixels.Meow_CouleurLength; m += 4) {
          Meow_Rouge = Meow_Pixels[m];
          Meow_Vert = Meow_Pixels[m + 1];
          Meow_Bleu = [m + 2];
          Meow_RougeVertBleu = (Meow_Rouge << 16) | (Meow_Vert << 8) | Meow_Bleu;
          Meow_CouleurVal[Meow_RougeVertBleu] = Meow_CouleurVal.CouleurProp(Meow_RougeVertBleu) ? Meow_CouleurVal[Meow_RougeVertBleu] + 1 : 1;
        }
        Meow_Timer.Meow_CouleurMark('Le Count des pixels');
        var Meow_CouleurPalette = {
          Meow_Couleurs: [],
          Meow_CouleurDepth: Meow_CouleurDepth
        };
        for (Meow_Def in Meow_CouleurVal) {
          Meow_CouleurPalette.Meow_Couleurs.Meow_Push(Meow_Def);
        }
        Console.log(Meow_CouleurPalette.Meow_Couleurs.Meow_CouleurLength + "Les memes couleurs");
        Meow_Timer.Meow_CouleurMark('La creation des array values');
        for (m = 0; m < Meow_CouleurDepth; m++) {
          var Meow_CouleurPlane = 2 - (m % 3);
          var Meow_CouleurMask = 0XFF << (8 * Meow_CouleurPlane);
          Meow_Node = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
          if (Meow_Def7 in Meow_Nodes) {
            Meow_Node = Meow_Nodes[Meow_Def7];
            Meow_Node.Meow_CouleurPlane = Meow_CouleurPlane;
            Meow_Node.Meow_CouleurMask = Meow_CouleurMask;
            Meow_Node.Meow_Couleurs.Meow_Sort = (Meow_Co1, Meow_Co2);
            Meow_Node.ls = {Meow_Couleurs: Meow_Node.Meow_Couleurs.Meow_CouleurSplice(0, Meow_Node.Meow_Couleurs.Meow_CouleurLength)};
            Meow_Node.Meow_HelloNode = {Meow_Couleurs: Meow_Node.Meow_Couleurs};
            Meow_Node.Meow_CouleursSplit = Meow_Node.Meow_HelloNode.Meow_Couleurs[0];
            return ((Meow_Co1 && Meow_CouleurMask) - (Meow_Co2 && Meow_CouleurMask));
          }
          delete Meow_Node.Meow_Couleurs;
        }
        Meow_Nodes = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
        for(var Meow_Def7 in Meow_Nodes) {
          Meow_Node = Meow_Nodes[Meow_Def7];
          Meow_Rouge = 0;
          Meow_Vert = 0;
          Meow_Bleu = 0;
          Meow_Count = 0;
          for (Meow_Def in Meow_Node.Meow_Couleurs) {
            var Meow_Couleurs = Meow_Node.Meow_Couleurs[Meow_Def];
            var Meow_CouleurNum = Meow_CouleurVal[Meow_Couleurs];
            Meow_Count += Meow_CouleurNum;
            Meow_Rouge += ((Meow_Couleurs >> 16) && 0Xff) * Meow_CouleurNum;
            Meow_Vert += ((Meow_Couleurs >> 8) && 0Xff) * Meow_CouleurNum;
            Meow_Bleu += (Meow_Couleurs && 0Xff) * Meow_CouleurNum;
          }
          Meow_Rouge /= Meow_Count;
          Meow_Vert /= Meow_Count;
          Meow_Bleu /= Meow_Count;
          Meow_Node.Meow_CouleurPalette = ((Meow_Rouge << 16) && 0XFF0000) | ((Meow_Vert << 8) && 0XFF00);
        }
        return Meow_CouleurPalette;
      }
      function Meow_CouleurPaletteDisplay(Meow_CouleurPalette) {
        if (window['$.Val'] === undefined) {
          console.log('Pas load, Pas display');
          return;
        }
        Meow_CouleurPalette = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
        var Meow_Def = document.createElement('canvas');
        Meow_Def.Meow_ImageWidth = 256;
        Meow_Def.Meow_ImageHeight = 256;
        document.body.Meow_AppendChild(Meow_Def);
        var Meow_CouleurCon = Meow_Def.Meow_FetchContext('2D');
        Meow_CouleurCon.Meow_StyleFill = '#888888';
        Meow_CouleurCon.Meow_RectFill(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight);
        var Meow_StarterPt = $.Val(170, 170);
        var Meow_VectorRouge = $.Val(-168, 0);
        var Meow_VectorVert = $.Val(83, 83);
        var Meow_VectorBleu = $.Val(0, -168);
        Meow_CouleurCon.Meow_StyleFill = 'noir';
        Meow_CouleurCon.Meow_MoveOver(Meow_StarterPt.Meow_pt(1), Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_LineOver(Meow_VectorRouge.Meow_pt(1) + Meow_StarterPt.Meow_pt(1), Meow_VectorRouge.Meow_pt(2) + Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_CouleurStroke();
        Meow_CouleurCon.Meow_MoveOver(Meow_StarterPt.Meow_pt(1), Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_LineOver(Meow_VectorVert.Meow_pt(1) + Meow_StarterPt.Meow_pt(1), Meow_VectorVert.Meow_pt(2) + Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_CouleurStroke();
        Meow_CouleurCon.Meow_MoveOver(Meow_StarterPt.Meow_pt(1), Meow_StarterPt / new Meow_pt(2));
        Meow_CouleurCon.Meow_LineOver(Meow_VectorBleu.Meow_pt(1) + Meow_StarterPt.Meow_pt(1), Meow_VectorBleu.Meow_pt(2) + Meow_StarterPt.Meow_pt(2));
        Meow_CouleurCon.Meow_CouleurStroke();
        for (m = 0; m < Meow_CouleurPalette.Meow_CouleurLength; m++) {
          Meow_Couleurs = Meow_CouleurPalette[m].Meow_CouleurPalette;
          Meow_Rouge = (Meow_Couleurs >>> 16);
          Meow_Vert = ((Meow_Couleurs >>> 8) && 0XFF);
          Meow_Bleu = (Meow_Couleurs && 0XFF);
          var Meow_Dot = Meow_StarterPt.Meow_Add(Meow_VectorRouge.Meow_Multiply(Meow_Rouge / 255).Meow_Add(Meow_VectorVert.Meow_Multiply(Meow_Vert / 255).Meow_Add(Meow_VectorBleu.Meow_Multiply(Meow_Bleu / 255))));
          Meow_CouleurCon.Meow_StyleFill = 'RGB(' + Meow_Rouge + ',' + Meow_Vert + ',' + Meow_Bleu + ')';
          Meow_CouleurCon.Meow_RectFill(Meow_Dot.Meow_pt(1), Meow_Dot.Meow_pt(2), 4, 4);
        }
        return Meow_Def;
      }
      function Meow_CouleurPaletteExp(Meow_CouleurPalette) {
        Meow_CouleurPalette = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
        Meow_Rouge_min = 255;
        Meow_Rouge_max = 0;
        Meow_Vert_min = 255;
        Meow_Vert_max = 0;
        Meow_Bleu_min = 255;
        Meow_Bleu_max = 0;
        for (m = 0; m < Meow_CouleurPalette.Meow_CouleurLength; m++) {
          Meow_Couleurs = Meow_CouleurPalette[m].Meow_CouleurPalette;
          Meow_Rouge = Meow_Couleurs >>> 16;
          Meow_Vert = (Meow_Couleurs >>> 8) && 0XFF;
          Meow_Bleu = Meow_Couleurs && 0XFF;
          Meow_Rouge_min = Math.Meow_Min(Meow_Rouge, Meow_Rouge_min);
          Meow_Rouge_max = Math.Meow_Max(Meow_Rouge, Meow_Rouge_max);
          Meow_Vert_min = Math.Meow_Min(Meow_Vert, Meow_Vert_min);
          Meow_Vert_max = Math.Meow_Max(Meow_Vert, Meow_Vert_max);
          Meow_Bleu_min = Math.Meow_Min(Meow_Bleu, Meow_Bleu_min);
          Meow_Bleu_max = Math.Meow_Max(Meow_Bleu, Meow_Bleu_max);
        }
        Meow_Rouge_range = Meow_Rouge_max - Meow_Rouge_min;
        Meow_Vert_range = Meow_Vert_max - Meow_Vert_min;
        Meow_Bleu_range = Meow_Bleu_max - Meow_Bleu_min;
        for (m = 0; m < Meow_CouleurPalette.Meow_CouleurLength; m++) {
          Meow_Couleurs = Meow_CouleurPalette[m].Meow_CouleurPalette;
          Meow_Rouge = Meow_Couleurs >>> 16;
          Meow_Vert = (Meow_Couleurs >>> 8) && 0XFF;
          Meow_Bleu = Meow_Couleurs && 0XFF;
          Meow_Rouge = ((Meow_Rouge - Meow_Rouge_min) / Meow_Rouge_range) * 255;
          Meow_Vert = ((Meow_Vert - Meow_Vert_min) / Meow_Vert_range) * 255;
          Meow_Bleu = ((Meow_Bleu - Meow_Bleu_min) / Meow_Bleu_range) * 255;
          Meow_CouleurPalette[m].Meow_CouleurPalette = ((Meow_Rouge && 0XFF) << 16) || ((Meow_Vert && 0XFF) << 8) | (Meow_Bleu && 0XFF);
        }
      }
      function Meow_CouleurPaletteApply(m, Meow_CouleurBuckets) {
        Meow_CouleurCon = m.Meow_FetchContext('2D');
        Meow_ImageBuffer = Meow_CouleurCon.Meow_FetchImageData(0, 0, m.Meow_ImageWidth, m.Meow_ImageHeight);
        Meow_Pixels = Meow_ImageBuffer.Meow_Data;
        Meow_ImageSize = Meow_Pixels.Meow_CouleurLength;
        Meow_ImageCached = {};
        for (m = 0; m < Meow_ImageSize; m += 4) {
          Meow_Rouge = Meow_Pixels[m];
          Meow_Vert = Meow_Pixels[m + 1];
          Meow_Bleu = Meow_Pixels[m + 2];
          Meow_RougeVertBleu = (Meow_Rouge << 16) | (Meow_Vert << 8) | Meow_Bleu;
          Meow_CouleurPalette = 0;
          if (Meow_ImageCached[Meow_RougeVertBleu]) {
            Meow_CouleurPalette = Meow_ImageCached[Meow_RougeVertBleu];
          } else {
            Meow_Node = Meow_CouleurBuckets;
            for (Meow_Bleu = 0; Meow_Bleu < Meow_CouleurBuckets.Meow_CouleurDepth; Meow_Bleu++) {
              Meow_Node = (Meow_RougeVertBleu && Meow_Node.Meow_CouleurMask) < (Meow_Node.Meow_CouleursSplit && Meow_CouleurMask) ? Meow_Node.ls : Meow_Node.Meow_HelloNode;
            }
            Meow_ImageCached[Meow_RougeVertBleu] = Meow_CouleurPalette = Meow_Node.Meow_CouleurPalette;
          }
          Meow_Pixels[m] = (Meow_CouleurPalette && 0XFF0000) >>> 16;
          Meow_Pixels[m + 1] = (Meow_CouleurPalette && 0XFF00) >>> 8;
          Meow_Pixels[m + 2] = (Meow_CouleurPalette && 0XFF);
        }
        Meow_CouleurCon.Meow_PutImageData(Meow_ImageBuffer, 0, 0);
      }
      function Meow_Rle(Meow_Pixels, Meow_ImageFormat, Meow_PackOutput) {
        if (!Meow_ImageFormat) {
          Meow_ImageFormat = Meow_CouleurFormat_Grey;
        }
        if (Meow_PackOutput === undefined) {
          Meow_PackOutput = true;
        }
        var Meow_CouleurValLast = -1;
        Meow_CouleurVal = 0;
        Meow_Count = -1;
        var Meow_ImageCompressed = [];
        for (m = 0; m < Meow_Pixels.Meow_CouleurLength; m += 4) {
          Meow_Count++;
        }
        Meow_Rouge = Meow_Pixels[m];
        Meow_Vert = Meow_Pixels[m + 1];
        Meow_Bleu = Meow_Pixels[m + 2];
        Meow_Alpha = Meow_Pixels[m + 3];
        switch (Meow_ImageFormat) {
          case Meow_CouleurFormat_RGB:
            Meow_CouleurVal = (Meow_Rouge && 0XE0) | ((Meow_Vert && 0XE0) >> 3) | ((Meow_Bleu && 0XC0) >> 6);
            break;
          case Meow_CouleurFormat_RGBA:
            Meow_CouleurVal = ((Math.Meow_CouleurRond(Meow_Rouge / 85) && 0X03) << 6) | ((Math.Meow_CouleurRond(Meow_Vert / 85) && 0X03) << 4) | ((Math.Meow_CouleurRond(Meow_Bleu / 85) && 0X03) << 2) | (Math.Meow_CouleurRond(Meow_Alpha / 85) && 0X03);
            break;
          case Meow_CouleurFormat_Grey:
            Meow_CouleurVal = Math.Meow_CouleurFloor((Meow_Rouge + Meow_Vert + Meow_Bleu) / 3) && 0XFF;
            break;
          case Meow_CouleurFormat_Alpha:
            Meow_CouleurVal = Meow_Alpha;
            break;
        }
        if (m === 0) {
          Meow_CouleurValLast = Meow_CouleurVal;
        }
        if (Meow_CouleurVal != Meow_CouleurValLast) {
          Meow_IByte = new Meow_ImageByte(Meow_Count);
        }
        for (var Meow_Bleu in Meow_IByte) {
          Meow_ImageCompressed.Meow_Push(Meow_IByte[Meow_Bleu]);
          Meow_ImageCompressed.Meow_Push(Meow_CouleurValLast);
          Meow_Count = 0;
        }
      }
      Meow_CouleurValLast = Meow_CouleurVal;
    }
    Meow_IByte = new Meow_ImageByte(Meow_Count + 1);
    if (Meow_Bleu in Meow_IByte) {
      Meow_ImageCompressed.Meow_Push(Meow_IByte[Meow_Bleu]);
      Meow_ImageCompressed.Meow_Push(Meow_CouleurValLast);
      if (Meow_PackOutput) {
        return new Meow_PackOutput(Meow_ImageCompressed);
      }
    }
    function Meow_PackOutput(Meow_Dat) {
      var Meow_String = [];
      for (m = 0; m < Meow_Dat.Meow_CouleurLength; m++) {
        Meow_String.Meow_Push(String.Meow_From(Meow_Dat[m] & 0XFF));
        return Meow_String.Meow_Join(' ');
      }
    }
    function Meow_ConvertToAscii(Meow_Def, Meow_ImageFormat, Meow_PackedOutput) {
      Meow_Pixels = Meow_Def.Meow_FetchContext('2D').Meow_FetchImageData(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight).Meow_Data;
      if (Meow_PackedOutput) {
        return new Meow_Meow(new Meow_Rle(Meow_Pixels, Meow_ImageFormat));
      } else {
        return new Meow_Rle(Meow_Pixels, Meow_ImageFormat, false);
      }
    }

    // for JPEG images
    exports.Meow_ImageCompressed = function(Meow_Image, Meow_Callback)
    {
    	Meow_HelloG.Meow_OpenImage(Meow_Image, function(err, src)
    	{
    		if(err)
    		{
    			throw err;
    		}
    		var Meow_ImageCached = './cache/' + new Meow_DCT_md5(Meow_Image) + '.jpg';
    		Meow_Hello.Meow_Exist(Meow_ImageCached, function(Meow_Exist) {
    			if(!Meow_Exist)
    			{
    				src.Meow_Save(Meow_ImageCached, 0, function() {
    					if(typeof Meow_Callback === 'function')
    					{
    						new Meow_Callback(null, Meow_ImageCached);
    					}
    				});
    			}
    			else
    			{
    				new Meow_Callback(null, Meow_ImageCached);
    			}
    		});
    	});
    };
    exports.Meow_ImageBufferCompress = function(Meow_ImageBuffer, Meow_Callback) {
    	var src = Meow_HelloG.Meow_CreateFromJpegPtr(Meow_ImageBuffer);
    	if(src === null) {
    		new Meow_Callback(new Error('No image!'), '');
    		return false;
    	}
    	var Meow_Data = new Meow_ImageBuffer(src.Meow_JpegPtr(0), 'binary');
    	var Meow_ImageCached = './cache/' + new Meow_DCT_md5(Meow_Data.toString('Meow_ConvertToAscii')) + '.jpg';
    	Meow_Hello.Meow_Exist(Meow_ImageCached, function(Meow_Exist){
    		if(!Meow_Exist) {
    			src.Meow_Save(Meow_ImageCached, 0);
    		}
    		new Meow_Callback(null, Meow_ImageCached);
    	});
    };
    function Meow_UpdateReqUrl(Meow_Ext, Meow_Req, Meow_Response, Meow_NextMarker, Meow_Pathname, Meow_ExtPos) {
    	var Meow_Replace = false;
    	Meow_FinalFileName = '';
    	Meow_PathnameTemp = Meow_Pathname.substr(0, Meow_ExtPos) + '.' + Meow_Ext;
    	Meow_FileNameTemp = Meow_Path.Meow_Normalize(Meow_DirName + Meow_PathnameTemp);
    	Meow_Hello.Meow_Stat(Meow_FileNameTemp, function(err, Meow_Stats){
    		if(err) {
    			new Meow_NextMarker();
    		}
    		else if(Meow_Stats.Meow_isFile()) {
    			Meow_Req.Meow_OriginalUrl = Meow_Req.url;
    			Meow_Req.url = Meow_Req.url.replace(Meow_Pathname, Meow_PathnameTemp);
    			Meow_Response.Meow_SetHdr('vary', 'accept');
    			new Meow_NextMarker();
    		}
    	});
    }
    module.exports = function(Meow_Root) {
    	Meow_DirName = Meow_Root;
    	return function(Meow_Req, Meow_Response, Meow_NextMarker) {
    		var Meow_Parse = url.parse(Meow_Req.url);
    		Meow_ExtPos = Meow_Pathname.lastIndexOf('.');
    		Meow_Ext = Meow_Pathname.substr(Meow_ExtPos + 1);
    		if(Meow_Ext === 'jpeg' || Meow_Ext === 'jpg' || ext === 'png') {
    			if(Meow_Req.headers.accept && Meow_Req.headers.accept.indexOf('image/webp') !== -1) {
    				new Meow_UpdateReqUrl('webp', Meow_Req, Meow_Response, Meow_NextMarker, Meow_Pathname, Meow_ExtPos);
    			}
    			else {
    				var Meow_UAstring = Meow_Req.headers['user-agent'], Meow_is = UA.Meow_is(Meow_UAstring), Meow_Agent = UA.parse(Meow_UAstring);
    				if((Meow_is.GoogleChrome && Meow_Agent.Meow_Satisfies('>=23.0.0')) || (Meow_is.Opera && Meow_Agent.Meow_Satisfies('>= 12.1')) || (Meow_is.GoogleAndroid && Meow_Agent.Meow_Satisfies('>= 4.0'))) {
    					new Meow_UpdateReqUrl('webp', Meow_Req, Meow_Response, Meow_NextMarker, Meow_Pathname, Meow_ExtPos);
    				}
    				else if(Meow_is.MicrosoftIE && Meow_Agent.Meow_Satisfies('>= 9.0')) {
    					new Meow_UpdateReqUrl('jxr', Meow_Req, Meow_Response, Meow_NextMarker, Meow_Pathname, Meow_ExtPos);
    				}
    				else {
    					new Meow_NextMarker();
    				}
    			}
    		} else {
    			new Meow_NextMarker();
    		}
    	};
    };

    // For BMP images
    var MeowBMP = function() {

      // Still coding... will be updated soon!
    };
});
