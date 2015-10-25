/*
Template.MenuLeft.onRendered(function() {
  $('#__blaze-root .ui.sidebar').sidebar({
    context: $('#__blaze-root')
  }).sidebar('attach events', '#__blaze-root .menu .item')
})
*/


Template.MenuLeft.helpers({
  items: function() {
    return Options.find({'option':'SideMenuItem'})
    ;
  }
})
