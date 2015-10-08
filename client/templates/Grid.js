var SensorButtons = [
  {label:'pH',value:'7',ref:'/data/ph'},
  {label:'Na',value:'160',ref:'/data/na'},
  {label:'K',value:'160',ref:'/data/k'},
  {label:'Cl',value:'160',ref:'/data/cl'}
]

Template.Grid.helpers({
  Buttons: function(){
    return SensorButtons;
  }
});
