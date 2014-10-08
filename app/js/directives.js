'use strict';

/* Directives */


angular.module('drawathon.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('sketch', [function() {

    var link;

    link = function(scope, element, attributes) {
      console.log(element.find('canvas')[0]);
    };

    return {
      restrict: 'EA',
      template: '<canvas></canvas>',
      scope: {},
      link: link
    };
  }]);
