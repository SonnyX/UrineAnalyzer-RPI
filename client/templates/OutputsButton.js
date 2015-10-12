var LOW = 0 , HIGH = 255;

var groups = [
  {template:'Radiobox',items:[
    {label:"pH",pins:[11,12,13],values:[LOW,HIGH,HIGH]},
    {label:"Cl-",pins:[11,12,13],values:[LOW,HIGH,LOW]},
    {label:"K+",pins:[11,12,13],values:[HIGH,LOW,LOW]},
    {label:"Na+",pins:[11,12,13],values:[LOW,LOW,LOW]},
  ]},
  {template:'Checkbox',items:[
    {label:'Motor',pins:[8],values:[HIGH]}
  ]}
]

var items = [
  {label:"pH",pins:[11,12,13],values:[LOW,HIGH,HIGH],group:'sensor'},
  {label:"Cl-",pins:[11,12,13],values:[LOW,HIGH,LOW],group:'sensor'},
  {label:"K+",pins:[11,12,13],values:[HIGH,LOW,LOW],group:'sensor'},
  {label:"Na+",pins:[11,12,13],values:[LOW,LOW,LOW],group:'sensor'},
  {label:'Motor',pins:[8],values:[HIGH],group:'motor'},
  {label:'Motor',pins:[8],values:[LOW],group:'motor'}
]

OutputsButtons = new Mongo.Collection(null);
items.forEach(function(item){
  OutputsButtons.insert(item);
})

Template.Form.helpers({
  Groups: function(){
    return groups;
  }
});

Template.Form.events({
  "click .ui.toggle.checkbox": function(event, template){
    if ($(event.currentTarget).checkbox("is checked"))
    {
      //Meteor.call('changeOutput',this.pins,this.values)
    }
    else {
      var values = Array.apply(null, Array(this.values.length)).map(function(){return LOW});
      //Meteor.call('changeOutput',this.pins,values)
    }
  }
});

Template.Form.onRendered(function () {
  $('.Radiobox.ui').checkbox('attach events', 'label.Radiobox', 'check');
  $('.Checkbox.ui').checkbox('can change');
});
