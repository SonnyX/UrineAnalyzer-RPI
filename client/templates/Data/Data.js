//Subscription to the correct collection with the given limits.
//all done inside an autorun to garantee the reactivity of the Subscription.
Template.Data.onCreated(function () {
  let self = this;
  this.samplesOptions = new ReactiveVar();
  this.autorun(function(){
    self.samplesOptions.set(Settings.findOne({_id:'SamplesOptions'}));
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
        while(chart.series.length > 0) chart.series[0].remove(true);
        currentDate = moment(date)
      }
      let analysis = []
      Analysis.find({}).map(function(a){
        if(moment(a.firstDate).add(a.counter*a.frequency,'milliseconds').isAfter(date)){
          analysis.push(a);
        }
      })
      for (let i = 0; i < analysis.length; i++) {
        if (chart.series.length <= i){
          if(id!='all') Chart.addSeries(chart,analysis[i],id,date)
          else {
            Chart.addSeries(chart,analysis[i],'na',date)
            Chart.addSeries(chart,analysis[i],'k',date)
            Chart.addSeries(chart,analysis[i],'cl',date)
          }
        } 
        if(chart.series[i].data.length < analysis[i].counter+1  && id == 'all' || currentId != id && id == 'all') {
          Chart.setSeries(chart,analysis[i],'na',i*3,date);
          Chart.setSeries(chart,analysis[i],'k',i*3+1,date);
          Chart.setSeries(chart,analysis[i],'cl',i*3+2,date);
        } else if(chart.series[i].data.length < analysis[i].counter+1 || currentId != id){
          Chart.setSeries(chart,analysis[i],id,i,date);
        }
      }
      currentId = id;
    }
  });
});
