function FormRepository() {
	function load(name, defaultData) {
		var data = localStorage[name];
		return data ? JSON.parse(data) : defaultData;
	}
	
	function save(name, data) {
		localStorage[name] = JSON.stringify(data);
	}

	this.getAll = function(){
		return load('forms', []).map(
			function(form) {
				return {
					date : new Date(form.date).toDateString(),
					formName : form.name
				}});
	};
	
	this.saveForm = function(formData){
		// TODO: Would be better to generate form name when starting form (allow multiple save of same form)
		var forms = load('forms', []);
		var now = new Date();
		var name = now.toJSON();
		forms.unshift({
			date : now,
			name : name
		});
		
		save('forms', forms);
		save('form-' + name, formData);
	};
	
	this.resumeForm = function(formName) {
		var currentForm = load('form-' + formName);
		inspection.generateFormFrom(currentForm);
	};
}