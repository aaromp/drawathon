'use strict';

/* Directives */


angular.module('drawathon.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('sketch', [function() {
    var link, options;

    options = {
      height: 480,
      width: 640
    };

    link = function(scope, element, attributes) {
      var canvas;
      canvas = element.find('canvas')[0];

      canvas.width = attributes.width || options.width;
      canvas.height = attributes.height || options.height;

      // console.log(canvas.width, canvas.height);
    };

    return {
      restrict: 'EA',
      template: '<canvas></canvas>',
      scope: {},
      link: link
    };
  }]);
