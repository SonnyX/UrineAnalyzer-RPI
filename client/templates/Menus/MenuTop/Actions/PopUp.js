Template.ActionsPopUp.onRendered(function() {
  let Actions = document.getElementById('Actions')
  $(Actions).popup({
    popup : $('#ActionsPopUp'),
    position:'bottom left',
    on    : 'click'
  });
});
