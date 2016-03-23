var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var TrackConstants = require('../constants/track_constants');

var TrackStore = new Store(AppDispatcher);

var _tracks = {};

TrackStore.all = function () {
	var tracks = [];
	for (var id in _tracks) {
		tracks.push(_tracks[id]);
	}
	return tracks;
};

TrackStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case TrackConstants.TRACK_RECEIVED:
			_tracks[payload.track.name] = payload.track;
			TrackStore.__emitChange();
			break;
		case TrackConstants.TRACK_REMOVED:
			delete _tracks[payload.name];
			TrackStore.__emitChange();
			break;
	}
};

module.exports = TrackStore;
