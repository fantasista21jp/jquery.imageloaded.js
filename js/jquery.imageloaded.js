/*
 * jQuery imageloaded (jQuery Plugin)
 *
 * Copyright (c) 2010 Tom Shimada
 *
 * Depends Script:
 *	js/jquery.js (1.3.2~)
 */

(function($) {
  $.fn.imageloaded = function(configs) {
    var defaults = {
          imgExpression: 'img',
          beforeFunc: null,
          afterFunc: null
        };
    configs = $.extend(defaults, configs);
    var selectors = {
          container: this,
          imgs: $(configs.imgExpression, this)
        };
    if (!selectors.container.length || !selectors.imgs.length) {
      if ($.isFunction(configs.beforeFunc)) configs.beforeFunc(selectors.container, selectors.imgs);
      if ($.isFunction(configs.afterFunc)) configs.afterFunc(selectors.container, selectors.imgs);
      return;
    }

    if ($.isFunction(configs.beforeFunc)) configs.beforeFunc(selectors.container, selectors.imgs);

    var imgCnt = selectors.imgs.length,
        loadedCnt = 0,
        errorCnt = 0,
        abortCnt = 0;
    selectors.imgs.each(function(){
      var $img = $(this),
          image = new Image();
      image.onload = function() {
        loadedCnt++;
        loaded();
      }
      image.onerror = function() {
        errorCnt++;
        loaded();
      }
      image.onabort = function() {
        abortCnt++;
        loaded();
      }
      image.src = $img.attr('src');
    });

    function loaded() {
      if (imgCnt > (loadedCnt + errorCnt + abortCnt)) return;
      if ($.isFunction(configs.afterFunc)) configs.afterFunc(selectors.container, selectors.imgs);
    }
  }
})(jQuery);
