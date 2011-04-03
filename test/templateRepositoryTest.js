$(function() {
	module("Template Repository");
	
	test("Install and retrieve template", function() {
		var sut = new TemplateRepository();
		var template = {name:'tmp'};
		
		sut.installTemplate(template);
		var result = sut.get('tmp');
		
		equal(template, result);
	});
	
	test("Getting a template that doesn't exist should return null", function() {
		var sut = new TemplateRepository();
		var result = sut.get("Nothing here");
		
		equal(result, null);
	});
	
	test("Install templates and retrieve all", function() {
		var sut = new TemplateRepository();
		var templateA = {name:'tmpA'};
		var templateB = {name:'tmpB'};
		
		sut.installTemplate(templateA);
		sut.installTemplate(templateB);
		var result = sut.getAll();
		
		contains(result, templateA);
		contains(result, templateB);
	});
});
