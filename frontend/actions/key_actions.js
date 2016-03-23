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
	}
};

module.exports = KeyActions;
