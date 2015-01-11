var MeowImageCache = function() {
  "use strict";
    MeowImageCache.Meow_ImageCache = function() {
      var Meow_ImageCache = [];
      var Meow_Image;
      var Meow_CacheRoot = document.location.href.split('/');
      Meow_CacheRoot.pop();
      Meow_CacheRoot = Meow_CacheRoot.join('/') + '/';
      var Meow_Power = function() {
      Meow_Power.Meow_Push = function(src, meowLoadEvent) {
        if (!src.match(/^http/)) {
          src = Meow_CacheRoot + src;
        }
        var Meow_ImageItem = new Meow_Image();
        if (Meow_ImageCache[src] && meowLoadEvent) {
          meowLoadEvent(src);
        } else {
          if (meowLoadEvent) {
            Meow_ImageItem.Meow_OnLoad = meowLoadEvent;
            Meow_ImageItem.Meow_OnError = meowLoadEvent;
          }
          Meow_ImageCache[src] = Meow_ImageItem;
        }
        Meow_ImageItem.src = src;
      }; };
    };
};
