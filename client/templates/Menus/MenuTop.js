//Search in the Options collection all the TopMenuItem
Template.MenuTop.helpers({
	items(){
		return Options.findOne({_id:'TopMenuItems'});
	}
})

Template.MenuTop.events({
	'click .item': function(event) {
		event.preventDefault()
		$('.ui.sidebar').sidebar("toggle")
	}
})
