var React = require('react');
var ReactDOM = require('react-dom');

var KeyListener = require('./util/keylistener');
var Organ = require('./components/organ');


$(function () {
	KeyListener.attachEvents();
	ReactDOM.render(<Organ />, $('#content')[0]);
});
