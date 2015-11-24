Template.DateTimePicker.onCreated(function(){
  let self = this
  this.autorun(function(){
    self.data._options = Options.findOne({_id:self.data.Options});
  });
})
Template.DateTimePicker.helpers({
  date: function(){
    return moment(Options.findOne({_id:this.Options}).date).format('DD/MM/YYYY')
  }
});

Template.DateTimePicker.events({
  'dp.change': function(e,template){
    let self = this._options;
    e.date = e.date.startOf('day');
    if (!e.date.isSame(self.date))
      Options.update({_id:self._id}, {$set:{date:e.date.toDate()}});
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
      //maxDate:moment().endOf('day')
    });
  this.$('.dateButton').popup({
    position:'bottom right',
    on    : 'click'
  });
});
