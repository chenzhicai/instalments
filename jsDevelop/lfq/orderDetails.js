$(function() {
    init();
    getData();
});
 
function init() {
    var rootHeight = ($("body")[0].scrollHeight - 44) + "px";
    $("#root").css("height", rootHeight);
}
//  取数据
function getData() {
    //模拟订单详情数据
    var data = {
        "lft_orderinfo_response": {
            "res_timestamp": 20160504112459,
            "res_sign": "E0EED619710F0CB0A7F883394C0F3604",
            "resp_msg": "查询成功",
            "resp_code": "0000",

            "lfqRepayNotices_arrays": {
                "lfqRepayNotices": [{
                    "stageCount": 6,
                    "instalmentTime": 20160427091212,
                    "respcode": "0003",
                    "instalmentTimeString": 20160427091212,
                    "noticeCount": 0,
                    "respmsg": "好的",
                    "transAmt": 100,
                    "respState": "01",
                    "contractsNo": 1231231231223
                }, {
                    "stageCount": 6,
                    "instalmentTime": 20160427091212,
                    "respcode": "0003",
                    "instalmentTimeString": 20160427091212,
                    "noticeCount": 0,
                    "respmsg": "好的",
                    "transAmt": 100,
                    "respState": "01",
                    "contractsNo": 1231231231223
                }]
            },
            "serial_no": "011462327882108040",

            "lfqorderInfo_arrays": {
                "lfqorderInfo": [{
                    "cust_name": "测试",
                    "apply_time": 152044,
                    "out_stage_count": 0,
                    "order_state": "01",
                    "open_id": "oUhu9uNU4ZlL7F-GAwt_uP6gwy30",
                    "apply_date": 20160503,
                    "stage_count": 0,
                    "order_id": "011462260044210329006",
                    "total_stage_count": 12,
                    "serial_no_time": 20160504101122,
                    "serial_no": "011462327882108040",
                    "stage_amt": 600.0
                }]
            }
        }
    };

    setOrder(data.lft_orderinfo_response.lfqorderInfo_arrays.lfqorderInfo[0]);

    // 每期出账记录数据模拟
    var data2 = {
        recordData: [{
            qs: "2016-01",
            zt: "succeed"
        }, {
            qs: "2016-02",
            zt: "succeed"
        }, {
            qs: "2016-03",
            zt: "failed"
        }],
        nextPayDate: "2016-04-15"
    }

    if (data2.recordData) {
        showRecord(data2.recordData, data2.nextPayDate);
    }

}

function doQuerySingle(openid, serial_no) {
    var param = {
        open_id: openid,
        serial_no: serial_no,
        servlet_type: "query_orderByOrderId"
    };

    var url = LFQ_ORDER_CREATE_URL;
    getAjax(url, param, function(msg) {
        if (msg.error_response != undefined) {
            alert(msg.error_response.sub_msg);
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
            if (msg.lft_orderinfo_response.lfqorderInfo_arrays.lfqRepayNotices && msg.lft_orderinfo_response.lfqorderInfo_arrays.lfqRepayNotices != "") {

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
function showRecord(recordData, nextPayDate) {
    var recordHtml = '<div class="module-title"><span>分期出款记录</span><div class = "float-r nextData-box">预计下期出账日：<span id = "next-date">' +
        nextPayDate + '</span></div></div>';
    for (var i = recordData.length - 1; i >= 0; i--) {
        var stateText = changeRecordStateToText(recordData[i].zt);
        recordHtml += '<div class="oneRecord-box"><i class="';
        if (i == recordData.length - 1 || i == 0) {
            recordHtml += 'icon-circle';
        } else {
            recordHtml += 'icon-circle2';
        }
        recordHtml += '"></i><p class="recordDate-box"><span>期数：</span><span>' +
            recordData[i].qs + '</span></p><p><span>状态：</span><span class="' +
            recordData[i].zt + '">' + stateText + '</span></p></div>';
    };

    $("#record-box").html(recordHtml);
}


function changeStateToText(state) {

    //订单状态，01待消费,02分期待确认收货,03分期已确认收货,04已退货，99被拒绝状态
    var stateObject = {};
    var stateText = "";
    if (orderState = "01") {
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