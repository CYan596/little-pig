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
        tChildArr[0].innerHTML=surplusDays+"天";
        tChildArr[1].innerHTML=surplusHours+"小时";
        tChildArr[2].innerHTML=surplusMinutes+"分钟";
        tChildArr[3].innerHTML=(surplusSeconds+1)+"秒";
        console.log(tChildArr);

        // console.log(1);
    }
    updateTimer();

    var textNow=document.getElementById("p-text").firstChild;
    // console.log(textNow);

    var now=new Date();
    textNow.innerHTML='今天是'+now.getUTCFullYear()+'年'+(now.getMonth()+1)+'月'+now.getUTCDate()+'日';
    var windowTimer = window.setInterval(updateTimer,1000);