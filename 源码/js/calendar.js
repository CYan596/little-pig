(function(){
	console.log('日历插件运行中...');
	var is_calendar = null;
	var day = [6,0,1,2,3,4,5];
	var Calendar = function(config){
		this.init(config);
	}
	Calendar.prototype.init = function(config){
		this.date = config.date || new Date();
		this.box = config.id;
		this.getHtml();
		this.callback = config.callback;
		this.show();
	}

	// 这里的注释传递了信息，勿删
	Calendar.prototype.htmlStorage=function(){
		/*<div class='calendar'> 
				<div class='calendar-header'> 
					
					<div class="btn-group">
					  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					    新建 <span class="caret"></span>
					  </button>
					  <ul class="dropdown-menu">
					    <li><a href="#">事件（Event）</a></li>
					    <li><a href="#">任务（Task）</a></li>
					    
					  </ul>
					</div>

					<div class='cal-hea-wrap'>
						<input type='text' class='year form-control'>年
						<input type='text' class='month form-control'>月

						<div class='btn-group' role='group' >
							<button class='btn btn-default cale-com'>确定</button>
							<button class='btn btn-default cale-que'>取消</button>
						</div>
					</div>

					<div class='btn-group ' role='group' >
							<button class='btn cale-left btn-default hidden-xs '>
								<span class='fa fa-angle-left fa-1x'></span>
							</button>
							<button class='btn  cale-right hidden-xs btn-default '>
								<span class='fa fa-angle-right fa-1x'></span>
							</button>
					</div>

					
				</div>
				<div class='cale-nav clearfix'>
					<span>周一</span>
					<span>周二</span>
					<span>周三</span>
					<span>周四</span>
					<span>周五</span>
					<span>周六</span>
					<span>周日</span>
				</div>	
				<div class='calendar-ri'></div>
		</div>*/
	}
	Calendar.prototype.getHtml=function(){
		var str = this.htmlStorage.toString();
        var sPos = str.indexOf("/*")+2;
        var ePos = str.lastIndexOf("*/");
    	this.DOM = (sPos<0 || ePos<0) ? "" : str.substring(sPos, ePos);
	};


	Calendar.prototype.show = function(){


		var date = new Date(this.date);
		console.log(date);
		var year = date.getFullYear();
		var month = date.getMonth()+1;

		var d = date.getDate();
		var days = [31,28+is_leap(date.getFullYear()),31,30,31,30,31,31,30,31,30,31];
		var newDate = new Date(year+','+month+','+1);
		var kun = day[newDate.getDay()];
		var tian = days[newDate.getMonth()];
		if(is_calendar)return;
		$(this.box).css({position:'relative'}).append(this.DOM);
		is_calendar = this;
		$('.calendar').css({position:'absolute',left:0,top:$(this.box).height()})
		var spanKun = str_repeat('<span></span>',kun,tian);
		$('.year').val(year);
		$('.month').val(month);
		$('.calendar-ri').append(spanKun).children('span').eq(d+kun-1).addClass('active today');
		var _this = this;
		$('.cale-left').on('click',function(){
			if(month==1){
				year--;
				month=13;
			}
			_this.upDate(year,--month);
		})
		$('.cale-right').on('click',function(){
			if(month==12){
				year++;
				month=0;
			}
			_this.upDate(year,++month);
		})
		$('.calendar input').on('change',function(){
			var year = $('.year').val();
			var month = $('.month').val();
			// console.log(year.match(/^\d+$/));
			if(!year.match(/^\d+$/)|| !month.match(/^\d+$/)){
				$('.calendar-ri').html('<h3>你输入的是火星时间吧</h3>');
				return;
			}
			_this.upDate(year,month);
		})

		// 日历左键单击事件
		$('.calendar-ri span').on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
		// 日历右键单击事件
		$('.calendar-ri span').on('contextmenu',function(){
			// console.log('test');
			 var menu=$("#G-menu-body");
			 var pageX = event.pageX;//鼠标单击的x坐标
             var pageY = event.pageY;//鼠标单击的y坐标
             var cssObj = {
                        top:pageY+"px",//设置菜单离页面上边距离，top等效于y坐标
                        left:pageX+"px"//设置菜单离页面左边距离，left等效于x坐标
                    };
         //判断横向位置（pageX）+自定义菜单宽度之和，如果超过页面宽度及为溢出，需要特殊处理；
            var menuWidth = menu.width();
            var pageWidth = $(document).width();

            if(pageX+menu.width()>pageWidth){
                    cssObj.left = pageWidth-menuWidth-5+"px"; //-5是预留右边一点空隙，距离右边太紧不太美观；
                }


             $("#G-menu-body").css(cssObj).stop().fadeIn(500);//显示使用淡入效果,比如不需要动画可以使用show()替换;
                    
			return false;
		})
		// 隐藏日历菜单
		$(document).on("mousedown",function(event){
            //button等于0代表左键，button等于1代表中键
            if(event.button==0 || event.button==1){
                   $("#G-menu-body").stop().fadeOut(200);//获取菜单停止动画，进行隐藏使用淡出效果
            }
     	})

     	// 禁用全局右键菜单
     	$(document).on('contextmenu',function(){
     		return false;
     	})
     	$(document).on('contextmenu',function(){
     		return false;
     	})



		$('.cale-que').on('click',function(e){
			e.stopPropagation();
			_this.hide();
			// _this.callback&&_thisthis.callback('取消');
		})
		$('.cale-com').on('click',function(e){
			e.stopPropagation();

			var y = $('.year').val();
			var m = $('.month').val()-1;
			
			// console.log(upDateObj);
			_this.hide();

			// 更改日期后，重渲
			_this.date=new Date(y,m);
			// year = updateObj.NYear;
			// month = updateObj.NMonth;
			// console.log('yes');
			_this.show();
			// _this.callback&&_this.callback(y,m,d);
			// _this.callback(y,m,d);
		}



		)
	}
	Calendar.prototype.hide = function(){
		$('.calendar').remove();
		is_calendar=null;
	}
	Calendar.prototype.upDate = function(year,month){
		var nowDate=new Date();

		$('.calendar-ri').html('');
		var days = [31,28+is_leap(year),31,30,31,30,31,31,30,31,30,31];
		var newDate = new Date(year+','+month+','+1);
		var kun = day[newDate.getDay()];
		var tian = days[newDate.getMonth()];
		var spanKun = str_repeat('<span></span>',kun,tian);
		$('.year').val(year);
		$('.month').val(month);

		// $('.calendar-ri').append(spanKun).children('span').eq(kun).addClass('active');
		$('.calendar-ri').append(spanKun);
		if (year==nowDate.getFullYear()&&month==(nowDate.getMonth()+1)) {
			$('.calendar-ri').children('span').eq(kun+nowDate.getDate()-1).addClass('active today');
		}
		$('.calendar-ri span').on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
	}

	// Calendar.prototyep.inputUpDate=function(){
    //
	// }

	var golbal = this || (0, eval)('this');
	golbal.Calendar = Calendar;
	// 判断是否为闰年
	function is_leap(year){
		return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
	}
	// 重复生成字符串
	function str_repeat(str,n,t){
		var strs='';
		var m = 7-(n+t)%7;
		for(var i=0;i<n+t+m;i++){
			if(i<n){
				strs+=str;
			}else if(i<n+t){
				strs+='<span>'+(i-n+1)+'</span>';
			}else if(i<n+t+m){
				strs+=str;
			}
			
		}
		return strs;
	}


})();