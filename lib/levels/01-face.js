var slides = require('./01-face.md'),
    palette = require('../language/modules/palette.json');

module.exports = {
    title       : 'Your first face',
    description : 'Draw a face',
    code        : '# Write the spell just below this line\n',
    slides      : slides,
    startAt     : 2,
    steps       : [

        /*
         * circle 200
         */
        function () {
            return this.isSequence([
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]);
        },

        /*
         * color yellow
         * circle 200
         */
        function () {
            return this.isSequence([
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]);
        },

        /*
         * stroke 20, black
         * color yellow
         * circle 200
         */
        function () {
            return this.isSequence([
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ],
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]);
        },

        /*
         * stroke 20, black
         * color yellow
         * circle 200
         * move -80, -80
         */
        function () {
            return this.isSequence([
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ],
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 200, isCircle: true } ],
                [ 'move-to', { dx: -80, dy: -80 } ]
            ]);
        },

        /*
         * stroke 20, black
         * color yellow
         * circle 200
         * move -80, -80
         * color black
         */
        function () {
            return this.isSequence([
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ],
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 200, isCircle: true } ],
                [ 'move-to', { dx: -80, dy: -80 } ],
                [ 'color', { color: palette.black} ]
            ]);
        },

        /*
         * stroke 20, black
         * color yellow
         * circle 200
         * move -80, -80
         * color black
         * circle 20
         */
        function () {
            return this.isSequence([
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ],
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 200, isCircle: true } ],
                [ 'move-to', { dx: -80, dy: -80 } ],
                [ 'color', { color: palette.black} ],
                [ 'ellipse', { rx: 20, isCircle: true } ]
            ]);
        },

        /*
         * stroke 20, black
         * color yellow
         * circle 200
         * move -80, -80
         * color black
         * circle 20
         * move 160
         * circle 20
         * move 160
         * circle 20
         */
        function () {
            return this.isSequence([
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ],
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 200, isCircle: true } ],
                [ 'move-to', { dx: -80, dy: -80 } ],
                [ 'color', { color: palette.black} ],
                [ 'ellipse', { rx: 20, isCircle: true } ],
                [ 'move-to', { dx: 160, dy: 0 } ],
                [ 'ellipse', { rx: 20, isCircle: true } ]
            ]);
        },

        /*
         * stroke 20, black
         * color yellow
         * circle 200
         * move -80, -80
         * color black
         * circle 20
         * move 160
         * circle 20
         * move 160
         * circle 20
         * moveTo 235, 270
         */
        function () {
            return this.isSequence([
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ],
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 200, isCircle: true } ],
                [ 'move-to', { dx: -80, dy: -80 } ],
                [ 'color', { color: palette.black} ],
                [ 'ellipse', { rx: 20, isCircle: true } ],
                [ 'move-to', { dx: 160, dy: 0 } ],
                [ 'ellipse', { rx: 20, isCircle: true } ],
                [ 'move-to', { x: 235, y: 270 } ]
            ]);
        },

        /*
         * stroke 20, black
         * color yellow
         * circle 200
         * move -80, -80
         * color black
         * circle 20
         * move 160
         * circle 20
         * move 160
         * circle 20
         * moveTo 235, 270
         * arc 100, 1, 2
         */
        function () {
            return this.isSequence([
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ],
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 200, isCircle: true } ],
                [ 'move-to', { dx: -80, dy: -80 } ],
                [ 'color', { color: palette.black} ],
                [ 'ellipse', { rx: 20, isCircle: true } ],
                [ 'move-to', { dx: 160, dy: 0 } ],
                [ 'ellipse', { rx: 20, isCircle: true } ],
                [ 'move-to', { x: 235, y: 270 } ],
                [ 'arc', { radius: 100, start: 1, end: 2 } ]
            ]);
        }

    ]
};