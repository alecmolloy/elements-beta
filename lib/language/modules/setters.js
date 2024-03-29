/*
 * Setters language module
 *
 * Collection of setup commands
 */

var session = require('../session'),
	SOM = require('../som'),
    utils = require('../utils'),
	THREE = require('three');

/*
 * Set the camera's position
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return void
 */

function camera(x, y, z) {
	x = typeof x !== 'undefined' ? x : 100;
	y = typeof y !== 'undefined' ? y : x;
	z = typeof z !== 'undefined' ? z : x;
    SOM.cameras.main.position.set(x, y, z);
}

/*
 * Set the camera's target
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return void
 */

function cameraTarget(x, y, z) {
	x = typeof x !== 'undefined' ? x : 0;
	y = typeof y !== 'undefined' ? y : x;
	z = typeof z !== 'undefined' ? z : x;
    session.cameraControls.target.set(x, y, z);
}

/*
 * Set current session poly count
 *
 * @param {Number} count
 * @return void
 */
function poly(count) {
	session.settings.poly = count;
    utils.record('poly', count);
}
/*
 * Set current session color
 *
 * @param {String} color
 * @return void
 */
function color(val) {
    val = utils.parseColor(val);
    session.settings.color = val || 'transparent';
	utils.updateMaterial();
    utils.record('color', { color: val });
}

/*
 * Set current session material
 *
 * @param {String} material
 * @return void
 */
function material(val) {
	val = val || 'phong';
	switch (val) {
		case 'basic':
			session.settings.material = THREE.MeshBasicMaterial;
			break;
		case 'depth':
			session.settings.material = THREE.MeshDepthMaterial;
			break;
		case 'lambert':
			session.settings.material = THREE.MeshLambertMaterial;
			break;
		case 'normal':
			session.settings.material = THREE.MeshNormalMaterial;
			break;
		case 'phong':
		default:
			session.settings.material = THREE.MeshPhongMaterial;
			break;
	}
	utils.updateMaterial();
    utils.record('material', { material: val });
}

/*
 * Set current session shading type
 *
 * @param {String} color
 * @return void
 */
function shading(type) {
    session.settings.shading = type || THREE.FlatShading;
	utils.updateMaterial();
    utils.record('shading', { shading : type });
}

/*
 * Set current session shininess type
 *
 * @param {String} color
 * @return void
 */
function shininess(type) {
    session.settings.shininess = type || 0;
	utils.updateMaterial();
    utils.record('shininess', { shininess : type });
}

/*
 * Set current session sidedness
 *
 * @param {String} sidedness
 * @return void
 */
function sides(val) {
    session.settings.sidedness = typeof val !== 'undefined' ? val : THREE.DoubleSided;
	utils.updateMaterial();
    utils.record('sidedness', { sidedness : val });
}

/*
 * Set current session specular
 *
 * @param {String} specular
 * @return void
 */
function specular(val) {
    session.settings.specular = typeof val !== 'undefined' ? val : 0x101010;
	utils.updateMaterial();
    utils.record('specular', { specular : val });
}

/*
 * Set current session stroke color
 *
 * @param {String} color
 * @return void
 */
function strokeColor(color) {
    color = utils.parseColor(color);
    session.settings.stroke.color = color;
    utils.record('stroke-color', { color: color });
}

/*
 * Set current session stroke width
 *
 * @param {Number} val
 * @return void
 */
function strokeWidth(val) {
    session.settings.stroke.width = val;
    utils.record('stroke-width', { width: val });
}

/*
 * Set current session mixed stroke attributes
 *
 * @param {*...} attributes
 * @return void
 */
function stroke() {
    var style = utils.parseLineStyle(arguments);
    if (style.color) { strokeColor(style.color); }
    if (typeof style.width !== 'undefined') { strokeWidth(style.width); }
}

function lookAt(x, y, z) {
	x = x || 0;
	y = y || x;
	z = z || x;
    session.cameraControls.target = new THREE.Vector3(x, y, z);
}

/*
 * Set current session opacity attributes
 *
 * @param {Number} attributes
 * @return void
 */
function opacity(val) {
    session.settings.opacity = val || 1;
	utils.updateMaterial();
    utils.record('opacity', { opacity: val });
}

module.exports = {
	camera    	: camera,
	cameraTarget: cameraTarget,
    color       : color,
    material   	: material,
   	lookAt    	: lookAt,
	opacity    	: opacity,
    poly      	: poly,
	shading		: shading,
	shininess	: shininess,
	sides		: sides,
	specular	: specular,
	stroke		: stroke,
	strokeColor	: strokeColor,
	strokeWidth : strokeWidth
};
