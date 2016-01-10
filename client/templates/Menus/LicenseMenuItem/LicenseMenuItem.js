//Event of showing or hidding a sub menu in the LeftMenuItens
Template.LicenseMenuItem.helpers({
  parentLabel: function(parentContext){
    return parentContext.label;
  }
});

Template.LicenseMenuItem.events({
  "click a": function(event, template){
    event.preventDefault();
    if (this.items) {
      let internItems = template.$('.'+this.label);
      if(internItems.hasClass('hidden'))
        internItems.removeClass('hidden')
      else
        internItems.addClass('hidden');
    }
    if(this.href){
      if(!template.$(event.currentTarget).hasClass('disabled')){
        FlowRouter.go(this.href);
      }
    }
  }
});
