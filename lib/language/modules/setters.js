/*
 * Setters language module
 *
 * Collection of setup commands
 */

var session = require('../session'),
    utils = require('../utils');

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
    utils.record('color', { color: val });
}

module.exports = {
    color       : color,
    poly      	: poly
};
