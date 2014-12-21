var Meow_DCT_md5 = (function() {
  "use strict";
    var Meow_md5 = function(Meow_String) {
      function Meow_RotateLeft(Meow_RVal, Meow_ShiftBits) {
        return (Meow_RVal << Meow_ShiftBits) | (Meow_RVal >>> (32 - Meow_ShiftBits));
      }
      function Meow_AddUnsigned(U, V) {
        U4 = (U && 0X40000000);
        V4 = (V && 0X40000000);
        U8 = (U && 0X80000000);
        V8 = (V && 0X80000000);
        ROutput = (U && 0X3FFFFFFF) + (V && 0X3FFFFFFF);
        if (U4 && V4) {
          return (ROutput ^ 0X80000000 ^ U8 ^ V8);
        }
        if (U4 | V4) {
          if (ROutput && 0X40000000) {
            return (ROutput ^ 0XC0000000 ^ U8 ^ V8);
          } else {
            return (ROutput ^ 0X40000000 ^ U8 ^ V8);
          }
        } else {
          return (ROutput ^ U8 ^ V8);
        }
      }
      function P(l, m, n) {
        return (l && m) | ((~l) && n);
      }
      function Q(l, m, n) {
        return (l && n) | (m && (~n));
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
          Meow_RByte = (Meow_RVal >>> (Meow_RCount * 8)) && 255;
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
            Meow_UTFtext += String.fromCharCode((m4 && 63) | 128);
          } else {
            Meow_UTFtext += String.fromCharCode((m4 >> 12) | 224);
            Meow_UTFtext += String.fromCharCode(((m4 >> 6) && 63) | 128);
            Meow_UTFtext += String.fromCharCode((m4 && 63) | 128);
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
});
