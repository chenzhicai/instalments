/*
 * 智能机浏览器版本信息:
 *
 */
$("#clo_btn").click(function(e) {
	$("#pay_Box").hide();
	indexPwd = 0;
	restPwd();
});
$("#payBoxSure").on("touchend",function  () {
	if($("#payBoxSure").hasClass("btn_disabled")){
		return;
	}
	pwdVarify();
});
PayBox = {
	password: ""
};
var indexPwd = 0;
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { // 移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, // IE内核
			presto: u.indexOf('Presto') > -1, // opera内核
			webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, // 是否iPad
			webApp: u.indexOf('Safari') == -1
				// 是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
var touchEvents = {
	touchstart: "touchstart",
	touchmove: "touchmove",
	touchend: "touchend",

	/**
	 * @desc:判断是否pc设备，若是pc，需要更改touch事件为鼠标事件，否则默认触摸事件
	 */
	initTouchEvents: function() {
		if (browser.versions.mobile == false) {
			this.touchstart = "mousedown";
			this.touchmove = "mousemove";
			this.touchend = "mouseup";
		}
	}
};
touchEvents.initTouchEvents();
$(function() {
	$(".key").bind(touchEvents.touchstart, function(event) {
		//		event.preventDefault();// 阻止浏览器默认事件，重要 
		if (indexPwd >= 6) {
			return;
		} else {
			PayBox.password += "" + $(this).html();
			indexPwd = indexPwd + 1;
		}
		if (indexPwd == 1) {
			$("#pwdOne").html("●");
		}
		if (indexPwd == 2) {
			$("#pwdTwo").html("●");
		}
		if (indexPwd == 3) {
			$("#pwdThree").html("●");
		}
		if (indexPwd == 4) {
			$("#pwdFour").html("●");
		}
		if (indexPwd == 5) {
			$("#pwdFive").html("●");
		}
		if (indexPwd == 6) {
			$("#pwdSix").html("●");
			$("#payBoxSure").removeClass("btn_disabled");
			$("#payBoxSure").addClass("btn_primary")
			PayBox.winHide();
			//			indexPwd = 0;
		}else{
			$("#payBoxSure").removeClass("btn_primary");
			$("#payBoxSure").addClass("btn_disabled")
		}
	});
});

function pwdVarify(param, callbackFunc) {

	/*		getAjax(url, param, function(msg) {
				callbackFunc(msg);
			})*/
	PayBox.callbackFunc(PayBox.password);
	if (true) {
		$("#pay_Box").hide();
	}
}


PayBox.winShow = function() {
	var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	$(".key").each(function(i) {
		var index = parseInt(Math.random() * arr.length);
		$(this).html(arr[index]);
		arr.splice(index, 1);
	});
	$("#popDiv").show();
}

//清空密码框
function restPwd() {
	$("#pwdOne").html("&nbsp;");
	$("#pwdTwo").html("&nbsp;");
	$("#pwdThree").html("&nbsp;");
	$("#pwdFour").html("&nbsp;");
	$("#pwdFive").html("&nbsp;");
	$("#pwdSix").html("&nbsp;");
	PayBox.password = ""
}

PayBox.winHide = function() {
	$("#popDiv").hide();
}

PayBox.show = function(argument) {
	/*	getAjax(url, param, function(msg) {
			if (msg.varifyerror_response != undefined) {
				$("#error_Box").fadeIn();
				return;
			}
			if (msg.lock_response != undefined) {
				var times = msg.lock_response.sub_msg;
				$("#wrongNum2").html(times);
				$("#tip_Box").fadeIn();
				return;
			}
			indexPwd = 0;
			restPwd();
			$("#pay_Box").fadeIn(); //显示密码框
			winShow(); //弹出键盘
		});*/

	$("#pay_Box").show();
	PayBox.winShow();
}

PayBox.delKey = function() {
	if (indexPwd == 1) {
		$("#pwdOne").html("&nbsp;");
	}
	if (indexPwd == 2) {
		$("#pwdTwo").html("&nbsp;");
	}
	if (indexPwd == 3) {
		$("#pwdThree").html("&nbsp;");
	}
	if (indexPwd == 4) {
		$("#pwdFour").html("&nbsp;");
	}
	if (indexPwd == 5) {
		$("#pwdFive").html("&nbsp;");
	}
	if (indexPwd == 6) {
		$("#pwdSix").html("&nbsp;");
	}
	if (indexPwd > 0) {
		indexPwd = indexPwd - 1;
	} else {
		return;
	}
	if (PayBox.password != "") {
		PayBox.password = PayBox.password.substring(0, PayBox.password.length - 1);
	}
}
PayBox.init = function  (url,PayBoxCallbackFunc) {
	PayBox.callbackFunc = PayBoxCallbackFunc;
}
