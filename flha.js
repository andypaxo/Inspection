inspection.installTemplate({
	name : 'FLHA',
	fields : [
		{ label: 'Date', name: 'date', type: 'date'},
		{ label: 'Location', name: 'location', type: 'text'},
		{ label: 'Supervisor Name', name: 'supervisor', type: 'text'},
		{ label: 'Emergency Contact Name', name: 'contact', type: 'text'},
		{ label: 'Emergency Contact Phone #', name: 'contactPhone', type: 'text'},
		
		{ label: 'Buried Pipelines', name: 'Potential', type: 'check'},
		{ label: 'Buried Power Lines', name: 'Potential', type: 'check'},
		{ label: 'Buried Utilities', name: 'Potential', type: 'check'},
		{ label: 'Chemicals (dust, gases, vapors)', name: 'Potential', type: 'check'},
		{ label: 'Driving', name: 'Potential', type: 'check'},
		{ label: 'Electricity', name: 'Potential', type: 'check'},
		{ label: 'Energized Equipment', name: 'Potential', type: 'check'},
		{ label: 'Excavations / trenches', name: 'Potential', type: 'check'}
	]
});
