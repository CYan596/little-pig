
    

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




//倒计时逻辑代码
    var timerP2=document.getElementById("p-text-center");
    // console.log(timerP2);
    // timerP2.innerHTML=1;
    // alert(timerP2.innerHTML);
    // var springFestival=new Date(2018,1,16,0,0,0);
    var memory=new Date(2017,5,29,0,0,0);
    var surplusDays;
    var surplusHours;
    var surplusMinutes;
    var surplusSeconds;
    var surplusMs;
    var nowTime;
    var nowYear;
    var tChildArr=timerP2.childNodes;
    var now;
    
    // var springFestivalTime;
    // 年月日
    function updateTimer() {
        now=new Date();
        nowTime=now.getTime();
        // springFestivalTime=springFestival.getTime();
        memoryTime=memory.getTime();
        nowYear=now.getUTCFullYear();
        // console.log(nowTime);
        // console.log(springFestivalTime);
        // var nowString=now.toLocaleDateString();
        // console.log(nowString);
        surplusDays=parseInt((nowTime-memoryTime)/(1000*60*60*24));
        // console.log(surplusDays);
        surplusHours=parseInt((((nowTime-memoryTime)-(surplusDays*1000*60*60*24))/(1000*60*60)));
        // console.log(surplusHours);
        surplusMinutes=parseInt(((nowTime-memoryTime)-(surplusDays*24*60*60*1000)-(surplusHours*60*60*1000))/(1000*60));
        // console.log(surplusMinutes);
        surplusSeconds=parseInt(((nowTime-memoryTime)-(surplusDays*24*60*60*1000)-(surplusHours*60*60*1000)-(surplusMinutes*60*1000))/(1000));
        //console.log(surplusSeconds);
        surplusMs=parseInt(((nowTime-memoryTime)-(surplusDays*24*60*60*1000)-(surplusHours*60*60*1000)-(surplusMinutes*60*1000)-(surplusSeconds*1000))/(1));
        // console.log(surplusMs);
        if(surplusMs<10){
            surplusMs=surplusMs+"00";
        }else if(surplusMs<100)
        {
            surplusMs=surplusMs+"0";
        }
        // timerP2.innerHTML= surplusDays+"天"+surplusHours+"小时"+surplusMinutes+"分钟"+(surplusSeconds+1)+"秒"+"</p>";
        
        tChildArr[0].innerHTML=(surplusDays+1)+"天";
        tChildArr[1].innerHTML=(surplusHours+1)+"小时";
        tChildArr[2].innerHTML=(surplusMinutes+1)+"分钟";
        tChildArr[3].innerHTML=(surplusSeconds+1)+"秒";
        // console.log(tChildArr);

        // console.log(1);
    }
    updateTimer();

    var textNow=document.getElementById("p-text").firstChild;
    // console.log(textNow);

    var now=new Date();
    textNow.innerHTML='今天是'+now.getUTCFullYear()+'年'+(now.getMonth()+1)+'月'+now.getUTCDate()+'日';
    var windowTimer = window.setInterval(updateTimer,1000);


    // 底部文字数组
    var textArr=[
        '年轻的时候我以为钱就是一切，现在老了才知道，确实如此。',
        '你最可爱',
        '请问阁下是叫有容吗？'
    ];
    

    //设置记录页面宽高
    var h=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
    var w=window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;
    // console.log(w);
    $(window).on("load resize",function(){
           

            // console.log(h);
            $("#r-container").css("height",h-50);
            $("#r-container").css("width",w);
            $("#b-container").css("height",h-50);
            $("#b-container").css("width",w);
            
        });

    // 处理输入框错位问题
    // $("#send").focus(function(){
    //      $("#sendbox").addClass("send-bottom");
    //      console.log("1");
    // });
    // $("#send").blur(function(){
    //      $("#sendbox").removeClass("send-bottom");
    //      console.log("1");
    // })
 

// 滑屏事件处理

    // 当前屏幕所在
    var screenState=1;

    var container = document.getElementById("loading");
    // console.log(pMain);
    var mc = new Hammer.Manager(container);
    Swipe = new Hammer.Swipe();
    mc.add(Swipe);
    mc.on('swipeleft', function (ev,fn) {
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
    mc.on('swiperight', function (ev,changeHeader) {
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

    // changeHeader();
    window.changeHeader=function changeHeader(){
        $('#time-header').children("a").eq((screenState-1)).css("color", "#000").siblings().css("color", "#333");;
        
        
        // console.log(1);
    }

    var tJson='{"name":"2323","sex":"afasdf","age":"6262"}';//json示例字符串
    // console.log(tJson);

// 二屏留言渲染 r

    //参数：数组 第一项为时间，第二项为信息
    //引擎：把传入的数组渲染后添加到第二屏中
    function rEngine(messageArr){
        // console.log(Message);
        // var t=JSON.parse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}');
        
        // console.log(textOArr.chats.length);
        // $(".chat-list-wrap").empty();

        for(var i=0;i<2;i++){

            // $(".chat-list-wrap").append("<div class=\"chat-list-line\"><p class=\"line-p1\">"+textOArr.chats[i].name+" "+textOArr.chats[i].time+"</p><p class=\"line-p2\">"+" "+textOArr.chats[i].said+"</p></div>");
            //如果当前信息是该客户端用户所发，添加类line-mine
            // if(textOArr.chats[i].name==userName){
            //     $('.chat-list-line:last').addClass("line-mine");
            // }

        }
        // console.log(textOArr.sites[1].name);
        // $(".chat-list-container")[0].scrollTop=$(".chat-list-container")[0].scrollHeight; //确保滚动条的位置
    }

// loading事件
$(window).ready(function(){  
    $("#loading").css("opacity",0);
    
});  