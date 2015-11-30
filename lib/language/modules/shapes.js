/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
	THREE = require('three');

function makeMesh(geometry, material) {
	material = material || new THREE.MeshPhongMaterial({
		color: session.settings.color,
		shading: session.settings.shading,
		specular: session.settings.specular,
		shininess: session.settings.shininess
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
 * @return void
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function box(width, height, depth) {
	height = height || width;
	depth = depth || width;

    utils.record('box', {
        x        : session.pos.x,
        y        : session.pos.y,
        z        : session.pos.z,
        width    : width,
        height   : height,
        depth    : depth,
        isCube   : (width === height) && (width === depth)
    });

	var geometry = new THREE.BoxGeometry(width, height, depth);
	var mesh = makeMesh(geometry);

	return mesh;
}
/*
 * Draw a cylinder using current cursor position as origin
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Number} depth
 * @return void
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
        x        : session.pos.x,
        y        : session.pos.y,
        z        : session.pos.z,
        radius   : radius,
        height   : height,
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
 * @return void
 */
function cube(size) {
	return box(size, size, size);
}
/*
 * Draw a icosahedron using current cursor position as origin
 *
 * @param {Number} radius
 * @return void
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function icosahedron(radius) {
    utils.record('icosahedron', {
        x        : session.pos.x,
        y        : session.pos.y,
        z        : session.pos.z,
        radius    : radius
    });

	var geometry = new THREE.IcosahedronGeometry(radius);
	var mesh = makeMesh(geometry);
	return mesh;
}

module.exports = {
    box   	: box,
	cube	: cube,
	cylinder: cylinder,
	ico		: icosahedron,
	icosahedron	: icosahedron
};
