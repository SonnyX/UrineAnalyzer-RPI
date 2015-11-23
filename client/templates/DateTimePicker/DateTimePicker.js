Template.DateTimePicker.helpers({
  date: function(){
    return moment(this.date).format('DD/MM/YYYY')
  }
});

Template.DateTimePicker.events({
  'dp.change': function(e,template){
    e.date = e.date.startOf('day');
    if (!e.date.isSame(this.date))
      Options.update({_id:this._id}, {$set:{date:e.date.toDate()}});
    $('#dateButton').popup('hide'); // Hides the popup
  }
});

Template.DateTimePicker.onRendered(function() {
  let self = this.data;
    $('#'+self._id+'.datetimepicker').datetimepicker({
      inline:true,
      viewMode: 'days',
      format: 'DD/MM/YYYY',
      showTodayButton:true,
      defaultDate: self.date,
      //maxDate:moment().endOf('day')
    });
  this.$('#dateButton').popup({
    position:'bottom right',
    on    : 'click'
  });
});
