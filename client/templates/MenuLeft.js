/*
Template.MenuLeft.onRendered(function() {
  $('#__blaze-root .ui.sidebar').sidebar({
    context: $('#__blaze-root')
  }).sidebar('attach events', '#__blaze-root .menu .item')
})
*/

Template.MenuLeft.helpers({

  items: function() {
    return [
      { icon:"grid layout", label:"Overview", href:"/" },
      { icon:"doctor",      label:"Data",      
        items: [
          { hidden:"", label:"Ph",  href:"/data/ph" },
          { hidden:"", label:"Na",  href:"/data/na" },
          { hidden:"", label:"Cl",  href:"/data/cl" },
          { hidden:"", label:"K",   href:"/data/k" }
        ]
      },
      { icon:"sitemap",  label:"Outputs",  href:"/outputs" },
      { icon:"settings", label:"Options",  href:"/options" }
    ] 
  }

})

