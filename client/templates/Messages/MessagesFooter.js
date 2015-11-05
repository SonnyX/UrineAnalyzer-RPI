Template.MessagesFooter.onRendered(function(){
  this.$('.container')[0]._uihooks = {
  	insertElement(node,next){
  		//console.log('insertElement');
  		$(node).insertBefore(next);
  		$(node).transition('slide up');
  		//$(node).transition('tada');
  	},
  	moveElement(node,next){
  		console.log('moveElement');
  	},
  	removeElement(node,next){
  		//console.log('removeElement');
  		$(node).transition('slide up');
  		$(node).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
  		function(e){
  			$(node).remove();
  		});
  	}
  }
})
