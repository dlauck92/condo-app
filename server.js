require("dotenv").config();
var express = require("express");
var app = express();
var routes = require('./routes');
var PORT = process.env.PORT || 3001;
var session  = require('express-session');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require("./models");
var passport = require('./config/passport/passport.js');
// var flash = require('connect-flash');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan('dev')); // log every request to the console



// set up our express application

// app.use(cookieParser()); // read cookies (needed for auth)

//for bodyParsar
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// required for passport
app.use(session({
	secret: 'condoapp',
	resave: true,
	saveUninitialized: true
 } )); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // calls the deserializeUser
// app.use(flash()); // use connect-flash for flash messages stored in session


// Routes
app.use(routes);
require("./routes/apiRoutes.js")(app);
require("./routes/user.js")

var syncOptions = { force: false };

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
