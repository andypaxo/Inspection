function FormRepository(storage) {
	var storage = storage;
	
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
		var now = new Date();
		var name = now.toJSON();
		forms.unshift({
			date : now,
			name : name
		});
		
		save('forms', forms);
		save('form-' + name, formData);
	};
	
	this.loadForm = function(formName) {
		return load('form-' + formName);
	};
}