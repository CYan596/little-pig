//begin

//end  

//定义变量
    var sendbox=document.getElementById('sendbox');
    var h=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
    var w=window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;
    var diaryEditArea=document.getElementById('r-diary');
    var keepDiaryBtn=document.getElementById('keepDiaryBtn');
    var diaryData=[];   //日记数据临时存储数组 
    var timeData=[];    //日记时间数据临时存储数组
    // console.log(keepDiaryBtn);
    var myDiary=document.getElementById('myDiary');
    var rContainer=document.getElementById('r-container');
    var myDiaryState=false; //我的日记窗口，打开与关闭状态 
    var display=document.getElementById('display');
    var $loginBtn=$('#loginBtn');
    var $loginPanel=$('#loginPanel');
    var loginPanelState=false;
    var aboutState=false;
    var $aboutBtn=$('#aboutBtn');
    // var 
    var $feedBack=$('#feedBack');
    var $display3=$('#display3'); //第三屏挂载点
// loading事件
$(window).load(function(){  
    $("#loading").css("opacity",0);
    setTimeout(function(){ $("#loading").css("display","none");}, 1000);

    if(w>700){
        alert("未对桌面设备优化，请使用移动设备访问  ");
    }
    

// 初始化Bmob数据服务
// Bmob数据存储测试

    Bmob.initialize("5fd1df2b91ff8b7a0987c2a05784a76c", "0b303f2990ad571937d2c980638a5a82");
    // 创建Bmob.Object子类
    var TestMessage = Bmob.Object.extend("TestMessage");
    // 创建该类的一个实例
    var testMessage = new TestMessage();
    // 添加数据，第一个入口参数是Json数据
    // testMessage.save({
    //   userMessage: 'hello',  
    // }, {
    //   success: function(gameScore) {
    //     // 添加成功
    //   },
    //   error: function(gameScore, error) {
    //     // 添加失败
    //   }
    // });

    var messageData=null;

// Bmob数据查询测试
    var query = new Bmob.Query(TestMessage);
    // 查询所有数据
    // query.find({
    //   success: function(results) {
    //     console.log(results);
    //     messageData=results;
    //     // alert("共查询到 " + results.length + " 条记录");
    //     // 循环渲染查询到的数据
    //     for (var i = 0; i < results.length; i++) {
    //       var object = results[i];
    //       // alert(object.id + ' - ' + object.get('userMessage'));

    //     }

    //   },
    //   error: function(error) {
    //     alert("查询失败: " + error.code + " " + error.message);
    //   }
    // });

    // console.log(messageData);

//begin 时间处理逻辑

    // 时间处理函数
    // 参数为Date对象，输出样例：2018-5-27 15:35:21
    // function transformTime(now){
    //     return((now.getUTCFullYear()+1)+'-'+(now.getMonth()+1)+'-'+now.getUTCDate()+'日');
    // }

    // 日期转换函数
    

    Date.prototype.format = function(fmt) { 
        var o = { 
            "M+" : this.getMonth()+1,                 //月份 
            "d+" : this.getDate(),                    //日 
            "h+" : this.getHours(),                   //小时 
            "m+" : this.getMinutes(),                 //分 
            "s+" : this.getSeconds(),                 //秒 
            "q+" : Math.floor((this.getMonth()+3)/3), //季度 
            "S"  : this.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
         for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
             }
         }
    return fmt; 
    }      


//end   时间处理逻辑




//倒计时逻辑代码
    var timerP2=document.getElementById("p-text-center");
    var memory=new Date();
    var surplusDays;
    var surplusHours;
    var surplusMinutes;
    var surplusSeconds;
    var surplusMs;
    var nowTime;
    var nowYear;
    var tChildArr=timerP2.childNodes;
    var now;
    
    // function updateTimer() {
    //     now=new Date();
    //     nowTime=now.getTime();
    //     memoryTime=0;
    //     nowYear=now.getUTCFullYear();
    //     surplusDays=parseInt((nowTime-memoryTime)/(1000*60*60*24));
    //     surplusHours=parseInt((((nowTime-memoryTime)-(surplusDays*1000*60*60*24))/(1000*60*60)));
    //     surplusMinutes=parseInt(((nowTime-memoryTime)-(surplusDays*24*60*60*1000)-(surplusHours*60*60*1000))/(1000*60));
    //     surplusSeconds=parseInt(((nowTime-memoryTime)-(surplusDays*24*60*60*1000)-(surplusHours*60*60*1000)-(surplusMinutes*60*1000))/(1000));
    //     surplusMs=parseInt(((nowTime-memoryTime)-(surplusDays*24*60*60*1000)-(surplusHours*60*60*1000)-(surplusMinutes*60*1000)-(surplusSeconds*1000))/(1));

        // if(surplusMs<10){
        //     surplusMs=surplusMs+"00";
        // }else if(surplusMs<100)
        // {
        //     surplusMs=surplusMs+"0";
        // }
        
        // tChildArr[0].innerHTML=(surplusDays+1)+"天";
        // tChildArr[1].innerHTML=(surplusHours+1)+"小时";
        // tChildArr[2].innerHTML=(surplusMinutes+1)+"分钟";
        // tChildArr[3].innerHTML=(surplusSeconds+1)+"秒";
    //     return(nowYear+'-'+surplusMs+'-'+surplusDays+' '+surplusHours+':'+surplusMinutes+':'+surplusSeconds);
    // }
    // console.log(updateTimer());

    // var textNow=document.getElementById("p-text").firstChild;
    // console.log(textNow);

    // var now=new Date();
    // textNow.innerHTML='今天是'+now.getUTCFullYear()+'年'+(now.getMonth()+1)+'月'+now.getUTCDate()+'日';
    // var windowTimer = window.setInterval(updateTimer,1000);


    

    //设置记录页面宽高
    
    // console.log(w);
    // $(window).on("load resize",function(){
      
        // 适配overflow：hidden造成的输入框错位问题
        

            // 确保各界面宽高与页面大小一致
            $("#r-container").css("height",h-40);
            $("#r-container").css("width",w);
            $("#b-container").css("height",h-40);
            $("#b-container").css("width",w);
            
        // });


// 处理输入框错位问题
    var send=document.getElementById("send");

    $("#send").focus(function(){
        // window.scrollTo(0,50);
        send.scrollIntoView(true);
        console.log("1");
    });
    $("#send").blur(function(){
         $("#sendbox").removeClass("send-bottom");
         console.log("1");
    })
 

// 滑屏、滑动、点击换屏事件处理

    // 当前屏幕所在位置
    var screenState=1;

    var container = document.getElementsByClassName("p-container")[0];
    // console.log(pMain);
    var mc = new Hammer.Manager(container);
    Swipe = new Hammer.Swipe();
    mc.add(Swipe);

// 顶部time-header点击事件绑定
    var topNavArr=document.getElementById('time-header').getElementsByTagName('a');
    topNavArr[0].onclick=function(){
        $(".p-container").css('transform','translateX('+(0)+'px)');
        screenState=1;    
        changeHeader();
    }
    topNavArr[1].onclick=function(){
        $(".p-container").css('transform','translateX('+(-w)+'px)');
        screenState=2;    
        changeHeader();
    }
    topNavArr[2].onclick=function(){
        $(".p-container").css('transform','translateX('+(-2*w)+'px)');
        screenState=3;    
        changeHeader();
    }

    // topNavArr[0].click(function() {
        // $(".p-container").css('transform','translateX('+(0)+'px)');
    //     screenState=1;    
    // });

    mc.on('swipeleft', function (ev) {
        if(screenState==2){
            $(".p-container").css('transform','translateX('+(-2*w)+'px)');
            screenState++;

        };
        if(screenState==1){
            $(".p-container").css('transform','translateX('+(-w)+'px)');
            screenState++;
        };
        window.changeHeader();
    });
    mc.on('swiperight', function (ev) {
        if(screenState==2){
            $(".p-container").css('transform','translateX('+(0)+'px)');
            screenState--;
        };
        if(screenState==3){
            $(".p-container").css('transform','translateX('+(-w)+'px)');
            screenState--;
        };
        window.changeHeader();
    });

    // 根据当前页面状态确认
    window.changeHeader=function changeHeader(){
        $('#time-header').children("a").eq((screenState-1)).addClass("active").siblings().removeClass("active");;
    }
    var tJson='{"name":"2323","sex":"afasdf","age":"6262"}';//json示例字符串



//begin 按压事件处理与优化
    // 全局绑定touch事件
    document.body.addEventListener('touchstart', function () { });
//end 按压事件处理与优化


// begin 日记编辑与保存按钮逻辑
    // 保存按钮点击事件
    keepDiaryBtn.onclick=function() {
        // 保存逻辑
            //不为空则保存到数组中
        if(diaryEditArea.value!==""){
            // 保存日记字段数据
            diaryData.push(diaryEditArea.value);
            // 保存日记时间数据
            let time=new Date().format("yyyy-MM-dd hh:mm:ss");
            timeData.push(time);
        }
        // console.log(diaryData);
        // console.log(timeData);
        diaryEditArea.value="";

        // +1动效
        $('#myDiary').addClass("foo");
        setTimeout(function(){
            $('#myDiary').removeClass("foo");
        },1500)

    }

// end   日记编辑与保存按钮逻辑


//Begin 我的日记展示逻辑
    // 1、点击我的日记
    // 2、其他按钮隐藏
    // 3、由下至上动效展示日记
    var $display=$(display);
    myDiary.onclick=function(){
       
        // $(rContainer).append('<div id="display"></div>');
        
        if(!myDiaryState){
            $(myDiary).children('p').children(".fa-chevron-up").removeClass('fa-chevron-up').addClass("fa-chevron-down");

            $(myDiary).siblings().hide(400).end().parent().siblings().hide(800);
            $display.show(400);
            for(let i=0;i<diaryData.length;i++){
                $display.append('<div class="r-content"><p>'+timeData[i]+'</p><p>'+diaryData[i]+'</p></div>');
            }
            myDiaryState=!myDiaryState;
        }else {
            $(myDiary).children('p').children(".fa-chevron-down").removeClass('fa-chevron-down').addClass("fa-chevron-up");
            
            $display.children().remove();    
            $(myDiary).siblings().show(800).end().parent().siblings().show(800);
            myDiaryState=!myDiaryState;
        }

      
    }

    
//End   我的日记展示逻辑



    
//Begin 登录逻辑
    $loginBtn.on( "click", function() {
        if (!loginPanelState) {
            $loginPanel.children().show(400);
            loginPanelState=!loginPanelState;
            $loginBtn.toggleClass('btnActive');
            $loginBtn.children('p').children(".fa-chevron-up").removeClass('fa-chevron-up').addClass("fa-chevron-down");

        }else{
             $loginPanel.children().hide(400);
            loginPanelState=!loginPanelState;
             $loginBtn.toggleClass('btnActive');
            $loginBtn.children('p').children(".fa-chevron-down").removeClass('fa-chevron-down').addClass("fa-chevron-up");

        }
    });
//end   登录逻辑


//Begin 问题反馈
    $feedBack.on( "click", function() {
        if (!aboutState) {
            $feedBack.siblings().hide(400).end().parent().siblings().hide(800);
            $display3.show(800);
            aboutState=!aboutState;
            $display3.append('<div id="about" class="center"><a href="mailto:cyan.zhukeqing@qq.com" data-no-instant="">发送邮件到©小猪科技</a></div>')
            $feedBack.children('p').children(".fa-chevron-down").removeClass('fa-chevron-down').addClass("fa-chevron-up");
        }else{
            $feedBack.siblings().show(500).end().parent().siblings().show(600);
            $display3.hide(800);
            $feedBack.children('p').children(".fa-chevron-up").removeClass('fa-chevron-up').addClass("fa-chevron-down");
            $display3.children().remove();    
            aboutState=!aboutState;
        }
    });
        
//End   问题反馈


//Begin pig
    // $aboutBtn.on( "click", function() {
    //     if (!aboutState) {
    //         $aboutBtn.siblings().hide(400).end().parent().siblings().hide(800);
    //          $display3.show(800);
    //           // $display3.show(800);
    //         aboutState=!aboutState;
    //     }else{
    //         $aboutBtn.siblings().show(500).end().parent().siblings().show(600);
    //         $display3.hide();
    //         aboutState=!aboutState;
    //     }
    // });






})
