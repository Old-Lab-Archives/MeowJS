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
    
    // Still coding... will be updated soon!
    
  }
}
