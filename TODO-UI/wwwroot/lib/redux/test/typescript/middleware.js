"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
/**
 * Logger middleware doesn't add any extra types to dispatch, just logs actions
 * and state.
 */
function logger() {
    var loggerMiddleware = function (_a) {
        var getState = _a.getState;
        return function (next) { return function (action) {
            console.log('will dispatch', action);
            // Call the next dispatch method in the middleware chain.
            var returnValue = next(action);
            console.log('state after dispatch', getState());
            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue;
        }; };
    };
    return loggerMiddleware;
}
function promise() {
    var promiseMiddleware = function (_a) {
        var dispatch = _a.dispatch;
        return function (next) { return function (action) {
            if (action instanceof Promise) {
                action.then(dispatch);
                return action;
            }
            return next(action);
        }; };
    };
    return promiseMiddleware;
}
function thunk() {
    var thunkMiddleware = function (api) { return function (next) { return function (action) {
        return typeof action === 'function'
            ? action(api.dispatch, api.getState)
            : next(action);
    }; }; };
    return thunkMiddleware;
}
/**
 * Middleware that expects exact state type.
 */
function customState() {
    var customMiddleware = function (api) { return function (next) { return function (action) {
        api.getState().field;
        // typings:expect-error
        api.getState().wrongField;
        return next(action);
    }; }; };
    return customMiddleware;
}
/**
 * Middleware that expects custom dispatch.
 */
function customDispatch() {
    var customDispatch = function (api) { return function (next) { return function (action) {
        api.dispatch({ type: 'INCREMENT' });
        api.dispatch({ type: 'DECREMENT' });
        // typings:expect-error
        api.dispatch({ type: 'UNKNOWN' });
    }; }; };
}
/**
 * Test the type of store.dispatch after applying different middleware.
 */
function apply() {
    var reducer = null;
    /**
     * logger
     */
    var storeWithLogger = redux_1.createStore(reducer, redux_1.applyMiddleware(logger()));
    // can only dispatch actions
    storeWithLogger.dispatch({ type: 'INCREMENT' });
    // typings:expect-error
    storeWithLogger.dispatch(Promise.resolve({ type: 'INCREMENT' }));
    // typings:expect-error
    storeWithLogger.dispatch('not-an-action');
    /**
     * promise
     */
    var storeWithPromise = redux_1.createStore(reducer, redux_1.applyMiddleware(promise()));
    // can dispatch actions and promises
    storeWithPromise.dispatch({ type: 'INCREMENT' });
    storeWithPromise.dispatch(Promise.resolve({ type: 'INCREMENT' }));
    // typings:expect-error
    storeWithPromise.dispatch('not-an-action');
    // typings:expect-error
    storeWithPromise.dispatch(Promise.resolve('not-an-action'));
    /**
     * promise + logger
     */
    var storeWithPromiseAndLogger = redux_1.createStore(reducer, redux_1.applyMiddleware(promise(), logger()));
    // can dispatch actions and promises
    storeWithPromiseAndLogger.dispatch({ type: 'INCREMENT' });
    storeWithPromiseAndLogger.dispatch(Promise.resolve({ type: 'INCREMENT' }));
    // typings:expect-error
    storeWithPromiseAndLogger.dispatch('not-an-action');
    // typings:expect-error
    storeWithPromiseAndLogger.dispatch(Promise.resolve('not-an-action'));
    /**
     * promise + thunk
     */
    var storeWithPromiseAndThunk = redux_1.createStore(reducer, redux_1.applyMiddleware(promise(), thunk(), logger()));
    // can dispatch actions, promises and thunks
    storeWithPromiseAndThunk.dispatch({ type: 'INCREMENT' });
    storeWithPromiseAndThunk.dispatch(Promise.resolve({ type: 'INCREMENT' }));
    storeWithPromiseAndThunk.dispatch(function (dispatch, getState) {
        getState().someField;
        // typings:expect-error
        getState().wrongField;
        // injected dispatch accepts actions, thunks and promises
        dispatch({ type: 'INCREMENT' });
        dispatch(function (dispatch) { return dispatch({ type: 'INCREMENT' }); });
        dispatch(Promise.resolve({ type: 'INCREMENT' }));
        // typings:expect-error
        dispatch('not-an-action');
    });
    // typings:expect-error
    storeWithPromiseAndThunk.dispatch('not-an-action');
    // typings:expect-error
    storeWithPromiseAndThunk.dispatch(Promise.resolve('not-an-action'));
    /**
     * Test variadic signature.
     */
    var storeWithLotsOfMiddleware = redux_1.createStore(reducer, redux_1.applyMiddleware(promise(), logger(), logger(), logger(), logger(), logger()));
    storeWithLotsOfMiddleware.dispatch({ type: 'INCREMENT' });
    storeWithLotsOfMiddleware.dispatch(Promise.resolve({ type: 'INCREMENT' }));
}
