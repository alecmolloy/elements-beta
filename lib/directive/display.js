"use strict";
var app = require('../app'),
    session = require('../language/session'),
    language = require('../language'),
    fileUtil = require('../util/file'),
    td = require('throttle-debounce'),
	THREE = require('three'),
    firstRender = true,
    THROTTLE_MS,
    config;

/*
 * Display directive
 *
 * Handles live updating execution of code and rendering coming from its model
 */


app.directive('display', function ($window, $timeout, $rootScope) {
    config = $rootScope.cfg;
    THROTTLE_MS = config.OFFLINE ? 1000 : 1;

    return {
        require     : '^workspace',
        restrict    : 'E',
        templateUrl : '/directive/display.html',
        scope       : {
            source  : '=',
            mode    : '=',
            sharing : '=',
            resetFn : '='
        },
        link        : function (scope, element, attrs, workspaceCtl) {

            var win = angular.element($window),
                loadInput = element.find('input')[0];
			var fullscreen = false;

            // Attach workspace to scope
            scope.workspace = workspaceCtl || null;
            /*
             * Initialise directive
             *
             * @return void
             */
            function init() {
                loadInput.onchange = scope.loadFile;
                scope.canvas = element.find('canvas')[0];
                scope.resize();
                scope.$watch('source', scope.update);

				// Watch for full-screen changes and toggle full screen body class
                document.getElementsByTagName('display')[0].addEventListener('dblclick', function () {
					fullscreen = !fullscreen;
					updateFullscreenState(fullscreen);
				});

                if (scope.workspace && scope.workspace.scope._shareCache) {
                    scope.setOpenModal('share');
                }
            }

            /*
             * Set editor's code to given value
             *
             * @param {String} code
             * @return {Object}
             */
            scope.setCode = function (val) {
                // Next tick..
                setTimeout(function () {
                    scope.workspace.scope.editor.ngModel = val;
                    scope.workspace.scope.editor.$apply();
                });
            };

            /*
             * Reset editor's code and run `resetFn` if assigned to scope
             *
             * @return {Object}
             */
            scope.resetCode = function () {
                scope.setCode('');

                if (typeof scope.resetFn === 'function') {
                    scope.resetFn();
                }
            };

            /*
             * Get canvas center
             *
             * @return {Object}
             */
            scope.getCenter = function () {
                return {
                    x : 0,
                    y : 0,
                    z : 0
                };
            };

            /*
             * Set open modal id
             *
             * @param {String} modalId
             * @return void
             */
            scope.setOpenModal = function (modalId) {
                scope.openModal = modalId;
            };

            /*
             * Update render evaluating code
             *
             * @return void
             */
            scope.update = td.throttle(THROTTLE_MS, false, function () {
                var language = require('../language/index'),
                    settings = scope,
                    err;

                // Reset error, evaluate code and catch new potential errors
                scope.error = null;
                err = language.run(scope.source, settings);

                if (err) {
                    // Drawing failed
                    scope.drawingFailed = true;

                    if ('loc' in err) {
                        displayEditorError(err);
                    }
                } else {
                    // Drawing succeded
                    scope.drawingFailed = false;
                    workspaceCtl.scope.error = null;
                }
            });

            /*
             * Display error caught from the editor
             *
             * @param {Object} err
             * @return void
             */
            function displayEditorError(err) {
                workspaceCtl.scope.error = {
                    row    : err.loc ? err.loc[0] : null,
                    column : err.loc ? err.loc[1] : null,
                    text   : err.message,
                    type   : err.type
                };
            }

            /*
             * Update full-scree state
             *
             * @param {Boolean} state
             * @return void
             */
            function updateFullscreenState() {
                angular.element(document.body).toggleClass('full-screen-display');
				scope.resize();
            }

            /*
             * Page resize callback - re-render the drawing with new size
             *
             * @return void
             */
            scope.resize = function () {
                scope.ratio = window.devicePixelRatio || 1;
				fullscreen = fullscreen || false;

				if (fullscreen) {
					scope.width = window.innerWidth;
					scope.height = window.innerHeight;
				} else {
					scope.width = 500;
					scope.height = 500;
				}

				scope.canvas.width = scope.width * scope.ratio;
				scope.canvas.height = scope.height * scope.ratio;

				if (session.renderer) {
					language.resizeCamera(scope.width, scope.height);
				}

//                scope.update();
            };

            /*
             * Handle and display errors from the editor
             *
             * @param {Error} error
             * @return void
             */
            workspaceCtl.setErrorCallback(function (error) {
                if (scope.drawingFailed && error) {
                    scope.error = error;

                    // Quirk: Apply scope in next tick
                    setTimeout(function () {
                        scope.$apply();
                    });
                }
            });


            // Bind resize event
            win.bind('resize', function () {
                scope.$apply(scope.resize);
            });

//            /*
//             * HACK:
//             * Sometimes brakes when rendering text before fonts are loaded,
//             * and window.onload doesn't trigger anymore - so this is a
//             * temporary workaround
//            */
//            if (firstRender) {
//                setTimeout(scope.update.bind(this), 1000);
//                firstRender = false;
//            }

            /*
             * Load data locally from file input
             *
             * @return void
             */
            scope.loadFile = function () {
                var file = loadInput.files[0],
                    reader = new FileReader();

                reader.onload = function (evt) {
                    var fileData = evt.target.result;

                    scope.setCode(fileData);
                };

                reader.readAsText(file);
            };

            /*
             * Open save dialog if offline, otherwise download current code blob
             *
             * @return void
             */
            scope.save = function () {
                var blob;
                if (config.OFFLINE) {
                    return scope.setOpenModal('save');
                }

                blob = new Blob([scope.source], { type: 'text/plain' });

                fileUtil.downloadBlob(blob, 'creation.elements');
            };

            init();
        }
    };
});
