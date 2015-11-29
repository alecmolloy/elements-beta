var date = Object.getOwnPropertyNames(Date);
for (var key in date) {
    module.exports[date[key]] = Date[date[key]];
}

module.exports['time'] = Date.now;
