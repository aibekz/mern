const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const fs = require('fs');
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure serve-favicon only if the build favicon exists, and always
// serve static files from the production 'build' folder when present.
const faviconPath = path.join(__dirname, 'build', 'favicon.ico');
if (fs.existsSync(faviconPath)) {
  app.use(favicon(faviconPath));
}
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify the token and assign the user object to req.user
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

// Protect the api routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

// Handle server errors (e.g., port already in use) so nodemon doesn't crash
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Use a different PORT or stop the process using it.`);
    process.exit(1);
  }
  // Re-throw other errors
  throw err;
});
