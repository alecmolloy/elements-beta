/*
 * Make Light language module
 *
 * The Make Light virtual library for Elements Editor
 */

var session = require('../session'),
	THREE = require('three'),
	lightboard = require('./lightboard');

function Light() {}

Light.prototype.led = function (x, y, light) {
	light /= 7;
	light *= 255;
	lightboard.LEDMeshes[y][x].material.emissive = new THREE.Color(light, light, light);
};

Light.prototype.checkLight = function (light) {
	if (light === undefined || light === true) {
		light = 7;
	}
	if (light === false) {
		light = 0;
	} else {}
	return light;
};

Light.prototype.render = function () {
	for (var x = 0; x <= 8; ++x) {
		for (var y = 0; y <= 13; ++y) {
			this.led(x, y, lightboard.state[y][x])
		}
	}
}

Light.prototype.on = function (location, light) {
	light = this.checkLight(light);
	lightboard.state[location[1]][location[0]] = light;
	this.render();
};

Light.prototype.off = function (location) {
	lightboard.state[location[1]][location[0]] = 0;
	this.render();
};

Light.prototype.all = function () {
	for (x = 0; x <= 8; ++x) {
		for (y = 0; y <= 13; ++y) {
			lightboard.state[y][x] = 7;
		}
	}
	this.render();
};

Light.prototype.line = function (A, B, light) {
	light = this.checkLight(light);
	var adjust, delta, i, j, m, offset, ref, ref1, ref2, ref3, ref4, rise, run, threshold, x, x1, x2, y, y1, y2;
    ref = [A[0], A[1], B[0], B[1]], x1 = ref[0], y1 = ref[1], x2 = ref[2], y2 = ref[3];
    run = x2 - x1;
    rise = y2 - y1;
    m = rise / run;
    adjust = m >= 0 ? 1 : -1;
    offset = 0;
    threshold = 0.5;
    if (m <= 1 && m >= -1) {
      delta = Math.abs(m);
      y = y1;
      for (x = i = ref1 = x1, ref2 = x2; ref1 <= ref2 ? i <= ref2 : i >= ref2; x = ref1 <= ref2 ? ++i : --i) {
		lightboard.state[y][x] = light;
        offset += delta;
        if (offset >= threshold) {
          y += adjust;
          threshold += 1;
        }
      }
    } else {
      delta = Math.abs(run / rise);
      x = x1;
      for (y = j = ref3 = y1, ref4 = y2; ref3 <= ref4 ? j <= ref4 : j >= ref4; y = ref3 <= ref4 ? ++j : --j) {
		lightboard.state[y][x] = light;
        offset += delta;
        if (offset >= threshold) {
          x += adjust;
          threshold += 1;
        }
      }
    }
    this.render();
}

Light.prototype.rectangle = function (A, B, light) {
	light = this.checkLight(light);
	var i, ref, ref1, results, x, y;
	var results = [];
	for (x = i = ref = A[0], ref1 = B[0]; ref <= ref1 ? i <= ref1 : i >= ref1; x = ref <= ref1 ? ++i : --i) {
		var j, ref2, ref3, results1;
		for (y = j = ref2 = A[1], ref3 = B[1]; ref2 <= ref3 ? j <= ref3 : j >= ref3; y = ref2 <= ref3 ? ++j : --j) {
			lightboard.state[y][x] = light;
			this.render();
		}
	}
};
Light.prototype.circle = function (width, center, light) {
	light = this.checkLight(light);
	var distance, i, j, r, ref, ref1, ref2, ref3, x, y;
	r = Math.round(width / 2);
	for (x = i = ref = -r, ref1 = r; ref <= ref1 ? i <= ref1 : i >= ref1; x = ref <= ref1 ? ++i : --i) {
		for (y = j = ref2 = -r, ref3 = r; ref2 <= ref3 ? j <= ref3 : j >= ref3; y = ref2 <= ref3 ? ++j : --j) {
			distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
			if (r >= distance) {
				lightboard.state[center[1] + y][center[0] + x] = light;
			}
		}
	}
	this.render();
};

Light.prototype.random_loc = function () {
	return [Math.floor(Math.random() * 9), Math.floor(Math.random(0) * 14)];
};

light = new Light();

module.exports = {
	light: light
}
