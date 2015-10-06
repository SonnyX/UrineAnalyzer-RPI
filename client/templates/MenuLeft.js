Template.MenuLeft.onRendered(function() {
	$('#__blaze-root .ui.sidebar').sidebar({
    	context: $('#__blaze-root')
  	}).sidebar('attach events', '#__blaze-root .menu .item')
})

Template.MenuLeft.helpers({

	items: function() {
		return [
			{ icon:"grid layout", hidden:"", label:"Overview", href:"/" },
			{ icon:"sign in", 	  hidden:"", label:"Output",   href:"/" },
			{ icon:"sitemap",     hidden:"", label:"Data"    	 		},
			{ icon:"sign in",     hidden:"", label:"Output",   href:"/" }
		]	
	}

})

