var zcom = require("./zeptoCommon.js");
var PayBox = require('./pwdKeyBoard.js');
require('./iscrollAssist.js');
//当前动作状态(下拉:0,上拉:1,不动:2),默认为不动
var flag = 2;
var min_cnt = 0;
var max_cnt = 10;
var openid = "";
var serial_no = '';
$(function() {
    QueryString.Initial();
    openid = QueryString.GetValue("openid");
    var data = refreshRecord();
    iscrollObj = iscrollAssist.newVerScrollForPull($("#wrapper"), pullDownAction, pullUpAction);
    iscrollObj.refresh();
    initOneRcordReallyClick();
    PayBox.init("", PayBoxCallbackFunc);

});

function refreshRecord(argument) {
    if (openid == '' || openid == undefined) {
        return;
    }
    getData();
}

// 发送同步请求数据  (模拟数据)
function getData() {
    var data = [];
    var param = {
        open_id: openid,
        min_count: min_cnt,
        max_count: max_cnt,
        servlet_type: "query_order"
    };

    var url = LFQ_ORDER_CREATE_URL;

    zcom.getAjax(url, param, function(msg) {
        if (msg.error_response != undefined) {
            alert(msg.error_response.sub_msg);
            return;
        }
        if (msg.lft_orderinfo_response.resp_code != "0000") {
            alert(msg.bind_response.resp_msg);
            return;
        } else {
            data = msg.lft_orderinfo_response.lfqorderInfo_arrays.lfqorderInfo;
            callbackFunc(data);
        }

    });

    return data;
}

// 信用卡输入后六后回调函数
function PayBoxCallbackFunc(PayBoxPassword) {
    //fkmdata 跳转到付款码参数
    reCreateOrder(openid,serial_no,PayBoxPassword);
}

// 请求数据后回调
function callbackFunc(data) {
    if (data == "" || data == undefined || data.length == 0) {
        if (min_cnt > 0) {
            min_cnt -= 10;
            max_cnt -= 10;
        }
        return;
    }
    var pjHtml = pinjieHtml(data);
    if (flag != 1) { //除了上拉,其他的都先清除
        $("#detail").html("");
    }
    $("#detail").html(pjHtml);
}

// 拼接HTML
function pinjieHtml(data) {
    var pjHtml = '';
    for (var i = 0, l = data.length; i < l; i++) {
        var orderState = changeOrderState(data[i].order_state);
        var thetime = changeTimeFormat(data[i].apply_date +"" + data[i].apply_time);
        pjHtml += '<div class="oneRcord" data-type="' + orderState.iconClass + '"serial_no="' + data[i].serial_no +
            '"><div class="w1"><div class="type-name">' + orderState.name +
            '</div><div class="time-small">' + thetime + '</div></div>' +
            '<div class="w2"><div class="number-big">' + data[i].stage_amt +
            '</div><div class="stage-box"><span>' + data[i].out_stage_count +
            '</span>/<span>' + data[i].total_stage_count + '</div></div>' +
            '<div class="w3"><span class="fukuan_icon ' + orderState.iconClass + '"></span></div></div>';
    }

    return pjHtml;
}

function changeOrderState(orderState) {
    //订单状态，01待消费,02分期待确认收货,03分期已确认收货,04已退货，99被拒绝状态
    var stateObject = {};
    if (orderState = "01") {
        stateObject.iconClass = 'unpaid';
        stateObject.name = "待消费";
    } else if (orderState == "02" || orderState == "03") {
        stateObject.iconClass = 'succeed';
        stateObject.name = "分期成功";
    } else if (orderState == '04') {
        stateObject.iconClass = 'failed';
        stateObject.name = "已退货";
    } else if (orderState == "99") {
        stateObject.iconClass = 'failed';
        stateObject.name = "分期失败";
    }

    return stateObject;
}


function initOneRcordReallyClick() {
    zcom.registerReallyClick($("#detail"));
    $("#detail").on("reallyClick", function(e, $target) {
    	serial_no = $target.parent().parent().attr("serial_no");
        if ($target.parent().hasClass("w1") || $target.parent().hasClass("w2")) {
            linkOrderDetails(serial_no);
        } else if ($target.parent().hasClass("w3")) {
            PayBox.restPwd();
            PayBox.show();
        }
    });
}
// 点击订单记录时跳转到订单详情  initOneRcordEvent
function linkOrderDetails() {
    // 拼接html应该把订单信息写在对应的 div.oneRcord data-ddKey="" 作为跳转用
    location.href = "./orderDetails.html?open_id="+openid+"&serial_no="+serial_no; //把订单Id作为参数 请求订单详情用
}

//重新生成该订单
function   reCreateOrder( openid,serial_no,card_6_th){
	var param = {
			open_id   : openid,
			serial_no : serial_no ,
			card_6th  : card_6_th ,
			servlet_type : "recreate_order"
			};
	
	var url=LFQ_ORDER_CREATE_URL; 
	  zcom.getAjax(url, param, function(msg) {	  		  
	      if (msg.error_response != undefined) {
				alert(msg.error_response.sub_msg);
				return;
	       }

	       if (msg.lft_orderinfo_response.resp_code != "0000") {
				alert(msg.lft_orderinfo_response.resp_msg);
				return;
			}
		  
			if(retn.lft_orderinfo_response.resp_code=="0000"){  //如果成功 
				reserial_no=retn.serial_no;
				 window.location.href = "qrcodePay.html?payCode=" + retn.serial_no;
			 }else {
				 alert(msg.lft_orderinfo_response.resp_msg);
					return;
			 }
	  }); 
	
}
//查询单独的订单

function   doQuerySingle(openid,serial_no){
	var param = {
			open_id   : openid,
			serial_no : serial_no ,
			servlet_type : "query_orderByOrderId"
			};
	
	var url=LFQ_ORDER_QUERY_URL; 
	  zcom.getAjax(url, param, function(msg) {	  		  
	      if (msg.error_response != undefined) {
				alert(msg.error_response.sub_msg);
				return;
	       }

	       if (msg.lft_orderinfo_response.resp_code != "0000") {
				alert(msg.bind_response.resp_msg);
				return;
			}
		  
			if(retn.lft_orderinfo_response.resp_code=="0000"){  //如果成功 
				reserial_no=retn.serial_no;
			 }
	  }); 
}


/**
 * 下拉刷新
 */
function pullDownAction() {
    flag = 0;
    setTimeout(function() {
        this.refresh();
        min_cnt = 0;
        max_cnt = 10;
        refreshRecord();
    }.bind(this), 1000);
}

/*上拉加载更多*/
function pullUpAction() {
    setTimeout(function() {
        flag = 1;
        this.refresh();
        min_cnt += 10;
        max_cnt += 10;
        refreshRecord();
    }.bind(this), 1000);
}

// 转换时间格式 为2016-04-05 09:26:26
function changeTimeFormat(cxinfo_trans_time) {
    var trans_time = String(cxinfo_trans_time);
    trans_time_year = trans_time.substr(0, 4),
        trans_time_month = trans_time.substr(4, 2),
        trans_time_date = trans_time.substr(6, 2),
        trans_time_hour = trans_time.substr(8, 2),
        trans_time_minutes = trans_time.substr(10, 2);
    //       trans_time_seconds = trans_time.substr(12, 2);
    var trans_time = trans_time_year + "-" + trans_time_month + "-" + trans_time_date + " " + trans_time_hour + ":" + trans_time_minutes;
    return trans_time;
}