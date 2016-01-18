
Meteor.startup(function () {
	Meteor.call('createAdmin');
	//initialize();
	teste();
})


initialize = function(){
	Services.initialize(Meteor.bindEnvironment(function() {

		Services.on('storeSample', Meteor.bindEnvironment(function (args) {
			console.log(moment().format('DD/MM/YYYY HH:mm:ss'));
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


teste = function(){
	let ONE_DAY = 8.64e+7;
	let currentTime = moment().subtract(1,'days').endOf('day').valueOf();
	let observe = Analysis.find({firstDate:{$lt:currentTime}}).observe({
		added:function(doc){
			Analysis.remove({_id:doc._id});
			Samples.remove({_id:{$regex:new RegExp(doc._id+'$'),$options:'m'}})
		}
	})
	Meteor.setInterval(function(){
		observe.stop();
		teste();
	}, ONE_DAY)
}
