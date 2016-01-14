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
    Meteor.call('Outputs.update',self._id,self.id,val,function(error,result){
      if(error){
        Messages.newErrorMsg(error)
        return;
      }
      if(result && result !== 'success'){
        Messages.newErrorMsg(result);
        //$(`[id='${self._id}'].slider`).val(self.start)
        return;
      }
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
