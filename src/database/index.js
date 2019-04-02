require('dotenv').config()
var nconf = require('nconf')
var mongoose = require('mongoose')
var winston = require('winston')

var db = {}
var mongoConnectionUri = {
  server: process.env.DB_HOST || nconf.get('mongo:localhost'),
  port: process.env.DB_PORT || nconf.get('mongo:port') || '27017',
  username: process.env.DB_USER || nconf.get('mongo:username'),
  password: process.env.DB_PASS || nconf.get('mongo:password'),
  database: process.env.DB_DATABASE || nconf.get('mongo:database')
}
console.log(JSON.stringify(mongoConnectionUri));

var CONNECTION_URI = ''
if (!mongoConnectionUri.username)
  CONNECTION_URI =
    'mongodb://' + mongoConnectionUri.server + ':' + mongoConnectionUri.port + '/' + mongoConnectionUri.database
else {
  mongoConnectionUri.password = encodeURIComponent(mongoConnectionUri.password)
  CONNECTION_URI =
    'mongodb://' +
    mongoConnectionUri.username +
    ':' +
    mongoConnectionUri.password +
    '@' +
    mongoConnectionUri.server +
    ':' +
    mongoConnectionUri.port +
    '/' +
    mongoConnectionUri.database
   
}


if (process.env.TD_MONGODB_URI) CONNECTION_URI = process.env.TD_MONGODB_URI

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useCreateIndex: true
}

module.exports.init = function (callback, connectionString, opts) {
  if (connectionString) CONNECTION_URI = connectionString
  if (opts) options = opts

  if (db.connection) {
    return callback(null, db)
  }

  mongoose.Promise = global.Promise
  mongoose.set('useFindAndModify', false)
  mongoose
    .connect(CONNECTION_URI, options)
    .then(function () {
      if (!process.env.FORK) {
        winston.info('Connected to MongoDB')
      }

      db.connection = mongoose.connection

      return callback(null, db)
    })
    .catch(function (e) {
      winston.error('Oh no, something went wrong with DB! - ' + e.message)
      db.connection = null

      return callback(e, null)
    })
}

module.exports.db = db
module.exports.connectionuri = CONNECTION_URI
