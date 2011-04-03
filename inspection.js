var forms = new FormRepository();
var inspection = new Templates();

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

function loadTemplates(){
	$('#templateButton')
		.tmpl(inspection.getAllTemplates())
		.appendTo('#newForms')
		.find('span')
		.button()
		.click(startNewForm);
}

function loadOldInspections() {
	$('#oldForms').html('');
	
	var loadedForms = forms.getAll();
	
	$('#oldFormButton')
		.tmpl(loadedForms)
		.appendTo('#oldForms')
	
	$('#oldForms li span')
		.button()
		.click(function(){
			forms.resumeForm($(this).attr('data-formName'));
		});
}

function startNewForm() {
	var formName = $(this).tmplItem().data.name;
	inspection.generateFormNamed(formName);
}

function valueOf(elementName) {
	return $(elementName + '[type="checkbox"]').length
		? $(elementName).is(':checked')
		: $(elementName).val();
}

function Templates() {
	this.templates = {};
	this.currentTemplate = null;
	
	this.generateFormNamed = function(templateName) {
		this.generateFormFrom(this.templates[templateName]);
	};
	
	this.generateFormFrom = function(template) {
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
				forms.saveForm($(this).toData());
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
	};
	
	this.installTemplate = function(template) {
		this.templates[template.name] = template;
	};
	
	this.getAllTemplates = function() {
		var mappedTemplates = [];
		for (var e in inspection.templates)
			mappedTemplates.push(inspection.templates[e]);
		return mappedTemplates;
	};
}