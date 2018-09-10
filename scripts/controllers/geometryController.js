angular.module('VorticumMechanics').controller('geometryController', function ($scope, $rootScope) {
  var radius = 10;
  var segments = 64;
  $scope.group = new THREE.Group();
  $scope.geometry = new THREE.Geometry();

  $scope.createOmnitrix = function ($radius = 12, $depth = 0, $maxDepth = 4, $radialDefinition = 12, $x = 0, $y = 0, $dr = 1/2) {
    var circle = new THREE.CircleGeometry( $radius, 64 );
    circle.vertices.shift();

    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    material.opacity = 1 - ($depth * $dr * .25);

    var circleMesh = new THREE.LineLoop( circle, material );

    circleMesh.position.x = $x;
    circleMesh.position.y = $y;
    $scope.group.add(circleMesh);
    if ( $depth < $maxDepth ) {
      for ( var i = 0; i < $radialDefinition; i++ ) {
        var theta = 2 * Math.PI * (i/$radialDefinition);
        var $dx = $x + ( ($radius * $dr) * Math.cos(theta) );
        var $dy = $y + ( ($radius * $dr) * Math.sin(theta) );
        var subCircle = $scope.createOmnitrix( $radius * (1 - $dr), $depth + 1, $maxDepth, $radialDefinition, $dx, $dy );
      }
    }

    return circle;
  };

  $scope.createOmnitrix();
  $rootScope.$emit( 'newGeometry', $scope.group );
});