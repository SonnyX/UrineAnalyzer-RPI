Template.DateTimePicker.onCreated(function(){
  let self = this
  this.autorun(function(){
    if(self.data.Settings){
      self.data._options = Settings.findOne({_id:self.data.Settings});
    }if(self.data.Options){
      self.data._options = Options.findOne({_id:self.data.Options + '-' + Meteor.userId()})
    }
  });
})
Template.DateTimePicker.helpers({
  date: function(){
    if(this.Settings){
      return moment(Settings.findOne({_id:this.Settings}).date).format('DD/MM/YYYY')
    }if(this.Options){
      return moment(Options.findOne({_id:this.Options +'-'+Meteor.userId()}).date).format('DD/MM/YYYY')
    }
  }
});

Template.DateTimePicker.events({
  'dp.change': function(e,template){
    let self = this._options;
    e.date = e.date.startOf('day');
    if (!e.date.isSame(self.date)){
      if(template.data.Settings){
        Meteor.call('Settings.ChangeDate',{_id:self._id},e.date.toDate())
        //Settings.update({_id:self._id}, {$set:{date:e.date.toDate()}});
      }
      if(template.data.Options){
        Meteor.call('Options.ChangeDate',{_id:self._id},e.date.toDate())
        //Options.update({_id:self._id}, {$set:{date:e.date.toDate()}});
      }
    }
    $('.dateButton').popup('hide'); // Hides the popup
  }
});

Template.DateTimePicker.onRendered(function() {
  let self = this.data._options;
    $('#'+self._id+'.datetimepicker').datetimepicker({
      inline:true,
      viewMode: 'days',
      format: 'DD/MM/YYYY',
      showTodayButton:true,
      defaultDate: self.date,
      maxDate:moment().endOf('day')
    });
  this.$('.dateButton').popup({
    position:'bottom right',
    on    : 'click'
  });
});
