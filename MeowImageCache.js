function MeowImageCache()
{
	var Meow_ImageCache = function()
	{
		var Meow_ImageCache = [];
		var Meow_CacheRoot = document.location.href.split('/');
		Meow_CacheRoot.pop();
		Meow_CacheRoot = Meow_CacheRoot.join('/') + '/';
		Meow_Power.Meow_Push = function(src, Meow_LoadEvent)
		{
			if(!src.match(/^http/))
			{
				src = Meow_CacheRoot + src;
			}
			var Meow_ImageItem = new Meow_Image();
			if(Meow_ImageCache[src] && Meow_LoadEvent)
			{
				Meow_LoadEvent(src);
			}
			else
			{
				if(Meow_LoadEvent)
				{
					Meow_ImageItem.Meow_OnLoad = Meow_LoadEvent;
					Meow_ImageItem.Meow_OnError = Meow_LoadEvent;
				}
				Meow_ImageCache[src] = Meow_ImageItem;
			}
			Meow_ImageItem.src = src;
		};
		Meow_Power.Meow_PushArray = function(Meow_Array, Meow_ImageLoad, Meow_ImageLoad2)
		{
			var Meow_LoadedNum = 0;
			var Meow_ArrayLen = Meow_Array.length;
			for(var m = 0; m < Meow_ArrayLen; m++)
			{
				Meow_Power.push(Meow_Array[m], function(e)
				{
					if(Meow_ImageLoad)
					{
						Meow_ImageLoad(e);
					}
					Meow_LoadedNum++;
					if(Meow_LoadedNum == Meow_ArrayLen)
					{
						setTimeout(function()
						{
							Meow_ImageLoad2(e);
						}, 1);
					}
				});
			}
		};
	};
}
