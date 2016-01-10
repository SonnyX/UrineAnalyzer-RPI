Template.Outputs.onCreated(function(){
  let self = this;
  this.autorun(function(){
    self.subscribe("outputs");
  });
})

Template.Outputs.helpers({
  items: function(){
    return Outputs.find({})
  },
  percentage:function(){
    let prctg = wNumb({
      decimals:0,
      postfix:'%'
    })
    return prctg.to((this.start*100)/this.range.max)
  }
});

Template.Outputs.onRendered(function(){
  let self = this;
  this.autorun(function(){
     if(!Settings.findOne({_id:'ActionsLicense'}).released){
       FlowRouter.go('/');
     }
  });
  $('.accordion').accordion({
    exclusive:false,
    selector:{
      trigger:'.title .header'
    },
    onOpen(){
      $('.'+this.id + ' #automaticButton').removeClass('teal')
      $('.'+this.id + ' #manualButton').addClass('teal')
    },
    onClose(){
      $('.'+this.id + ' #manualButton').removeClass('teal')
      $('.'+this.id + ' #automaticButton').addClass('teal')
    }
  })
})
Template.Outputs.events({
  "click #automaticButton, click #manualButton": function(event, template){
     if(!$(event.currentTarget).hasClass('teal')){
       //console.log($(event.currentTarget).parent());
       $('.'+this._id +'.title .header').click()
     }
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
