Template.DateTimePicker.helpers({
  date: function(){
    console.log(this);
    return moment().format('DD/MM/YYYY');
  }
});

Template.DateTimePicker.events({
  "dp.change": function(e){
    //console.log(e.date._d);
  }
});

Template.DateTimePicker.onRendered(function() {
  this.$('.datetimepicker').datetimepicker({
    inline:true,
    viewMode: 'days',
    format: 'DD/MM/YYYY',
    showTodayButton:true
  });
  this.$('.button').popup({
    position:'bottom left',
    popup : $('.popup'),
    on    : 'click'
  });
});
