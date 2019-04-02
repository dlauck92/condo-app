var _ = require('lodash')
var fs = require('fs-extra')
var path = require('path')
var async = require('async')
var winston = require('winston')
var moment = require('moment-timezone')

var SettingsSchema = require('../models/setting')
var PrioritySchema = require('../models/ticketpriority')

var settingsDefaults = {}

settingsDefaults.userGrants = ['tickets:create view update', 'comments:create view update']
settingsDefaults.supportGrants = [
  'tickets:*',
  'agent:*',
  'accounts:create update view import',
  'comments:create view update create delete',
  'reports:view create',
  'notices:*'
]
settingsDefaults.adminGrants = [
  'admin:*',
  'agent:*',
  'chat:*',
  'tickets:*',
  'accounts:*',
  'groups:*',
  'teams:*',
  'departments:*',
  'comments:*',
  'reports:*',
  'notices:*',
  'settings:*',
  'api:*'
]

function teamsDefault (callback) {
  var teamSchema = require('../models/team')
  var roleSchmea = require('../models/role')
  var userSchema = require('../models/user')

  async.series(
    [
      function (next) {
        // Create default Support Team
      }
    ],
    callback
  )

  teamSchema.create(
    {
      name: 'Support'
    },
    function (err, team) {
      if (err) console.log(err)

      teamSchema.getTeams(function (err, teams) {
        if (err) return callback(err)

        console.log(teams)

        return callback()
      })
    }
  )
}

function rolesDefault (callback) {
  var roleSchema = require('../models/role')

  async.series(
    [
      function (done) {
        roleSchema.getRoleByName('User', function (err, role) {
          if (err) return done(err)
          if (role) return done()

          roleSchema.create(
            {
              name: 'User',
              description: 'Default role for users',
              grants: settingsDefaults.userGrants
            },
            function (err, userRole) {
              if (err) return done(err)
              SettingsSchema.getSetting('role:user:default', function (err, roleUserDefault) {
                if (err) return done(err)
                if (roleUserDefault) return done()

                SettingsSchema.create(
                  {
                    name: 'role:user:default',
                    value: userRole._id
                  },
                  done
                )
              })
            }
          )
        })
      },
      function (done) {
        roleSchema.getRoleByName('Support', function (err, role) {
          if (err) return done(err)
          if (role) {
            return done()
            // role.updateGrants(supportGrants, done);
          } else
            roleSchema.create(
              {
                name: 'Support',
                description: 'Default role for agents',
                grants: settingsDefaults.supportGrants
              },
              done
            )
        })
      },
      function (done) {
        roleSchema.getRoleByName('Admin', function (err, role) {
          if (err) return done(err)
          if (role) return done()
          // role.updateGrants(adminGrants, done);
          else {
            roleSchema.create(
              {
                name: 'Admin',
                description: 'Default role for admins',
                grants: settingsDefaults.adminGrants
              },
              done
            )
          }
        })
      },
      function (done) {
        var roleOrderSchema = require('../models/roleorder')
        roleOrderSchema.getOrder(function (err, roleOrder) {
          if (err) return done(err)
          if (roleOrder) return done()

          roleSchema.getRoles(function (err, roles) {
            if (err) return done(err)

            var roleOrder = []
            roleOrder.push(_.find(roles, { name: 'Admin' })._id)
            roleOrder.push(_.find(roles, { name: 'Support' })._id)
            roleOrder.push(_.find(roles, { name: 'User' })._id)

            roleOrderSchema.create(
              {
                order: roleOrder
              },
              done
            )
          })
        })
      }
    ],
    function (err) {
      if (err) throw err
      return callback()
    }
  )
}

function defaultUserRole (callback) {
  var roleOrderSchema = require('../models/roleorder')
  roleOrderSchema.getOrder(function (err, roleOrder) {
    if (err) return callback(err)
    if (!roleOrder) return callback()

    SettingsSchema.getSetting('role:user:default', function (err, roleDefault) {
      if (err) return callback(err)
      if (roleDefault) return callback()

      var lastId = _.last(roleOrder.order)
      SettingsSchema.create(
        {
          name: 'role:user:default',
          value: lastId
        },
        callback
      )
    })
  })
}

function createDirectories (callback) {
  async.parallel(
    [
      function (done) {
        fs.ensureDir(path.join(__dirname, '../../backups'), done)
      },
      function (done) {
        fs.ensureDir(path.join(__dirname, '../../restores'), done)
      }
    ],
    callback
  )
}

