 // var timerP=document.getElementsByClassName("container")[0].firstChild;
 //    var timerP2=document.getElementById("timer");
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
    
    
    // var springFestivalTime;
    // 年月日
    function updateTimer() {
        var now=new Date();
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
        var tChildArr=timerP2.childNodes;
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
        '我把我整个灵魂都给你',
        '山中何事，松花酿酒，春水煎茶。',
        '请问阁下是叫有容吗？'
    ];
    

    //设置记录页面宽高
    var h=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
    var w=window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;
    console.log(w);
    $(window).on("load",function(){
           

            // console.log(h);
            $("#r-container").css("height",h);
            $("#r-container").css("width",w);
        });

    // 滑动事件处理
    var container = document.getElementsByClassName("p-container")[0];
    // console.log(pMain);
    var mc = new Hammer.Manager(container);
    Swipe = new Hammer.Swipe();
    mc.add(Swipe);
    mc.on('swipeleft', function (ev) {
        if(ev.deltaX>4){

        }
         $(".p-container").css('transform','translateX('+(-w)+'px)');
             console.log("向左移动ss");
        console.log("向左移动");
    });
    mc.on('swiperight', function (ev) {
        if(ev.deltaX>4){
           
        }
         $(".p-container").css('transform','translateX('+(0)+'px)');
        console.log("向右移动");
    });

    // hammerstart.get('pan').set({
    //   direction: Hammer.DIRECTION_LEFT
    // });
    // hammerstart.on('pan', function(ev) {
    //     if(ev.deltaX>10){
    //         $(".p-container").css('transform','translateX(-100%)');
    //     }
    // });
    // var pHammer = new Hammer(myElement, myOptions);
    //     pHammer.on('pan', function(ev) {
    //     console.log(ev); //输出拖移事件对象
    // });
