'use strict';

/* Directives */


angular.module('drawathon.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('sketch', ['firebaseRef', function(firebaseRef) {
    var link, options, mousedown, inbounds, sketchDataRef, lastCoordinates, currentColor;

    options = {
      height: 480,
      width: 640,
      pixels: 1,
      color: null
    };

    mousedown = false;
    inbounds = false;
    
    lastCoordinates = null;

    sketchDataRef = firebaseRef();

    var handleMousedown, handleMouseout, handleMouseenter, handleMouseup, sketch;

    handleMousedown = function(e) {
      mousedown = true;
      sketch.call(this, e);
    };

    handleMouseenter = function() {
      inbounds = true;
    };

    handleMouseout = function() {
      inbounds = true;
      lastCoordinates = null;
    };

    handleMouseup = function() {
      mousedown = false;
      lastCoordinates = null;
    };

    sketch = function(e) {
      var xf, yf, xi, yi, dx, dy, sx, sy, err;
      e.preventDefault();

      xf = Math.floor((e.pageX - this.canvas.offsetLeft) / this.pixels - 1);
      yf = Math.floor((e.pageY - this.canvas.offsetTop) / this.pixels - 1);
      xi = (lastCoordinates === null) ? xf : lastCoordinates[0];
      yi = (lastCoordinates === null) ? yf : lastCoordinates[1];
      dx = Math.abs(xf - xi);
      dy = Math.abs(yf - yi);
      sx = (xi < xf) ? 1 : -1;
      sy = (yi < yf) ? 1 : -1;
      err = dx - dy;

      while (true) {
        if(mousedown && inbounds) sketchDataRef.child(xi + ':' + yi).set(this.color);

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

    var draw, clear;

    draw = function(snapshot) {
      var coordinate = snapshot.name().split(':');
      this.context.fillStyle = '#' + snapshot.val();
      this.context.fillRect(parseInt(coordinate[0]) * this.pixels, parseInt(coordinate[1]) * this.pixels, this.pixels, this.pixels);
    };

    clear = function(snapshot) {
      var coordinate = snapshot.name().split(':');
      this.context.clearRect(parseInt(coordinate[0]) * this.pixels, parseInt(coordinate[1]) * this.pixels, this.pixels, this.pixels);
    };

    link = function(scope, element, attributes) {
      var canvas, context;
      scope.canvas = element.find('canvas')[0];
      scope.context = scope.canvas.getContext('2d');

      scope.pixels = attributes.pixels || options.pixels;
      scope.color = attributes.color || options.color;

      scope.canvas.width = attributes.width || options.width;
      scope.canvas.height = attributes.height || options.height;

      scope.canvas.onmousemove = sketch.bind(scope);
  
      scope.canvas.onmousedown = handleMousedown.bind(scope);
      document.onmouseup = handleMouseup;

      scope.canvas.onmouseenter = handleMouseenter;
      scope.canvas.onmouseout = handleMouseout;

      sketchDataRef.on('child_added', draw.bind(scope));
      sketchDataRef.on('child_changed', draw.bind(scope));
      sketchDataRef.on('child_removed', clear.bind(scope));
    };

    return {
      restrict: 'EA',
      template: '<canvas></canvas>',
      scope: {},
      link: link
    };
  }]);
