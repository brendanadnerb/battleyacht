const io = require('socket.io-client');

// TODO make this better
var usePort = window.location.hostname === 'localhost' ? true : false;
var suffix = usePort ? ':3000' : '';

var socket = io.connect(window.location.protocol + '//' + window.location.hostname + suffix);

export default socket;