$(function() {
	module("Template Repository");
	
	test("Getting a template that doesn't exist should return null", function() {
		var sut = new TemplateRepository();
		var result = sut.get("Nothing here");
		equal(result, null);
	});
})
