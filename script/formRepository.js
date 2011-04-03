function FormRepository(storage, formNameGenerator) {
	var storage = storage;
	var formNameGenerator = formNameGenerator;
	
	function load(name, defaultData) {
		var data = storage[name];
		return data ? JSON.parse(data) : defaultData;
	}
	
	function save(name, data) {
		storage[name] = JSON.stringify(data);
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
		// TODO: Generate form name when starting form (allow multiple save of same form)
		var forms = load('forms', []);
		var name = formNameGenerator.getName();
		forms.unshift({
			date : name,
			name : name
		});
		
		save('forms', forms);
		save('form-' + name, formData);
	};
	
	this.loadForm = function(formName) {
		return load('form-' + formName);
	};
}

function FormNameGenerator() {
	this.getName = function() {
		return new Date().toJSON();
	}
}
