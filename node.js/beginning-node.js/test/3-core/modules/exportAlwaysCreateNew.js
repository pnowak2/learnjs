var sum = function (a, b) {
	return a + b;
}

var diff = function (a, b) {
	return a - b;
}

module.exports = function () {
	return {
		sum: sum,
		diff: diff
	}
}
