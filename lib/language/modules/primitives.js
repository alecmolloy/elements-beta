/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
	SOM = require('../som'),
	utils = require('../utils'),
	THREE = require('three');


function makeMesh(geometry) {
	material = session.elements.material;
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = session.pos.x;
	mesh.position.y = session.pos.y;
	mesh.position.z = session.pos.z;
	session.scene.add(mesh);
	return mesh;
}

function checkLibrary(test) {
	// First check: identical names
	// get the name of the test object, and iterate through the array of SOM.geometries to find identical names
	var match = false;
	testNames:
		for (var i = 0; i < SOM.geometries.length; i++) {
			var check = SOM.geometries[i];

			var testName = Object.keys(check)[0];
			var checkName = Object.keys(test)[0];
			if (checkName === testName) {
				// Second check: identical parameters
				testParameters: for (testKey in test[testName]) {
					// If the key isn't in both objects
					if (testKey === 'geometry') {
						continue;
					} else if (check[checkName].hasOwnProperty(testKey)) {
						if (check[checkName][testKey] === test[testName][testKey]) {
							match = check[checkName].geometry;
						} else {
							break testNames;
						}
					} else {
						break;
					}
				}
			}
		}
	return match;
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
function box(width, height, depth, widthSegments, heightSegments, depthSegments) {
	width = typeof width !== 'undefined' ? width : 10;
	height = typeof height !== 'undefined' ? height : width;
	depth = typeof depth !== 'undefined' ? depth : width;
	widthSegments = typeof widthSegments !== 'undefined' ? widthSegments : 1;
	heightSegments = typeof widthSegments !== 'undefined' ? widthSegments : 1;
	depthSegments = typeof depthSegments !== 'undefined' ? depthSegments : 1;

	utils.record('box', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		width: width,
		height: height,
		depth: depth,
		isCube: (width === height) && (width === depth)
	});

	var test = {
		box: {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments
		}
	};

	if (!(test.box.geometry = checkLibrary(test))) {
		test.box.geometry = new THREE.BoxGeometry(width, height, depth);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.box.geometry);
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
function cylinder(radius, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength) {
	radius = typeof radius !== 'undefined' ? radius : 5;
	height = typeof height !== 'undefined' ? height : radius * 2	;
	radiusSegments = typeof radiusSegments !== 'undefined' ? radiusSegments : session.settings.poly;
	heightSegments = typeof heightSegments !== 'undefined' ? heightSegments : 1;
	openEnded = typeof openEnded !== 'undefined' ? openEnded : false;
	thetaStart = typeof thetaStart !== 'undefined' ? thetaStart : 0;
	thetaLength = typeof thetaLength !== 'undefined' ? thetaLength : Math.PI * 2;

	// Cylinders can have different radii for top and bottom parts. If initialised with a number, make it an object:
	radius = typeof radius === 'number' ? {
		top: radius,
		bottom: radius
	} : radius;

	utils.record('cylinder', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius,
		height: height,
		radiusSegments: radiusSegments,
		heightSegments: heightSegments,
		openEnded: openEnded,
		thetaStart: thetaStart,
		thetaLength: thetaLength
	});

	var test = {
		cylinder: {
			radius: radius,
			height: height,
			radiusSegments: radiusSegments,
			heightSegments: heightSegments,
			openEnded: openEnded,
			thetaStart: thetaStart,
			thetaLength: thetaLength
		}
	};

	if (!(test.cylinder.geometry = checkLibrary(test))) {
		test.cylinder.geometry = new THREE.CylinderGeometry(radius.top, radius.bottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.cylinder.geometry);
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
	radius = typeof radius !== 'undefined' ? radius : 10;

	utils.record('icosahedron', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var test = {
		icosahedron: {
			radius: radius
		}
	};
	if (!(test.icosahedron.geometry = checkLibrary(test))) {
		test.icosahedron.geometry = new THREE.IcosahedronGeometry(radius);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.icosahedron.geometry);
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
	radius = typeof radius !== 'undefined' ? radius : 10;

	utils.record('dodecahedron', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var test = {
		dodecahedron: {
			radius: radius
		}
	};

	if (!(test.dodecahedron.geometry = checkLibrary(test))) {
		test.dodecahedron.geometry = new THREE.DodecahedronGeometry(radius);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.dodecahedron.geometry);
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
	radius = typeof radius !== 'undefined' ? radius : 10;

	utils.record('octahedron', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var test = {
		octahedron: {
			radius: radius
		}
	};

	if (!(test.octahedron.geometry = checkLibrary(test))) {
		test.octahedron.geometry = new THREE.OctahedronGeometry(radius);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.octahedron.geometry);
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
	width = typeof width !== 'undefined' ? width : 10;
	height = typeof height !== 'undefined' ? height : width;

	utils.record('plane', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		width: width,
		height: height
	});

	var test = {
		plane: {
			width: width,
			heigh: height
		}
	};

	if (!(test.plane.geometry = checkLibrary(test))) {
		test.plane.geometry = new THREE.PlaneGeometry(width, height);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.plane.geometry);
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
	innerRadius = typeof innerRadius !== 'undefined' ? innerRadius : 10;
	outerRadius = typeof outerRadius !== 'undefined' ? outerRadius : innerRadius + 5;
	thetaSegments = typeof thetaSegments !== 'undefined' ? thetaSegments : session.settings.poly;
	phiSegments = typeof phiSegments !== 'undefined' ? phiSegments : session.settings.poly;
	thetaStart = typeof thetaStart !== 'undefined' ? thetaStart : 0;
	thetaLength = typeof thetaLength !== 'undefined' ? thetaLength : Math.PI * 2;

	utils.record('ring', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		innerRadius: innerRadius,
		outerRadius: outerRadius,
		thetaSegments : thetaSegments,
		phiSegments : phiSegments,
		thetaStart : thetaStart,
		thetaLength : thetaLength
	});

	var test = {
		ring: {
			innerRadius: innerRadius,
			outerRadius: outerRadius,
			thetaSegments : thetaSegments,
			phiSegments : phiSegments,
			thetaStart : thetaStart,
			thetaLength : thetaLength
		}
	};

	if (!(test.ring.geometry = checkLibrary(test))) {
		test.ring.geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.ring.geometry);
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
	radius = typeof radius !== 'undefined' ? radius : 10;
	widthSegments = typeof widthSegments !== 'undefined' ? widthSegments : session.settings.poly;
	heightSegments = typeof heightSegments !== 'undefined' ? heightSegments : session.settings.poly;
	phiStart = typeof phiStart !== 'undefined' ? phiStart : 0;
	phiLength = typeof phiLength !== 'undefined' ? phiLength : Math.PI * 2;
	thetaStart = typeof thetaStart !== 'undefined' ? thetaStart : 0;
	thetaLength = typeof thetaLength !== 'undefined' ? thetaLength : Math.PI * 2;

	utils.record('sphere', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius : radius,
		widthSegments : widthSegments,
		heightSegments : heightSegments,
		phiStart : phiStart,
		phiLength : phiLength,
		thetaStart : thetaStart,
		thetaLength : thetaLength
	});

	var test = {
		sphere: {
			radius : radius,
			widthSegments : widthSegments,
			heightSegments : heightSegments,
			phiStart : phiStart,
			phiLength : phiLength,
			thetaStart : thetaStart,
			thetaLength : thetaLength
		}
	};

	if (!(test.sphere.geometry = checkLibrary(test))) {
		test.sphere.geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.sphere.geometry);
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
	radius = typeof radius !== 'undefined' ? radius : 10;

	utils.record('tetrahedron', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius: radius
	});

	var test = {
		tetrahedron: {
			radius: radius
		}
	};

	if (!(test.tetrahedron.geometry = checkLibrary(test))) {
		test.tetrahedron.geometry = new THREE.TetrahedronGeometry(radius);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.tetrahedron.geometry);
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
	radius = typeof radius !== 'undefined' ? radius : 5;
	tube = typeof tube !== 'undefined' ? tube : 1;
	radialSegments = typeof radialSegments !== 'undefined' ? radialSegments : session.settings.poly;
	tubularSegments = typeof tubularSegments !== 'undefined' ? tubularSegments : session.settings.poly;
	arc = typeof arc !== 'undefined' ? arc : Math.PI * 2;

	utils.record('torus', {
		x: session.pos.x,
		y: session.pos.y,
		z: session.pos.z,
		radius : radius,
		tube : tube,
		radialSegments : radialSegments,
		tubularSegments : tubularSegments,
		arc : arc
	});

	var test = {
		torus: {
			radius : radius,
			tube : tube,
			radialSegments : radialSegments,
			tubularSegments : tubularSegments,
			arc : arc
		}
	};

	if (!(test.torus.geometry = checkLibrary(test))) {
		test.torus.geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.torus.geometry);
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
	radius = typeof radius !== 'undefined' ? radius : 5;
	tubeRadius = typeof tubeRadius !== 'undefined' ? tubeRadius : 1;
	p = typeof p !== 'undefined' ? p : 2;
	q = typeof q !== 'undefined' ? q : 3;
	radialSegments = typeof radialSegments !== 'undefined' ? radialSegments : session.settings.poly * 8;
	tubularSegments = typeof tubularSegments !== 'undefined' ? tubularSegments : session.settings.poly * 1.5;
	heightScale = typeof heightScale !== 'undefined' ? heightScale : 1;

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

	var test = {
		torusKnot: {
			radius: radius,
			tubeRadius: tubeRadius,
			p: p,
			q: q,
			radialSegments: radialSegments,
			tubularSegments: tubularSegments,
			heightScale: heightScale
		}
	};

	if (!(test.torusKnot.geometry = checkLibrary(test))) {
		test.torusKnot.geometry = new THREE.TorusKnotGeometry(radius, tubeRadius, radialSegments, tubularSegments, p, q, heightScale);
		SOM.geometries.push(test);
	}
	var mesh = makeMesh(test.torusKnot.geometry);
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
