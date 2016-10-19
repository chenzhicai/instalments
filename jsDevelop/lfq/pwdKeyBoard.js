/*
 * 智能机浏览器版本信息:
 *
 */
$("#clo_btn").click(function(e) {
	$("#pay_Box").hide();
//	indexPwd = 0;
	restPwd();
});
$("#payBoxSure").on("touchend", function() {
	if ($("#payBoxSure").hasClass("btn_disabled")) {
		return;
	}
	pwdVarify();
});
var password;
//var indexPwd = 0;
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
		if (password.length >= 6) {
			return;
		} else {
			password += "" + $(this).html();
		}
		if (password.length == 1) {
			$("#pwdOne").html("●");
		}
		if (password.length == 2) {
			$("#pwdTwo").html("●");
		}
		if (password.length == 3) {
			$("#pwdThree").html("●");
		}
		if (password.length == 4) {
			$("#pwdFour").html("●");
		}
		if (password.length == 5) {
			$("#pwdFive").html("●");
		}
		if (password.length == 6) {
			$("#pwdSix").html("●");
			shwoPayBoxSure();
			winHide();
			//			indexPwd = 0;
		} else {
			hidePayBoxSure();
		}
	});
});

// 禁用确定按钮
function hidePayBoxSure() {
	$("#payBoxSure").removeClass("btn_primary");
	$("#payBoxSure").addClass("btn_disabled")
}

// 启用确定按钮
function shwoPayBoxSure() {
	$("#payBoxSure").removeClass("btn_disabled");
	$("#payBoxSure").addClass("btn_primary")
}

function pwdVarify(param, callbackFunc) {

	/*		getAjax(url, param, function(msg) {
				callbackFunc(msg);
			})*/
	PayBox.callbackFunc(password);
	if (true) {
		$("#pay_Box").hide();
	}
}


function winShow() {
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
	password = "";
	hidePayBoxSure();
}

function winHide() {
	$("#popDiv").hide();
}

function show(argument) {
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
	winShow();
}

function delKey() {
	if (password.length == 1) {
		$("#pwdOne").html("&nbsp;");
	}
	if (password.length == 2) {
		$("#pwdTwo").html("&nbsp;");
	}
	if (password.length == 3) {
		$("#pwdThree").html("&nbsp;");
	}
	if (password.length == 4) {
		$("#pwdFour").html("&nbsp;");
	}
	if (password.length == 5) {
		$("#pwdFive").html("&nbsp;");
	}
	if (password.length == 6) {
		$("#pwdSix").html("&nbsp;");
	}
/*	if (indexPwd > 0) {
		indexPwd = indexPwd - 1;
	} else {
		return;
	}*/
	if (password != "") {
		password = password.substring(0, password.length - 1);
	}
}

function init(url, PayBoxCallbackFunc) {
	PayBox.callbackFunc = PayBoxCallbackFunc;
}
/*
// 不打包形式
window.PayBox = {
		init: init,
		restPwd: restPwd,
		winShow: winShow,
		winHide: winHide,
		show: show,
		delKey: delKey
	}
*/
	// 打包形式
	module.exports = PayBox = {
		init: init,
		restPwd: restPwd,
		winShow: winShow,
		winHide: winHide,
		show: show,
		delKey: delKey
	}
