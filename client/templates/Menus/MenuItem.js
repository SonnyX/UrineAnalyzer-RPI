
//Event of showing or hidding a sub menu in the LeftMenuItens
Template.MenuItem.helpers({
  parentLabel: function(parentContext){
    return parentContext.label;
  }
});
Template.MenuItem.events({
  "click a": function(event, template){
    if (this.items) {
      let internItems = template.$('.'+this.label);
      if(internItems.hasClass('hidden'))
        internItems.removeClass('hidden')
      else
        internItems.addClass('hidden');
    }
  }
});
