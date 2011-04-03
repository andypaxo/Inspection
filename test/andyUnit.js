function contains(array, item, message) {
	ok(
		array.indexOf(item) >= 0,
		message || 'Expected to find item in array'
	);
}
