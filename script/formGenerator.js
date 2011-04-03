function FormGenerator(formRepository) {
	var formRepository = formRepository;
		
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
		};
	
	this.currentTemplate = null;
	
	// TODO: Return generated form and let caller insert into document
	this.generateFormFrom = function(template) {
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
				formRepository.saveForm($(this).toData());
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
}