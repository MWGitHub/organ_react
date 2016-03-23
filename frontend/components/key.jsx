var React = require('react');
var KeyStore = require('../stores/key_store');
var ToneConstants = require('../constants/tones');
var Note = require('../util/note');

var Key = React.createClass({
	getInitialState: function () {
		return { isPlaying: KeyStore.isPlaying(this.props.noteName) };
	},

	componentWillMount: function () {
		this.note = new Note(ToneConstants[this.props.noteName]);
	},

	componentDidMount: function () {
		this.changeToken = KeyStore.addListener(this.change);
	},

	componentWillUnmount: function () {
		this.changeToken.remove();
		this.note.stop();
	},

	change: function () {
		this.setState({
			isPlaying: KeyStore.isPlaying(this.props.noteName)
		});
	},

	render: function () {
		var cls = 'key';
		if (this.state.isPlaying) {
			this.note.start();
			cls += ' playing';
		} else {
			this.note.stop();
		}

		return (
			<div className={cls}>{this.props.noteName}</div>
		);
	}
});

module.exports = Key;
