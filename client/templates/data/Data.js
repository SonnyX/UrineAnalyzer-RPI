//Subscription to the correct collection with the given limits.
//all done inside an autorun to garantee the reactivity of the Subscription.
Template.Data.onCreated(function () {
  let self = this;
  this.samplesOptions = new ReactiveVar();
  this.autorun(function(){
    self.samplesOptions.set(Options.findOne({_id:'SamplesOptions'}))
    self.subscribe("sensors",self.samplesOptions.get());
  });
});

Template.Data.helpers({
  samplesOptions(){
    return Template.instance().samplesOptions.get()
  }
});

Template.Data.onRendered(function () {
  let chart = Chart.build(); //Create Chart
  let self = this;
  this.autorun(function(){
    let id = FlowRouter.getParam('id')
    if(self.subscriptionsReady()){
      // Take the right collection "pH,Na,K or Cl"
      let limit = self.samplesOptions.get().item
      if(limit == 'All')
        limit = undefined;
      let data = SensorCollections[id].find({},{sort:{date:-1},limit:limit}).fetch();
      Chart.addData(chart,id,data); // add Values and titles in the chart
    }
  });
});
