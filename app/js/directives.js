'use strict';

/* Directives */


angular.module('drawathon.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('sketch', ['firebaseRef', function(firebaseRef) {
    var link, options, mousedown, inbounds, drawing, sketchDataRef, lastCoordinates;

    options = {
      height: 480,
      width: 640,
      pixels: 1
    };

    mousedown = false;
    inbounds = false;
    
    lastCoordinates = null;

    sketchDataRef = firebaseRef();
    console.log(sketchDataRef);

    var handleMousedown, handleMouseout, handleMouseenter, handMouseup, draw;

    handleMousedown = function(e) {
      console.log('mousedown');
      mousedown = true;
      draw.call(this, e);
    };

    handleMouseenter = function() {
      console.log('mouseenter');
      inbounds = true;
    };

    handleMouseout = function() {
      console.log('mouseout');
      inbounds = true;
      lastCoordinates = null;
    };

    handMouseup = function() {
      console.log('mouseup');
      mousedown = false;
      lastCoordinates = null;
    };

    draw = function(e) {
      var xf, yf, xi, yi, dx, dy, sx, sy, err;
      e.preventDefault();
      console.log(e);

      xf = Math.floor((e.pageX - this.canvas.offsetLeft) / 1 - 1);
      yf = Math.floor((e.pageY - this.canvas.offsetTop) / 1 - 1);
      xi = (lastCoordinates === null) ? xf : lastCoordinates[0];
      yi = (lastCoordinates === null) ? yf : lastCoordinates[1];
      dx = Math.abs(xf - xi);
      dy = Math.abs(yf - yi);
      sx = (xi < xf) ? 1 : -1;
      sy = (yi < yf) ? 1 : -1;
      err = dx - dy;

      drawing = mousedown && inbounds;

      while (true) {
        //write the pixel into Firebase, or if we are drawing white, remove the pixel
        // pixelDataRef.child(xi + ":" + yi).set(currentColor === "fff" ? null : currentColor);
        if(drawing) this.context.fillRect(xi, yi, 1, 1);

        if (xi === xf && yi === yf) break;

        var e2 = 2 * err;

        if (e2 > -dy) {
          err = err - dy;
          xi = xi + sx;
        }

        if (e2 < dx) {
          err = err + dx;
          yi = yi + sy;
        }
      }

      lastCoordinates = [xf, yf];
    };

    link = function(scope, element, attributes) {
      var canvas, context;
      scope.canvas = element.find('canvas')[0];
      scope.context = scope.canvas.getContext('2d');

      scope.canvas.width = attributes.width || options.width;
      scope.canvas.height = attributes.height || options.height;

      scope.canvas.onmousemove = draw.bind(scope);
      
      scope.canvas.onmousedown = handleMousedown.bind(scope);
      document.onmouseup = handMouseup;

      scope.canvas.onmouseenter = handleMouseenter;
      scope.canvas.onmouseout = handleMouseout;

    };

    return {
      restrict: 'EA',
      template: '<canvas></canvas>',
      scope: {},
      link: link
    };
  }]);
