//Search in the Options collection all the TopMenuItem
Template.MenuTop.helpers({
	items(){
		return Options.findOne({_id:'TopMenuItems'});
	},
	dynamicItems(){
		return Options.findOne({_id:this.content()+'TopMenuItems'})
	}
})

Template.MenuTop.events({
	'click .item': function(event) {
		event.preventDefault()
		if (this.label == 'Menu'){
			$('.ui.sidebar').sidebar("toggle")
		}
	}
})
