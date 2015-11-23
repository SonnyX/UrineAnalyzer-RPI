//Subscription to the correct collection with the given limits.
//all done inside an autorun to garantee the reactivity of the Subscription.
Template.Data.onCreated(function () {
  let self = this;
  this.samplesOptions = new ReactiveVar();
  this.autorun(function(){
    self.samplesOptions.set(Options.findOne({_id:'SamplesOptions'}));
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
  let current = moment(self.samplesOptions.get().date);

  this.autorun(function(){
    let id = FlowRouter.getParam('id')
    chart.setTitle({text:id});
    if(self.subscriptionsReady()){
      let {date} = self.samplesOptions.get()
      if(!current.isSame(date)){
        while(chart.series.length > 0)
          chart.series[0].remove(true);
        current = moment(date)
      }
      let analysis = SensorsDB.analysis.find(
        {firstDate:{$gte:date.getTime(),$lt:moment(date).add(1,'days').valueOf()}},
        {sort:{firstDate:1}}
      ).fetch();
      if (!chart.series.length) {
        Chart.addSeries(chart,analysis,id)
      }else{
        let i = analysis.length -1;
        Chart.setSeries(chart,analysis[i],id,i);
      }
    }
  });
});
