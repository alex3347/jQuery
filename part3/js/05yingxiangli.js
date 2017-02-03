//影像力换一换
var getyxl = jQuery('#picLBxxl li').eq(0).width();//获取li的宽度
(function($){
    var arartta= window['arartta'] = function(o){
        return new das(o);
    }
    das = function(o){
        this.obj = $('#'+o.obj);//ul
        this.bnt = $('#'+o.bnt);//换一换的容器a
        this.showLi = this.obj.find('li');//ul下的li
        this.current = 0;
        this.myTimersc = '';
        this.init()
    }
    das.prototype = {
        chgPic:function(n){
            var _this = this;
            for (var i = 0,l= _this.showLi.length; i < l; i++) {
                _this.showLi.eq(i).find(".pic").find('img').eq(n).attr('src',_this.showLi.eq(i).find(".pic").find('img').eq(n).attr('src'));
				//找到显示大图 赋给属性
                $('#picLBxxl dl:not(:animated)').animate({left: -(n * getyxl) + "px"}, {easing:"easeInOutExpo"}, 1500, function(){});
            }
        },
        init:function(){
            var _this = this;
            this.bnt.bind("click",function(){//容器a绑定click事件
                _this.current++;
                if (_this.current > 2) {
                    _this.current = 0 ;
                }
                _this.chgPic(_this.current);//改变显示图片
            })
        }
    }
})(jQuery);
arartta({
    bnt:'xxlChg',
    obj:'picLBxxl'
});//对象参数执行