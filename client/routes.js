BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Overview'});
  }
});

FlowRouter.route('/outputs', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Form'});
  }
});

FlowRouter.route('/data/:id', {
  action: function(params) {
    BlazeLayout.render('Main', { content:'Data'});
  }
});

FlowRouter.route('/options', {
  action: function(params) {
    BlazeLayout.render('Main', { content:'Options'});
  }
});
