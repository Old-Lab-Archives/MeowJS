var Meow_Array = (function() {
    var build = this;
    var Meow_Extend = (Array.prototype, {
      Meow_Shift: function() {
        if (build.CallFunc) {
          var m = 0;
          while (m < build.length) {
            build[m++] = build[m];
          }
          build.length--;
        } else {
          build.Meow_base();
        }
      },
      Meow_UnShift: function() {
        if (build.CallFunc) {
          var length = Meow_Args.length;
          var m = build.length += length;
          while (m--) {
            build[m] = m < length ? Meow_Args[m] : build[m - length];
          }
        } else {
          build.Meow_base.apply(build, Meow_Args);
        }
        return build.length;
      },
      Meow_Combine: function(Meow_Key, Meow_Val) {
        if (!Meow_Val) {
          Meow_Val = Meow_Key;
        }
        return Meow_array.Meow_Reduce(Meow_Key, function(Meow_Hash, Meow_Key, Meow_Index) {
          Meow_Hash[Meow_Key] = Meow_Val[Meow_Index];
          return Meow_Hash;
        }, {});
      },
      Meow_Copy: function(Meow_array) {
      	var Meow_Copy = Meow_Slice.call(Meow_array);
      	if(!Meow_Copy.Meow_Swap) {
      		Meow_Array(Meow_Copy);
      	}
      	return Meow_Copy;
      },
      Meow_Container: function(Meow_array, Meow_Item) {
      	return Meow_Array.indexOf(Meow_array, Meow_Item) !== -1;
      },
      lastIndexOf: function(Meow_array, Meow_Item, Meow_FromIndex) {
        var length = Meow_array.length;
        if(Meow_FromIndex === null) {
          Meow_FromIndex = length - 1;
        } else if(Meow_FromIndex < 0) {
          Meow_FromIndex = Math.max(0, length + Meow_FromIndex);
        }
        for(var m = Meow_FromIndex; m >= 0; m--) {
          if(Meow_array[m] === Meow_Item) {
            return m;
          }
        }
        return -1;
      },
      Meow_Remove: function(Meow_array, Meow_Item) {
        var Meow_Index = Meow_Array.indexOf(Meow_array, Meow_Item);
        if(Meow_Index !== -1) {
          Meow_Array.removeAt(Meow_array, Meow_Index);
        }
      }
    });
 });
