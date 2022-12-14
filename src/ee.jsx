import * as THREE from "three";

export THREE.RoundedRectGeometry = function (radius, length) {
  THREE.Geometry.call(this);

  this.type = "RoundedRectGeometry";

  this.parameters = {
    radius: radius,
    length: length
  };

  radius = radius !== undefined ? radius : 10;
  length = length !== undefined ? length : 60;

  var circleGeometry = new THREE.CircleGeometry(radius, 32);
  var rectangleGeometry = new THREE.PlaneGeometry(
    2 * radius,
    length - 2 * radius,
    32
  );

  var rectangle = new THREE.Mesh(rectangleGeometry);
  var x = rectangle.position.x;
  var y = rectangle.position.y;
  var z = rectangle.position.z;

  var circle1 = new THREE.Mesh(circleGeometry);
  circle1.position.x = x;
  circle1.position.y = y - length / 2 + radius;
  circle1.position.z = z;

  var circle2 = new THREE.Mesh(circleGeometry);
  circle2.position.x = x;
  circle2.position.y = y + length / 2 - radius;
  circle2.position.z = z;

  THREE.GeometryUtils.merge(this, circle1);
  THREE.GeometryUtils.merge(this, rectangle);
  THREE.GeometryUtils.merge(this, circle2);
};

THREE.RoundedRectGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.RoundedRectGeometry.prototype.constructor = THREE.RoundedRectGeometry;
