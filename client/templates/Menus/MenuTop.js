Template.MenuTop.onCreated(function(){
	let self = this;
	this.react = {
		contentRightItems: new ReactiveVar([]),
		contentLeftItems: new ReactiveVar([])
	}
	this.autorun(function(){
		let TopMenuItems = Options.findOne({_id:'TopMenuItems'});
		if(TopMenuItems.contentRightItems.hasOwnProperty(self.data.content())){
		let contentRightItems = TopMenuItems.contentRightItems[self.data.content()]
		for (content of contentRightItems) {
			content.data = Options.findOne({_id:content.data})
		}
		self.react.contentRightItems.set(contentRightItems);
		}
		else{
			self.react.contentRightItems.set([])
		}
	});
})
//Search in the Options collection all the TopMenuItem
Template.MenuTop.helpers({
	items(){
		return Options.findOne({_id:'TopMenuItems'});
	},
	contentRightItems(){
		return Template.instance().react.contentRightItems.get();
	},
	contentLeftItems(){
		return Template.instance().react.contentLeftItems.get();
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
