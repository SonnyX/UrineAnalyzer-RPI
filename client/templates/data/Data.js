//Subscription to the correct collection with the given limits.
//all done inside an autorun to garantee the reactivity of the Subscription.
Template.Data.onCreated(function () {
  this.currentId = new ReactiveVar(null);
  this.samplesOptions = new ReactiveVar(null)
  let currentSamples = {};
  let self = this;
  this.autorun(function(){
    self.currentId.set(FlowRouter.getParam('id'));
    self.samplesOptions.set(Options.findOne(
      {'option':'SamplesAmount','data.sensor':self.currentId.get()}
    ));
    currentSamples = newSamplesOptions(currentSamples,self.samplesOptions.get())
    self.subscribe("sensor",currentSamples[self.samplesOptions.get()._id]);
    //self.subscribe("sensor",{'sensor':self.currentId.get(),'limit':currentSamples[self.samplesOptions.get()._id].item});
  });
});

Template.Data.helpers({
  SamplesOptions(){
    return Template.instance().samplesOptions.get()
  }
});

Template.Data.onRendered(function () {
  let chart = Chart.build(); //Create Chart
  let self = this;
  this.autorun(function(){
    let id = self.currentId.get()
    if(self.subscriptionsReady()){
      // Take the right collection "pH,Na,K or Cl"
      let limit = self.samplesOptions.get().data.item;
      if(limit == 'All')
        limit = undefined;
      let data = SensorCollections[id].find({},{sort:{date:-1},limit:limit}).fetch();
      Chart.addData(chart,id,data); // add Values and titles in the chart
    }
  });
});

//Compare an old version of the samples options with a new one
//Maintain the version that has the bigger amount of data, if the date wasn't altered
//Else, the new version prevails
function newSamplesOptions (currents, newSamp){
  let id = newSamp._id;
  if(currents[id]){
    if((currents[id].item < newSamp.data.item) || newSamp.data.item == 'All'){
      currents[id] = newSamp.data;
    }
    if(!moment(currents[id].date).isSame(newSamp.data.date)){
      currents[id] = newSamp.data
    }
  }else{
    currents[id] = newSamp.data;
  }
  return currents;
}
