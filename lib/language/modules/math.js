var math = Object.getOwnPropertyNames(Math);
for (var key in math) {
    module.exports[math[key]] = Math[math[key]];
}
