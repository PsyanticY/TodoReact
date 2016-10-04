var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
  console.log('NEw state', store.getState());
});

store.dispatch(actions.addTodo('Clean the ward'));
store.dispatch(actions.setSearchText('ward'));
store.dispatch(actions.toggleShowCompleted());
// Load foundation
$(document).foundation();

// App scss
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);
