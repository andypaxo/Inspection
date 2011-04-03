$(function() {
	
	var sut;
	var storage;
	
	module(
		"Form Repository",
		{
			setup: function(){
				storage = {};
				sut = new FormRepository(storage);
			}
		}
	);
		
	test("When saving a form", function() {
		// Save form and check contents of storage
	});
});
