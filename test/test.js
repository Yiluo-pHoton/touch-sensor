'use strict';

var assert = require('assert');
var path = require('path');
var test = require('test');
var when = require('ruff-mock').when;
var driverRunner = require('ruff-driver-runner');

var driverPath = path.join(__dirname, '..');

module.exports = {
    'test should emit touched event': function (done) {
      var run = false;
      driverRunner.run(driverPath, function(error, context) {
        if (error) {
          done(error);
          return;
        }

        var touchSensor = context.device;
        var gpio = context.inputs['gpio'];

        touchSensor.on('touched', function() {
          done();
        });

        gpio.emit('interrupt', 0);
      });
    },

    'test shoud return true when touch sensor is touched': function (done) {
      driverRunner.run(driverPath, function(error, context) {
        if (error) {
          done(error);
          return;
        }

        var touchSensor = context.device;
        var gpio = context.inputs['gpio'];

        touchSensor.on('touched', function() {
          done();
        });
        
        gpio.emit('interrupt', 0);

        assert(touchSensor.isTouched());
      });
    }
};

test.run(module.exports);
