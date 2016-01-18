
Template.Spinbox.helpers({
  initialValue: function(){
    if (!isNaN(this.value)) {
      let value = parseInt(this.value);
      return val(value,this.range);
    }
    return 0;
  }
});

Template.Spinbox.events({
  "click #upButton": function(event, template){
    let input = template.$('input')[0];
    let value = input.value
    if(!isNaN(value)){
      input.value = val(++value,this.range);
      changeSize(input)
    }
  },
  "click #downButton": function(event, template){
    let input = template.$('input')[0];
    let value = input.value;
    if(!isNaN(value)){
      if(!this.isOnlyNatural || value > 0 ){
        input.value = val(--value,this.range);
      }
      changeSize(input)
    }
  },
  "keypress input":function(event,template){
    var key = event.keyCode || event.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      event.returnValue = false;
      if(event.preventDefault) event.preventDefault();
    }
  },
  "keypress input":function(event,template){
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl+A
    (event.keyCode == 65 && event.ctrlKey === true) ||
    // Allow: Ctrl+C
    (event.keyCode == 67 && event.ctrlKey === true) ||
    // Allow: Ctrl+X
    (event.keyCode == 88 && event.ctrlKey === true) ||
    // Allow: home, end, left, right
    (event.keyCode >= 35 && event.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    if(!this.isOnlyNatural)
      if(!event.currentTarget.value)
        return ((event.charCode >= 48 && event.charCode <= 57)|| event.charCode == 45)
    return (event.charCode >= 48 && event.charCode <= 57)
  },
  "keyup input":function(event,template){
    changeSize(event.currentTarget);
  },
  'change input':function(event,template){
    let input = template.$('input')[0]
    let value = input.value;
    if(value){
        input.value = val(value,this.range);
      changeSize(input)
    }else{
      if(this.range){
        input.value = this.range.min
      }else{
        input.value = 0;
      }
    }
  }
});

Template.Spinbox.onRendered(function () {
  changeSize(this.$('input')[0])
})

function changeSize(input){
  if(input.value.toString().length > 2)
  input.size = input.value.toString().length
  else
  input.size = 1;
}

function position(value,range){
  if(range){
    if(value > range.max){
      return 1;
    }
    if(value >= range.min && value <= range.max){
      return 0;
    }
    return -1
  }
  return true
}

function val(value,range){
  let pos = position(value,range)
  if(pos === true || pos === 0){
    return value;
  }
  if(pos === 1){
    return range.max
  }
  if(pos === -1){
    return range.min
  }
}
