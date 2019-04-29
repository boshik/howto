"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var reducer = function (state, action) {
    if (state === void 0) { state = {
        a: 'a',
        b: {
            c: 'c',
            d: 'd'
        }
    }; }
    return state;
};
var reducerWithAction = function (state, action) {
    if (state === void 0) { state = {
        a: 'a',
        b: {
            c: 'c',
            d: 'd'
        }
    }; }
    return state;
};
var funcWithStore = function (store) { };
/* createStore */
var store = redux_1.createStore(reducer);
var storeWithPreloadedState = redux_1.createStore(reducer, {
    b: { c: 'c' }
});
var storeWithActionReducer = redux_1.createStore(reducerWithAction);
var storeWithActionReducerAndPreloadedState = redux_1.createStore(reducerWithAction, {
    b: { c: 'c' }
});
funcWithStore(storeWithActionReducer);
funcWithStore(storeWithActionReducerAndPreloadedState);
var enhancer = function (next) { return next; };
var storeWithSpecificEnhancer = redux_1.createStore(reducer, enhancer);
var storeWithPreloadedStateAndEnhancer = redux_1.createStore(reducer, {
    b: { c: 'c' }
}, enhancer);
/* dispatch */
store.dispatch({
    type: 'ADD_TODO',
    text: 'test'
});
/* getState */
var state = store.getState();
/* subscribe / unsubscribe */
var unsubscribe = store.subscribe(function () {
    console.log('Current state:', store.getState());
});
unsubscribe();
/* replaceReducer */
var newReducer = reducer;
store.replaceReducer(newReducer);
