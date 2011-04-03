function contains(array, item, message) {
	ok(
		array.indexOf(item) >= 0,
		message || 'Did not find item in array'
	);
}
