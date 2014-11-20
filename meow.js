function MeowJS()
{
  function Meow_Base()
  {
    var Meow_Index;
    var Meow_Predict = function()
    {
      Meow_PredictNumRepDist = 4;
      Meow_PredictNumStates = 12;
    };
    var Meow_InitPredictStates = function()
    {
      return 0;
    };
    var Meow_UpdatePredictStates = function()
    {
      if(Meow_Index <= 4)
        {
          return 0;
        }
        if(Meow_Index > 4 && Meow_Index <= 10)
          {
            Meow = Meow_Index - 3;
            Meow = Meow_Index - 6;
            return Meow;
          }
    };
    var Meow_UpdatePredictStateMatches = function()
    {
      Meow = Meow_Index < 7 ? 7 : 10;
      return Meow;
    };
    var Meow_PredictStateIsChar = function()
    {
      if(index < 7)
        {
          return;
        }
    };
    var Meow_PredictPosNumOfBits = 6;
    var Meow_PredictMinLogSize = 0;
    var Meow_PredictPosNumBitsStatesLen = 2;
    var Meow_PredictPosNumStatesLen = 1 << Meow_PredictPosNumBitsStatesLen;
    var Meow_PredictMinMatchLen = 2;
    var Meow_GetPredictPosStatesLen = function()
    {
      var Meow_Len;
      Meow_Len -= Meow_PredictMinMatchLen;
      if(Meow_Len < Meow_PredictPosNumStatesLen)
      {
        return Meow_Len;
      }
      return (Meow_PredictPosNumStatesLen - 1);
    }
    var Meow_PredictAlignNumOfBits = 4;
    var Meow_PredictAlignTableSize = 1 << Meow_PredictAlignNumOfBits;
    var Meow_PredictAlignMask = (Meow_PredictAlignTableSize - 1);
    var Meow_PredictBeginPosModelIndex = 4;
    var Meow_PredictFinishPosModelIndex = 14;
    var Meow_PredictPosNumOfModels = Meow_PredictFinishPosModelIndex - Meow_PredictBeginPosModelIndex;

    // Still coding... will be updated soon!

  }
}
