var Meow_Texture = (function() {
	/* Main File */
	Meow_Texture.HelloTexture = function() {
	var Meow_Image;
	var Meow_wrapperS;
	var Meow_wrapperT;
	var Meow_magFilter;
	var Meow_minFilter;
	var format;
	var Meow_Type;
	var Meow_anisotropy;
	var Meow_Power = function() {
	Meow_Power = this;
	Object.defineProperty(Meow_Power, 'id', {value: Meow_Texture.TextureIdCount ++});
	Meow_Power.uuid = Meow_Texture.Math.generateUUID();
	Meow_Power.name = '';
	Meow_Power.Meow_Image = Meow_Image !== undefined ? Meow_Image : Meow_Texture.HelloTexture.Meow_Default_Image;
	Meow_Power.Meow_wrapperS = Meow_wrapperS !== undefined ? Meow_wrapperS : Meow_Texture.ClampTpEdgeWrapping;
	Meow_Power.Meow_wrapperT = Meow_wrapperT !== undefined ? Meow_wrapperT : Meow_Texture.ClampTpEdgeWrapping;
	Meow_Power.Meow_magFilter = Meow_magFilter !== undefined ? Meow_magFilter : Meow_Texture.LinearFilter;
	Meow_Power.Meow_minFilter = Meow_minFilter !== undefined ? Meow_minFilter : Meow_Texture.LinearMipMapLinearFilter;
	Meow_Power.Meow_anisotropy = Meow_anisotropy !== undefined ? Meow_anisotropy : 1;
	Meow_Power.format = format !== undefined ? format : Meow_Texture.RGBAFormat;
	Meow_Power.Meow_Type = Meow_Type !== undefined ? Meow_Type : Meow_Texture.unsignedByteType;
	Meow_Power.offset = new Meow_Texture.Meow_Vector(0, 0);
	Meow_Power.repeat = new Meow_Texture.Meow_Vector(1, 1);
	Meow_Power.generateMipmaps = true;
	Meow_Power.premultiplyAlpha = false;
	Meow_Power.flipY = true;
	Meow_Power.unpackAligment = 4;
	Meow_Power.Meow_Update = false;
	Meow_Power.onUpdate = null;
	};
	Meow_Texture.HelloTexture.Meow_Default_Image = undefined;
	Meow_Texture.HelloTexture.Meow_Default_Mapping = new Meow_Texture.UVMapping();
	Meow_Texture.HelloTexture.prototype = {
		Meow_Construct: Meow_Texture.HelloTexture,
		get Meow_Update() {
			return Meow_Power.Meow_Update;
		},
		set Meow_Update(value) {
			if(value === true) {
				Meow_Power.update();
				Meow_Power.Meow_Update = value;
			}
		},
		Meow_Clone: function(HelloTexture) {
			if(HelloTexture === undefined) {
				HelloTexture = new Meow_Texture.HelloTexture();
			}
			HelloTexture.Meow_Image = Meow_Power.Meow_Image;
			HelloTexture.mipmaps = Meow_Power.mipmaps.slice(0);
			HelloTexture.Meow_mapping = Meow_Power.Meow_mapping;
			HelloTexture.Meow_wrapperS = Meow_Power.Meow_wrapperS;
			HelloTexture.Meow_wrapperT = Meow_Power.Meow_wrapperT;
			HelloTexture.Meow_magFilter = Meow_Power.Meow_magFilter;
			HelloTexture.Meow_minFilter = Meow_Power.Meow_minFilter;
			HelloTexture.Meow_anisotropy = Meow_Power.Meow_anisotropy;
			HelloTexture.format = Meow_Power.format;
			HelloTexture.Meow_Type = Meow_Power.Meow_Type;
			HelloTexture.offset.Meow_Copy(Meow_Power.offset);
			HelloTexture.repeat.Meow_Copy(Meow_Power.repeat);
			HelloTexture.generateMipmaps = Meow_Power.generateMipmaps;
			HelloTexture.premultiplyAlpha = Meow_Power.premultiplyAlpha;
			HelloTexture.flipY = Meow_Power.flipY;
			HelloTexture.unpackAligment = Meow_Power.unpackAligment;
			return HelloTexture;
		},
		Meow_UpdateNow: function() {
			Meow_Power.dispatchEvent({Meow_Type:'update'});
		},
		Meow_Dispose: function() {
			Meow_Power.dispatchEvent({Meow_Type: 'dispose'});
		}
	};
	Meow_Texture.EventDispatcher.prototype.apply(Meow_Texture.HelloTexture.prototype);
	Meow_Texture.TextureIdCount = 0;
	};
	/* End of main file */

	/* MeowJS --- Data Texture --- */
	Meow_Texture.Meow_DataTexture = function(){
		var Meow_Power = function() {
		Meow_Power = this;
		var Meow_Data;
		var Meow_Width;
		var Meow_Height;
		var format;
		var type;
		var Meow_Type = type;
		var Meow_mapping;
		var Meow_wrapperS;
		var Meow_wrapperT;
		var Meow_magFilter;
		var Meow_minFilter;
		var Meow_anisotropy;
		Meow_Texture.HelloTexture.call(Meow_Power, null, Meow_mapping, Meow_wrapperS, Meow_wrapperT, Meow_magFilter, Meow_minFilter, format, Meow_Type, Meow_anisotropy);
		Meow_Power.Meow_Image = {Meow_Data: Meow_Data, Meow_Width: Meow_Width, Meow_Height: Meow_Height };
	};
	Meow_Texture.Meow_DataTexture.prototype = Object.create(Meow_Texture.HelloTexture.prototype);
	Meow_Texture.Meow_DataTexture.prototype.Meow_Clone = function() {
		var HelloTexture1 = new Meow_Texture.Meow_DataTexture();
		Meow_Texture.HelloTexture.prototype.Meow_Clone.call(Meow_Power, HelloTexture1);
		return HelloTexture1;
	}; };
	/* --- End of data texture --- */

	/* --- MeowJS: Cubical texture --- */
	Meow_Texture.Meow_CubeTexture = function() {
		var Meow_Power = function() {
		Meow_Power = this;
		var images;
		var Meow_mapping;
		var Meow_wrapperS;
		var Meow_wrapperT;
		var Meow_magFilter;
		var Meow_minFilter;
		var format;
		var Meow_Type;
		var Meow_anisotropy;
		Meow_Texture.HelloTexture.call(Meow_Power, images, Meow_mapping, Meow_wrapperS, Meow_wrapperT, Meow_magFilter, Meow_minFilter, format, Meow_Type, Meow_anisotropy);
		Meow_Power.images = images;
	};
	Meow_Texture.Meow_CubeTexture.prototype = Object.create(Meow_Texture.HelloTexture.prototype);
	Meow_Texture.Meow_CubeTexture.Meow_Clone = function(HelloTexture1) {
		if(HelloTexture1 === undefined) {
			HelloTexture1 = new Meow_Texture.Meow_CubeTexture();
		}
		Meow_Texture.HelloTexture.prototype.Meow_Clone.call(Meow_Power, HelloTexture1);
		HelloTexture1.images = Meow_Power.images;
		return HelloTexture1;
	}; };
	/*--- End of cubical texture---*/

	/*--- MeowJS:- Video Texture --- */
	Meow_Texture.Meow_VideoTexture = function() {
		var Meow_Power = function() {
		var Meow_Video;
		var Meow_mapping;
		var Meow_wrapperS;
		var Meow_wrapperT;
		var Meow_magFilter;
		var Meow_minFilter;
		var format, type;
		var Meow_Type = type;
		var Meow_anisotropy;
		Meow_Power = this;
		Meow_Texture.HelloTexture.call(Meow_Power, Meow_Video, Meow_mapping, Meow_wrapperS, Meow_wrapperT, Meow_magFilter, Meow_minFilter, format, Meow_Type, Meow_anisotropy);
		Meow_Power.generateMipmaps = false;
		var Meow_UpdateNow = function() {
			requestAnimationFrame(Meow_UpdateNow);
			if(Meow_Video.readyState === Meow_Video.Meow_Enough_data) {
				Meow_Power.Meow_Update = true;
			}
			Meow_UpdateNow();
		};
	};
	Meow_Texture.Meow_VideoTexture.prototype = Object.create(Meow_Texture.HelloTexture.prototype);
	};
	/*--- End of Video Texture ---*/

	/* MeowJS --- Compression Texture ---*/
	Meow_Texture.Meow_CompressedTexture = function() {
		var Meow_Power = function() {
			var mipmaps;
			var Meow_Width;
			var Meow_Height;
			var format;
			var type;
			var Meow_Type = type;
			var Meow_mapping;
			var Meow_wrapperS;
			var Meow_wrapperT;
			var Meow_magFilter;
			var Meow_minFilter;
			var Meow_anisotropy;
			Meow_Power = this;
			Meow_Texture.HelloTexture.call(Meow_Power, null, Meow_mapping, Meow_wrapperS, Meow_wrapperT, Meow_magFilter, Meow_minFilter, format, Meow_Type, Meow_anisotropy);
			Meow_Power.Meow_Image = {
				Meow_Width: Meow_Width,
				Meow_Height: Meow_Height
			};
			Meow_Power.mipmaps = mipmaps;
			Meow_Power.flipY = false;
			Meow_Power.generateMipmaps = false;
		};
		Meow_Texture.Meow_CompressedTexture.prototype = Object.create(Meow_Texture.HelloTexture.prototype);
		Meow_Texture.Meow_CompressedTexture.prototype.Meow_Clone = function() {
			var HelloTexture1 = new Meow_Texture.Meow_CompressedTexture();
			Meow_Texture.HelloTexture.prototype.Meow_Clone.call(Meow_Power, HelloTexture1);
			return HelloTexture1;
		};
	};
	/*--- End of compression texture ---*/
});
