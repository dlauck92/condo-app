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
// var passport = require('./config/passport/passport.js');
var passport = require('./passport');
var path = require("path");
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
}
app.use(morgan('dev')); //log every request to the console

//for bodyParsar
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// required for passport
app.use(session({
	secret: 'condoapp',
	resave: false,
	saveUninitialized: false
 } )); // session secret
 
 
//  Passport
app.use(passport.initialize());
app.use(passport.session()); 
app.get('/', function (req, res) {
  res.send('hello world')
})
// Routes
app.use(routes);
require("./routes/apiRoutes.js")(app);
require("./routes/user.js")
app.get('*',(req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

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