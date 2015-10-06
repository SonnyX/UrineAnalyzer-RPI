
FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Home' });
  }
});