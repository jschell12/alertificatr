var Alertificatr = (function($, undefined){
  
  var _defaultTemplate = "<div class='alert alert-block  fade in'>"+
      "<button type='button' class='close' style='display:none; color:white;'>×</button>"+        
    "</div>";
  
  var _defaultOptions = {
    template: _defaultTemplate, 
    timeout: -1,    
    closeOnClick: false,    
    showClose: true
  };
  
  var Alertificatr = function(element, options){
    var self = this;
    self._options = jQuery.extend(true, _defaultOptions, options);
    self._template = self._options.template;
    
    if(!element){
      throw "element must be specified";
    }
    
    self._element = $(element); // Make sure this is a jQuery object.
    
    self._element.css({
      "margin-top": "20px",
      "margin-left": "20px",
      "margin-right": "20px"
    });
    
    return self;
  };
  
  Alertificatr.prototype = {
    create: function(options){
      var self = this;          
      options = options || {};
      
      var timeout = options.timeout || self._options.timeout;
      var template = options.template || self._options.template;
      var closeOnClick = options.closeOnClick;
      var showClose = options.showClose;
      var type = options.type || self._options.type;
      var html = options.html || self._options.html;
      var width = options.width || self._options.width;
      var margin = options.margin || self._options.margin;

      self._element.css({
        "width": width,
        "margin": margin//,
      });
      self._element.addClass("alertificatr");
        
      var $content = $("<div></div>")
      .addClass("alertificatr-content")
      .append(self._template);
      
      $content.find(".alert")
        .addClass("alert-" + type)
        .append(html);     
      
      self._element.append($content); 
      if(closeOnClick){
        $content.click(function(e){
          e.preventDefault();
          if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON"){
            $content.fadeOut();
          }
        });
      }
      
      if(showClose){
        $content.find(".close").show();            
        $content.find(".close").click(function(e){
          e.preventDefault();        
          $content.fadeOut();
        }).show();
      }
      
      if(timeout > 0){
        setTimeout(function(){
          $content.fadeOut();
        }, timeout);
      }
      
      return $content;
    }
  };
  
  return Alertificatr;
})(jQuery);