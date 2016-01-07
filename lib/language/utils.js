/*
 * Utils language module
 *
 * Basic collection of utility commands
 */

var session = require('./session'),
    palette = require('./modules/palette.json');
/*
 * Parse stroke attributes from string and return stroke settings object
 *
 * @param {Boolean} close
 * @return {Object}
 */
function parseLineStyle(attributes) {
    var out = {},
        i, attr;

    for (i = 0 ; i < attributes.length; i += 1) {
        attr = attributes[i];

        if (typeof attr === 'number') {
            out.width = attr;
        } else {
            out.color = attr;
        }
    }

    return out;
}

/*
 * Get stage center in current session
 *
 * @return {Object}
 */
function getCenter() {
    return {
        x : 0,
        y : 0,
        z : 0
    };
}

/*
 * Record a step in current session history
 *
 * @param {String} type
 * @param {Object} options
 * @return void
 */
function recordStep(type, options) {
    session.steps.push({
        type    : type,
        options : options
    });
}

/*
 * Get a color from palette if it's an existing key or just return
 *
 * @param {String} val
 * @return void
 */
function parseColor(val) {
    return palette[val] || val;
}

/*
 * Convert true/false values to their proper colors, and provide a default white
 *
 * @param {*} val
 * @return {*}
 */
function sanitizeColor(val) {
	if (val === true || val === undefined) {
		val = '#FFF';
	} else if (val === false) {
		val = '#000';
    }
    return val;
}

/*
 * Given value is a valid color
 *
 * @param {*} val
 * @return {Boolean}
 */
function isColorValue(val) {
    if (typeof val !== 'string') { return false; }

    if (val.substr(0, 1) === '#' && val.length > 3 && val.length <= 7) {
        return true;
    } else if (palette[val]) {
        return true;
    }

    return false;
}

module.exports = {
    getCenter        : getCenter,
    record           : recordStep,
    parseColor       : parseColor,
    parseLineStyle   : parseLineStyle,
    isColorValue     : isColorValue,
    sanitizeColor    : sanitizeColor
};
