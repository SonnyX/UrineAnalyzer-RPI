Template.Slider.onRendered(function(){
  let self = this.data;
  let slider = this.$(".slider")
  slider.noUiSlider({
    start: self.start,
    connect: 'lower',
    range:self.range,
    format: wNumb({decimals: 0})
  })
  .on('slide', function (ev, val) {
    Outputs.update({_id:self._id},{$set:{start:val}});
  })
  .on('change', function(ev,val){
    if(typeof self.pin == 'number'){
      //Meteor.call('setDutyCycle',{pin:self.pin,dutyCycle:val})
    }else {
      //Meteor.call('setValve',{valve:this.valve,value:val})
    }
  })
});
