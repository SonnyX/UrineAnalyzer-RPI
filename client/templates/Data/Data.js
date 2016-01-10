//Subscription to the correct collection with the given limits.
//all done inside an autorun to garantee the reactivity of the Subscription.
Template.Data.onCreated(function () {
  let self = this;
  this.samplesOptions = new ReactiveVar();
  this.autorun(function(){
    self.samplesOptions.set(Options.findOne({_id:'SamplesOptions-'+Meteor.userId()}));
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
  let currentDate = moment(self.samplesOptions.get().date);
  let currentId = FlowRouter.getParam('id')
  this.autorun(function(){
    let id = FlowRouter.getParam('id')
    chart.setTitle({text:id});
    if(self.subscriptionsReady()){
      let {date} = self.samplesOptions.get()
      if(!currentDate.isSame(date)){
        while(chart.series.length > 0)
          chart.series[0].remove(true);
        currentDate = moment(date)
      }
      let analysis = Analysis.find(
        {firstDate:{$gte:date.getTime(),$lt:moment(date).add(1,'days').valueOf()}},
        {sort:{firstDate:1}}
      ).fetch();
      for (let i = 0; i < analysis.length; i++) {
        if (chart.series.length <= i){
          Chart.addSeries(chart,analysis[i],id)
        }
        if(chart.series[i].data.length < analysis[i].counter+1 || currentId != id){
          Chart.setSeries(chart,analysis[i],id,i);
        }
      }
      currentId = id;
    }
  });
});
