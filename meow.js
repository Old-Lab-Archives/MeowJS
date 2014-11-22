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
    };
    var Meow_PredictAlignNumOfBits = 4;
    var Meow_PredictAlignTableSize = 1 << Meow_PredictAlignNumOfBits;
    var Meow_PredictAlignMask = (Meow_PredictAlignTableSize - 1);
    var Meow_PredictBeginPosModelIndex = 4;
    var Meow_PredictFinishPosModelIndex = 14;
    var Meow_PredictPosNumOfModels = Meow_PredictFinishPosModelIndex - Meow_PredictBeginPosModelIndex;
    var Meow_PredictOverallDist = 1 << (Meow_PredictFinishPosModelIndex / 2);
    var Meow_PredictLitPosNumBitsStates_EncodeMax = 4;
    var Meow_PredictLitNumContextBits_Max = 8;
    var Meow_PredictPosNumBitsStates_Max = (1 << Meow_PredictLitPosNumBitsStates_EncodeMax);
    var Meow_PredictNumOfLowLenBits = 3;
    var Meow_PredictNumOfMidLenBits = 3;
    var Meow_PredictNumOfHighLenBits = 8;
    var Meow_PredictNumOfLowLenSymbols = 1 << Meow_PredictNumOfLowLenBits;
    var Meow_PredictNumOfMidLenSymbols = 1 << Meow_PredictNumOfMidLenBits;
    var Meow_PredictNumOfHighLenSymbols = 1 << Meow_PredictNumOfHighLenBits;
    var Meow_PredictNumOfLenSymbols = Meow_PredictNumOfLowLenSymbols + Meow_PredictNumOfMidLenSymbols + Meow_PredictNumOfHighLenSymbols;
    var Meow_PredictMaxMatchLen = Meow_PredictMinMatchLen + Meow_PredictNumOfLenSymbols - 1;
  }
  function Meow_Encode()
  {
    var Meow_PredictMatchFindType = 0;
    var Meow_PredictMatchFindType2 = 1;
    var Meow_PredictInfinityVal = 0XFFFFFFF;
    var Meow_Byte;
    var Meow_PredictFastPos = new Meow_Byte(1 << 11);
    var Meow_PredictFastSlots = 22;
    var Meow_Def = 2;
    Meow_PredictFastPos[0] = 0;
    Meow_PredictFastPos[1] = 1;
    var Meow_SlotisFast;
    for(Meow_SlotisFast =2; Meow_SlotisFast < Meow_PredictFastSlots; Meow_SlotisFast++)
    {
      var Meow_Def2 = (1 << ((Meow_SlotisFast >> 1) - 1));
      for(var Meow_Def3 = 0; Meow_Def3 < Meow_Def2; Meow_Def3++, Meow_Def++)
        Meow_PredictFastPos[Meow_Def] = (Meow_Byte) + Meow_SlotisFast;
    }
    var Meow_PredictSlotPos = function()
    {
      var Meow_PredictPos;
      if(Meow_PredictPos < (1 << 11))
      {
        return (Meow_PredictFastPos[Meow_PredictPos]);
      }
      if(Meow_PredictPos < (1 << 21))
      {
        return (Meow_PredictFastPos[Meow_PredictPos >> 10] + 20);
      }
      return (Meow_PredictFastPos[Meow_PredictPos >> 20] + 40);
    };
    var Meow_PredictSlotPos2 = function()
    {
      if(Meow_PredictPos < (1 << 17))
      {
        return (Meow_PredictFastPos[Meow_PredictPos >> 6] + 12);
      }
      if(Meow_PredictPos < (1 << 27))
      {
        return (Meow_PredictFastPos[Meow_PredictPos >> 16] + 32);
      }
      return (Meow_PredictFastPos[Meow_PredictPos >> 26] + 52);
    };
    var Meow_PredictState = Meow_Base.Meow_PredictStateInit();
    var Meow_PredictRepDist = new int (Meow_Base.Meow_PredictNumRepDist);

    function Meow_BaseInit()
    {
      Meow_PredictState = Meow_Base.Meow_PredictStateInit();
      Meow_PrevByte = 0;
      for(var Meow_Def4 = 0; Meow_Def4 < Meow_Base.Meow_PredictNumRepDist; Meow_Def4++)
      {
        Meow_PredictRepDist[Meow_Def4] = 0;
      }
    }
    var Meow_DefDictLogSize = 22;
    var Meow_NumOfFastBytesDef = 0X20;
    function Meow_LitEncode()
    {
      function Meow_Encode2()
      {
        var Meow_Short;
        var Meow_mEncode = new Meow_Short(0X300);
        function Meow_Init()
        {
          Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_mEncode);
        }
        var Meow_Context = 1;
        for(Meow_Def4 = 7; Meow_Def4 >= 0; Meow_Def4--)
        {
          var Meow_Bit = ((Meow_Symbol >> Meow_Def4) & 1);
          Meow_Ranger.Meow_Encode(Meow_mEncode, Meow_Context, Meow_Bit);
          Meow_Context = (Meow_Context << 1) | Meow_Bit;
        }
      }
      var Meow_PredictMatchedEncode = function()
      {
        var Meow_Context = 1;
        var Meow_dup = true;
        for(Meow_Def4 = 7; Meow_Def4 >= 0; Meow_Def4--)
        {
          var Meow_Bit = ((Meow_Symbol >> Meow_Def4) & 1);
          var Meow_PredictState = Meow_Context;
          if(Meow_dup)
          {
            var Meow_PredictBitMatch = ((Meow_PredictByteMatch >> Meow_Def4) & 1);
            Meow_PredictState = ((1 + Meow_PredictBitMatch) << 8);
            Meow_dup = (Meow_PredictBitMatch == Meow_Bit);
          }
          Meow_Ranger.Meow_Encode(Meow_mEncode, Meow_PredictState, Meow_Bit);
          Meow_Context = (Meow_Context << 1) | Meow_Bit;
        }
      };
      var Meow_PredictVal = function()
      {
        var Meow_Val = 0;
        var Meow_Context = 1;
        var Meow_Def4 = 7;
        if(Meow_PredictMatchMode)
        {
          for(; Meow_Def4 >= 0; Meow_Def4--)
          {
            var Meow_PredictMatchBit = (PredictMatchByte >> Meow_Def4) & 1;
            Meow_Bit = (Meow_Symbol >> Meow_Def4) & 1;
            Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal(Meow_mEncode[((1 + Meow_Bit) << 8) + Meow_Context], Meow_Bit);
            Meow_Context = (Meow_Context << 1) | Meow_Bit;
            if(Meow_PredictBitMatch != Meow_Bit)
            {
              Meow_Def4--;
              break;
            }
          }
        }
        for(; Meow_Def4 >= 0; Meow_Def4--)
        {
          Meow_Bit = (Meow_Symbol >> Meow_Def4) & 1;
          Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal(Meow_mEncode[Meow_Context], Meow_Bit);
          Meow_Context = (Meow_Context << 1) | Meow_Bit;
        }
        return Meow_Val;
      };
    }
    var Meow_mCoders;
    var Meow_PredictNumPrevBits;
    var Meow_PredictNumPosBits;
    var Meow_PredictPosMask;
    var Meow_PredictCreate = function(Meow_PredictNumPosBits, Meow_PredictNumPrevBits)
    {
      if(Meow_mCoders != null && Meow_PredictNumPrevBits == Meow_PredictNumPrevBits && Meow_PredictPosNumOfBits == Meow_PredictNumPosBits)
      {
      return;
      }
      Meow_PredictNumPosBits = Meow_PredictPosNumOfBits;
      Meow_PredictPosMask = (1 << Meow_PredictNumPosBits) - 1;
      Meow_PredictNumPrevBits = Meow_PredictNumPrevBits;
      var Meow_PredictNumStates = 1 << (Meow_PredictNumPrevBits + Meow_PredictPosNumOfBits);
      Meow_mCoders = new Meow_Encode2(Meow_PredictNumStates);
      for(Meow_Def4 = 0; Meow_Def4 < Meow_PredictNumStates; Meow_Def4++)
      {
        Meow_mCoders[Meow_Def4] = new Meow_Encode2();
      }
    };
    var Meow_PredictNumStates = 1 << (Meow_PredictNumPrevBits + Meow_PredictPosNumOfBits);
    for(Meow_Def4 = 0; Meow_Def4 < Meow_PredictNumStates; Meow_Def4++)
    {
      Meow_mCoders[Meow_Def4].Meow_Init();
    }
    var Meow_PredictSubCoder = function(Meow_PredictPos, Meow_PrevByte)
    {
      return Meow_mCoders[((Meow_PredictPos & Meow_PredictPosMask) << Meow_PredictNumPrevBits) + ((Meow_PrevByte & 0XFF) >>> (8 - Meow_PredictNumPrevBits))];
    };
  }
  function Meow_EncodeLen()
  {
    Meow_Short[] Meow_PredictChoice = new Meow_Short[2];
    Meow_EncodeBitTree[] Meow_LowCoder = new Meow_EncodeBitTree[Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax];
    Meow_EncodeBitTree[] Meow_MidCoder = new Meow_EncodeBitTree[Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax];
    Meow_EncodeBitTree[] Meow_HighCoder = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumOfHighLenBits);

    // Still coding... will be updated soon!
  }
}
