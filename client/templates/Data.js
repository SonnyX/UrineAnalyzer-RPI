
Template.Data.onCreated(function () {
  let self = this;
  this.autorun(function(){
    self.data.id = FlowRouter.getParam("id");
    let limit = Options.findOne({'option':'SamplesAmount','data.sensor':self.data.id}).data.item
    self.subscribe(self.data.id,limit);
  });
});


Template.Data.onRendered(function () {
  let chart = Chart.build(); //Create Chart
  let self = this;
  this.autorun(function(){
    let id = self.data.id;
    //console.log(FlowRouter.getParam("id"));
    if(self.subscriptionsReady()){
      // Take the right collection "pH,Na,K or Cl"
      let data = SensorCollections[id].find({},{sort:{date:-1}}).fetch();
      Chart.addData(chart,id,data); // add Values and titles in the chart
    }
  });
});
