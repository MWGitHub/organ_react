var Note = require("./util/note");
var KeyListener = require('./util/keylistener');
var KeyStore = require('./stores/key_store');

$(function () {
	KeyListener.attachEvents();
});
