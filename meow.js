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
            var Meow_PredictMatchBit = (Meow_PredictMatchByte >> Meow_Def4) & 1;
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
    Meow_PredictChoice = new Meow_Short(2);
    Meow_LowCoder = new Meow_EncodeBitTree(Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax);
    Meow_MidCoder = new Meow_EncodeBitTree(Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax);
    Meow_HighCoder = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumOfHighLenBits);
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
    var Meow_PredictSetVal = function(Meow_PredictPosStates, Meow_PredictNumSymbols, Meow_PredictVal, Meow_st)
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
    };
  }
  var Meow_PredictNumOfLenSymbolsSpec = Meow_Base.Meow_PredictNumOfLowLenSymbols + Meow_Base.Meow_PredictNumOfMidLenSymbols;
  var Meow_EncodeLenTableVal = function(Meow_EncodeLen)
  {
    Meow_Val = new int(Meow_Base.Meow_PredictNumOfLenSymbols << Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax);
    var Meow_PredictTableSize;
    Meow_PredictCounters = new int(Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax);
    function Meow_PredictSetTableSize()
    {
      Meow_PredictTableSize = Meow_PredictTableSize;
      return Meow_Val[Meow_PredictPosStates * Meow_Base.Meow_PredictNumOfLenSymbols + Meow_Symbol];
    }
    var Meow_UpdatePredictTable = function(Meow_PredictPosStates)
    {
      Meow_PredictSetVal(Meow_PredictPosStates, Meow_PredictTableSize, Meow_Val, Meow_PredictPosStates * Meow_Base.Meow_PredictNumOfLenSymbols);
      Meow_PredictCounters = Meow_PredictTableSize;
    };
    var Meow_UpdatePredictTables = function(Meow_PredictPosNumStates)
    {
      for(Meow_PredictPosStates = 0; Meow_PredictPosStates < Meow_PredictPosNumStates; Meow_PredictPosStates++)
      {
        Meow_UpdatePredictTable(Meow_PredictPosStates);
      }
    };
    Meow_SuperPower.Meow_Encode(Meow_Ranger, Meow_Symbol, Meow_PredictPosStates);
    if(--Meow_PredictCounters[Meow_PredictPosStates] === 0)
    {
      Meow_UpdatePredictTable(Meow_PredictPosStates);
    }
  };
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
      return (Meow_PredictPrevBack === 0);
    }
  }
  Meow_Optimum = new Meow_Optimal(Meow_PredictNumOpts);
  Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree [Meow_PredictMatchFind] = null;
  Meow_Power.Meow_Compress.Meow_Range.Meow_Encode [Meow_Ranger] = new Meow_Power.Meow_Compress.Meow_Range.Meow_Encode();

  Meow_PredictMatch = new Meow_Short(Meow_Base.Meow_PredictNumStates << Meow_Base.Meow_PredictPosNumBitsStates_Max);
  Meow_PredictRep = new Meow_Short(Meow_Base.Meow_PredictNumStates);
  Meow_PredictRep0 = new Meow_Short(Meow_Base.Meow_PredictNumStates);
  Meow_PredictRep1 = new Meow_Short(Meow_Base.Meow_PredictNumStates);
  Meow_PredictRep2 = new Meow_Short(Meow_Base.Meow_PredictNumStates);
  Meow_PredictRepLong = new Meow_Short(Meow_Base.Meow_PredictNumStates << Meow_Base.Meow_PredictPosNumBitsStates_Max);
  Meow_EncodeSlotPos = new Meow_EncodeBitTree(Meow_Base.Meow_PredictPosNumStatesLen);
  Meow_EncodePos = new Meow_Short(Meow_Base.Meow_PredictOverallDist - Meow_Base.Meow_PredictFinishPosModelIndex);
  Meow_EncodeBitTree [Meow_EncodeAlignPos] = new Meow_EncodeBitTree(Meow_Base.Meow_PredictAlignNumOfBits);
  Meow_EncodeLenTableVal [Meow_EncodeLen] = new Meow_EncodeLenTableVal();
  Meow_EncodeLenTableVal [Meow_EncodeLenMatchRep] = new Meow_EncodeLenTableVal();
  Meow_LitEncode [Meow_LitEncode] = new Meow_LitEncode();
  Meow_PredictMatchDist = new int(Meow_Base.Meow_PredictMaxMatchLen * 2 + 2);
  var Meow_PredictNumFastBytes = Meow_NumOfFastBytesDef;
  var Meow_PredictLongMatchLen;
  var Meow_PredictOverallDistPairs;
  var Meow_PredictOffsetAdd;
  var Meow_OptimumEndIndex;
  var Meow_OptimumCurrentIndex;
  var Meow_PredictLongMatchFound;
  Meow_PredictSlotPosVal = new int (1 << (Meow_Base.Meow_PredictNumPosBits + Meow_Base.Meow_PredictPosNumBitsStatesLen));
  Meow_PredictDistVal = new int (Meow_Base.Meow_PredictOverallDist << Meow_Base.Meow_PredictPosNumBitsStatesLen);
  Meow_PredictAlignVal = new int(Meow_Base.Meow_PredictAlignTableSize);
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
  Meow_PredictWriteEndMark = false;
  Meow_ReleaseMFSStream = false;
  function Meow_PredictCreate()
  {
    if(Meow_PredictMatchFind == null)
    {
      Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree [tryy] = new Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree();
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
  function Meow_Init()
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
        Meow_LenRes += Meow_PredictMatchFind.Meow_PredictGetMatchLen((int) [Meow_LenRes - 1], Meow_PredictMatchDist[Meow_PredictNumDistPairs - 1], Meow_Base.Meow_PredictMaxMatchLen - Meow_LenRes);
      }
    }
    Meow_PredictOffsetAdd++;
    return Meow_LenRes;
  };
  var Meow_MovePos = function(Meow_Num)
  {
    if(Meow_Num > 0)
    {
      Meow_PredictMatchFind.Meow_Skip(Meow_Num);
      Meow_PredictOffsetAdd += Meow_Num;
    }
  };
  var Meow_FetchRepLenVal = function(Meow_PredictState, Meow_PredictPosStates)
  {
    return Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRep0[Meow_PredictState]) + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRepLong[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]);
  };
  var Meow_GetOriginalRepVal = function(Meow_RepIndex, Meow_PredictState, Meow_PredictPosStates)
  {
    if(Meow_RepIndex === 0)
    {
      Meow_Val = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRep0[Meow_PredictState]);
      Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRepLong[(Meow_PredictState < Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]);
    }
    else
    {
      Meow_Val = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep0[Meow_PredictPosStates]);
      if(Meow_RepIndex === 1)
      {
        Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRep1[Meow_PredictPosStates]);
      }
      else
      {
        Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep1[Meow_PredictPosStates]);
        Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal(Meow_PredictRep2[Meow_PredictPosStates], Meow_RepIndex - 2);
      }
    }
    return Meow_Val;
  };
  var Meow_FetchRepVal = function(Meow_RepIndex, Meow_Len, Meow_PredictState, Meow_PredictPosStates)
  {
    var Meow_Val = Meow_EncodeLenMatchRep.Meow_PredictVal(Meow_Len - Meow_Base.Meow_PredictMinMatchLen, Meow_PredictPosStates);
    return Meow_Val + Meow_GetOriginalRepVal(Meow_RepIndex, Meow_PredictState, Meow_PredictPosStates);
  };
  var Meow_FetchPosLenVal = function(Meow_PredictPos, Meow_Len, Meow_PredictPosStates)
  {
    var Meow_PredictPosStatesLen = Meow_Base.Meow_GetPredictPosStatesLen(Meow_Len);
    if(Meow_PredictPos < Meow_Base.Meow_PredictOverallDist)
    {
      Meow_Val = Meow_PredictDistVal[(Meow_PredictPosStatesLen * Meow_Base.Meow_PredictOverallDist) + Meow_PredictPos];
    }
    else
    {
      Meow_Val = Meow_PredictSlotPosVal[(Meow_PredictPosStatesLen << Meow_Base.Meow_PredictNumPosSlotBits) + Meow_PredictSlotPos2(Meow_PredictPos)];
    }
    return Meow_Val + Meow_EncodeLen.Meow_PredictVal(Meow_Len - Meow_Base.Meow_PredictMinMatchLen, Meow_PredictPosStates);
  };
  var Meow_Backward = function(Meow_Cur)
  {
    Meow_OptimumEndIndex = Meow_Cur;
    var Meow_PosMem = Meow_Optimum[Meow_Cur].Meow_PredictPrevPos;
    var Meow_PosBackMem = Meow_Optimum[Meow_Cur].Meow_PredictPrevBack;
    do
    {
      if(Meow_Optimum[Meow_Cur].Meow_PredictPrevChar)
      {
        Meow_Optimum[Meow_PosMem].Meow_ConvertToChar();
        Meow_Optimum[Meow_PosMem].Meow_PredictPrevPos = Meow_PosMem - 1;
        if(Meow_Optimum[Meow_Cur].Meow_PredictPrevChar2)
        {
          Meow_Optimum[Meow_PosMem - 1].Meow_PredictPrevChar = false;
          Meow_Optimum[Meow_PosMem - 1].Meow_PredictPrevPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevPos2;
          Meow_Optimum[Meow_PosMem - 1].Meow_PredictPrevBack = Meow_Optimum[Meow_Cur].Meow_PredictPrevBack2;
        }
      }
      var Meow_PredictPrevPos = Meow_PosMem;
      var Meow_BackCur = Meow_BackMem;
      Meow_BackMem = Meow_Optimum[Meow_PredictPrevPos].Meow_PredictPrevBack;
      Meow_PosMem = Meow_Optimum[Meow_PredictPrevPos].Meow_PredictPrevPos;
      Meow_Optimum[Meow_PredictPrevPos].Meow_PredictPrevBack = Meow_BackCur;
      Meow_Optimum[Meow_PredictPrevPos].Meow_PredictPrevPos = Meow_Cur;
      Meow_Cur = Meow_PredictPrevPos;
    }
    while(Meow_Cur > 0);
    var Meow_BackRes = Meow_Optimum[0].Meow_PredictPrevBack;
    Meow_OptimumCurrentIndex = Meow_Optimum[0].Meow_PredictPrevPos;
    return Meow_OptimumCurrentIndex;
  };
  var Meow_Reps = new int(Meow_Base.Meow_PredictNumRepDist);
  var Meow_RepsLen = new int(Meow_Base.Meow_PredictNumRepDist);
  var Meow_BackRes;
  var Meow_LenRes;
  var Meow_FetchOptimum = function(Meow_PredictPos)
  {
    if(Meow_OptimumEndIndex != Meow_OptimumCurrentIndex)
    {
      Meow_LenRes = Meow_Optimum[Meow_OptimumCurrentIndex].Meow_PredictPrevPos - Meow_OptimumCurrentIndex;
      Meow_BackRes = Meow_Optimum[Meow_OptimumCurrentIndex].Meow_PredictPrevBack;
      Meow_OptimumCurrentIndex = Meow_Optimum[Meow_OptimumCurrentIndex].Meow_PredictPrevPos;
      return Meow_LenRes;
    }
    Meow_OptimumCurrentIndex = Meow_OptimumEndIndex = 0;
    var Meow_LenMain, Meow_PredictNumDistPairs;
    if(!Meow_PredictLongMatchFound)
    {
      Meow_LenMain = Meow_ReadPredictedMatchDist();
    }
    else
    {
      Meow_LenMain = Meow_PredictLongMatchLen;
      Meow_PredictLongMatchFound = false;
    }
    Meow_PredictNumDistPairs = Meow_PredictNumDistPairs;
    var Meow_NumAvailBytes = Meow_PredictMatchFind.Meow_FetchNumAvailBytes() + 1;
    if(Meow_NumAvailBytes < 2)
    {
      Meow_BackRes = -1;
      return 1;
    }
    if(Meow_NumAvailBytes > Meow_Base.Meow_PredictMaxMatchLen)
    {
      Meow_NumAvailBytes = Meow_Base.Meow_PredictMaxMatchLen;
    }
    var Meow_RepIndex_Max = 0;
    for(Meow_Def4 = 0; Meow_Def4 < Meow_Base.Meow_PredictNumRepDist; Meow_Def4++)
    {
      Meow_Reps[Meow_Def4] = Meow_PredictRepDist[Meow_Def4];
      Meow_RepsLen[Meow_Def4] = Meow_PredictMatchFind.Meow_PredictGetMatchLen(0 - 1, Meow_Reps[Meow_Def4], Meow_Base.Meow_PredictMaxMatchLen);
      if(Meow_RepsLen[Meow_Def4] > Meow_RepsLen[Meow_RepIndex_Max])
      {
        Meow_RepIndex_Max = Meow_Def4;
      }
    }
    if(Meow_RepsLen[Meow_RepIndex_Max] >= Meow_PredictNumFastBytes)
    {
      Meow_BackRes = Meow_RepIndex_Max;
      Meow_LenRes = Meow_RepsLen[Meow_RepIndex_Max];
      Meow_MovePos(Meow_LenRes - 1);
      return Meow_LenRes;
    }
    if(Meow_LenMain >= Meow_PredictNumFastBytes)
    {
      Meow_BackRes = Meow_PredictMatchDist[Meow_PredictNumDistPairs - 1] + Meow_Base.Meow_PredictNumRepDist;
      Meow_MovePos(Meow_LenMain - 1);
      return Meow_LenMain;
    }
    var Meow_CurrentByte = Meow_PredictMatchFind.Meow_FetchIndexByte(0 - 1);
    var Meow_PredictMatchByte = Meow_PredictMatchFind.Meow_FetchIndexByte(0 - Meow_PredictRepDist[0] - 1 - 1);
    if(Meow_LenMain < 2 && Meow_CurrentByte != Meow_PredictMatchByte && Meow_RepsLen[Meow_RepIndex_Max] < 2)
    {
      Meow_BackRes = -1;
      return 1;
    }
    Meow_Optimum[0].Meow_PredictState = Meow_PredictState;
    Meow_PredictPosStates = (Meow_PredictPos & Meow_PredictPosStateMask);
    Meow_Optimum[1].Meow_PredictVal = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictMatch[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]) + Meow_LitEncode.Meow_PredictSubCoder(Meow_PredictPos, Meow_PrevByte).Meow_PredictVal(!Meow_Base.Meow_PredictStateIsChar(Meow_PredictState), Meow_PredictMatchByte, Meow_CurrentByte);
    Meow_Optimum[1].Meow_ConvertToChar();
    var Meow_PredictMatchVal = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]);
    if(Meow_PredictMatchByte == Meow_CurrentByte)
    {
      Meow_ShortRepVal = Meow_MatchRepVal + Meow_FetchRepLenVal(Meow_PredictState, Meow_PredictPosStates);
      if(Meow_ShortRepVal < Meow_Optimum[1].Meow_PredictVal)
      {
        Meow_Optimum[1].Meow_PredictVal = Meow_ShortRepVal;
        Meow_Optimum[1].Meow_ConvertToShortRep();
      }
    }
    var Meow_LenEnd = ((Meow_LenMain >= Meow_RepsLen[Meow_RepIndex_Max]) ? Meow_LenMain : Meow_RepsLen[Meow_RepIndex_Max]);
    if(Meow_LenEnd < 2)
    {
      Meow_BackRes = Meow_Optimum[1].Meow_PredictPrevBack;
      return 1;
    }
    Meow_Optimum[1].Meow_PredictPrevPos = 0;
    Meow_Optimum[0].Meow_PredictBk0 = Meow_Reps[0];
    Meow_Optimum[0].Meow_PredictBk1 = Meow_Reps[1];
    Meow_Optimum[0].Meow_PredictBk2 = Meow_Reps[2];
    Meow_Optimum[0].Meow_PredictBk3 = Meow_Reps[3];
    Meow_Len = Meow_LenEnd;
    do
    {
      Meow_Optimum[Meow_Len--].Meow_Val = Meow_PredictInfinityVal;
    }
    while(Meow_Len >= 2);
    for(Meow_Def4 = 0; Meow_Def4 < Meow_Base.Meow_PredictNumRepDist; Meow_Def4++)
    {
      var Meow_RepLen = Meow_RepsLen[Meow_Def4];
      if(Meow_RepLen < 2)
      {
        continue;
      }
      Meow_Val = Meow_MatchRepVal + Meow_GetOriginalRepVal(Meow_Def4, Meow_PredictState, Meow_PredictPosStates);
      do
      {
        Meow_CurLenVal = Meow_Val + Meow_EncodeLenMatchRep.Meow_PredictVal(Meow_RepLen - 2, Meow_PredictPosStates);
        Meow_Optimal [Meow_Optimum] = Meow_Optimum [Meow_RepLen];
        if(Meow_CurLenVal < Meow_Optimum.Meow_Val)
        {
          Meow_Optimum.Meow_Val = Meow_CurLenVal;
          Meow_Optimum.Meow_PredictPrevPos = 0;
          Meow_Optimum.Meow_PredictPrevBack = Meow_Def4;
          Meow_Optimum.Meow_PredictPrevChar = false;
        }
      }
      while(--Meow_RepLen >= 2);
    }
    var Meow_MatchNormalVal = Meow_PredictMatchVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_Rep[Meow_PredictState]);
    Meow_Len = ((Meow_RepsLen[0] >= 2) ? Meow_RepsLen[0] + 1 : 2);
    if(Meow_Len <= Meow_LenMain)
    {
      Meow_PredictOffs = 0;
      while(Meow_Len > Meow_PredictMatchDist[Meow_PredictOffs])
      {
        Meow_PredictOffs += 2;
      }
      for(; ; Meow_Len++)
      {
        var Meow_PredictDist = Meow_PredictMatchDist[Meow_PredictOffs + 1];
        Meow_CurLenVal = Meow_MatchNormalVal + Meow_FetchPosLenVal(Meow_PredictDist, Meow_Len, Meow_PredictPosStates);
        Meow_Optimal [Meow_Optimum] = Meow_Optimum[Meow_Len];
        if(Meow_CurLenVal < Meow_Optimum.Meow_Val)
        {
          Meow_Optimum.Meow_Val = Meow_CurLenVal;
          Meow_Optimum.Meow_PredictPrevPos = 0;
          Meow_Optimum.Meow_PredictPrevBack = Meow_PredictDist + Meow_Base.Meow_PredictNumRepDist;
          Meow_Optimum.Meow_PredictPrevChar = false;
        }
        if(Meow_Len == Meow_PredictMatchDist[Meow_PredictOffs])
        {
          Meow_PredictOffs += 2;
          if(Meow_PredictOffs == Meow_PredictNumDistPairs)
          {
            break;
          }
        }
      }
    }
    Meow_Cur = 0;
    while(true)
    {
      Meow_Cur++;
      if(Meow_Cur == Meow_LenEnd)
      {
        return Meow_Backward(Meow_Cur);
      }
      var Meow_LenNew = Meow_ReadPredictedMatchDist();
      Meow_PredictNumDistPairs = Meow_PredictNumDistPairs;
      if(Meow_LenNew >= Meow_PredictNumFastBytes)
      {
        Meow_PredictLongMatchLen = Meow_LenNew;
        Meow_PredictLongMatchFound = true;
        return Meow_Backward(Meow_Cur);
      }
      Meow_PredictPos++;
      var Meow_PredictPrevPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevPos;
      var Meow_PredictState;
      if(Meow_Optimum[Meow_Cur].Meow_PredictPrevChar)
      {
        Meow_PredictPrevPos--;
        if(Meow_Optimum[Meow_Cur].Meow_PredictPrevChar2)
        {
          Meow_PredictState = Meow_Optimum[Meow_Optimum[Meow_Cur].Meow_PredictPrevPos2].Meow_PredictState;
          if(Meow_Optimum[Meow_Cur].Meow_PredictPrevBack2 < Meow_Base.Meow_PredictNumRepDist)
          {
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
          }
          else
          {
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
          }
        }
        else
        {
          Meow_PredictState = Meow_Optimum[Meow_PredictPrevPos].Meow_PredictState;
          Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
        }
      }
      else
      {
        Meow_PredictState = Meow_Optimum[Meow_PredictPrevPos].Meow_PredictState;
      }
      if(Meow_PredictPrevPos == Meow_Cur - 1)
      {
        if(Meow_Optimum[Meow_Cur].Meow_ShortRep())
        {
          Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesShortRep(Meow_PredictState);
        }
        else
        {
          Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState);
        }
      }
      else
      {
        if(Meow_Optimum[Meow_Cur].Meow_PredictPrevChar && Meow_Optimum[Meow_Cur].Meow_PredictPrevChar2)
        {
          Meow_PredictPrevPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevPos2;
          Meow_PredictPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevBack2;
          Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
        }
        else
        {
          Meow_PredictPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevBack;
          if(Meow_PredictPos < Meow_Base.Meow_PredictNumRepDist)
          {
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
          }
          else
          {
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
          }
        }
        Meow_Optimal [Meow_PredictOpt] = Meow_Optimum[Meow_PredictPrevPos];
        if(Meow_PredictPos < Meow_Base.Meow_PredictNumRepDist)
        {
          if(Meow_PredictPos === 0)
          {
            Meow_Reps[0] = Meow_PredictOpt.Meow_PredictBk0;
            Meow_Reps[1] = Meow_PredictOpt.Meow_PredictBk1;
            Meow_Reps[2] = Meow_PredictOpt.Meow_PredictBk2;
            Meow_Reps[3] = Meow_PredictOpt.Meow_PredictBk3;
          }
          else if(Meow_PredictPos == 1)
          {
            Meow_Reps[0] = Meow_PredictOpt.Meow_PredictBk1;
            Meow_Reps[1] = Meow_PredictOpt.Meow_PredictBk0;
            Meow_Reps[2] = Meow_PredictOpt.Meow_PredictBk2;
            Meow_Reps[3] = Meow_PredictOpt.Meow_PredictBk3;
          }
          else if(Meow_PredictPos == 2)
          {
            Meow_Reps[0] = Meow_PredictOpt.Meow_PredictBk2;
            Meow_Reps[1] = Meow_PredictOpt.Meow_PredictBk0;
            Meow_Reps[2] = Meow_PredictOpt.Meow_PredictBk1;
            Meow_Reps[3] = Meow_PredictOpt.Meow_PredictBk3;
          }
        }
        else
        {
          Meow_Reps[0] = Meow_PredictOpt.Meow_PredictBk3;
          Meow_Reps[1] = Meow_PredictOpt.Meow_PredictBk0;
          Meow_Reps[2] = Meow_PredictOpt.Meow_PredictBk1;
          Meow_Reps[3] = Meow_PredictOpt.Meow_PredictBk2;
        }
      }
      Meow_Optimum[Meow_Cur].Meow_PredictState = Meow_PredictState;
      Meow_Optimum[Meow_Cur].Meow_PredictBk0 = Meow_Reps[0];
      Meow_Optimum[Meow_Cur].Meow_PredictBk1 = Meow_Reps[1];
      Meow_Optimum[Meow_Cur].Meow_PredictBk2 = Meow_Reps[2];
      Meow_Optimum[Meow_Cur].Meow_PredictBk3 = Meow_Reps[3];
      var Meow_CurVal = Meow_Optimum[Meow_Cur].Meow_Val;
      Meow_CurrentByte = Meow_PredictMatchFind.Meow_FetchIndexByte(0 - 1);
      Meow_PredictMatchByte = Meow_PredictMatchFind.Meow_FetchIndexByte(0 - Meow_Reps[0] - 1 - 1);
      Meow_PredictPosStates = (Meow_PredictPos & Meow_PredictPosMask);
      Meow_CurLenVal = Meow_CurVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictMatch[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]) + Meow_LitEncode.Meow_PredictSubCoder(Meow_PredictPos, Meow_PredictMatchFind.Meow_FetchIndexByte(0 - 2)).Meow_PredictVal(!Meow_Base.Meow_PredictStateIsChar(Meow_PredictState), Meow_PredictMatchByte, Meow_CurrentByte);
      Meow_Optimal [Meow_NextOptimum] = Meow_Optimum [Meow_Cur + 1];
      var Meow_PredictNextChar = false;
      if(Meow_CurLenVal < Meow_NextOptimum.Meow_Val)
      {
        Meow_NextOptimum.Meow_Val = Meow_CurLenVal;
        Meow_NextOptimum.Meow_PredictPrevPos = Meow_Cur;
        Meow_NextOptimum.Meow_ConvertToChar();
        Meow_PredictNextChar = true;
      }
      Meow_PredictMatchVal = Meow_CurVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]);
      Meow_MatchRepVal = Meow_PredictMatchVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep[Meow_PredictState]);

      if(Meow_PredictMatchByte == Meow_CurrentByte && !(Meow_NextOptimum.Meow_PredictPrevPos < Meow_Cur && Meow_NextOptimum.Meow_PredictPrevBack === 0))
      {
        Meow_ShortRepVal = Meow_MatchRepVal + Meow_FetchRepLenVal(Meow_PredictState, Meow_PredictPosStates);
        if(Meow_ShortRepVal <= Meow_NextOptimum.Meow_Val)
        {
          Meow_NextOptimum.Meow_Val = Meow_ShortRepVal;
          Meow_NextOptimum.Meow_PredictPrevPos = Meow_Cur;
          Meow_NextOptimum.Meow_ConvertToShortRep();
          Meow_PredictNextChar = true;
        }
      }
      var Meow_NumAvailBytesFull = Meow_PredictMatchFind.Meow_FetchNumAvailBytes() + 1;
      Meow_NumAvailBytesFull = Math.Meow_Min(Meow_PredictNumOpts - 1 - Meow_Cur, Meow_NumAvailBytesFull);
      Meow_NumAvailBytes = Meow_NumAvailBytesFull;
      var Meow_Def5;
      if(Meow_NumAvailBytes < 2)
      {
        continue;
      }
      if(Meow_NumAvailBytes > Meow_PredictNumFastBytes)
      {
        Meow_NumAvailBytes = Meow_PredictNumFastBytes;
      }
      if(!Meow_PredictNextChar && Meow_PredictMatchByte != Meow_CurrentByte)
      {
        Meow_Def5 = Math.Meow_Min(Meow_NumAvailBytesFull - 1, Meow_PredictNumFastBytes);
        Meow_LenTest = Meow_PredictMatchFind.Meow_PredictGetMatchLen(0, Meow_Reps[0], Meow_Def5);
        if(Meow_LenTest >= 2)
        {
          Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState);
          Meow_PredictPosStatesNext = (Meow_PredictPos + 1) & Meow_PredictPosStateMask;
          Meow_MatchRepValNext = Meow_CurLenVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]) + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep[Meow_PredictState2]);
          Meow_Offset = Meow_Cur + 1 + Meow_LenTest;
          while(Meow_LenEnd < Meow_Offset)
          Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
          Meow_CurLenVal = Meow_MatchRepValNext + Meow_FetchRepVal(0, Meow_LenTest, Meow_PredictState2, Meow_PredictPosStatesNext);
          Meow_Optimal[Meow_Optimum] = Meow_Optimum[Meow_Offset];
          if(Meow_CurLenVal < Meow_Optimum.Meow_Val)
          {
            Meow_Optimum.Meow_Val = Meow_CurLenVal;
            Meow_Optimum.Meow_PredictPrevPos = Meow_Cur + 1;
            Meow_Optimum.Meow_PredictPrevBack = 0;
            Meow_Optimum.Meow_PredictPrevChar = true;
            Meow_Optimum.Meow_PredictPrevChar2 = false;
          }
        }
      }
      var Meow_LenStart = 2;
      for(var Meow_RepIndex = 0; Meow_RepIndex < Meow_Base.Meow_PredictNumRepDist; Meow_RepIndex++)
      {
        Meow_LenTest2 = Meow_PredictMatchFind.Meow_PredictGetMatchLen(0 - 1, Meow_Reps[Meow_RepIndex], Meow_NumAvailBytes);

        if(Meow_LenTest2 < 2)
        {
          continue;
        }
        var Meow_LenTestTemp = Meow_LenTest2;
        do
        {
          while(Meow_LenEnd < Meow_Cur + Meow_LenTest2)
          Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
          Meow_CurLenVal = Meow_MatchRepVal. Meow_FetchRepVal(Meow_RepIndex, Meow_LenTest2, Meow_PredictState, Meow_PredictPosStates);
          Meow_Optimal [Meow_Optimum] = Meow_Optimum[Meow_Cur + Meow_LenTest2];
          if(Meow_CurLenVal < Meow_Optimum.Meow_Val)
          {
            Meow_Optimum.Meow_Val = Meow_CurLenVal;
            Meow_Optimum.Meow_PredictPrevPos = Meow_Cur;
            Meow_Optimum.Meow_PredictPrevBack = Meow_RepIndex;
            Meow_Optimum.Meow_PredictPrevChar = false;
          }
        }
        while(--Meow_LenTest2 >= 2);
        Meow_LenTest2 = Meow_LenTestTemp;
        if(Meow_RepIndex === 0)
        {
          Meow_LenStart = Meow_LenTest2 + 1;
        }
        if(Meow_LenTest2 < Meow_NumAvailBytesFull)
        {
          Meow_Def5 = Math.Meow_Min(Meow_NumAvailBytesFull - 1 - Meow_LenTest2, Meow_PredictNumFastBytes);
          Meow_LenTest = Meow_PredictMatchFind.Meow_PredictGetMatchLen(Meow_LenTest2, Meow_Reps[Meow_RepIndex], Meow_Def5);
          if(Meow_LenTest >= 2)
          {
            Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
            Meow_PredictPosStatesNext = (Meow_PredictPos + Meow_LenTest2) & Meow_PredictPosStateMask;
            Meow_CurLenValChar = Meow_MatchRepVal + Meow_FetchRepVal(Meow_RepIndex, Meow_LenTest2, Meow_PredictState, Meow_PredictPosStates) + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]) + Meow_LitEncode.Meow_PredictSubCoder(Meow_PredictPos + Meow_LenTest2, Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - 1 - 1)).Meow_PredictVal(true, Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - 1 -(Meow_Reps[Meow_RepIndex] + 1)), Meow_PredictMatchFind.Meow_FetchNumAvailBytes(Meow_LenTest2 - 1));
            Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState2);
            Meow_PredictPosStatesNext = (Meow_PredictPos + Meow_LenTest2 + 1) & Meow_PredictPosStateMask;
            Meow_PredictMatchValNext = Meow_CurLenValChar + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]);
            Meow_MatchRepValNext = Meow_PredictMatchValNext + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep[Meow_PredictState2]);
            Meow_Offset = Meow_LenTest2 + 1 + Meow_LenTest;
            while(Meow_LenEnd < Meow_Cur + Meow_Offset)
            Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
            Meow_CurLenVal = Meow_MatchRepValNext + Meow_FetchRepVal(0, Meow_LenTest, Meow_PredictState2, Meow_PredictPosStatesNext);
            Meow_Optimal [Meow_Optimum] = Meow_Optimum[Meow_Cur + Meow_Offset];
            if(Meow_CurLenVal < Meow_Optimum.Meow_Val)
            {
              Meow_Optimum.Meow_Val = Meow_CurLenVal;
              Meow_Optimum.Meow_PredictPrevPos = Meow_Cur + Meow_LenTest2 + 1;
              Meow_Optimum.Meow_PredictPrevBack = 0;
              Meow_Optimum.Meow_PredictPrevChar = true;
              Meow_Optimum.Meow_PredictPrevPos = Meow_Cur;
              Meow_Optimum.Meow_PredictPrevBack2 = Meow_RepIndex;
            }
          }
        }
      }
      if(Meow_LenNew > Meow_NumAvailBytes)
      {
        Meow_LenNew = Meow_NumAvailBytes;
        for(Meow_PredictNumDistPairs = 0; Meow_LenNew > Meow_PredictMatchDist[Meow_PredictNumDistPairs]; Meow_PredictNumDistPairs += 2)
        {
          Meow_PredictMatchDist[Meow_PredictNumDistPairs] = Meow_LenNew;
          Meow_PredictNumDistPairs += 2;
        }
      }
      if(Meow_LenNew >= Meow_LenStart)
      {
        Meow_MatchNormalVal = Meow_PredictMatchVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRep[Meow_PredictState]);
        while(Meow_LenEnd < Meow_Cur + Meow_LenNew)
        Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
        Meow_PredictOffs = 0;
        while(Meow_LenStart > Meow_PredictMatchDist[Meow_PredictOffs])
          Meow_PredictOffs += 2;
        for(Meow_LenTest2 = Meow_LenStart; Meow_LenTest2++;)
        {
          var Meow_BackCur = Meow_PredictMatchDist[Meow_PredictOffs + 1];
          Meow_CurLenVal = Meow_MatchNormalVal + Meow_FetchPosLenVal(Meow_BackCur, Meow_LenTest2, Meow_PredictPosStates);
          Meow_Optimal [Meow_Optimum] = Meow_Optimum [Meow_Cur + Meow_LenTest2];
          if(Meow_CurLenVal < Meow_Optimum.Meow_Val)
          {
            Meow_Optimum.Meow_Val = Meow_CurLenVal;
            Meow_Optimum.Meow_PredictPrevPos = Meow_Cur;
            Meow_Optimum.Meow_PredictPrevBack = Meow_BackCur + Meow_Base.Meow_PredictNumRepDist;
            Meow_Optimum.Meow_PredictPrevChar = false;
          }
          if(Meow_LenTest2 == Meow_PredictMatchDist[Meow_PredictOffs])
          {
            if(Meow_LenTest2 < Meow_NumAvailBytesFull)
            {
              Meow_Def5 = Math.Meow_Min(Meow_NumAvailBytesFull - 1 - Meow_LenTest2, Meow_PredictNumFastBytes);
              Meow_LenTest = Meow_PredictMatchFind.Meow_PredictGetMatchLen(Meow_LenTest2, Meow_BackCur, Meow_Def5);
              if(Meow_LenTest >= 2)
              {
                Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictMatch);
                Meow_PredictPosStatesNext = (Meow_PredictPos + Meow_LenTest2) & Meow_PredictPosStateMask;
                Meow_CurLenValChar = Meow_CurLenVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]) + Meow_LitEncode.Meow_PredictSubCoder(Meow_PredictPos + Meow_LenTest2, Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - 1 - 1)).Meow_PredictVal(true, Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - (Meow_BackCur + 1) - 1), Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - 1));
                Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState2);
                Meow_PredictPosStatesNext = (Meow_PredictPos + Meow_LenTest2 + 1) & Meow_PredictPosStateMask;
                Meow_PredictMatchValNext = Meow_CurLenValChar + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]);
                Meow_MatchRepValNext = Meow_PredictMatchValNext + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep[Meow_PredictState2]);
                Meow_Offset = Meow_LenTest2 + 1 + Meow_LenTest;
                while(Meow_LenEnd < Meow_Cur + Meow_Offset)
                Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
                Meow_CurLenVal = Meow_MatchRepValNext + Meow_FetchRepVal(0, Meow_LenTest, Meow_PredictState2, Meow_PredictPosStatesNext);
                Meow_Optimum = Meow_Optimum[Meow_Cur + Meow_Offset];
                if(Meow_CurLenVal < Meow_Optimum.Meow_Val)
                {
                  Meow_Optimum.Meow_Val = Meow_CurLenVal;
                  Meow_Optimum.Meow_PredictPrevPos = Meow_Cur + Meow_LenTest + 1;
                  Meow_Optimum.Meow_PredictPrevBack = 0;
                  Meow_Optimum.Meow_PredictPrevChar = true;
                  Meow_Optimum.Meow_PredictPrevChar2 = true;
                  Meow_Optimum.Meow_PredictPrevPos2 = Meow_Cur;
                  Meow_Optimum.Meow_PredictPrevBack2 = Meow_BackCur + Meow_Base.Meow_PredictNumRepDist;
                }
              }
            }
            Meow_PredictOffs += 2;
            if(Meow_PredictOffs == Meow_PredictNumDistPairs)
            {
              break;
            }
          }
        }
      }
    }
  };
  function Meow_ChangePairs(Meow_SmallDist, Meow_BigDist)
  {
    var Meow_Dif = 7;
    return (Meow_SmallDist < (1 << (32 - Meow_Dif)) && Meow_BigDist >= (Meow_SmallDist << Meow_Dif));
  }
  function Meow_PredictWriteEndMark(Meow_PredictPosStates)
  {
    if(!Meow_PredictWriteEndMark)
    {
      return;
    }
    Meow_Ranger.Meow_Encode(Meow_PredictMatch, (Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates, 1);
    Meow_Ranger.Meow_Encode(Meow_PredictRep, Meow_PredictState, 0);
    Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
    Meow_Len = Meow_Base.Meow_PredictMinMatchLen;
    Meow_EncodeLen.Meow_Encode(Meow_Ranger, Meow_Len - Meow_Base.Meow_PredictMinMatchLen,Meow_PredictPosStates);
    Meow_PredictSlotPos = (1 << Meow_Base.Meow_PredictNumPosSlotBits) - 1;
    Meow_PredictPosStatesLen = Meow_Base.Meow_GetPredictPosStatesLen(Meow_Len);
    Meow_EncodeSlotPos[Meow_PredictSlotPosLenState].Meow_Encode(Meow_Ranger, Meow_PredictSlotPos);
    var Meow_PredictBitsFooter = 30;
    var Meow_PredictPosReduced = (1 << Meow_PredictBitsFooter) - 1;
    Meow_Ranger.Meow_EncodeBitsDirect(Meow_PredictPosReduced >> Meow_Base.Meow_PredictAlignNumOfBits, Meow_PredictBitsFooter - Meow_Base.Meow_PredictAlignNumOfBits);
    Meow_EncodeAlignPos.Meow_EncodeReverse(Meow_Ranger, Meow_PredictPosReduced & Meow_Base.Meow_PredictAlignMask);
  }
  var Meow_Flush = function(Meow_PosNow)
  {
    Meow_ReleaseMFSStream();
    Meow_PredictWriteEndMark(Meow_PosNow & Meow_PredictPosStateMask);
    Meow_Ranger.Meow_FlushData();
    Meow_Ranger.Meow_FlushStream();
  };
  var Meow_CodeBlock = function()
  {
    Meow_InSize[0] = 0;
    Meow_OutSize[0] = 0;
    Meow_PredictEnd[0] = true;
    if(Meow_InStream !== null)
    {
      Meow_PredictMatchFind.Meow_SetStream(Meow_InStream);
      Meow_PredictMatchFind.Meow_Init();
      Meow_ReleaseMFSStream = true;
      Meow_InStream = null;
    }
    if(Meow_PredictEnd)
    {
      return;
    }
    Meow_PredictEnd = true;
    Meow_PredictPrevPosValPerf = Meow_PosNow64;
    if(Meow_PosNow64 === 0)
    {
      if(Meow_PredictMatchFind.Meow_FetchNumAvailBytes() === 0)
      {
        Meow_Flush((int)[Meow_PosNow64]);
        return;
      }
      Meow_ReadPredictedMatchDist();
      Meow_PredictPosStates = (int)(Meow_PosNow64) & Meow_PredictPosStateMask;
      Meow_Ranger.Meow_Encode(Meow_PredictMatch, (Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates, 0);
      Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState);
      byte [Meow_CurByte] = Meow_PredictMatchFind.Meow_FetchIndexByte(0 - Meow_PredictOffsetAdd);
      Meow_LitEncode.Meow_PredictSubCoder = ((int)(Meow_PosNow64), Meow_PrevByte).Meow_Encode(Meow_Ranger, Meow_CurByte);
      Meow_PrevByte = Meow_CurByte;
      Meow_PredictOffsetAdd--;
      Meow_PosNow64++;
    }
    if(Meow_PredictMatchFind.Meow_FetchNumAvailBytes() === 0)
    {
      Meow_Flush((int)[Meow_PosNow64]);
      return;
    }
    while(true)
    {
      Meow_Len = Meow_FetchOptimum((int)[Meow_PosNow64]);
      Meow_PredictPos = Meow_BackRes;
      Meow_PredictPosStates = ((int)[Meow_PosNow64]) & Meow_PredictPosStateMask;
      var Meow_PredictComplexState = (Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates;
      if(Meow_Len == 1 && Meow_PredictPos == -1)
      {
        Meow_Ranger.Meow_Encode(Meow_PredictMatch, Meow_PredictComplexState, 0);
        byte [Meow_CurByte] = Meow_PredictMatchByte.Meow_FetchIndexByte((int)(0 - Meow_PredictOffsetAdd));
        Meow_LitEncode.Meow_Encode2 [Meow_PredictSubCoder] = Meow_LitEncode.Meow_FetchSubCoder((int)[Meow_PosNow64], Meow_PrevByte);
        if(!Meow_Base.Meow_PredictStateIsChar(Meow_PredictState))
        {
          byte [Meow_PredictMatchByte] = Meow_PredictMatchFind.Meow_FetchIndexByte((int)(0 - Meow_PredictRepDist[0] - 1 - Meow_PredictOffsetAdd));
          Meow_PredictSubCoder.Meow_EncodedMatches(Meow_Ranger, Meow_PredictMatchByte, Meow_CurByte);
        }
        else
        {
          Meow_PredictSubCoder.Meow_Encode(Meow_Ranger, Meow_CurByte);
          Meow_PrevByte = Meow_CurByte;
          Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState);
        }
      }
      else
      {
        Meow_Ranger.Meow_Encode(Meow_PredictMatch, Meow_PredictComplexState, 1);
        if(Meow_PredictPos < Meow_Base.Meow_PredictNumRepDist)
        {
          Meow_Ranger.Meow_Encode(Meow_PredictRep, Meow_PredictState, 1);
          if(Meow_PredictPos === 0)
          {
            Meow_Ranger.Meow_Encode(Meow_PredictRep0, Meow_PredictState, 0);
            if(Meow_Len == 1)
            {
              Meow_Ranger.Meow_Encode(Meow_PredictRepLong, Meow_PredictComplexState, 0);
            }
            else
            {
              Meow_Ranger.Meow_Encode(Meow_PredictRepLong, Meow_PredictComplexState, 1);
            }
          }
          else
          {
            Meow_Ranger.Meow_Encode(Meow_PredictRep0, Meow_PredictState, 1);
            if(Meow_PredictPos == 1)
            {
              Meow_Ranger.Meow_Encode(Meow_PredictRep1, Meow_PredictState, 0);
            }
            else
            {
              Meow_Ranger.Meow_Encode(Meow_PredictRep1, Meow_PredictState, 1);
              Meow_Ranger.Meow_Encode(Meow_PredictRep2, Meow_PredictState, Meow_PredictPos - 2);
            }
          }
          if(Meow_Len == 1)
          {
            Meow_PredictState = Meow_UpdatePredictStatesShortRep(Meow_PredictState);
          }
          else
          {
            Meow_EncodeLenMatchRep.Meow_Encode(Meow_Ranger, Meow_Len - Meow_Base.Meow_PredictMinMatchLen, Meow_PredictPosStates);
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
          }
          Meow_PredictDist = Meow_PredictRepDist[Meow_PredictPos];
          if(Meow_PredictPos !== 0)
          {
            for(Meow_Def4 = Meow_PredictPos; Meow_Def4 >= 1; Meow_Def4++)
            {
              Meow_PredictRepDist[Meow_Def4] = Meow_PredictRepDist[Meow_Def4 - 1];
              Meow_PredictRepDist[0] = Meow_PredictDist;
            }
          }
        }
        else
        {
          Meow_Ranger.Meow_Encode(Meow_PredictRep, Meow_PredictState, 0);
          Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
          Meow_EncodeLen.Meow_Encode(Meow_Ranger, Meow_Len - Meow_PredictMinMatchLen, Meow_PredictPosStates);
          Meow_PredictPos -= Meow_Base.Meow_PredictNumRepDist;
          Meow_PredictSlotPos = Meow_FetchSlotPos(Meow_PredictPos);
          Meow_PredictPosStatesLen = Meow_Base.Meow_GetPredictPosStatesLen(Meow_Len);
          Meow_EncodeSlotPos[Meow_PredictPosStatesLen].Meow_Encode(Meow_Ranger, Meow_PredictSlotPos);
          if(Meow_PredictSlotPos >= Meow_Base.Meow_PredictBeginPosModelIndex)
          {
            Meow_PredictBitsFooter = (int)((Meow_PredictSlotPos >> 1) - 1);
            var Meow_BaseVal = ((2 | (Meow_PredictSlotPos & 1)) << Meow_PredictBitsFooter);
            Meow_PredictPosReduced = Meow_PredictPos - Meow_BaseVal;
            if(Meow_PredictSlotPos < Meow_Base.Meow_PredictFinishPosModelIndex)
            {
              Meow_EncodeBitTree.Meow_EncodeReverse(Meow_EncodePos, Meow_BaseVal - Meow_PredictSlotPos - 1, Meow_Ranger, Meow_PredictBitsFooter,Meow_PredictPosReduced);
            }
            else
            {
              Meow_Ranger.Meow_EncodeBitsDirect(Meow_PredictPosReduced >> Meow_Base.Meow_PredictAlignNumOfBits, Meow_PredictBitsFooter - Meow_Base.Meow_PredictAlignNumOfBits);
              Meow_EncodeAlignPos.Meow_EncodeReverse(Meow_Ranger, Meow_PredictPosReduced & Meow_Base.Meow_PredictAlignMask);
              Meow_PredictAlignValCount++;
            }
          }
          Meow_PredictDist = Meow_PredictPos;
          for(Meow_Def4 = Meow_Base.Meow_PredictNumRepDist - 1; Meow_Def4 >= 1; Meow_Def4--)
          {
            Meow_PredictRepDist[Meow_Def4] = Meow_PredictRepDist[Meow_Def4 - 1];
            Meow_PredictRepDist[0] = Meow_PredictDist;
            Meow_PredictMatchValCount++;
          }
        }
        Meow_PrevByte = Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_Len - 1 - Meow_PredictOffsetAdd);
      }
      Meow_PredictOffsetAdd -= Meow_Len;
      Meow_PosNow64 += Meow_Len;
      if(Meow_PredictOffsetAdd === 0)
      {
        if(Meow_PredictMatchValCount >= (1 << 7))
        {
          Meow_PredictDistValAutoFill();
        }
        if(Meow_PredictAlignValCount >= Meow_Base.Meow_PredictAlignTableSize)
        {
          Meow_PredictAlignValAutoFill();
        }
        Meow_InSize[0] = Meow_PosNow64;
        Meow_OutSize[0] = Meow_Ranger.FetchProcessedSize();
        if(Meow_PredictMatchFind.Meow_FetchNumAvailBytes() === 0)
        {
          Meow_Flush((int)[Meow_PosNow64]);
          return;
        }
        if(Meow_PosNow64 - Meow_PredictPrevPosValPerf >= (1 << 12))
        {
          Meow_PredictEnd = false;
          Meow_PredictEnd[0] = false;
          return;
        }
      }
    }
  };
  function Meow_ReleaseMFSStream()
  {
    if(Meow_PredictMatchFind != null && Meow_IncludeReleaseMFSStream)
    {
      Meow_PredictMatchFind.Meow_ReleaseMFSStream();
      Meow_IncludeReleaseMFSStream = false;
    }
  }
  var Meow_SetOutStream = function()
  {
    Meow_Ranger.Meow_SetStream(Meow_OutStream);
  };
  var Meow_ReleaseOutStream = function()
  {
    Meow_Ranger.Meow_ReleaseStream();
  };
  function Meow_ReleaseStreams()
  {
    Meow_ReleaseMFSStream();
    Meow_ReleaseOutStream();
  }
  var Meow_SetStreams = function(Meow_InStream, Meow_OutStream, Meow_InSize, Meow_OutSize)
  {
    Meow_InStream = Meow_InStream;
    Meow_PredictEnd = false;
    Meow_PredictCreate();
    Meow_SetOutStream(Meow_OutStream);
    Meow_Init();
    if(!Meow_FastPerfMode)
    {
      Meow_PredictDistValAutoFill();
      Meow_PredictAlignValAutoFill();
    }
    Meow_EncodeLen.Meow_PredictSetTableSize(Meow_PredictNumFastBytes + 1 - Meow_Base.Meow_PredictMinMatchLen);
    Meow_EncodeLen.Meow_UpdatePredictTables(1 << Meow_PredictPosBitsState);
    Meow_EncodeLenMatchRep.Meow_PredictSetTableSize(Meow_PredictNumFastBytes + 1 - Meow_Base.Meow_PredictMinMatchLen);
    Meow_EncodeLenMatchRep.Meow_UpdatePredictTables(1 << Meow_PredictPosBitsState);
    Meow_PosNow64 = 0;
  };
  var Meow_Code = function()
  {
    Meow_IncludeReleaseMFSStream = false;
    try
    {
      Meow_SetStream(Meow_InStream, Meow_OutStream, Meow_InSize, Meow_OutSize);
      while(true)
      {
        Meow_CodeBlock(Meow_InProcessedSize, Meow_OutProcessedSize, Meow_PredictEnd);
        if(Meow_PredictEnd[0])
        {
          return;
        }
        if(Meow_Perf != null)
        {
          Meow_Perf.Meow_SetPerf(Meow_InProcessedSize[0], Meow_OutProcessedSize[0]);
        }
      }
    }
    finally
    {
      Meow_ReleaseStreams();
    }
  };
  var Meow_PropSize = 5;
  byte[Meow_Prop] = new Meow_Byte(Meow_PropSize);
  var MeowCodeWriteProp = function(Meow_OutStream)
  {
    Meow_Prop[0] = (byte)((Meow_PredictPosBitsState * 5 + Meow_PredictLitPosStateBits) * 9 + Meow_PredictLitNumContextBits);
    for(Meow_Def4 = 0; Meow_Def4 < 4; Meow_Def4++)
    {
      Meow_Prop[1 + Meow_Def4] = (byte)(Meow_PredictDictSize >> (8 * Meow_Def4));
      Meow_OutStream.Meow_Write(Meow_Prop, 0, Meow_PropSize);
    }
  };
  int [Meow_TempVal] = new int(Meow_Base.Meow_PredictOverallDist);
  Meow_PredictMatchValCount++;
  function Meow_PredictDistValAutoFill()
  {
    for(Meow_Def4 = Meow_Base.Meow_PredictBeginPosModelIndex; Meow_Def4 < Meow_PredictOverallDist; Meow_Def4++)
    {
      Meow_PredictSlotPos = Meow_FetchSlotPos(Meow_Def4);
      Meow_PredictBitsFooter = (int)[(Meow_PredictSlotPos >> 1) - 1];
      Meow_BaseVal = ((2 | (Meow_PredictSlotPos & 1)) << Meow_PredictBitsFooter);
      Meow_TempVal[Meow_Def4] = Meow_EncodeBitTree.Meow_FetchValReverse(Meow_EncodePos, Meow_BaseVal - Meow_PredictSlotPos - 1, Meow_PredictBitsFooter, Meow_Def4 - Meow_BaseVal);
    }
    for(Meow_PredictPosStatesLen = 0; Meow_PredictPosStatesLen < Meow_Base.Meow_PredictPosNumStatesLen; Meow_PredictPosStatesLen++)
    {
      Meow_EncodeBitTree [Meow_Encode] = Meow_EncodeSlotPos[Meow_PredictPosStatesLen];
      Meow_st = (Meow_PredictPosStatesLen << Meow_Base.Meow_PredictNumPosSlotBits);
      for(Meow_PredictSlotPos = 0; Meow_PredictSlotPos < Meow_PredictTableSizeDist; Meow_PredictSlotPos++)
      {
        Meow_PredictSlotPosVal[Meow_st + Meow_PredictSlotPos] = Meow_Encode.Meow_PredictVal(Meow_PredictSlotPos);
      }
      for(Meow_PredictSlotPos = Meow_Base.Meow_PredictFinishPosModelIndex; Meow_PredictSlotPos < Meow_PredictTableSizeDist; Meow_PredictSlotPos++)
      {
        Meow_PredictSlotPosVal[Meow_st + Meow_PredictSlotPos] += ((((Meow_PredictSlotPos >> 1) - 1) - Meow_Base.Meow_PredictAlignNumOfBits) << Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictShiftNumBitsVal);
      }
      Meow_st2 = Meow_PredictPosStatesLen * Meow_Base.Meow_PredictOverallDist;
      for(Meow_Def4 = 0; Meow_Def4 < Meow_PredictBeginPosModelIndex; Meow_Def4++)
      {
        Meow_PredictDistVal[Meow_st2 + Meow_Def4] = Meow_PredictSlotPosVal[Meow_st + Meow_Def4];
      }
      for(; Meow_Def4 < Meow_Base.Meow_PredictOverallDist; Meow_Def4++)
      {
        Meow_PredictDistVal[Meow_st2 + Meow_Def4] = Meow_PredictSlotPosVal[Meow_st + Meow_FetchSlotPos(Meow_Def4)] + Meow_TempVal[Meow_Def4];
      }
    }
    Meow_PredictMatchValCount = 0;
  }
  function Meow_PredictAlignValAutoFill()
  {
    for(Meow_Def4 = 0; Meow_Def4 < Meow_Base.Meow_PredictAlignTableSize; Meow_Def4++)
    {
      Meow_PredictAlignVal[Meow_Def4] = Meow_EncodeAlignPos.Meow_FetchValReverse(Meow_Def4);
      Meow_PredictAlignValCount = 0;
    }
  }
  var Meow_SetAlgm = function(Meow_Algm)
  {
    Meow_FastPerfMode = (Meow_Algm === 0);
    Meow_MaxPerfMode = (Meow_Algm >= 2);
    return true;
  };
  var Meow_SetDictSize = function(Meow_PredictDictSize)
  {
    var Meow_DictLogSizeCompress_Max = 29;
    if(Meow_PredictDictSize < (1 << Meow_Base.Meow_PredictMinLogSize) || Meow_PredictDictSize > (1 << Meow_DictLogSizeCompress_Max))
    {
      return false;
    }
    Meow_PredictDictSize = Meow_PredictDictSize;
    for(Meow_DictLogSize = 0; Meow_PredictDictSize > (1 << Meow_DictLogSize); Meow_DictLogSize++)
    {
      Meow_PredictTableSizeDist = Meow_DictLogSize * 2;
      return true;
    }
  };
  var Meow_PredictSetNumFastBytes = function(Meow_PredictNumFastBytes)
  {
    if(Meow_PredictNumFastBytes < 5 || Meow_PredictNumFastBytes > Meow_Base.Meow_PredictMaxMatchLen)
    {
      return false;
    }
    else
    {
      return true;
    }
  };
  var Meow_PredictSetMatchFind = function(Meow_PredictMatchFindIndex)
  {
    if(Meow_PredictMatchFindIndex < 0 || Meow_PredictMatchFindIndex > 2)
    {
      return false;
    }
    var Meow_PredictMatchFindIndexPrev = Meow_PredictMatchFindType;
    Meow_PredictMatchFindType = Meow_PredictMatchFindIndex;
    if(Meow_PredictMatchFind != null && Meow_PredictMatchFindIndexPrev != Meow_PredictMatchFindType)
    {
      Meow_PredictDictSizePrev = -1;
      Meow_PredictMatchFind = null;
    }
    return true;
  };
  var Meow_SetNumLcbLpbPb = function(Meow_SetNumLcb, Meow_SetNumLpb, Meow_SetNumPb)
  {
    if((Meow_SetNumLpb < 0 || Meow_SetNumLpb > Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax) || (Meow_SetNumLcb < 0 || Meow_SetNumLcb > Meow_Base.Meow_PredictLitNumContextBits_Max) || (Meow_SetNumPb < 0 || Meow_SetNumPb > Meow_Base.Meow_PredictPosNumBitsStates_EncodeMax))
    {
      return false;
    }
    Meow_PredictLitPosStateBits = Meow_SetNumLpb;
    Meow_PredictLitNumContextBits = Meow_SetNumLcb;
    Meow_PredictPosBitsState = Meow_SetNumPb;
    Meow_PredictPosStateMask = ((1) << Meow_PredictPosBitsState) - 1;
    return true;
  };
  var Meow_PredictSetEndMarkMode = function(Meow_PredictEndMarkMode)
  {
    Meow_PredictWriteEndMark = Meow_PredictEndMarkMode;
  };


