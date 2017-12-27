var siteurl = "http://vantageappspro.com/clapmeapp";
var siteurl2 = "//vantageappspro.com/clapmeapp";
var realsiteurl = "http://vantageappspro.com/clapmeapp";
function gup(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
function gup2(sParam,url) {
  var results = new RegExp('[\?&]' + sParam + '=([^&#]*)').exec(url);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

function users_menus(para)
{
	var User_fname=localStorage.getItem('Driver_fname');
	var menu='<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+User_fname+'<br><span><a href="edit_profile.html'+para+'">Edit profile</a></span></h4></div><div class="modal-body"><ul>';
	menu+='<li><a href="online.html'+para+'"><span><img src="images/m1.png"/></span>Home</a></li>';
	
	menu+='<li><a class="active" href="profile.html'+para+'"><span><img src="images/m2.png"/></span>Profile</a></li>';
	menu+='<li><a href="my-finance.html'+para+'"><span><img src="images/m3.png"/></span>My Finance</a></li>';
	menu+='<li><a href="history.html'+para+'"><span><img src="images/m4.png"/></span>Trip History</a></li>';
	menu+='<li><a href="notification.html'+para+'"><span><img src="images/m6.png"/></span>Notifications</a></li>';
	menu+='<li><a href="demo.html'+para+'"><span><img src="images/m5.png"/></span>Demo</a></li>';
	menu+='<li><a href="events.html'+para+'"><span><img src="images/m6.png"/></span>Events</a></li>';
	menu+='<li><a href="news.html'+para+'"><span><img src="images/m7.png"/></span>News</a></li>';
	menu+='<li><a href="heatmap.html'+para+'"><span><img src="images/m8.png"/></span>Heatmap</a></li>';
	//menu+='<li><a href="support.html'+para+'"><span><img src="images/m9.png"/></span>Driver Support</a></li>';
	//menu+='<li><a href="online.html'+para+'"><span><img src="images/m6.png"/></span>Oneline/Offline</a></li>';
	menu+='<li><a href="mylocation.html'+para+'"><span><img src="images/m10.png"/></span>My Location</a></li>';
	//menu+='<li><a href="play.html'+para+'"><span><img src="images/m10.png"/></span>Play</a></li>';
	menu+='<li><a href="logout.html'+para+'"><span><img src="images/m2.png"/></span>Log Out</a></li>';
	menu+='</ul></div>';
	
	return menu;
}

var uid=localStorage.getItem('Driver_ID');
		
if(typeof uid!='undefine' && uid!='' && uid!=null){

	setTimeout(function(){
		if(jQuery.trim(uid)!='' && uid!=null && typeof uid!='undefined'){
			var menu=users_menus('?uid='+uid);
			jQuery('#myprofilemenus .modal-content').html(menu);
		}
	},1000);
}
function checkloggedin(uid)
{
	
	var url=siteurl+'/api/driver/login';
	
	jQuery.ajax({  
	 type: 'POST',  
	 url: url,  
	 //contentType: contentType,  
	 dataType: 'json',  
	 data: {checkloggedin:1,uid:uid},  
	 crossDomain: true,  
	 beforeSend: function() {
	 },		
	 complete: function() {
					
	 },
	 success: function(res) {  
	   if(res['loggedin']!='success')
	   {
		window.location='phone.html';   
	   }
		else
		{
			window.location='online.html?uid='+uid;	
		}
	 },  
	 error: function(response, d, a){
		jQuery('body .showmessage').remove();
		var html='<div class="showmessage">Server Error.</div>';
		jQuery('body').append(html);
		setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
	 } 
   });
}





function showPosition(position) {
	localStorage.setItem('Driver_Lat',position.coords.latitude);
	localStorage.setItem('Driver_Long',position.coords.longitude);
	var uid=localStorage.getItem('Driver_ID');
	
	//alert(uid);
	if(typeof uid!='undefine' && uid!='' && uid!=null){
		var url=siteurl+'/api/driver/users';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 //contentType: contentType,  
		 dataType: 'json',  
		 data: {updatelocation:1,id:uid,lati:position.coords.latitude,longi:position.coords.longitude},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
					
		 },
		 success: function(res) {  
		   
		 },  
		 error: function(response, d, a){
			jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
			
		 } 
	   });
		var path = window.location.pathname;
		var page = path.split("/").pop();
		if(page=='trip-in-progress.html'){
			setTimeout(getLocation,2000);
		}
		else{
			setTimeout(getLocation,10000);
		}
	}
    
}
 function showError(error){
	 alert('Message:' + error.message);
 }
 function getLocation() {
     navigator.geolocation.getCurrentPosition(showPosition, showError);
}
 
 

