// Begin

// End
// 定义变量
// 数据变量

var userName = 'username'

// dom变量
var $rMessageContainer = $('#r-messageContainer')
var $oneMore = $rMessageContainer.children('.more')
// console.log($oneMore);

var sendbox = document.getElementById('sendbox')
var h = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
var w = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
var diaryEditArea = document.getElementById('r-diary')
var keepDiaryBtn = document.getElementById('keepDiaryBtn')

var diaryData = []// 日记数据临时存储数组
var timeData = []// 日记时间数据临时存储数组
var myDiary = document.getElementById('myDiary')
var rContainer = document.getElementById('r-container')
var myDiaryState = false// 我的日记窗口，打开与关闭状态
var display = document.getElementById('display')
var $loginBtn = $('#loginBtn')
var $loginPanel = $('#loginPanel')
var loginPanelState = false
var aboutState = false
var $about = $('#about')
var $aboutBtn = $('#aboutBtn')
var $feedBack = $('#feedBack')
var $display3 = $('#display3')// 第三屏挂载点
var messageData = []// 由服务器端获取到的数据
var $more = $('#more')
var $pTextCenter = ('#p-text-center')

var stateObj = {// 状态对象
  moreState: false
}
// loading事件
$(window).load(function () {
// Begin 缓存层显隐
$('#loading').css('opacity',0)
setTimeout(function () { $('#loading').css('display','none')}, 1000)
// End 缓存层显隐

// if(w>700){
//     alert("未对桌面设备优化，请使用移动设备访问  ");  
// }

// Begin 页面进入时动画
// 首页信息流动画
// $rMessageContainer.addClass('animated fadeInUp');
// 首页珠滑动画（仿网易云）
// End   页面进入时动画

// Begin Bmob数据服务
// Bmob数据存储测试

Bmob.initialize("5fd1df2b91ff8b7a0987c2a05784a76c", "0b303f2990ad571937d2c980638a5a82");
// 创建Bmob.Object子类
var TestMessage = Bmob.Object.extend("TestMessage");
// 创建该类的一个实例
var testMessage = new TestMessage();
// 添加数据，第一个入口参数是Json数据

// 数据保存
// 传入信息
function saveData (message) {
    // testMessage.save({
    //     userMessage: message,
    // }, {
    //   success: function() {
    //     console.log('添加成功')
    //   },
    //   error: function() {
    //     console.log('添加失败')
    //   }
    // });
    testMessage.save({
      userMessage: message
    }, {
      success: function (gameScore) {
        console.log('添加成功')
      },
      error: function (gameScore, error) {
        console.log('添加失败')
      }
    })
  }

  // Bmob数据查询测试
  var query = new Bmob.Query(TestMessage)

  // End Bmob数据服务

  // Begin 首屏轮询渲染
  // 渲染函数
  // 传入Bmob查询获取的数据

  var firstScreenRenderTimer = setInterval(firstScreenRender, 150000)

  firstScreenRender()

  function firstScreenRender () {
  // 查询所有数据
    query.find({
      success: function (results) {
        if (messageData.toString() === results.toString()) {       
          console.log('云端数据与本地数据相同')
        } else {
          $rMessageContainer.children('.r-content').remove()
          messageData = results
          for (let i = 0; i < messageData.length; i++) {
            let object = messageData[i]
            $rMessageContainer.prepend('<div class="r-content"><p>' + object.createdAt + '</p><p>' + object.get('userMessage') + '</p></div>')
            // alert(object.id + ' - ' + object.get('userMessage'));
            console.log(i)
          }
        }
      },
      error: function (error) {
        window.alert('查询失败: ' + error.code + ' ' + error.message)
      }
    })
  }
  // E 首屏轮询渲染

  // B 首屏 更多按钮
  $oneMore[0].onclick = function () {
    firstScreenRender()
  }
  // E 首屏 更多按钮
  // begin 时间处理逻辑
  // 时间处理函数
  // 参数为Date对象，输出样例：2018-5-27 15:35:21
  // function transformTime(now){
  //     return((now.getUTCFullYear()+1)+'-'+(now.getMonth()+1)+'-'+now.getUTCDate()+'日');
  // }

  // 日期转换函数
  Date.prototype.format = function (fmt) {
    var o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      'S': this.getMilliseconds()// 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }

  // end   时间处理逻辑
  // 倒计时逻辑代码
  var timerP2 = document.getElementById('p-text-center')
  var memory = new Date()
  var surplusDays
  var surplusHours
  var surplusMinutes
  var surplusSeconds
  var surplusMs
  var nowTime
  var nowYear
  var tChildArr = timerP2.childNodes
  var now

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

  $('#r-container').css('height', h - 40)
  $('#r-container').css('width', w)
  $('#b-container').css('height', h - 40)
  $('#b-container').css('width', w)

  //设置记录页面宽高
  $(window).on('load resize', function () {

    h = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
    w = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
    console.log(h)
    // 确保各界面宽高与页面大小一致
    $('#r-container').css('height',h - 40)
    $('#r-container').css('width',w)
    $('#b-container').css('height',h - 40)
    $('#b-container').css('width',w)
   
  })

// 处理输入框错位问题
  var send = document.getElementById('send')

  $('#send').focus(function () {
    // window.scrollTo(0,50);
    send.scrollIntoView(true)
    console.log('1')
  })
  $('#send').blur(function () {
    $('#sendbox').removeClass('send-bottom')
    console.log('1')
  })

  // 滑屏、滑动、点击换屏事件处理

  // B 原生滑动事件封装
  // $1(".p-container").slideLeft(function (e){
  //     console.log(this);
  //     // this.innerHTML = "左侧滑动了....."
  // })

  $1('#frame').slideLeft(function (e){
       console.log('左侧滑动。')
        if(screenState == 2){
            $('.p-container').css('transform','translateX('+(-2*w)+'px)');
            screenState++;

        };
        if(screenState==1){
            $('.p-container').css('transform','translateX('+(-w)+'px)');
            screenState++;
        };
        window.changeHeader();
    });
    $1('#frame').slideRight(function (e){
       console.log('右侧滑动。');
        if(screenState==2){
            $('.p-container').css('transform','translateX('+(0)+'px)');
            screenState--;
        };
        if(screenState==3){
            $('.p-container').css('transform','translateX('+(-w)+'px)');
            screenState--;
        };
        window.changeHeader();

        // console.log('右滑');
    });
    // $1('#frame').slideUp(function (e){
    //    console.log('向上滑动。');
    //     window.changeHeader();
    // });
    $1('#frame').slideDown(function (e){
       console.log('向下滑动。');
       // 触发下拉动画及下拉刷新
        refresh();
        window.changeHeader();
    });


//E 原生滑动事件封装

    // 当前屏幕所在位置
    var screenState=1;
   



    var container = document.getElementsByClassName('p-container')[0];
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


    // mc.on('swipeleft', function (ev) {
    //     if(screenState==2){
    //         $(".p-container").css('transform','translateX('+(-2*w)+'px)');
    //         screenState++;

    //     };
    //     if(screenState==1){
    //         $(".p-container").css('transform','translateX('+(-w)+'px)');
    //         screenState++;
    //     };
    //     window.changeHeader();
    // });
    
    // mc.on('swiperight', function (ev) {
    //     if(screenState==2){
    //         $(".p-container").css('transform','translateX('+(0)+'px)');
    //         screenState--;
    //     };
    //     if(screenState==3){
    //         $(".p-container").css('transform','translateX('+(-w)+'px)');
    //         screenState--;
    //     };
    //     window.changeHeader();

    // });


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

            // 上传信息至服务器
            // saveData(diaryEditArea.value);
            testMessage = new TestMessage();
            testMessage.save({
              userMessage: diaryEditArea.value
            }, {
              success: function(gameScore) {
                console.log('添加成功')
              },
              error: function(gameScore, error) {
                console.log('添加失败')
              }
            });
            firstScreenRender();
        }
        // console.log(diaryData);
        // console.log(timeData);
        diaryEditArea.value="";

        // +1动效
        // $('#myDiary').addClass("foo");
        // setTimeout(function(){
        //     $('#myDiary').removeClass("foo");
        // },1500)

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

            $(myDiary).siblings().hide(400).end().parent().siblings().hide(800);
            $display.show(400);
            for(let i=0;i<diaryData.length;i++){
                $display.append('<div class="r-content"><p>'+timeData[i]+'</p><p>'+diaryData[i]+'</p></div>');
            }

            $(myDiary).toggleClass('btnActive');
            $(myDiary).children('p').children(".fa-chevron-down").removeClass('fa-chevron-down').addClass("fa-chevron-up");
            myDiaryState=!myDiaryState;
        }else {
            $(myDiary).children('p').children(".fa-chevron-up").removeClass('fa-chevron-up').addClass("fa-chevron-down");

            $display.children().remove();    
            $(myDiary).siblings().show(800).end().parent().siblings().show(800);

            $(myDiary).toggleClass('btnActive');
            
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
            // $feedBack.siblings().hide(400).end().parent().siblings().hide(800);
            $about.children().show(400,'swing');
            // $display3.append('<div id="about" class="center"><a href="mailto:cyan.zhukeqing@qq.com" data-no-instant="">发送邮件到©小猪科技</a></div>')
            $feedBack.children('p').children(".fa-chevron-down").removeClass('fa-chevron-down').addClass("fa-chevron-up");
            
            $feedBack.toggleClass('btnActive');
            aboutState=!aboutState;
        }else{
            // $feedBack.siblings().show(500).end().parent().siblings().show(600);
            // $display3.hide(800);
            $about.children().hide(400,'linear');
            $feedBack.children('p').children(".fa-chevron-up").removeClass('fa-chevron-up').addClass("fa-chevron-down");
            // $display3.children().remove();

            $feedBack.toggleClass('btnActive');
            aboutState=!aboutState;
        }
    });    
//End   问题反馈
      

//Begin 更多 share/donete
     $more.on( "click", function() {
        let moreState=stateObj.moreState;
        if (!moreState) {
            $more.siblings().hide(400).end().parent().siblings().not('#display3').hide(400);
            // $display3.show(800);
            $display3.children().show(800);
            // $('#donate').children().show(800);

            $more.toggleClass('btnActive');
            moreState=!moreState;
        }else{
            $more.siblings().show(500).end().parent().siblings().show(600);
            $display3.children().hide(400);
            $more.toggleClass('btnActive');
            moreState=!moreState;

        }
        stateObj.moreState=moreState;
    });
//end   share/donete



/**
 * 下拉刷新函数，触发UI改变及首页日记更新
 *
 * @param {}
 */
function refresh(){
    // 1、如果第一个r-content的Y坐标与r-messageContainer重合则表示滑到顶部
    var rOffsetTop=$rMessageContainer.offset().top;
    var innerOffsetTop=$($rMessageContainer.children('.r-content')[0]).offset().top;
    if(rOffsetTop==innerOffsetTop){
        alert('刷新动作');
    }
    console.log(rOffsetTop);
    console.log(innerOffsetTop);
    // 2、触发下拉刷新动画效果
    // 3、触发数据更新
}





})

