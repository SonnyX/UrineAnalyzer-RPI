/*
Template.MenuLeft.onRendered(function() {
  $('#__blaze-root .ui.sidebar').sidebar({
    context: $('#__blaze-root')
  }).sidebar('attach events', '#__blaze-root .menu .item')
})
*/

MenuItems = new Mongo.Collection(null);

items = [
  { icon:"grid layout", label:"Overview", href:"/" },
  { icon:"doctor",      label:"Data",
    items: [
      { hidden:"hidden", label:"Ph",  href:"/data/ph" },
      { hidden:"hidden", label:"Na",  href:"/data/na" },
      { hidden:"hidden", label:"Cl",  href:"/data/cl" },
      { hidden:"hidden", label:"K",   href:"/data/k" }
    ]
  },
  { icon:"sitemap",  label:"Outputs",  href:"/outputs" },
  { icon:"settings", label:"Options",  href:"/options" }
];

items.forEach(function(item){
  MenuItems.insert(item);
})

Template.MenuLeft.onCreated(function () {
  reactive = new ReactiveVar(items);
  console.log(reactive);
});


Template.MenuLeft.helpers({
  items: function() {
    return MenuItems.find({});
  }
})