function downloadWin32MongoDBTools (callback) {
  var http = require('http')
  var os = require('os')
  if (os.platform() === 'win32') {
    var filename = 'mongodb-tools.3.6.9-win32x64.zip'
    var savePath = path.join(__dirname, '../backup/bin/win32/')
    fs.ensureDirSync(savePath)
    if (
      !fs.existsSync(path.join(savePath, 'mongodump.exe')) ||
      !fs.existsSync(path.join(savePath, 'mongorestore.exe')) ||
      !fs.existsSync(path.join(savePath, 'libeay32.dll')) ||
      !fs.existsSync(path.join(savePath, 'ssleay32.dll'))
    ) {
      winston.debug('Windows platform detected. Downloading MongoDB Tools')
      fs.emptyDirSync(savePath)
      var unzipper = require('unzipper')
      var file = fs.createWriteStream(path.join(savePath, filename))
      http
        .get('http://storage.trudesk.io/tools/' + filename, function (response) {
          response.pipe(file)
          file.on('finish', function () {
            file.close()
          })
          file.on('close', function () {
            fs.createReadStream(path.join(savePath, filename))
              .pipe(unzipper.Extract({ path: savePath }))
              .on('close', function () {
                fs.unlink(path.join(savePath, filename), callback)
              })
          })
        })
        .on('error', function (err) {
          fs.unlink(path.join(savePath, filename))
          winston.debug(err)
          return callback()
        })
    } else {
      return callback()
    }
  } else {
    return callback()
  }
}

function timezoneDefault (callback) {
  SettingsSchema.getSettingByName('gen:timezone', function (err, setting) {
    if (err) {
      winston.warn(err)
      if (_.isFunction(callback)) return callback(err)
      return false
    }

    if (!setting) {
      var defaultTimezone = new SettingsSchema({
        name: 'gen:timezone',
        value: 'America/New_York'
      })

      defaultTimezone.save(function (err, setting) {
        if (err) {
          winston.warn(err)
          if (_.isFunction(callback)) return callback(err)
        }

        winston.debug('Timezone set to ' + setting.value)
        moment.tz.setDefault(setting.value)

        if (_.isFunction(callback)) return callback()
      })
    } else {
      winston.debug('Timezone set to ' + setting.value)
      moment.tz.setDefault(setting.value)

      if (_.isFunction(callback)) return callback()
    }
  })
}

function showTourSettingDefault (callback) {
  SettingsSchema.getSettingByName('showTour:enable', function (err, setting) {
    if (err) {
      winston.warn(err)
      if (_.isFunction(callback)) return callback(err)
      return false
    }

    if (!setting) {
      var defaultShowTour = new SettingsSchema({
        name: 'showTour:enable',
        value: 0
      })

      defaultShowTour.save(function (err) {
        if (err) {
          winston.warn(err)
          if (_.isFunction(callback)) return callback(err)
        }

        if (_.isFunction(callback)) return callback()
      })
    } else if (_.isFunction(callback)) return callback()
  })
}

function ticketTypeSettingDefault (callback) {
  SettingsSchema.getSettingByName('ticket:type:default', function (err, setting) {
    if (err) {
      winston.warn(err)
      if (_.isFunction(callback)) {
        return callback(err)
      }
    }

    if (!setting) {
      var ticketTypeSchema = require('../models/tickettype')
      ticketTypeSchema.getTypes(function (err, types) {
        if (err) {
          winston.warn(err)
          if (_.isFunction(callback)) {
            return callback(err)
          }
          return false
        }

        var type = _.first(types)
        if (!type) return callback('No Types Defined!')
        if (!_.isObject(type) || _.isUndefined(type._id)) return callback('Invalid Type. Skipping.')

        // Save default ticket type
        var defaultTicketType = new SettingsSchema({
          name: 'ticket:type:default',
          value: type._id
        })

        defaultTicketType.save(function (err) {
          if (err) {
            winston.warn(err)
            if (_.isFunction(callback)) {
              return callback(err)
            }
          }

          if (_.isFunction(callback)) {
            return callback()
          }
        })
      })
    } else {
      if (_.isFunction(callback)) {
        return callback()
      }
    }
  })
}

function ticketPriorityDefaults (callback) {
  var priorities = []

  var normal = new PrioritySchema({
    name: 'Normal',
    migrationNum: 1,
    default: true
  })

  var urgent = new PrioritySchema({
    name: 'Urgent',
    migrationNum: 2,
    htmlColor: '#8e24aa',
    default: true
  })

  var critical = new PrioritySchema({
    name: 'Critical',
    migrationNum: 3,
    htmlColor: '#e65100',
    default: true
  })

  priorities.push(normal)
  priorities.push(urgent)
  priorities.push(critical)
  async.each(
    priorities,
    function (item, next) {
      PrioritySchema.findOne({ migrationNum: item.migrationNum }, function (err, priority) {
        if (!err && (_.isUndefined(priority) || _.isNull(priority))) {
          return item.save(next)
        }

        return next(err)
      })
    },
    callback
  )
}

function normalizeTags (callback) {
  var tagSchema = require('../models/tag')
  tagSchema.find({}, function (err, tags) {
    if (err) return callback(err)
    async.each(
      tags,
      function (tag, next) {
        tag.save(next)
      },
      callback
    )
  })
}

