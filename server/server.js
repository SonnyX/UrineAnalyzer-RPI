
Meteor.startup(function () {
	Meteor.call('createAdmin');
	teste();
})


teste = function(){
	Services.initialize(Meteor.bindEnvironment(function() {

		Services.on('storeSample', Meteor.bindEnvironment(function (args) {
			//console.log(args);
			AnalysisController.dataReceived({data:{
				ph:args.ph.raw,
				na:args.na.raw,
				k:args.k.raw,
				cl:args.cl.raw,
				conductivity:args.conductivity.raw,
				volume:0,
			},date:+moment(),counter:args.counter})
		}))
	}))
}
