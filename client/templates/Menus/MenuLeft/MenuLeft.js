//Search in the Settings collection all the SideMenuItens
Template.MenuLeft.helpers({
  menuItems(){
    return Settings.findOne({_id:'SideMenuItems'});
  }
})
