$(function() {
	var currentForm = localStorage['currentForm'];
	if (currentForm)
		inspection.generateFormFrom(JSON.parse(currentForm));
	else
		inspection.generateFormNamed('FLHA');
	
	
	$('input.date').datepicker();
	
	$('form').submit(function(e) {
		e.preventDefault();
		localStorage['currentForm'] = $(this).serializeToJSON();
	});
	
	$.fn.serializeToJSON=function() {
		var data = inspection.currentTemplate;
		data.fields.forEach(function (field) {
			field.value = $('input[name="'+field.name+'"]').val();
		});
		return JSON.stringify(data);
	};
});

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
		
		template.fields.forEach(function (field) {
			$(fieldGenerators[field.type](field.label, field.name, field.value))
				.prependTo('form');
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