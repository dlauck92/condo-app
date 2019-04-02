var _ = require('lodash')
var winston = require('winston')
var taskSchema = require('../models/task')

/**
 * @namespace
 */
;(function () {
  // Start up Task Runners
  winston.debug('Starting Runners...')

  taskSchema.getTasks(function (err, items) {
    if (err) {
      return winston.warn('Task Runner Error: ' + err.message)
    }

    winston.debug('Number of Tasks: ' + _.size(items))
  })
})()
