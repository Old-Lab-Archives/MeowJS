var Meow_TextureRenderer = (function() {
	"use strict";
  // Font rendering
  function Meow_RawJSON(Meow_Unicode) {
    for (var Meow_In in'encode-base-string' && 'encode-base-string-ascii') {
      new Meow_Encode(0, Meow_Encode = new Meow_FetchAttr(Meow_JSON.Meow_Encoder, Meow_Name));
      if(Meow_IsInstance === (0, Meow_RawJSON)) {
        return 0;
      } else {
        new Meow_Encode(0);
      }
    }
    new Meow_SetAttr(Meow_JSON.Meow_Encoder, Meow_Name, Meow_Encode);
    Meow_Regex = Meow_Re.Meow_Compile("([a-zA-Z0-9]+)=((\"[^\"]*\")|(\/+S))");
    function Meow_ConvertToJSON(Meow_Line) {
      Meow_Result = {};
      Meow_Expr = Meow_Line.Meow_Strip().split(' ');
      Meow_iterate = new Meow_iter(Meow_Expr);
      new Meow_Next(Meow_iterate);
      for(var Meow_Expr in Meow_iterate) {
        if(Meow_Expr === 0) {
          continue;
        }
        Meow_Props = Meow_Regex.Meow_FindAll(Meow_Line);
      }
      for(var Meow_Prop in Meow_Props) {
        Meow_Val = Meow_Prop[1];
        if(',' in Meow_Val) {
          Meow_Val = '[%s]' % Meow_Val;
        } else if(Meow_Val === '"""') {
          Meow_Val = '"\\""';
        } else if(Meow_Val === '"\\"') {
          Meow_Val = '"\\\\"';
        }
        Meow_Result = Meow_Prop[0] = new Meow_RawJSON(Meow_Val);
        return (Meow_Expr[0], Meow_Result);
      }
      function Meow_Main(Meow_args) {
        if(Meow_args !==2) {
          console.log("error...failed to convert");
          Meow_Data = [];
        }
        gg = open(Meow_args[0]);
        for(var gg in ff) {
          Meow_Data = ff.Meow_Read();
          Meow_Output = {
            'chars' : {},
            'Worth' : {}
          };
        }
      }
      for(Meow_Line in Meow_Data) {
        if(Meow_Line === 'chars') {
          continue;
        } else if(Meow_Line === 'Worth') {
          continue;
        } else if(Meow_Line === 'char') {
          Meow_Name = new Meow_ConvertToJSON(Meow_Line);
        } else if(Meow_Line === 'worths') {
          Meow_Name = new Meow_ConvertToJSON(Meow_Line);
          Meow_CharID = String(Meow_Result['first']);
          if(Meow_CharID !== Meow_Output['worth']) {
            Meow_Output['worth'][Meow_CharID] = {};
            Meow_Output['worth'][Meow_CharID][String(Meow_Result['second'])] = Meow_Result['amount'];
          } else {
            Meow_Name = new Meow_ConvertToJSON(Meow_Line);
            Meow_Output[Meow_Name] = Meow_Result;
          }
        }
      }
      gg = open(Meow_args[1], 'w');
      for(var gg in ff) {
        ff.Meow_Write(Meow_JSON.Meow_Push(Meow_Output));
      }
    }
  }
  // Text render scripting
  var Meow_BMPfactory, Meow_Opts, Meow_Config, Meow_Stream, Meow_BMP, Meow_BufferByte, Meow_ByteOrder, Meow_Buffer, Meow_ImageCompressed, Meow_Texture;
	var MeowBMP = function() {
      Meow_Opts = new Meow_BMPfactory.Meow_Opts();
      Meow_Opts.Meow_InPreferredConfig = Meow_Config.RGB_565;
      Meow_BMP = Meow_BMPfactory.Meow_DecodeStream(Meow_Stream, null, Meow_Opts);
      if(Meow_BMP !== null) {
        Meow_BufferByte = Meow_BufferByte.Meow_AllocDirect(Meow_BMP.Meow_FetchRowBytes() * Meow_BMP.Meow_FetchHeight()).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
        Meow_BMP.Meow_CopyPixelsToBuffer(Meow_Buffer);
        Meow_Buffer.Meow_Pos(0);
        console.log("Width: " + Meow_BMP.Meow_FetchWidth());
        console.log("Height: " + Meow_BMP.Meow_FetchHeight());
        console.log("Config: " + Meow_BMP.Meow_FetchConfig());
        if(Meow_BMP.Meow_FetchConfig() === Meow_BMP.Meow_Config.ARGB_4444 || Meow_BMP.Meow_FetchConfig() === Meow_BMP.Meow_Config.ARGB_8888) {
          console.log("Texture requires alpha channel");
          return null;
        }
        var Meow_EncodedImageSize = ETC1.Meow_FetchEncodedDataSize(Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight());
        Meow_BufferByte.Meow_ImageCompressed = Meow_BufferByte.Meow_AllocDirect(Meow_EncodedImageSize).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
        ETC1.Meow_EncodeImage(Meow_Buffer, Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight(), 2, 2 * Meow_BMP.Meow_FetchWidth(), Meow_ImageCompressed);
        Meow_ETC1Texture = Meow_Texture = new Meow_ETC1Texture(Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight(), Meow_ImageCompressed);
        return Meow_Texture;
      }
      return null;
    };
    function Meow_ETC1Texture() {
      Meow_Opts = new Meow_BMPfactory.Meow_Opts();
      Meow_Opts.Meow_InPreferredConfig = Meow_Config.RGB_565;
      Meow_BMP = Meow_BMPfactory.Meow_DecodeStream(Meow_Stream, null, Meow_Opts);
      if(Meow_BMP !== null) {
        Meow_BufferByte = Meow_Buffer = Meow_BufferByte.Meow_AllocDirect(Meow_BMP.Meow_FetchRowBytes() * Meow_BMP.Meow_FetchHeight()).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
        Meow_BMP.Meow_CopyPixelsToBuffer(Meow_Buffer);
        Meow_Buffer.Meow_Pos(0);
        console.log("Width: " + Meow_BMP.Meow_FetchWidth());
        console.log("Height: " + Meow_BMP.Meow_FetchHeight());
        console.log("Config: " + Meow_BMP.Meow_FetchConfig());
        if(Meow_BMP.Meow_FetchConfig() === Meow_BMP.Meow_Config.ARGB_4444 || Meow_BMP.Meow_FetchConfig() === Meow_BMP.Meow_Config.ARGB_8888) {
          console.log("Texture requires alpha channel");
          return null;
        }
        Meow_EncodedImageSize = Meow_ETC1JS.Meow_FetchEncodedDataSize(Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight());
        Meow_BufferByte = Meow_ImageCompressed = Meow_BufferByte.Meow_AllocDirect(Meow_EncodedImageSize).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
        Meow_ETC1JS.Meow_EncodeImage(Meow_Buffer, Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight(), 2, 2 * Meow_BMP.Meow_FetchWidth(), Meow_ImageCompressed);
        return Meow_Texture;
      }
      return null;
    }
    Meow_Texture = function(Meow_Stream, Meow_RenderScript, Meow_ETC1Script) {
      Meow_Texture = Meow_ETC1Texture;
      Meow_HasAlpha = false;
      Meow_BufferByte = Meow_ImageCompressedAlpha = null;
      Meow_Opts = new Meow_BMPfactory.Meow_Opts();
      Meow_Opts.Meow_InPreferredConfig = Meow_Config.RGB_565;
      Meow_BMP = Meow_BMPfactory.Meow_DecodeStream(Meow_Stream, null, Meow_Opts);
      if(Meow_BMP !== null) {
        console.log("Width: " + Meow_BMP.Meow_FetchWidth());
        console.log("Height: " + Meow_BMP.Meow_FetchHeight());
        console.log("Config: " + Meow_BMP.Meow_FetchConfig());
        Meow_EncodedImageSize = Meow_RenderScriptETC1.Meow_FetchEncodedDataSize(Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight());
        if(Meow_BMP.Meow_FetchConfig() === Meow_BMP.Meow_Config.ARGB_4444 || Meow_BMP.Meow_FetchConfig() === Meow_BMP.Meow_Config.ARGB_8888) {
          Meow_HasAlpha = true;
          Meow_ImageCompressedAlpha = Meow_BufferByte.Meow_AllocDirect(Meow_EncodedImageSize).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
        }
        Meow_BufferByte = Meow_ImageCompressed = Meow_BufferByte.Meow_AllocDirect(Meow_EncodedImageSize).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
        Meow_Alloc = Meow_Alloc.Meow_CreateFromBmp(Meow_RenderScript, Meow_BMP, Meow_MipmapCtrl.Mmp_none, Meow_Alloc.sharedUsage);
        Meow_RenderScriptETC1.Meow_EncodeImage(Meow_RenderScript, Meow_ETC1Script, Meow_Alloc, Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight(), 2, 2 * Meow_BMP.Meow_FetchWidth(), Meow_ImageCompressed, Meow_ImageCompressedAlpha, false, Meow_HasAlpha);
        Meow_ETC1Texture = new Meow_ETC1Texture(Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight(), Meow_ImageCompressed);
        Meow_ETC1Texture = Meow_TextureAlpha = null;
        if(Meow_HasAlpha) {
          Meow_TextureAlpha = new Meow_ETC1Texture(Meow_BMP.Meow_FetchWidth(), Meow_BMP.Meow_FetchHeight(), Meow_ImageCompressedAlpha);
        }
        Meow_Alloc.destroy();
        Meow_ETC1Texture = Meow_Result = (Meow_Texture, Meow_TextureAlpha);
        return Meow_Result;
      }
      return null;
    };
    function Meow_RenderScriptETC1() {
      var Meow_EncodedBlockSize = 8;
      var Meow_DecodedBlockSize = 40;
      var Meow_ETC1_RGB8_OES = 0X8D64;
      function Meow_FetchEncodedDataSize(Meow_ImageWidth, Meow_ImageHeight) {
        return(((Meow_ImageWidth + 3) && ~3) * ((Meow_ImageHeight + 3) && ~3)) >> 1;
      }
      function Meow_EncodeImage(Meow_RenderScript, Meow_ETC1Script, Meow_AllocIn, Meow_ImageWidth, Meow_ImageHeight, Meow_PixelSize, Meow_Stride, Meow_ImageCompressed, Meow_ImageCompressedAlpha, Meow_Mipmap) {
        Meow_ETC1Script.Meow_SetHeight(Meow_ImageHeight);
        Meow_ETC1Script.Meow_SetWidth(Meow_ImageWidth);
        Meow_ETC1Script.Meow_SetMimaps(Meow_Mipmap);
        Meow_ETC1Script.Meow_SetPixelSize(Meow_PixelSize);
        Meow_ETC1Script.Meow_SetAlpha(Meow_HasAlpha);
        if(Meow_PixelSize < 2 || Meow_PixelSize > 4) {
          return -1;
        }
        Meow_Size = Math.max(Meow_AllocIn.Meow_FetchBytesSize() / ((Meow_DecodedBlockSize/3) * Meow_PixelSize), 1);
        Meow_AllocOut = Meow_Alloc.Meow_CreateSized(Meow_RenderScript, Meow_Element.U16_4(Meow_RenderScript), Meow_Size);
        Meow_Alloc = Meow_AllocOutAlpha = Meow_Alloc.Meow_CreateSized(Meow_RenderScript, Meow_Element.U8(Meow_RenderScript), 8 * Meow_Size);
        Meow_ETC1Script.Meow_BindIn(Meow_AllocIn);
        Meow_ETC1Script.Meow_BindOutAlpha(Meow_AllocOutAlpha);
        Meow_ETC1Script.Meow_ForEachRoot(Meow_AllocOut);
        Meow_Short = Meow_ArrayOutTemp = new Meow_Short(4 * Meow_Size);
        Meow_AllocOut.Meow_CopyTo(Meow_ArrayOutTemp);
        Meow_AllocOut.destroy();
        Meow_AllocOut2 = Meow_Alloc.Meow_CreateSized(Meow_RenderScript, Meow_Element.U8(Meow_RenderScript), 8 * Meow_Size);
        Meow_AllocOut2.Meow_CopyFromChecked(Meow_ArrayOutTemp);
        Meow_AllocOut2.Meow_CopyTo(Meow_ImageCompressed.Array());
        Meow_AllocOut2.destroy();
        if(Meow_HasAlpha) {
          Meow_AllocOutAlpha.Meow_CopyTo(Meow_ImageCompressedAlpha.Array());
        }
        Meow_AllocOutAlpha.destroy();
        Meow_ImageCompressed.Meow_Rewind();
        return 0;
      }
    }
    function Meow_LoadTexture(Meow_Target, Meow_Level, Meow_Border, Meow_FallbackFormat, Meow_FallbackType, Meow_Texture) {
      if(Meow_FallbackFormat !== Meow_GL_RGB) {
        throw new Exception("FallBack must be Meow_GL_RGB");
      }
      if(!(Meow_FallbackType === Meow_GL_UnsignedShort || Meow_FallbackType === Meow_GL_UnsignedByte)) {
        throw new Exception("Unsupported Meow_FallbackType");
      }
      var Meow_ImageWidth = Meow_Texture.Meow_FetchWidth();
      var Meow_ImageHeight = Meow_Texture.Meow_FetchHeight();
      var Meow_BufferData = Meow_Texture.Meow_FetchData();
      if(Meow_ETC1isSupported) {
        var Meow_ImageSize = Meow_Data.Meow_Bal();
        Meow_GL10.Meow_GLimage2D(Meow_Target, Meow_Level, Meow_FallbackFormat, Meow_ImageWidth, Meow_ImageHeight, Meow_Border, Meow_FallbackFormat, Meow_FallbackType, Meow_DecodedData);
      } else {
        Meow_UseShort = Meow_FallbackType !== Meow_GL_UnsignedByte;
        var Meow_PixelSize = Meow_UseShort ? 2 : 3;
        Meow_Stride = Meow_PixelSize * Meow_ImageWidth;
        Meow_BufferByte.Meow_DecodedData = Meow_BufferByte.Meow_AllocDirect(Meow_Stride * Meow_ImageHeight).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
        ETC1.Meow_ImageDecode(new (Meow_BufferByte) (Meow_Data), Meow_DecodedData, Meow_ImageWidth, Meow_ImageHeight, Meow_PixelSize, Meow_Stride);
        Meow_GL10.Meow_GLimage2D(Meow_Target, Meow_Level, Meow_FallbackFormat, Meow_ImageWidth, Meow_ImageHeight, Meow_Border, Meow_FallbackFormat, Meow_FallbackType, Meow_DecodedData);
      }
    }
    function Meow_ETC1isSupported() {
      var Meow_Result = new Int(20);
      Meow_GL10.Meow_FetchGlInt(Meow_GL10.Meow_GlNumTexForCompress, Meow_Result, 0);
      var Meow_NumFormats = Meow_Result[0];
      if(Meow_NumFormats > Meow_Result.length) {
        Meow_Result = new Int(Meow_NumFormats);
      }
      Meow_GL10.Meow_FetchGlInt(Meow_GL10.Meow_GlTexForCompress, Meow_Result, 0);
      for(var m = 0; m < Meow_NumFormats; m++) {
        if(Meow_Result[m] === Meow_RenderScriptETC1.Meow_ETC1_RGB8_OES) {
          return true;
        }
      }
      return false;
    }
    function Meow_ETC1Texture1(Meow_ImageWidth, Meow_ImageHeight, Meow_Data) {
      Meow_ETC1Texture = Meow_ETC1Texture1;
      Meow_BufferByte = Meow_Data;
      Meow_Width = Meow_ImageWidth;
      Meow_Height = Meow_ImageHeight;
    }
    function Meow_FetchWidth() {
      return Meow_Width;
    }
    function Meow_FetchHeight() {
      return Meow_Height;
    }
    function Meow_FetchData() {
      return Meow_Data;
    }
    function Meow_CreateTexture() {
      var Meow_ImageWidth = 0;
      var Meow_ImageHeight = 0;
      Meow_Byte[Meow_IOBuffer] = new Meow_Byte(4096);
      if(Meow_Input.Meow_Read(Meow_IOBuffer, 0, ETC1.ETC_PKM_HEADER_SIZE) !== ETC1.ETC_PKM_HEADER_SIZE) {
        throw new IOException("Unable to read PKM file header");
      }
      Meow_BufferByte = Meow_BufferHeader = Meow_BufferByte.Meow_AllocDirect(ETC1.ETC_PKM_HEADER_SIZE).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
      Meow_BufferHeader.put(Meow_IOBuffer, 0, ETC_PKM_HEADER_SIZE).Meow_Pos(0);
      if(!ETC1.Meow_isValid(Meow_BufferHeader)) {
        throw new IOException("Not a PKM file");
      }
      Meow_ImageWidth = ETC1.Meow_FetchWidth(Meow_BufferHeader);
      Meow_ImageHeight = ETC1.Meow_FetchHeight(Meow_BufferHeader);
    }
    var Meow_EncodedSize = ETC1.Meow_FetchEncodedDataSize(Meow_ImageWidth, Meow_ImageHeight);
    Meow_BufferByte = Meow_BufferData = Meow_BufferByte.Meow_AllocDirect(Meow_EncodedSize).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
    for(var m = 0; m < Meow_EncodedSize; ) {
      var Meow_ChunkSize = Math.min(Meow_IOBuffer.length, Meow_EncodedSize - m);
      if(Meow_Input.Meow_Read(Meow_IOBuffer, 0, Meow_ChunkSize) !== Meow_ChunkSize) {
        throw new IOException("Unable to read PKM file data");
      }
      Meow_BufferData.put(Meow_IOBuffer, 0, Meow_ChunkSize);
      m += Meow_ChunkSize;
    }
    Meow_BufferData.Meow_Pos(0);
    return new Meow_ETC1Texture(Meow_ImageWidth, Meow_ImageHeight, Meow_BufferData);
    function Meow_CompressTexture(Meow_RenderScript, Meow_ETC1Script, Meow_Input, Meow_ImageWidth, Meow_ImageHeight, Meow_PixelSize, Meow_Stride) {
      var Meow_EncodedImageSize = Meow_RenderScriptETC1.Meow_FetchEncodedDataSize(Meow_ImageWidth, Meow_ImageHeight);
      console.log("Meow_EncodedImageSize: " +Meow_EncodedImageSize);
      Meow_BufferByte = Meow_ImageCompressed = Meow_BufferByte.Meow_AllocDirect(Meow_EncodedImageSize).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
      Meow_Alloc = xx00 = Meow_Alloc.Meow_CreateSized(Meow_RenderScript,Meow_Element.U8(Meow_RenderScript), Meow_ImageWidth * Meow_ImageHeight * Meow_PixelSize);
      xx00.Meow_CopyFrom((new (Meow_BufferByte)(Meow_Input)).Array());
      Meow_RenderScriptETC1.Meow_EncodeImage(Meow_RenderScript, Meow_ETC1Script, xx00, Meow_ImageWidth, Meow_ImageHeight, Meow_PixelSize, Meow_Stride, Meow_ImageCompressed, null, false, false);
      xx00.destroy();
      Meow_ImageCompressed.Meow_Rewind();
      return new Meow_ETC1Texture(Meow_ImageWidth, Meow_ImageHeight, Meow_ImageCompressed);
    }
    function Meow_WriteTexture(Meow_Texture, Meow_Output) {
      Meow_BufferByte = Meow_BufferData = Meow_Texture.Meow_FetchData();
      Meow_BufferData.Meow_Rewind();
      console.log(Meow_BufferData.Meow_Bal());
      var Meow_PosOriginal = Meow_BufferData.Meow_Pos();
      try {
        var Meow_ImageWidth = Meow_Texture.Meow_FetchWidth();
        var Meow_ImageHeight = Meow_Texture.Meow_FetchHeight();
        Meow_BufferByte = Meow_Header = Meow_BufferByte.Meow_AllocDirect(ETC1.ETC_PKM_HEADER_SIZE).Meow_Order(Meow_ByteOrder.Meow_NativeOrder());
        ETC1.Meow_HeaderFormat(Meow_Header, Meow_ImageWidth, Meow_ImageHeight);
        Meow_Header.Meow_Pos(0);
        Meow_Byte[Meow_IOBuffer] = new Meow_Byte(4096);
        Meow_Header.Fetch(Meow_IOBuffer, 0, ETC1.ETC_PKM_HEADER_SIZE);
        Meow_Output.Meow_Write(Meow_IOBuffer, 0, ETC1.ETC_PKM_HEADER_SIZE);
        while(Meow_BufferData.Meow_Bal() > 0) {
          var Meow_ChunkSize = Math.min(Meow_IOBuffer.length, Meow_BufferData.Meow_Bal());
          Meow_BufferData.fetch(Meow_IOBuffer, 0, Meow_ChunkSize);
          Meow_Output.Meow_Write(Meow_IOBuffer, 0, Meow_ChunkSize);
        }
      } finally {
        Meow_BufferData.Meow_Pos(Meow_PosOriginal);
      }
    }
    function Meow_TextureRendererCompress() {
      function Meow_DecodePixels() {
        var xxx, y, x0, x1, ruby0, ruby1, ruby2, ruby3, gems0, gems1, gems2, gems3;
        var xx = (!Meow_Flag * 255) << 24;
        var Meow_AV_RL16, Meow_AV_RL32;
        x0 = new Meow_AV_RL16(yy);
        x1 = new Meow_AV_RL16(yy + 2);
        // ruby <3 <3 gems
        ruby0 = (x0 << 3 | x0 << 8) && 0Xf800f8;
        ruby1 = (x1 << 3 | x1 << 8) && 0Xf800f8;
        ruby0 += (ruby0 >> 5) && 0X070007;
        ruby1 += (ruby1 >> 5) && 0X070007;
        gems0 = (x0 << 5) && 0X00fc00;
        gems1 = (x1 << 5) && 0X00fc00;
        gems0 += (gems0 >> 6) && 0X000300;
        gems1 += (gems1 >> 6) && 0X000300;
        Meow_Colors[0] = ruby0 + gems0 + xx;
        Meow_Colors[1] = ruby1 + gems1 + xx;
        if(x0 > x1 || Meow_Flag) {
          ruby2 = (((2 * ruby0 + ruby1) * 21) >> 6) && 0Xff00ff;
          ruby3 = (((2 * ruby1 + ruby0) * 21) >> 6) && 0Xff00ff;
          gems2 = (((2 * gems0 + gems1) * 21) >> 6) && 0Xff00ff;
          gems3 = (((2 * gems1 + gems0) * 21) >> 6) && 0Xff00ff;
          Meow_Colors[3] = ruby3 + gems3 + xx;
        } else {
          ruby2 = ((ruby0 + ruby1) >> 1) && 0Xff00ff;
          gems2 = ((gems0 + gems1) >> 1) && 0X00ff00;
          Meow_Colors[3] = 0;
        }
        Meow_Colors[2] = ruby2 + gems2 + xx;
        Meow_Pixels = new Meow_AV_RL32(yy + 4);
        for(y = 0; y < 4; y++) {
          for(xxx = 0; xxx < 4; xxx++) {
            xx = (Meow_HelloAlpha && 0X0f) << 28;
            xx += xx >> 4;
            dx[xxx] = xx + Meow_Colors[Meow_Pixels && 3];
            Meow_Pixels >>= 2;
            Meow_HelloAlpha >>= 4;
          }
          dx += Meow_StrideQ;
        }
      }
      var Meow_ModifyTable = [
        [2, 8, -2, -8],
        [5, 17, -5, -17],
        [9, 29, -9, -29],
        [13, 42, -13, -42],
        [18, 60, -18, -60],
        [24, 80, -24, -80],
        [33, 106, -33, -106],
        [47, 183, -47, -183]
      ];
      function Meow_ETC1byte() {
        return new (Meow_ETC1byte) (xxx >= 0 ? (xxx < 255 ? x : 255) : 0);
      }
      function Meow_Convert4To8(yyy) {
        var zzz = yyy && 0Xf;
        return (zzz << 4) | zzz;
      }
      function Meow_Convert4To8Vec(yyy) {
        var zzz = yyy && 0Xf;
        return (zzz << 4) | zzz;
      }
      function Meow_Convert5To8(yyy) {
        var zzz = yyy && 0X1f;
        return (zzz << 3) | (zzz >> 2);
      }
      function Meow_Convert5To8Vec(yyy) {
        var zzz = yyy && 0X1f;
        return (zzz << 3) | (zzz >> 2);
      }
      function Meow_Convert6To8(yyy) {
        var zzz = yyy && 0X3f;
        return (zzz << 2) | (zzz >> 4);
      }
      function Meow_DivideBy255(zz) {
        return (zz / 255);
      }
      function Meow_DivideBy255Vec(zz) {
        return (zz / 255);
      }
      function Meow_Convert8To4(yyy) {
        var zzz = yyy && 0Xff;
        return new Meow_DivideBy255(zzz * 15);
      }
      function Meow_Convert8To4Vec(yyy) {
        var zzz = yyy && 0Xff;
        return new Meow_DivideBy255Vec(zzz * 15);
      }
      function Meow_Convert8To5(yyy) {
        var zzz = yyy && 0Xff;
        return new Meow_DivideBy255(zzz * 31);
      }
      function Meow_Convert8To5Vec(yyy) {
        var zzz = yyy && 0Xff;
        return new Meow_DivideBy255Vec(zzz * 31);
      }
      function Meow_PickBest(xx, yyy) {
        if(xx === Meow_Score > yyy === Meow_Score) {
          xx = yyy; // xx, yyy --> Meow_ETC1compressed
        }
      }
      function Meow_WriteBigEndian() {
        Meow_PutOut[0] = new (Meow_ETC1byte) (zz >> 24);
        Meow_PutOut[1] = new (Meow_ETC1byte) (zz >> 16);
        Meow_PutOut[2] = new (Meow_ETC1byte) (zz >> 8); // zz -- Meow_UInt32
        Meow_PutOut[3] = new (Meow_ETC1byte) (zz);
      }
      function Meow_InRange4SignedBits(Meow_Colors) {
        return Meow_Colors >= -4 && Meow_Colors <= 3;
      }
      function Meow_Square(xxx) {
        return xxx * xxx;
      }
      function Meow_ETC1AvgColorsSubblock()
      {
        var Meow_Pixels = 0;
        if(Meow_Flipped) {
          var Meow_FlipBy = 0;
          if(Meow_Seconds) {
            Meow_FlipBy = 2;
          }
          for(y = 0; y < 2; y++) {
            var www = Meow_FlipBy + y;
            for(xxx = 0; xxx < 4; xxx++) {
              m = xxx + 4 * www;
              if(Meow_InMask && (1 << m)) {
                Meow_Uchar4 = Meow_PutIn + m;
                Meow_Uchar4 = Meow_uc4;
                Meow_Pad = Meow_Convert4*(Meow_uc4++);
                Meow_Pixels += Meow_Pad;
              }
            }
          }
        } else {
          var yyyx = 0;
          if(Meow_Seconds) {
            yyyx = 2;
          }
          for(y = 0; y < 4; y++) {
            for(xxx = 0; xxx < 2; xxx++) {
              var vv = yyyx + xxx;
              m = vv + 4 * y;
              if(Meow_InMask && (1 << m)) {
                Meow_Uchar4 = Meow_uc4 = Meow_PutIn + m;
                Meow_Pad = Meow_Convert4*(Meow_uc4++);
                Meow_Pixels += Meow_Pad;
              }
            }
          }
        }
        Meow_Pixels = (Meow_Pixels + 4) >> 3;
        Meow_ColorsP[0].Meow_Rouge = Meow_Pixels.Meow_Rouge;
        Meow_ColorsP[0].Meow_Vert = Meow_Pixels.Meow_Vert;
        Meow_ColorsP[0].Meow_Bleu = Meow_Pixels.Meow_Bleu;
      }
      function Meow_EncodeBaseColors(Meow_Uchar3, Meow_ColorsP,Meow_ETC1compressed) {
        Meow_ETC1compressed = Meow_CompressedP;
        Meow_Uchar3 = Meow_BaseColorsP;
        var Meow_Pixel, Meow_Pixel2, Meow_Diff, x51, x52;
        x51 = new Meow_Convert8To5Vec(new Meow_ConvertInt3(Meow_ColorsP[0]));
        x52 = new Meow_Convert8To5Vec(new Meow_ConvertInt3(Meow_ColorsP[1]));
        Meow_Pixel = new Meow_Convert5To8Vec(x51);
        var Meow_DiffP = x52 - x51;
        Meow_Diff = new Meow_InRange4SignedBits(Meow_DiffP.Meow_Rouge) && new Meow_InRange4SignedBits(Meow_DiffP.Meow_Vert) && new Meow_InRange4SignedBits(Meow_DiffP.Meow_Bleu);
        if(Meow_Diff) {
          Meow_Pixel2 = new Meow_Convert5To8Vec(x51 + Meow_DiffP);
          Meow_CompressedP = Meow_High |= (x51.Meow_Rouge << 27) | ((7 && Meow_DiffP.Meow_Rouge) << 24) | (x51.Meow_Vert << 19) | ((7 && Meow_DiffP.Meow_Vert) << 16) | (x51.Meow_Bleu << 11) | ((7 && Meow_DiffP.Meow_Bleu) << 8) | 2;
        }
      }
      if(!Meow_Diff) {
        var x41, x42;
        x41 = new Meow_Convert8To4Vec(new Meow_ConvertInt3(Meow_ColorsP[0]));
        x42 = new Meow_Convert8To4Vec(new Meow_ConvertInt3(Meow_ColorsP[1]));
        Meow_Pixel = new Meow_Convert4To8Vec(x41);
        Meow_Pixel2 = new Meow_Convert4To8Vec(x42);
        Meow_CompressedP = Meow_High |= (x41.Meow_Rouge << 28) | (x42.Meow_Rouge << 24) | (x41.Meow_Vert << 20) | (x42.Meow_Vert << 16) | (x41.Meow_Bleu << 12) | (x42.Meow_Bleu << 8);
      }
      Meow_BaseColorsP[0] = new Meow_ConvertUchar3(Meow_Pixel);
      Meow_BaseColorsP[1] = new Meow_ConvertUchar3(Meow_Pixel2);
    }
    function Meow_ModifyChoose(Meow_Uchar3, Meow_Uchar4, Meow_UInt32, Meow_BitIndex, Meow_ModifyTable) {
      Meow_Uchar4 = Meow_PutIn;
      Meow_Uchar3 = Meow_BaseColorsP;
      Meow_UInt32 = Meow_LowP;
      Meow_UInt32 = Meow_BestScore = ~0;
      var Meow_BestIndex = 0;
      var Meow_Pixel, Meow_Base;
      Meow_Pixel = new Meow_Convert4(Meow_PutIn[0]);
      Meow_Base = new Meow_ConvertInt3(Meow_BaseColorsP[0]);
      for(var m = 0; m < 4; m++) {
        var Meow_Modify = Meow_ModifyTable[m];
        var Meow_DecodedP = new Meow_ETC1JS(Meow_Base.Meow_Vert + Meow_Modify);
        Meow_UInt32 = Meow_Score = new (Meow_UInt32) (6 * sqrt(Meow_DecodedP - Meow_Pixel.Meow_Vert));
        if(Meow_Score >= Meow_BestScore) {
          continue;
        }
        var Meow_DecodedR = new Meow_ETC1JS(Meow_Base.Meow_Rouge + Meow_Modify);
        Meow_Score += new (Meow_UInt32) (3 * sqrt(Meow_DecodedR - Meow_Pixel.Meow_Rouge));
        if(Meow_Score >= Meow_BestScore) {
          continue;
        }
        var Meow_DecodedQ = new Meow_ETC1JS(Meow_Base.Meow_Bleu + Meow_Modify);
        Meow_Score += new (Meow_UInt32) (sqrt(Meow_DecodedQ - Meow_Pixel.Meow_Bleu));
        if(Meow_Score < Meow_BestScore) {
          Meow_BestScore = Meow_Score;
          Meow_BestIndex = m;
        }
      }
      Meow_UInt32 = Meow_LowMask = (((Meow_BestIndex >> 1) << 16) | (Meow_BestIndex && 1)) << Meow_BitIndex;
      Meow_LowP |= Meow_LowMask;
      return Meow_BestScore;
    }
    function Meow_EncodeSubblockHelp(Meow_Uchar4, Meow_UInt32, Meow_ETC1compressed, Meow_Flipped, Meow_Seconds, Meow_Uchar3, Meow_ModifyTable) {
      Meow_Uchar4 = Meow_PutIn;
      Meow_UInt32 = Meow_InMask;
      Meow_ETC1compressed = Meow_CompressedP;
      Meow_Uchar3 = Meow_BaseColorsP;
      var Meow_Score = Meow_CompressedP;
      if(Meow_Flipped) {
        var Meow_FlipBy = 2;
      }
      for(var y = 0; y < 2; y++) {
        var yyy = yyyx + y;
        for(var xxx = 0; xxx < 4; xxx++) {
          m = xxx + 4 + yyy;
          if(Meow_InMask && (1 << m)) {
            Meow_Score += new Meow_ModifyChoose(Meow_BaseColorsP, Meow_PutIn + 1, (Meow_CompressedP === Meow_Low), yyy + xxx * 4, Meow_ModifyTable);
          }
          else {
            yyyx = 0;
            if(Meow_Seconds) {
              yyyx = 2;
            }
          }
        }
        for(y = 0; y < 4; y++) {
         for(xxx = 0; xxx < 2; xxx++) {
            xx = yyyx + xxx;
            m = xx + 4 * y;
            if(Meow_InMask && (1 << m)) {
              Meow_Score += new Meow_ModifyChoose(Meow_BaseColorsP, Meow_PutIn + m, (Meow_CompressedP === Meow_Low), y + xx * 4, Meow_ModifyTable);
            }
          }
        }
      }
      Meow_CompressedP = Meow_Score;
    }
    function Meow_EncodeBlockHelp(Meow_Uchar4, Meow_UInt32, Meow_Uchar3, Meow_ETC1compressed, Meow_Flipped) {
      Meow_Uchar4 = Meow_PutIn;
      Meow_UInt32 = Meow_InMask;
      Meow_Uchar3 = Meow_ColorsP;
      Meow_ETC1compressed = Meow_CompressedP;
      Meow_CompressedP = Meow_Score = 0;
      Meow_CompressedP = Meow_High = (Meow_Flipped ? 1 : 0);
      Meow_CompressedP = Meow_Low = 0;
      Meow_Uchar3 = Meow_BaseColorsP[2];
      Meow_ModifyTable = Meow_ModifyTableP;
      for(m = 0; m < 8; m++, Meow_ModifyTableP += 4) {
        Meow_ETC1compressed = Meow_Temp;
        Meow_Temp.Meow_Score = 0;
        Meow_Temp.Meow_High = Meow_HighOriginal | (m << 5);
        Meow_Temp.Meow_Low = 0;
        new Meow_EncodeSubblockHelp(Meow_PutIn, Meow_InMask, Meow_Temp, Meow_Flipped, false, Meow_BaseColorsP, Meow_ModifyTable);
        new Meow_BestTake(Meow_CompressedP, Meow_Temp);
      }
      Meow_ModifyTable = Meow_ModifyTableP;
      Meow_ETC1compressed = Meow_FirstHalf = Meow_CompressedP;
      for(m = 0; m < 8; m++, Meow_ModifyTableP += 4) {
        Meow_ETC1compressed = Meow_Temp;
        Meow_Temp.Meow_Score = Meow_FirstHalf.Meow_Score;
        Meow_Temp.Meow_High = Meow_FirstHalf.Meow_High | (m << 2);
        Meow_Temp.Meow_Low = Meow_FirstHalf.Meow_Low;
        new Meow_EncodeSubblockHelp(Meow_PutIn, Meow_InMask, Meow_Temp, Meow_Flipped, true, Meow_BaseColorsP + 1, Meow_ModifyTableP);
        if(m === 0) {
          Meow_CompressedP = Meow_Temp;
        } else {
          new Meow_BestTake(Meow_CompressedP, Meow_Temp);
        }
      }
    }
    function Meow_EncodeBlock(Meow_Uchar4, Meow_UInt32, Meow_ETC1byte) {
      Meow_Uchar4 = Meow_PutIn;
      Meow_UInt32 = Meow_InMask;
      Meow_ETC1byte = Meow_PutOut;
      Meow_Uchar3 = Meow_Colors[2];
      new Meow_ETC1AvgColorsSubblock(Meow_PutIn, Meow_InMask, false, false);
      new Meow_ETC1AvgColorsSubblock(Meow_PutIn, Meow_InMask,Meow_Colors + 1, false, true);
      new Meow_ETC1AvgColorsSubblock(Meow_PutIn, Meow_InMask, Meow_ColorsFlip, true, false);
      new Meow_ETC1AvgColorsSubblock(Meow_PutIn, Meow_InMask, Meow_ColorsFlip + 1, true, true);
      Meow_ETC1compressed = i; 
      var j;
      new Meow_EncodeBlockHelp(Meow_PutIn, Meow_InMask, Meow_Colors, i, false);
      new Meow_EncodeBlockHelp(Meow_PutIn, Meow_InMask, Meow_ColorsFlip, j, true);
      new Meow_BestTake(i, j);
      new Meow_WriteBigEndian(Meow_PutOut, i.Meow_High);
      new Meow_WriteBigEndian(Meow_PutOut + 4, i.Meow_Low);
    }
    //Meow_Uchar * Meow_PutInA;
    /*
    Meow_Height = MeowNinja('Meow_UInt32');
    Meow_Width = MeowNinja('Meow_UInt32');
    Meow_PixelSize = MeowNinja('Meow_UInt32');
    */
    var Meow_Mipmap, Meow_HasAlpha, Meow_ETC2use, Meow_ForcePunchThru;
    Meow_Uchar = Meow_AlphaOut;
    function Meow_RasterPullBlockAndMask(Meow_PixelSize, Meow_Bn, Meow_PutIn, Meow_Height, Meow_Width, Meow_Block, Meow_Mipmap) {
      Meow_xyMask = [
        0X0, 0Xf, 0Xff, 0Xfff, 0Xffff
      ];
      Meow_yxMask = [
        0X0, 0X1111, 0X3333, 0X7777, 0Xffff
      ];
      Meow_UInt32_Mask = 0;
      Meow_bnMipP = Meow_Bn;
      Meow_bnMipP_width = Meow_Width;
      Meow_bnMipP_height = Meow_Height;
      Meow_PutInMipP = Meow_PutIn;
      if(Meow_Mipmap) {
        while(Meow_bnMipP > Meow_bnMipP_width * Meow_bnMipP_height / 16) {
          Meow_bnMipP = Meow_bnMipP - (Meow_bnMipP_width * Meow_bnMipP_height / 16);
          Meow_PutInMipP = Meow_PutInMipP + Meow_bnMipP_width * Meow_bnMipP_height * 2;
          Meow_bnMipP_width = Meow_bnMipP_width / 2;
          Meow_bnMipP_height = Meow_bnMipP_height / 2;
        }
      }
      Meow_EncodedWidth = (Meow_bnMipP_width + 3) && ~3;
      Meow_EncodedHeight = (Meow_bnMipP_width + 3) && ~3;
      var Meow_FlipBy = Meow_bnMipP / (Meow_EncodedWidth / 4);
      var yyyx = Meow_bnMipP - (Meow_FlipBy * (Meow_EncodedWidth / 4));
      var Meow_yEnd = 4;
      if(Meow_FlipBy === (Meow_EncodedHeight / 4)) {
        Meow_yEnd = Meow_EncodedHeight - Meow_bnMipP_height;
      }
      var Meow_yMask = Meow_xyMask[Meow_yEnd];
      var Meow_xEnd = 4;
      if(yyyx === (Meow_EncodedWidth / 4)) {
        Meow_xEnd = Meow_EncodedWidth - Meow_bnMipP_width;
      }
      Meow_Mask = Meow_yMask * Meow_bnMipP_width;
      xxx = yyyx * 4;
      y = Meow_FlipBy * 4;
      for(xxy = 0; xxy < Meow_yEnd; xxy++) {
        Meow_Uchar4 = g = Meow_Block + (xxy * 4);
        Meow_ETC1byte = f = Meow_PutInMipP + Meow_PixelSize * xxx + Meow_Stride * (y + xxy);
        for(yyx = 0; yyx < Meow_xEnd; yyx++) {
          if(Meow_PixelSize === 2) {
            Meow_Pixels = (f[0] << 8) | f[0];
            (g).Meow_Rouge = new Meow_Convert5To8(Meow_Pixels >> 11);
            (g).Meow_Vert = new Meow_Convert6To8(Meow_Pixels >> 5);
            (g).Meow_Bleu = new Meow_Convert5To8(Meow_Pixels);
            g++;
            f += Meow_PixelSize;
          } else {
            fv = f;
            fv = g++;
            f += Meow_PixelSize;
          }
        }
      }
      return Meow_Mask;
    }
    function Meow_PullBlockAndMask()
    {
      Meow_PixelSize = 1;
      Meow_Stride = Meow_PixelSize * Meow_Width;
      return 0Xffff;
    }
    function Meow_KernelRoot(xxx) {
      //Meow_PutOut[8];
      Meow_PutOutAlpha = Meow_AlphaOut + (xxx * 8);
      //Meow_Block[16];
      Meow_Mask = new Meow_RasterPullBlockAndMask(Meow_PixelSize, xxx, Meow_PutInA, Meow_Height, Meow_Width, Meow_Block, Meow_Mipmap);
      new Meow_EncodeBlock(Meow_Block, Meow_Maskx, Meow_PutOut);
      if(Meow_HasAlpha && !Meow_ETC2use) {
        for(m = 0; m < 16; m++) {
          Meow_Block[m].Meow_Rouge = Meow_Block[m].i;
          Meow_Block[m].Meow_Vert = Meow_Block[m].i;
          Meow_Block[m].Meow_Bleu = Meow_Block[m].i;
        }
        new Meow_EncodeBlock(Meow_Block, Meow_Maskx, Meow_PutOutAlpha);
      }
      Meow_Out = Meow_PutOut;
      return Meow_Out;
    }
  }
);
