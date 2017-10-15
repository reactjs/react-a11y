'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _a11y = require('./a11y');

var _a11y2 = _interopRequireDefault(_a11y);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = false;
var a11y = function a11y() {
    for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
        opts[_key] = arguments[_key];
    }

    if (instance) {
        throw new Error('react-a11y is already installed');
    } else {
        instance = new (Function.prototype.bind.apply(_a11y2.default, [null].concat(opts)))();
    }
};

a11y.restoreAll = function () {
    if (instance) {
        // restore handlers
        instance.restoreAll();

        // remove instance
        instance = false;
    }
};

exports.default = a11y;