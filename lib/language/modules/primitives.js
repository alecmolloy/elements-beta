/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
	utils = require('../utils'),
	THREE = require('three');

function makeMesh(geometry, side) {

	var isTransparant = session.settings.opacity < 1;
	material = new THREE.MeshPhongMaterial({
		color: session.settings.color,
		shading: session.settings.shading,
		specular: session.settings.specular,
		shininess: session.settings.shininess,
		transparent: isTransparant,
		opacity: session.settings.opacity,
		side : isTransparant ? THREE.DoubleSide : (side || THREE.FrontSide)
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
	width = width || 10;
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
		radius = radius || 10;
		height = height || radius * 2;
		openEnded = openEnded || false;

		// Cylinders can have different radii for top and bottom parts. If initialised with a number, make it an array:
		if (typeof radius === 'number') {
			radius = {
				top : radius,
				bottom : radius
			}
		}

		utils.record('cylinder', {
			x: session.pos.x,
			y: session.pos.y,
			z: session.pos.z,
			radius: radius,
			height: height,
			openEnded: openEnded
		});

		var geometry = new THREE.CylinderGeometry(radius[0], radius[1], height, session.settings.poly, 1, openEnded, Math.PI / 2, 2 * Math.PI);
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
		utils.record('cube', {
			x: session.pos.x,
			y: session.pos.y,
			z: session.pos.z,
			width: size,
			height: size,
			depth: size,
			isCube: true
		});

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
 * @param {Number} width
 * @param {Number} height
 * @return mesh
 *
 */
function plane(width, height) {
	height = height || width
	utils.record('plane', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		width: width,
		height: height
	});

	var geometry = new THREE.PlaneGeometry(width, height);
	var mesh = makeMesh(geometry, THREE.DoubleSide);
	return mesh;

}

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
	innerRadius = innerRadius || 5;
	outerRadius = outerRadius || innerRadius + 5;
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
function torusKnot(radius, tubeRadius, p, q, radialSegments, tubularSegments, heightScale) {
	radius = radius || 4;
	tubeRadius = tubeRadius || 1;
	radialSegments = radialSegments || session.settings.poly * 4;
	tubularSegments = tubularSegments || session.settings.poly;

	utils.record('torusKnot', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius,
		tubeRadius: tubeRadius,
		p: p,
		q: q,
		radialSegments: radialSegments,
		tubularSegments: tubularSegments,
		heightScale: heightScale
	});

	var geometry = new THREE.TorusKnotGeometry(radius, tubeRadius, radialSegments, tubularSegments, p, q, heightScale);
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
	plane: plane,
	ring: ring,
	sphere: sphere,
	tetrahedron: tetrahedron,
	torus: torus,
	torusKnot: torusKnot
};
