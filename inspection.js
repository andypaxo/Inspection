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
})(jQuery);

$(function() {
	$('input.date').datepicker();
	
	$('form').submit(function(e) {
		e.preventDefault();
		
		var formData = $(this).serializeJSON();
		console.log(formData);
		localStorage['inspection.header'] = formData;
	});
	
	var loadedData = localStorage['inspection.header'];
	if (loadedData != null)
		$('form').populateFromJSON(loadedData);
});
