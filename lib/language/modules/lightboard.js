/*
 * Lightboard drawing module
 *
 * Lightboard drawing for Elements Editor
 */

var session = require('../session'),
	THREE = require('three'),
	state,
	KANO,
	threeObject,
	LEDMeshes,
	empty = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

var setup = function () {
	resetBoard();
	LEDMeshes = new Array();
	for (var i = 0; i < 14; i++) {
		LEDMeshes.push(new Array(9));
	}

	// LightBoard Scene
	fillScene();
}

var resetBoard = function () {
	state = empty;
}

var fillScene = function () {
	session.scene = new THREE.Scene();

	// Add lights
	var ambientLight = new THREE.AmbientLight(0x333333);
	var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
	light.position.set(2, 4, 5);
	var light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
	light2.position.set(-5, 2.5, -2);
	session.scene.add(ambientLight);
	session.scene.add(light);
	session.scene.add(light2);

	threeObject = new THREE.Object3D();
	// addlights
	drawCircuitBoard();
	drawGPIO();
	drawLEDs();
	threeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), .225);
	session.scene.add(threeObject);
}

var drawCircuitBoard = function () {
	var geometry = new THREE.BoxGeometry(56, 1.6, 56);
	var texture = new THREE.ImageUtils.loadTexture("assets/textures/led-lightboard.png");
	var material = new THREE.MeshBasicMaterial({
		color: 0x5f6060,
		map: texture,
		shading: THREE.FlatShading
	});

	var mesh = new THREE.Mesh(geometry, material);
	threeObject.add(mesh);
}

var drawLEDs = function () {
	var ledGeo = new THREE.BoxGeometry(4, 1, 1.5);
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 14; y++) {
			var dx = (x * 5.5) - 19.75;
			var dz = (y * 3.15) - 16.5;

			var ledMaterial = new THREE.MeshPhongMaterial({
				color: 0x111111,
				shininess: 0,
				transparent: true,
				opacity: 0.85
			});
			var ledMesh = new THREE.Mesh(ledGeo, ledMaterial);

			ledMesh.translateX(dx);
			ledMesh.translateY(1);
			ledMesh.translateZ(dz);

			var pointLight = new THREE.PointLight(0xff0000, 1, 100)

			threeObject.add(ledMesh);
			LEDMeshes[y][x] = ledMesh;
		}
	}
}

var renderLEDs = function () {
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 14; y++) {
			var intensity = state[y][x];
			LEDMeshes[y][x].emissive = new THREE.Color(intensity / 7, intensity / 7, intensity / 7);
		}
	}
}

var drawGPIO = function () {
	var GPIO = new THREE.Object3D;

	// Draw GPIO Box
	var boxGeometry = new THREE.BoxGeometry(33.4, 8.0, 5);
	var boxMaterial = new THREE.MeshPhongMaterial({
		color: 0x000000
	});
	var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	boxMesh.translateX(-10);
    boxMesh.translateY(-6 - .8);
    boxMesh.translateZ(-23.625);
	GPIO.add(boxMesh);

	// Draw GPIO Pins
	// Draw solder
	solderGeometry = new THREE.CylinderGeometry(0.35, 0.7, 2, 10);
	solderMaterial = new THREE.MeshPhongMaterial({
		color: 0xaaaaaa,
		shininess: 100
	});

	// GPIO pin
	pinGeometry = new THREE.BoxGeometry(.5, 5, .5);
	pinMaterial = new THREE.MeshPhongMaterial({
		color: 0xf7a421,
		shininess: 100
	});

	// GPIO housing
	housingGeometry = new THREE.CylinderGeometry(1.375, 1.375, 2, 5);
	housingMaterial = new THREE.MeshPhongMaterial({
		color: 0x000000
	});

	for (var x = 0; x < 13; x++) {
		for (var y = 0; y < 2; y++) {
			solderMesh = new THREE.Mesh(solderGeometry, solderMaterial);
			solderMesh.translateX((x * 2.55) - 25.55);
			solderMesh.translateY(0.5 + 0.8);
			solderMesh.translateZ((2.55 * y) - 25.05);
			GPIO.add(solderMesh);

			pinMesh = new THREE.Mesh(pinGeometry, pinMaterial);
			pinMesh.translateX((x * 2.55) - 25.55);
			pinMesh.translateY(-2);
			pinMesh.translateZ((2.55 * y) - 25.05);
			GPIO.add(pinMesh);

			housingMesh = new THREE.Mesh(housingGeometry, housingMaterial);
			housingMesh.translateX((x * 2.55) - 25.55);
			housingMesh.translateY(-1 - 0.8);
			housingMesh.translateZ((2.55 * y) - 25.05);
			GPIO.add(housingMesh);
		}
	}
	threeObject.add(GPIO);
}

setup();

module.exports = {
	empty		: empty,
	LEDMeshes	: LEDMeshes,
	renderLEDs	: renderLEDs,
	resetBoard	: resetBoard,
	setup		: setup,
	state		: state
}