function checkPriorities (callback) {
  var ticketSchema = require('../models/ticket')
  var migrateP1 = false
  var migrateP2 = false
  var migrateP3 = false

  async.parallel(
    [
      function (done) {
        ticketSchema.collection.countDocuments({ priority: 1 }).then(function (count) {
          migrateP1 = count > 0
          return done()
        })
      },
      function (done) {
        ticketSchema.collection.countDocuments({ priority: 2 }).then(function (count) {
          migrateP2 = count > 0
          return done()
        })
      },
      function (done) {
        ticketSchema.collection.countDocuments({ priority: 3 }).then(function (count) {
          migrateP3 = count > 0
          return done()
        })
      }
    ],
    function () {
      async.parallel(
        [
          function (done) {
            if (!migrateP1) return done()
            PrioritySchema.getByMigrationNum(1, function (err, normal) {
              if (!err) {
                winston.debug('Converting Priority: Normal')
                ticketSchema.collection
                  .updateMany({ priority: 1 }, { $set: { priority: normal._id } })
                  .then(function (res) {
                    if (res && res.result) {
                      if (res.result.ok === 1) {
                        return done()
                      }

                      winston.warn(res.message)
                      return done(res.message)
                    }
                  })
              } else {
                winston.warn(err.message)
                return done()
              }
            })
          },
          function (done) {
            if (!migrateP2) return done()
            PrioritySchema.getByMigrationNum(2, function (err, urgent) {
              if (!err) {
                winston.debug('Converting Priority: Urgent')
                ticketSchema.collection
                  .updateMany({ priority: 2 }, { $set: { priority: urgent._id } })
                  .then(function (res) {
                    if (res && res.result) {
                      if (res.result.ok === 1) {
                        return done()
                      }

                      winston.warn(res.message)
                      return done(res.message)
                    }
                  })
              } else {
                winston.warn(err.message)
                return done()
              }
            })
          },
          function (done) {
            if (!migrateP3) return done()
            PrioritySchema.getByMigrationNum(3, function (err, critical) {
              if (!err) {
                winston.debug('Converting Priority: Critical')
                ticketSchema.collection
                  .updateMany({ priority: 3 }, { $set: { priority: critical._id } })
                  .then(function (res) {
                    if (res && res.result) {
                      if (res.result.ok === 1) {
                        return done()
                      }

                      winston.warn(res.message)
                      return done(res.message)
                    }
                  })
              } else {
                winston.warn(err.message)
                return done()
              }
            })
          }
        ],
        callback
      )
    }
  )
}

function addedDefaultPrioritesToTicketTypes (callback) {
  async.waterfall(
    [
      function (next) {
        PrioritySchema.find({ default: true })
          .then(function (results) {
            return next(null, results)
          })
          .catch(next)
      },
      function (priorities, next) {
        priorities = _.sortBy(priorities, 'migrationNum')
        var ticketTypeSchema = require('../models/tickettype')
        ticketTypeSchema.getTypes(function (err, types) {
          if (err) return next(err)

          async.each(
            types,
            function (type, done) {
              var prioritiesToAdd = []
              if (!type.priorities || type.priorities.length < 1) {
                type.priorities = []
                prioritiesToAdd = _.map(priorities, '_id')
              }

              // } else {
              //   _.each(priorities, function(priority) {
              //       if (!_.find(type.priorities, {'_id': priority._id})) {
              //           winston.debug('Adding default priority %s to ticket type %s', priority.name, type.name);
              //           prioritiesToAdd.push(priority._id);
              //       }
              //   });
              // }

              if (prioritiesToAdd.length < 1) {
                return done()
              }

              type.priorities = _.concat(type.priorities, prioritiesToAdd)
              type.save(done)
            },
            function () {
              next(null)
            }
          )
        })
      }
    ],
    callback
  )
}

function mailTemplates (callback) {
  var newTicket = require('./json/mailer-new-ticket')
  var passwordReset = require('./json/mailer-password-reset')
  var templateSchema = require('../models/template')
  async.parallel(
    [
      function (done) {
        templateSchema.findOne({ name: newTicket.name }, function (err, templates) {
          if (err) return done(err)
          if (!templates || templates.length < 1) {
            return templateSchema.create(newTicket, done)
          }

          return done()
        })
      },
      function (done) {
        templateSchema.findOne({ name: passwordReset.name }, function (err, templates) {
          if (err) return done(err)
          if (!templates || templates.length < 1) {
            return templateSchema.create(passwordReset, done)
          }

          return done()
        })
      }
    ],
    callback
  )
}

settingsDefaults.init = function (callback) {
  winston.debug('Checking Default Settings...')
  async.series(
    [
      function (done) {
        return createDirectories(done)
      },
      function (done) {
        return downloadWin32MongoDBTools(done)
      },
      function (done) {
        return rolesDefault(done)
      },
      function (done) {
        return defaultUserRole(done)
      },
      function (done) {
        return timezoneDefault(done)
      },
      function (done) {
        return showTourSettingDefault(done)
      },
      function (done) {
        return ticketTypeSettingDefault(done)
      },
      function (done) {
        return ticketPriorityDefaults(done)
      },
      function (done) {
        return addedDefaultPrioritesToTicketTypes(done)
      },
      function (done) {
        return checkPriorities(done)
      },
      function (done) {
        return normalizeTags(done)
      },
      function (done) {
        return mailTemplates(done)
      }
    ],
    function () {
      if (_.isFunction(callback)) return callback()
    }
  )
}

module.exports = settingsDefaults
