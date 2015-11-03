Template.DateTimePicker.helpers({
  date: function(){
    return moment(this.option.date).format('DD/MM/YYYY')
  }
});

Template.DateTimePicker.events({
  'dp.change': function(e,template){
    e.date.startOf('day').add(e.date.utcOffset(),'minutes');

    if (!e.date.isSame(this.option.date))
      Options.update({_id:this.option._id}, {$set:{date:e.date.toDate()}});

    $('.ui.button').popup('hide'); // Hides the popup
  }
});

Template.DateTimePicker.onRendered(function() {
  let self = this.data;
  this.$('.datetimepicker').datetimepicker({
    inline:true,
    viewMode: 'days',
    format: 'DD/MM/YYYY',
    showTodayButton:true,
    defaultDate: self.option.date
  });
  this.$('.ui.button').popup({
    position:'bottom right',
    on    : 'click'
  });
});
