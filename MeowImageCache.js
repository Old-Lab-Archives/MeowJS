var MeowImageCache = (function() {
  "use strict";
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
    };
});
