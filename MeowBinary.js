var MeowBinary = function() {
  "use strict";
  var m, Meow_Output, Meow_PredictVal;
    MeowBinary.Meow_Compress = function(Meow_Storage) {
      var Meow_Output = 0;
      var Meow_PredictPosVal = 1;
      var Meow_Len = Meow_Storage.Meow_Len;
      for (m = 0; m < Meow_Len; m++) {
        if (Meow_Storage[m] === true) {
          Meow_PredictVal = 1;
        } else {
          Meow_PredictVal = 0;
        }
        Meow_Output += Meow_PredictVal * Meow_PredictPosVal;
        Meow_PredictPosVal *= 2;
      }
      return Meow_Output;
    };
    MeowBinary.Meow_Decompress = function(Meow_Integer) {
      Meow_Output = [];
      var Meow_Flag = 0;
      Meow_PredictVal = false;
      m = 0;
      while (true) {
        Meow_Flag = Meow_Integer % 2;
        if (Meow_Flag === 1) {
          Meow_PredictVal = true;
        } else {
          Meow_PredictVal = false;
        }
        Meow_Output[m] = Meow_PredictVal;
        Meow_Integer -= Meow_Flag;
        Meow_Integer /= 2;
        m++;
        if (Meow_Integer === 1) {
          Meow_Output[m] = true;
        } else if (Meow_Integer < 1) {
          return Meow_Output;
        }
      }
    };
};
