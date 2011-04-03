$(function() {
	
	var sut;
	var storage;
	var formname;
	
	function FakeFormNameGenerator() {
		this.getName = function() {
			return formname;
		}
	}

	module(
		"Form Repository",
		{
			setup: function(){
				storage = {};
				sut = new FormRepository(storage, new FakeFormNameGenerator());
			}
		}
	);
		
	test("When getting the form listing", function() {
		formname = "2011-04-03T02:12:44.536Z";
		var formdate = new Date(formname).toDateString();
		
		var form = {name:"MyForm"};
		sut.saveForm(form);
		
		var firstFoundForm = sut.getAll()[0];
		equal(firstFoundForm.formName, formname, "List of all forms should contain saved form name");
		equal(firstFoundForm.date, formdate, "List of all forms should contain saved form date");		
	});
	
	test("When getting a form from storage", function() {
		formname = "formname";
		var form = {name:"MyForm"};
		sut.saveForm(form);
		
		var foundForm = sut.loadForm(formname);
		deepEqual(foundForm, form, "The form should be loaded");
	});
});
