$(function() {
	loadOldInspections();
	$('#newForm').click(startNewForm);
		
	$.fn.toData = function() {
		var data = inspection.currentTemplate;
		data.fields.forEach(function (field) {
			field.value = $('input[name="'+field.name+'"]').val();
		});
		return data;
	};
});

function loadOldInspections() {
	$('#oldForms').html('');
	
	load('forms', []).forEach(function(form) {
		$('#oldForms').append($.tmpl(
			'<li><span data-formName="${formName}">${date}</span></li>',
			{
				'date': new Date(form.date).toDateString(),
				'formName': form.name
			}));
	});
	
	$('#oldForms li span')
		.button()
		.click(function(){
			resumeForm($(this).attr('data-formName'));
		});
}

function startNewForm() {
	inspection.generateFormNamed('FLHA');
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
					'<div><dfn>${label}</dfn><input name="${name}" type="checkbox" value="${value}" /></div>',
					{ label : label, name : name, value : value });
			}
		}
		
		$('#start').slideUp();
		$('form').html('');
		template.fields.forEach(function (field) {
			$(fieldGenerators[field.type](field.label, field.name, field.value))
				.appendTo('form');
		});
		
		$('<input type="submit" value="Save"/>').appendTo('form');
		
		$('input.date').datepicker();
		
		$('form').submit(function(e) {
			e.preventDefault();
			saveForm($(this).toData());
			loadOldInspections();
			$(this).slideUp();
			$('#start').slideDown();
		});
		
		$('form').slideDown();
		this.currentTemplate = template;
	},	
	installTemplate : function(template) {
		this.templates[template.name] = template;
	}
}