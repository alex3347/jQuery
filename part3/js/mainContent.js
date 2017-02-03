//主内容区逻辑
$(".shareBtn").on("mouseover",function(){
	$(this).children("#shares").css("display","block");
});
$(".shareBtn").on("mouseout",function(){
	$(this).children("#shares").css("display","none");
});
//tab侧边栏
$(".tab_fht").on("mouseenter",function(){
	console.log(1);
    $(".emcontent.gj").hide();
    $(".emcontent.fht").show();
    $(".gjfht div").removeClass("cur");
    $(this).addClass("cur");
});
$(".tab_gjzt").on("mouseenter",function(){
	console.log(2);
    $(".emcontent.gj").show();
    $(".emcontent.fht").hide();
    $(".gjfht div").removeClass("cur");
    $(this).addClass("cur");
});
