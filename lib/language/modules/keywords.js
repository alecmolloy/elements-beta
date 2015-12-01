// Generate addresses
var letters = 'ABCDEFGHIabcdefghi';
for (var x = 0; x < letters.length; x++) {
	for (var y = 1; y <= 14; y++) {
		module.exports[letters[x] + y] = [x % 9, y - 1];
	}
}

module['On'] = true;
module['ON'] = true;

module['Off'] = false
module['OFF'] = false

module['True'] = true
module['False'] = false

module['WIDTH'] = 9
module['HEIGHT'] = 14
