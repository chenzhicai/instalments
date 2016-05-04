$.ajaxSetup({
	beforeSend: function(XMLHttpRequest, object) {
		// showLoading();
	},
	complete: function(XMLHttpRequest, textStatus) {
		// setTimeout(hideLoading, 1000);
	},
	error: function(XMLHttpRequest, textStatus, errorThrown, errorMsg) {
		alert(errorMsg);
	}
});

function getAjax(url, param, callBack) {
	jQuery.support.cors = true;
	$.ajax({
		type: 'post',
		dataType: "json",
		url: url,
		data: param,
		cache: false,
		async: false,
		success: function(msg) {
			callBack(msg);
		}
	});
}

function getUrlAjax(url, param, callBack) {
	jQuery.support.cors = true;
	$.ajax({
		type: 'get',
		dataType: "json",
		url: url,
		data: param,
		cache: false,
		async: false,
		success: function(msg) {
			callBack(msg);
		}
	});
}

// 用X补空
function pad(num, n) {
	var len = num.toString().length;
	while (len < n) {
		num = "x" + num;
		len++;
	}
	return num;
}

// 四舍五入
function forDight(s, n) {
	if (s == null) {
		return "0.00";
	}

	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";

	var l = s.split(".")[0].split("").reverse(),
		r = s.split(".")[1];
	var t = "";

	for (var i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}

	return t.split("").reverse().join("") + "." + r;
}

// 交易查询
function transTypeToString1(transType) {
	switch (transType) {
		case "99":
			return "全部";
			break;

		case "B00001":
			return "存入";
			break;

		case "B00002":
			return "消费";
			break;

		case "B00004":
			return "转福利宝";
			break;

		case "B00005":
			return "商城退款";
			break;
	}
}

// 交易记录
function transTypeToString2(transType) {
	switch (transType) {
		case "99":
			return "全部";
			break;

		case "A00003":
			return "收益结转";
			break;

		case "A00002":
			return "转出";
			break;

		case "B00003":
			return "转入";
			break;
	}
}

function transStatusToString(transStatus) {
	switch (transStatus) {
		case "A1":
			return "<span class='blue'>成功</span>";
			break;

		case "A2":
			return "<span class='gary'>失败</span>";
			break;

		case "A3":
			return "<span>待确认</span>";
			break;
	}
}

// 获取url参数
QueryString = {
	data: {},
	Initial: function() {
		var aPairs, aTmp;
		var queryString = new String(window.location.search);
		queryString = queryString.substr(1, queryString.length);
		aPairs = queryString.split("&");
		for (var i = 0; i < aPairs.length; i++) {
			aTmp = aPairs[i].split("=");
			this.data[aTmp[0]] = aTmp[1];
		}
	},
	GetValue: function(key) {
		return this.data[key];
	}
}

// 调用服务器链接
//var BASE_URL = window.location.protocol + "//" + window.location.host + "/";

//调用服务器链接
var BASE_URL = window.location.protocol + "//wxtest.ulinkpay.com/";

//调用服务器链接
//var BASE_URL = window.location.protocol + "//www.ulinkpay.com/";
var ACCT_URL = BASE_URL + "FuLiBao/AcctServlet";
var BINDCARD_URL = BASE_URL + "FuLiBao/BindCardServlet";
var BIND_URL = BASE_URL + "FuLiBao/BindServlet";
var HISEARN_URL = BASE_URL + "FuLiBao/HisEarnServlet";
var HISYIELD_URL = BASE_URL + "FuLiBao/HisYieldServlet";
var OPENACCT_URL = BASE_URL + "FuLiBao/OpenAcctServlet";
var TRANS_URL = BASE_URL + "FuLiBao/TransServlet";
var AREAS_URL = BASE_URL + "FuLiBao/GetAreasServlet";
var VERIFYCODE_URL = BASE_URL + "FuLiBao/SendVerifyServlet";
var TRANSIN_URL = BASE_URL + "FuLiBao/TransinServlet";
var TRANSOUT_URL = BASE_URL + "FuLiBao/TransoutServlet";

