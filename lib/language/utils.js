/*
 * Utils language module
 *
 * Basic collection of utility commands
 */

var session = require('./session'),
    palette = require('./modules/palette.json');
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
    isColorValue     : isColorValue
};
