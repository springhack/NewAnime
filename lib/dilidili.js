'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateInfo = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _pinyin = require('pinyin');

var _pinyin2 = _interopRequireDefault(_pinyin);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//定义变量
var index = new Map([[10, '年十月新番'], [7, '年七月新番'], [4, '年四曰新番'], [1, '年一月新番']]);

//定义函数
var getMonth = function getMonth(month) {
    return month < 10 ? '0' + month : '' + month;
};

var getIndex = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var html, info, urls, desc, year, month, i, t_month, t_year;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _nodeFetch2.default)('http://www.dilidili.com/').then(function (res) {
                            return res.text();
                        });

                    case 2:
                        html = _context.sent;
                        info = /"(http:\/\/www.dilidili.com\/anime\/(\d{6})\/)".*target="_blank">(.*)<\/a>/.exec(html);
                        urls = [];
                        desc = [];
                        year = Number.parseInt(info[2].substring(0, info[2].length - 2));
                        month = Number.parseInt(info[2].substring(info[2].length - 2));

                        for (i = 0; i <= 3; ++i) {
                            t_month = month - i * 3;
                            t_year = year;

                            if (t_month < 0) {
                                --t_year;
                                t_month += 12;
                            }
                            urls.push('http://www.dilidili.com/anime/' + t_year + getMonth(t_month) + '/');
                            desc[i] = t_year.toString() + index.get(t_month);
                        }
                        return _context.abrupt('return', { urls: urls, year: year, month: month, desc: desc });

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getIndex() {
        return _ref.apply(this, arguments);
    };
}();

var getJson = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(url) {
        var html, arr, regexp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _nodeFetch2.default)(url).then(function (res) {
                            return res.text();
                        });

                    case 2:
                        html = _context2.sent;
                        arr = html.match(/(<dl>[^]+?<\/dl>)/g);
                        regexp = /src="(.*)"[^]+?<h3><a href="(\/anime\/.*\/)">(.*)<\/a><\/h3>[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b>.*<\/b>([^<]*)[^]+?<b[^>]*>.*<\/b>([^<]*)/;
                        return _context2.abrupt('return', arr.map(function (item) {
                            var tmp = regexp.exec(item);
                            var pin = (0, _pinyin2.default)(tmp[3].trim(), {
                                heteronym: true,
                                segment: true,
                                style: _pinyin2.default.STYLE_NORMAL
                            }).map(function (arr) {
                                return arr.join('');
                            }).join('').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                            tmp[1] = tmp[1].trim();
                            if (tmp[1].indexOf('http') == -1) {
                                if (tmp[1].indexOf('/') == 0) tmp[1] = 'http://dilidili.com' + tmp[1];else tmp[1] = 'http://dilidili.com/' + tmp[1];
                            }
                            return {
                                img: tmp[1],
                                url: ('http://www.dilidili.com' + tmp[2]).trim(),
                                title: tmp[3].trim(),
                                area: tmp[4].trim(),
                                time: tmp[5].trim(),
                                label: tmp[6].trim(),
                                play: tmp[7].trim(),
                                what: tmp[8].trim(),
                                info: tmp[9].trim(),
                                state: tmp[10].trim(),
                                pinyin: pin
                            };
                        }));

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getJson(_x) {
        return _ref2.apply(this, arguments);
    };
}();

var getInfo = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(urls) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        return _context3.abrupt('return', new Promise(function (res, rej) {
                            var count = 0;
                            var info = [];

                            var _loop = function _loop(i) {
                                var ptr = i;
                                getJson(urls[ptr]).then(function (obj) {
                                    ++count;
                                    info[ptr] = obj;
                                    if (count == urls.length) res(info);
                                });
                            };

                            for (var i in urls) {
                                _loop(i);
                            }
                        }));

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getInfo(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var updateInfo = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var _ref5, urls, year, month, desc, info;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return getIndex();

                    case 2:
                        _ref5 = _context4.sent;
                        urls = _ref5.urls;
                        year = _ref5.year;
                        month = _ref5.month;
                        desc = _ref5.desc;
                        _context4.next = 9;
                        return getInfo(urls);

                    case 9:
                        info = _context4.sent;
                        return _context4.abrupt('return', { desc: desc, year: year, month: month, info: info });

                    case 11:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function updateInfo() {
        return _ref4.apply(this, arguments);
    };
}();

//导出接口
exports.updateInfo = updateInfo;