var VERIFYCODENEWPWD_URL = BASE_URL + "FuLiBao/SendVerifyNewPwdServlet";
var CARDNEWPWDINFO_URL = BASE_URL + "FuLiBao/CardNewPwdInfoServlet";
var CARDNEWPWD_URL = BASE_URL + "FuLiBao/CardNewPwdServlet";
var GOMALL_URL = BASE_URL + "FuLiBao/GetOpenIdServlet";
var GOPAY_URL = BASE_URL + "FuLiBao/GoPayServlet";
var PWDVARIFY_URL = BASE_URL + "FuLiBao/CardPwdVarifyServlet";
var GETOPENID_URL = BASE_URL + "FuLiBao/GetOpenIdServlet";


// 解绑-取消
$("#btnUnBundCancel").click(function() {
	WeixinJSBridge.call('closeWindow');
});

// 转到存入前判断
$("#gotoIn").click(function() {
	gotoIn();
});

// 转到转出前判断
$("#gotoOut").click(function() {
	gotoOut();
});



// 绑卡弹框的确认按钮
$(".pop_btn a").click(function() {
	$(".pop_box").fadeOut();
	WeixinJSBridge.call('closeWindow');
})

// 绑卡的确认按钮
$("#btnBindCardOk").click(function() {
	bindcard(0);
});

// 交易查询-全部
$("#aSearchAll").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(99, 0, currentPage, everyCount, flag);
	myScroll.refresh();
});

//交易查询-退款
$("#aSearchRefund").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(4, 0, currentPage, everyCount, flag);
	myScroll.refresh();
});

// 交易查询-存入
$("#aSearchTurnIn").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(3, 0, currentPage, everyCount, flag);
	myScroll.refresh();
});

// 交易查询-消费
$("#aSearchConsume").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(2, 0, currentPage, everyCount, flag);
	myScroll.refresh();
});

// 交易查询-转福利宝
$("#aSearchWarehouse").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(1, 0, currentPage, everyCount, flag);
	myScroll.refresh();
});

// 交易记录-全部
$("#aRecordAll").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(99, 1, currentPage, everyCount, flag);
	myScroll.refresh();
});

// 交易记录-存入
$("#aRecordTurnIn").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(1, 1, currentPage, everyCount, flag);
	myScroll.refresh();
});

// 交易记录-消费
$("#aRecordConsume").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(2, 1, currentPage, everyCount, flag);
	myScroll.refresh();
});

// 交易记录-转福利宝
$("#aRecordWarehouse").click(function() {
	currentPage = 1;
	$("#detail").html("");
	transPage(3, 1, currentPage, everyCount, flag);
	myScroll.refresh();
});

// 存入金额发生变化
$("#transin_amt").keyup(function(e) {
	inMoneyChange(e);
});

// 存入金额发生变化
$("#transin_amt").blur(function(e) {
	//$("#transin_amt").val(forDight($("#transin_amt").val(), 2));

});

// 转出金额发生变化
$("#transout_amt").keyup(function(e) {
	outMoneyChange(e);
});

// 转出金额发生变化
$("#transout_amt").blur(function(e) {
	//$("#transout_amt").val(forDight($("#transout_amt").val(), 2));
});



//跳转至商城
$("#gotoMall").click(function(e) {
	QueryString.Initial();
	var openid = QueryString.GetValue("openid");
	window.location.href = GOMALL_URL + "?module=MERCHANT&openid=" + openid;
	//	window.location.href = BASE_URL + "mall.html?openid=99999";
});



