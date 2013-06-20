var shoe = require('shoe')
  , reconnect = require('reconnect');

angular.module('eugeneware.shoe', [])
  .factory('reconnect', function ($rootScope) {
    return function (cb) {
      var shoe = reconnect(function (stream) {
        var _emit = stream.emit;

        stream.emit = function () {
          var args = [].slice.call(arguments);
          return $rootScope.$apply(function () {
            return _emit.apply(stream, args);
          });
        };

        cb.call(shoe, stream);
      });

      return shoe;
    };
  })
  .factory('shoe', function ($rootScope) {
    return function (uri, cb) {
      var stream = shoe(uri, function () {
        var _emit = stream.emit;
        stream.emit = function () {
          var args = [].slice.call(arguments);
          return $rootScope.$apply(function () {
            return _emit.apply(stream, args);
          });
        };

        $rootScope.$apply(function () {
          if (cb) cb.call(stream);
        });
      });

      return stream;
    };
  });
