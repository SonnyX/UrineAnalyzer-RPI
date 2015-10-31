

Template.DateTimePicker.helpers({
  date: function(){
    return moment(this.data.date).format('DD/MM/YYYY')
  }
});

Template.DateTimePicker.events({
  'dp.change': function(e){
    e.date.startOf('day');
    //if the date stored is diferent from the date selected in the widget, then the date is updated.
    if (!e.date.isSame(this.data.date)) {
    var selector = {'option':this.option,'_id':this._id}
    var modifier = {'data.date':e.date.toDate()}
    Meteor.call("updateOptions", selector,modifier);
    //this.data.date.set(e.date.toDate()) // local reactive variable to update the selected date
    }
    $('#'+this._id + '.ui.button').popup('hide'); // Hides the popup
  }
});

Template.DateTimePicker.onRendered(function() {
  let self = this.data;
  this.$('#' + self._id + '.datetimepicker').datetimepicker({
    inline:true,
    viewMode: 'days',
    format: 'DD/MM/YYYY',
    showTodayButton:true,
    defaultDate: self.data.date
  });
  this.$('#' + self._id + '.ui.button').popup({
    position:'bottom right',
    popup : $('#' + self._id + '.ui.popup'),
    on    : 'click'
  });
});
