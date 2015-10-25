

Template.MenuItem.events({
  "click a": function(event, template){
    if (this.items) {
      this.items.forEach(function(item){
        item.hidden = hidden(item.hidden)
      })
      let parent = Template.parentData(1);
      let selector = {option:parent.option,_id:parent._id};
      let modifier = {'data.items':this.items}
      Meteor.call("updateOptions",selector,modifier);
    }
  }
});

let hidden = function(hidden){
  return hidden == "" ? "hidden" : "";
}
