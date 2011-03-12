$(function() {
	inspection.generateFormFrom('FLHA');
	$('input.date').datepicker();
	
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
	generateFormFrom : function(templateName) {
		var fieldGenerators = {
			text : function(label, name, value){
				return $.tmpl(
					'<div><dfn>${label}</dfn><input name="${name}">${value}</input></div>',
					{ label: label, name: name, value: value });
			},
			date : function(label, name, value) {
				return $.tmpl(
					'<div><dfn>${label}</dfn><input name="${name}" class="date">${value}</input></div>',
					{ label : label, name : name, value : value });
			}
		}
		
		var template = this.templates[templateName];
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