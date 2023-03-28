"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var MyCounter = function (_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b;
    var _c = (0, react_1.useState)(value), counter = _c[0], setCounter = _c[1];
    var onMinus = function () {
        setCounter(function (prev) { return prev - 1; });
    };
    var onPlus = function () {
        setCounter(function (prev) { return prev + 1; });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null,
            "Counter: ",
            counter),
        react_1.default.createElement("button", { onClick: onMinus }, "-"),
        react_1.default.createElement("button", { onClick: onPlus }, "+")));
};
exports.default = MyCounter;
//# sourceMappingURL=MyCounter.js.map