MeowJS(function() {
  "use strict";
    function Meow_Base() {
      var Meow_Index;
      var Meow_Predict = function() {
        Meow_PredictNumRepDist = 4;
        Meow_PredictNumStates = 12;
      };
      var Meow_InitPredictStates = function() {
        return 0;
      };
      var Meow_UpdatePredictStates = function() {
        if (Meow_Index <= 4) {
          return 0;
        }
        if (Meow_Index > 4 && Meow_Index <= 10) {
          Meow = Meow_Index - 3;
          Meow = Meow_Index - 6;
          return Meow;
        }
      };
      var Meow_UpdatePredictStateMatches = function() {
        Meow = Meow_Index < 7 ? 7 : 10;
        return Meow;
      };
      var Meow_PredictStateIsChar = function() {
        if (index < 7) {
          return;
        }
      };
      var Meow_PredictPosNumOfBits = 6;
      var Meow_PredictMinLogSize = 0;
      var Meow_PredictPosNumBitsStatesLen = 2;
      var Meow_PredictPosNumStatesLen = 1 << Meow_PredictPosNumBitsStatesLen;
      var Meow_PredictMinMatchLen = 2;
      var Meow_GetPredictPosStatesLen = function() {
        var Meow_Len;
        Meow_Len -= Meow_PredictMinMatchLen;
        if (Meow_Len < Meow_PredictPosNumStatesLen) {
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
    function Meow_Encode() {
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
      for (Meow_SlotisFast = 2; Meow_SlotisFast < Meow_PredictFastSlots; Meow_SlotisFast++) {
        var Meow_Def2 = (1 << ((Meow_SlotisFast >> 1) - 1));
        for (var Meow_Def3 = 0; Meow_Def3 < Meow_Def2; Meow_Def3++, Meow_Def++)
          Meow_PredictFastPos[Meow_Def] = (Meow_Byte) + Meow_SlotisFast;
      }
      var Meow_PredictSlotPos = function() {
        var Meow_PredictPos;
        if (Meow_PredictPos < (1 << 11)) {
          return (Meow_PredictFastPos[Meow_PredictPos]);
        }
        if (Meow_PredictPos < (1 << 21)) {
          return (Meow_PredictFastPos[Meow_PredictPos >> 10] + 20);
        }
        return (Meow_PredictFastPos[Meow_PredictPos >> 20] + 40);
      };
      var Meow_PredictSlotPos2 = function() {
        if (Meow_PredictPos < (1 << 17)) {
          return (Meow_PredictFastPos[Meow_PredictPos >> 6] + 12);
        }
        if (Meow_PredictPos < (1 << 27)) {
          return (Meow_PredictFastPos[Meow_PredictPos >> 16] + 32);
        }
        return (Meow_PredictFastPos[Meow_PredictPos >> 26] + 52);
      };
      var Meow_PredictState = Meow_Base.Meow_PredictStateInit();
      var Meow_PredictRepDist = new Int(Meow_Base.Meow_PredictNumRepDist);
      function Meow_BaseInit() {
        Meow_PredictState = Meow_Base.Meow_PredictStateInit();
        Meow_PrevByte = 0;
        for (var m = 0; m < Meow_Base.Meow_PredictNumRepDist; m++) {
          Meow_PredictRepDist[m] = 0;
        }
      }
      var Meow_DefDictLogSize = 22;
      var Meow_NumOfFastBytesDef = 0X20;
      function Meow_LitEncode() {
        function Meow_Encode2() {
          var Meow_Short;
          var Meow_mEncode = new Meow_Short(0X300);
          function Meow_Init() {
            Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_mEncode);
          }
          var Meow_Context = 1;
          for (m = 7; m >= 0; m--) {
            var Meow_Bit = ((Meow_Symbol >> m) & 1);
            Meow_Ranger.Meow_Encode(Meow_mEncode, Meow_Context, Meow_Bit);
            Meow_Context = (Meow_Context << 1) | Meow_Bit;
          }
        }
        var Meow_PredictMatchedEncode = function() {
          var Meow_Context = 1;
          var Meow_dup = true;
          for (m = 7; m >= 0; m--) {
            var Meow_Bit = ((Meow_Symbol >> m) & 1);
            var Meow_PredictState = Meow_Context;
            if (Meow_dup) {
              var Meow_PredictBitMatch = ((Meow_PredictByteMatch >> m) & 1);
              Meow_PredictState = ((1 + Meow_PredictBitMatch) << 8);
              Meow_dup = (Meow_PredictBitMatch == Meow_Bit);
            }
            Meow_Ranger.Meow_Encode(Meow_mEncode, Meow_PredictState, Meow_Bit);
            Meow_Context = (Meow_Context << 1) | Meow_Bit;
          }
        };
        var Meow_PredictVal = function() {
          var Meow_Val = 0;
          var Meow_Context = 1;
          var m = 7;
          if (Meow_PredictMatchMode) {
            for (; m >= 0; m--) {
              var Meow_PredictMatchBit = (Meow_PredictMatchByte >> m) & 1;
              Meow_Bit = (Meow_Symbol >> m) & 1;
              Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal(Meow_mEncode[((1 + Meow_Bit) << 8) + Meow_Context], Meow_Bit);
              Meow_Context = (Meow_Context << 1) | Meow_Bit;
              if (Meow_PredictBitMatch != Meow_Bit) {
                m--;
                break;
              }
            }
          }
          for (; m >= 0; m--) {
            Meow_Bit = (Meow_Symbol >> m) & 1;
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
      var Meow_PredictCreate = function(Meow_PredictNumPosBits, Meow_PredictNumPrevBits) {
        if (Meow_mCoders != null && Meow_PredictNumPrevBits == Meow_PredictNumPrevBits && Meow_PredictPosNumOfBits == Meow_PredictNumPosBits) {
          return;
        }
        Meow_PredictNumPosBits = Meow_PredictPosNumOfBits;
        Meow_PredictPosMask = (1 << Meow_PredictNumPosBits) - 1;
        Meow_PredictNumPrevBits = Meow_PredictNumPrevBits;
        var Meow_PredictNumStates = 1 << (Meow_PredictNumPrevBits + Meow_PredictPosNumOfBits);
        Meow_mCoders = new Meow_Encode2(Meow_PredictNumStates);
        for (m = 0; m < Meow_PredictNumStates; m++) {
          Meow_mCoders[m] = new Meow_Encode2();
        }
      };
      var Meow_PredictNumStates = 1 << (Meow_PredictNumPrevBits + Meow_PredictPosNumOfBits);
      for (m = 0; m < Meow_PredictNumStates; m++) {
        Meow_mCoders[m].Meow_Init();
      }
      var Meow_PredictSubCoder = function(Meow_PredictPos, Meow_PrevByte) {
        return Meow_mCoders[((Meow_PredictPos & Meow_PredictPosMask) << Meow_PredictNumPrevBits) + ((Meow_PrevByte & 0XFF) >>> (8 - Meow_PredictNumPrevBits))];
      };
    }
    function Meow_EncodeLen() {
      Meow_PredictChoice = new Meow_Short(2);
      Meow_LowCoder = new Meow_EncodeBitTree(Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax);
      Meow_MidCoder = new Meow_EncodeBitTree(Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax);
      Meow_HighCoder = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumOfHighLenBits);
      for (var Meow_PredictPosStates = 0; Meow_PredictPosStates < Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax; Meow_PredictPosStates++) {
        Meow_LowCoder[Meow_PredictPosStates] = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumOfLowLenBits);
        Meow_MidCoder[Meow_PredictPosStates] = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumOfMidLenBits);
      }
      for (Meow_PredictPosStates - 0; Meow_PredictPosStates < Meow_PredictNumStates; Meow_PredictPosStates++) {
        Meow_LowCoder[Meow_PredictPosStates].Meow_Init();
        Meow_MidCoder[Meow_PredictPosStates].Meow_Init();
      }
      Meow_HighCoder.Meow_Init();
      if (Meow_Symbol < Meow_Base.Meow_PredictNumOfLowLenSymbols) {
        Meow_Ranger.Meow_Encode(Meow_PredictChoice, 0, 0);
        Meow_LowCoder[Meow_PredictPosStates].Meow_Encode(Meow_Ranger, Meow_Symbol);
      } else {
        Meow_Symbol -= Meow_Base.Meow_PredictNumOfLowLenSymbols;
        Meow_Ranger.Meow_Encode(Meow_PredictChoice, 0, 1);
        if (Meow_Symbol < Meow_PredictNumOfMidLenSymbols) {
          Meow_Ranger.Meow_Encode(Meow_PredictChoice, 1, 0);
          Meow_MidCoder[Meow_PredictPosStates].Meow_Encode(Meow_Ranger, Meow_Symbol);
        } else {
          Meow_Ranger.Meow_Encode(Meow_PredictChoice, 1, 1);
          Meow_HighCoder.Meow_Encode(Meow_Ranger, Meow_Symbol - Meow_Base.Meow_PredictNumOfMidLenSymbols);
        }
      }
      var Meow_PredictSetVal = function(Meow_PredictPosStates, Meow_PredictNumSymbols, Meow_PredictVal, Meow_st) {
        var Meow_Def00 = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictChoice[0]);
        var Meow_Def01 = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictChoice[0]);
        var Meow_Def10 = Meow_Def01 + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictChoice[1]);
        var Meow_Def11 = Meow_Def01 + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictChoice[1]);
        m = 0;
        for (m = 0; m < Meow_Base.Meow_PredictNumOfLowLenSymbols; m++) {
          if (m >= Meow_PredictNumSymbols) {
            return;
          }
          Meow_Val[Meow_st + m] = Meow_Def00 + Meow_LowCoder[Meow_PredictPosStates].Meow_PredictVal(m);
        }
        for (; m < Meow_Base.Meow_PredictNumOfLowLenSymbols + Meow_Base.Meow_PredictNumOfMidLenSymbols; m++) {
          if (m >= Meow_PredictNumSymbols) {
            return;
          }
          Meow_Val[Meow_st + m] = Meow_Def10 + Meow_MidCoder[Meow_PredictPosStates].Meow_PredictVal(m - Meow_Base.Meow_PredictNumOfLowLenSymbols);
        }
        for (; m < Meow_Base.Meow_PredictNumSymbols; m++) {
          Meow_Val[Meow_st + m] = Meow_Def11 + Meow_HighCoder.Meow_PredictVal(m - Meow_Base.Meow_PredictNumOfLowLenSymbols - Meow_Base.Meow_PredictNumOfMidLenSymbols);
        }
      };
    }
    var Meow_PredictNumOfLenSymbolsSpec = Meow_Base.Meow_PredictNumOfLowLenSymbols + Meow_Base.Meow_PredictNumOfMidLenSymbols;
    var Meow_EncodeLenTableVal = function(Meow_EncodeLen) {
      Meow_Val = new Int(Meow_Base.Meow_PredictNumOfLenSymbols << Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax);
      var Meow_PredictTableSize;
      Meow_PredictCounters = new Int(Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax);
      function Meow_PredictSetTableSize() {
        Meow_PredictTableSize = Meow_PredictTableSize;
        return Meow_Val[Meow_PredictPosStates * Meow_Base.Meow_PredictNumOfLenSymbols + Meow_Symbol];
      }
      var Meow_UpdatePredictTable = function(Meow_PredictPosStates) {
        new Meow_PredictSetVal(Meow_PredictPosStates, Meow_PredictTableSize, Meow_Val, Meow_PredictPosStates * Meow_Base.Meow_PredictNumOfLenSymbols);
        Meow_PredictCounters = Meow_PredictTableSize;
      };
      var Meow_UpdatePredictTables = function(Meow_PredictPosNumStates) {
        for (Meow_PredictPosStates = 0; Meow_PredictPosStates < Meow_PredictPosNumStates; Meow_PredictPosStates++) {
          new Meow_UpdatePredictTable(Meow_PredictPosStates);
        }
      };
      Meow_SuperPower.Meow_Encode(Meow_Ranger, Meow_Symbol, Meow_PredictPosStates);
      if (--Meow_PredictCounters[Meow_PredictPosStates] === 0) {
        new Meow_UpdatePredictTable(Meow_PredictPosStates);
      }
    };
    var Meow_PredictNumOpts = 1 << 12;
    function Meow_Optimal() {
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
      function Meow_ConvertToChar() {
        Meow_PredictPrevBack = -1;
        Meow_PredictPrevChar = false;
      }
      function Meow_ConvertToShortRep() {
        Meow_PredictPrevBack = 0;
        Meow_PredictPrevChar = false;
      }
      function Meow_ShortRep() {
        return (Meow_PredictPrevBack === 0);
      }
    }
    Meow_Optimum = new Meow_Optimal(Meow_PredictNumOpts);
    Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree[Meow_PredictMatchFind] = null;
    Meow_Power.Meow_Compress.Meow_Range.Meow_Encode[Meow_Ranger] = new Meow_Power.Meow_Compress.Meow_Range.Meow_Encode();
    Meow_PredictMatch = new Meow_Short(Meow_Base.Meow_PredictNumStates << Meow_Base.Meow_PredictPosNumBitsStates_Max);
    Meow_PredictRep = new Meow_Short(Meow_Base.Meow_PredictNumStates);
    Meow_PredictRep0 = new Meow_Short(Meow_Base.Meow_PredictNumStates);
    Meow_PredictRep1 = new Meow_Short(Meow_Base.Meow_PredictNumStates);
    Meow_PredictRep2 = new Meow_Short(Meow_Base.Meow_PredictNumStates);
    Meow_PredictRepLong = new Meow_Short(Meow_Base.Meow_PredictNumStates << Meow_Base.Meow_PredictPosNumBitsStates_Max);
    Meow_EncodeSlotPos = new Meow_EncodeBitTree(Meow_Base.Meow_PredictPosNumStatesLen);
    Meow_EncodePos = new Meow_Short(Meow_Base.Meow_PredictOverallDist - Meow_Base.Meow_PredictFinishPosModelIndex);
    Meow_EncodeBitTree[Meow_EncodeAlignPos] = new Meow_EncodeBitTree(Meow_Base.Meow_PredictAlignNumOfBits);
    Meow_EncodeLenTableVal[Meow_EncodeLen] = new Meow_EncodeLenTableVal();
    Meow_EncodeLenTableVal[Meow_EncodeLenMatchRep] = new Meow_EncodeLenTableVal();
    Meow_LitEncode[Meow_LitEncode] = new Meow_LitEncode();
    Meow_PredictMatchDist = new Int(Meow_Base.Meow_PredictMaxMatchLen * 2 + 2);
    var Meow_PredictNumFastBytes = Meow_NumOfFastBytesDef;
    var Meow_PredictLongMatchLen;
    var Meow_PredictOverallDistPairs;
    var Meow_PredictOffsetAdd;
    var Meow_OptimumEndIndex;
    var Meow_OptimumCurrentIndex;
    var Meow_PredictLongMatchFound;
    Meow_PredictSlotPosVal = new Int(1 << (Meow_Base.Meow_PredictNumPosBits + Meow_Base.Meow_PredictPosNumBitsStatesLen));
    Meow_PredictDistVal = new Int(Meow_Base.Meow_PredictOverallDist << Meow_Base.Meow_PredictPosNumBitsStatesLen);
    Meow_PredictAlignVal = new Int(Meow_Base.Meow_PredictAlignTableSize);
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
    function Meow_PredictCreate() {
      if (Meow_PredictMatchFind == null) {
        Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree[tryy] = new Meow_Power.Meow_Compress.Meow_lzbmhm.Meow_GarbageTree();
        var Meow_NumHashBytes = 4;
        if (Meow_PredictMatchFindType0 == Meow_PredictMatchFindType) {
          Meow_NumHashBytes = 2;
          tryy.Meow_PredictTypeSet(Meow_NumHashBytes);
          Meow_PredictMatchFind = tryy;
        }
      }
      Meow_LitEncode.Meow_PredictCreate(Meow_PredictLitPosNumBitsStates, Meow_PredictLitNumContextBits);
      if (Meow_PredictDictSize == Meow_PredictDictSizePrev && Meow_PredictNumFastBytesPrev == Meow_PredictNumFastBytes) {
        return;
      }
      Meow_PredictMatchFind.Meow_PredictCreate(Meow_PredictDictSize, Meow_PredictNumOpts, Meow_PredictNumFastBytes, Meow_Base.Meow_PredictMaxMatchLen + 1);
      Meow_PredictDictSizePrev = Meow_PredictDictSize;
      Meow_PredictNumFastBytesPrev = Meow_PredictNumFastBytes;
    }
    for (m = 0; m < Meow_PredictNumOpts; m++) {
      Meow_Optimum[m] = new Meow_Optimal();
    }
    for (m = 0; m < Meow_Base.Meow_PredictPosNumStatesLen; m++) {
      Meow_EncodeSlotPos[m] = new Meow_EncodeBitTree(Meow_Base.Meow_PredictNumPosSlotBits);
    }
    function Meow_PredictWriteEndMarkMode(Meow_PredictWriteEndMark) {
      Meow_PredictWriteEndMark = Meow_PredictWriteEndMark;
    }
    function Meow_Init() {
      new Meow_BaseInit();
      Meow_Ranger.Meow_Init();
      Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictMatch);
      Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRepLong);
      Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRep);
      Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRep0);
      Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRep1);
      Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_PredictRep2);
      Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictBitModelsInit(Meow_EncodePos);
      Meow_LitEncode.Meow_Init();
      for (m = 0; m < Meow_Base.Meow_PredictPosNumStatesLen; m++) {
        Meow_EncodeSlotPos[m].Meow_Init();
      }
      Meow_LitEncode.Meow_Init(1 << Meow_PredictPosBitsState);
      Meow_EncodeLenMatchRep.Meow_Init(1 << Meow_PredictPosBitsState);
      Meow_EncodeAlignPos.Meow_Init();
      Meow_PredictLongMatchFound = false;
      Meow_OptimumEndIndex = 0;
      Meow_OptimumCurrentIndex = 0;
      Meow_PredictOffsetAdd = 0;
    }
    var Meow_ReadPredictedMatchDist = function() {
      var Meow_LenRes = 0;
      Meow_PredictMatchDist = Meow_PredictMatchFind.Meow_GetPredictedMatches(Meow_PredictMatchDist);
      if (Meow_PredictNumDistPairs > 0) {
        Meow_LenRes = Meow_PredictMatchDist[Meow_PredictNumDistPairs - 2];
        if (Meow_LenRes == Meow_PredictNumFastBytes) {
          Meow_LenRes += Meow_PredictMatchFind.Meow_PredictGetMatchLen((int)[Meow_LenRes - 1], Meow_PredictMatchDist[Meow_PredictNumDistPairs - 1], Meow_Base.Meow_PredictMaxMatchLen - Meow_LenRes);
        }
      }
      Meow_PredictOffsetAdd++;
      return Meow_LenRes;
    };
    var Meow_MovePos = function(Meow_Num) {
      if (Meow_Num > 0) {
        Meow_PredictMatchFind.Meow_Skip(Meow_Num);
        Meow_PredictOffsetAdd += Meow_Num;
      }
    };
    var Meow_FetchRepLenVal = function(Meow_PredictState, Meow_PredictPosStates) {
      return Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRep0[Meow_PredictState]) + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRepLong[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]);
    };
    var Meow_GetOriginalRepVal = function(Meow_RepIndex, Meow_PredictState, Meow_PredictPosStates) {
      if (Meow_RepIndex === 0) {
        Meow_Val = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRep0[Meow_PredictState]);
        Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRepLong[(Meow_PredictState < Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]);
      } else {
        Meow_Val = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep0[Meow_PredictPosStates]);
        if (Meow_RepIndex === 1) {
          Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRep1[Meow_PredictPosStates]);
        } else {
          Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep1[Meow_PredictPosStates]);
          Meow_Val += Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal(Meow_PredictRep2[Meow_PredictPosStates], Meow_RepIndex - 2);
        }
      }
      return Meow_Val;
    };
    var Meow_FetchRepVal = function(Meow_RepIndex, Meow_Len, Meow_PredictState, Meow_PredictPosStates) {
      var Meow_Val = Meow_EncodeLenMatchRep.Meow_PredictVal(Meow_Len - Meow_Base.Meow_PredictMinMatchLen, Meow_PredictPosStates);
      return Meow_Val + new Meow_GetOriginalRepVal(Meow_RepIndex, Meow_PredictState, Meow_PredictPosStates);
    };
    var Meow_FetchPosLenVal = function(Meow_PredictPos, Meow_Len, Meow_PredictPosStates) {
      var Meow_PredictPosStatesLen = Meow_Base.Meow_GetPredictPosStatesLen(Meow_Len);
      if (Meow_PredictPos < Meow_Base.Meow_PredictOverallDist) {
        Meow_Val = Meow_PredictDistVal[(Meow_PredictPosStatesLen * Meow_Base.Meow_PredictOverallDist) + Meow_PredictPos];
      } else {
        Meow_Val = Meow_PredictSlotPosVal[(Meow_PredictPosStatesLen << Meow_Base.Meow_PredictNumPosSlotBits) + new Meow_PredictSlotPos2(Meow_PredictPos)];
      }
      return Meow_Val + Meow_EncodeLen.Meow_PredictVal(Meow_Len - Meow_Base.Meow_PredictMinMatchLen, Meow_PredictPosStates);
    };
    var Meow_Backward = function(Meow_Cur) {
      Meow_OptimumEndIndex = Meow_Cur;
      var Meow_PosMem = Meow_Optimum[Meow_Cur].Meow_PredictPrevPos;
      var Meow_PosBackMem = Meow_Optimum[Meow_Cur].Meow_PredictPrevBack;
      do {
        if (Meow_Optimum[Meow_Cur].Meow_PredictPrevChar) {
          Meow_Optimum[Meow_PosMem].Meow_ConvertToChar();
          Meow_Optimum[Meow_PosMem].Meow_PredictPrevPos = Meow_PosMem - 1;
          if (Meow_Optimum[Meow_Cur].Meow_PredictPrevChar2) {
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
      } while (Meow_Cur > 0);
      var Meow_BackRes = Meow_Optimum[0].Meow_PredictPrevBack;
      Meow_OptimumCurrentIndex = Meow_Optimum[0].Meow_PredictPrevPos;
      return Meow_OptimumCurrentIndex;
    };
    var Meow_Reps = new Int(Meow_Base.Meow_PredictNumRepDist);
    var Meow_RepsLen = new Int(Meow_Base.Meow_PredictNumRepDist);
    var Meow_BackRes;
    var Meow_LenRes;
    var Meow_FetchOptimum = function(Meow_PredictPos) {
      if (Meow_OptimumEndIndex != Meow_OptimumCurrentIndex) {
        Meow_LenRes = Meow_Optimum[Meow_OptimumCurrentIndex].Meow_PredictPrevPos - Meow_OptimumCurrentIndex;
        Meow_BackRes = Meow_Optimum[Meow_OptimumCurrentIndex].Meow_PredictPrevBack;
        Meow_OptimumCurrentIndex = Meow_Optimum[Meow_OptimumCurrentIndex].Meow_PredictPrevPos;
        return Meow_LenRes;
      }
      Meow_OptimumCurrentIndex = Meow_OptimumEndIndex = 0;
      var Meow_LenMain,
          Meow_PredictNumDistPairs;
      if (!Meow_PredictLongMatchFound) {
        Meow_LenMain = new Meow_ReadPredictedMatchDist();
      } else {
        Meow_LenMain = Meow_PredictLongMatchLen;
        Meow_PredictLongMatchFound = false;
      }
      Meow_PredictNumDistPairs = Meow_PredictNumDistPairs;
      var Meow_NumAvailBytes = Meow_PredictMatchFind.Meow_FetchNumAvailBytes() + 1;
      if (Meow_NumAvailBytes < 2) {
        Meow_BackRes = -1;
        return 1;
      }
      if (Meow_NumAvailBytes > Meow_Base.Meow_PredictMaxMatchLen) {
        Meow_NumAvailBytes = Meow_Base.Meow_PredictMaxMatchLen;
      }
      var Meow_RepIndex_Max = 0;
      for (m = 0; m < Meow_Base.Meow_PredictNumRepDist; m++) {
        Meow_Reps[m] = Meow_PredictRepDist[m];
        Meow_RepsLen[m] = Meow_PredictMatchFind.Meow_PredictGetMatchLen(0 - 1, Meow_Reps[m], Meow_Base.Meow_PredictMaxMatchLen);
        if (Meow_RepsLen[m] > Meow_RepsLen[Meow_RepIndex_Max]) {
          Meow_RepIndex_Max = m;
        }
      }
      if (Meow_RepsLen[Meow_RepIndex_Max] >= Meow_PredictNumFastBytes) {
        Meow_BackRes = Meow_RepIndex_Max;
        Meow_LenRes = Meow_RepsLen[Meow_RepIndex_Max];
        new Meow_MovePos(Meow_LenRes - 1);
        return Meow_LenRes;
      }
      if (Meow_LenMain >= Meow_PredictNumFastBytes) {
        Meow_BackRes = Meow_PredictMatchDist[Meow_PredictNumDistPairs - 1] + Meow_Base.Meow_PredictNumRepDist;
        new Meow_MovePos(Meow_LenMain - 1);
        return Meow_LenMain;
      }
      var Meow_CurrentByte = Meow_PredictMatchFind.Meow_FetchIndexByte(0 - 1);
      var Meow_PredictMatchByte = Meow_PredictMatchFind.Meow_FetchIndexByte(0 - Meow_PredictRepDist[0] - 1 - 1);
      if (Meow_LenMain < 2 && Meow_CurrentByte != Meow_PredictMatchByte && Meow_RepsLen[Meow_RepIndex_Max] < 2) {
        Meow_BackRes = -1;
        return 1;
      }
      Meow_Optimum[0].Meow_PredictState = Meow_PredictState;
      Meow_PredictPosStates = (Meow_PredictPos & Meow_PredictPosStateMask);
      Meow_Optimum[1].Meow_PredictVal = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictMatch[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]) + Meow_LitEncode.Meow_PredictSubCoder(Meow_PredictPos, Meow_PrevByte).Meow_PredictVal(!Meow_Base.Meow_PredictStateIsChar(Meow_PredictState), Meow_PredictMatchByte, Meow_CurrentByte);
      Meow_Optimum[1].Meow_ConvertToChar();
      var Meow_PredictMatchVal = Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]);
      if (Meow_PredictMatchByte == Meow_CurrentByte) {
        Meow_ShortRepVal = Meow_MatchRepVal + new Meow_FetchRepLenVal(Meow_PredictState, Meow_PredictPosStates);
        if (Meow_ShortRepVal < Meow_Optimum[1].Meow_PredictVal) {
          Meow_Optimum[1].Meow_PredictVal = Meow_ShortRepVal;
          Meow_Optimum[1].Meow_ConvertToShortRep();
        }
      }
      var Meow_LenEnd = ((Meow_LenMain >= Meow_RepsLen[Meow_RepIndex_Max]) ? Meow_LenMain : Meow_RepsLen[Meow_RepIndex_Max]);
      if (Meow_LenEnd < 2) {
        Meow_BackRes = Meow_Optimum[1].Meow_PredictPrevBack;
        return 1;
      }
      Meow_Optimum[1].Meow_PredictPrevPos = 0;
      Meow_Optimum[0].Meow_PredictBk0 = Meow_Reps[0];
      Meow_Optimum[0].Meow_PredictBk1 = Meow_Reps[1];
      Meow_Optimum[0].Meow_PredictBk2 = Meow_Reps[2];
      Meow_Optimum[0].Meow_PredictBk3 = Meow_Reps[3];
      Meow_Len = Meow_LenEnd;
      do {
        Meow_Optimum[Meow_Len--].Meow_Val = Meow_PredictInfinityVal;
      } while (Meow_Len >= 2);
      for (m = 0; m < Meow_Base.Meow_PredictNumRepDist; m++) {
        var Meow_RepLen = Meow_RepsLen[m];
        if (Meow_RepLen < 2) {
          continue;
        }
        Meow_Val = Meow_MatchRepVal + new Meow_GetOriginalRepVal(m, Meow_PredictState, Meow_PredictPosStates);
        do {
          Meow_CurLenVal = Meow_Val + Meow_EncodeLenMatchRep.Meow_PredictVal(Meow_RepLen - 2, Meow_PredictPosStates);
          Meow_Optimal[Meow_Optimum] = Meow_Optimum[Meow_RepLen];
          if (Meow_CurLenVal < Meow_Optimum.Meow_Val) {
            Meow_Optimum.Meow_Val = Meow_CurLenVal;
            Meow_Optimum.Meow_PredictPrevPos = 0;
            Meow_Optimum.Meow_PredictPrevBack = m;
            Meow_Optimum.Meow_PredictPrevChar = false;
          }
        } while (--Meow_RepLen >= 2);
      }
      var Meow_MatchNormalVal = Meow_PredictMatchVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_Rep[Meow_PredictState]);
      Meow_Len = ((Meow_RepsLen[0] >= 2) ? Meow_RepsLen[0] + 1 : 2);
      if (Meow_Len <= Meow_LenMain) {
        Meow_PredictOffs = 0;
        while (Meow_Len > Meow_PredictMatchDist[Meow_PredictOffs]) {
          Meow_PredictOffs += 2;
        }
        for (; ; Meow_Len++) {
          var Meow_PredictDist = Meow_PredictMatchDist[Meow_PredictOffs + 1];
          Meow_CurLenVal = Meow_MatchNormalVal + new Meow_FetchPosLenVal(Meow_PredictDist, Meow_Len, Meow_PredictPosStates);
          Meow_Optimal[Meow_Optimum] = Meow_Optimum[Meow_Len];
          if (Meow_CurLenVal < Meow_Optimum.Meow_Val) {
            Meow_Optimum.Meow_Val = Meow_CurLenVal;
            Meow_Optimum.Meow_PredictPrevPos = 0;
            Meow_Optimum.Meow_PredictPrevBack = Meow_PredictDist + Meow_Base.Meow_PredictNumRepDist;
            Meow_Optimum.Meow_PredictPrevChar = false;
          }
          if (Meow_Len == Meow_PredictMatchDist[Meow_PredictOffs]) {
            Meow_PredictOffs += 2;
            if (Meow_PredictOffs == Meow_PredictNumDistPairs) {
              break;
            }
          }
        }
      }
      Meow_Cur = 0;
      while (true) {
        Meow_Cur++;
        if (Meow_Cur == Meow_LenEnd) {
          return new Meow_Backward(Meow_Cur);
        }
        var Meow_LenNew = new Meow_ReadPredictedMatchDist();
        Meow_PredictNumDistPairs = Meow_PredictNumDistPairs;
        if (Meow_LenNew >= Meow_PredictNumFastBytes) {
          Meow_PredictLongMatchLen = Meow_LenNew;
          Meow_PredictLongMatchFound = true;
          return new Meow_Backward(Meow_Cur);
        }
        Meow_PredictPos++;
        var Meow_PredictPrevPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevPos;
        var Meow_PredictState;
        if (Meow_Optimum[Meow_Cur].Meow_PredictPrevChar) {
          Meow_PredictPrevPos--;
          if (Meow_Optimum[Meow_Cur].Meow_PredictPrevChar2) {
            Meow_PredictState = Meow_Optimum[Meow_Optimum[Meow_Cur].Meow_PredictPrevPos2].Meow_PredictState;
            if (Meow_Optimum[Meow_Cur].Meow_PredictPrevBack2 < Meow_Base.Meow_PredictNumRepDist) {
              Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
            } else {
              Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
            }
          } else {
            Meow_PredictState = Meow_Optimum[Meow_PredictPrevPos].Meow_PredictState;
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
          }
        } else {
          Meow_PredictState = Meow_Optimum[Meow_PredictPrevPos].Meow_PredictState;
        }
        if (Meow_PredictPrevPos == Meow_Cur - 1) {
          if (Meow_Optimum[Meow_Cur].Meow_ShortRep()) {
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesShortRep(Meow_PredictState);
          } else {
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState);
          }
        } else {
          if (Meow_Optimum[Meow_Cur].Meow_PredictPrevChar && Meow_Optimum[Meow_Cur].Meow_PredictPrevChar2) {
            Meow_PredictPrevPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevPos2;
            Meow_PredictPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevBack2;
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
          } else {
            Meow_PredictPos = Meow_Optimum[Meow_Cur].Meow_PredictPrevBack;
            if (Meow_PredictPos < Meow_Base.Meow_PredictNumRepDist) {
              Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
            } else {
              Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
            }
          }
          Meow_Optimal[Meow_PredictOpt] = Meow_Optimum[Meow_PredictPrevPos];
          if (Meow_PredictPos < Meow_Base.Meow_PredictNumRepDist) {
            if (Meow_PredictPos === 0) {
              Meow_Reps[0] = Meow_PredictOpt.Meow_PredictBk0;
              Meow_Reps[1] = Meow_PredictOpt.Meow_PredictBk1;
              Meow_Reps[2] = Meow_PredictOpt.Meow_PredictBk2;
              Meow_Reps[3] = Meow_PredictOpt.Meow_PredictBk3;
            } else if (Meow_PredictPos == 1) {
              Meow_Reps[0] = Meow_PredictOpt.Meow_PredictBk1;
              Meow_Reps[1] = Meow_PredictOpt.Meow_PredictBk0;
              Meow_Reps[2] = Meow_PredictOpt.Meow_PredictBk2;
              Meow_Reps[3] = Meow_PredictOpt.Meow_PredictBk3;
            } else if (Meow_PredictPos == 2) {
              Meow_Reps[0] = Meow_PredictOpt.Meow_PredictBk2;
              Meow_Reps[1] = Meow_PredictOpt.Meow_PredictBk0;
              Meow_Reps[2] = Meow_PredictOpt.Meow_PredictBk1;
              Meow_Reps[3] = Meow_PredictOpt.Meow_PredictBk3;
            }
          } else {
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
        Meow_Optimal[Meow_NextOptimum] = Meow_Optimum[Meow_Cur + 1];
        var Meow_PredictNextChar = false;
        if (Meow_CurLenVal < Meow_NextOptimum.Meow_Val) {
          Meow_NextOptimum.Meow_Val = Meow_CurLenVal;
          Meow_NextOptimum.Meow_PredictPrevPos = Meow_Cur;
          Meow_NextOptimum.Meow_ConvertToChar();
          Meow_PredictNextChar = true;
        }
        Meow_PredictMatchVal = Meow_CurVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates]);
        Meow_MatchRepVal = Meow_PredictMatchVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep[Meow_PredictState]);
        if (Meow_PredictMatchByte == Meow_CurrentByte && !(Meow_NextOptimum.Meow_PredictPrevPos < Meow_Cur && Meow_NextOptimum.Meow_PredictPrevBack === 0)) {
          Meow_ShortRepVal = Meow_MatchRepVal + new Meow_FetchRepLenVal(Meow_PredictState, Meow_PredictPosStates);
          if (Meow_ShortRepVal <= Meow_NextOptimum.Meow_Val) {
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
        if (Meow_NumAvailBytes < 2) {
          continue;
        }
        if (Meow_NumAvailBytes > Meow_PredictNumFastBytes) {
          Meow_NumAvailBytes = Meow_PredictNumFastBytes;
        }
        if (!Meow_PredictNextChar && Meow_PredictMatchByte != Meow_CurrentByte) {
          Meow_Def5 = Math.Meow_Min(Meow_NumAvailBytesFull - 1, Meow_PredictNumFastBytes);
          Meow_LenTest = Meow_PredictMatchFind.Meow_PredictGetMatchLen(0, Meow_Reps[0], Meow_Def5);
          if (Meow_LenTest >= 2) {
            Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState);
            Meow_PredictPosStatesNext = (Meow_PredictPos + 1) & Meow_PredictPosStateMask;
            Meow_MatchRepValNext = Meow_CurLenVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]) + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep[Meow_PredictState2]);
            Meow_Offset = Meow_Cur + 1 + Meow_LenTest;
            while (Meow_LenEnd < Meow_Offset)
              Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
            Meow_CurLenVal = Meow_MatchRepValNext + new Meow_FetchRepVal(0, Meow_LenTest, Meow_PredictState2, Meow_PredictPosStatesNext);
            Meow_Optimal[Meow_Optimum] = Meow_Optimum[Meow_Offset];
            if (Meow_CurLenVal < Meow_Optimum.Meow_Val) {
              Meow_Optimum.Meow_Val = Meow_CurLenVal;
              Meow_Optimum.Meow_PredictPrevPos = Meow_Cur + 1;
              Meow_Optimum.Meow_PredictPrevBack = 0;
              Meow_Optimum.Meow_PredictPrevChar = true;
              Meow_Optimum.Meow_PredictPrevChar2 = false;
            }
          }
        }
        var Meow_LenStart = 2;
        for (var Meow_RepIndex = 0; Meow_RepIndex < Meow_Base.Meow_PredictNumRepDist; Meow_RepIndex++) {
          Meow_LenTest2 = Meow_PredictMatchFind.Meow_PredictGetMatchLen(0 - 1, Meow_Reps[Meow_RepIndex], Meow_NumAvailBytes);
          if (Meow_LenTest2 < 2) {
            continue;
          }
          var Meow_LenTestTemp = Meow_LenTest2;
          do {
            while (Meow_LenEnd < Meow_Cur + Meow_LenTest2)
              Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
            Meow_CurLenVal = Meow_MatchRepVal.Meow_FetchRepVal(Meow_RepIndex, Meow_LenTest2, Meow_PredictState, Meow_PredictPosStates);
            Meow_Optimal[Meow_Optimum] = Meow_Optimum[Meow_Cur + Meow_LenTest2];
            if (Meow_CurLenVal < Meow_Optimum.Meow_Val) {
              Meow_Optimum.Meow_Val = Meow_CurLenVal;
              Meow_Optimum.Meow_PredictPrevPos = Meow_Cur;
              Meow_Optimum.Meow_PredictPrevBack = Meow_RepIndex;
              Meow_Optimum.Meow_PredictPrevChar = false;
            }
          } while (--Meow_LenTest2 >= 2);
          Meow_LenTest2 = Meow_LenTestTemp;
          if (Meow_RepIndex === 0) {
            Meow_LenStart = Meow_LenTest2 + 1;
          }
          if (Meow_LenTest2 < Meow_NumAvailBytesFull) {
            Meow_Def5 = Math.Meow_Min(Meow_NumAvailBytesFull - 1 - Meow_LenTest2, Meow_PredictNumFastBytes);
            Meow_LenTest = Meow_PredictMatchFind.Meow_PredictGetMatchLen(Meow_LenTest2, Meow_Reps[Meow_RepIndex], Meow_Def5);
            if (Meow_LenTest >= 2) {
              Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
              Meow_PredictPosStatesNext = (Meow_PredictPos + Meow_LenTest2) & Meow_PredictPosStateMask;
              Meow_CurLenValChar = Meow_MatchRepVal + new Meow_FetchRepVal(Meow_RepIndex, Meow_LenTest2, Meow_PredictState, Meow_PredictPosStates) + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]) + Meow_LitEncode.Meow_PredictSubCoder(Meow_PredictPos + Meow_LenTest2, Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - 1 - 1)).Meow_PredictVal(true, Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - 1 - (Meow_Reps[Meow_RepIndex] + 1)), Meow_PredictMatchFind.Meow_FetchNumAvailBytes(Meow_LenTest2 - 1));
              Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState2);
              Meow_PredictPosStatesNext = (Meow_PredictPos + Meow_LenTest2 + 1) & Meow_PredictPosStateMask;
              Meow_PredictMatchValNext = Meow_CurLenValChar + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]);
              Meow_MatchRepValNext = Meow_PredictMatchValNext + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep[Meow_PredictState2]);
              Meow_Offset = Meow_LenTest2 + 1 + Meow_LenTest;
              while (Meow_LenEnd < Meow_Cur + Meow_Offset)
                Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
              Meow_CurLenVal = Meow_MatchRepValNext + new Meow_FetchRepVal(0, Meow_LenTest, Meow_PredictState2, Meow_PredictPosStatesNext);
              Meow_Optimal[Meow_Optimum] = Meow_Optimum[Meow_Cur + Meow_Offset];
              if (Meow_CurLenVal < Meow_Optimum.Meow_Val) {
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
        if (Meow_LenNew > Meow_NumAvailBytes) {
          Meow_LenNew = Meow_NumAvailBytes;
          for (Meow_PredictNumDistPairs = 0; Meow_LenNew > Meow_PredictMatchDist[Meow_PredictNumDistPairs]; Meow_PredictNumDistPairs += 2) {
            Meow_PredictMatchDist[Meow_PredictNumDistPairs] = Meow_LenNew;
            Meow_PredictNumDistPairs += 2;
          }
        }
        if (Meow_LenNew >= Meow_LenStart) {
          Meow_MatchNormalVal = Meow_PredictMatchVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictRep[Meow_PredictState]);
          while (Meow_LenEnd < Meow_Cur + Meow_LenNew)
            Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
          Meow_PredictOffs = 0;
          while (Meow_LenStart > Meow_PredictMatchDist[Meow_PredictOffs])
            Meow_PredictOffs += 2;
          for (Meow_LenTest2 = Meow_LenStart; Meow_LenTest2++; ) {
            var Meow_BackCur = Meow_PredictMatchDist[Meow_PredictOffs + 1];
            Meow_CurLenVal = Meow_MatchNormalVal + new Meow_FetchPosLenVal(Meow_BackCur, Meow_LenTest2, Meow_PredictPosStates);
            Meow_Optimal[Meow_Optimum] = Meow_Optimum[Meow_Cur + Meow_LenTest2];
            if (Meow_CurLenVal < Meow_Optimum.Meow_Val) {
              Meow_Optimum.Meow_Val = Meow_CurLenVal;
              Meow_Optimum.Meow_PredictPrevPos = Meow_Cur;
              Meow_Optimum.Meow_PredictPrevBack = Meow_BackCur + Meow_Base.Meow_PredictNumRepDist;
              Meow_Optimum.Meow_PredictPrevChar = false;
            }
            if (Meow_LenTest2 == Meow_PredictMatchDist[Meow_PredictOffs]) {
              if (Meow_LenTest2 < Meow_NumAvailBytesFull) {
                Meow_Def5 = Math.Meow_Min(Meow_NumAvailBytesFull - 1 - Meow_LenTest2, Meow_PredictNumFastBytes);
                Meow_LenTest = Meow_PredictMatchFind.Meow_PredictGetMatchLen(Meow_LenTest2, Meow_BackCur, Meow_Def5);
                if (Meow_LenTest >= 2) {
                  Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictMatch);
                  Meow_PredictPosStatesNext = (Meow_PredictPos + Meow_LenTest2) & Meow_PredictPosStateMask;
                  Meow_CurLenValChar = Meow_CurLenVal + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal0(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]) + Meow_LitEncode.Meow_PredictSubCoder(Meow_PredictPos + Meow_LenTest2, Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - 1 - 1)).Meow_PredictVal(true, Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - (Meow_BackCur + 1) - 1), Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_LenTest2 - 1));
                  Meow_PredictState2 = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState2);
                  Meow_PredictPosStatesNext = (Meow_PredictPos + Meow_LenTest2 + 1) & Meow_PredictPosStateMask;
                  Meow_PredictMatchValNext = Meow_CurLenValChar + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictMatch[(Meow_PredictState2 << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStatesNext]);
                  Meow_MatchRepValNext = Meow_PredictMatchValNext + Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictVal1(Meow_PredictRep[Meow_PredictState2]);
                  Meow_Offset = Meow_LenTest2 + 1 + Meow_LenTest;
                  while (Meow_LenEnd < Meow_Cur + Meow_Offset)
                    Meow_Optimum[++Meow_LenEnd].Meow_Val = Meow_PredictInfinityVal;
                  Meow_CurLenVal = Meow_MatchRepValNext + new Meow_FetchRepVal(0, Meow_LenTest, Meow_PredictState2, Meow_PredictPosStatesNext);
                  Meow_Optimum = Meow_Optimum[Meow_Cur + Meow_Offset];
                  if (Meow_CurLenVal < Meow_Optimum.Meow_Val) {
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
              if (Meow_PredictOffs == Meow_PredictNumDistPairs) {
                break;
              }
            }
          }
        }
      }
    };
    function Meow_ChangePairs(Meow_SmallDist, Meow_BigDist) {
      var Meow_Dif = 7;
      return (Meow_SmallDist < (1 << (32 - Meow_Dif)) && Meow_BigDist >= (Meow_SmallDist << Meow_Dif));
    }
    function Meow_PredictWriteEndMark(Meow_PredictPosStates) {
      if (!Meow_PredictWriteEndMark) {
        return;
      }
      Meow_Ranger.Meow_Encode(Meow_PredictMatch, (Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates, 1);
      Meow_Ranger.Meow_Encode(Meow_PredictRep, Meow_PredictState, 0);
      Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
      Meow_Len = Meow_Base.Meow_PredictMinMatchLen;
      Meow_EncodeLen.Meow_Encode(Meow_Ranger, Meow_Len - Meow_Base.Meow_PredictMinMatchLen, Meow_PredictPosStates);
      Meow_PredictSlotPos = (1 << Meow_Base.Meow_PredictNumPosSlotBits) - 1;
      Meow_PredictPosStatesLen = Meow_Base.Meow_GetPredictPosStatesLen(Meow_Len);
      Meow_EncodeSlotPos[Meow_PredictSlotPosLenState].Meow_Encode(Meow_Ranger, Meow_PredictSlotPos);
      var Meow_PredictBitsFooter = 30;
      var Meow_PredictPosReduced = (1 << Meow_PredictBitsFooter) - 1;
      Meow_Ranger.Meow_EncodeBitsDirect(Meow_PredictPosReduced >> Meow_Base.Meow_PredictAlignNumOfBits, Meow_PredictBitsFooter - Meow_Base.Meow_PredictAlignNumOfBits);
      Meow_EncodeAlignPos.Meow_EncodeReverse(Meow_Ranger, Meow_PredictPosReduced & Meow_Base.Meow_PredictAlignMask);
    }
    var Meow_Flush = function(Meow_PosNow) {
      new Meow_ReleaseMFSStream();
      new Meow_PredictWriteEndMark(Meow_PosNow & Meow_PredictPosStateMask);
      Meow_Ranger.Meow_FlushData();
      Meow_Ranger.Meow_FlushStream();
    };
    var Meow_CodeBlock = function() {
      Meow_InSize[0] = 0;
      Meow_OutSize[0] = 0;
      Meow_PredictEnd[0] = true;
      if (Meow_InStream !== null) {
        Meow_PredictMatchFind.Meow_SetStream(Meow_InStream);
        Meow_PredictMatchFind.Meow_Init();
        Meow_ReleaseMFSStream = true;
        Meow_InStream = null;
      }
      if (Meow_PredictEnd) {
        return;
      }
      Meow_PredictEnd = true;
      Meow_PredictPrevPosValPerf = Meow_PosNow64;
      if (Meow_PosNow64 === 0) {
        if (Meow_PredictMatchFind.Meow_FetchNumAvailBytes() === 0) {
          new Meow_Flush((int)[Meow_PosNow64]);
          return;
        }
        new Meow_ReadPredictedMatchDist();
        Meow_PredictPosStates = (int)(Meow_PosNow64) & Meow_PredictPosStateMask;
        Meow_Ranger.Meow_Encode(Meow_PredictMatch, (Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates, 0);
        Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState);
        byte[Meow_CurByte] = Meow_PredictMatchFind.Meow_FetchIndexByte(0 - Meow_PredictOffsetAdd);
        Meow_LitEncode.Meow_PredictSubCoder = ((int)(Meow_PosNow64), Meow_PrevByte).Meow_Encode(Meow_Ranger, Meow_CurByte);
        Meow_PrevByte = Meow_CurByte;
        Meow_PredictOffsetAdd--;
        Meow_PosNow64++;
      }
      if (Meow_PredictMatchFind.Meow_FetchNumAvailBytes() === 0) {
        new Meow_Flush((int)[Meow_PosNow64]);
        return;
      }
      while (true) {
        Meow_Len = new Meow_FetchOptimum((int)[Meow_PosNow64]);
        Meow_PredictPos = Meow_BackRes;
        Meow_PredictPosStates = ((int)[Meow_PosNow64]) & Meow_PredictPosStateMask;
        var Meow_PredictComplexState = (Meow_PredictState << Meow_Base.Meow_PredictPosNumBitsStates_Max) + Meow_PredictPosStates;
        if (Meow_Len == 1 && Meow_PredictPos == -1) {
          Meow_Ranger.Meow_Encode(Meow_PredictMatch, Meow_PredictComplexState, 0);
          byte[Meow_CurByte] = Meow_PredictMatchByte.Meow_FetchIndexByte((int)(0 - Meow_PredictOffsetAdd));
          Meow_LitEncode.Meow_Encode2[Meow_PredictSubCoder] = Meow_LitEncode.Meow_FetchSubCoder((int)[Meow_PosNow64], Meow_PrevByte);
          if (!Meow_Base.Meow_PredictStateIsChar(Meow_PredictState)) {
            byte[Meow_PredictMatchByte] = Meow_PredictMatchFind.Meow_FetchIndexByte((int)(0 - Meow_PredictRepDist[0] - 1 - Meow_PredictOffsetAdd));
            Meow_PredictSubCoder.Meow_EncodedMatches(Meow_Ranger, Meow_PredictMatchByte, Meow_CurByte);
          } else {
            Meow_PredictSubCoder.Meow_Encode(Meow_Ranger, Meow_CurByte);
            Meow_PrevByte = Meow_CurByte;
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesChar(Meow_PredictState);
          }
        } else {
          Meow_Ranger.Meow_Encode(Meow_PredictMatch, Meow_PredictComplexState, 1);
          if (Meow_PredictPos < Meow_Base.Meow_PredictNumRepDist) {
            Meow_Ranger.Meow_Encode(Meow_PredictRep, Meow_PredictState, 1);
            if (Meow_PredictPos === 0) {
              Meow_Ranger.Meow_Encode(Meow_PredictRep0, Meow_PredictState, 0);
              if (Meow_Len == 1) {
                Meow_Ranger.Meow_Encode(Meow_PredictRepLong, Meow_PredictComplexState, 0);
              } else {
                Meow_Ranger.Meow_Encode(Meow_PredictRepLong, Meow_PredictComplexState, 1);
              }
            } else {
              Meow_Ranger.Meow_Encode(Meow_PredictRep0, Meow_PredictState, 1);
              if (Meow_PredictPos == 1) {
                Meow_Ranger.Meow_Encode(Meow_PredictRep1, Meow_PredictState, 0);
              } else {
                Meow_Ranger.Meow_Encode(Meow_PredictRep1, Meow_PredictState, 1);
                Meow_Ranger.Meow_Encode(Meow_PredictRep2, Meow_PredictState, Meow_PredictPos - 2);
              }
            }
            if (Meow_Len == 1) {
              Meow_PredictState = new Meow_UpdatePredictStatesShortRep(Meow_PredictState);
            } else {
              Meow_EncodeLenMatchRep.Meow_Encode(Meow_Ranger, Meow_Len - Meow_Base.Meow_PredictMinMatchLen, Meow_PredictPosStates);
              Meow_PredictState = Meow_Base.Meow_UpdatePredictStatesRep(Meow_PredictState);
            }
            Meow_PredictDist = Meow_PredictRepDist[Meow_PredictPos];
            if (Meow_PredictPos !== 0) {
              for (m = Meow_PredictPos; m >= 1; m++) {
                Meow_PredictRepDist[m] = Meow_PredictRepDist[m - 1];
                Meow_PredictRepDist[0] = Meow_PredictDist;
              }
            }
          } else {
            Meow_Ranger.Meow_Encode(Meow_PredictRep, Meow_PredictState, 0);
            Meow_PredictState = Meow_Base.Meow_UpdatePredictStateMatches(Meow_PredictState);
            Meow_EncodeLen.Meow_Encode(Meow_Ranger, Meow_Len - Meow_PredictMinMatchLen, Meow_PredictPosStates);
            Meow_PredictPos -= Meow_Base.Meow_PredictNumRepDist;
            Meow_PredictSlotPos = new Meow_FetchSlotPos(Meow_PredictPos);
            Meow_PredictPosStatesLen = Meow_Base.Meow_GetPredictPosStatesLen(Meow_Len);
            Meow_EncodeSlotPos[Meow_PredictPosStatesLen].Meow_Encode(Meow_Ranger, Meow_PredictSlotPos);
            if (Meow_PredictSlotPos >= Meow_Base.Meow_PredictBeginPosModelIndex) {
              Meow_PredictBitsFooter = (int)((Meow_PredictSlotPos >> 1) - 1);
              var Meow_BaseVal = ((2 | (Meow_PredictSlotPos & 1)) << Meow_PredictBitsFooter);
              Meow_PredictPosReduced = Meow_PredictPos - Meow_BaseVal;
              if (Meow_PredictSlotPos < Meow_Base.Meow_PredictFinishPosModelIndex) {
                Meow_EncodeBitTree.Meow_EncodeReverse(Meow_EncodePos, Meow_BaseVal - Meow_PredictSlotPos - 1, Meow_Ranger, Meow_PredictBitsFooter, Meow_PredictPosReduced);
              } else {
                Meow_Ranger.Meow_EncodeBitsDirect(Meow_PredictPosReduced >> Meow_Base.Meow_PredictAlignNumOfBits, Meow_PredictBitsFooter - Meow_Base.Meow_PredictAlignNumOfBits);
                Meow_EncodeAlignPos.Meow_EncodeReverse(Meow_Ranger, Meow_PredictPosReduced & Meow_Base.Meow_PredictAlignMask);
                Meow_PredictAlignValCount++;
              }
            }
            Meow_PredictDist = Meow_PredictPos;
            for (m = Meow_Base.Meow_PredictNumRepDist - 1; m >= 1; m--) {
              Meow_PredictRepDist[m] = Meow_PredictRepDist[m - 1];
              Meow_PredictRepDist[0] = Meow_PredictDist;
              Meow_PredictMatchValCount++;
            }
          }
          Meow_PrevByte = Meow_PredictMatchFind.Meow_FetchIndexByte(Meow_Len - 1 - Meow_PredictOffsetAdd);
        }
        Meow_PredictOffsetAdd -= Meow_Len;
        Meow_PosNow64 += Meow_Len;
        if (Meow_PredictOffsetAdd === 0) {
          if (Meow_PredictMatchValCount >= (1 << 7)) {
            new Meow_PredictDistValAutoFill();
          }
          if (Meow_PredictAlignValCount >= Meow_Base.Meow_PredictAlignTableSize) {
            new Meow_PredictAlignValAutoFill();
          }
          Meow_InSize[0] = Meow_PosNow64;
          Meow_OutSize[0] = Meow_Ranger.FetchProcessedSize();
          if (Meow_PredictMatchFind.Meow_FetchNumAvailBytes() === 0) {
            new Meow_Flush((int)[Meow_PosNow64]);
            return;
          }
          if (Meow_PosNow64 - Meow_PredictPrevPosValPerf >= (1 << 12)) {
            Meow_PredictEnd = false;
            Meow_PredictEnd[0] = false;
            return;
          }
        }
      }
    };
    function Meow_ReleaseMFSStream() {
      if (Meow_PredictMatchFind != null && Meow_IncludeReleaseMFSStream) {
        Meow_PredictMatchFind.Meow_ReleaseMFSStream();
        Meow_IncludeReleaseMFSStream = false;
      }
    }
    var Meow_SetOutStream = function() {
      Meow_Ranger.Meow_SetStream(Meow_OutStream);
    };
    var Meow_ReleaseOutStream = function() {
      Meow_Ranger.Meow_ReleaseStream();
    };
    function Meow_ReleaseStreams() {
      new Meow_ReleaseMFSStream();
      new Meow_ReleaseOutStream();
    }
    var Meow_SetStreams = function(Meow_InStream, Meow_OutStream, Meow_InSize, Meow_OutSize) {
      Meow_InStream = Meow_InStream;
      Meow_PredictEnd = false;
      new Meow_PredictCreate();
      new Meow_SetOutStream(Meow_OutStream);
      new Meow_Init();
      if (!Meow_FastPerfMode) {
        new Meow_PredictDistValAutoFill();
        new Meow_PredictAlignValAutoFill();
      }
      Meow_EncodeLen.Meow_PredictSetTableSize(Meow_PredictNumFastBytes + 1 - Meow_Base.Meow_PredictMinMatchLen);
      Meow_EncodeLen.Meow_UpdatePredictTables(1 << Meow_PredictPosBitsState);
      Meow_EncodeLenMatchRep.Meow_PredictSetTableSize(Meow_PredictNumFastBytes + 1 - Meow_Base.Meow_PredictMinMatchLen);
      Meow_EncodeLenMatchRep.Meow_UpdatePredictTables(1 << Meow_PredictPosBitsState);
      Meow_PosNow64 = 0;
    };
    var Meow_Code = function() {
      Meow_IncludeReleaseMFSStream = false;
      try {
        new Meow_SetStream(Meow_InStream, Meow_OutStream, Meow_InSize, Meow_OutSize);
        while (true) {
          new Meow_CodeBlock(Meow_InProcessedSize, Meow_OutProcessedSize, Meow_PredictEnd);
          if (Meow_PredictEnd[0]) {
            return;
          }
          if (Meow_Perf != null) {
            Meow_Perf.Meow_SetPerf(Meow_InProcessedSize[0], Meow_OutProcessedSize[0]);
          }
        }
      } finally {
        new Meow_ReleaseStreams();
      }
    };
    var Meow_PropSize = 5;
    byte[Meow_Prop] = new Meow_Byte(Meow_PropSize);
    var MeowCodeWriteProp = function(Meow_OutStream) {
      Meow_Prop[0] = (byte)((Meow_PredictPosBitsState * 5 + Meow_PredictLitPosStateBits) * 9 + Meow_PredictLitNumContextBits);
      for (m = 0; m < 4; m++) {
        Meow_Prop[1 + m] = (byte)(Meow_PredictDictSize >> (8 * m));
        Meow_OutStream.Meow_Write(Meow_Prop, 0, Meow_PropSize);
      }
    };
    int[Meow_TempVal] = new Int(Meow_Base.Meow_PredictOverallDist);
    Meow_PredictMatchValCount++;
    function Meow_PredictDistValAutoFill() {
      for (m = Meow_Base.Meow_PredictBeginPosModelIndex; m < Meow_PredictOverallDist; m++) {
        Meow_PredictSlotPos = new Meow_FetchSlotPos(m);
        Meow_PredictBitsFooter = (int)[(Meow_PredictSlotPos >> 1) - 1];
        Meow_BaseVal = ((2 | (Meow_PredictSlotPos & 1)) << Meow_PredictBitsFooter);
        Meow_TempVal[m] = Meow_EncodeBitTree.Meow_FetchValReverse(Meow_EncodePos, Meow_BaseVal - Meow_PredictSlotPos - 1, Meow_PredictBitsFooter, m - Meow_BaseVal);
      }
      for (Meow_PredictPosStatesLen = 0; Meow_PredictPosStatesLen < Meow_Base.Meow_PredictPosNumStatesLen; Meow_PredictPosStatesLen++) {
        Meow_EncodeBitTree[Meow_Encode] = Meow_EncodeSlotPos[Meow_PredictPosStatesLen];
        Meow_st = (Meow_PredictPosStatesLen << Meow_Base.Meow_PredictNumPosSlotBits);
        for (Meow_PredictSlotPos = 0; Meow_PredictSlotPos < Meow_PredictTableSizeDist; Meow_PredictSlotPos++) {
          Meow_PredictSlotPosVal[Meow_st + Meow_PredictSlotPos] = Meow_Encode.Meow_PredictVal(Meow_PredictSlotPos);
        }
        for (Meow_PredictSlotPos = Meow_Base.Meow_PredictFinishPosModelIndex; Meow_PredictSlotPos < Meow_PredictTableSizeDist; Meow_PredictSlotPos++) {
          Meow_PredictSlotPosVal[Meow_st + Meow_PredictSlotPos] += ((((Meow_PredictSlotPos >> 1) - 1) - Meow_Base.Meow_PredictAlignNumOfBits) << Meow_Power.Meow_Compress.Meow_Range.Meow_Encode.Meow_PredictShiftNumBitsVal);
        }
        Meow_st2 = Meow_PredictPosStatesLen * Meow_Base.Meow_PredictOverallDist;
        for (m = 0; m < Meow_PredictBeginPosModelIndex; m++) {
          Meow_PredictDistVal[Meow_st2 + m] = Meow_PredictSlotPosVal[Meow_st + m];
        }
        for (; m < Meow_Base.Meow_PredictOverallDist; m++) {
          Meow_PredictDistVal[Meow_st2 + m] = Meow_PredictSlotPosVal[Meow_st + new Meow_FetchSlotPos(m)] + Meow_TempVal[m];
        }
      }
      Meow_PredictMatchValCount = 0;
    }
    function Meow_PredictAlignValAutoFill() {
      for (m = 0; m < Meow_Base.Meow_PredictAlignTableSize; m++) {
        Meow_PredictAlignVal[m] = Meow_EncodeAlignPos.Meow_FetchValReverse(m);
        Meow_PredictAlignValCount = 0;
      }
    }
    var Meow_SetAlgm = function(Meow_Algm) {
      Meow_FastPerfMode = (Meow_Algm === 0);
      Meow_MaxPerfMode = (Meow_Algm >= 2);
      return true;
    };
    var Meow_SetDictSize = function(Meow_PredictDictSize) {
      var Meow_DictLogSizeCompress_Max = 29;
      if (Meow_PredictDictSize < (1 << Meow_Base.Meow_PredictMinLogSize) || Meow_PredictDictSize > (1 << Meow_DictLogSizeCompress_Max)) {
        return false;
      }
      Meow_PredictDictSize = Meow_PredictDictSize;
      for (Meow_DictLogSize = 0; Meow_PredictDictSize > (1 << Meow_DictLogSize); Meow_DictLogSize++) {
        Meow_PredictTableSizeDist = Meow_DictLogSize * 2;
        return true;
      }
    };
    var Meow_PredictSetNumFastBytes = function(Meow_PredictNumFastBytes) {
      if (Meow_PredictNumFastBytes < 5 || Meow_PredictNumFastBytes > Meow_Base.Meow_PredictMaxMatchLen) {
        return false;
      } else {
        return true;
      }
    };
    var Meow_PredictSetMatchFind = function(Meow_PredictMatchFindIndex) {
      if (Meow_PredictMatchFindIndex < 0 || Meow_PredictMatchFindIndex > 2) {
        return false;
      }
      var Meow_PredictMatchFindIndexPrev = Meow_PredictMatchFindType;
      Meow_PredictMatchFindType = Meow_PredictMatchFindIndex;
      if (Meow_PredictMatchFind != null && Meow_PredictMatchFindIndexPrev != Meow_PredictMatchFindType) {
        Meow_PredictDictSizePrev = -1;
        Meow_PredictMatchFind = null;
      }
      return true;
    };
    var Meow_SetNumLcbLpbPb = function(Meow_SetNumLcb, Meow_SetNumLpb, Meow_SetNumPb) {
      if ((Meow_SetNumLpb < 0 || Meow_SetNumLpb > Meow_Base.Meow_PredictLitPosNumBitsStates_EncodeMax) || (Meow_SetNumLcb < 0 || Meow_SetNumLcb > Meow_Base.Meow_PredictLitNumContextBits_Max) || (Meow_SetNumPb < 0 || Meow_SetNumPb > Meow_Base.Meow_PredictPosNumBitsStates_EncodeMax)) {
        return false;
      }
      Meow_PredictLitPosStateBits = Meow_SetNumLpb;
      Meow_PredictLitNumContextBits = Meow_SetNumLcb;
      Meow_PredictPosBitsState = Meow_SetNumPb;
      Meow_PredictPosStateMask = ((1) << Meow_PredictPosBitsState) - 1;
      return true;
    };
    var Meow_PredictSetEndMarkMode = function(Meow_PredictEndMarkMode) {
      Meow_PredictWriteEndMark = Meow_PredictEndMarkMode;
    };
    function MeowBinary() {
      function Meow_Compress(Meow_Storage) {
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
      }
      function Meow_Decompress(Meow_Integer) {
        Meow_Output = [];
        var Meow_Flag = 0;
        Meow_PredictVal = false;
        m = 0;
        while (true) {
          Meow_Flag = Meow_Integer % 2;
          if (Meow_Flag == 1) {
            Meow_PredictVal = true;
          } else {
            Meow_PredictVal = false;
          }
          Meow_Output[m] = Meow_PredictVal;
          Meow_Integer -= Meow_Flag;
          Meow_Integer /= 2;
          m++;
          if (Meow_Integer == 1) {
            Meow_Output[m] = true;
          } else if (Meow_Integer < 1) {
            return Meow_Output;
          }
        }
      }
    }
    function MeowImagePlay() {
      Meow_CouleurFormat_Grey = 'G';
      Meow_CouleurFormat_Alpha = 'A';
      Meow_CouleurFormat_RGB = 'RGB';
      Meow_CouleurFormat_RGBA = 'RGBA';
      Meow_CouleurPalette = 'P';
      Meow_CouleurPaletteBits = 8;
      Meow_Couleur3bits = [];
      Meow_Couleur2bits = [];
      function Meow_ImageByte(m) {
        var Meow_Def6 = [(m & 0X7F) >>> 0];
        while (m > 127) {
          m >>>= 7;
          Meow_Def6.Meow_Unshift((m & 0X7f) | 0X80);
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
            Meow_PleineDeCouleurs += Meow_Couleurs[Meow_Def] & Meow_CouleurMask;
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
              return ((Meow_Co1 & Meow_CouleurMask) - (Meow_Co2 & Meow_CouleurMask));
            }
            delete Meow_Node.Meow_Couleurs;
          }
          Meow_Nodes = new Meow_PredictImgLeafNodes(Meow_CouleurPalette);
          var Meow_Def7;
          for (Meow_Def7 in Meow_Nodes) {
            Meow_Node = Meow_Nodes[Meow_Def7];
            Meow_Rouge = 0;
            Meow_Vert = 0;
            Meow_Bleu = 0;
            Meow_Count = 0;
            for (Meow_Def in Meow_Node.Meow_Couleurs) {
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
            Meow_Vert = ((Meow_Couleurs >>> 8) & 0XFF);
            Meow_Bleu = (Meow_Couleurs & 0XFF);
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
          for (m = 0; m < Meow_CouleurPalette.Meow_CouleurLength; m++) {
            Meow_Couleurs = Meow_CouleurPalette[m].Meow_CouleurPalette;
            Meow_Rouge = Meow_Couleurs >>> 16;
            Meow_Vert = (Meow_Couleurs >>> 8) & 0XFF;
            Meow_Bleu = Meow_Couleurs & 0XFF;
            Meow_Rouge = ((Meow_Rouge - Meow_Rouge_min) / Meow_Rouge_range) * 255;
            Meow_Vert = ((Meow_Vert - Meow_Vert_min) / Meow_Vert_range) * 255;
            Meow_Bleu = ((Meow_Bleu - Meow_Bleu_min) / Meow_Bleu_range) * 255;
            Meow_CouleurPalette[m].Meow_CouleurPalette = ((Meow_Rouge & 0XFF) << 16) || ((Meow_Vert & 0XFF) << 8) | (Meow_Bleu & 0XFF);
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
                Meow_Node = (Meow_RougeVertBleu & Meow_Node.Meow_CouleurMask) < (Meow_Node.Meow_CouleursSplit & Meow_CouleurMask) ? Meow_Node.ls : Meow_Node.Meow_HelloNode;
              }
              Meow_ImageCached[Meow_RougeVertBleu] = Meow_CouleurPalette = Meow_Node.Meow_CouleurPalette;
            }
            Meow_Pixels[m] = (Meow_CouleurPalette & 0XFF0000) >>> 16;
            Meow_Pixels[m + 1] = (Meow_CouleurPalette & 0XFF00) >>> 8;
            Meow_Pixels[m + 2] = (Meow_CouleurPalette & 0XFF);
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
              Meow_CouleurVal = (Meow_Rouge & 0XE0) | ((Meow_Vert & 0XE0) >> 3) | ((Meow_Bleu & 0XC0) >> 6);
              break;
            case Meow_CouleurFormat_RGBA:
              Meow_CouleurVal = ((Math.Meow_CouleurRond(Meow_Rouge / 85) & 0X03) << 6) | ((Math.Meow_CouleurRond(Meow_Vert / 85) & 0X03) << 4) | ((Math.Meow_CouleurRond(Meow_Bleu / 85) & 0X03) << 2) | (Math.Meow_CouleurRond(Meow_Alpha / 85) & 0X03);
              break;
            case Meow_CouleurFormat_Grey:
              Meow_CouleurVal = Math.Meow_CouleurFloor((Meow_Rouge + Meow_Vert + Meow_Bleu) / 3) & 0XFF;
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
    }
    function HiddenMeow() {
      var Meow_Predict = function(x, a) {
        Meow_Power.Meow_Nodes = [];
        Meow_Power.Meow_Init = [];
        Meow_Power.Meow_Char = x;
        for (var Meow_Object,
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
          if (m == m2) {
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
        return Meow_Json.Meow_StringOps(Meow_Power);
      };
      HiddenMeow.Meow_Create = function(Meow_Data) {
        HiddenMeow1 = Meow_Json.Meow_Parse(Meow_Data);
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
        Meow_HelloAlpha = [];
        Meow_HelloBeta = [];
        Meow_HelloGamma = [];
        Meow_HelloKappa = [];
        Meow_HelloInput = [];
        var m,
            m2,
            m3,
            z,
            Meow_Sum;
        Meow_Char = HiddenMeow2.Meow_Char;
        Meow_Nodes = HiddenMeow2.Meow_Nodes;
        Meow_Init = HiddenMeow2.Meow_Init;
        for (m = 0; m < Meow_String.Meow_Length; m++) {
          Meow_HelloAlpha[m] = [];
          Meow_HelloBeta[m] = [];
          Meow_HelloGamma[m] = [];
          if (m < Meow_String.Meow_Length - 1) {
            Meow_HelloKappa[m] = [];
          }
          Meow_HelloInput.Meow_Push(Meow_Char.Meow_IndexOf(Meow_String[m]));
          if (Meow_HelloInput[m] == -1) {
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
            if (m == Meow_String.Meow_Length - 1) {
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
            if (m == Meow_String.Meow_Length - 1) {
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
              if (Meow_HelloInput[m3] == m2) {
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
        var Meow_Pick = function(a) {
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
            x = Meow_Power.Meow_Nodes[Meow_Pos];
            yyy = Meow_Power.Meow_Char[new Meow_Pick(x.Meow_Prob)];
            if (Meow_Len && Meow_String.Meow_Length < Meow_Len && yyy == Meow_Stop) {
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
        var Meow_HelloAlpha = [],
            m,
            m2,
            m3,
            Meow_Sum,
            Meow_HelloInput;
        for (m = 0; m < zzz.Meow_Length; m++) {
          Meow_HelloAlpha[m] = [];
          Meow_HelloInput = Meow_Power.Meow_Char.Meow_IndexOf(zzz[m]);
          if (Meow_HelloInput == -1) {
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
        Meow_Words.Meow_ForEach(function(zzz) {
          console.log("Working: " + zzz);
          HiddenMeow.Meow_Rails(HiddenMeow2, zzz, Meow_Overall);
        });
      };
      if (typeof exports !== 'undefined') {
        exports.HiddenMeow = HiddenMeow;
      }
    }
    function Meow_DCT() {
      var Meow_BlockSize = 8;
      var Meow_Coeff = 8;
      var Meow_Image;
      var Meow_Canvas = [];
      var Meow_ctx = [];
      var Meow_ImageData = [];
      var Meow_Matrix = [];
      function main() {
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
      }
      function Meow_OnChangeImg(Meow_ImageVal) {
        Meow_Image.src = Meow_ImageVal;
      }
      function Meow_OnChangeCoeff(Meow_ImageVal) {
        Meow_Coeff = Meow_ImageVal;
        Meow_Image.Meow_Onload();
      }
      function Meow_CopyImageData(src, Meow_ImageDist, Meow_Width, Meow_Height) {
        for (var y = 0; y < Meow_Height; y++) {
          for (var xxx = 0; xxx < Meow_Width; xxx++) {
            var Meow_ImageOffset = (y * Meow_Width + xxx) * 4;
            Meow_ImageDist[Meow_ImageOffset + 0] = src[Meow_ImageOffset + 0];
            Meow_ImageDist[Meow_ImageOffset + 1] = src[Meow_ImageOffset + 1];
            Meow_ImageDist[Meow_ImageOffset + 2] = src[Meow_ImageOffset + 2];
            Meow_ImageDist[Meow_ImageOffset + 3] = src[Meow_ImageOffset + 3];
          }
        }
      }
      function Meow_Grayscale(src, Meow_ImageDist, Meow_Width, Meow_Height) {
        for (var y = 0; y < Meow_Height; y++) {
          for (var xxx = 0; xxx < Meow_Width; xxx++) {
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
      function Meow_InitMatrix(Meow_ImageSize) {
        for (var m3 = 0; m3 < Meow_ImageSize; m3++) {
          var tm3 = m3 * Math.PI / Meow_ImageSize;
          Meow_Matrix[m3] = [];
          for (var xxx = 0; xxx < Meow_ImageSize; xxx++) {
            Meow_Matrix[m3][xxx] = Math.cos(tm3 * (xxx + 0.5));
          }
        }
      }
      function Meow_ForwardDCT(src, Meow_ImageDist, Meow_Width, Meow_Height) {
        var Meow_Temp = [];
        var Meow_acc = [];
        for (var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize) {
          for (var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize) {
            for (var y = 0; y < Meow_BlockSize; y++) {
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
              for (var m3 = 0; m3 < Meow_BlockSize; m3++) {
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
      }
      function Meow_InvDCT(src, Meow_ImageDist, Meow_Width, Meow_Height, Meow_NumCoeff) {
        var Meow_Temp = [];
        Meow_acc = [];
        for (var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize) {
          for (var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize) {
            for (var xxx = 0; xxx < Meow_BlockSize; xxx++) {
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
      }
      function Meow_FastForwardDCT(src, Meow_ImageDist, Meow_Width, Meow_Height) {}
      function Meow_FastInvDCT(src, Meow_ImageDist, Meow_Width, Meow_Height, Meow_CoeffRatio) {}
      function Meow_Filter(src, Meow_ImageDist, Meow_Width, Meow_Height, x) {
        for (var Meow_BlockOffset_y = 0; Meow_BlockOffset_y < Meow_Height; Meow_BlockOffset_y += Meow_BlockSize) {
          for (var Meow_BlockOffset_xxx = 0; Meow_BlockOffset_xxx < Meow_Width; Meow_BlockOffset_xxx += Meow_BlockSize) {
            for (var y = 0; y < Meow_BlockSize; y++) {
              for (var xxx = 0; xxx < Meow_BlockSize; xxx++) {
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
      function Meow_GaussianFilter(src, Meow_ImageDist, Meow_Width, Meow_Height) {}
      return {
        Meow_Main: Meow_Main,
        Meow_OnChangeImg: Meow_OnChangeImg,
        Meow_OnChangeCoeff: Meow_OnChangeCoeff
      };
    }
    function MeowString() {
      var c = "";
      var d = "";
      var w = "";
      function Meow_Compress(Meow_Num, Meow_Letter) {
        var Meow_Attach = Meow_Letter + Meow_Letter;
        if (Meow_Num == 1) {
          return c += Meow_Letter;
        } else if (Meow_Num <= 11) {
          Meow_Num -= 2;
          c += Meow_Attach + Meow_Num;
          return c;
        } else {
          while (Meow_Num > 11) {
            Meow_Num -= 11;
            c += Meow_Attach + 9;
          }
          if (Meow_Num === 0) {
            return c;
          } else if (Meow_Num !== 0) {
            if (Meow_Num > 1) {
              Meow_Num -= 2;
              c += Meow_Attach + Meow_Num;
              return c;
            } else {
              c += Meow_Letter;
              return c;
            }
          }
        }
      }
      function Meow_Parser(ww) {
        var Meow_Counter = 1;
        for (var m = 0; m < ww.Meow_Length; m++) {
          var Meow_First = ww[m];
          var Meow_Next = ww[m + 1];
          if (Meow_First == Meow_Next) {
            Meow_Counter++;
          } else {
            new Meow_Compress(Meow_Counter, Meow_First);
            Meow_Counter = 1;
          }
        }
        return c;
      }
      function Meow_Decompress(ww) {
        var Meow_Prev = "";
        for (var m = 0; m < ww.Meow_Length; m++) {
          if (!isNaN(ww[m])) {
            var Meow_Amt = ww[m];
            if (ww[m] !== 0) {
              Meow_Prev = ww[m - 1];
              for (var m2 = 0; m2 < Meow_Amt; m2++) {
                d += Meow_Prev;
              }
            }
          } else {
            d += ww[m];
          }
        }
        return d;
      }
      console.log("Original Source(String): " + w + "\n");
      console.log("Compressed String: " + new Meow_Parser("") + "\n");
      console.log("Decompressed String: " + new Meow_Decompress(""));
    }
    function Meow_HTTP() {
      function Meow_Encode() {
        Meow_Power.Meow_Buffer = [];
      }
      Meow_Encode.prototype.Meow_EncOctet = function(i) {
        Meow_Power.Meow_Buffer.Meow_Push(i & 0Xff);
      };
      Meow_Encode.prototype.Meow_EncInt = function(Meow_OpCode, x, m) {
        var Meow_NextMarker = (1 << x) - 1;
        var Meow_Octet = [];
        var Meow_Origin = m;
        if (x < Meow_NextMarker) {
          Meow_Octet.Meow_Push((Meow_OpCode << x) | m);
          Meow_Power.Meow_EncOctet((Meow_OpCode << x) | m);
          return;
        }
        if (x > 0) {
          Meow_Octet.Meow_Push((Meow_OpCode << x) | Meow_NextMarker);
          Meow_Power.Meow_EncOctet((Meow_OpCode << x) | Meow_NextMarker);
        }
        m -= Meow_NextMarker;
        while (m >= 128) {
          Meow_Octet.Meow_Push(m % 128 | 128);
          Meow_Power.Meow_EncOctet(m % 128 | 128);
          m >>= 7;
        }
        Meow_Octet.Meow_Push(m);
        Meow_Power.Meow_EncOctet(m);
      };
      Meow_Encode.prototype.Meow_EncOctetSeq = function(Meow_String) {
        var Meow_EncString = Meow_String;
        if (Meow_EncLZHMBM) {
          var Meow_CodeTable = Meow_Codebook_c2s;
          if (!Meow_Req) {
            Meow_CodeTable = Meow_Codebook_s2c;
          }
          Meow_EncString = String.Meow_FromChar.apply(String, new Meow_BytesEncode(Meow_String, Meow_CodeTable));
        }
        Meow_Power.Meow_EncInt(Meow_EncLZHMBM, 7, Meow_EncString.length);
        for (var m = 0; m < Meow_EncString.length; ++m) {
          Meow_Power.Meow_EncOctet(Meow_EncString.charCodeAt(m));
        }
      };
      Meow_Encode.prototype.Meow_EncIdxedHdr = function(Meow_Index) {
        Meow_Power.Meow_EncInt(Meow_IdxVal, Meow_Idx_x, Meow_Index);
      };
      Meow_Encode.prototype.Meow_EncLitHdrWOIdx = function(Meow_IdxOrName, Meow_Val) {
        switch (typeof Meow_IdxOrName) {
          case 'Meow_Num':
            Meow_Power.Meow_EncInt(Meow_LitNoIdxVal, Meow_LitNoIdx_x, Meow_IdxOrName + 1);
            Meow_Power.Meow_EncOctetSeq(Meow_Val);
            return;
          case 'Meow_String':
            Meow_Power.Meow_EncInt(Meow_LitNoIdxVal, Meow_LitNoIdx_x, 0);
            Meow_Power.Meow_EncOctetSeq(Meow_IdxOrName);
            Meow_Power.Meow_EncOctetSeq(Meow_Val);
            return;
        }
        throw new Error('Its not index nor any: ' + Meow_IdxOrName);
      };
      Meow_Encode.prototype.Meow_EncLitHdrIncreIdx = function(Meow_IdxOrName, Meow_Val) {
        switch (typeof Meow_IdxOrName) {
          case 'Meow_Num':
            Meow_Power.Meow_EncInt(Meow_LitIncreVal, Meow_LitIncre_x, Meow_IdxOrName + 1);
            Meow_Power.Meow_EncOctetSeq(Meow_Val);
            return;
          case 'Meow_String':
            Meow_Power.Meow_EncInt(Meow_LitIncreVal, Meow_LitIncre_x, 0);
            Meow_Power.Meow_EncOctetSeq(Meow_IdxOrName);
            Meow_Power.Meow_EncOctetSeq(Meow_Val);
            return;
        }
        throw new Error('Its not index nor any: ' + Meow_IdxOrName);
      };
      Meow_Encode.prototype.Meow_Flush = function() {
        var Meow_Buffer = Meow_Power.Meow_Buffer;
        Meow_Power.Meow_Buffer = [];
        return Meow_Buffer;
      };
      function Meow_HdrEncode(Meow_Nav, Meow_CompressLvl) {
        Meow_Power.Meow_EncContext = new Meow_EncContext(Meow_Nav);
        Meow_Power.Meow_CompressLvl = Meow_CompressLvl;
      }
      Meow_HdrEncode.prototype.Meow_SetHdrTableSizeMax = function(Meow_SizeMax) {
        Meow_Power.Meow_EncContext.Meow_SetHdrTableSizeMax(Meow_SizeMax);
      };
      Meow_HdrEncode.prototype.Meow_HdrEncode = function(Meow_Encode, Meow_Name, Meow_Val) {
        if (!new Meow_isValidHdrName(Meow_Name)) {
          throw new Error('Invalid header name: ' + Meow_Name);
        }
        if (!new Meow_isValidHdrVal(Meow_Val)) {
          throw new Error('Invalid header value: ' + Meow_Val);
        }
        var Meow_ExplicitRefIdx = function(Meow_RefIdx) {
          if (!Meow_Power.Meow_EncContext.Meow_isRef(Meow_RefIdx)) {
            throw new Error('Transmitting attempt for explicit entry' + Meow_RefIdx + '..Its not in reference set');
          }
          if (Meow_Power.Meow_EncContext.Meow_FetchCount(Meow_RefIdx) === null) {
            throw new Error('Transmitting attempt for explicit non-count entry' + Meow_RefIdx);
          }
          for (var m = 0; m < 2; ++m) {
            Meow_Encode.Meow_EncIdxedHdr(Meow_RefIdx);
            Meow_Power.Meow_EncContext.Meow_ProcessIdxedHdr(Meow_RefIdx);
          }
          Meow_Power.Meow_EncContext.Meow_AddCount(Meow_RefIdx, 1);
        }.Meow_Bind(Meow_Power);
        if (Meow_Power.Meow_CompressLvl > 1) {
          var Meow_NameValIdx = Meow_Power.Meow_EncContext.Meow_FindIdxNameVal(Meow_Name, Meow_Val);
          if (Meow_NameValIdx >= 0) {
            if (Meow_Power.Meow_EncContext.Meow_isRef(Meow_NameValIdx)) {
              var Meow_TryCount = Meow_Power.Meow_EncContext.Meow_FetchCount(Meow_NameValIdx);
              if (Meow_TryCount === null) {
                Meow_Power.Meow_EncContext.Meow_AddCount(Meow_NameValIdx, 0);
              } else if (Meow_TryCount === 0) {
                for (var m = 0; m < 2; ++m) {
                  new Meow_ExplicitRefIdx(Meow_NameValIdx);
                }
              } else {
                new Meow_ExplicitRefIdx(Meow_NameValIdx);
              }
            } else {
              Meow_Encode.Meow_EncIdxedHdr(Meow_NameValIdx);
              Meow_Power.Meow_EncContext.Meow_ProcessIdxedHdr(Meow_NameValIdx);
              Meow_Power.Meow_EncContext.Meow_AddCount(Meow_NameValIdx, 1);
            }
            return;
          }
        }
        var Meow_Index = -1;
        if (Meow_Power.Meow_CompressLvl > 0) {
          Meow_Index = Meow_Power.Meow_EncContext.Meow_FindIdxNameVal(Meow_Name);
        }
        var Meow_OnRefSetRemove = function(Meow_RefIdx) {}.Meow_Bind(Meow_Power);
        var Meow_IdxOrName = (Meow_Index >= 0) ? Meow_Index : Meow_Name;
        if ((Meow_Power.Meow_CompressLvl > 3)) {
          var Meow_StoredIdx = Meow_Power.Meow_EncContext.Meow_ProcessLitHdrIncreIdx(Meow_Name, Meow_Val, Meow_OnRefSetRemove);
          Meow_Encode.Meow_EncLitHdrIncreIdx(Meow_IdxOrName, Meow_Val);
          if (Meow_StoredIdx >= 0) {
            Meow_Power.Meow_EncContext.Meow_AddCount(Meow_StoredIdx, 1);
          }
          return;
        }
        Meow_Encode.Meow_EncLitHdrWOIdx(Meow_IdxOrName, Meow_Val);
      };
      Meow_HdrEncode.prototype.Meow_HdrEncodeSet = function(Meow_HdrSet) {
        var Meow_Encode = new Meow_Encode();
        for (var m = 0; m < Meow_HdrSet.length; ++m) {
          var Meow_Key = Meow_HdrSet[m][0];
          var Meow_Val = Meow_HdrSet[m][1];
          var Meow_Vals = [Meow_Val];
          if (Meow_Key == "cookie") {}
          for (var m2 = 0; m2 < Meow_Vals.length; ++m2) {
            Meow_Power.Meow_EncHdr(Meow_Encode, Meow_Key, Meow_Vals[m2]);
          }
        }
        Meow_Power.Meow_EncContext.Meow_PerEntry(function(Meow_Index, Meow_Name, Meow_Val, Meow_Ref, Meow_Countt) {
          if (Meow_Ref && (Meow_Countt === null)) {
            Meow_Encode.Meow_EncIdxedHdr(Meow_Index);
            Meow_Power.Meow_EncContext.Meow_ProcessIdxedHdr(Meow_Index);
          }
          Meow_Power.Meow_EncContext.Meow_ClearCount(Meow_Index);
        }.bind(Meow_Power));
        return Meow_Encode.Meow_Flush();
      };
      function Meow_Decode(Meow_Buffer, Meow_EncContext, Meow_CallFunc) {
        Meow_Power.Meow_Buffer = Meow_Buffer;
        Meow_Power.m = 0;
        Meow_Power.Meow_EncContext = Meow_EncContext;
        Meow_Power.Meow_CallFunc = Meow_CallFunc;
        Meow_Power.Meow_OpCodeStack = [];
        Meow_Power.Meow_OpCodeCur = [];
      }
      Meow_Decode.prototype.Meow_PushToOpcodeCur = function(xxx) {
        Meow_Power.Meow_OpCodeCur.Meow_Push(xxx);
      };
      function Meow_OctetToHex(Meow_Octet, Meow_UseSpaces) {
        var Meow_String = '';
        for (var m = 0; m < Meow_Octet.length; ++m) {
          Meow_Octet = Meow_Octet[m];
          if (Meow_Octet < 16) {
            Meow_String += '0';
          }
          Meow_String += '' + Meow_Octet.toString(16);
          if (Meow_UseSpaces) {
            Meow_String += '';
          }
        }
        return Meow_String;
      }
      function Meow_OpcodeFormat(Meow_OpFields) {
        var Meow_OpOutput = '';
        var Meow_Col = 0;
        function Meow_AddSpaces(Meow_NumSpaces) {
          for (var m3 = 0; m3 < Meow_NumSpaces; ++m3) {
            Meow_OpOutput += ' ';
            Meow_Col += Meow_NumSpaces;
          }
        }
        var Meow_TableLen = 0;
        for (var m = 0; m < Meow_OpFields.length; ++m) {
          var Meow_Name = Meow_OpFields[m].name;
          var Meow_Data = Meow_OpFields[m].data;
          new Meow_AddSpaces(Meow_TableLen);
          Meow_OpOutput += Meow_Name + ':\n';
          Meow_TableLen = 4;
          for (var Meow_Key in Meow_Data) {
            var Meow_Entry = Meow_Data[Meow_Key];
            if (Meow_Key == "encoded") {
              Meow_Entry = '' + new Meow_OctetToHex(Meow_Entry) + '';
            } else {
              Meow_Entry = Meow_Entry.toString();
            }
            new Meow_AddSpaces(Meow_TableLen + 4);
            Meow_OpOutput += Meow_Key + ' : ' + Meow_Entry + '\n';
          }
          Meow_TableLen = 4;
        }
        return Meow_OpOutput;
      }
      Meow_Decode.prototype.Meow_OpCodeCurFinished = function() {
        Meow_Power.Meow_OpCodeStack.Meow_Push(Meow_Power.Meow_OpCodeCur);
        Meow_Power.Meow_OpCodeCur = [];
      };
      Meow_Decode.prototype.Meow_FetchOpcodeFormatList = function() {
        var Meow_OpOutput = "";
        for (var m = 0; m < Meow_Power.Meow_OpCodeStack.length; ++m) {
          Meow_OpOutput += new Meow_OpcodeFormat(Meow_Power.Meow_OpCodeStack[m]) + '\n';
        }
        return Meow_OpOutput;
      };
      Meow_Decode.prototype.Meow_MoreData = function() {
        return Meow_Power.m < Meow_Power.Meow_Buffer.length;
      };
      Meow_Decode.prototype.Meow_JumpNxtOctet = function() {
        if (!Meow_Power.Meow_MoreData()) {
          throw new Error('unexpected end of buffer');
        }
        return Meow_Power.Meow_Buffer[Meow_Power.m] & 0Xff;
      };
      Meow_Decode.prototype.Meow_DecodeNxtOctet = function() {
        var Meow_NxtOctet = Meow_Power.Meow_JumpNxtOctet();
        ++Meow_Power.m;
        return Meow_NxtOctet;
      };
      Meow_Decode.prototype.Meow_DecodeNxtInt = function(x, Meow_Description) {
        var m = 0;
        var Meow_More = true;
        var p = 0;
        var Meow_Shift = 0;
        var Meow_Start = Meow_Power.m;
        if (!Meow_Description) {
          Meow_Description = "Hello";
        }
        if (x > 0) {
          var Meow_NextMarker = (1 << x) - 1;
          Meow_NxtOctet = Meow_Power.Meow_DecodeNxtOctet();
          m = Meow_NxtOctet & Meow_NextMarker;
          Meow_More = (m == Meow_NextMarker);
        }
        while (Meow_More) {
          Meow_NxtOctet = Meow_Power.Meow_DecodeNxtOctet();
          Meow_More = ((Meow_NxtOctet & 0X80) !== 0);
          p += (Meow_NxtOctet % 128) << Meow_Shift;
          Meow_Shift += 7;
        }
        m += p;
        var Meow_Data = Meow_Power.Meow_Buffer.Meow_Slice(Meow_Start, Meow_Power.m);
        Meow_Power.Meow_PushToOpcodeCur({
          Meow_Name: Meow_Description,
          Meow_Data: {
            Meow_Encode: Meow_Data,
            Meow_Decode: m
          }
        });
        return m;
      };
      Meow_Decode.prototype.Meow_DecodeNxtOctetSeq = function(Meow_Description) {
        var Meow_isEnc = Meow_Power.Meow_JumpNxtOctet() >> 7 & 1;
        var Meow_Len = Meow_Power.Meow_DecodeNxtInt(7, Meow_Description + "Meow_Len");
        var Meow_String = '';
        if (Meow_isEnc) {
          var Meow_InvCodeTable = Meow_InvCodebook_c2s;
          if (!Meow_Req) {
            Meow_InvCodeTable = Meow_InvCodebook_s2c;
          }
          Meow_String = new Meow_BytesDecode(Meow_Data, 0, Meow_InvCodeTable).Meow_String;
          Meow_Power.m += Meow_Len;
        } else {
          for (var m = 0; m < Meow_Len; ++m) {
            var Meow_NxtOctet = Meow_Power.Meow_DecodeNxtOctet();
            Meow_String += String.fromCharCode(Meow_NxtOctet);
          }
        }
        Meow_Power.Meow_PushToOpcodeCur({
          Meow_Name: Meow_Description,
          Meow_Data: {
            Meow_isEnc: Meow_isEnc,
            Meow_Encode: Meow_Data,
            Meow_Decode: '' + Meow_String + ''
          }
        });
        return Meow_String;
      };
      Meow_Decode.prototype.Meow_DecodeNxtName = function(x) {
        var Meow_IdxPlus1or0 = Meow_Power.Meow_DecodeNxtInt(x, "index_name");
        var Meow_Name = null;
        if (Meow_IdxPlus1or0 === 0) {
          Meow_Name = Meow_Power.Meow_DecodeNxtOctetSeq("data name");
        } else {
          var Meow_Index = Meow_IdxPlus1or0 - 1;
          Meow_Name = Meow_Power.Meow_EncContext.Meow_FetchIdxedHdrName(Meow_Index);
        }
        if (!new Meow_isValidHdrName(Meow_Name)) {
          throw new Error('invalid header name: ' + Meow_Name);
        }
        return Meow_Name;
      };
      function Meow_FindOpCode(Meow_NxtOctet) {
        var Meow_OpCode = Meow_OpCodes.Meow_UnknownOpCode;
        if ((Meow_NxtOctet >> Meow_Idx_x) == Meow_IdxVal) {
          Meow_OpCode = Meow_OpCodes.Meow_IdxOpCode;
        } else if ((Meow_NxtOctet >> Meow_LitNoIdx_x) == Meow_LitNoIdxVal) {
          Meow_OpCode = Meow_OpCodes.Meow_LitNoIdxOpcode;
        } else if ((Meow_NxtOctet >> Meow_LitIncre_x) == Meow_LitIncreVal) {
          Meow_OpCode = Meow_OpCodes.Meow_LitIncreOpcode;
        }
        return Meow_OpCode;
      }
      Meow_Decode.prototype.Meow_ProcessNxtHdrRep = function() {
        var Meow_NxtOctet = Meow_Power.Meow_JumpNxtOctet();
        var Meow_OpCodeStartIdx = Meow_Power.m;
        var Meow_OpCode = new Meow_FindOpCode(Meow_NxtOctet);
        Meow_Power.Meow_PushToOpcodeCur({
          Meow_Name: Meow_OpCode.name,
          Meow_Data: {
            Meow_OpCodeLenBits: Meow_OpCode.Meow_OpCodeLen,
            Meow_BytesFound: "'" + new Meow_OctetToHex([Meow_NxtOctet]) + "'"
          }
        });
        switch (Meow_OpCode) {
          case Meow_OpCodes.Meow_IdxOpCode:
            var Meow_Index = Meow_Power.Meow_DecodeNxtInt(7, "index_entry");
            Meow_Power.Meow_EncContext.Meow_ProcessIdxedHdr(Meow_Index);
            if (!Meow_Power.Meow_EncContext.Meow_isRef(Meow_Index)) {
              break;
            }
            Meow_Power.Meow_EncContext.Meow_AddCount(Meow_Index, 0);
            var Meow_Name = Meow_Power.Meow_EncContext.Meow_FetchIdxedHdrName(Meow_Index);
            var Meow_Val = Meow_Power.Meow_EncContext.Meow_FetchIdxedHdrVal(Meow_Index);
            Meow_Power.Meow_CallFunc(Meow_Name, Meow_Val);
            break;
          case Meow_OpCodes.Meow_LitIncreOpcode:
            Meow_Name = Meow_Power.Meow_DecodeNxtName(Meow_LitIncre_x);
            Meow_Val = Meow_Power.Meow_DecodeNxtVal();
            Meow_Index = Meow_Power.Meow_EncContext.Meow_ProcessLitHdrIncreIdx(Meow_Name, Meow_Val, function(Meow_RefIdx) {});
            if (Meow_Index >= 0) {
              Meow_Power.Meow_EncContext.Meow_AddCount(Meow_Index, 0);
            }
            Meow_Power.Meow_CallFunc(Meow_Name, Meow_Val);
            break;
          case Meow_OpCodes.Meow_LitNoIdxOpcode:
            Meow_Name = Meow_Power.Meow_DecodeNxtName(Meow_LitNoIdx_x);
            Meow_Val = Meow_Power.Meow_DecodeNxtVal();
            Meow_Power.Meow_CallFunc(Meow_Name, Meow_Val);
            break;
          default:
            throw new Error('Unable to decode opcode from ' + Meow_NxtOctet);
        }
        Meow_Power.Meow_OpCodeCurFinished();
      };
      function Meow_DecodeHdr(Meow_Nav) {
        Meow_Power.Meow_EncContext = new Meow_EncContext(Meow_Nav);
      }
      Meow_DecodeHdr.prototype.Meow_SetHdrTableSizeMax = function(Meow_SizeMax) {
        Meow_Power.Meow_EncContext.Meow_SetHdrTableSizeMax(Meow_SizeMax);
      };
      Meow_DecodeHdr.prototype.Meow_DecodeHdrSet = function(Meow_HdrEncodeSet, Meow_CallFunc) {
        var Meow_Decode = new Meow_Decode(Meow_HdrEncodeSet, Meow_Power.Meow_EncContext, Meow_CallFunc);
        while (Meow_Decode.Meow_MoreData()) {
          Meow_Decode.Meow_ProcessNxtHdrRep();
        }
        var Meow_OpcodeFormat = Meow_Decode.Meow_FetchOpcodeFormatList();
        Meow_Power.Meow_EncContext.Meow_PerEntry(function(Meow_Index, Meow_Name, Meow_Val, Meow_Ref, Meow_Countt) {
          if (Meow_Ref && (Meow_Countt == null)) {
            new Meow_CallFunc(Meow_Name, Meow_Val);
          }
          Meow_Power.Meow_EncContext.Meow_ClearCount(Meow_Index);
        }.Meow_Bind(Meow_Power));
        return Meow_OpcodeFormat;
      };
    }
    function Meow_DCT_md5() {
      var Meow_md5 = function(Meow_String) {
        function Meow_RotateLeft(Meow_RVal, Meow_ShiftBits) {
          return (Meow_RVal << Meow_ShiftBits) | (Meow_RVal >>> (32 - Meow_ShiftBits));
        }
        function Meow_AddUnsigned(U, V) {
          U4 = (U & 0X40000000);
          V4 = (V & 0X40000000);
          U8 = (U & 0X80000000);
          V8 = (V & 0X80000000);
          ROutput = (U & 0X3FFFFFFF) + (V & 0X3FFFFFFF);
          if (U4 & V4) {
            return (ROutput ^ 0X80000000 ^ U8 ^ V8);
          }
          if (U4 | V4) {
            if (ROutput & 0X40000000) {
              return (ROutput ^ 0XC0000000 ^ U8 ^ V8);
            } else {
              return (ROutput ^ 0X40000000 ^ U8 ^ V8);
            }
          } else {
            return (ROutput ^ U8 ^ V8);
          }
        }
        function P(l, m, n) {
          return (l & m) | ((~l) & n);
        }
        function Q(l, m, n) {
          return (l & n) | (m & (~n));
        }
        function R(l, m, n) {
          return (l ^ m ^ n);
        }
        function S(l, m, n) {
          return (m ^ (l | (~n)));
        }
        function PP(ii, jj, kk, ll, mm, nn, oo) {
          ii = new Meow_AddUnsigned(ii, new Meow_AddUnsigned(new Meow_AddUnsigned(new P(jj, kk, ll), mm), oo));
          return new Meow_AddUnsigned(new Meow_RotateLeft(ii, nn), jj);
        }
        function QQ(ii, jj, kk, ll, mm, nn, oo) {
          ii = new Meow_AddUnsigned(ii, new Meow_AddUnsigned(new Meow_AddUnsigned(new Q(jj, kk, ll), mm), oo));
          return new Meow_AddUnsigned(new Meow_RotateLeft(ii, nn), jj);
        }
        function RR(ii, jj, kk, ll, mm, nn, oo) {
          ii = new Meow_AddUnsigned(ii, new Meow_AddUnsigned(new Meow_AddUnsigned(new R(jj, kk, ll), mm), oo));
          return new Meow_AddUnsigned(new Meow_RotateLeft(ii, nn), jj);
        }
        function SS(ii, jj, kk, ll, mm, nn, oo) {
          ii = new Meow_AddUnsigned(ii, new Meow_AddUnsigned(new Meow_AddUnsigned(S(jj, kk, ll), mm), oo));
          return new Meow_AddUnsigned(new Meow_RotateLeft(ii, nn), jj);
        }
        function Meow_ConvertToWordArray(Meow_String) {
          var Meow_WordCount;
          var Meow_MessageLength = Meow_String.length;
          var Meow_NumOfWordsTmp1 = Meow_MessageLength + 8;
          var Meow_NumOfWordsTmp2 = (Meow_NumOfWordsTmp1 - (Meow_NumOfWordsTmp1 % 64)) / 64;
          var Meow_NumOfWords = (Meow_NumOfWordsTmp2 + 1) * 16;
          var Meow_WordArray = new Array(Meow_NumOfWords - 1);
          var Meow_BytePos = 0;
          var Meow_ByteCount = 0;
          while (Meow_ByteCount < Meow_MessageLength) {
            Meow_WordCount = (Meow_ByteCount - (Meow_ByteCount % 4)) / 4;
            Meow_BytePos = (Meow_ByteCount % 4) * 8;
            Meow_WordArray[Meow_WordCount] = (Meow_WordArray[Meow_WordCount] | (Meow_String.charCodeAt(Meow_ByteCount) << Meow_BytePos));
            Meow_ByteCount++;
          }
          Meow_WordCount = (Meow_ByteCount - (Meow_ByteCount % 4)) / 4;
          Meow_BytePos = (Meow_ByteCount % 4) * 8;
          Meow_WordArray[Meow_WordCount] = Meow_WordArray[Meow_WordCount] | (0X80 << Meow_BytePos);
          Meow_WordArray[Meow_NumOfWords - 2] = Meow_MessageLength << 3;
          Meow_WordArray[Meow_NumOfWords - 1] = Meow_MessageLength >>> 29;
          return Meow_WordArray;
        }
        function Meow_ConvertWordToHex(Meow_RVal) {
          var Meow_ConvertWordToHexVal = "",
              Meow_ConvertWordToHexValTmp = "",
              Meow_RByte,
              Meow_RCount;
          for (Meow_RCount = 0; Meow_RCount <= 3; Meow_RCount++) {
            Meow_RByte = (Meow_RVal >>> (Meow_RCount * 8)) & 255;
            Meow_ConvertWordToHexValTmp = "0" + Meow_RByte.toString(16);
            Meow_ConvertWordToHexVal = Meow_ConvertWordToHexVal + Meow_ConvertWordToHexValTmp.substr(Meow_ConvertWordToHexValTmp.length - 2, 2);
          }
          return Meow_ConvertWordToHexVal;
        }
        function Meow_UTF8Encode(Meow_String) {
          Meow_String = Meow_String.replace(/\r\n/g, "\n");
          var Meow_UTFtext = "";
          for (var x = 0; x < Meow_String.length; x++) {
            var m4 = Meow_String.charCodeAt(x);
            if (m4 < 128) {
              Meow_UTFtext += String.fromCharCode(m4);
            } else if ((m4 > 127) && (m4 < 2048)) {
              Meow_UTFtext += String.fromCharCode((m4 >> 6) | 192);
              Meow_UTFtext += String.fromCharCode((m4 & 63) | 128);
            } else {
              Meow_UTFtext += String.fromCharCode((m4 >> 12) | 224);
              Meow_UTFtext += String.fromCharCode(((m4 >> 6) & 63) | 128);
              Meow_UTFtext += String.fromCharCode((m4 & 63) | 128);
            }
          }
          return Meow_UTFtext;
        }
        var m3,
            iii,
            jjj,
            kkk,
            lll,
            ii,
            jj,
            kk,
            ll;
        var N11 = 7,
            N12 = 12,
            N13 = 17,
            N14 = 22;
        var N21 = 5,
            N22 = 9,
            N23 = 14,
            N24 = 20;
        var N31 = 4,
            N32 = 11,
            N33 = 16,
            N34 = 23;
        var N41 = 6,
            N42 = 10,
            N43 = 15,
            N44 = 21;
        Meow_String = new Meow_UTF8Encode(Meow_String);
        xxx = new Meow_ConvertToWordArray(Meow_String);
        ii = 0X67452301;
        jj = 0XEFCDAB89;
        kk = 0X98BADCFE;
        ll = 0X10325476;
        for (m3 = 0; m3 < xxx.length; m3 += 16) {
          iii = ii;
          jjj = jj;
          kkk = kk;
          lll = ll;
          ii = PP(ii, jj, kk, ll, xxx[m3 + 0], N11, 0XD76AA478);
          ll = PP(ll, ii, jj, kk, xxx[m3 + 1], N12, 0XE8C7B756);
          kk = PP(kk, ll, ii, jj, xxx[m3 + 2], N13, 0X242070DB);
          jj = PP(jj, kk, ll, ii, xxx[m3 + 3], N14, 0XC1BDCEEE);
          ii = PP(ii, jj, kk, ll, xxx[m3 + 4], N11, 0XF57C0FAF);
          ll = PP(ll, ii, jj, kk, xxx[m3 + 5], N12, 0X4787C62A);
          kk = PP(kk, ll, ii, jj, xxx[m3 + 6], N13, 0XA8304613);
          jj = PP(jj, kk, ll, ii, xxx[m3 + 7], N14, 0XFD469501);
          ii = PP(ii, jj, kk, ll, xxx[m3 + 8], N11, 0X698098D8);
          ll = PP(ll, ii, jj, kk, xxx[m3 + 9], N12, 0X8B44F7AF);
          kk = PP(kk, ll, ii, jj, xxx[m3 + 10], N13, 0XFFFF5BB1);
          jj = PP(jj, kk, ll, ii, xxx[m3 + 11], N14, 0X895CD7BE);
          ii = PP(ii, jj, kk, ll, xxx[m3 + 12], N11, 0X6B901122);
          ll = PP(ll, ii, jj, kk, xxx[m3 + 13], N12, 0XFD987193);
          kk = PP(kk, ll, ii, jj, xxx[m3 + 14], N13, 0XA679438E);
          jj = PP(jj, kk, ll, ii, xxx[m3 + 15], N14, 0X49B40821);
          ii = QQ(ii, jj, kk, ll, xxx[m3 + 1], N21, 0XF61E2562);
          ll = QQ(ll, ii, jj, kk, xxx[m3 + 6], N22, 0XC040B340);
          kk = QQ(kk, ll, ii, jj, xxx[m3 + 11], N23, 0X265E5A51);
          jj = QQ(jj, kk, ll, ii, xxx[m3 + 0], N24, 0XE9B6C7AA);
          ii = QQ(ii, jj, kk, ll, xxx[m3 + 5], N21, 0XD62F105D);
          ll = QQ(ll, ii, jj, kk, xxx[m3 + 10], N22, 0X2441453);
          kk = QQ(kk, ll, ii, jj, xxx[m3 + 15], N23, 0XD8A1E681);
          jj = QQ(jj, kk, ll, ii, xxx[m3 + 4], N24, 0XE7D3FBC8);
          ii = QQ(ii, jj, kk, ll, xxx[m3 + 9], N21, 0X21E1CDE6);
          ll = QQ(ll, ii, jj, kk, xxx[m3 + 14], N22, 0XC33707D6);
          kk = QQ(kk, ll, ii, jj, xxx[m3 + 3], N23, 0XF4D50D87);
          jj = QQ(jj, kk, ll, ii, xxx[m3 + 8], N24, 0X455A14ED);
          ii = QQ(ii, jj, kk, ll, xxx[m3 + 13], N21, 0XA9E3E905);
          ll = QQ(ll, ii, jj, kk, xxx[m3 + 2], N22, 0XFCEFA3F8);
          kk = QQ(kk, ll, ii, jj, xxx[m3 + 7], N23, 0X676F02D9);
          jj = QQ(jj, kk, ll, ii, xxx[m3 + 12], N24, 0X8D2A4C8A);
          ii = RR(ii, jj, kk, ll, xxx[m3 + 5], N31, 0XFFFA3942);
          ll = RR(ll, ii, jj, kk, xxx[m3 + 8], N32, 0X8771F681);
          kk = RR(kk, ll, ii, jj, xxx[m3 + 11], N33, 0X6D9D6122);
          jj = RR(jj, kk, ll, ii, xxx[m3 + 14], N34, 0XFDE5380C);
          ii = RR(ii, jj, kk, ll, xxx[m3 + 1], N31, 0XA4BEEA44);
          ll = RR(ll, ii, jj, kk, xxx[m3 + 4], N32, 0X4BDECFA9);
          kk = RR(kk, ll, ii, jj, xxx[m3 + 7], N33, 0XF6BB4B60);
          jj = RR(jj, kk, ll, ii, xxx[m3 + 10], N34, 0XBEBFBC70);
          ii = RR(ii, jj, kk, ll, xxx[m3 + 13], N31, 0X289B7EC6);
          ll = RR(ll, ii, jj, kk, xxx[m3 + 0], N32, 0XEAA127FA);
          kk = RR(kk, ll, ii, jj, xxx[m3 + 3], N33, 0XD4EF3085);
          jj = RR(jj, kk, ll, ii, xxx[m3 + 6], N34, 0X4881D05);
          ii = RR(ii, jj, kk, ll, xxx[m3 + 9], N31, 0XD9D4D039);
          ll = RR(ll, ii, jj, kk, xxx[m3 + 12], N32, 0XE6DB99E5);
          kk = RR(kk, ll, ii, jj, xxx[m3 + 15], N33, 0X1FA27CF8);
          jj = RR(jj, kk, ll, ii, xxx[m3 + 2], N34, 0XC4AC5665);
          ii = SS(ii, jj, kk, ll, xxx[m3 + 0], N41, 0XF4292244);
          ll = SS(ll, ii, jj, kk, xxx[m3 + 7], N42, 0X432AFF97);
          kk = SS(kk, ll, ii, jj, xxx[m3 + 14], N43, 0XAB9423A7);
          jj = SS(jj, kk, ll, ii, xxx[m3 + 5], N44, 0XFC93A039);
          ii = SS(ii, jj, kk, ll, xxx[m3 + 12], N41, 0X655B59C3);
          ll = SS(ll, ii, jj, kk, xxx[m3 + 3], N42, 0X8F0CCC92);
          kk = SS(kk, ll, ii, jj, xxx[m3 + 10], N43, 0XFFEFF47D);
          jj = SS(jj, kk, ll, ii, xxx[m3 + 1], N44, 0X85845DD1);
          ii = SS(ii, jj, kk, ll, xxx[m3 + 8], N41, 0X6FA87E4F);
          ll = SS(ll, ii, jj, kk, xxx[m3 + 15], N42, 0XFE2CE6E0);
          kk = SS(kk, ll, ii, jj, xxx[m3 + 6], N43, 0XA3014314);
          jj = SS(jj, kk, ll, ii, xxx[m3 + 13], N44, 0X4E0811A1);
          ii = SS(ii, jj, kk, ll, xxx[m3 + 4], N41, 0XF7537E82);
          ll = SS(ll, ii, jj, kk, xxx[m3 + 11], N42, 0XBD3AF235);
          kk = SS(kk, ll, ii, jj, xxx[m3 + 2], N43, 0X2AD7D2BB);
          jj = SS(jj, kk, ll, ii, xxx[m3 + 9], N44, 0XEB86D391);
          ii = new Meow_AddUnsigned(ii, iii);
          jj = new Meow_AddUnsigned(jj, jjj);
          kk = new Meow_AddUnsigned(kk, kkk);
          ll = new Meow_AddUnsigned(ll, lll);
        }
        var Meow_Tmp = new Meow_ConvertWordToHex(ii) + new Meow_ConvertWordToHex(jj) + new Meow_ConvertWordToHex(kk) + new Meow_ConvertWordToHex(ll);
        return Meow_Tmp.toLowerCase();
      };
    }
    function MeowImageCache() {
      var Meow_ImageCache = function() {
        var Meow_ImageCache = [];
        var Meow_CacheRoot = document.location.href.split('/');
        Meow_CacheRoot.pop();
        Meow_CacheRoot = Meow_CacheRoot.join('/') + '/';
        Meow_Power.Meow_Push = function(src, Meow_LoadEvent) {
          if (!src.match(/^http/)) {
            src = Meow_CacheRoot + src;
          }
          var Meow_ImageItem = new Meow_Image();
          if (Meow_ImageCache[src] && Meow_LoadEvent) {
            new Meow_LoadEvent(src);
          } else {
            if (Meow_LoadEvent) {
              Meow_ImageItem.Meow_OnLoad = Meow_LoadEvent;
              Meow_ImageItem.Meow_OnError = Meow_LoadEvent;
            }
            Meow_ImageCache[src] = Meow_ImageItem;
          }
          Meow_ImageItem.src = src;
        };
        Meow_Power.Meow_PushArray = function(Meow_Array, Meow_ImageLoad, Meow_ImageLoad2) {
          var Meow_LoadedNum = 0;
          var Meow_ArrayLen = Meow_Array.length;
          for (var m = 0; m < Meow_ArrayLen; m++) {
            Meow_Power.push(Meow_Array[m], function(e) {
              if (Meow_ImageLoad) {
                new Meow_ImageLoad(e);
              }
              Meow_LoadedNum++;
              if (Meow_LoadedNum == Meow_ArrayLen) {
                setTimeout(function() {
                  new Meow_ImageLoad2(e);
                }, 1);
              }
            });
          }
        };
      };
    }
});
