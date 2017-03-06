;(function($){

	//瀹氫箟PicCarousel绫�
	var PicCarousel = (function(){

		//瀹氫箟PicCarousel鐨勬瀯閫犲嚱鏁�
		function PicCarousel(element,options){
			this.settings = $.extend(true,$.fn.PicCarousel.defaults,options||{});
			this.element = element;
			this.rotateFlag = true;
			this.init();

		}
		//瀹氫箟PicCarousel鐨勬柟娉�
		PicCarousel.prototype = {
			/*璇存槑锛氬垵濮嬪寲鎻掍欢*/
			init:function(){
				var me = this;
				me.poster = me.element;
				me.posterItemMain = me.poster.find("ul.poster-list");
				me.nextBtn = me.poster.find("div.poster-next-btn");
				me.prevBtn = me.poster.find("div.poster-prev-btn");
				me.posterItems = me.poster.find("li.poster-item");
				if(me.posterItems.size()%2 == 0){
					me.posterItemMain.append(me.posterItems.eq(0).clone());
					me.posterItems = me.poster.find("li.poster-item");
				}

				me.posterFirstItem = me.posterItems.first();
				me.posterLastItem = me.posterItems.last();
				me.rotateFlag =true;

				//璁剧疆閰嶇疆鍙傛暟鍊�
				me.setSettingValue();
				me.setPosterPost();

				me.nextBtn.click(function(){
					me.btn(me.rotateFlag,'left')
				});

				me.prevBtn.click(function(){
					me.btn(me.rotateFlag,'right')
				});

				if(me.settings.autoPlay){
					me.autoPlay();
					me.poster.hover(function(){
						window.clearInterval(me.timer);
					},function(){
						me.autoPlay();
					});
				}
			},
			btn:function (flag,fx) {
				if(flag){
					this.rotateFlag = false;
					this.carouseRotate(fx);
				}
			},
			//鑷姩鎾斁鏂规硶
			autoPlay:function(){
				var me = this;
				me.timer = window.setInterval(function(){
					me.btn(me.rotateFlag,'left');
				},me.settings.delay);
			},

			//鏃嬭浆鏂规硶
			carouseRotate:function(dir){
				var me = this;
				var zIndexArr = [];
				if(dir === "left"){
					me.posterItems.each(function(){
						var self = $(this),
							prev = self.prev().get(0)?self.prev():me.posterLastItem,
							width = prev.width(),
							height = prev.height(),
							zIndex = prev.css("zIndex"),
							opacity = prev.css("opacity"),
							left = prev.css("left"),
							top = prev.css("top");
						zIndexArr.push(zIndex);
						self.animate({
							width:width,
							height:height,
							opacity:opacity,
							left:left,
							top:top
						},me.settings.speed,function(){
							me.rotateFlag = true;
						});
					});
					me.posterItems.each(function(i){
						$(this).css("zIndex",zIndexArr[i]);
					})
				}else if(dir === "right"){
					me.posterItems.each(function(){
						var self = $(this),
							next = self.next().get(0)?self.next():me.posterFirstItem,
							width = next.width(),
							height = next.height(),
							zIndex = next.css("zIndex"),
							opacity = next.css("opacity"),
							left = next.css("left"),
							top = next.css("top");
						zIndexArr.push(zIndex);
						self.animate({
							width:width,
							height:height,
							opacity:opacity,
							left:left,
							top:top
						},me.settings.speed,function(){
							me.rotateFlag = true;
						});
					});
					me.posterItems.each(function(i){
						$(this).css("zIndex",zIndexArr[i]);
					})
				}
			},

			//璁剧疆鍓╀綑鐨勫抚鐨勪綅缃叧绯�
			setPosterPost:function(){
				var me = this;
				var sliceItems = me.posterItems.slice(1),
					sliceSize  = sliceItems.size()/2,
					rightSlice = sliceItems.slice(0,sliceSize),
					level      = Math.floor(me.posterItems.size()/2),
					leftSlice  = sliceItems.slice(sliceSize);

				//璁剧疆鍙宠竟甯х殑浣嶇疆鍏崇郴鍜屽搴︺€侀珮搴︺€乼op...
				var rw = me.settings.posterWidth,
					rh = me.settings.posterHeight,
				//((瀹瑰櫒瀹�-甯у)/2)/灞傜骇 190
					gap = ((me.settings.width-me.settings.posterWidth)/2)/level;

				var firstLeft = (me.settings.width-me.settings.posterWidth)/2;
				var fixOffsetLeft = firstLeft + rw;

				//璁剧疆鍙宠竟鐨勪綅缃叧绯�
				rightSlice.each(function(i){
					level--;
					rw = rw*me.settings.scale;
					rh = rh*me.settings.scale;
					var j=i;
					$(this).css({
						zIndex:level,
						width:rw,
						height:rh,
						opacity:1/(++j),
						left:fixOffsetLeft+(++i)*gap-rw,
						top:me.setVertucalAlign(rh)
					});

				});

				//璁剧疆宸﹁竟鐨勪綅缃叧绯�
				var lw = rightSlice.last().width(),
					lh = rightSlice.last().height(),
					oloop = Math.floor(me.posterItems.size()/2);

				leftSlice.each(function(i){
					$(this).css({
						zIndex:i,
						width:lw,
						height:lh,
						opacity:1/oloop,
						left:i*gap,
						top:me.setVertucalAlign(lh)
					});

					lw = lw/me.settings.scale;
					lh = lh/me.settings.scale;
					oloop--;
				});
			},

			//璁剧疆鍨傜洿鎺掑垪瀵归綈
			setVertucalAlign:function(height){
				var me = this;
				var verticalType = me.settings.verticalAlign,
					top = 0;

				if(verticalType === "middle"){
					top = (me.settings.height - height)/2;
				}else if(verticalType === "top"){
					top = 0;
				}else if(verticalType === "bottom"){
					top = me.settings.height - height;
				}else{
					top = (me.settings.height-height)/2;
				};

				return top;
			},

			//閰嶇疆宸﹀彸鎸夐挳鍜岀涓€甯т綅缃�
			setSettingValue:function(){
				var me = this;
				me.poster.css({
					width:me.settings.width,
					height:me.settings.height
				});

				me.posterItemMain.css({
					width:me.settings.width,
					height:me.settings.height
				});

				//璁＄畻宸﹀彸鍒囨崲鎸夐挳鐨勫搴�
				var w = (me.settings.width-me.settings.posterWidth)/2;

				me.nextBtn.css({
					width:w,
					height:me.settings.height,
					zIndex:Math.ceil(me.posterItems.size()/2)
				});
				me.prevBtn.css({
					width:w,
					height:me.settings.height,
					zIndex:Math.ceil(me.posterItems.size()/2)
				});
				me.posterFirstItem.css({
					width:me.settings.posterWidth,
					height:me.settings.posterHeight,
					top: me.setVertucalAlign(me.settings.posterHeight),
					left:w,
					zIndex:Math.floor(me.posterItems.size()/2)
				});
			}
		};
		return PicCarousel;
	})();

	//鍗曚緥妯″紡,娣诲姞PicCarousel鏂规硶
	$.fn.PicCarousel = function(options){
		return this.each(function(){
			var me = $(this),
				instance = me.data("PicCarousel");
			if(!instance){
				instance = new PicCarousel(me,options);
				me.data("PicCarousel",instance);
			}
		});
	};

	//榛樿閰嶇疆鍙傛暟
	$.fn.PicCarousel.defaults = {
		"width":800,
		"height":300,
		"posterWidth":520,
		"posterHeight":300,
		"scale":0.9,
		"speed":300,
		"autoPlay":false,
		"delay":500,
		"verticalAlign":"middle"
	}


}(jQuery));