function showNotify(){	
	cordova.plugins.diagnostic.switchToLocationSettings();
	return true;
}
	document.addEventListener("deviceready", onDeviceReady2, false);
	function onDeviceReady2(){
		localStorage.setItem('deviceplatform', device.platform);
		
		cordova.plugins.diagnostic.isLocationAvailable(function(available){
				if(!available)
				{
					navigator.notification.alert(
					"Please enable location services from your settings.",
					showNotify, 
					'Location update failed',
					'SETTINGS'
				);	
				}else{
					getLocation();
				}
		});		
		
	};

function playnotification(audioElement){
   //audioElement.play();
   var audiop = document.getElementById(audioElement);
   audiop.play();
}
function checkNotification(audioElement) {
	
	var uid=localStorage.getItem('Driver_ID');
	var path = window.location.pathname;
	var page = path.split("/").pop();
	//alert(uid);
	if(typeof uid!='undefine' && uid!='' && uid!=null && page!='trip-in-progress.html'){
		var url=siteurl+'/api/driver/trips';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 //contentType: contentType,  
		 dataType: 'json',  
		 data: {checknotification:1,uid:uid},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
					
		 },
		 success: function(res) {  
		   if(res['notification']){
			   if(res['notification']=='yes'){
				   
				   
				   if(res['notifications'])
				   {
					   var totalnoti=jQuery('.showpopmessage').length;
						if(parseInt(totalnoti)<=0){
						   if(!jQuery('body').hasClass('showpopmessage')){
							   var html='<div class="showpopmessage"></div>';
							   jQuery('body').append(html);
						   }
						}
					   var htm='';
						jQuery(res['notifications']).each(function(index){
							htm+='<div class="trip-notification"><div class="trip-pic-outer"><div class="trip-pic"><img src="'+res['notifications'][index]['photo']+'"></div></div>';		
							htm+='<div class="trip-content"><h2>ClapMe</h2>';
							htm+='<div class="trip-title">'+res['notifications'][index]['message']+'</div></div>';
							htm+='<div class="trip-link"><a class="closenotification" href="javascript:;">CLOSE</a> <a class="viewnotification" href="'+res['notifications'][index]['link']+'">VIEW</a></div></div>';
						});
						jQuery('.showpopmessage').append(htm);
						jQuery('a.closenotification').click(function(){
							jQuery(this).parents('.trip-notification').remove();
							var totalnoti=jQuery('.trip-notification').length;
							if(parseInt(totalnoti)<=0){
								jQuery('.showpopmessage').remove();
							}
						});
						playnotification(audioElement);
				   }
			   }
		   }
		 },  
		 error: function(response, d, a){
			jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
			
		 } 
	   });
		setTimeout(function(){checkNotification(audioElement)},5000);
	}
    
}

jQuery(document).ready(function(){
	jQuery('body').append('<div style="display:none;"><audio id="successSound" controls><source src="'+siteurl+'/uploads/ding.mp3" type="audio/mpeg"><source src="'+siteurl+'/uploads/1Hand.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>');	
	
		checkNotification('successSound');
});