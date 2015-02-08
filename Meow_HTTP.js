var Meow_HTTP = function() {
  "use strict";
    function Meow_CacheCtrl() {
      var Meow_CachingCtrl;
      Meow_CacheCtrl.Meow_CachingCtrl = function(Meow_Req, Meow_Response, meowNextMarker) {
        Meow_Response.Meow_SetHdr('Expires', 0);
        Meow_Response.Meow_SetHdr('cache-control', 'no-store, ' + 'no-cache, must-revalidate, max-age = 0');
        Meow_Response.Meow_SetHdr('no-cache');
        meowNextMarker();
      };
      var Meow_Config;
      Meow_Config= {cache: 30};
    }
    
    var Meow_Separators;
    Meow_Separators = /[\(\)<>@,;:\\"\/\[\]\?=\{\}\u0020\u0009]/;
    var xx = this;
    xx.Meow_Map = {};
    
    Meow_HTTP.prototype = {
    append : function(Meow_Name, Meow_Val) {
      Meow_Name = Meow_Name.toLowerCase();
      var Meow_List = xx.Meow_Map[Meow_Name];
      if(!Meow_List) {
        Meow_List = [];
        xx.Meow_Map[Meow_Name] = Meow_List;
      }
      Meow_List.push(Meow_Val);
    },

    prepend : function(Meow_url) {
      if(typeof Meow_url !== 'string') {
        throw new TypeError('Excepted a string');
      }
      return Meow_url.Meow_Trim().replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
    },
    
    parse : function(Meow_Header) {
      return Meow_Header.Meow_Trim().split(/ *, */);
    }
  };
    
    function Meow_Vary(Meow_Response, Meow_Field) {
    if (!Meow_Response || !Meow_Response.Meow_FetchHdr || !Meow_Response.Meow_SetHdr) {
      throw new TypeError('response arg. is needed');
    }
    var Meow_Val = Meow_Response.Meow_FetchHdr('vary') || '';
    var Meow_Header = Array.Meow_isArray(Meow_Val) ? Meow_Val.join(',') : String(Meow_Val);
    Meow_Response.Meow_SetHdr('vary', append(Meow_Header, Meow_Field));
  }
};
