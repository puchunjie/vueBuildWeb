
(function($){ 
	$.fn.zoomImgRollover = function(options) {

		var defaults = {
			percent:30,
			duration:800
		}; 

		var opts = $.extend(defaults, options);
		
		// static zoom function
		function imageZoomStep(jZoomImage, x, origWidth, origHeight)
		{
			var width = Math.round(origWidth * (.5 + ((x * opts.percent) / 200))) * 2;
			var height = Math.round(origHeight * (.5 + ((x * opts.percent) / 200))) * 2;
				
			var left = (width - origWidth) / 2;
			var top = (height - origHeight) / 2;
		
			jZoomImage.css({width:width, height:height, top:-top, left:-left});
		}
		return this.each(function()
		{
			var jZoomImage = $(this);
			var origWidth = jZoomImage.parent().width();
			var origHeight = jZoomImage.parent().width()-1;
			var flag = true
			// add css ness. to allow zoom
			jZoomImage.mouseover(function() {
                if(flag){
                    flag = false
                    origWidth = jZoomImage.parent().width();
                    origHeight = jZoomImage.parent().width()-1;
                    jZoomImage.css({position: "relative"});
                    jZoomImage.parent().css({overflow: "hidden", display:"block", position: "relative",width: origWidth, height: origHeight});
                    jZoomImage.stop().animate({dummy:1},{duration:opts.duration, step:function(x)
                    {
                        imageZoomStep(jZoomImage, x, origWidth, origHeight)
                    }});
                }

			});

			jZoomImage.mouseout(function()
			{
				jZoomImage.stop().animate({dummy:0},{
					duration:opts.duration,
					step:function(x){
						imageZoomStep(jZoomImage, x, origWidth, origHeight)
					},
					complete:function () {
						jZoomImage.removeAttr('style')
                        jZoomImage.parent().removeAttr('style')
                        flag = true
					}
				});
			});
		});
	};

})($);