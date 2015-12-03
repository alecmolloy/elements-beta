/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
	utils = require('../utils'),
	THREE = require('three');

function makeMesh(geometry, side) {

	material = new THREE.MeshPhongMaterial({
		color: session.settings.color,
		shading: session.settings.shading,
		specular: session.settings.specular,
		shininess: session.settings.shininess,
		side : side || THREE.FrontSide
	});

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = session.pos.x;
	mesh.position.y = session.pos.y;
	mesh.position.z = session.pos.z;
	session.scene.add(mesh);
	return mesh;
}

/*
 * Draw a box using current cursor position as origin
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Number} depth
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function box(width, height, depth) {
	height = height || width;
	depth = depth || width;

	utils.record('box', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		width: width,
		height: height,
		depth: depth,
		isCube: (width === height) && (width === depth)
	});

	var geometry = new THREE.BoxGeometry(width, height, depth);
	var mesh = makeMesh(geometry);

	return mesh;
}

/*
 * Draw a cylinder using current cursor position as origin
 *
 * @param {Number} radius
 * @param {Number} height
 * @param {Boolean} openEnded
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function cylinder(radius, height, openEnded) {
		radius = radius || 1;
		height = height || radius * 2;
		openEnded = openEnded || false;

		// Cylanders can have different radii for top and bottom parts. If initialised with a number, make it an array:
		if (typeof radius === 'number') {
			radius = [radius, radius]
		}

		utils.record('cylinder', {
			x: session.pos.x,
			y: session.pos.y,
			z: session.pos.z,
			radius: radius,
			height: height,
			openEnded: openEnded
		});

		var geometry = new THREE.CylinderGeometry(radius[0], radius[1], height, 8, 1, openEnded, 0, 2 * Math.PI);
		var mesh = makeMesh(geometry);

		return mesh;
	}
	/*
	 * Draw a square using current cursor position as origin
	 *
	 * @param {Number} size
	 * @return mesh
	 */
function cube(size) {
	return box(size, size, size);
}

/*
 * Draw a icosahedron using current cursor position as origin
 *
 * @param {Number} radius
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function icosahedron(radius) {
	utils.record('icosahedron', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var geometry = new THREE.IcosahedronGeometry(radius);
	var mesh = makeMesh(geometry);
	return mesh;
}

/*
 * Draw a dodecahedron using current cursor position as origin
 *
 * @param {Number} radius
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function dodecahedron(radius) {
	utils.record('dodecahedron', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var geometry = new THREE.DodecahedronGeometry(radius);
	var mesh = makeMesh(geometry);
	return mesh;
}

/*
 * Draw an octahedron using current cursor position as origin
 *
 * @param {Number} radius
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function octahedron(radius) {
	utils.record('octahedron', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var geometry = new THREE.OctahedronGeometry(radius);
	var mesh = makeMesh(geometry);
	return mesh;
}

/*
 * Draw a plane using current cursor position as origin
 *
 * @param {Object} normal
 * @param {Number} constant
 * @return mesh
 *
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 * TODO: make it work
 */
//function plane(normal, constant) {
//	normal = normal || new THREE.Vector3(0, 1, 0);
//	constant = constant || 0;
//	utils.record('plane', {
//		x: session.pos.x,
//		y: session.pos.y,
//		z: session.pos.z,
//		normal: normal,
//		constant
//	});
//
//	var geometry = new THREE.PlaneGeometry(normal, constant);
//	var mesh = makeMesh(geometry, THREE.DoubleSide);
//	return mesh;
//
//}
//
/*
 * Draw a ring using current cursor position as origin
 *
 * @param {Number} innerRadius
 * @param {Number} outerRadius
 * @param {Number} thetaSegments
 * @param {Number} phiSegments
 * @param {Number} thetaStart
 * @param {Number} thetaLength
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 * TODO: more efficient positioning
 */
function ring(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength) {
	innerRadius = innerRadius || 1;
	outerRadius = outerRadius || innerRadius + 1;
	thetaSegments = thetaSegments || session.settings.poly;
	phiSegments = phiSegments || session.settings.poly;
	utils.record('ring', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		innerRadius: innerRadius,
		outerRadius: outerRadius
	});

	var geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength);
	var mesh = makeMesh(geometry, THREE.DoubleSide);
	return mesh;
}

/*
 * Draw a sphere using current cursor position as origin
 *
 * @param {Number} radius
 * @param {Number} widthSegments
 * @param {Number} heightSegments
 * @param {Number} phiStart
 * @param {Number} phiLength
 * @param {Number} thetaStart
 * @param {Number} thetaLength
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function sphere(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
	widthSegments = widthSegments || session.settings.poly;
	heightSegments = heightSegments || session.settings.poly;
	utils.record('sphere', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
	var mesh = makeMesh(geometry);
	return mesh;
}

/*
 * Draw a SHAPE using current cursor position as origin
 *
 * @param {Number} radius
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function tetrahedron(radius) {

	utils.record('tetrahedron', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var geometry = new THREE.TetrahedronGeometry(radius);
	var mesh = makeMesh(geometry);
	return mesh;
}

/*
 * Draw a torus using current cursor position as origin
 *
 * @param {Number} radius
 * @param {Number} tube
 * @param {Number} radialSegments
 * @param {Number} tubularSegments
 * @param {Number} arc
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function torus(radius, tube, radialSegments, tubularSegments, arc) {
	radialSegments = radialSegments || session.settings.poly;
	tubularSegments = tubularSegments || session.settings.poly;

	utils.record('torus', {

		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius,
		tube: tube
	});

	var geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
	var mesh = makeMesh(geometry);
	return mesh;
}

/*
 * Draw a torus knot using current cursor position as origin
 *
 * @param {Number} radius
 * @param {Number} tube
 * @param {Number} radialSegments
 * @param {Number} tubularSegments
 * @param {Number} p
 * @param {Number} q
 * @param {Number} heightScale
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function torusKnot(radius, tube, radialSegments, tubularSegments, p, q, heightScale) {
	radius = radius || 4;
	tube = tube || 1;
	radialSegments = radialSegments || session.settings.poly * 4;
	tubularSegments = tubularSegments || session.settings.poly;

	utils.record('torusKnot', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius,
		tube: tube
	});

	var geometry = new THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale);
	var mesh = makeMesh(geometry);
	return mesh;
}

module.exports = {
	box: box,
	cube: cube,
	cylinder: cylinder,
	dodecahedron: dodecahedron,
	donut: torus,
	ico: icosahedron,
	icosahedron: icosahedron,
	octahedron: octahedron,
//	plane: plane,
	ring: ring,
	sphere: sphere,
	tetrahedron: tetrahedron,
	torus: torus,
	torusKnot: torusKnot
};
