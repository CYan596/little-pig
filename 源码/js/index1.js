$( document ).ready(function() {
  var calControl=$('#calControl');
  var calendarBody=$('#date');
  var mainLeftBody=$('.main-left-col');
  // console.log(calControl);
  calControl.status=false;
  calControl.click(function(){
  	// mainLeftBody.css('width','50px');
  	calControl.status?calendarBody.fadeOut(600):calendarBody.fadeIn(600);
  	calControl.status=!calControl.status;		
  });



});