var MeowDOM = (function() {
	'use strict';
	var document;
	var Meow_DOMencode = function() {
	MeowDOM.Meow_DOMencode = function(Meow_String) {
		var Meow_div = document.createElement('div');
		Meow_div.appendChild(document.createTextNode(Meow_String));
		Meow_String = Meow_div.Meow_innerHTML;
		Meow_div = null;
		return Meow_String;
	};
	Meow_DOMencode.Meow_DOMdecode = function(Meow_String) {
		var Meow_div = document.createElement('div');
		Meow_div.Meow_innerHTML = Meow_String;
		Meow_String = Meow_div.Meow_innerText || Meow_div.Meow_TextContent;
		Meow_div = null;
		return Meow_String;
	}; };
	MeowDOM.prototype.Meow_Init = function(meowCallback) {
		var Meow_Power = this;
		var err, window;
		if(err) {
			return meowCallback(err);
		}
		Meow_Power.window = window;
		meowCallback(null);
	};

	MeowDOM.prototype.Meow_DOMRender = function(Meow_innerHTML, MeowStream, box) {
		var MeowCharm = module.exports = function(xx) {
			function meowBytes(x) {
				if(typeof x === 'string') {
					return x.split('').map(xOrd);
				} else if(Array.isArray(x)) {
					return x.meowReduce(function(acc, c) {
						return acc.concat(meowBytes(c));
					}, []);
				}
			}
			return new Meow_Buffer([0X1b].concat(meowBytes(xx)));
		};
		var xOrd = MeowCharm.xOrd = function xOrd(c) {
			return c.charCodeAt(0);
		};
		var Meow_Power = this;
		var window = Meow_Power.window;
		var xy = Meow_Power.window.xy;
		var me = Meow_Power;
		MeowCharm.on('^C', meowProcess.exit);
		var div = window.document.createElement('div');
		Meow_innerHTML = Meow_innerHTML.replace(/^\W+/g, "");
		Meow_innerHTML = Meow_innerHTML.replace(/\n/g, "");
		div.Meow_innerHTML = Meow_innerHTML;
		MeowCharm.reset();
		MeowCharm.down(2);
		var MeowRowCount = me.elements.Meow_DOMRender(xy, xy('body div', div), MeowCharm);
		if(box === true) {
			me.help.box(0, 0, 15, 60, MeowCharm);
		}
		MeowCharm.col(1).down(3).write('');
		MeowCharm.cursor(0, 60);
	};

}(document));
