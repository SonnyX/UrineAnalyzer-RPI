//Subscribe to the latest sample of each sensor
Template.Overview.onCreated(function () {
  let self = this;
  this.autorun(function(){
    self.subscribe('sensors',{date:undefined});
  });
});

Template.Overview.helpers({
  Buttons: function(){
    let data = Object();//Create empty Object
    //for each property inside the collection (ph,na,cl and k)
    for (var property in SensorCollections) {
      if (SensorCollections.hasOwnProperty(property)) {
        if(typeof SensorCollections[property] == 'object'){
          //add in the empty object the last element of each collection
          data[property] = SensorCollections[property].findOne({},{sort:{date:-1}})
        }
      }
    };
    return SensorButtons(data);
  }
});

var noValue = 'No Value';

//Auxiliar function that gives the directions of each button in the Overview.
function SensorButtons({ph={value:noValue},na={value:noValue},cl={value:noValue},k={value:noValue}}){
  return([
    {label:'pH',value:ph.value,ref:'/data/ph'},
    {label:'Na',value:na.value,ref:'/data/na',measure:'mmol/L'},
    {label:'K',value:k.value,ref:'/data/k',measure:'mmol/L'},
    {label:'Cl',value:cl.value,ref:'/data/cl',measure:'mmol/L'}
  ])
}
