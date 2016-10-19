var zcom = require("./zeptoCommon.js");
$(function() {
    init();
    doQuerySingle();
});

function init() {
    zcom.checkBrowser();
    QueryString.Initial();
    var rootHeight = ($("body")[0].scrollHeight - 44) + "px";
    $("#root").css("height", rootHeight);
    $("#fanhui").on('touchstart', function() {
        location.href = 'instalmentsSearch.html?openid=' + QueryString.GetValue("open_id");

    });
}
//  取数据
/*function getData() {
    //模拟订单详情数据
    var msg = {
        "lft_orderinfo_response": {
            "res_timestamp": 20160504180911,
            "res_sign": "941A51C35294087FD0C5B929B6A78B5F",
            "resp_msg": "查询成功",
            "resp_code": "0000",
            "lfqRepayNotices_arrays": {
                "lfqRepayNotices": [{
                    "stageCount": 1,
                    "instalmentTime": 20160427091212,
                    "respcode": "0003",
                    "instalmentTimeString": 20160427091212,
                    "noticeCount": 0,
                    "respmsg": "好的1",
                    "nextAcctDate": 20160507,
                    "transAmt": 101,
                    "respState": "01",
                    "contractsNo": 2016050417070001
                }, {
                    "stageCount": 2,
                    "instalmentTime": 20160427091612,
                    "respcode": "0003",  
                    "instalmentTimeString": 20160427091612,
                    "noticeCount": 0,
                    "respmsg": "好的2",
                    "nextAcctDate": 20160504,
                    "transAmt": 102,
                    "respState": "01",
                    "contractsNo": 2016050417070001
                }, {
                    "stageCount": 3,
                    "instalmentTime": 20160427091912,
                    "respcode": "0003",
                    "instalmentTimeString": 20160427091912,
                    "noticeCount": 0,
                    "respmsg": "好的3",
                    "nextAcctDate": 20160506,
                    "transAmt": 103,
                    "respState": "01",
                    "contractsNo": 2016050417070001
                }]
            },
            "serial_no": "011462331235479859",
            "lfqorderInfo_arrays": {
                "lfqorderInfo": [{
                    "apply_time": 104726,
                    "out_stage_count": 0,
                    "open_id": "oUhu9uI4SJHJQvl27oQc_NqsoRz4",
                    "order_state": "01",
                    "stage_count": 0,
                    "order_id": "011462330046796069017",
                    "total_stage_count": 6,
                    "credit_card_no": 11111111111111,
                    "serial_no": "011462331235479859",
                    "cust_name": "程序员",
                    "contracts_no": 2016050417070001,
                    "apply_date": 20160504,
                    "serial_no_time": 20160504110715,
                    "stage_amt": 600.0
                }]
            }
        }
    };

    setOrder(msg.lft_orderinfo_response.lfqorderInfo_arrays.lfqorderInfo[0]);

    // 每期出账记录数据模拟
    if (msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices && msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices != "") {
        showRecord(msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices);
    }

}
*/
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
    zcom.getAjax(url, param, function(msg) {
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
            if (msg.lft_orderinfo_response.lfqRepayNotices_arrays && msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices && msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices != "") {
                showRecord(msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices);
            }
        }
    });



}


// 取得订单信息后 设置订单信息
function setOrder(orderDate) {
    $("#order-id").text(orderDate.order_id); //订单ID
    setContractHref(orderDate);
    showContract(orderDate.order_state);
    var stateText = changeStateToText(orderDate.order_state);
    $("#order-state").text(stateText); //分期状态
//    $("#instalments-num").text(parseFloat(orderDate.stage_amt).toFixed(2) + "元"); //分期总金额
    $("#instalments-date").text(changeTimeFormat(orderDate.serial_no_time)); //订单时间
    $("#card-number").text(orderDate.credit_card_no); //信用卡号
    $("#merchant-name").text(orderDate.tl_mer_name); //消费商户
    $("#stage-number").text(orderDate.total_stage_count + "期"); //总期数
    $("#paied-number").text(orderDate.out_stage_count + "期"); //已出账期数
    $("#card_fee").text(parseFloat(orderDate.card_fee).toFixed(2) + "元");   // 分期手续费
    $("#goods_amount").text(parseFloat(orderDate.goods_amount).toFixed(2) + "元");   // 商品金额
    document.title = decodeURI(orderDate.lfq_mer_name);
}

