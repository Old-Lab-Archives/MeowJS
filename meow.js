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
    for(var Meow_PredictPosStates = 0; Meow_PredictPosStates < Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax; Meow_PredictPosStates++)
    {
      Meow_LowCoder[Meow_PredictPosStates] = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumOfLowLenBits);
      Meow_MidCoder[Meow_PredictPosStates] = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumOfMidLenBits);
    }
    for(Meow_PredictPosStates - 0; Meow_PredictPosStates < Meow_PredictNumStates; Meow_PredictPosStates++)
    {
      Meow_LowCoder[Meow_PredictPosStates].Meow_Init();
      Meow_MidCoder[Meow_PredictPosStates].Meow_Init();
    }
    Meow_HighCoder.Meow_Init();
    if(Meow_Symbol < Meow_Base.Meow_PredictNumOfLowLenSymbols)
    {
      Meow_Ranger.Meow_Encode(Meow_PredictChoice, 0, 0);
      Meow_LowCoder[Meow_PredictPosStates].Meow_Encode(Meow_Ranger, Meow_Symbol);
    }
    else
    {
      Meow_Symbol -= Meow_Base.Meow_PredictNumOfLowLenSymbols;
      Meow_Ranger.Meow_Encode(Meow_PredictChoice, 0, 1);
      if(Meow_Symbol < Meow_PredictNumOfMidLenSymbols)
      {
        Meow_Ranger.Meow_Encode(Meow_PredictChoice, 1, 0);
        Meow_MidCoder[Meow_PredictPosStates].Meow_Encode(Meow_Ranger, Meow_Symbol);
      }
      else
      {
        Meow_Ranger.Meow_Encode(Meow_PredictChoice, 1, 1);
        Meow_HighCoder.Meow_Encode(Meow_Ranger, Meow_Symbol - Meow_Base.Meow_PredictNumOfMidLenSymbols);
      }
    }
    var Meow_PredictSetVal = function(Meow_PredictPosStates, int Meow_PredictNumSymbols, Meow_PredictVal, int Meow_st)
    {
      var Meow_Def00 = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictChoice[0]);
      var Meow_Def01 = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictChoice[0]);
      var Meow_Def10 = Meow_Def01 + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictChoice[1]);
      var Meow_Def11 = Meow_Def01 + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictChoice[1]);
      Meow_Def4 = 0;
      for(Meow_Def4 = 0; Meow_Def4 < Meow_Base.Meow_PredictNumOfLowLenSymbols; Meow_Def4++)
      {
        if(Meow_Def4 >= Meow_PredictNumSymbols)
        {
          return;
        }
        Meow_Val[Meow_st + Meow_Def4] = Meow_Def00 + Meow_LowCoder[Meow_PredictPosStates].Meow_PredictVal(Meow_Def4);
      }
      for(; Meow_Def4 < Meow_Base.Meow_PredictNumOfLowLenSymbols + Meow_Base.Meow_PredictNumOfMidLenSymbols; Meow_Def4++)
      {
        if(Meow_Def4 >= Meow_PredictNumSymbols)
        {
          return;
        }
        Meow_Val[Meow_st + Meow_Def4] = Meow_Def10 + Meow_MidCoder[Meow_PredictPosStates].Meow_PredictVal(Meow_Def4 - Meow_Base.Meow_PredictNumOfLowLenSymbols);
      }
      for(; Meow_Def4 < Meow_Base.Meow_PredictNumSymbols; Meow_Def4++)
      {
        Meow_Val[Meow_st + Meow_Def4] = Meow_Def11 + Meow_HighCoder.Meow_PredictVal(Meow_Def4 - Meow_Base.Meow_PredictNumOfLowLenSymbols - Meow_Base.Meow_PredictNumOfMidLenSymbols);
      }
    }
  };
  var Meow_PredictNumOfLenSymbolsSpec = Meow_Base.Meow_PredictNumOfLowLenSymbols + Meow_Base.Meow_PredictNumOfMidLenSymbols;
  var Meow_EncodeLenTableVal = function(Meow_EncodeLen)
  {
    int[] Meow_Val = new int[Meow_Base.Meow_PredictNumOfLenSymbols << Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax];
    var Meow_PredictTableSize;
    int [] Meow_PredictCounters = new int[Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax];
    function Meow_PredictSetTableSize()
    {
      Meow_PredictTableSize = Meow_PredictTableSize;
    }
    return Meow_Val[Meow_PredictPosStates * Meow_Base.Meow_PredictNumOfLenSymbols + Meow_Symbol];
    var Meow_UpdatePredictTable = function(Meow_PredictPosStates)
    {
      Meow_PredictSetVal(Meow_PredictPosStates, Meow_PredictTableSize, Meow_Val, Meow_PredictPosStates * Meow_Base.Meow_PredictNumOfLenSymbols);
      Meow_PredictCounters = Meow_PredictTableSize;
    }
    var Meow_UpdatePredictTables = function(Meow_PredictPosNumStates)
    {
      for(Meow_PredictPosStates = 0; Meow_PredictPosStates < Meow_PredictPosNumStates; Meow_PredictPosStates++)
      {
        Meow_UpdatePredictTable(Meow_PredictPosStates);
      }
    }
    Meow_SuperPower.Meow_Encode(Meow_Ranger, Meow_Symbol, Meow_PredictPosStates);
    if(--Meow_PredictCounters[Meow_PredictPosStates] == 0)
    {
      Meow_UpdatePredictTable(Meow_PredictPosStates);
    }
  }
  var Meow_PredictNumOpts = 1 << 12;
  function Meow_Optimal()
  {
    var Meow_PredictState;
    var Meow_PredictPrevChar;
    var Meow_PredictPrevChar2;
    var Meow_PredictPrevPos;
    var Meow_PredictPrevPos2;
    var Meow_PredictPrevBack;
    var Meow_PredictPrevBack2;
    var Meow_Val;
    var Meow_PredictBk0;
    var Meow_PredictBk1;
    var Meow_PredictBk2;
    var Meow_PredictBk3;
    function Meow_ConvertToChar()
    {
      Meow_PredictPrevBack = -1;
      Meow_PredictPrevChar = false;
    }
    function Meow_ConvertToShortRep()
    {
      Meow_PredictPrevBack = 0;
      Meow_PredictPrevChar = false;
    }
    function Meow_ShortRep()
    {
      return (Meow_PredictPrevBack == 0);
    }
  }
  Meow_Optimal[] Meow_Optimum = new Meow_Optimal[Meow_PredictNumOpts];
  Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree Meow_PredictMatchFind = null;
  Meow_Power.Meow_Compress.Meow_Range.Meow_Encode Meow_Ranger = new Meow_Power.Meow_Compress.Meow_Range.Meow_Encode();

  Meow_Short[] Meow_PredictMatch = new Meow_Short[Meow_Base.Meow_PredictNumStates << Meow_Base.Meow_PredictPosNumBitsStates_Max];
  Meow_Short[] Meow_PredictRep = new Meow_Short[Meow_Base.Meow_PredictNumStates];
  Meow_Short[] Meow_PredictRep0 = new Meow_Short[Meow_Base.Meow_PredictNumStates];
  Meow_Short[] Meow_PredictRep1 = new Meow_Short[Meow_Base.Meow_PredictNumStates];
  Meow_Short[] Meow_PredictRep2 = new Meow_Short[Meow_Base.Meow_PredictNumStates];
  Meow_Short[] Meow_PredictRepLong = new Meow_Short[Meow_Base.Meow_PredictNumStates << Meow_Base.Meow_PredictPosNumBitsStates_Max];
  Meow_EncodeBitTree[] Meow_EncodeSlotPos = new Meow_EncodeBitTree[Meow_Base.Meow_PredictPosNumStatesLen];
  Meow_Short[] Meow_EncodePos = new Meow_Short[Meow_Base.Meow_PredictOverallDist - Meow_Base.Meow_PredictFinishPosModelIndex];
  Meow_EncodeBitTree Meow_EncodeAlignPos = new Meow_EncodeBitTree(Meow_Base.Meow_PredictAlignNumOfBits);
  Meow_EncodeLenTableVal Meow_EncodeLen = new Meow_EncodeLenTableVal();
  Meow_EncodeLenTableVal Meow_EncodeLenMatchRep = new Meow_EncodeLenTableVal();
  Meow_LitEncode Meow_LitEncode = new Meow_LitEncode();
  int[] Meow_PredictMatchDist = new int[Meow_Base.Meow_PredictMaxMatchLen * 2 + 2];
  var Meow_PredictNumFastBytes = Meow_NumOfFastBytesDef;
  var Meow_PredictLongMatchLen;
  var Meow_PredictOverallDistPairs;
  var Meow_PredictOffsetAdd;
  var Meow_OptimumEndIndex;
  var Meow_OptimumCurrentIndex;
  var Meow_PredictLongMatchFound;
  int[] Meow_PredictSlotPosVal = new int [1 << (Meow_Base.Meow_PredictNumPosBits + Meow_Base.Meow_PredictPosNumBitsStatesLen)];
  int[] Meow_PredictDistVal = new int[Meow_Base.Meow_PredictOverallDist << Meow_Base.Meow_PredictPosNumBitsStatesLen];
  int[] Meow_PredictAlignVal = new int[Meow_Base.Meow_PredictAlignTableSize];
  var Meow_PredictAlignValCount;
  var Meow_PredictTableSizeDist = (Meow_DefDictLogSize * 2);
  var Meow_PredictPosBitsState = 2;
  var Meow_PredictPosStateMask = (4 - 1);
  var Meow_PredictLitNumContextBits = 3;
  var Meow_PredictLitPosStateBits = 0;
  var Meow_PredictDictSize = (1 << Meow_DefDictLogSize);
  var Meow_PredictDictSizePrev = -1;
  var Meow_PredictNumFastBytesPrev = -1;
  var Meow_PosNow64;
  var Meow_PredictEnd;
  var Meow_PredictMatchFindType0 = Meow_PredictMatchFindType2;
  var Meow_PredictWriteEndMark = false;
  var Meow_ReleaseMFSStream = false;
  Meow_PredictCreate()
  {
    if(Meow_PredictMatchFind == null)
    {
      Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree tryy = new Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree();
      var Meow_NumHashBytes = 4;
      if(Meow_PredictMatchFindType0 == Meow_PredictMatchFindType)
      {
        Meow_NumHashBytes = 2;
        tryy.Meow_PredictTypeSet(Meow_NumHashBytes);
        Meow_PredictMatchFind = tryy;
      }
    }
    Meow_LitEncode.Meow_PredictCreate(Meow_PredictLitPosNumBitsStates, Meow_PredictLitNumContextBits);
    if(Meow_PredictDictSize == Meow_PredictDictSizePrev && Meow_PredictNumFastBytesPrev == Meow_PredictNumFastBytes)
    {
      return;
    }
    Meow_PredictMatchFind.Meow_PredictCreate(Meow_PredictDictSize, Meow_PredictNumOpts, Meow_PredictNumFastBytes, Meow_Base.Meow_PredictMaxMatchLen + 1);
    Meow_PredictDictSizePrev = Meow_PredictDictSize;
    Meow_PredictNumFastBytesPrev = Meow_PredictNumFastBytes;
  }
  for(Meow_Def4 = 0; Meow_Def4 < Meow_PredictNumOpts; Meow_Def4++)
  {
    Meow_Optimum[Meow_Def4] = new Meow_Optimal();
  }
  for(Meow_Def4 = 0; Meow_Def4 < Meow_Base.Meow_PredictPosNumStatesLen; Meow_Def4++)
  {
    Meow_EncodeSlotPos[Meow_Def4] = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumPosSlotBits);
  }
  function Meow_PredictWriteEndMarkMode(Meow_PredictWriteEndMark)
  {
    Meow_PredictWriteEndMark = Meow_PredictWriteEndMark;
  }
  Meow_Init()
  {
    Meow_BaseInit();
    Meow_Ranger.Meow_Init();
    Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictMatch);
    Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRepLong);
    Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRep);
    Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRep0);
    Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRep1);
    Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRep2);
    Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_EncodePos);

    Meow_LitEncode.Meow_Init();
    for(Meow_Def4 = 0; Meow_Def4 < Meow_Base.Meow_PredictPosNumStatesLen; Meow_Def4++)
    {
      Meow_EncodeSlotPos[Meow_Def4].Meow_Init();
    }
    Meow_LitEncode.Meow_Init(1 << Meow_PredictPosBitsState);
    Meow_EncodeLenMatchRep.Meow_Init(1 << Meow_PredictPosBitsState);
    Meow_EncodeAlignPos.Meow_Init();
    Meow_PredictLongMatchFound = false;
    Meow_OptimumEndIndex = 0;
    Meow_OptimumCurrentIndex = 0;
    Meow_PredictOffsetAdd = 0;
  }
  var Meow_ReadPredictedMatchDist = function()
  {
    var Meow_LenRes = 0;
    Meow_PredictMatchDist = Meow_PredictMatchFind.Meow_GetPredictedMatches(Meow_PredictMatchDist);
    if(Meow_PredictNumDistPairs > 0)
    {
      Meow_LenRes = Meow_PredictMatchDist[Meow_PredictNumDistPairs - 2];
      if(Meow_LenRes == Meow_PredictNumFastBytes)
      {
        Meow_LenRes += Meow_PredictMatchFind.Meow_PredictGetMatchLen((int) Meow_LenRes - 1, Meow_PredictMatchDist[Meow_PredictNumDistPairs - 1], Meow_Base.Meow_PredictMaxMatchLen - Meow_LenRes);
      }
    }
    Meow_PredictOffsetAdd++;
    return Meow_LenRes;
  }

  // Still coding now... Will be updated soon!
}
