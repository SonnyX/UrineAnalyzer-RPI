Template.MenuTop.events({
	'click .item': function(e) {
		e.preventDefault()
		$('.ui.sidebar').sidebar("toggle")
	}
})

//Search in the Options collection all the TopMenuItem
Template.MenuTop.helpers({
	leftItems: function() {
		return Options.find({'option':'TopMenuItem','data.position':'left'});
	},
	rightItems: function() {
		return Options.find({'option':'TopMenuItem','data.position':'right'});
	}
})
