//Search in the Settings collection all the TopMenuItem
Template.MenuTop.helpers({
	items(){
		return Settings.findOne({_id:'TopMenuItems'});
	},
	dynamicItems(){
		return Settings.findOne({_id:this.content()+'TopMenuItems'})
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

Template.MenuTop.onRendered(function(){
	Blaze.render(Template.ActionsPopUp, $('#MenuTop')[0]);
	Blaze.render(Template.UserPopUp, $('#MenuTop')[0]);
})
