// ==UserScript==
// @id          http://diywork.info/Blog
// @name        PreLoadImgForEyny
// @namespace   http://diywork.info/Blog
// @description Enhances Github comments
// @author      jerone
// @copyright   2014+, NO
// @license     GNU GPLv3
// @version     1.0.1
// @grant       none
// @run-at      document-end
// @include     http://*.eyny.com/*
// @require     http://ajax.aspnetcdn.com/ajax/jquery/jquery-2.1.1.min.js
// ==/UserScript==
window.MaskPanel = 
{
	transDiv: null, //整個畫面，讓他暗
	msgDiv: null,
	contDiv: null,
	returnVal: "",
	
	_tryInit: function()
	{
		if ( this.transDiv == null )
			this._init();
	},
	
	_init: function() 
	{
		var transDiv = this.transDiv = document.createElement("DIV"); //整個畫面，讓他暗
		var msgDiv = this.msgDiv = document.createElement("DIV");			//POP視窗的外匡
		var contDiv = this.contDiv = document.createElement("DIV");		//POP視窗的內容
		//取得瀏覽器視窗高度
		var h = window.innerHeight,  
		//取得瀏覽器視窗寬度
		w = window.innerWidth;		

		$(transDiv).hide();
		
		transDiv.style.zIndex = 900;
		transDiv.style.position = "fixed";
		transDiv.style.width = w+"px";
		transDiv.style.height = h+"px";
		transDiv.style.backgroundColor = "#808080";
		transDiv.style.opacity = "0.3";
								
		msgDiv.style.zIndex = 901;
		msgDiv.style.position = "fixed";
		msgDiv.style.backgroundColor = "#333333";
		$(msgDiv).hide();		
				
		contDiv.style.width = "100%";
		contDiv.style.height = "100%";
		contDiv.style.position = "relative";
		contDiv.style.bottom = "6px";
		contDiv.style.right = "6px";
		
		document.body.appendChild(transDiv);
		
		msgDiv.appendChild(contDiv);
		document.body.appendChild(msgDiv);
	},
	
	show: function() 
	{
		this._tryInit();
	
		var transDiv = this.transDiv	
		var h = document.body.scrollHeight;
		var w = document.body.scrollWidth;
		
		transDiv.style.width = w;
		transDiv.style.height = h;
		transDiv.style.left = 0;
		transDiv.style.top = 0;
		
		$(transDiv).show();
	},

	hide: function()
	{
		if ( this.transDiv == null ) return;
	
		//Element.hide(this.transDiv);
		var transObj = this.transDiv; 
		$(transObj).hide();
		
		var msgObj = this.msgDiv;
		if ( msgObj != null )
			//Element.hide(this.msgDiv);
			$(msgObj).hide();		
	},
	setScrollHandler : function()
	{
		window.onscroll = MaskPanel.handleScroll;
	},
		
	handleScroll : function()
	{
		var ele = MaskPanel.msgDiv;
		//if ( ele != null && Element.visible(ele) )
		if ( ele != null && $(ele).is(":visible") )
			MaskPanel.scrollCentralize(ele); 
	},
	scrollCentralize : function(ele)
	{
		if ( ele != null )
		{		
				//取得瀏覽器視窗高度
			var h = window.innerHeight,  
				//取得瀏覽器視窗寬度
				w = window.innerWidth,
				//取得物件高度						
				mh = $(ele).height(),
				//取得物件寬度
				mw = $(ele).width();
			//console.log("h:"+h+",mh:"+mh+",window.innerHeight:"+window.innerHeight);
			if (mh < h){
				ele.style.top = (h - mh)/2 + "px";
			}else{
				ele.style.top = "0px";
				$(ele).height(h);
			}
			
			if (mw < w){
				ele.style.left = document.body.scrollLeft + (w - mw)/2 + "px";
			}else{
				ele.style.left = "0px";
				$(ele).width(w);				
			}
		}
	},
		
	OK_OnClick:null,NO_OnClick:null,YES_OnClick:null,CANCLE_OnClick:null,
	
	msg: function(msg,width,height,style) 
	{	
		this._tryInit();
		
		switch((typeof(style) == "undefined" ?  "" : style) ) {
			case "MB_OK" :
				btnType = "<button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.OK_OnClick)) {MaskPanel.OK_OnClick();} MaskPanel.returnVal= 'ok';  MaskPanel.hide();\">確定</button>";
				break;
			case "MB_CANCEL" :
				btnType = "<button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.CANCLE_OnClick)) {MaskPanel.CANCLE_OnClick(); MaskPanel.returnVal= 'cancel';  MaskPanel.hide();} \">取消</button>";
				break;				
			case "MB_OKCANCEL" :
				btnType = "<span style=\"margin-left: 15px;\"> <button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.OK_OnClick)) {MaskPanel.OK_OnClick();} MaskPanel.returnVal= 'ok';  MaskPanel.hide(); \">確定</button> </span>" +
				          "<span style=\"margin-left: 15px;\"> <button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.CANCLE_OnClick)) {MaskPanel.CANCLE_OnClick();} MaskPanel.returnVal= 'cancel';  MaskPanel.hide(); \">取消</button> </span>";
				break;
			case "MB_YESNO" :
				btnType = "<span style=\"margin-left: 15px;\"> <button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.YES_OnClick)) {MaskPanel.YES_OnClick();} MaskPanel.returnVal= 'yes';  MaskPanel.hide(); \">是</button> </span>" +
				          "<span style=\"margin-left: 15px;\"> <button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.NO_OnClick))  {MaskPanel.NO_OnClick();}  MaskPanel.returnVal= 'no';   MaskPanel.hide(); \">不是</button> </span>";			
				break;
			case "MB_YESNOCANCEL" :
				btnType = "<span style=\"margin-left: 15px;\"> <button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.YES_OnClick)) {MaskPanel.YES_OnClick();} MaskPanel.returnVal= 'yes';  MaskPanel.hide(); \">是</button> </span>" +
				          "<span style=\"margin-left: 15px;\"> <button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.NO_OnClick))  {MaskPanel.NO_OnClick();}  MaskPanel.returnVal= 'no';   MaskPanel.hide(); \">不是</button> </span>" +
				          "<span style=\"margin-left: 15px;\"> <button class=\"formBtn\" onclick=\"if ($.isFunction(MaskPanel.CANCLE_OnClick)) {MaskPanel.CANCLE_OnClick(); MaskPanel.returnVal= 'cancel';  MaskPanel.hide();} \">取消</button> </span>";			
				break;
			default:
				btnType = "";
				break;
		}		
		
		
	
		var vv = "<table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%;height:100%;border:solid 3px #046380;background-color:#EDEFF1\" border=\"0\" align=\"center\">"
		+ "<td align=\"center\" valign=\"middle\" style=\"color:#002F2F;font-size:16px;font-weight:bold\">"
		+ msg
		+ "</td></tr>"
		+ "<tr><td align=\"center\" valign=\"middle\">"
		+ btnType
		+ "</td></tr>"
		+ "</table>";
		
		var msgDiv = this.msgDiv	
		
		msgDiv.style.boxSizing = 'border-box';
		msgDiv.style.width = (typeof(width) == "undefined" ?  250 : width) + "px";
		msgDiv.style.height = (typeof(height) == "undefined" ?  90 : height) + "px";
		
				
		this.contDiv.innerHTML = vv;
		this.scrollCentralize(msgDiv); //秀在螢幕正中央
	
		//Element.show(msgDiv);
		$(msgDiv).show();
		
		this.show();
		
		msgDiv.ondblclick = MaskPanel.tryForceHide;
		
		this.setScrollHandler();
	},
	
	tryForceHide : function(e)
	{
		if ( (e || window.event).ctrlKey )
			MaskPanel.hide();
	},
	
	showWait: function(msgTxt)
	{
		this.msg(msgTxt || "Please Wait...");
	}
};

