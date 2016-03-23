var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ToneConstants = require('../constants/tones');
var KeyConstants = require('../constants/key_constants');

var KeyStore = new Store(AppDispatcher);

var _keys = [];

function addNote(note) {
	if (_keys.indexOf(note) === -1) {
		_keys.push(note);
	}
}

function removeNote(note) {
	var index = _keys.indexOf(note);
	if (index !== -1) {
		_keys.splice(index, 1);
	}
}

KeyStore.all = function () {
	return _keys.slice();
};

KeyStore.isPlaying = function (note) {
	var index = _keys.indexOf(note);
	return index >= 0;
};

KeyStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case KeyConstants.KEY_RECEIVED:
			addNote(payload.noteName);
			KeyStore.__emitChange();
			break;
		case KeyConstants.KEY_REMOVED:
			removeNote(payload.noteName);
			KeyStore.__emitChange();
			break;
	}
};

module.exports = KeyStore;
