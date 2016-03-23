var Track = function (attributes) {
	this.name = attributes.name;
	this.roll = attributes.roll || [];
	this.currentTime = new Date();
};

Track.prototype.startRecording = function () {
	this.roll = [];
	this.currentTime = new Date();
};

Track.prototype.addNotes = function (notes) {
	this.roll.push({
		timeSlice: new Date() - this.currentTime,
		notes: notes
	});
};

Track.prototype.stopRecording = function () {
	this.addNotes([]);
};

module.exports = Track;
