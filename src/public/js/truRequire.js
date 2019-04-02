var allMods = {
  jquery: function () {
    return require('jquery')
  },
  snackbar: function () {
    return require('snackbar')
  },
  underscore: function () {
    return require('underscore')
  },
  helpers: function () {
    return require('modules/helpers')
  },
  datatables: function () {
    return require('datatables')
  },
  dt_ipaddress: function () {
    return require('dt_ipaddress')
  },
  dt_scroller: function () {
    return require('dt_scroller')
  },
  uikit: function () {
    return require('uikit')
  }
}

module.exports = function (modules, cb) {
  var loadedModules = modules.map(function (x) {
    return allMods[x]()
  })

  cb(loadedModules)
}
