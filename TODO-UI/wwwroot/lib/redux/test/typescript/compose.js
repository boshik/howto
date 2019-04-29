"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
// adapted from DefinitelyTyped/compose-function
var numberToNumber = function (a) { return a + 2; };
var numberToString = function (a) { return 'foo'; };
var stringToNumber = function (a) { return 5; };
var t1 = redux_1.compose(numberToNumber, numberToNumber)(5);
var t2 = redux_1.compose(numberToString, numberToNumber)(5);
var t3 = redux_1.compose(numberToString, stringToNumber)('f');
var t4 = redux_1.compose(function (f) { return function (p) { return 5; }; }, function (f) { return function (p) { return 4; }; })(numberToString);
var t5 = redux_1.compose(stringToNumber, numberToString, numberToNumber)(5);
var t6 = redux_1.compose(numberToString, stringToNumber, numberToString, numberToNumber)(5);
// rest signature
var t7 = redux_1.compose(numberToString, numberToNumber, stringToNumber, numberToString, stringToNumber)('fo');
var multiArgFn = function (a, b, c) { return 'foo'; };
var t8 = redux_1.compose(multiArgFn)('bar', 42, true);
var t9 = redux_1.compose(stringToNumber, multiArgFn)('bar', 42, true);
var t10 = redux_1.compose(numberToString, stringToNumber, multiArgFn)('bar', 42, true);
var t11 = redux_1.compose(stringToNumber, numberToString, stringToNumber, multiArgFn)('bar', 42, true);
var funcs = [stringToNumber, numberToString, stringToNumber];
var t12 = redux_1.compose.apply(void 0, funcs)('bar');
