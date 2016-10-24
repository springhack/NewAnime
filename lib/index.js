'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dilidili = require('./dilidili.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();
var dilidili = null;

var Log = function Log(info) {
    console.log('[' + new Date() + '] => ' + info);
};

var updater = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        Log('采集开始');
                        _context.next = 3;
                        return (0, _dilidili.updateInfo)();

                    case 3:
                        dilidili = _context.sent;

                        Log('采集结束');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function updater() {
        return _ref.apply(this, arguments);
    };
}();

updater();
setInterval(updater, 60 * 60 * 1000);

app.use(_express2.default.static('public'));

app.get('/dilidili', function (req, res) {
    return res.end(JSON.stringify(dilidili));
});

app.listen(3010);