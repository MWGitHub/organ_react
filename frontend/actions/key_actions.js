var AppDispatcher = require('../dispatcher/app_dispatcher');
var KeyConstants = require('../constants/key_constants');

var KeyActions = {
	keyReceieved: function (noteName) {
		AppDispatcher.dispatch({
			actionType: KeyConstants.KEY_RECEIVED,
			noteName: noteName
		});
	},

	keyRemoved: function (noteName) {
		AppDispatcher.dispatch({
			actionType: KeyConstants.KEY_REMOVED,
			noteName: noteName
		});
	},

	setKeys: function (notes) {
		AppDispatcher.dispatch({
			actionType: KeyConstants.SET_KEYS,
			notes: notes
		});
	}
};

module.exports = KeyActions;
