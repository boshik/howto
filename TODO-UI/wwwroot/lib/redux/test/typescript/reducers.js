"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
/**
 * Simple reducer definition with no action shape checks.
 * Uses string comparison to determine action type.
 *
 * `AnyAction` type is used to allow action property access without requiring
 * type casting.
 */
function simple() {
    var reducer = function (state, action) {
        if (state === void 0) { state = 0; }
        if (action.type === 'INCREMENT') {
            var _a = action.count, count = _a === void 0 ? 1 : _a;
            return state + count;
        }
        if (action.type === 'DECREMENT') {
            var _b = action.count, count = _b === void 0 ? 1 : _b;
            return state - count;
        }
        return state;
    };
    // Reducer function accepts any object with `type` prop as action.
    // Any extra props are allowed too.
    var s = reducer(undefined, { type: 'init' });
    s = reducer(s, { type: 'INCREMENT' });
    s = reducer(s, { type: 'INCREMENT', count: 10 });
    s = reducer(s, { type: 'DECREMENT' });
    s = reducer(s, { type: 'DECREMENT', count: 10 });
    s = reducer(s, { type: 'SOME_OTHER_TYPE', someField: 'value' });
    // State shape is strictly checked.
    // typings:expect-error
    reducer('string', { type: 'INCREMENT' });
    // Combined reducer also accepts any action.
    var combined = redux_1.combineReducers({ sub: reducer });
    var cs = combined(undefined, { type: 'init' });
    cs = combined(cs, { type: 'INCREMENT', count: 10 });
    // Combined reducer's state is strictly checked.
    // typings:expect-error
    combined({ unknown: '' }, { type: 'INCREMENT' });
}
/**
 * Reducer definition using discriminated unions.
 *
 * See https://basarat.gitbooks.io/typescript/content/docs/types/discriminated-unions.html#redux
 */
function discriminated() {
    var reducer = function (state, action) {
        if (state === void 0) { state = 0; }
        if (action.type === 'INCREMENT') {
            // Action shape is determined by `type` discriminator.
            // typings:expect-error
            action.wrongField;
            var _a = action.count, count = _a === void 0 ? 1 : _a;
            return state + count;
        }
        if (action.type === 'DECREMENT') {
            // typings:expect-error
            action.wrongField;
            var _b = action.count, count = _b === void 0 ? 1 : _b;
            return state - count;
        }
        return state;
    };
    // Reducer state is initialized by Redux using Init action which is private.
    // To initialize manually (e.g. in tests) we have to type cast init action
    // or add a custom init action to MyAction union.
    var s = reducer(undefined, { type: 'init' });
    s = reducer(s, { type: 'INCREMENT' });
    s = reducer(s, { type: 'INCREMENT', count: 10 });
    // Known actions are strictly checked.
    // typings:expect-error
    s = reducer(s, { type: 'DECREMENT', coun: 10 });
    s = reducer(s, { type: 'DECREMENT', count: 10 });
    // Unknown actions are rejected.
    // typings:expect-error
    s = reducer(s, { type: 'SOME_OTHER_TYPE' });
    // typings:expect-error
    s = reducer(s, { type: 'SOME_OTHER_TYPE', someField: 'value' });
    // Combined reducer accepts any action by default which allows to include
    // third-party reducers without the need to add their actions to the union.
    var combined = redux_1.combineReducers({ sub: reducer });
    var cs = combined(undefined, { type: 'init' });
    cs = combined(cs, { type: 'SOME_OTHER_TYPE' });
    // Combined reducer can be made to only accept known actions.
    var strictCombined = redux_1.combineReducers({
        sub: reducer
    });
    strictCombined(cs, { type: 'INCREMENT' });
    // typings:expect-error
    strictCombined(cs, { type: 'SOME_OTHER_TYPE' });
}
/**
 * Reducer definition using type guards.
 */
function typeGuards() {
    function isAction(action, type) {
        return action.type === type;
    }
    var reducer = function (state, action) {
        if (state === void 0) { state = 0; }
        if (isAction(action, 'INCREMENT')) {
            // Action shape is determined by the type guard returned from `isAction`
            // typings:expect-error
            action.wrongField;
            var _a = action.count, count = _a === void 0 ? 1 : _a;
            return state + count;
        }
        if (isAction(action, 'DECREMENT')) {
            // typings:expect-error
            action.wrongField;
            var _b = action.count, count = _b === void 0 ? 1 : _b;
            return state - count;
        }
        return state;
    };
    var s = reducer(undefined, { type: 'init' });
    s = reducer(s, { type: 'INCREMENT' });
    s = reducer(s, { type: 'INCREMENT', count: 10 });
    s = reducer(s, { type: 'DECREMENT' });
    s = reducer(s, { type: 'DECREMENT', count: 10 });
    s = reducer(s, { type: 'SOME_OTHER_TYPE', someField: 'value' });
    var combined = redux_1.combineReducers({ sub: reducer });
    var cs = combined(undefined, { type: 'init' });
    cs = combined(cs, { type: 'INCREMENT', count: 10 });
}
/**
 * Test ReducersMapObject with default type args.
 */
function reducersMapObject() {
    var obj = {};
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        obj[key](undefined, { type: 'SOME_TYPE' });
        // typings:expect-error
        obj[key](undefined, 'not-an-action');
    }
}
