'use strict';

// Declare app level module which depends on filters, and services
angular.module('drawathon',
      ['drawathon.config', 'drawathon.routes', 'drawathon.filters', 'drawathon.services', 'drawathon.directives', 'drawathon.controllers',
         'simpleLoginTools', 'routeSecurity']
   )

   .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
         // establish authentication
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
   }]);