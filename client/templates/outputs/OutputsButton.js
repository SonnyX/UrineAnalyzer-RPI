let LOW = 0 , HIGH = 1;
let DUTYLOW = 0, DUTYHIGH = 301;

let groups = [
  {template:'Checkbox',items:[
    {label:'Valve 1 ',valve:0},
    {label:'Valve 2 ',valve:1},
    {label:'Valve 3 ',valve:2},
    {label:'Valve 4 ',valve:3},
    {label:'Motor A',pin:0},
    {label:'Motor B',pin:1},
    {label:'Pre-Heater',pin:2},
    {label:'Heater',pin:3},
  ]}
]

Template.Form.helpers({
  Groups: function(){
    return groups;
  }
});

Template.Form.events({
  "click .ui.toggle.checkbox": function(event, template){
    console.log(this);

    if ($(event.currentTarget).checkbox("is checked"))
    {
      if(typeof this.valve == 'number'){
        Meteor.call('setValve',{valve:this.valve,value:HIGH})
      }
      else{
        Meteor.call('setDutyCycle',{pin:this.pin,dutyCycle:DUTYHIGH})
      }
    }
    else {
      if(typeof this.valve == 'number'){
        Meteor.call('setValve',{valve:this.valve,value:LOW})
      }
      else{
        Meteor.call('setDutyCycle',{pin:this.pin,dutyCycle:DUTYLOW})
      }
    }
  }
});

Template.Form.onRendered(function () {
  $('.Radiobox.ui').checkbox('attach events', 'label.Radiobox', 'check');
  $('.Checkbox.ui').checkbox('can change');
});