window.helloworld = function() {
		alert('Hello world!');
};


//console.log(document.URL);
if (typeof unsafeWindow.jQuery === "undefined"){
		console.log("jQuery not load");
		return;
}
try {
	var thArray = $("#separatorline").nextAll().find(".common");
	if (thArray.length > 0){
		console.log(typeof thArray + ",len = " + thArray.length);
		$.each(thArray , function(ii,obj){
				var aObj = $(obj).children("a");
				if (aObj.length > 0){
					$(aObj).css('border','solid 1px red');
					$(aObj).on('contextmenu', function(e){
	  					e.preventDefault();
	  					
	  					if (typeof($(aObj).attr("href")) !== "undefined"){
	  							var src = (document.URL.substr(0,document.URL.lastIndexOf("/")) + "/" + $(aObj).attr("href"));
	  							//helloworld();
	  							MaskPanel.msg("oh my god! ajax error",250,90,"MB_OK");
	  							/*
	  							MaskPanel.showWait();
									$.ajax({
											type: 'GET',
											url: src,
		    							dataType: 'html',
		    							async: false, // 預設值為 true
		    							cache: true, // 預設值為 true 
		    							error: function(xhr){
		    									MaskPanel.hide();
		    							},
		    							success: function(htmlPage){
	  											alert(src);
	  									}
									});*/
							}
					});
				}
		});
	}
}catch(e){
	console.log(e);
}



/*
var imgArray = $("#separatorline");
console.log(imgArray.length);
imgArray = $("#separatorline").nextAll();
console.log(imgArray.length);
imgArray = $("#separatorline").nextAll().find(".common");
console.log(imgArray.length);
if (imgArray.length > 0){
		console.log(imgArray.length);
	$.each(imgArray,function(ii,obj){
		var img = obj.find("img");
		if (img.length>0){
			alert($(img).attr('title'));
		}
	}	
}
*/



/*
$.each($('a[href]'),function(ii,obj){
	console.log($(obj).attr(herf'));		
	var handlers = jQuery.data($(obj)[0], "events");
	var sb = [];
	for (var t in handlers)
	{
		sb.push("*EventType=" + t);
    for (var h in handlers[t])
        sb.push("    HandlerId[" + h + "]->" + handlers[t][h]);
	}
	consol.log($(obj).attr("herf")+","+sb.join("\n"));	
	
});*/

//window.helloworld = function() {
//		alert('Hello world!');
//	}

//window.setTimeout("helloworld()", 60);


