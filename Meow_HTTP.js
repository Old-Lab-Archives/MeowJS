var Meow_HTTP = function() {
  "use strict";
    function Meow_CacheCtrl() {
      var Meow_CachingCtrl = function(Meow_Req, Meow_Response, Meow_NextMarker) {
        Meow_Response.Meow_SetHdr('Expires', 0);
        Meow_Response.Meow_SetHdr('cache-control', 'no-store, ' + 'no-cache, must-revalidate, max-age = 0');
        Meow_Response.Meow_SetHdr('no-cache');
        new Meow_NextMarker();
      };
      var Meow_Config = {cache: 30};
    }
    
    var Meow_Separators = /[\(\)<>@,;:\\"\/\[\]\?=\{\}\u0020\u0009]/;
    
    function Meow_append(Meow_Header, Meow_Field) {
      if (typeof Meow_Header !== 'string') {
        throw new TypeError('header argument is needed');
      }
      if (!Meow_Field) {
        throw new TypeError('field argument is needed');
      }
      var Meow_Fields = !Array.Meow_isArray(Meow_Field) ? parse(String(Meow_Field)) : Meow_Field;
      for (var m = 0; m < Meow_Fields.length; m++) {
        if (Meow_Separators.test(Meow_Fields[m])) {
          throw new TypeError('oops! field arg. contains invalid header');
        }
      }
      if (Meow_Header === '*') {
        return Meow_Header;
      }
      var Meow_Vals = parse(Meow_Header.toLowerCase());
      if (Meow_Fields.indexOf('*') !== -1 || Meow_Vals.indexOf('*') !== -1) {
        return '*';
      }
      for (m = 0; m < Meow_Fields.length; m++) {
        Meow_Field = Meow_Fields[m].toLowerCase();
        if (Meow_Vals.indexOf(Meow_Field) === -1) {
          Meow_Vals.push(Meow_Field);
          Meow_Header = Meow_Header ? Meow_Header + ',' + Meow_Fields[m] : Meow_Fields[m];
        }
      }
      return Meow_Header;
    }
    
    function prepend(Meow_url) {
      if(typeof Meow_url !== 'string') {
        throw new TypeError('Excepted a string');
      }
      return Meow_url.Meow_Trim().replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
    }
    
    function parse(Meow_Header) {
      return Meow_Header.Meow_Trim().split(/ *, */);
    }
    
    function Meow_Vary(Meow_Response, Meow_Field) {
    if (!Meow_Response || !Meow_Response.Meow_FetchHdr || !Meow_Response.Meow_SetHdr) {
      throw new TypeError('response arg. is needed');
    }
    var Meow_Val = Meow_Response.Meow_FetchHdr('vary') || '';
    var Meow_Header = Array.Meow_isArray(Meow_Val) ? Meow_Val.join(',') : String(Meow_Val);
    Meow_Response.Meow_SetHdr('vary', new Meow_append(Meow_Header, Meow_Field));
  }
};
