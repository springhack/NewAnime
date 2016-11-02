'use strict';

var _dilidili = require('./dilidili.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var dilidili;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _dilidili.updateInfo)();

                case 2:
                    dilidili = _context.sent;

                    process.send(dilidili);

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();