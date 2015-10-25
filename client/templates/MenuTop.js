Template.MenuTop.events({

	'click .item': function(e) {
		e.preventDefault()
		$('.ui.sidebar').sidebar("toggle")
	}

})

Template.MenuTop.helpers({

	leftItems: function() {
		return Options.find({'option':'TopMenuItem','data.position':'left'});
	},

	rightItems: function() {
		return Options.find({'option':'TopMenuItem','data.position':'right'});
	}

})
