
Meteor.startup(function () {
	Meteor.call('createAdmin');
	teste();
})


teste = function(){
	Services.initialize(Meteor.bindEnvironment(function() {

		Services.on('storeSample', Meteor.bindEnvironment(function (args) {
			//console.log(args);
			AnalysisController.dataReceived({data:{
				ph:parseFloat(((args.ph.raw/16384-1.65)*3.03).toFixed(3)),
				na:parseFloat(((args.na.raw/16384-1.65)*3.03).toFixed(3)),
				k:parseFloat(((args.k.raw/16384-1.65)*3.03).toFixed(3)),
				cl:parseFloat(((args.cl.raw/16384-1.65)*3.03).toFixed(3)),
				conductivity:parseFloat(((args.conductivity.raw/16384-1.65)*3.03).toFixed(3)),
				volume:0,
			},date:+moment(),counter:args.counter})
		}))
	}))
}
