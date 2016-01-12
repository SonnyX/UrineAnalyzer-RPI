
Meteor.startup(function () {

	Outputs.update({group:'Valves'}, {$rename:{
		valve:'id'
	}},{multi:true});


	Services.initialize(Meteor.bindEnvironment(function() {

		Services.on('storeSample', Meteor.bindEnvironment(function (args) {
			console.log(args);
			AnalysisController.dataReceived({data:{
				ph:args.ph.raw,
				na:args.na.raw,
				k:args.k.raw,
				cl:args.cl.raw,
				conductivity:args.conductivity.raw,
				volume:0,
			},date:+moment(),counter:args.counter})
		}))

		/*Services.call('configureLocks', [
			{ id: 0, value: 0 }, // Unlock pumps
			{ id: 1, value: 0 }  // Unlock valves
		])*/

		/*
		Services.call('configureHeaters', [
			{ id: 3, value: 140 }
		], logger)

		Services.call('selectSensor', { id: 2 })


		Services.call('configureValves', [
			{ id: 0, value: 0 },
			{ id: 1, value: 1 },
			{ id: 2, value: 0 },
			{ id: 3, value: 1 },
			{ id: 4, value: 1 }
		], logger)

		*/
	}))
})
