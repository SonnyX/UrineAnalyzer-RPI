var noValue = 'No Value';

function SensorButtons({ph={value:noValue},na={value:noValue},cl={value:noValue},k={value:noValue}}){
  return([
    {label:'pH',value:ph.value,ref:'/data/ph'},
    {label:'Na',value:na.value,ref:'/data/na',measure:'mmol/L'},
    {label:'K',value:k.value,ref:'/data/k',measure:'mmol/L'},
    {label:'Cl',value:cl.value,ref:'/data/cl',measure:'mmol/L'}
  ])
}

Template.Grid.helpers({
  Buttons: function(){
    let data = Object();//Create empty Object
    /*for each property inside the collection (ph,na,cl and k)*/
    for (var property in SensorCollections) {
      if (SensorCollections.hasOwnProperty(property)) {
        /*add in the empty object the last element of each collection*/
        data[property] = SensorCollections[property].findOne({},{sort:{date:-1}})
      }
    };
    return SensorButtons(data);
  }
});

/*for (var i = 1; i < 15; i++) {
  SensorPh.insert({value:(Math.floor(Math.random() * 7) + 1 ),date: new Date(Date.now()+ 900000*i)});
}*/
/*Meteor.setInterval(function () {
  SensorPh.insert({value:(Math.floor(Math.random() * 7) + 1 ),date: new Date()});
}, 10000);
*/
