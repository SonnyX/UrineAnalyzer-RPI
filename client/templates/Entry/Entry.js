Template.Entry.onCreated(function(){
  let active = FlowRouter.getQueryParam('active')
  if(active==='register'){
    this.data.register=true;
  }else{
    this.data.register=false;
  }
})

Template.Entry.helpers({
  pswdReset: function(){
    return Session.get('reset-pswd');
  }
});

Template.Entry.events({
  "click #forgot": function(event, template){
    event.preventDefault()
    Session.set('reset-pswd', true);
  }
});

Template.Entry.onRendered(function(){
  $('.menu .item').tab();
})