// 余额查询
function acct() {
	QueryString.Initial();
	var openid = QueryString.GetValue("openid");

	var url = ACCT_URL;
	var param = {
		openid: openid
	};

	getAjax(url, param, function(msg) {
		if (msg.error_response != undefined) {
			alert(msg.error_response.sub_msg);
			return;
		}

		if (msg.acct_response.resp_code != "0000") {
			alert(msg.acct_response.resp_msg);
			return;
		}

		var tlk_card_no = "";
		// 获取通联卡号
		var card_id = msg.acct_response.card_id;
		/*if(card_id!=null && card_id!= undefined){
			var card_no_id = String(card_id);
			var card_no_front = card_no_id.substr(0, 6);
			var card_no_back = card_no_id.substr(card_no_id.length - 4, 4);
			tlk_card_no = card_no_front + pad(card_no_back, card_no_id.length - 6);
		}*/
		$("#spanTlkCardNo").html(card_id);

		var acct_info = msg.acct_response.acct_info_arrays.acct_info;
		if (acct_info.length == 1) {
			$("#money1").html(acct_info[0].acct_balance);

			$("#pOpene").hide();
			$("#divOpen").hide();

			$("#money2").html("");
			$("#spanCardNo").html("");
			$("#pClose").show();
		} else {
			for (var i = 0; i < acct_info.length; i++) {
				var info = acct_info[i];
				switch (info.acct_type) {
					case 1:
						$("#money1").html(info.acct_balance);
						break;
					case 2:
						if (String(info.acct_balance) != "") {
							//银行卡号
							var card_no = String(info.card_no).replace("s", "");
							var card_no_front = card_no.substr(0, 6);
							var card_no_back = card_no.substr(card_no.length - 4, 4);
							var card_no = card_no_front + pad(card_no_back, card_no.length - 6);

							$("#pOpene").show();
							$("#divOpen").show();

							$("#money2").html(info.acct_balance);
							$("#spanCardNo").html(card_no);
							$("#pClose").hide();
						} else {
							$("#pOpene").hide();
							$("#divOpen").hide();

							$("#money2").html("");
							$("#spanCardNo").html("");
							$("#pClose").show();
						}
						break;
				}
			}
		}
	});
}

// 银行卡绑卡/解绑
function bindcard(action_type) {
	QueryString.Initial();
	var openid = QueryString.GetValue("openid");

	var card_no = $("#card_no").val();
	var area_name = $("#area_name").text();

	if (action_type == 0 && card_no == "") {
		alert("请输入银行卡号");
		return;
	}

	if (action_type == 0 && area_name == "点击此处,选择银行卡开户行所属城市") {
		alert("请选择所属城市");
		return;
	}

	if ($("#pAgreement").hasClass("icon_checked") == false) {
		alert("请同意福利宝客户协议");
		return;
	}

	var url = BINDCARD_URL;
	var param = {
		openid: openid,
		card_no: card_no,
		area_name: area_name,
		action_type: action_type
	};

	getAjax(url, param, function(msg) {
		if (msg.error_response != undefined) {
			alert(msg.error_response.sub_msg);
			return;
		}

		if (msg.bind_response.resp_code != "0000") {
			alert(msg.bind_response.resp_msg);
			return;
		}

		if (action_type == 0) {
			alert("绑卡成功");
			window.location.href = "index2.html?openid=" + openid;
		}
	});
}

