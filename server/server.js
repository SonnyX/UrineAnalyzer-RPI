
Meteor.startup(function () {
	HANDLE = undefined;
	Meteor.call('createAdmin');
	Meteor.call('getTemperatures')
	Services.initialize(function(){})
	/*Settings.find({_id:'SamplingState'}).observe({
		changed({value,frequency}){
			if(value){
				startSampling(frequency)
			}
		}
	})*/
})

/*teste = function(error,counter){
	if(error){
		throw(new Meteor.Error(1, error));
	}
	HANDLE = Meteor.setTimeout(function(){
		Meteor.call('sampleOnce',counter,teste);
	},60*1000)
}*/
