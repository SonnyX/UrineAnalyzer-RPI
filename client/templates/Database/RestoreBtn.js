Template.RestoreBtn.events({
  "click #restoreBtn": function(event, template){
    $('#restoreFile').click();
  },
  'change #restoreFile':function(event,template){
    let file = $(event.currentTarget).get(0).files[0];
    if(!file) return;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/database/restore', true);
    xhr.send(file);
  }
});
