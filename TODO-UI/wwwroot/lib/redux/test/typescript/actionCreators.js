"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var addTodo = function (text) { return ({
    type: 'ADD_TODO',
    text: text
}); };
var addTodoAction = addTodo('test');
var addTodoViaThunk = function (text) { return function (dispatch) { return ({
    type: 'ADD_TODO',
    text: text
}); }; };
var boundAddTodo = redux_1.bindActionCreators(addTodo, dispatch);
var dispatchedAddTodoAction = boundAddTodo('test');
var boundAddTodoViaThunk = redux_1.bindActionCreators(addTodoViaThunk, dispatch);
var dispatchedAddTodoViaThunkAction = boundAddTodoViaThunk('test');
var boundActionCreators = redux_1.bindActionCreators({ addTodo: addTodo }, dispatch);
var otherDispatchedAddTodoAction = boundActionCreators.addTodo('test');
var boundActionCreators2 = redux_1.bindActionCreators({
    addTodoViaThunk: addTodoViaThunk
}, dispatch);
var otherDispatchedAddTodoAction2 = boundActionCreators2.addTodoViaThunk('test');
