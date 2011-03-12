$(function() {
	inspection.generateFormFrom('FLHA');
	$('input.date').datepicker();
});

var inspection = {
	templates : {},
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
		$.each(template.fields, function (i, field) {
			$(fieldGenerators[field.type](field.label, field.name, field.value))
				.prependTo('form');
		});
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
	
	$.fn.serializeJSON=function() {
		var data = {};
		$.each($(this).serializeArray(), function(i, e) {
			data[e.name] = e.value 
		});
		return JSON.stringify(data);
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