$(function(){
	
	$(".items ul li img").hover(function(){
		
		if($(".spec-preview").find("span").length>0){
			var img_url=$(this).attr("src");
			$(this).closest(".spec-scroll").siblings(".spec-preview").children("span").children("img").attr("src",img_url);
			var img_bimg=$(this).attr("bimg");
			$(this).closest(".spec-scroll").siblings(".spec-preview").children("span").children("img").attr("jqimg",img_bimg);
			}
		else{
			var img_url=$(this).attr("src");
			$(this).closest(".spec-scroll").siblings(".spec-preview").children("a").children("img").attr("src",img_url);
			var img_bimg=$(this).attr("bimg");
			$(this).closest(".spec-scroll").siblings(".spec-preview").children("a").children("img").attr("jqimg",img_bimg);
		}
	})
	//if($(".spec-preview").children(".jqzoom").length>0){
		//	  $(".jqzoom").jqueryzoom({xzoom:380,yzoom:410});/*放大镜*/
	//	  }
	//下一张
	//var tempLength = 0; //临时变量,当前移动的长度
	$(".spec-scroll .next").bind("click",function(){
		var tempLength = Number($(this).parent(".spec-scroll").attr("bimg"))
		var viewNum = 5; //设置每次显示图片的个数量
		var moveNum = 2; //每次移动的数量
		var moveTime = 300; //移动速度,毫秒
		var scrollDiv = $(this).siblings(".items").children("ul")//$(".spec-scroll .items ul"); //进行移动动画的容器
		var scrollItems = $(this).siblings(".items").children("ul").children("li")//$(".spec-scroll .items ul li"); //移动容器里的集合
		var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
		
		var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
		
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
				$(this).parent(".spec-scroll").attr("bimg",tempLength)
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
				$(this).parent(".spec-scroll").attr("bimg",tempLength)
			}
		}
	});
	//上一张
	$(".spec-scroll .prev").bind("click",function(){
		var tempLength = Number($(this).parent(".spec-scroll").attr("bimg"))
		var viewNum = 5; //设置每次显示图片的个数量
		var moveNum = 2; //每次移动的数量
		var moveTime = 300; //移动速度,毫秒
		var scrollDiv = $(this).siblings(".items").children("ul")//$(".spec-scroll .items ul"); //进行移动动画的容器
		var scrollItems = $(this).siblings(".items").children("ul").children("li")//$(".spec-scroll .items ul li"); //移动容器里的集合
		var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
		
		var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
				$(this).parent(".spec-scroll").attr("bimg",tempLength)
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
				$(this).parent(".spec-scroll").attr("bimg",tempLength)
			}
		}
	});
});
