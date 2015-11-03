//Search in the Options collection all the SideMenuItens
Template.MenuLeft.helpers({
  /*items: function() {
    return Options.find({'option':'SideMenuItem'})
    ;
  },*/
  items2(){
    return Options.findOne({_id:'SideMenuItems'});
  }
})
