BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Panel',innerContent:'Outputs' });
  }
});
