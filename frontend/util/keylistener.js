var AppDispatcher = require('../dispatcher/app_dispatcher');
var KeyConstants = require('../constants/key_constants');
var KeyActions = require('../actions/key_actions');

var Mapping = {
	81: 'C4',
	87: 'D4',
	69: 'E4',
	82: 'F4',
	84: 'G4',
	89: 'A4',
	85: 'B4',
	73: 'C5'
};

var handleKeyDown = function (e) {
	var keyCode = e.keyCode;
	var note = Mapping[keyCode];
	KeyActions.keyReceieved(note);
};

var handleKeyUp = function (e) {
	var keyCode = e.keyCode;
	var note = Mapping[keyCode];
	KeyActions.keyRemoved(note);
};

var KeyListener = {
	attachEvents: function () {
		$(document).on("keydown", handleKeyDown);
		$(document).on("keyup", handleKeyUp);
	}
};

module.exports = KeyListener;
