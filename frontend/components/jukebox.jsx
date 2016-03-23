var React = require('react');
var TrackStore = require('../stores/track_store');
var TrackPlayer = require('./track_player');

var JukeBox = React.createClass({
	getInitialState: function () {
		return { tracks: TrackStore.all() };
	},

	componentDidMount: function () {
		this.changeToken = TrackStore.addListener(this.change);
	},

	componentWillUnmount: function () {
		this.changeToken.remove();
	},

	change: function () {
		this.setState({
			tracks: TrackStore.all()
		});
	},

	render: function () {
		var tracks = this.state.tracks.map(function (track) {
			return (
				<TrackPlayer key={track.name} track={track} />
			);
		});
		return (
			<div>
				<h3>JukeBox</h3>
				{tracks}
			</div>
		);
	}
});

module.exports = JukeBox;
