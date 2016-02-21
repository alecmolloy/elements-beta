var math = Object.getOwnPropertyNames(Math);
for (var key in math) {
	if (math[key] !== 'random') {
    	module.exports[math[key]] = Math[math[key]];
	}
}
