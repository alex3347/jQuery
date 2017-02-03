//焦点图开始
(function(){
    /*-------------------------编辑数据修改-------------------------------*/
    var data =[
{img1:'./images/05/137662760.jpg',title:'独居老太养流浪狗 邻居受不了准备搬走',slink:'javascript:void(0)'},
{img1:'./images/05/137659381.jpg',title:'奥运会荒诞时刻：男子参加女子比赛夺冠',slink:'javascript:void(0)'},
{img1:'./images/05/137659382.jpg',title:'中国人的一天：采莲老夫妻 每天凌晨采莲',slink:'javascript:void(0)'},
{img1:'./images/05/137659383.jpg',title:'奥运之外：巴西的“绿肺”保护之路',slink:'javascript:void(0)'},
{img1:'./images/05/137663087.jpg',title:'网友晒奇葩运动照 堪称草根奥运会',slink:'javascript:void(0)'},
{img1:'./images/05/137659384.jpg',title:'老人1.6万买仿真娃娃缅怀妻子 出质量问题',slink:'javascript:void(0)'},



<!--↓ 此广告全年投放，保持在第7帧位置，勿改动-->
{img1:'./images/05/137659549.jpg',title:'【推广】大量网红因一款游戏涌入网吧',slink:'javascript:void(0)'},


{img1:'./images/05/137659506.jpg',title:'网友晒小孩子奇葩睡相 厕所鞋子秒变“床”',slink:'javascript:void(0)'},
{img1:'./images/05/137617800.jpg',title:'活着：守护三沙那片蓝',slink:'javascript:void(0)'},
{img1:'./images/05/137617799.jpg',title:'鹅眼：中国摄影师独探里约贫民窟',slink:'javascript:void(0)'},
{img1:'./images/05/137617797.jpg',title:'中国人的一天：老裁缝为女性做内衣',slink:'javascript:void(0)'},
{img1:'./images/05/137617801.jpg',title:'伊朗童婚陋习 13岁男子成最年轻父亲',slink:'javascript:void(0)'},
{img1:'./images/05/137579797.jpg',title:'印尼搬砖工人肌肉大比拼 释放洪荒之力',slink:'javascript:void(0)'},


<!--↓ 此广告全年投放，保持在第14帧位置，勿改动-->
{img1:'./images/05/137659551.jpg',title:'【推广】近日网吧因一款游戏火爆不已！',slink:'javascript:void(0)'},]


  /*-------------------------编辑数据修改-------------------------------*/
    var aView = G('focus_view');//焦点大图外容器
    var aImg = G('focus_view').getElementsByTagName('li');//大图li
    var aTxt = G('focus_text').getElementsByTagName('li');//标题li
    var aSmg = G('focus_slider').getElementsByTagName('li');//slider li
  	var aaImg = G('focus_view').getElementsByTagName('img');//焦点图大图
    var aaSmg = G('focus_slider').getElementsByTagName('img');//焦点图小图
    var aa0 = G('focus_text').getElementsByTagName('a');//标题地址
    var aa1 = G('focus_slider').getElementsByTagName('a');//slider地址
    var aa2 = G('focus_view').getElementsByTagName('a');//焦点大图链接地址
    var oUl = G('focus_slider').getElementsByTagName('ul')[0];
    var oNum = G('num');//计数器
    var oPrev = G('prev');//向左箭头
    var oNext = G('next');//向右箭头
    var index = 0;
    var timer = "";
    for(var i=0;i<aSmg.length;i++){
        aSmg[i].index = i;  //添加索引
        aImg[i].index = i;
        aa0[i].href = aa1[i].href = aa2[i].href = data[i].slink;//各个a标签的地址相同
        aa0[i].innerHTML = data[i].title;
        aaImg[i].src = aaSmg[i].src = data[i].img1;
        aSmg[i].onmouseover  = function(){
            
            stop();//停止定时器
            index = this.index;//47行绑定过index属性值
            // autoPlay();
            // stop();
            
            for(var i=0;i<aSmg.length;i++){
                aSmg[i].className = '';
                aTxt[i].className = '';
                startMove(aImg[i],'opacity',0);
                aImg[i].style.zIndex = 1;
            }
            aSmg[this.index].className = 'current'; 
            aTxt[this.index].className = 'show';
            oNum.innerHTML = this.index+1 + '/12';
            startMove(aImg[this.index],'opacity',100);
            aImg[this.index].style.zIndex = 2;
         }
         aSmg[i].onmouseout  = function(){
            autoPlay();
         }
         aView.onmouseover = function(){
            stop();
         }
         aView.onmouseout = function(){
            autoPlay();
         }
    }
    function conScroll(){//箭头左右移动封装
        if(parseInt(oUl.style.marginLeft)<0){
            startMove(oUl,'marginLeft',0);
            for(var i=0;i<aSmg.length;i++){
                aTxt[i].className = '';
                startMove(aImg[i],'opacity',0);
                aSmg[i].className = '';
                aImg[i].style.zIndex = 1;
            }
            startMove(aImg[0],'opacity',100);
            aSmg[0].className = 'current';
            aTxt[0].className = 'show'; 
            oNum.innerHTML = 1 + '/10';
            aImg[0].style.zIndex = 2;
        }else{
            index = aSmg.length / 2 + 1;
            startMove(oUl,'marginLeft',-oUl.offsetWidth/2);
            for(var i=0;i<aSmg.length;i++){
                aTxt[i].className = '';
                startMove(aImg[i],'opacity',0);
                aSmg[i].className = '';
                aImg[i].style.zIndex = 1;
            }
            startMove(aImg[aSmg.length/2],'opacity',100);
            aSmg[aSmg.length/2].className = 'current';
            aTxt[aSmg.length/2].className = 'show';
            oNum.innerHTML = (aSmg.length*0.5 + 1) + '/10';
            aImg[aSmg.length/2].style.zIndex = 2;
        }
    }

    oNext.onclick = oPrev.onclick = conScroll;

    function stop(){
        clearTimeout(timer);
    }
    function autoPlay(){
        // console.log(index);
        for(var i=0;i<aSmg.length;i++){
            aSmg[i].className = '';
            aTxt[i].className = '';
            startMove(aImg[i],'opacity',0);
            aImg[i].style.zIndex = 1;
        }
        aSmg[index].className = 'current';  
        aTxt[index].className = 'show';
        oNum.innerHTML = index+1 + '/12';
        startMove(aImg[index],'opacity',100);
        aImg[index].style.zIndex = 2;
        index ++;
        if(index == aSmg.length / 2){
            index = 0;
            startMove(oUl,'marginLeft',0);
        }
        if(index == aSmg.length){
            index = 7;
        }
        timer = setTimeout(autoPlay, 5000);
    }
    autoPlay();
})();
function G(id) {
    return document.getElementById(id)
};
function startMove(obj, attr, iTarget) { //轮换动画
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        doMove(obj, attr, iTarget);
    }, 15);
}
function doMove(obj, attr, iTarget) {
    var iCur = 0;
    if (attr == 'opacity') {
        iCur = parseInt(100 * getStyle(obj, attr)) || 0;//放大属性值100倍
    } else {
        iCur = parseInt(getStyle(obj, attr)) || 0;
    }
    var iSpeed = (iTarget - iCur) / 8;
    iSpeed = (iSpeed > 0) ? Math.ceil(iSpeed) : Math.floor(iSpeed);
    if (iCur == iTarget) {
        clearInterval(obj.timer);
    } else if (attr == 'opacity') {
        obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
        obj.style.opacity = (iCur + iSpeed) / 100;
    } else {
        obj.style[attr] = iCur + iSpeed + 'px';
    }
}
function getStyle(obj, attr) { //取样式
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
//焦点图结束