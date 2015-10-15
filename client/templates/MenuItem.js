Template.MenuItem.events({
  "click a": function(event, template){
    if (this.items) {
      this.items.forEach(function(item){
        item.hidden = hidden(item.hidden)
      })
      SideMenuItems.update({_id:this._id}, {$set:{
        items:this.items
      }});
    }
  }
});

var hidden = function(hidden){
  return hidden == "" ? "hidden" : "";
}
