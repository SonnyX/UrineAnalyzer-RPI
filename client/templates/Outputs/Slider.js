Template.Slider.onRendered(function(){
  let self = this.data;
  let slider = this.$(".slider")
  //console.log(self);
  slider.noUiSlider({
    start: self.start,
    connect: 'lower',
    range:self.range,
    format: wNumb({decimals: 0})
  })
  .on('slide', function (ev, val) {
    Meteor.call('Outputs.update',self._id,val,function(error,result){
      if(error){
        Messages.newErrorMsg(error);
        return false;
      }
      Outputs._collection.update(
        {'outputs._id':self._id},
        {$set:{'outputs.$.start':val}});
    });
  })
  .on('change', function(ev,val){
    if(typeof self.pin == 'number'){
      //Meteor.call('setDutyCycle',{pin:self.pin,dutyCycle:val})
    }else {
      //Meteor.call('setValve',{valve:self.valve,value:val})
    }
  })
});