// 交易查询/交易记录
function trans(trans_type, state) {
	$("#detail").html("");

	QueryString.Initial();
	var openid = QueryString.GetValue("openid");

	//	var start_dt = "20150101000000";
	//	var end_dt = "20151231235959";

	var today = new Date();
	//获取当前年日期
	var year = today.getFullYear();
	//获取当月日期
	var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
	//获取上个月日期
	var month1 = (today.getMonth()) < 10 ? '0' + (today.getMonth()) : (today.getMonth());
	//获取当前日
	var day = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());
	//获取开始时间
	var start_dt = year + "" + month1 + "01000000";
	//获取结束时间
	var end_dt = year + "" + month + "" + day + "235959";
	//var max_count = "100";
	var max_count = "all";
	var url = TRANS_URL;
	var param = {
		openid: openid,
		trans_type: trans_type,
		start_dt: start_dt,
		end_dt: end_dt,
		max_count: max_count,
		state: state
	};

	getAjax(url, param, function(msg) {
		if (msg.error_response != undefined) {
			alert(msg.error_response.sub_msg);
			return;
		}

		if (msg.trans_response.resp_code != "0000") {
			alert(msg.trans_response.resp_msg);
			return;
		}

		var html = "";
		var cxinfos = null;

		if (state == 0) {
			cxinfos = msg.trans_response.trans_cxinfo_arrays.trans_cxinfo;
		} else {
			cxinfos = msg.trans_response.trans_jlinfo_arrays.trans_jlinfo;
		}

		for (var i = 0; i < cxinfos.length; i++) {
			var cxinfo = cxinfos[i];
			var trans_time = cxinfo.trans_time;
			var trans_time_year = String(trans_time).substr(0, 4);
			var trans_time_month = String(trans_time).substr(4, 2);
			var trans_time_date = String(trans_time).substr(6, 2);
			var trans_time = trans_time_year + "-" + trans_time_month + "-" + trans_time_date;

			var trans_type = cxinfo.trans_type;
			var trans_amt = cxinfo.trans_amt;
			var trans_status = cxinfo.trans_status;

			if (state == 0) {
				var trans_source = cxinfo.trans_source;

				html += "<tr><td width=\"22%\">" + trans_time + "</td><td width=\"18%\">" + trans_source + "</td><td width=\"21%\">" + transTypeToString1(trans_type) + "</td><td width=\"18%\"><span class='orange'>" + trans_amt + "</span></td><td width=\"21%\">" + transStatusToString(trans_status) + "</td></tr>";
			} else {
				var confirm_amt = cxinfo.confirm_amt;
				var trans_fee = cxinfo.trans_fee;
				var balance = cxinfo.balance;

				html += "<tr><td width=\"22%\">" + trans_time + "</td><td width=\"18%\">" + transTypeToString2(trans_type) + "</td><td width=\"21%\"><span class='orange'>" + confirm_amt + "</span></td><td width=\"18%\">" + transStatusToString(trans_status) + "</td><td width=\"21%\">" + balance + "</td></tr>";
			}
		}
		$("#detail").html(html);
	});
}


//交易查询/交易记录(分页)
function transPage(trans_type, state, currentPage, everyCount, flag) {

	QueryString.Initial();
	var openid = QueryString.GetValue("openid");

	var url = TRANS_URL;
	var param = {
		openid: openid,
		trans_type: trans_type,
		state: state,
		current_page: currentPage,
		every_count: everyCount
	};

	getAjax(url, param, function(msg) {
		if (msg.error_response != undefined) {
			alert(msg.error_response.sub_msg);
			return;
		}

		if (msg.trans_response.resp_code != "0000") {
			alert(msg.trans_response.resp_msg);
			return;
		}

		var html = "";
		var cxinfos = null;
		var cxarrays = null;
		if (state == 0) { //交易查询
			cxarrays = msg.trans_response.trans_cxinfo_arrays;
			if (cxarrays != undefined) {
				cxinfos = cxarrays.trans_cxinfo;
			}
		} else { //交易记录
			cxarrays = msg.trans_response.trans_jlinfo_arrays;
			if (cxarrays != undefined) {
				cxinfos = cxarrays.trans_jlinfo;
			}
		}

		//判断是否有记录
		if (cxarrays != undefined) {
			for (var i = 0; i < cxinfos.length; i++) {
				var cxinfo = cxinfos[i];
				var trans_time = cxinfo.trans_time;
				var trans_time_year = String(trans_time).substr(0, 4);
				var trans_time_month = String(trans_time).substr(4, 2);
				var trans_time_date = String(trans_time).substr(6, 2);
				var trans_time = trans_time_year + "-" + trans_time_month + "-" + trans_time_date;

				var trans_type = cxinfo.trans_type;
				var trans_amt = cxinfo.trans_amt;
				var trans_status = cxinfo.trans_status;

				if (state == 0) {
					var trans_source = cxinfo.trans_source;

					html += "<tr><td width=\"22%\">" + trans_time + "</td><td width=\"22%\">" + trans_source + "</td><td width=\"22%\">" + transTypeToString1(trans_type) + "</td><td width=\"18%\"><span class='orange'>" + trans_amt + "</span></td><td width=\"16%\">" + transStatusToString(trans_status) + "</td></tr>";
				} else {
					var confirm_amt = cxinfo.confirm_amt;
					var trans_fee = cxinfo.trans_fee;
					var balance = cxinfo.balance;

					html += "<tr><td width=\"22%\">" + trans_time + "</td><td width=\"18%\">" + transTypeToString2(trans_type) + "</td><td width=\"21%\"><span class='orange'>" + confirm_amt + "</span></td><td width=\"18%\">" + transStatusToString(trans_status) + "</td><td width=\"21%\">" + balance + "</td></tr>";
				}
			}

			if (flag != 1) { //除了上拉,其他的都先清除
				$("#detail").html("");
			}
			$("#detail").append(html);
		} else {
			pullUpEl = document.getElementById('pullUp');
			pullUpEl.className = '';
			pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多记录了';
			this.maxScrollY = pullUpOffset;
		}

	});

	$("#transType").val(trans_type);
	$("#transState").val(state);
}



