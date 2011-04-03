var formRepository = new FormRepository(localStorage);
var templateRepository = new TemplateRepository();
var formGenerator = new FormGenerator();

$(function() {
	loadTemplates();
	loadOldInspections();
		
	$.fn.toData = function() {
		var data = formGenerator.currentTemplate;
		data.fields.forEach(function (field) {
			field.value = valueOf('input[name="'+field.name+'"]');
		});
		return data;
	};
});

function loadTemplates(){
	$('#templateButton')
		.tmpl(templateRepository.getAll())
		.appendTo('#newForms')
		.find('span')
		.button()
		.click(startNewForm);
}

function loadOldInspections() {
	$('#oldForms').html('');
	
	var loadedForms = formRepository.getAll();
	
	$('#oldFormButton')
		.tmpl(loadedForms)
		.appendTo('#oldForms')
	
	$('#oldForms li span')
		.button()
		.click(function(){
			var form = formRepository.loadForm($(this).attr('data-formName'));
			formGenerator.generateFormFrom(form);
		});
}

function startNewForm() {
	var templateName = $(this).tmplItem().data.name;
	formGenerator.generateFormFrom(templateRepository.get(templateName));
}

function valueOf(elementName) {
	return $(elementName + '[type="checkbox"]').length
		? $(elementName).is(':checked')
		: $(elementName).val();
}