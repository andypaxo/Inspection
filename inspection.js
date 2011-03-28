$(function() {
	loadTemplates();
	loadOldInspections();
		
	$.fn.toData = function() {
		var data = inspection.currentTemplate;
		data.fields.forEach(function (field) {
			field.value = valueOf('input[name="'+field.name+'"]');
		});
		return data;
	};
});

function loadTemplates() {
	var mappedTemplates = [];
	for (var e in inspection.templates)
		mappedTemplates.push(inspection.templates[e]);
	
	$('#templateButton')
		.tmpl(mappedTemplates)
		.appendTo('#newForms')
		.find('span')
		.button()
		.click(startNewForm);
}

function loadOldInspections() {
	$('#oldForms').html('');
	
	var loadedForms = $.map(
		load('forms', []),
		function(form) {return {
			date : new Date(form.date).toDateString(),
			formName : form.name
		}});
	
	$('#oldFormButton')
		.tmpl(loadedForms)
		.appendTo('#oldForms')
	
	$('#oldForms li span')
		.button()
		.click(function(){
			resumeForm($(this).attr('data-formName'));
		});
}

function startNewForm() {
	var formName = $(this).tmplItem().data.name;
	inspection.generateFormNamed(formName);
}

function resumeForm(formName){
	var currentForm = load('form-' + formName);
	inspection.generateFormFrom(currentForm);
}

function saveForm(formData){
	// Would be better to generate form name when starting form
	// (think multiple saves)
	var forms = load('forms', []);
	var now = new Date();
	var name = now.toJSON();
	forms.unshift({
		date : now,
		name : name
	});
	
	save('forms', forms);
	save('form-' + name, formData);
}

function load(name, defaultData) {
	var data = localStorage[name];
	return data ? JSON.parse(data) : defaultData;
}

function save(name, data) {
	localStorage[name] = JSON.stringify(data);
}

function valueOf(elementName) {
	return $(elementName + '[type="checkbox"]').length
		? $(elementName).is(':checked')
		: $(elementName).val();
}

var inspection = {
	templates : {},
	currentTemplate : null,
	generateFormNamed : function(templateName) {
		this.generateFormFrom(this.templates[templateName]);
	},
	generateFormFrom : function(template) {
		var fieldGenerators = {
			text : function(label, name, value){
				return $.tmpl(
					'<div><dfn>${label}</dfn><input name="${name}" value="${value}" /></div>',
					{ label: label, name: name, value: value });
			},
			date : function(label, name, value) {
				return $.tmpl(
					'<div><dfn>${label}</dfn><input name="${name}" class="date" value="${value}" /></div>',
					{ label : label, name : name, value : value });
			},
			check : function(label, name, value) {
				return $.tmpl(
					'<div><dfn>${label}</dfn><input name="${name}" type="checkbox" ${checked} /></div>',
					{ label : label, name : name, checked : value ? 'checked="checked"' : ''});
			}
		}
		
		$('form').html('');
		template.fields.forEach(function (field) {
			$(fieldGenerators[field.type](field.label, field.name, field.value))
				.appendTo('form');
		});
		
		$('<input type="submit" value="Save"/>').appendTo('form');
		$('input.date').datepicker();
		$('input[type="submit"]').button().css('float', 'left');
		
		$('form')
			.hide()
			.submit(function(e) {
				e.preventDefault();
				saveForm($(this).toData());
				loadOldInspections();
				$(this).slideUp();
				$('#start').slideDown();
				$('#cancel').fadeOut();
			});
		
		$('#start').hide('blind', {}, 'slow', function() {
			$('form').slideDown();
			$('#cancel').fadeIn();
		});
		
		this.currentTemplate = template;
	},	
	installTemplate : function(template) {
		this.templates[template.name] = template;
	}
}