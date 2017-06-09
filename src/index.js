'use strict';

var driver = require('ruff-driver');

var sensorState = {
  touched : 0,
  released : 1
}

module.exports = driver({
    attach: function (inputs, context) {
      var that = this;
      this._gpio = inputs['gpio'];
      this._currentState = sensorState.released;

      this._gpio.on('interrupt', function(state){
        if (that._currentState === state) {
          return;
        }

        that._currentState = state;

        if (state === sensorState.touched) {
          that.emit('touched');
        } else {
          that.emit('released');
        }
      });
    },

    exports: {
      isTouched: function() {
        return this._currentState === sensorState.touched;
      }
    }
});
