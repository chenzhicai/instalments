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
            "res_timestamp": 20160425100505,
            "res_sign": "46FDE86A894DD752EDDE8934518F5C19",
            "resp_msg": "完成成功 ",
            "resp_code": "0000",
            "lfqorderInfo_arrays": {
                "lfqorderInfo": [{
                    "apply_time": "090221",
                    "out_stage_count": 0,
                    "open_id": "oUhu9uC7pg6EEAgDAGkiFAXKZErw",
                    "order_state": "01",
                    "stage_count": 0,
                    "order_id": "011461546141355270407",
                    "total_stage_count": -1,
                    "credit_card_no": 234092988091824,
                    "serial_no": "011461546141357878",
                    "cust_name": "胡国荣",
                    "cvn2": 213,
                    "apply_date": 20160425,
                    "serial_no_time": 20160425090221,
                    "stage_amt": 10000.0,
                    "id_no": 320922198510165410
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

    /*  正式代码
        getAjax(url, param, function(data) {
            // 验证一些请求是否成功
            if(data.lft_orderinfo_response && data.lft_orderinfo_response.lfqorderInfo_arrays.lfqorderInfo){
               setOrder(data.lft_orderinfo_response.lfqorderInfo_arrays.lfqorderInfo[0]);
           }else{
                console.log("没有查询结果集");
           }
            
        });*/
    

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