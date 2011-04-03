function TemplateRepository() {
	var templates = {};
	
	this.installTemplate = function(template) {
		templates[template.name] = template;
	};
	
	this.getAll = function() {
		var mappedTemplates = [];
		for (var e in templates)
			mappedTemplates.push(templates[e]);
		return mappedTemplates;
	};
}