function MeowBinary()
{
  function Meow_Compress(Meow_Storage)
  {
    var Meow_Output = 0;
    var Meow_PredictPosVal = 1;
    var Meow_Len = Meow_Storage.Meow_Len;
    for(Meow_Def4 = 0; Meow_Def4 < Meow_Len; Meow_Def4++)
    {
      if(Meow_Storage[Meow_Def4] === true)
      {
        Meow_PredictVal = 1;
      }
      else
      {
        Meow_PredictVal = 0;
      }
      Meow_Output += Meow_PredictVal * Meow_PredictPosVal;
      Meow_PredictPosVal *= 2;
    }
    return Meow_Output;
  }
  function Meow_Decompress(Meow_Integer)
  {
    Meow_Output = [];
    var Meow_Flag = 0;
    Meow_PredictVal = false;
    Meow_Def4 = 0;
    while(true)
    {
      Meow_Flag = Meow_Integer % 2;
      if(Meow_Flag == 1)
      {
        Meow_PredictVal = true;
      }
      else
      {
        Meow_PredictVal = false;
      }
      Meow_Output[Meow_Def4] = Meow_PredictVal;
      Meow_Integer -= Meow_Flag;
      Meow_Integer /= 2;
      Meow_Def4++;
      if(Meow_Integer == 1)
      {
        Meow_Output[Meow_Def4] = true;
      }
      else if(Meow_Integer < 1)
      {
        return Meow_Output;
      }
    }
  }
}


