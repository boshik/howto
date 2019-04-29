"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var reducer = null;
/**
 * Store enhancer that extends the type of dispatch.
 */
function dispatchExtension() {
    var enhancer = null;
    var store = redux_1.createStore(reducer, enhancer);
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch(Promise.resolve({ type: 'INCREMENT' }));
    // typings:expect-error
    store.dispatch('not-an-action');
    // typings:expect-error
    store.dispatch(Promise.resolve('not-an-action'));
}
/**
 * Store enhancer that extends the type of the state.
 */
function stateExtension() {
    var enhancer = function (createStore) { return function (reducer, preloadedState) {
        var wrappedReducer = null;
        var wrappedPreloadedState = null;
        return createStore(wrappedReducer, wrappedPreloadedState);
    }; };
    var store = redux_1.createStore(reducer, enhancer);
    store.getState().someField;
    store.getState().extraField;
    // typings:expect-error
    store.getState().wrongField;
}
/**
 * Store enhancer that adds methods to the store.
 */
function extraMethods() {
    var enhancer = null;
    var store = redux_1.createStore(reducer, enhancer);
    store.getState();
    var res = store.method();
    // typings:expect-error
    store.wrongMethod();
}
