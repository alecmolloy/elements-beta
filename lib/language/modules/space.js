/*
 * Space language module
 *
 * Collection of spacial and movement commands
 */

var session = require('../session'),
    utils = require('../utils');

/*
 * Move cursor to absolute x and y positions
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Boolean} record
 * @return void
 */
function moveTo(x, y, z, record) {
    record = typeof record === 'undefined' ? true : record;

    x = x || 0;
    y = y || 0;
    z = z || 0;

    var dx = x - session.pos.x,
        dy = y - session.pos.y,
        dz = z - session.pos.z;

    session.pos = { x: x, y: y, z : z };

    if (record) {
        utils.record('move-to', {
            x  : x,
            y  : y,
            z  : z,
            dx : dx,
            dy : dy,
            dz : dz
        });
    }

    x = session.pos.x;
    y = session.pos.y;
    z = session.pos.z;
}

/*
 * Move cursor by relative x and y amounts
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Boolean} record
 * @return void
 */
function move(x, y, z, record) {
    y = y || 0;
    z = z || 0;
    moveTo(session.pos.x + x, session.pos.y + y, session.pos.z + z, record);
}

module.exports = {
    moveTo : moveTo,
    move   : move
};
