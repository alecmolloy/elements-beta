/*
 * Main Index module
 *
 * Import and initialise apps and all modules from here
 */

// Filters
require('./filter/markdown');
require('./filter/number');
require('./filter/string');

// Router
require('./routes');

// Service
require('./service/email');
require('./service/content');

// Controllers
require('./controller/main');
require('./controller/challenges');
require('./controller/challenge');
require('./controller/playground');
require('./controller/docs');
require('./controller/loadDialog');
require('./controller/share');
require('./controller/local-launch');

// Directives
require('./directive/workspace');
require('./directive/editor');
require('./directive/display');
require('./directive/progress-circle');
require('./directive/export-modal');
