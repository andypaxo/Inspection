$(function() {
	$('#newForm').click(startNewForm);
	$('#resumeForm').click(resumeLastForm);
		
	$.fn.serializeToJSON=function() {
		var data = inspection.currentTemplate;
		data.fields.forEach(function (field) {
			field.value = $('input[name="'+field.name+'"]').val();
		});
		return JSON.stringify(data);
	};
});

function startNewForm() {
	inspection.generateFormNamed('FLHA');
}

function resumeLastForm(){
	var currentForm = JSON.parse(localStorage['currentForm']);
	inspection.generateFormFrom(currentForm);
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
			}
		}
		
		$('form').html('');
		template.fields.forEach(function (field) {
			$(fieldGenerators[field.type](field.label, field.name, field.value))
				.appendTo('form');
		});
		
		$('<input type="submit" value="Save"/>').appendTo('form');
		
		$('input.date').datepicker();
		
		$('form').submit(function(e) {
			e.preventDefault();
			localStorage['currentForm'] = $(this).serializeToJSON();
		});
		
		this.currentTemplate = template;
	},	
	installTemplate : function(template) {
		this.templates[template.name] = template;
	}
}

/*
(function($){
	$.fn.populateFromJSON = function(data){
		data = JSON.parse(data);
		$.each(data, function(i, e) {
			$('input[name="' + i + '"]').val(e);
		});
	};
	
	$('form').submit(function(e) {
		e.preventDefault();
		
		var formData = $(this).serializeJSON();
		console.log(formData);
		localStorage['inspection.header'] = formData;
	});
	
	var loadedData = localStorage['inspection.header'];
	if (loadedData != null)
		$('form').populateFromJSON(loadedData);
})(jQuery);
*/