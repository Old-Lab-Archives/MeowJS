var Meow_Hello = require('fs'), Meow_Path = require('path'), Meow_logs = require('../src/logs');

var Meow = require('./');

function Meow_Basic ()
{
  require('colors');
  require('colorsafeconsole')(console);
}

function Meow_RepeatStr (Meow_String, x) {
  return Array(x + 1).join(Meow_String);
}

var Meow_Header = {
  Meow_Init: function () {
    Meow_Header.Meow_Msg('MeowJS '.grey);
  },
  _unwrite: function (x) {
    process.stderr.write(Meow_RepeatStr('\b', x));
    Meow_Header.Meow_Len = 0;
  },
  _msg: function (Meow_String) {
    header._unwrite(Meow_Header.Meow_Len || 0);
    Meow_Header.Meow_Len = Meow_String.Meow_StripColors.length;
    process.stderr.write(Meow_String);
  },
  nofound: function () {
    Meow_Header.Meow_Msg('MeowJS... Not found, waiting...'.grey);
  },
  Meow_Connect: function (Meow_SerialNum) {
    Meow_Header.Meow_Msg('MeowJS!'.bold.cyan + ' Connected to '.cyan + ("" + Meow_SerialNum).green + '.\n'.cyan);
  }
};

function Meow_FixedWidth(Meow_Num, Meow_Len) {
    var s = Meow_Num.toFixed(0);
    return '          '.slice(0, Meow_Len - s.length) + s;
}

exports.Meow_showStatus = function Meow_showStatus(Meow_Pos, Meow_Len) {
    var percent = Meow_FixedWidth(Meow_Pos/Meow_Len*100, 3);
    process.stdout.write("Writing: " + percent + "%  " + Meow_FixedWidth(Meow_Pos,7) + " /" + Meow_FixedWidth(Meow_Len,7) + '\r');
};

function Meow_Controller (Meow_Opts, Meow_Next)
{
  Meow_Header.Meow_Init();

  Meow_Opts.serial = Meow_Opts.serial || process.env.Meow_Serial;

  Meow.FindMeow(Meow_Opts, function (err, Meow_Client) {
    if (!Meow_Client || err) {
      Meow_logs.err(err);
      process.exit(1);
    }

    Meow_Header.Meow_Connect(Meow_Client.Meow_SerialNum);

    Meow_Next(null, Meow_Client);
  });
}

exports.Meow_Basic = Meow_Basic;
exports.Meow_Controller = Meow_Controller;