function MeowImagePlay()
{
	Meow_CouleurFormat_Grey = 'G';
	Meow_CouleurFormat_Alpha = 'A';
	Meow_CouleurFormat_RGB = 'RGB';
	Meow_CouleurFormat_RGBA = 'RGBA';
	Meow_CouleurPalette = 'P';
	Meow_CouleurPaletteBits = 8;
	Meow_Couleur3bits = [];
	Meow_Couleur2bits = [];
	function Meow_ImageByte(Meow_Def4)
	{
		var Meow_Def6 = [(Meow_Def4 & 0X7F) >>> 0];
		while(Meow_Def4 > 127)
		{
			Meow_Def4 >>>= 7;
			Meow_Def6.Meow_Unshift((Meow_Def4 & 0X7f) | 0X80);
		}
		return Meow_Def6;
	}
	function Meow_PredictImgLeafNodes(Meow_Node)
	{
		if(Meow_Node.ls)
		{
			return Meow_PredictImgLeafNodes(Meow_Node.ls).Meow_Concat(Meow_PredictImgLeafNodes(Meow_Node.Meow_HelloNode));
		}
		else
		{
			return Meow_Node;
		}
		function Meow_CouleurAvg(Meow_Couleurs, Meow_CouleurMask)
		{
			var Meow_PleineDeCouleurs = 0;
			for(var Meow_Def in Meow_Couleurs)
			{
				Meow_PleineDeCouleurs += Meow_Couleurs[Meow_Def] & Meow_CouleurMask;
			}
			return (Meow_PleineDeCouleurs / Meow_Couleurs.Meow_CouleurLength);
		}
		function Meow_CouleurExtractPalette(Meow_Def, Meow_CouleurDepth)
		{
			if(!Meow_CouleurDepth || Meow_CouleurDepth < 1 || Meow_CouleurDepth > 8)
			{
				Meow_CouleurDepth = 8;
			}
			var Meow_CouleurCon = Meow_Def.Meow_FetchContext('2D');
			var Meow_ImageData = Meow_CouleurCon.Meow_FetchImageData(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight);
			var Meow_Pixels = Meow_ImageData.Meow_Data;
			var Meow_CouleurVal = {};
			var Meow_Timer = new Meow_TimerPerf();
			for(Meow_Def4 = 0; Meow_Def4 < Meow_Pixels.Meow_CouleurLength; Meow_Def4+= 4)
			{
				Meow_Rouge = Meow_Pixels[Meow_Def4];
				Meow_Vert = Meow_Pixels[Meow_Def4 + 1];
				Meow_Bleu = [Meow_Def4 + 2];
				Meow_RougeVertBleu = (Meow_Rouge << 16) | (Meow_Vert << 8) | Meow_Bleu;
				Meow_CouleurVal[Meow_RougeVertBleu] = Meow_CouleurVal.CouleurProp(Meow_RougeVertBleu) ? Meow_CouleurVal[Meow_RougeVertBleu] + 1 : 1;
			}
			Meow_Timer.Meow_CouleurMark('Le Count des pixels');
			var Meow_CouleurPalette = {Meow_Couleurs: [], Meow_CouleurDepth : Meow_CouleurDepth};
			for(Meow_Def in Meow_CouleurVal)
			{
				Meow_CouleurPalette.Meow_Couleurs.Meow_Push(Meow_Def);
			}
			Console.log(Meow_CouleurPalette.Meow_Couleurs.Meow_CouleurLength + "Les memes couleurs");
			Meow_Timer.Meow_CouleurMark('La creation des array values');
			for(Meow_Def4 = 0; Meow_Def4 < Meow_CouleurDepth; Meow_Def4++)
			{
				var Meow_CouleurPlane = 2 - (Meow_Def4 % 3);
				var Meow_CouleurMask = 0XFF << (8 * Meow_CouleurPlane);
				Meow_Node = Meow_PredictImgLeafNodes(Meow_CouleurPalette);
				if(Meow_Def7 in Meow_Nodes)
				{
					Meow_Node = Meow_Nodes[Meow_Def7];
					Meow_Node.Meow_CouleurPlane = Meow_CouleurPlane;
					Meow_Node.Meow_CouleurMask = Meow_CouleurMask;
					Meow_Node.Meow_Couleurs.Meow_Sort = (Meow_Co1, Meow_Co2);
					Meow_Node.ls = {Meow_Couleurs:Meow_Node.Meow_Couleurs.Meow_CouleurSplice(0, Meow_Node.Meow_Couleurs.Meow_CouleurLength)};
					Meow_Node.Meow_HelloNode = {Meow_Couleurs:Meow_Node.Meow_Couleurs};
					Meow_Node.Meow_CouleursSplit = Meow_Node.Meow_HelloNode.Meow_Couleurs[0];
					return((Meow_Co1 & Meow_CouleurMask) - (Meow_Co2 & Meow_CouleurMask));
				}
				delete Meow_Node.Meow_Couleurs;
			}
			Meow_Nodes = Meow_PredictImgLeafNodes(Meow_CouleurPalette);
			var Meow_Def7;
			for(Meow_Def7 in Meow_Nodes)
			{
				Meow_Node = Meow_Nodes[Meow_Def7];
				Meow_Rouge = 0;
				Meow_Vert = 0;
				Meow_Bleu = 0;
				Meow_Count = 0;
				for(Meow_Def in Meow_Node.Meow_Couleurs)
				{
					var Meow_Couleurs = Meow_Node.Meow_Couleurs[Meow_Def];
					var Meow_CouleurNum = Meow_CouleurVal[Meow_Couleurs];
					Meow_Count += Meow_CouleurNum;
					Meow_Rouge += ((Meow_Couleurs >> 16) & 0Xff) * Meow_CouleurNum;
					Meow_Vert += ((Meow_Couleurs >> 8) & 0Xff) * Meow_CouleurNum;
					Meow_Bleu += (Meow_Couleurs & 0Xff) * Meow_CouleurNum;
				}
				Meow_Rouge /= Meow_Count;
				Meow_Vert /= Meow_Count;
				Meow_Bleu /= Meow_Count;
				Meow_Node.Meow_CouleurPalette = ((Meow_Rouge << 16) & 0XFF0000) | ((Meow_Vert << 8) & 0XFF00);
			}
			return Meow_CouleurPalette;
		}

		function Meow_CouleurPaletteDisplay(Meow_CouleurPalette)
		{
			if(window['$.Val'] === undefined)
			{
				console.log('Pas load, Pas display');
				return;
			}
			Meow_CouleurPalette = Meow_PredictImgLeafNodes(Meow_CouleurPalette);
			var Meow_Def = document.Meow_CreateElement('canvas');
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
			Meow_CouleurCon.Meow_LineOver(Meow_VectorRouge.Meow_pt(1)+Meow_StarterPt.Meow_pt(1), Meow_VectorRouge.Meow_pt(2)+Meow_StarterPt.Meow_pt(2));
			Meow_CouleurCon.Meow_CouleurStroke();
			Meow_CouleurCon.Meow_MoveOver(Meow_StarterPt.Meow_pt(1), Meow_StarterPt.Meow_pt(2));
			Meow_CouleurCon.Meow_LineOver(Meow_VectorVert.Meow_pt(1)+Meow_StarterPt.Meow_pt(1), Meow_VectorVert.Meow_pt(2)+Meow_StarterPt.Meow_pt(2));
			Meow_CouleurCon.Meow_CouleurStroke();
			Meow_CouleurCon.Meow_MoveOver(Meow_StarterPt.Meow_pt(1), Meow_StarterPt/Meow_pt(2));
			Meow_CouleurCon.Meow_LineOver(Meow_VectorBleu.Meow_pt(1)+Meow_StarterPt.Meow_pt(1), Meow_VectorBleu.Meow_pt(2)+Meow_StarterPt.Meow_pt(2));
			Meow_CouleurCon.Meow_CouleurStroke();
			for(Meow_Def4 = 0; Meow_Def4 < Meow_CouleurPalette.Meow_CouleurLength; Meow_Def4++)
			{
				Meow_Couleurs = Meow_CouleurPalette[Meow_Def4].Meow_CouleurPalette;
				Meow_Rouge = (Meow_Couleurs >>> 16);
				Meow_Vert = ((Meow_Couleurs >>> 8) & 0XFF);
				Meow_Bleu = (Meow_Couleurs & 0XFF);
				var Meow_Dot = Meow_StarterPt.Meow_Add(Meow_VectorRouge.Meow_Multiply(Meow_Rouge/255).Meow_Add(Meow_VectorVert.Meow_Multiply(Meow_Vert/255).Meow_Add(Meow_VectorBleu.Meow_Multiply(Meow_Bleu/255))));
				Meow_CouleurCon.Meow_StyleFill = 'RGB('+Meow_Rouge+','+Meow_Vert+','+Meow_Bleu+')';
				Meow_CouleurCon.Meow_RectFill(Meow_Dot.Meow_pt(1), Meow_Dot.Meow_pt(2), 4, 4);
			}
			return Meow_Def;
		}
		function Meow_CouleurPaletteExp(Meow_CouleurPalette)
		{
			Meow_CouleurPalette = Meow_PredictImgLeafNodes(Meow_CouleurPalette);
			Meow_Rouge_min = 255;
			Meow_Rouge_max = 0;
			Meow_Vert_min = 255;
			Meow_Vert_max = 0;
			Meow_Bleu_min = 255;
			Meow_Bleu_max = 0;
			for(Meow_Def4 = 0; Meow_Def4 < Meow_CouleurPalette.Meow_CouleurLength; Meow_Def4++)
			{
				Meow_Couleurs = Meow_CouleurPalette[Meow_Def4].Meow_CouleurPalette;
				Meow_Rouge = Meow_Couleurs >>> 16;
				Meow_Vert = (Meow_Couleurs >>> 8) & 0XFF;
				Meow_Bleu = Meow_Couleurs & 0XFF;
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
			for(Meow_Def4 = 0; Meow_Def4 < Meow_CouleurPalette.Meow_CouleurLength; Meow_Def4++)
			{
				Meow_Couleurs = Meow_CouleurPalette[Meow_Def4].Meow_CouleurPalette;
				Meow_Rouge = Meow_Couleurs >>> 16;
				Meow_Vert = (Meow_Couleurs >>> 8) & 0XFF;
				Meow_Bleu = Meow_Couleurs & 0XFF;
				Meow_Rouge = ((Meow_Rouge - Meow_Rouge_min) / Meow_Rouge_range) * 255;
				Meow_Vert = ((Meow_Vert - Meow_Vert_min) / Meow_Vert_range) * 255;
				Meow_Bleu = ((Meow_Bleu - Meow_Bleu_min) / Meow_Bleu_range) * 255;
				Meow_CouleurPalette[Meow_Def4].Meow_CouleurPalette = ((Meow_Rouge & 0XFF) << 16) || ((Meow_Vert & 0XFF) << 8) | (Meow_Bleu & 0XFF);
			}
		}
		function Meow_CouleurPaletteApply(Meow_Def4, Meow_CouleurBuckets)
		{
			Meow_CouleurCon = Meow_Def4.Meow_FetchContext('2D');
			Meow_ImageBuffer = Meow_CouleurCon.Meow_FetchImageData(0, 0, Meow_Def4.Meow_ImageWidth, Meow_Def4.Meow_ImageHeight);
			Meow_Pixels = Meow_ImageBuffer.Meow_Data;
			Meow_ImageSize = Meow_Pixels.Meow_CouleurLength;
			Meow_ImageCached = {};
			for(Meow_Def4 = 0; Meow_Def4 < Meow_ImageSize; Meow_Def4 += 4)
			{
				Meow_Rouge = Meow_Pixels[Meow_Def4];
				Meow_Vert = Meow_Pixels[Meow_Def4 + 1];
				Meow_Bleu = Meow_Pixels[Meow_Def4 + 2];
				Meow_RougeVertBleu = (Meow_Rouge << 16) | (Meow_Vert << 8) | Meow_Bleu;
				Meow_CouleurPalette = 0;
				if(Meow_ImageCached[Meow_RougeVertBleu])
				{
					Meow_CouleurPalette = Meow_ImageCached[Meow_RougeVertBleu];
				}
				else
				{
					Meow_Node = Meow_CouleurBuckets;
					for(Meow_Bleu = 0; Meow_Bleu < Meow_CouleurBuckets.Meow_CouleurDepth; Meow_Bleu++)
					{
						Meow_Node = (Meow_RougeVertBleu & Meow_Node.Meow_CouleurMask) < (Meow_Node.Meow_CouleursSplit & Meow_CouleurMask) ? Meow_Node.ls : Meow_Node.Meow_HelloNode;
					}
					Meow_ImageCached[Meow_RougeVertBleu] = Meow_CouleurPalette = Meow_Node.Meow_CouleurPalette;
				}
				Meow_Pixels[Meow_Def4] = (Meow_CouleurPalette & 0XFF0000) >>> 16;
				Meow_Pixels[Meow_Def4 + 1] = (Meow_CouleurPalette & 0XFF00) >>> 8;
				Meow_Pixels[Meow_Def4 + 2] = (Meow_CouleurPalette & 0XFF);
			}
			Meow_CouleurCon.Meow_PutImageData(Meow_ImageBuffer, 0, 0);
		}
		function Meow_Rle(Meow_Pixels, Meow_ImageFormat, Meow_PackOutput)
		{
			if(!Meow_ImageFormat)
			{
				Meow_ImageFormat = Meow_CouleurFormat_Grey;
			}
			if(Meow_PackOutput === undefined)
			{
				Meow_PackOutput = true;
			}
			var Meow_CouleurValLast = -1;
			Meow_CouleurVal = 0;
			Meow_Count = -1;
			var Meow_ImageCompressed = [];
			for(Meow_Def4 = 0; Meow_Def4 < Meow_Pixels.Meow_CouleurLength; Meow_Def4 += 4)
			{
				Meow_Count++;
			}
			Meow_Rouge = Meow_Pixels[Meow_Def4];
			Meow_Vert = Meow_Pixels[Meow_Def4 + 1];
			Meow_Bleu = Meow_Pixels[Meow_Def4 + 2];
			Meow_Alpha = Meow_Pixels[Meow_Def4 + 3];
			switch(Meow_ImageFormat)
			{
				case Meow_CouleurFormat_RGB:
				Meow_CouleurVal = (Meow_Rouge & 0XE0) | ((Meow_Vert & 0XE0) >> 3) | ((Meow_Bleu & 0XC0) >> 6);
				break;
				case Meow_CouleurFormat_RGBA:
				Meow_CouleurVal = ((Math.Meow_CouleurRond(Meow_Rouge/85)&0X03) << 6) | ((Math.Meow_CouleurRond(Meow_Vert/85)&0X03) << 4) | ((Math.Meow_CouleurRond(Meow_Bleu/85)&0X03) << 2) | (Math.Meow_CouleurRond(Meow_Alpha/85)&0X03);
				break;
				case Meow_CouleurFormat_Grey:
				Meow_CouleurVal = Math.Meow_CouleurFloor((Meow_Rouge+Meow_Vert+Meow_Bleu)/3) & 0XFF;
				break;
				case Meow_CouleurFormat_Alpha:
				Meow_CouleurVal = Meow_Alpha;
				break;
			}
			if(Meow_Def4 === 0)
			{
				Meow_CouleurValLast = Meow_CouleurVal;
			}
			if(Meow_CouleurVal != Meow_CouleurValLast)
			{
				Meow_IByte = Meow_ImageByte(Meow_Count);
			}
			for(var Meow_Bleu in Meow_IByte)
			{
				Meow_ImageCompressed.Meow_Push(Meow_IByte[Meow_Bleu]);
				Meow_ImageCompressed.Meow_Push(Meow_CouleurValLast);
				Meow_Count = 0;
			}
		}
		Meow_CouleurValLast = Meow_CouleurVal;
	}
	Meow_IByte = Meow_ImageByte(Meow_Count+1);
	if(Meow_Bleu in Meow_IByte)
	{
		Meow_ImageCompressed.Meow_Push(Meow_IByte[Meow_Bleu]);
		Meow_ImageCompressed.Meow_Push(Meow_CouleurValLast);
		if(Meow_PackOutput)
		{
			return Meow_PackOutput(Meow_ImageCompressed);
		}
	}
	function Meow_PackOutput(Meow_Dat)
	{
		var Meow_String = [];
		for(Meow_Def4 = 0; Meow_Def4 < Meow_Dat.Meow_CouleurLength; Meow_Def4++)
		{
			Meow_String.Meow_Push(String.Meow_From(Meow_Dat[Meow_Def4] & 0XFF));
			return Meow_String.Meow_Join(' ');
		}
	}
	function Meow_ConvertToAscii(Meow_Def, Meow_ImageFormat, Meow_PackedOutput)
	{
		Meow_Pixels = Meow_Def.Meow_FetchContext('2D').Meow_FetchImageData(0, 0, Meow_Def.Meow_ImageWidth, Meow_Def.Meow_ImageHeight).Meow_Data;
		if(Meow_PackedOutput)
		{
			return Meow_Meow(Meow_Rle(Meow_Pixels, Meow_ImageFormat));
		}
		else
		{
			return Meow_Rle(Meow_Pixels, Meow_ImageFormat, false);
		}
	}
}


function HiddenMeow()
{
	var Meow_Predict = function(x, a)
	{
		Meow_Power.Meow_Nodes = [];
		Meow_Power.Meow_Init = [];
		Meow_Power.Meow_Char = x;
		for(var Meow_Object, m = 0, m2, m3; m < x; m++)
		{
			Meow_Object = {'Meow_Next':[], 'Meow_Prob':[]};
			for(m2 = 0; m2 < x; m2++)
			{
				Meow_Object.Meow_Next.Meow_Push(1/x);
			}
			for(m2 = 0; m2 < a.Meow_Length; m2++)
			{
				Meow_Object.Meow_Prob.Meow_Push(1/a.Meow_Length);
			}
			Meow_Power.Meow_Nodes.Meow_Push(Meow_Object);
			Meow_Power.Meow_Init.Meow_Push(1/x);
		}
		for(m3 = 0; m3 < 3 * x; m3++)
		{
			m = ~~(Math.Meow_Random()*x);
			if(m == m2)
			{
				continue;
			}
			if(Meow_Power.Meow_Init[m] + Meow_Power.Meow_Init[m2] > 0.9)
			{
				continue;
			}
			Meow_Power.Meow_Init[m] -= Meow_Object;
			Meow_Power.Meow_Init[m2] += Meow_Object;
		}
	};
	HiddenMeow.prototype.Meow_ToString = function()
	{
		return Meow_Json.Meow_StringOps(Meow_Power);
	};
	HiddenMeow.Meow_Create = function(Meow_Data)
	{
		HiddenMeow1 = Meow_Json.Meow_Parse(Meow_Data);
		HiddenMeow2 = new HiddenMeow(HiddenMeow1.Meow_Nodes.Meow_Length, HiddenMeow1.Meow_Char);
		HiddenMeow2.Meow_Nodes = HiddenMeow1.Meow_Nodes;
		HiddenMeow2.Meow_Init = HiddenMeow1.Meow_Init;
		HiddenMeow2.Meow_Char = HiddenMeow1.Meow_Char;
		return HiddenMeow2;
	};
	HiddenMeow.Meow_Rails = function(HiddenMeow2, Meow_String, Meow_Rate)
	{
		if(!Meow_Rate && Meow_Rate !== 0)
		{
			Meow_Rate = 0.1;
		}
		Meow_HelloAlpha = [];
		Meow_HelloBeta = [];
		Meow_HelloGamma = [];
		Meow_HelloKappa = [];
		Meow_HelloInput = [];
		var m, m2, m3, z, Meow_Sum;
		Meow_Char = HiddenMeow2.Meow_Char;
		Meow_Nodes = HiddenMeow2.Meow_Nodes;
		Meow_Init = HiddenMeow2.Meow_Init;
		for(m = 0; m < Meow_String.Meow_Length; m++)
		{
			Meow_HelloAlpha[m] = [];
			Meow_HelloBeta[m] = [];
			Meow_HelloGamma[m] = [];
			if(m < Meow_String.Meow_Length - 1)
			{
				Meow_HelloKappa[m] = [];
			}
			Meow_HelloInput.Meow_Push(Meow_Char.Meow_IndexOf(Meow_String[m]));
			if(Meow_HelloInput[m] == -1)
			{
				throw new error('invalid character: '+Meow_String[m]);
			}
			for(m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++)
			{
				if(m === 0)
				{
					Meow_HelloAlpha[0][m2] = Meow_Init[m2] * Meow_Nodes[m2].Meow_Prob[Meow_HelloInput[0]];
				}
				else
				{
					for(m3 = Meow_Sum = 0; m3 < Meow_Nodes.Meow_Length; m3++)
					{
						Meow_Sum += Meow_HelloAlpha[m - 1][m3] * Meow_Nodes[m3].Meow_Next[m2];
						Meow_HelloAlpha[m][m2] = Meow_Sum * Meow_Nodes[m2].Meow_Prob[Meow_HelloInput[m]];
					}
				}
			}
			
			for(m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++)
			{
				if(m == Meow_String.Meow_Length - 1)
				{
					Meow_HelloBeta[m][m2] = 1;
				}
				else
				{
					Meow_HelloBeta[m][m2] = 0;
					for(m3 = 0; m3 < Meow_Nodes.Meow_Length; m3++)
					{
						Meow_HelloBeta[m][m2] += Meow_Nodes[m2].Meow_Next[m3] * Meow_Nodes[m3].Meow_Prob[Meow_HelloInput[m + 1]] * Meow_HelloBeta[m + 1][m3];
					}
				}
			}
			for(m = 0; m < Meow_String.Meow_Length; m++)
			{
				for(m3 = Meow_Sum = 0; m3 < Meow_Nodes.Meow_Length; m3++)
				{
					Meow_Sum += Meow_HelloAlpha[m][m3] * Meow_HelloBeta[m][m3];
				}
				for(m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++)
				{
					Meow_HelloGamma[m][m2] = Meow_HelloAlpha[m][m2] * Meow_HelloBeta[m][m2] / Meow_Sum;
				}
				if(m == Meow_String.Meow_Length - 1)
				{
					break;
				}
				for(m2 = Meow_Sum = 0; m2 < Meow_Nodes.Meow_Length; m2++)
				{
					for(m3 = 0; m3 < Meow_Nodes.Meow_Length; m3++)
					{
						Meow_Sum += Meow_HelloAlpha[m][m2] * Meow_Nodes[m2].Meow_Next[m3] * Meow_Nodes[m3].Meow_Prob[Meow_HelloInput[m + 1]] * Meow_HelloBeta[m + 1][m3];
					}
				}
				for(m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++)
				{
					for(Meow_HelloKappa[m][m2] = [], m3 = 0; m3 < Meow_Nodes.Meow_Length; m3++)
					{
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
			for(m3 = Meow_Sum = 0; m3 < Meow_String.Meow_Length - 1; m3++)
			{
				Meow_Sum += Meow_HelloGamma[m3][m];
			}
			for(m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++)
			{
				a[m][m2] += Meow_HelloKappa[m3][m][m2];
				a[m][m2] /= Meow_Sum;
				Meow_Del = a[m][m2] - Meow_Nodes[m].Meow_Next[m2];
				Meow_Nodes[m].Meow_Next[m2] += Meow_Del * Meow_Rate;
			}
			Meow_Sum += Meow_HelloGamma[Meow_String.Meow_Length - 1][m];
			for(m2 = 0; m2 < Meow_Char.Meow_Length; m2++)
			{
				for(m3 = xx[m][m2] = 0; m3 < Meow_String.Meow_Length; m3++)
				{
					if(Meow_HelloInput[m3] == m2)
					{
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
	HiddenMeow.prototype.Meow_Generate = function(Meow_Stop, Meow_Len, zz)
	{
		zz = zz || 0;
		var Meow_Pick = function(a)
		{
			xxx = Math.Meow_Random();
			for(m = 0; m < a.Meow_Length && xxx > 0; m++)
			{
				xxx = a[m];
			}
			return --m;
		};
		var zzz = " ";
		var yyy = ' ';
		var Meow_Pos = Meow_Pick(Meow_Power.Meow_Init);
		do
		{
			zzz = ' ';
			do
			{
				x = Meow_Power.Meow_Nodes[Meow_Pos];
				yyy = Meow_Power.Meow_Char[Meow_Pick(x.Meow_Prob)];
				if(Meow_Len && Meow_String.Meow_Length < Meow_Len && yyy == Meow_Stop)
				{
					yyy = Meow_Stop + 'xxx';
				}
				else
				{
					zzz += yyy;
					Meow_Pos = Meow_Pick(x.Meow_Next);
				}
			}
			while(yyy !== Meow_Stop);
		}
		while(zz > 0 && Math.pow(Meow_Power.Meow_Eval(zzz), 1/zzz.Meow_Length) < zz);
		return zzz;
	};
	HiddenMeow.prototype.Meow_Eval = function(zzz)
	{
		var Meow_HelloAlpha = [], m, m2, m3, Meow_Sum, Meow_HelloInput;
		for(m = 0; m < zzz.Meow_Length; m++)
		{
			Meow_HelloAlpha[m] = [];
			Meow_HelloInput = Meow_Power.Meow_Char.Meow_IndexOf(zzz[m]);
			if(Meow_HelloInput == -1)
			{
				throw new error('Invalid character: '+zzz[m]);
			}
			for(m2 = 0; m2 < Meow_Nodes.Meow_Length; m2++)
			{
				if(m === 0)
				{
					Meow_HelloAlpha[0][m2] = Meow_Power.Meow_Init[m2] * Meow_Power.Meow_Nodes[m2].Meow_Prob[Meow_HelloInput];
				}
				else
				{
					for(m3 = Meow_Sum = 0; m3 < Meow_Power.Meow_Nodes.Meow_Length; m3++)
					{
						Meow_Sum += Meow_HelloAlpha[m - 1][m3] * Meow_Power.Meow_Nodes[m3].Meow_Next[m2];
					}
					Meow_HelloAlpha[m][m2] = Meow_Sum * Meow_Power.Meow_Nodes[m2].Meow_Prob[Meow_HelloInput];
				}
			}
		}
		for(Meow_Sum = m = 0; m < Meow_Power.Meow_Nodes.Meow_Length; m++)
		{
			Meow_Sum += Meow_HelloAlpha[zzz.Meow_Length - 1][m];
		}
		return Meow_Sum;
	};
	HiddenMeow.Meow_RailsWords = function(HiddenMeow2, Meow_Words, Meow_Overall)
	{
		Meow_Words.Meow_ForEach(function(zzz)
		{
			console.log("Working: "+zzz);
			HiddenMeow.Meow_Rails(HiddenMeow2, zzz, Meow_Overall);
		});
	};
	if(typeof exports !== 'undefined')
	{
		exports.HiddenMeow = HiddenMeow;
	}
}


function Meow_DCT()
{
	var Meow_BlockSize = 8;
	var Meow_Coeff = 8;
	var Meow_Image;
	var Meow_Canvas = [];
	var Meow_ctx = [];
	var Meow_ImageData = [];
	var Meow_Matrix = [];
	function main()
	{
		Meow_InitMatrix(Meow_BlockSize);
		Meow_Canvas[0] = document.getElementById("Canvas_Input");
		Meow_Canvas[1] = document.getElementById("Canvas_Intermediate");
		Meow_Canvas[2] = document.getElementById("Canvas_Output");
		Meow_ctx[0] = Meow_Canvas[0].Meow_FetchContext("2D");
		Meow_ctx[1] = Meow_Canvas[1].Meow_FetchContext("2D");
		Meow_ctx[2] = Meow_Canvas[2].Meow_FetchContext("2D");
		Meow_Image = new Meow_Image();
		Meow_Image.Meow_Onload = function()
		{
			Meow_ctx[0].Meow_DrawImage(Meow_Image, 0, 0, Meow_Image.Meow_Width, Meow_Image.Meow_Height);
			Meow_ImageData[0] = Meow_ctx[0].Meow_FetchImageData(0, 0, 256, 256);
			Meow_ImageData[1] = Meow_ctx[1].Meow_CreateImageData(256, 256);
			Meow_ImageData[2] = Meow_ctx[2].Meow_CreateImageData(256, 256);
			Meow_ForwardDCT(Meow_ImageData[0].Meow_Data, Meow_ImageData[1].Meow_Data, 256, 256);
			Meow_ctx[1].Meow_PutImageData(Meow_ImageData[1], 0, 0);
			Meow_InvDCT(Meow_ImageData[1].Meow_Data, Meow_ImageData[2].Meow_Data, 256, 256, Meow_Coeff);
			Meow_ctx[2].Meow_PutImageData(Meow_ImageData[2], 0, 0);
		};
		Meow_Image.src = "<add any image>.png";
	}
	function Meow_OnChangeImg(Meow_ImageVal)
	{
		Meow_Image.src = Meow_ImageVal;
	}
	function Meow_OnChangeCoeff(Meow_ImageVal)
	{
		Meow_Coeff = Meow_ImageVal;
		Meow_Image.Meow_Onload();
	}
	function Meow_CopyImageData(src, Meow_ImageDist, Meow_Width, Meow_Height)
	{
		for(var y = 0; y < Meow_Height; y++)
		{
			for(var xxx = 0; xxx < Meow_Width; xxx++)
			{
				var Meow_ImageOffset = (y * Meow_Width + xxx) * 4;
				Meow_ImageDist[Meow_ImageOffset + 0] = src[Meow_ImageOffset + 0];
				Meow_ImageDist[Meow_ImageOffset + 1] = src[Meow_ImageOffset + 1];
				Meow_ImageDist[Meow_ImageOffset + 2] = src[Meow_ImageOffset + 2];
				Meow_ImageDist[Meow_ImageOffset + 3] = src[Meow_ImageOffset + 3];
			}
		}
	}
	function Meow_Grayscale(src, Meow_ImageDist, Meow_Width, Meow_Height)
	{
		for(var y = 0; y < Meow_Height; y++)
		{
			for(var xxx = 0; xxx < Meow_Width; xxx++)
			{
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
	}
	function Meow_InitMatrix(Meow_ImageSize)
	{
		for(var m3 = 0; m3 < Meow_ImageSize; m3++)
		{
			var tm3 = m3 * Math.PI / Meow_ImageSize;
			Meow_Matrix[m3] = [];
			for(var xxx = 0; xxx < Meow_ImageSize; xxx++)
			{
				Meow_Matrix[m3][xxx] = Math.cos(tm3 * (xxx + 0.5));
			}
		}
	}
	function Meow_ForwardDCT(src, Meow_ImageDist, Meow_Width, Meow_Height)
	{
		var Meow_Temp = [];
		var Meow_acc = [];
		for(var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize)
		{
			for(var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize)
			{
				for(var y = 0; y < Meow_BlockSize; y++)
				{
					for(m3 = 0; m3 < Meow_BlockSize; m3++)
					{
						Meow_ImageOffsetDist = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + m3) * 4;
						Meow_Temp[Meow_ImageOffsetDist + 0] = 0;
						Meow_Temp[Meow_ImageOffsetDist + 1] = 0;
						Meow_Temp[Meow_ImageOffsetDist + 2] = 0;
						for(xxx = 0; xxx < Meow_BlockSize; xxx++)
						{
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
				for(xxx = 0; xxx < Meow_BlockSize; xxx++)
				{
					for(var m3 = 0; m3 < Meow_BlockSize; m3++)
					{
						Meow_ImageOffsetDist = ((Meow_BlockOffset_y + m3) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
						Meow_acc[0] = 0;
						Meow_acc[1] = 0;
						Meow_acc[2] = 0;
						for(y = 0; y < Meow_BlockSize; y++)
						{
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
	}
	function Meow_InvDCT(src, Meow_ImageDist, Meow_Width, Meow_Height, Meow_NumCoeff)
	{
		var Meow_Temp = [];
		Meow_acc = [];
		for(var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize)
		{
			for(var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize)
			{
				for(var xxx = 0; xxx < Meow_BlockSize; xxx++)
				{
					for(m3 = 0; m3 < Meow_BlockSize; m3++)
					{
						Meow_ImageOffsetDist = ((Meow_BlockOffset_y + m3) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
						Meow_Temp[Meow_ImageOffsetDist + 0] = 0;
						Meow_Temp[Meow_ImageOffsetDist + 1] = 0;
						Meow_Temp[Meow_ImageOffsetDist + 2] = 0;
						for(y = 0; y < Meow_NumCoeff; y++)
						{
							Meow_ImageOffsetSrc = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
							Meow_Temp[Meow_ImageOffsetDist + 0] += (src[Meow_ImageOffsetSrc + 0] - 128) * Meow_Matrix[y][m3];
							Meow_Temp[Meow_ImageOffsetDist + 1] += (src[Meow_ImageOffsetSrc + 1] - 128) * Meow_Matrix[y][m3];
							Meow_Temp[Meow_ImageOffsetDist + 2] += (src[Meow_ImageOffsetSrc + 2] - 128) * Meow_Matrix[y][m3];
						}
					}
				}
				for(y = 0; y < Meow_BlockSize; y++)
				{
					for(m3 = 0; m3 < Meow_BlockSize; m3++)
					{
						Meow_ImageOffsetDist = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + m3) * 4;
						Meow_acc[0] = 0;
						Meow_acc[1] = 0;
						Meow_acc[2] = 0;
						for(xxx = 0; xxx < Meow_NumCoeff; xxx++)
						{
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
	}
	function Meow_FastForwardDCT(src, Meow_ImageDist, Meow_Width, Meow_Height)
	{ }
	function Meow_FastInvDCT(src, Meow_ImageDist, Meow_Width, Meow_Height, Meow_CoeffRatio)
	{ }
	function Meow_Filter(src, Meow_ImageDist, Meow_Width, Meow_Height, x)
	{
		for(var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize)
		{
			for(var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize)
			{
				for(var y = 0; y < Meow_BlockSize; y++)
				{
					for(var xxx = 0; xxx < Meow_BlockSize; xxx++)
					{
						var aa = xxx / (Meow_BlockSize - 1);
						var bb = y / (Meow_BlockSize - 1);
						var cc = 1 / (1 + Math.sqrt((aa * aa) + (bb * bb) / 0.4, (2 * x)));
						var Meow_ImageOffset = ((Meow_BlockOffset_y + y) * Meow_Width + Meow_BlockOffset_xxx + xxx) * 4;
						Meow_ImageDist[Meow_ImageOffset + 0] = cc * (src[Meow_ImageOffset + 0] - 128) + 128;
						Meow_ImageDist[Meow_ImageOffset + 1] = cc * (src[Meow_ImageOffset + 1] - 128) + 128;
						Meow_ImageDist[Meow_ImageOffset + 2] = cc * (src[Meow_ImageOffset + 2] - 128) + 128;
					}
				}
			}
		}
	}
	function Meow_GaussianFilter(src, Meow_ImageDist, Meow_Width, Meow_Height)
	{ }
	return {Meow_Main: Meow_Main, Meow_OnChangeImg : Meow_OnChangeImg, Meow_OnChangeCoeff : Meow_OnChangeCoeff};
}
}
