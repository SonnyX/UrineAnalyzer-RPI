//Subscription to the correct collection with the given limits.
//all done inside an autorun to garantee the reactivity of the Subscription.
Template.Data.onCreated(function () {
  this.currentId = new ReactiveVar(null);
  this.samplesOptions = new ReactiveVar(null);
  let self = this;
  this.autorun(function(){
    self.currentId.set(FlowRouter.getParam('id'));
    self.samplesOptions.set(Options.findOne(
      {'option':'SamplesAmount','data.sensor':self.currentId.get()}
    ));
    self.subscribe("sensor",{'sensor':self.currentId.get(),'limit':self.samplesOptions.get().data.item});
  });
});

Template.Data.helpers({
  SamplesOptions(){
    return Template.instance().samplesOptions.get();
  }
});

Template.Data.onRendered(function () {
  let chart = Chart.build(); //Create Chart
  let self = this;
  this.autorun(function(){
    let id = self.currentId.get()
    //console.log(FlowRouter.getParam("id"));
    if(self.subscriptionsReady()){
      // Take the right collection "pH,Na,K or Cl"
      let data = SensorCollections[id].find({},{sort:{date:-1}}).fetch();
      Chart.addData(chart,id,data); // add Values and titles in the chart
    }
  });
});
