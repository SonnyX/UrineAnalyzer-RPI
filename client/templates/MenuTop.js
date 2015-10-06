Template.MenuTop.events({

	'click .item': function(e) {
		e.preventDefault()
		console.log(e.target)
		$('.ui.sidebar').sidebar("toggle")
	}

})

Template.MenuTop.helpers({

	leftItems: function() {
		return [ { icon: "grid layout", hidden: "", label: "Menu" } ]
	},
	
	rightItems: function() {
		return [ { icon: "sign in", hidden: "", label: "Login" } ]
	}

})