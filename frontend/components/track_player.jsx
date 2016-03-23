var React = require('react');
var KeyActions = require('../actions/key_actions');
var TrackActions = require('../actions/track_actions');

var TrackPlayer = React.createClass({
	getInitialState: function () {
		return {
			isPlaying: false
		};
	},

	componentWillUnmount: function () {
		clearInterval(this.intervalId);
		KeyActions.setKeys([]);
	},

	checkNotes: function () {
		var roll = this.props.track.roll;
		// we're done playing the track
		if (this.currentNote >= roll.length) {
			this.setState({
				isPlaying: false
			});
			return;
		}

		var timeElapsed = Date.now() - this.playBackStartTime;
		for (var i = this.currentNote; i < roll.length; i++) {
			var notes = roll[i];
			if (notes.timeSlice > timeElapsed) {
				break;
			}
			KeyActions.setKeys(notes.notes);
			this.currentNote++;
		}
	},

	handlePlay: function (e) {

		if (this.state.isPlaying) {
			this.currentNote = this.props.track.roll.length + 1;
			KeyActions.setKeys([]);
			clearInterval(this.intervalId);
		} else {
			this.currentNote = 0;
			this.playBackStartTime = new Date();
			this.intervalId = setInterval(this.checkNotes, 10);
		}

		this.setState({
			isPlaying: !this.state.isPlaying
		});
	},

	handleDelete: function (e) {
		TrackActions.trackRemoved(this.props.track.name);
	},

	render: function () {
		return (
			<div>
				<p>{this.props.track.name}</p>
				<button onClick={this.handlePlay}>
					{this.state.isPlaying ? 'Stop' : 'Play'}
				</button>
				<button onClick={this.handleDelete}>
					Delete
				</button>
			</div>
		);
	}
});

module.exports = TrackPlayer;
