"use strict";
exports.__esModule = true;
var FSA;
(function (FSA) {
    var action = {
        type: 'ACTION_TYPE',
        payload: 'test'
    };
    var payload = action.payload;
})(FSA || (FSA = {}));
var FreeShapeAction;
(function (FreeShapeAction) {
    var action = {
        type: 'ACTION_TYPE',
        text: 'test'
    };
    var text = action['text'];
})(FreeShapeAction || (FreeShapeAction = {}));
var StringLiteralTypeAction;
(function (StringLiteralTypeAction) {
    var action = {
        type: 'A'
    };
    var type = action.type;
})(StringLiteralTypeAction || (StringLiteralTypeAction = {}));
var EnumTypeAction;
(function (EnumTypeAction) {
    var ActionType;
    (function (ActionType) {
        ActionType[ActionType["A"] = 0] = "A";
        ActionType[ActionType["B"] = 1] = "B";
        ActionType[ActionType["C"] = 2] = "C";
    })(ActionType || (ActionType = {}));
    var action = {
        type: ActionType.A
    };
    var type = action.type;
})(EnumTypeAction || (EnumTypeAction = {}));
