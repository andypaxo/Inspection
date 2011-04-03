templateRepository.installTemplate({
	name : 'FLHA',
	fields : [
		{ label: 'Date', name: 'date', type: 'date'},
		{ label: 'Location', name: 'location', type: 'text'},
		{ label: 'Supervisor Name', name: 'supervisor', type: 'text'},
		{ label: 'Emergency Contact Name', name: 'contact', type: 'text'},
		{ label: 'Emergency Contact Phone #', name: 'contactPhone', type: 'text'},
		
		{ label: 'Buried Pipelines', name: 'BuriedPipelines', type: 'check'},
		{ label: 'Buried Power Lines', name: 'BuriedPowerLines', type: 'check'},
		{ label: 'Buried Utilities', name: 'BuriedUtilities', type: 'check'},
		{ label: 'Chemicals (dust, gases, vapors)', name: 'Chemicals', type: 'check'},
		{ label: 'Driving', name: 'Driving', type: 'check'},
		{ label: 'Electricity', name: 'Electricity', type: 'check'},
		{ label: 'Energized Equipment', name: 'EnergizedEquipment', type: 'check'},
		{ label: 'Excavations / trenches', name: 'Excavations', type: 'check'}
	]
});
