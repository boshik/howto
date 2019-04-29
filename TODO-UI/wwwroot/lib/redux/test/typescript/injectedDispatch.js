"use strict";
exports.__esModule = true;
/**
 * Inject default dispatch.
 */
function simple() {
    var hoc = connect(function (dispatch) {
        return {
            onClick: function () {
                dispatch({ type: 'INCREMENT' });
                // typings:expect-error
                dispatch(Promise.resolve({ type: 'INCREMENT' }));
                // typings:expect-error
                dispatch('not-an-action');
            }
        };
    });
}
/**
 * Inject dispatch that restricts allowed action types.
 */
function discriminated() {
    var hoc = connect(function (dispatch) {
        return {
            onClick: function () {
                dispatch({ type: 'INCREMENT' });
                dispatch({ type: 'DECREMENT', count: 10 });
                // typings:expect-error
                dispatch({ type: 'DECREMENT', count: '' });
                // typings:expect-error
                dispatch({ type: 'SOME_OTHER_TYPE' });
                // typings:expect-error
                dispatch('not-an-action');
            }
        };
    });
}
/**
 * Inject extended dispatch.
 */
function promise() {
    var hoc = connect(function (dispatch) {
        return {
            onClick: function () {
                dispatch({ type: 'INCREMENT' });
                dispatch(Promise.resolve({ type: 'INCREMENT' }));
                // typings:expect-error
                dispatch('not-an-action');
            }
        };
    });
}
