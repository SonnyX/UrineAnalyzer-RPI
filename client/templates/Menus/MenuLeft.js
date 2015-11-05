//Search in the Options collection all the SideMenuItens
Template.MenuLeft.helpers({
  menuItems(){
    return Options.findOne({_id:'SideMenuItems'});
  }
})
