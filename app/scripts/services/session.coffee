'use strict'

angular.module('drawApp')
  .factory 'Session', ($resource) ->
    $resource '/api/session/'