// 首页（未开户）
function hisyield() {
	var count = "1";

	var url = HISYIELD_URL;
	var param = {
		count: count
	};

	getAjax(url, param, function(msg) {
		if (msg.error_response != undefined) {
			alert(msg.error_response.sub_msg);
			return;
		}

		if (msg.his_yield_response.resp_code != "0000") {
			alert(msg.his_yield_response.resp_msg);
			return;
		}

		$("#annualized_rate").html(forDight(msg.his_yield_response.annualized_rate, 2) + "%");
	});
}

// 首页（已开户）
function openacct() {
	QueryString.Initial();
	var openid = QueryString.GetValue("openid");

	var url = OPENACCT_URL;
	var param = {
		openid: openid
	};

	getAjax(url, param, function(msg) {
		if (msg.error_response != undefined) {
			alert(msg.error_response.sub_msg);
			return;
		}

		if (msg.open_acct_response.resp_code != "0000") {
			alert(msg.open_acct_response.resp_msg);
			return;
		}

		$("#yesterday_income").html(forDight(msg.open_acct_response.open_acct.yesterday_income, 2));
		$("#welfare_balance").html(forDight(msg.open_acct_response.open_acct.welfare_balance, 2));
		$("#annualized_rate").html(forDight(msg.open_acct_response.open_acct.annualized_rate, 2) + "%");
		$("#total_income").html(forDight(msg.open_acct_response.open_acct.total_income, 2));
	});
}

// 存入
function gotoIn() {
	window.location.href = GETOPENID_URL + "?module=TRANSIN";
	//	QueryString.Initial();
	//	var openid = QueryString.GetValue("openid");
	//
	//	var url = ACCT_URL;
	//	var param = {
	//		openid : openid
	//	};
	//
	//	getAjax(url, param, function(msg) {
	//		if (msg.error_response != undefined) {
	//			alert(msg.error_response.sub_msg);
	//			return;
	//		}
	//
	//		if (msg.acct_response.resp_code != "0000") {
	//			alert(msg.acct_response.resp_msg);
	//			return;
	//		}
	//
	//		var acct_info = msg.acct_response.acct_info_arrays.acct_info;
	//		if (acct_info.length == 1) {
	//			window.location.href = "index.html?openid=" + openid;
	//		} else {
	//			window.location.href = "transferred_to.html?openid=" + openid;
	//		}
	//	});
}

