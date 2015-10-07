var SensorButtons = [
  {label:'pH',value:'7',ref:'/data/ph'},
  {label:'Na',value:'160',ref:'/data/na'},
  {label:'K',value:'160',ref:'/data/k'},
  {label:'Cl',value:'160',ref:'/data/cl'}
]

var OutputsButtons = [
  {label:'Motor 1', value:0},
  {label:'Valve 1', value:1},
  {label:'Valve 2', value:1},
  {label:'Valve 3', value:0}
]

Template.Panel.helpers({
  Buttons: function(){
    if (this.innerContent() == "Outputs") {
      return OutputsButtons;
    }
    return SensorButtons;
  },
  Button: function(){
    return Template.instance().data.innerContent();
  }
});
