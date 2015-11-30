/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
	THREE = require('three');

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
	var material = new THREE.MeshPhongMaterial({
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
 * Draw a square using current cursor position as origin
 *
 * @param {Number} size
 * @return void
 */
function cube(size) {
    var mesh = box(size, size, size);
	return mesh;
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
	var material = new THREE.MeshPhongMaterial({
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

module.exports = {
    box   	: box,
	cube	: cube,
	icosahedron	: icosahedron
};