// 初始化存入
function transferredToPage() {
	$("#transin_amt").val("");

	QueryString.Initial();
	var openid = QueryString.GetValue("openid");

	var url = ACCT_URL;
	var param = {
		openid: openid
	};

	getAjax(url, param, function(msg) {
		if (msg.error_response != undefined) {
			alert(msg.error_response.sub_msg);
			return;
		}

		if (msg.acct_response.resp_code != "0000") {
			alert(msg.acct_response.resp_msg);
			window.location.href = "index.html?openid=" + openid;
		}

		$("#fee_rate").val(msg.acct_response.fee_rate);
		$("#transin_fee").html(0);

		var acct_info = msg.acct_response.acct_info_arrays.acct_info;
		for (var i = 0; i < acct_info.length; i++) {
			var info = acct_info[i];
			switch (info.acct_type) {
				case 1:
					if (String(info.acct_balance) != "") {
						$("#availtrans_amt").html(info.acct_balance + "元");
					}
					if (msg.acct_response.card_id != "") {
						$("#cardId").val(msg.acct_response.card_id); //通联卡号
					}
					break;
				case 2:
					break;
			}
		}
	});
}

// 存入金额发生变化
function inMoneyChange(e) {
	var transin_amt = e.target.value.replace(/[^\d\.]/g, "");
	if (transin_amt == "") {
		$("#transin_amt").val(transin_amt);
		return;
	}


	$("#transin_amt").val(transin_amt);
	//	var max = 500000;

	var availtrans_amt = $("#availtrans_amt").html();
	availtrans_amt = availtrans_amt.substr(0, availtrans_amt.length - 1);

	//	if (parseFloat(max) > parseFloat(availtrans_amt)) {
	//		max = availtrans_amt;
	//	}

	if (parseFloat(transin_amt) > parseFloat(availtrans_amt)) {
		transin_amt = availtrans_amt;
		//$("#transin_amt").val(forDight(max, 2));
		$("#transin_amt").val(availtrans_amt);
	}



	var transin_fee = $("#fee_rate").val();
	transin_fee = transin_fee / 100;
	transin_fee = transin_amt * transin_fee;

	$("#transin_fee").html(forDight(transin_fee, 2));
	$("#confirm_amt").html(forDight(transin_amt - transin_fee, 2));
}



// 转出
function gotoOut() {
	//	QueryString.Initial();
	//	var openid = QueryString.GetValue("openid");
	window.location.href = GETOPENID_URL + "?module=TRANSOUT";
	//	var url = ACCT_URL;
	//	var param = {
	//		openid : openid
	//	};
	//
	//	getAjax(url, param, function(msg) {
	//		if (msg.error_response != undefined) {
	//			alert(msg.error_response.sub_msg);
	//			return;
	//		}
	//
	//		if (msg.acct_response.resp_code != "0000") {
	//			alert(msg.acct_response.resp_msg);
	//			return;
	//		}
	//
	//		var acct_info = msg.acct_response.acct_info_arrays.acct_info;
	//		if (acct_info.length == 1) {
	//			window.location.href = "index.html?openid=" + openid;
	//		} else {
	//			window.location.href = "turn_out.html?openid=" + openid;
	//		}
	//	});
}

// 初始化转出
function turnOutPage() {
	$("#transout_amt").val("");

	QueryString.Initial();
	var openid = QueryString.GetValue("openid");

	var url = ACCT_URL;
	var param = {
		openid: openid
	};

	getAjax(url, param, function(msg) {
		if (msg.error_response != undefined) {
			alert(msg.error_response.sub_msg);
			return;
		}

		if (msg.acct_response.resp_code != "0000") {
			alert(msg.acct_response.resp_msg);
			return;
		}

		//转出次数
		var trans_times = msg.acct_response.trans_times;
		$("#times").html(trans_times);

		//剩余转出额度
		var surplus_amt = msg.acct_response.surplus_amt;
		$("#surplusAmt").html(surplus_amt);

		//预计到账时间
		var pMsgDate = msg.acct_response.pMsgDate;
		$("#pMsgDate").html(pMsgDate);

		//单笔最大转出额度
		var oneTimeMaxAmt = msg.acct_response.oneTimeMax_amt;
		$("#oneTimeMaxAmt").val(oneTimeMaxAmt);

		//单日最大转出额度
		var oneDayMax_amt = msg.acct_response.oneDayMax_amt;
		$("#transout_amt").attr('placeholder', '单日最多转出' + oneDayMax_amt + '元');

		var acct_info = msg.acct_response.acct_info_arrays.acct_info;
		for (var i = 0; i < acct_info.length; i++) {
			var info = acct_info[i];
			switch (info.acct_type) {
				case 1:
					break;
				case 2:
					var card_no = String(info.card_no).replace("s", "");
					card_no = card_no.substr(card_no.length - 4);

					$("#avail_amt").html(info.acct_balance + "元");
					$("#bank_name").html(info.bank_name);
					$("#card_no_show").html("尾号" + card_no);
					$("#card_no").val(String(info.card_no).replace("s", ""));
					if (msg.acct_response.card_id != "") {
						$("#cardId").val(msg.acct_response.card_id); //通联卡号
					}
					break;
			}
		}
	});
}

