var copy = require('copy');

// TODO this was just a quick abstraction to get the express app and socket stuff into the build folder.
// Normally, I'd probably eject from create-react-app and employ Webpack and Babel.
copy('server.js', 'build', function(err, file) {
  if(err) {
    console.error(err);
    return;
  }
  console.log('prod server ready');
});