// 显示分期记录
function showRecord(recordData) {
    var npayHtml = nextPayDataHtml(recordData[recordData.length - 1].nextAcctDate);
    var recordHtml = '<div class="module-title"><span>分期出款记录</span>' + npayHtml + '</div>';
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
            zt + '">' + recordData[i].respmsg + '</span></p>';
        if (recordData[i].respcode == "0003") {
            recordHtml += '<p><span>电话：</span><span class="failed">4008-844-833</span></p>';
        }
        recordHtml += '</div>';
    };

    $("#record-box").html(recordHtml);
}

// 如果有下期还款日 显示下期还款日
function nextPayDataHtml(nextPayDate) {
    var nextHtml = "";
    if (nextPayDate != "" && nextPayDate != undefined && nextPayDate != "null") {
        nextPayDate = nextPayDate.toString();
        var nextPayDateStr = nextPayDate.substr(0, 4) + '-' + nextPayDate.substr(4, 2) + '-' + nextPayDate.substr(6, 2);
        nextHtml = '<div class = "float-r nextData-box">预计下期出账日：<span id = "next-date">' +
            nextPayDateStr + '</span></div>'
    }

    return nextHtml;
}


function changeStateToText(orderState) {

    //订单状态，01待消费,02分期待确认收货,03分期成功,04已退货，99被拒绝状态
    var stateObject = {};
    var stateText = "";
    if (orderState == "01") {
        stateText = "待消费";
    } else if (orderState == "02") {
        stateText = "待确认收货";
    } else if (orderState == "03") {
        stateText = "分期成功";
    } else if (orderState == '04') {
        stateText = "已退货";
    } else if (orderState == "99") {
        stateText = "分期失败";
    }

    return stateText;
}

// 显示或隐藏合同链接
function showContract(orderState) {
    if (orderState == "02" || orderState == "03") {
        $("#contract").show();
    }
}
// 设置合同链接
function setContractHref(orderDate) {
    var theHref = "contract.html?htId=" + orderDate.contracts_no + "&order_id=" + orderDate.order_id + "&serial_no=" + orderDate.serial_no + "&tl_mer_name=" +
        orderDate.tl_mer_name + "&user_name=" + orderDate.cust_name + "&user_no=" + orderDate.id_no.replace("s", "") + "&user_phone=" +
        orderDate.hp_no + "&ty_name=" + orderDate.lfq_mer_name + "&instalmentNum=" + orderDate.stage_amt + "&stageNumber=" +
        orderDate.total_stage_count + "&trans_date=" + orderDate.trans_date + "&open_id=" + QueryString.GetValue("open_id") + "&lastPage=orderDetails";
    $("#contract").attr("href", encodeURI(theHref));
}

function changeRespcode(respcode) { //0001:成功 0002：提前还款 0003：异常
    var zt = "succeed";
    if (respcode == "0003") {
        zt = "failed";
    } else if (respcode == "0002") {
        zt = "advance";
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
    trans_time_seconds = trans_time.substr(12, 2);
    var trans_time = trans_time_year + "-" + trans_time_month + "-" + trans_time_date + " " + trans_time_hour + ":" + trans_time_minutes + ":" + trans_time_seconds;
    return trans_time;
}

function changeRecordStateToText(state) {
    var stateText = "已记录当月信用卡账单。";
    if (state == "failed") {
        stateText = "记账失败，请速联系乐分期。";
    }

    return stateText;
}