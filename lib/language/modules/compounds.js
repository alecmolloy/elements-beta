/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
	primitives = require('./primitives'),
	utils = require('../utils'),
	space = require('./space'),
	THREE = require('three');


/**
 *
 */
function capsule(dx, dy, dz, openTop, openBottom) {
	dx = dx || 0;
	dy = dy || 0;
	dz = dz || 0;
	radius = session.settings.stroke.width;
	if (typeof radius === 'number') {
		radius = [radius, radius];
	}
	openTop = false;
	openBottom = false;

	var bottom = new THREE.Vector3(session.pos.x, session.pos.y, session.pos.z);
	var top = new THREE.Vector3(session.pos.x + dx, session.pos.y + dy, session.pos.z + dz);

	utils.record('capsule', {
		x: bottom.x,
		y: bottom.y,
		z: bottom.z,
		dx: dx,
		dy: dy,
		dz: dz,
		radius: radius
	});

	material = new THREE.MeshPhongMaterial({
		color: session.settings.stroke.color,
		shading: session.settings.shading,
		specular: session.settings.specular,
		shininess: session.settings.shininess,
		side : THREE.FrontSide
	});


    var capsule = new THREE.Object3D();
	// get cylinder height
	var cylAxis = new THREE.Vector3();
	cylAxis.subVectors( top, bottom );
	var length = cylAxis.length();

	// get cylinder center for translation
	var center = new THREE.Vector3();
	center.addVectors( top, bottom );
	center.divideScalar( 2.0 );

	// always open-ended
	var cylinderGeo = new THREE.CylinderGeometry(radius[0], radius[1], length, session.settings.poly, 1, (!openTop || !openBottom), 0);
	var cylinder = new THREE.Mesh( cylinderGeo, material );

	capsule.add(cylinder);

	// pass in the cylinder itself, its desired axis, and the place to move the center

	// Sphere geometry to cap the cylinder if openTop and/or openBottom is false
	var sphereGeo = new THREE.SphereGeometry( radius[1], session.settings.poly, session.settings.poly );
    if (!openBottom){
		var sphereBottom = new THREE.Mesh(sphereGeo, material);
		capsule.add(sphereBottom);
		sphereBottom.translateY(-length / 2);
    }
    if (!openTop){
		var sphereTop = new THREE.Mesh(sphereGeo, material);
		capsule.add(sphereTop);
		sphereTop.translateY(length / 2);
    }
	makeLengthAngleAxisTransform( capsule, cylAxis, center );
    session.scene.add(capsule);
	return capsule;
}

// Transform cylinder to align with given axis and then move to center
function makeLengthAngleAxisTransform(cyl, cylAxis, center) {
    cyl.matrixAutoUpdate = false;

    // From left to right using frames: translate, then rotate; TR.
    // So translate is first.
    cyl.matrix.makeTranslation(center.x, center.y, center.z);

    // take cross product of cylAxis and up vector to get axis of rotation
    var yAxis = new THREE.Vector3(0, 1, 0);
    // Needed later for dot product, just do it now;
    // a little lazy, should really copy it to a local Vector3.
    cylAxis.normalize();
    var rotationAxis = new THREE.Vector3();
    rotationAxis.crossVectors(cylAxis, yAxis);
    if (rotationAxis.length() < 0.000001) {
        // Special case: if rotationAxis is just about zero, set to X axis,
        // so that the angle can be given as 0 or PI. This works ONLY
        // because we know one of the two axes is +Y.
        rotationAxis.set(1, 0, 0);
    }
    rotationAxis.normalize();

    // take dot product of cylAxis and up vector to get cosine of angle of rotation
    var theta = -Math.acos(cylAxis.dot(yAxis));
    //cyl.matrix.makeRotationAxis( rotationAxis, theta );
    var rotMatrix = new THREE.Matrix4();
    rotMatrix.makeRotationAxis(rotationAxis, theta);
    cyl.matrix.multiply(rotMatrix);
}

function lineTo(x, y, z, openTop, openBottom) {
	capsule(x - session.pos.x, y - session.pos.y, z - session.pos.z);
}

module.exports = {
	line	: capsule,
	lineTo	: lineTo,
	capsule	: capsule
};
