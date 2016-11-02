'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var dilidili = null;

var Log = function Log(info) {
    console.log('[' + new Date() + '] => ' + info);
};

var updater = function updater() {
    Log('采集开始');
    var chd = _child_process2.default.fork(_path2.default.join(__dirname, 'children.js'));
    chd.on('message', function (obj) {
        dilidili = obj;
        Log('采集结束');
    });
};

updater();
setInterval(updater, 60 * 60 * 1000);

app.use(_express2.default.static('public'));

app.get('/dilidili', function (req, res) {
    return res.end(JSON.stringify(dilidili));
});

app.listen(3010);