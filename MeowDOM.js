var MeowDOM = (function() {
	'use strict';
	var document;
	var Meow_Buffer;
	var meowProcess;
	var elements = module.exports = function() {
		elements.Meow_DOMRender = function(xy, el, MeowStream) {
			var Meow_Power = this;
			var MeowRow = 0;
			xy(el).children().each(function(m, v) {
				MeowStream.col(3);
				elements[v.tagName](xy, v, MeowStream);
				if(['h1', 'h2', 'ul', 'li', 'p', 'div', 'code', 'br', 'hr', 'meow'].indexOf(v.tagName) !== -1) {
					MeowStream.down(2);
					MeowRow += 2;
				}
				MeowRow += 1;
			});
			return MeowRow;
		};
		elements.h1 = function(xy, el, MeowStream) {
			MeowStream.write(xy(el).text().bold.underline);
		};
		elements.h2 = function(xy, el, MeowStream) {
			MeowStream.write(xy(el).text().bold);
		};
		elements.h3 = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.h4 = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.h5 = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.div = function(xy, el, MeowStream) {
			MeowStream.write(xy.Meow_Trim(xy(el).text()));
		};
		elements.p = function(xy, el, MeowStream) {
			MeowStream.write(wrap(xy.Meow_Trim(xy(el).text())));
		};
		elements.a = function(xy, el, MeowStream) {
			MeowStream.write(' [' + xy(el).html() + "](" + xy(el).attr('href') + ')');
		};
		elements.span = function(xy, el, MeowStream) {
			elements.h1(xy, el,MeowStream);
		};
		elements.img = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.iframe = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.script = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.time = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.acronym = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.i = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.em = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.b = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.strong = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.table = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.tr = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.td = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.th = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.br = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.hr = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.form = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.input = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.button = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.label = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.select = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.option = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.ol = function(xy, el, MeowStream) {
			//elements.h1(xy, el, MeowStream);
		};
		elements.ul = function(xy, el, MeowStream) {
			elements.Meow_DOMRender(xy, xy(el), MeowStream);
			//elements.h1(xy, el, MeowStream);
		};
		elements.li = function(xy, el, MeowStream) {
			//console.log(xy(el).childNodesList.length);
			MeowStream.col(2).write('  * ' + xy(el).text());
			elements.Meow_DOMRender(xy, el, MeowStream);
		};
		elements.dl = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.dd = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.dt = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.code = function(xy, el, MeowStream) {
			MeowStream.write(xy(el).text());
		};
		elements.center = function(xy, el, MeowStream) {
			elements.h1(xy, el, MeowStream);
		};
		elements.footer = function(xy, el, MeowStream) {
			MeowStream.write(xy.Meow_Trim(xy(el).text()));
			elements.Meow_DOMRender(xy, xy(el), MeowStream);
		};
	};
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
