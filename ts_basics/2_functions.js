"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = exports.fetchData = exports.printFormat = exports.format = exports.addStrings = void 0;
function addNumbers(a, b) {
    //any type and return type
    return a + b;
}
exports.default = addNumbers;
var addStrings = function (str1, str2) {
    return "".concat(str1).concat(str2);
};
exports.addStrings = addStrings;
var format = function (title, param) {
    return "".concat(title, " ").concat(param);
};
exports.format = format;
//void function
var printFormat = function (title, param) {
    console.log((0, exports.format)(title, param));
};
exports.printFormat = printFormat;
//promise function
var fetchData = function (url) {
    return Promise.resolve("Data from ".concat(url));
};
exports.fetchData = fetchData;
function introduce(salutation) {
    var names = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        names[_i - 1] = arguments[_i];
    }
    return "".concat(salutation, " ").concat(names.join(" "));
}
//Typescript does not enforce types at runtime
function getName(user) {
    var _a, _b;
    return "".concat((_a = user === null || user === void 0 ? void 0 : user.first) !== null && _a !== void 0 ? _a : 'Jane', " ").concat((_b = user === null || user === void 0 ? void 0 : user.last) !== null && _b !== void 0 ? _b : 'Wilson'); //no runtime typechecking and only compile time typechecking
}
exports.getName = getName;
