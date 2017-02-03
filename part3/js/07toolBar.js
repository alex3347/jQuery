(function menu(obj){
    var hd = obj.find('.menu-hd'), bd = obj.find('.menu-bd');//hd是原标签 bd是下拉菜单
    obj.timer = null;
//  bd.bind('mouseover', function(){
//      if(bd.is(":animated")) return;
//      clearTimeout(obj.timer);
//      obj.timer = setTimeout(function(){
//          bd.slideDown('fast');
//          hd.addClass('hover');
//      }, 300);
//  });
    obj.hover(function(){
        if(bd.is(":animated")) return;
        clearTimeout(obj.timer);
        obj.timer = setTimeout(function(){
            bd.slideDown('fast');
            hd.addClass('hover');
        }, 300);
    }, function(){
        if(bd.is(":animated")) return;
        clearTimeout(obj.timer);
        hd.removeClass('hover');
        bd.slideUp('fast');
    });
})($('.toolBar .menu'));
//分享列表中微信二维码部分
(function(){
	var _id = document.getElementById("shareWx"),_wxBox = document.getElementById("wxBox");
	_id.onmouseover = function(){
		_wxBox.style.display = "block";
	};
	_id.onmouseout = function(){
		_wxBox.style.display = "none";
	};
	function loadScript(sUrl){
		var _script = document.createElement('script');
		_script.setAttribute('type', 'text/javascript');
		_script.setAttribute('src', sUrl);
		document.getElementsByTagName('head')[0].appendChild(_script);
	};
	window.wxhyJsonpCallback = function(data){		
		_wxBox.getElementsByTagName("img")[0].src = data.url; 
	};
})();
