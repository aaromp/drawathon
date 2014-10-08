'use strict';

/* Directives */


angular.module('drawathon.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('sketch', [function() {
    var link, options, drawing;

    options = {
      height: 480,
      width: 640
    };

    drawing = false;

    var startDrawing, stopDrawing, draw;

    startDrawing = function() {
      console.log('starting to draw');
      drawing = true;
    };

    stopDrawing = function() {
      console.log('stoped drawing');
      drawing = false;
    };

    draw = function(e) {
      e.preventDefault();
      console.log(e);
    };

    link = function(scope, element, attributes) {
      var canvas, context;
      canvas = element.find('canvas')[0];
      context = canvas.getContext('2d');

      canvas.width = attributes.width || options.width;
      canvas.height = attributes.height || options.height;

      canvas.onmousedown = startDrawing;
      canvas.onmousemove = draw;

      canvas.onmouseup = stopDrawing;
      canvas.onmouseout = stopDrawing;

    };

    return {
      restrict: 'EA',
      template: '<canvas></canvas>',
      scope: {},
      link: link
    };
  }]);
