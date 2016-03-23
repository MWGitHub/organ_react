var TrackConstants = require('../constants/track_constants');
var AppDispatcher = require('../dispatcher/app_dispatcher');

var TrackActions = {
	trackReceived: function (track) {
		AppDispatcher.dispatch({
			actionType: TrackConstants.TRACK_RECEIVED,
			track: track
		});
	},

	trackRemoved: function (name) {
		AppDispatcher.dispatch({
			actionType: TrackConstants.TRACK_REMOVED,
			name: name
		});
	}
};

module.exports = TrackActions;
