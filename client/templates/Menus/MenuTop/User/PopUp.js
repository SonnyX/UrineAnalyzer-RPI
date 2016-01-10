Template.UserPopUp.events({
  'click #register':function(event,template){
    FlowRouter.go(FlowRouter.path("Entry",{},{active:'register'}));
  },
  "click #logout, click #login": function(event, template){
     event.preventDefault();
     Meteor.logout(function(err){
       if (err) {
         throw err
       }
       FlowRouter.go(FlowRouter.path("Entry",{},{active:'login'}));
     });
  }
});


Template.UserPopUp.onRendered(function() {
  let User = document.getElementById('User')
  $(User).popup({
    popup : $('#UserPopUp'),
    position:'bottom right',
    on    : 'click'
  });
});
