$(function() {
    init();
    doQuerySingle();
});

function init() {
    var rootHeight = ($("body")[0].scrollHeight - 44) + "px";
    $("#root").css("height", rootHeight);
}
//  取数据
function doQuerySingle(openid, serial_no) {
    QueryString.Initial();
    openid = QueryString.GetValue("open_id");
    serial_no = QueryString.GetValue("serial_no");
    var param = {
        open_id: openid,
        serial_no: serial_no,
        servlet_type: "query_orderByOrderId"
    };

    var url = LFQ_ORDER_CREATE_URL;
    getAjax(url, param, function(msg) {
        if (msg.error_response != undefined) {
            console.log("接口返回数据错误,让后台接口开发查找问题。");
            throw new Error("接口返回数据错误");
            return;
        }

        if (msg.lft_orderinfo_response.resp_code != "0000") {
            alert(msg.bind_response.resp_msg);
            return;
        }

        if (msg.lft_orderinfo_response.resp_code == "0000") { //如果成功 
            reserial_no = msg.serial_no;
            if (msg.lft_orderinfo_response.lfqorderInfo_arrays.lfqorderInfo) {
                setOrder(msg.lft_orderinfo_response.lfqorderInfo_arrays.lfqorderInfo[0]);
            }
            if (msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices && msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices != "") {
                showRecord(msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices);
            }
        }
    });



}


// 取得订单信息后 设置订单信息
function setOrder(orderDate) {
    $("#order-id").text(orderDate.order_id); //订单ID
    var stateText = changeStateToText(orderDate.order_state);
    $("#order-state").text(stateText); //分期状态
    $("#instalments-num").text(orderDate.stage_amt); //分期总金额
    $("#instalments-date").text(changeTimeFormat(orderDate.serial_no_time)); //订单时间
    $("#card-number").text(orderDate.credit_card_no); //信用卡号
    $("#merchant-name").text(orderDate.cust_name); //消费商户
    $("#stage-number").text(orderDate.total_stage_count + "期"); //总期数
    $("#paied-number").text(orderDate.out_stage_count + "期"); //已出账期数
}

// 显示分期记录
function showRecord(recordData) {
    var nextPayDate = recordData[recordData.length - 1].nextAcctDate.toString();
    var nextPayDate = nextPayDate.substr(0, 4) + '-' + nextPayDate.substr(4, 2) + '-' + nextPayDate.substr(6, 2);
    var recordHtml = '<div class="module-title"><span>分期出款记录</span><div class = "float-r nextData-box">预计下期出账日：<span id = "next-date">' +
        nextPayDate + '</span></div></div>';
    for (var i = recordData.length - 1; i >= 0; i--) {
        var stateText = changeRecordStateToText(recordData[i].zt);
        var zt = changeRespcode(recordData[i].respcode);
        recordHtml += '<div class="oneRecord-box"><i class="';
        if (i == recordData.length - 1 || i == 0) {
            recordHtml += 'icon-circle';
        } else {
            recordHtml += 'icon-circle2';
        }
        recordHtml += '"></i><p class="recordDate-box"><span>期数：</span><span>' +
            recordData[i].stageCount + '</span></p><p><span>状态：</span><span class="' +
            zt + '">' + recordData[i].respmsg + '</span></p></div>';
    };

    $("#record-box").html(recordHtml);
}


function changeStateToText(state) {

    //订单状态，01待消费,02分期待确认收货,03分期已确认收货,04已退货，99被拒绝状态
    var stateObject = {};
    var stateText = "";
    if (orderState == "01") {
        stateText = "待消费";
    } else if (orderState == "02") {
        stateText = "待确认收货";
    } else if (orderState == "03") {
        stateText = "已确认收货";
    } else if (orderState == '04') {
        stateText = "已退货";
    } else if (orderState == "99") {
        stateText = "分期失败";
    }

    return stateText;
}

function changeRespcode(respcode) { //01:成功 02：失败 03：异常
    var zt = "succeed";
    if (respcode ==  "0003") {
        zt = "failed";
    }
    return zt;
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

function changeRecordStateToText(state) {
    var stateText = "已记录当月信用卡账单。";
    if (state == "failed") {
        stateText = "记账失败，请速联系乐分期。";
    }

    return stateText;
}