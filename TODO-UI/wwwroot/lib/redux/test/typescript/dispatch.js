"use strict";
exports.__esModule = true;
/**
 * Default Dispatch type accepts any object with `type` property.
 */
function simple() {
    var dispatch = null;
    var a = dispatch({ type: 'INCREMENT', count: 10 });
    a.count;
    // typings:expect-error
    a.wrongProp;
    // typings:expect-error
    dispatch('not-an-action');
}
/**
 * Dispatch accepts type argument that restricts allowed action types.
 */
function discriminated() {
    var dispatch = null;
    dispatch({ type: 'INCREMENT' });
    dispatch({ type: 'DECREMENT', count: 10 });
    // Known actions are strictly checked.
    // typings:expect-error
    dispatch({ type: 'DECREMENT', count: '' });
    // Unknown actions are rejected.
    // typings:expect-error
    dispatch({ type: 'SOME_OTHER_TYPE' });
}
