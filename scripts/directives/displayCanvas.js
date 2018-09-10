angular.module('VorticumMechanics').directive('displayCanvas', function () {
  return {
    restrict: 'E',
    controller: 'displayCanvasController',
    replace: true,
    templateUrl: '/templates/displayCanvas.html'
  }
});