# angularjs-shoe

An [angularjs](http://angularjs.org) module that enables you to use
[shoe](https://github.com/substack/shoe) websocket streaming in the browser
with angularjs.

This module wraps the ```shoe``` library so that any ```$scope``` mutations are
correctly wrapped with ```$rootScope.$apply``` calls so model changes are
instantly reflected in the view.

## Installation

### npm

If you're using [browserify](https://github.com/substack/node-browserify) then
install via npm:

```
$ npm install angularjs-shoe
```

and require ```angularjs-shoe``` in your ```browserify``` code:

``` js
require('angularjs-shoe');
```

### bower

If you're using [bower](http://bower.io) then install using the bower command
line:

```
$ bower install angularjs-shoe
```

### Old school

If you just want to use the client library without a package manager then
simply include the ```build/angularjs-bower.js``` or
```build/angularjs-bower.min.js``` file into your HTML:

``` html
<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    <!-- AngularJS needs to be included before -->
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>

    <!-- Then you can include the angularjs-shoe module from your project -->
    <script type="text/javascript" src="/scripts/angularjs-bower.min.js"></script>

    <!-- Then your regular angular code -->
    <script type="text/javascript" src="/scripts/client.js"></script>
  </body>
</html>
```

## Using angularjs-shoe from your AngularJS controllers

To use shoe from your controllers you simply define ```eugeneware.shoe```
as a module dependency for your app and then you can use dependency injection
to refer to the ```shoe``` or ```reconnect``` variables:

``` js
// client.js
var app = angular.module('MyApp', ['eugeneware.shoe']);

app.controller('MyCtrl', function ($scope, shoe) {
  $scope.items = [];

  var stream = shoe('/invert');
  stream.on('data', function (msg) {
    // you can mutate your $scope here and it will automatically be wrapped in
    // a $rootScope.$apply:
    $scope.items.push(msg);
  });
});
```

If you want to use ```shoe``` and have it automatically reconnect to the
```websocket``` server when there is a network disconnection then use the
```reconnect``` function:

``` js
// client.js
var app = angular.module('MyApp', ['eugeneware.shoe']);

app.controller('MyCtrl', function ($scope, reconnect) {
  $scope.items = [];

  reconnect(function (stream) {
    stream.on('data', function (msg) {
      // you can mutate your $scope here and it will automatically be wrapped in
      // a $rootScope.$apply:
      $scope.items.push(msg);
    });
  })
  .connect('/invert');
});
```

## Notes

The browser files ```build/angularjs-shoe.js``` and ```build/angularjs-shoe.min.js```
already have ```shoe``` and ```reconnect``` bundled with them so you don't need
to include them yourself.
