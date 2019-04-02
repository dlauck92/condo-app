define(['angular', 'angularjs/services/session', 'angularRoute', 'angularCookies', 'angularSanitize'], function (
  angular
) {
  return angular.module('sessionLoader', ['trudesk.services.session', 'ngRoute', 'ngCookies', 'ngSanitize'])
})
