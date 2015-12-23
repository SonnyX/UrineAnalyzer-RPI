Template.Outputs.onCreated(function(){
  let self = this;
  this.autorun(function(){
    self.subscribe("outputs");
  });
})

Template.Outputs.helpers({
  items: function(){
    return Outputs.find({});
  },
  percentage:function(){
    let prctg = wNumb({
      decimals:0,
      postfix:'%'
    })
    return prctg.to((this.start*100)/this.range.max)
  }
});

/*Template.Outputs.events({
  "click .ui.toggle.checkbox": function(event, template){
  }
});

Template.Outputs.onRendered(function () {
  $('.Radiobox.ui').checkbox('attach events', 'label.Radiobox', 'check');
  $('.Checkbox.ui').checkbox('can change');
});*/
