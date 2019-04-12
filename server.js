require("dotenv").config();
var express = require("express");

var app = express();
var PORT = process.env.PORT || 5000;
// var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require("./models");
// var passport = require('passport');
// var flash    = require('connect-flash');





// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// configuration ===============================================================
// connect to our database

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// Routes
require("./routes/apiRoutes.js")(app);

// required for passport
// app.use(session({
// 	secret: 'vidyapathaisalwaysrunning',
// 	resave: true,
// 	saveUninitialized: true
//  } )); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session
app.get("/",function(req,res){
  res.send("hello world")
})

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
