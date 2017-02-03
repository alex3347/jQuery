//图片区域蒙版鼠标移动事件
$('#mouseMask, #picWrap').bind('mousemove', function(event){
    var w = $('#Main-A').width()/2, X = $('#Main-A').offset().left,
        x = event.pageX;
    if(x - X >= w){
        $(this).get(0).className = 'cursor-right';
        $('#BtnRight').css({visibility: 'visible'});
        $('#BtnLeft').css({visibility: 'hidden'});
    }else{
        $(this).get(0).className = 'cursor-left';
        $('#BtnLeft').css({visibility: 'visible'});
        $('#BtnRight').css({visibility: 'hidden'});
    }
});

//蒙版增加点击事件
$('#mouseMask, #picWrap').bind('click', function(event){
    var node = event.target;
    if(node.getAttribute('id') == 'slideBtn') return;
    if ($(this).hasClass("cursor-left")){
        for (var i=0; i<$("#bigPic li").length;i++) {
        	if($("#bigPic li").eq(i).hasClass("on")){
	        	$("#bigPic li").eq(i).removeClass("on");
	        	$(".smallPic .SmallWarp li .mask").eq(i).removeClass("on");
	        	i-1<0 ? i=$("#bigPic li").length : null;
	        	$("#bigPic li").eq(i-1).addClass("on");
	        	$(".smallPic .SmallWarp li .mask").eq(i-1).addClass("on");
	        	break;
        	}
        }
    }
    if ($(this).hasClass("cursor-right")){
        for (var i=0; i<$("#bigPic li").length;i++) {
        	if($("#bigPic li").eq(i).hasClass("on")){
	        	$("#bigPic li").eq(i).removeClass("on");
	        	$(".smallPic .SmallWarp li .mask").eq(i).removeClass("on");
	        	i+1<$("#bigPic li").length ? null : i=-1;
	        	$("#bigPic li").eq(i+1).addClass("on");
	        	$(".smallPic .SmallWarp li .mask").eq(i+1).addClass("on");
	        	break;
        	}
        }
    }
});