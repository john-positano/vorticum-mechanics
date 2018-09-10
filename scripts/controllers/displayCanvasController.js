angular.module('VorticumMechanics').controller('displayCanvasController', function ($scope, $element, $timeout, $rootScope) {
  $scope.DOMElement = $element[0];
  $scope.parent = $element.parent()[0];

  $scope.width = $scope.parent.offsetWidth;
  $scope.height = window.innerHeight;

  $scope.scene = new THREE.Scene();
  $scope.camera = new THREE.PerspectiveCamera( 75, $scope.width / $scope.height, 0.1, 1000 );
  $scope.controls = new THREE.OrbitControls( $scope.camera );
  $scope.renderer = new THREE.WebGLRenderer( { canvas: $scope.DOMElement } );

  $scope.camera.position.z = 20;

  $scope.geometries = [0];

  $scope.animate = function () {
    requestAnimationFrame( $scope.animate );
    $scope.renderer.render( $scope.scene, $scope.camera );
  };

  $scope.sizeCanvas = function () {
    $timeout(
      function () {
        $scope.width = $scope.parent.offsetWidth;
        $scope.height = window.innerHeight;
        $scope.camera.aspect = $scope.width / $scope.height;
        $scope.camera.updateProjectionMatrix();
        $scope.renderer.setSize( $scope.width, $scope.height );
      }
    );
  };

  $rootScope.$on('newGeometry', function ($event, $geometry) {
    $scope.scene.add($geometry);
  });

  window.onresize = $scope.sizeCanvas;
  window.$scope = $scope;
  $scope.sizeCanvas();
  $scope.animate();

  $element.on('scroll',console.log);
});