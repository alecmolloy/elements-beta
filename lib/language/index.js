/*
 * Language module
 *
 * Stateful, functional module that interprets the draw language
 */

var coffee = require('coffee-script'),
	THREE = require('three'),
	OrbitControls = require('three-orbit-controls')(THREE),
    config,
    session = require('./session'),
    modules = require('./modules/index'),
    ERROR_LOC_REGEX = /\s+at Object\.eval \((.+):(\d+):(\d+)\)/;

/*
 * Reset current drawing session
 *
 * @param {Object} settings
 * @return void
 */
function resetSession(settings) {
    "use strict";

    session.width = settings.width;
    session.height = settings.height;
    session.ratio = settings.ratio || 1;
    session.steps = [];
    modules.general.reset();

	session.canvas = document.getElementsByTagName('canvas')[0]; // not sure how to get this guy
	session.renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas : session.canvas,
		alpha: true
	});

	session.renderer.gammaInput = true;
	session.renderer.gammaOutput = true;
	session.renderer.setPixelRatio(session.ratio)
	session.renderer.setSize(session.width, session.height);
	session.renderer.setClearColor(0xffffff, 1);

	session.scene = new THREE.Scene();
	session.elements = {};

	session.elements.camera = new THREE.PerspectiveCamera(30, 1, 1, 1000000);
	session.settings.cameraPosition = new THREE.Vector3(100, 100, 100);
    session.elements.camera.position.copy(session.settings.cameraPosition);
	session.cameraControls = new OrbitControls(session.elements.camera, session.renderer.domElement);
	session.cameraControls.target.set(0, 0, 0);

	session.elements.lights = [];

	session.clock = new THREE.Clock();
}

function resizeCamera(width, height) {
	session.renderer.setSize( width, height );
	session.elements.camera.aspect = width / height;
	session.elements.camera.updateProjectionMatrix();
}

/*
 * Render loop
 */
function render () {
	var delta = session.clock.getDelta();
	session.cameraControls.update(delta);
	session.renderer.render(session.scene, session.elements.camera);
    if (typeof session.animationID === 'number') {
        window.cancelAnimationFrame(session.animationID);
    }
	session.animationID = window.requestAnimationFrame(render);
};

function animate () {

}

/*
 * Evaluate draw code with given settings object, returns a error object
 *
 * containing debug info in case of failure
 * @param {String} code
 * @param {Object} settings
 * @return {Object|void}
 */
function run(code, settings) {
    var compiled;

    config = window.CONFIG;
    code = preCompile(code || '');

    // Reset session
    resetSession(settings);
    session.steps = [];

    // Attempt compiling coffeescript
    try {
        compiled = coffee.compile(code || '', { sourceMap: true });
    } catch (err) {
        // Only warn in console if in debug mode
        if (config.DEBUG_LEVEL > 0 && !config.PRODUCTION) {
            console.error('[ Compile error ] ' +  err);
        }

        return {
            message : err.message,
            type    : 'compilation'
        };
    }

    // Evaluate compiled JavaScript in build context
    try {
        evalInContext.bind({})(compiled.js);
    } catch (err) {
        // Trace back error location from compiled source map
        var jsLoc = getErrorLocation(err),
            coffeeLoc = jsLoc ? compiled.sourceMap.sourceLocation(jsLoc) : null;

        // Only warn in console if in debug mode
        if (config.DEBUG_LEVEL > 0 && !config.PRODUCTION) {
            console.error('[ API error ] ' + err);
        }

        return {
            message : err.message,
            loc     : coffeeLoc,
            type    : 'execution'
        };
    }

    module.exports.cursorPosition = session.pos;
}

/*
 * Precompile step - Cleans the code up
 *
 * @param {String} code
 * @return {String}
 */
function preCompile(code) {
    "use strict";
    code = code
    // Only use fat arrow (Block access to Window through `this`)
    .replace(/->/g, '=>')
    // Allow thin arrow on constructor functions
    .replace(/(constructor\s*\:[^\=]*)=>/g, function (match, start) {
        return start + '->';
    });

    return code;
}

/*
 * Dirty-parse error location though error stack
 *
 * @param {Error} err
 * @return [{Number}]
 */
function getErrorLocation(err) {
    "use strict";
    var trace,
        traceTop,
        x,
        y;

    trace = err.stack.split('\n').map(function (line) {
        return line.match(ERROR_LOC_REGEX);
    }).filter(function (match) {
        return match !== null;
    });

    if (trace.length > 0) {
        traceTop = trace[0];

        x = parseInt(traceTop[2], 10) - 1;
        y = parseInt(traceTop[3], 10) - 1;

        return [x, y];
    } else {
        return null;
    }
}

/*
 * Normalise and remove unnecessary bits from the code
 *
 * @param {String} code
 * @return {String}
 */
function strip(code) {
    "use strict";
    if (code) {
        code = code
        // Remove multi-line comments
        .replace(/###((.|\n)*)###/gm, '')
        // Remove inline comments
        .replace(/[^' ](#.*)|^[ ]*(#.*)($|\n)/g, '')
        // Remove spaces
        .replace(/^\s*[\r\n]/gm, '');
        // Trim spaces on edges
        return code.trim();
    }

    return code;
}


function checkValidity(code) {
    "use strict";
    var compiled;
    try {
        compiled = coffee.compile(code || '', { sourceMap: true });
        return true;
    } catch (err) {
        return false;
    }
}

/*
 * Build a contained context containing the draw language API and eval code
 *
 * inside it
 * @param {String} code
 * @return void
 */
function evalInContext(code) {
    /* jshint unused: false, evil: true */
    var stage = {
            width  : session.width,
            height : session.height
        },
        m, c, value;

    // Loop through language modules and declare every property in this block
    for (m in modules) {
        if (modules.hasOwnProperty(m)) {

            for (c in modules[m]) {
                if (modules[m].hasOwnProperty(c)) {
                    // Declare property using eval
                    value = modules[m][c];

                    if (typeof value === 'function') {
                        value = value.bind({});
                    }

                    eval('var ' + c + ' = value;');
                }
            }
        }
    }

    eval(code);
	render()
}

module.exports = {
    animate	: animate,
	run   	: run,
	resizeCamera	: resizeCamera,
    strip 	: strip,
    checkValidity: checkValidity,
    evalInContext: evalInContext
};
