//Subscribe to the latest sample of each sensor
Template.Overview.onCreated(function () {
  let self = this;
  this.autorun(function(){
    self.subscribe('sensors',{date:undefined});
  });
});

Template.Overview.events({
  "click a": function(event, template){
    event.preventDefault();
    //FlowRouter.go('/data/:id',{id:this.label.toLowerCase()})
    FlowRouter.go('/data/:id',{id:this._id})
    Meteor.call('SamplesOptions.date',moment(this.timeStamp).startOf('day').toDate())
  }
});
