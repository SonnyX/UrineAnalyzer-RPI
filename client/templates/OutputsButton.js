var LOW = 0 , HIGH = 255;

OutputsButtonsCol = new Mongo.Collection(null);
var groups = [
  {name:'Radiobox',items:[
    {label:"pH",pins:[11,12,13],values:[LOW,HIGH,HIGH]},
    {label:"Cl-",pins:[11,12,13],values:[LOW,HIGH,LOW]},
    {label:"K+",pins:[11,12,13],values:[HIGH,LOW,LOW]},
    {label:"Na+",pins:[11,12,13],values:[LOW,LOW,LOW]},
  ]},
  {name:'Checkbox',items:[
    {label:'Motor',pins:[8],values:[HIGH]}
  ]}
]
groups.forEach(function(group){
  OutputsButtonsCol.insert(group);
})

Template.Form.helpers({
  Groups: function(){
    return OutputsButtonsCol.find({});
  }
});

Template.Form.events({
  "click .ui.toggle.checkbox": function(event, template){
    if ($(event.currentTarget).checkbox("is checked"))
    {
      Meteor.call('changeOutput',this.pins,this.values)
    }
    else {
      var values = Array.apply(null, Array(this.values.length)).map(function(){return LOW});
      Meteor.call('changeOutput',this.pins,values)
    }
  }
});

Template.Form.onRendered(function () {
  $('.Radiobox.ui').checkbox('attach events', 'label.Radiobox', 'check');
  $('.Checkbox.ui').checkbox('can change');
});


/*
Serial.println("Now measuring pH");
digitalWrite(11, LOW);
digitalWrite(12, HIGH);
digitalWrite(13, HIGH);
} else if(inputString=="c") {
Serial.println("Now measuring Cl-");
digitalWrite(11, LOW);
digitalWrite(12, HIGH);
digitalWrite(13, LOW);
} else if(inputString=="k") {
Serial.println("Now measuring K+");
digitalWrite(11, HIGH);
digitalWrite(12, LOW);
digitalWrite(13, LOW);
} else if(inputString=="n") {
Serial.println("Now measuring Na+");
digitalWrite(11, LOW);
digitalWrite(12, LOW);
digitalWrite(13, LOW);
} else if(inputString=="m") {
Serial.println("Switched Motor On/Off");
digitalWrite(8,!digitalRead(8));
*/
