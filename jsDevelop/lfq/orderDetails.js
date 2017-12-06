var zcom = require("./zeptoCommon.js");
var num = require("../components/number.js");
var openid,serial_no;
$(function() {
    init();
    doQuerySingle();
});

function init() {
    zcom.checkBrowser();
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 通过下面这个API隐藏右上角按钮
//        WeixinJSBridge.call('hideOptionMenu');  // 不支持这种用法了
        wx.hideAllNonBaseMenuItem();
    });
    QueryString.Initial();
    var rootHeight = ($("body")[0].scrollHeight - 44) + "px";
    $("#root").css("height", rootHeight);
    $("#fanhui").on('touchstart', function() {
        location.href = '../bjhf/instalmentSearch.html?openid=' + QueryString.GetValue("open_id");

    });
}
//  取数据

function doQuerySingle() {
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
                var lfqorderInfo = msg.lft_orderinfo_response.lfqorderInfo_arrays.lfqorderInfo[0];
                var orderState = lfqorderInfo.order_state;
                if(orderState == "04" || orderState == "05"){ // 已撤销和已退货 出账期数改为0
                    lfqorderInfo.out_stage_count = "0";
                    delete msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices;
                }
                setOrder(lfqorderInfo);
            }
//          if (msg.lft_orderinfo_response.lfqRepayNotices_arrays && msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices && msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices != "") {
//              showRecord(msg.lft_orderinfo_response.lfqRepayNotices_arrays.lfqRepayNotices);
//          }
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
    if(orderDate.order_state == '99' && orderDate.nt && orderDate.nt.split(":")[1]){
        $("#fail-details").text(orderDate.nt.split(":")[1].replace("，交易失败","")) 
    } else {
        $("#fail_details-box").hide()
    }
    
    //    $("#instalments-num").text(parseFloat(orderDate.stage_amt).toFixed(2) + "元"); //分期总金额
    $("#instalments-date").text(changeTimeFormat(orderDate.serial_no_time)); //订单时间
    $("#card-number").text(orderDate.credit_card_no); //信用卡号
    if (orderDate.t_mer_name) {
        $("#merchant-name").text(orderDate.t_mer_name); //消费商户 
    } else {
        $("#merchant-name").text(orderDate.tl_mer_name); //消费商户
    }

    $("#stage-number").text(orderDate.total_stage_count + "期"); //总期数
    $("#paied-number").text(orderDate.out_stage_count + "期"); //已出账期数
    
    $("#goods_amount").text(parseFloat(orderDate.goods_amount).toFixed(2) + "元"); // 商品金额
    var mqFee = alculationRcate(orderDate.stage_amt,orderDate.goods_amount,orderDate.total_stage_count);
    $("#card_fee").text(mqFee + "元"); // 分期手续费
    if (orderDate.t_mer_name) {
        document.title = decodeURI(orderDate.t_mer_name);
    }

}

// 计算每期费率
function alculationRcate(contentMonet, applyNum, stageNumber) {
    var eachMoney = num.hold2bit(parseFloat(contentMonet) / parseInt(stageNumber));
    var eachPrincipal = num.hold2bit(parseFloat(applyNum) / parseInt(stageNumber));
    var eachFeeNum = (parseFloat(eachMoney) - parseFloat(eachPrincipal)).toFixed(2);

    return eachFeeNum;
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
    } else if (orderState == '05') {
        stateText = "已撤销";
    }  else if (orderState == "99") {
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
    var eachFeeNum = alculationRcate(orderDate.stage_amt,orderDate.goods_amount,orderDate.total_stage_count);
    var mer_name = orderDate.t_mer_name ? orderDate.t_mer_name : orderDate.lfq_mer_name;
    var theHref = "contract.html?htId=" + orderDate.contracts_no + "&order_id=" + orderDate.order_id + "&serial_no=" + orderDate.serial_no + "&tl_mer_name=" +
        orderDate.tl_mer_name + "&user_name=" + orderDate.cust_name + "&user_no=" + orderDate.id_no.replace("s", "") + "&user_phone=" +
        orderDate.hp_no + "&ty_name=" + mer_name + "&instalmentNum=" + orderDate.stage_amt + "&stageNumber=" +
        orderDate.total_stage_count + "&trans_date=" + orderDate.trans_date + "&open_id=" + QueryString.GetValue("open_id") + "&lastPage=orderDetails"+"&card_fee="+eachFeeNum;
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