// 转出金额发生变化
function outMoneyChange(e) {



	var transout_amt = e.target.value.replace(/[^\d\.]/g, "");
	if (transout_amt == "") {
		$("#transout_amt").val(transout_amt);
		return;
	}

	$("#transout_amt").val(transout_amt);

	//单笔最大转出额度
	var oneTimeMaxAmt = $("#oneTimeMaxAmt").val();
	//剩余转出额度
	var max = $("#surplusAmt").html();

	var avail_amt = $("#avail_amt").html();
	avail_amt = avail_amt.substr(0, avail_amt.length - 1);

	if (parseFloat(max) > parseFloat(oneTimeMaxAmt)) {
		max = oneTimeMaxAmt;
	}

	if (parseFloat(oneTimeMaxAmt) > parseFloat(avail_amt)) {
		max = avail_amt;
	}

	if (parseFloat(transout_amt) > parseFloat(max)) {
		transout_amt = max;
		$("#transout_amt").val(max);
	}
}



// 历史收益
function hisearn() {
	QueryString.Initial();
	var openid = QueryString.GetValue("openid");

	var count = "100";

	var url = HISEARN_URL;
	var param = {
		openid: openid,
		count: count
	};
	/*
		getAjax(url, param, function(msg) {
			if (msg.error_response != undefined) {
				alert(msg.error_response.sub_msg);
				return;
			}

			if (msg.his_earn_response.resp_code != "0000") {
				alert(msg.his_earn_response.resp_msg);
				return;
			}

			var html = "";
			var cust_hisEarns = msg.his_earn_response.cust_hisEarn_arrays.cust_hisEarn;

			for (var i = 0; i < cust_hisEarns.length; i++) {
				var cust_hisEarn = cust_hisEarns[i];
				var date = cust_hisEarn.date;
				var date_year = String(date).substr(0, 4);
				var date_month = String(date).substr(4, 2);
				var date_date = String(date).substr(6, 2);
				var date = date_year + "-" + date_month + "-" + date_date;

				var amount = cust_hisEarn.amount;
				var remark = cust_hisEarn.remark;

				html += "<tr><td>" + date + "</td><td><span class='orange'>" + amount + "</span></td><td>" + remark + "</td></tr>";
			}
			$("#detail").html(html);
		});*/

	/**--
	  模拟数据 start
	*/
	var html = "";
	var cust_hisEarns = [{
			"amount": 0.51,
			"remark": "",
			"date": 20160118
		}, {
			"amount": "0.00",
			"remark": "",
			"date": 20151105
		}, {
			"amount": "0.00",
			"remark": "",
			"date": 20151102
		}, {
			"amount": "0.00",
			"remark": "",
			"date": 20151028
		}, {
			"amount": "0.00",
			"remark": "",
			"date": 20151027
		}, {
			"amount": 0.02,
			"remark": "",
			"date": 20151026
		}];

		for (var i = 0; i < cust_hisEarns.length; i++) {
			html += '<div><div class="source-timte"><p class="source">'
		}

		/**--
		  模拟数据 end
		*/
}

//移动端检查
function checkBrowser() {
	var u = navigator.userAgent.toLowerCase();
	if (u.indexOf('mobile') == -1 && u.indexOf('iphone') == -1) {
		window.location.href = "error_browser.html";
	}
}