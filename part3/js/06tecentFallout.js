(function(win, doc) {
	var WaterFall = window.WaterFall = function(args) {
			return new _WaterFall(args);
		},
		_WaterFall = function(args) {
			this.id = args.id;
			this.tag = args.tag;
			this.row = args.row;
			this.boxWidth = args.boxWidth;
			this.tmpArr = [];
			this.list = [];
			this.init();
		},
		imgReady = (function() {//imgReady是自执行函数
			var list = [],
				intervalId = null,
				// 用来执行队列
				tick = function() {
					var i = 0;
					for(; i < list.length; i++) {
						list[i].end ? list.splice(i--, 1) : list[i]();
					};
					!list.length && stop();
				},

				// 停止所有定时器队列
				stop = function() {
					clearInterval(intervalId);
					intervalId = null;
				};

			return function(url, ready, load, error, obj) {
				var onready, width, height, newWidth, newHeight,
					img = new Image();

				img.src = url;
				img.o = obj;
				// 如果图片被缓存，则直接返回缓存数据
				if(img.complete) {
					ready.call(img);
					load && load.call(img);
					return;
				};

				width = img.width;
				height = img.height;

				// 加载错误后的事件
				img.onerror = function() {
					error && error.call(img);
					onready.end = true;
					img = img.onload = img.onerror = null;
				};

				// 图片尺寸就绪
				onready = function() {
					newWidth = img.width;
					newHeight = img.height;
					if(newWidth !== width || newHeight !== height ||
						// 如果图片已经在其他地方加载可使用面积检测
						newWidth * newHeight > 1024
					) {
						ready.call(img);
						onready.end = true;
					};
				};
				onready();

				// 完全加载完毕的事件
				img.onload = function() {
					// onload在定时器时间差范围内可能比onready快
					// 这里进行检查并保证onready优先执行
					!onready.end && onready();

					load && load.call(img);

					// IE gif动画会循环执行onload，置空onload即可
					img = img.onload = img.onerror = null;
				};

				// 加入队列中定期执行
				if(!onready.end) {
					list.push(onready);
					// 无论何时只允许出现一个定时器，减少浏览器性能损耗
					if(intervalId === null) intervalId = setInterval(tick, 40);
				};
			};
		})();
	_WaterFall.prototype = {
		$: function(elem) {
			return typeof elem === 'string' ? doc.getElementById(elem) : elem
		},
		$$: function(elem, tag) {
			return this.$(elem).getElementsByTagName(tag)
		},
		ArrayIndex: function(arr, min) { //返回索引
			for(k in arr) {
				if(arr[k] == min) {
					return k;
				}
			}
		},
		init: function() {
			var imgs = this.$$(this.id, this.tag),//获取所有img图片
				_this = this,
				tmp = [];
			// this.$(this.id).style.visibility = 'visible';
			this.$(this.id).style.width = this.boxWidth + "px";//设置ul宽度为设定值
			for(var i = 0; i < imgs.length; i++) {
				(function(f) {
					imgReady(imgs[f].src, function() {
						if(this.width) {//this指代img对象
							_this.tmpArr.push({
								'url': this.src,
								'obj': this.o.parentNode.parentNode.parentNode,
								'isload': true,
								'width': this.width,
								'height': this.height
							});
							//alert('arris:'+_this.tmpArr.length+'imgis:'+imgs.length);
							if(_this.tmpArr.length == (imgs.length)) {
								_this.setPos();
							}
						}
					}, '', '', imgs[f]);
				})(i)
			};

		},
		setPos: function() {
			var lis = [],
				BH = 0,
				minH, minKey, _this = this;
			for(var i = 0; i < _this.tmpArr.length; i++) {
				if(_this.tmpArr[i].isload) {
					//alert(_this.tmpArr[i].url);
					BH = _this.tmpArr[i].obj.offsetHeight + 15;
					if(i < _this.row) { //每行高度到数组
						_this.list[i] = BH;
						_this.tmpArr[i].obj.style.position = "";
					} else {
						minH = Math.min.apply('', _this.list);
						minKey = _this.ArrayIndex(_this.list, minH);
						_this.list[minKey] += (BH);
						_this.tmpArr[i].obj.style.position = "absolute";
						_this.tmpArr[i].obj.style.top = minH + "px";
						_this.tmpArr[i].obj.style.left = (minKey * 239) + "px";
					}
				}
			}
			_this.$(_this.id).style.height = _this.list[minKey] + 130 + 'px';
			_this.$(_this.id).style.visibility = 'visible';
		}
	}
})(window, document);
window.onload = function() {
	WaterFall({
		id: "piclist",
		tag: "img",
		row: 4,
		boxWidth: 968
	});
}; 
