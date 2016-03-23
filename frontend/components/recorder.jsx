var React = require('react');
var Track = require('../util/track');
var KeyStore = require('../stores/key_store');
var KeyActions = require('../actions/key_actions');
var TrackActions = require('../actions/track_actions');

var Recorder = React.createClass({

	getInitialState: function() {
		return {
			isRecording: false,
			track: new Track({name: ""}),
			isPlaying: false
		};
	},

	componentDidMount: function () {
		this.changeToken = KeyStore.addListener(this.change);
	},

	componentWillUnmount: function () {
		this.changeToken.remove();
		clearInterval(this.intervalId);
		KeyActions.setKeys([]);
	},

	change: function () {
		if (!this.state.isRecording) return;

		this.state.track.addNotes(KeyStore.all());
	},

	handleRecord: function (e) {
		if (this.state.isPlaying) return;

		if (this.state.isRecording) {
			this.state.track.stopRecording();
		} else {
			this.state.track.startRecording();
		}
		this.setState({
			isRecording: !this.state.isRecording
		});
	},

	checkNotes: function () {
		var roll = this.state.track.roll;
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
		if (this.state.isRecording) return;

		if (this.state.isPlaying) {
			this.currentNote = this.state.track.roll.length + 1;
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

	handleNameChange: function (e) {
		e.stopPropagation();
		this.state.track.name = e.target.value;
		this.setState({
			track: this.state.track
		});
	},

	handleSaveTrack: function (e) {
		if (this.state.isRecording) return;

		TrackActions.trackReceived(this.state.track);
		this.setState({
			track: new Track({
				name: ""
			})
		});
	},

	render: function () {
		return (
			<div>
				<button onClick={this.handleRecord}>
					{this.state.isRecording ? 'Stop Recording' : 'Start Record'}
				</button>
				<button onClick={this.handlePlay}>
					{this.state.isPlaying ? 'Stop' : 'Play'}
				</button>
				<br />
				<input type="text" value={this.state.track.name} onChange={this.handleNameChange}/>
				<button onClick={this.handleSaveTrack}>Save Track</button>
			</div>
		);
	}
});

module.exports = Recorder;
