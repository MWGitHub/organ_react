var React = require('react');
var ReactDOM = require('react-dom');

var KeyListener = require('./util/keylistener');
var Organ = require('./components/organ');
var JukeBox = require('./components/jukebox');

$(function () {
	KeyListener.attachEvents();
	ReactDOM.render((
		<div>
			<Organ />
			<JukeBox />
		</div>
	), $('#content')[0]);
});
