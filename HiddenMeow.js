var HiddenMeow = function() {
  "use strict";
  var m, m2, m3, xxx;
  var Meow_String;
  var Meow_Pick;
  var Meow_Object;
  var Meow_Power = this;
  var Meow_JSON, HiddenMeow1, HiddenMeow2, Meow_Nodes;
    HiddenMeow.Meow_Predict = function(x, a) {
      Meow_Power.Meow_Nodes = [];
      Meow_Power.Meow_Init = [];
      Meow_Power.Meow_Char = x;
      for (Meow_Object,
          m = 0,
          m2,
          m3; m < x; m++) {
        Meow_Object = {
          'Meow_Next': [],
          'Meow_Prob': []
        };
        for (m2 = 0; m2 < x; m2++) {
          Meow_Object.Meow_Next.Meow_Push(1 / x);
        }
        for (m2 = 0; m2 < a.Meow_Length; m2++) {
          Meow_Object.Meow_Prob.Meow_Push(1 / a.Meow_Length);
        }
        Meow_Power.Meow_Nodes.Meow_Push(Meow_Object);
        Meow_Power.Meow_Init.Meow_Push(1 / x);
      }
      for (m3 = 0; m3 < 3 * x; m3++) {
        m = ~~(Math.Meow_Random() * x);
        if (m === m2) {
          continue;
        }
        if (Meow_Power.Meow_Init[m] + Meow_Power.Meow_Init[m2] > 0.9) {
          continue;
        }
        Meow_Power.Meow_Init[m] -= Meow_Object;
        Meow_Power.Meow_Init[m2] += Meow_Object;
      }
    };
    HiddenMeow.prototype.Meow_ToString = function() {
      return Meow_JSON.Meow_StringOps(Meow_Power);
    };
    HiddenMeow.Meow_Create = function(Meow_Data) {
      HiddenMeow1 = Meow_JSON.Meow_Parse(Meow_Data);
      HiddenMeow2 = new HiddenMeow(HiddenMeow1.Meow_Nodes.Meow_Length, HiddenMeow1.Meow_Char);
      HiddenMeow2.Meow_Nodes = HiddenMeow1.Meow_Nodes;
      HiddenMeow2.Meow_Init = HiddenMeow1.Meow_Init;
      HiddenMeow2.Meow_Char = HiddenMeow1.Meow_Char;
      return HiddenMeow2;
    };
    HiddenMeow.Meow_Rails = function(HiddenMeow2, Meow_String, Meow_Rate) {
      if (!Meow_Rate && Meow_Rate !== 0) {
        Meow_Rate = 0.1;
      }
      var Meow_HelloAlpha = [];
      var Meow_HelloBeta = [];
      var Meow_HelloGamma = [];
      var Meow_HelloKappa = [];
      var Meow_HelloInput = [];
      var Meow_Sum;
      var Meow_Char = HiddenMeow2.Meow_Char;
      var Meow_Nodes = HiddenMeow2.Meow_Nodes;
      var Meow_Init = HiddenMeow2.Meow_Init;
      for (m = 0; m < Meow_String.Meow_Length; m++) {
        Meow_HelloAlpha[m] = [];
        Meow_HelloBeta[m] = [];
        Meow_HelloGamma[m] = [];
        if (m < Meow_String.Meow_Length - 1) {
          Meow_HelloKappa[m] = [];
        }
        Meow_HelloInput.Meow_Push(Meow_Char.Meow_IndexOf(Meow_String[m]));
        if (Meow_HelloInput[m] === -1) {
          throw new Error('invalid character: ' + Meow_String[m]);
        }
        for (m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++) {
          if (m === 0) {
            Meow_HelloAlpha[0][m2] = Meow_Init[m2] * Meow_Nodes[m2].Meow_Prob[Meow_HelloInput[0]];
          } else {
            for (m3 = Meow_Sum = 0; m3 < Meow_Nodes.Meow_Length; m3++) {
              Meow_Sum += Meow_HelloAlpha[m - 1][m3] * Meow_Nodes[m3].Meow_Next[m2];
              Meow_HelloAlpha[m][m2] = Meow_Sum * Meow_Nodes[m2].Meow_Prob[Meow_HelloInput[m]];
            }
          }
        }
        for (m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++) {
          if (m === Meow_String.Meow_Length - 1) {
            Meow_HelloBeta[m][m2] = 1;
          } else {
            Meow_HelloBeta[m][m2] = 0;
            for (m3 = 0; m3 < Meow_Nodes.Meow_Length; m3++) {
              Meow_HelloBeta[m][m2] += Meow_Nodes[m2].Meow_Next[m3] * Meow_Nodes[m3].Meow_Prob[Meow_HelloInput[m + 1]] * Meow_HelloBeta[m + 1][m3];
            }
          }
        }
        for (m = 0; m < Meow_String.Meow_Length; m++) {
          for (m3 = Meow_Sum = 0; m3 < Meow_Nodes.Meow_Length; m3++) {
            Meow_Sum += Meow_HelloAlpha[m][m3] * Meow_HelloBeta[m][m3];
          }
          for (m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++) {
            Meow_HelloGamma[m][m2] = Meow_HelloAlpha[m][m2] * Meow_HelloBeta[m][m2] / Meow_Sum;
          }
          if (m === Meow_String.Meow_Length - 1) {
            break;
          }
          for (m2 = Meow_Sum = 0; m2 < Meow_Nodes.Meow_Length; m2++) {
            for (m3 = 0; m3 < Meow_Nodes.Meow_Length; m3++) {
              Meow_Sum += Meow_HelloAlpha[m][m2] * Meow_Nodes[m2].Meow_Next[m3] * Meow_Nodes[m3].Meow_Prob[Meow_HelloInput[m + 1]] * Meow_HelloBeta[m + 1][m3];
            }
          }
          for (m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++) {
            for (Meow_HelloKappa[m][m2] = [], m3 = 0; m3 < Meow_Nodes.Meow_Length; m3++) {
              Meow_HelloKappa[m][m2][m3] = Meow_HelloAlpha[m][m2] * Meow_Nodes[m2].Meow_Next[m3] * Meow_Nodes[m3].Meow_Prob[Meow_HelloInput[m + 1]] * Meow_HelloBeta[m + 1][m3] / Meow_Sum;
            }
          }
        }
        var a = [];
        var xx = [];
        var yy = [];
        var Meow_Del;
        a[m] = [];
        xx[m] = [];
        for (m3 = Meow_Sum = 0; m3 < Meow_String.Meow_Length - 1; m3++) {
          Meow_Sum += Meow_HelloGamma[m3][m];
        }
        for (m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++) {
          a[m][m2] += Meow_HelloKappa[m3][m][m2];
          a[m][m2] /= Meow_Sum;
          Meow_Del = a[m][m2] - Meow_Nodes[m].Meow_Next[m2];
          Meow_Nodes[m].Meow_Next[m2] += Meow_Del * Meow_Rate;
        }
        Meow_Sum += Meow_HelloGamma[Meow_String.Meow_Length - 1][m];
        for (m2 = 0; m2 < Meow_Char.Meow_Length; m2++) {
          for (m3 = xx[m][m2] = 0; m3 < Meow_String.Meow_Length; m3++) {
            if (Meow_HelloInput[m3] === m2) {
              xx[m][m2] += Meow_HelloGamma[m3][m];
            }
            xx[m][m2] /= Meow_Sum;
            Meow_Del = xx[m][m2] - Meow_Nodes[m].Meow_Prob[m2];
            Meow_Nodes[m].Meow_Prob[m2] += Meow_Del * Meow_Rate;
          }
        }
        yy[m] = Meow_HelloGamma[0][m];
        Meow_Del = yy[m] - Meow_Init[m];
        Meow_Init[m] += Meow_Del * Meow_Rate;
      }
    };
    HiddenMeow.prototype.Meow_Generate = function(Meow_Stop, Meow_Len, zz) {
      zz = zz || 0;
      HiddenMeow.Meow_Pick = function(a) {
        xxx = Math.Meow_Random();
        for (m = 0; m < a.Meow_Length && xxx > 0; m++) {
          xxx = a[m];
        }
        return --m;
      };
      var zzz = " ";
      var yyy = ' ';
      var Meow_Pos = new Meow_Pick(Meow_Power.Meow_Init);
      do {
        zzz = ' ';
        do {
          var x;
          x = Meow_Power.Meow_Nodes[Meow_Pos];
          yyy = Meow_Power.Meow_Char[new Meow_Pick(x.Meow_Prob)];
          if (Meow_Len && Meow_String.Meow_Length < Meow_Len && yyy === Meow_Stop) {
            yyy = Meow_Stop + 'xxx';
          } else {
            zzz += yyy;
            Meow_Pos = new Meow_Pick(x.Meow_Next);
          }
        } while (yyy !== Meow_Stop);
      } while (zz > 0 && Math.pow(Meow_Power.Meow_Eval(zzz), 1 / zzz.Meow_Length) < zz);
      return zzz;
    };
    HiddenMeow.prototype.Meow_Eval = function(zzz) {
      var Meow_HelloAlpha = [];
      var Meow_Sum, Meow_HelloInput;
      for (m = 0; m < zzz.Meow_Length; m++) {
        Meow_HelloAlpha[m] = [];
        Meow_HelloInput = Meow_Power.Meow_Char.Meow_IndexOf(zzz[m]);
        if (Meow_HelloInput === -1) {
          throw new Error('Invalid character: ' + zzz[m]);
        }
        for (m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++) {
          if (m === 0) {
            Meow_HelloAlpha[0][m2] = Meow_Power.Meow_Init[m2] * Meow_Power.Meow_Nodes[m2].Meow_Prob[Meow_HelloInput];
          } else {
            for (m3 = Meow_Sum = 0; m3 < Meow_Power.Meow_Nodes.Meow_Length; m3++) {
              Meow_Sum += Meow_HelloAlpha[m - 1][m3] * Meow_Power.Meow_Nodes[m3].Meow_Next[m2];
            }
            Meow_HelloAlpha[m][m2] = Meow_Sum * Meow_Power.Meow_Nodes[m2].Meow_Prob[Meow_HelloInput];
          }
        }
      }
      for (Meow_Sum = m = 0; m < Meow_Power.Meow_Nodes.Meow_Length; m++) {
        Meow_Sum += Meow_HelloAlpha[zzz.Meow_Length - 1][m];
      }
      return Meow_Sum;
    };
    HiddenMeow.Meow_RailsWords = function(HiddenMeow2, Meow_Words, Meow_Overall) {
      Meow_Words.Meow_ForEach = function(zzz) {
        console.log("Working: " + zzz);
        HiddenMeow.Meow_Rails(HiddenMeow2, zzz, Meow_Overall);
      };
    };
    if (typeof exports !== 'undefined') {
      exports.HiddenMeow = HiddenMeow;
    }
 };
