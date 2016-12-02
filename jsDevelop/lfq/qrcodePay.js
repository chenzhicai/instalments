var zcom = require("../components/winLocation.js");
var cmodal = require("./cmodal.js");
var map = require("../components/map.js");
var searchStatusHandle;
var innerWidth = window.innerWidth > 400 ? 400 : window.innerWidth;
var latitude, longitude;
$(function() {
    zcom.checkBrowser();
    zcom.QueryString.Initial();
    payCode = zcom.QueryString.GetValue("payCode");
    open_id = zcom.QueryString.GetValue("open_id");
    card_6th = zcom.QueryString.GetValue("card_6th");
    $("section").css({
        "width": innerWidth * 0.9 + "px",
        "height": (innerWidth * 1.05 + 10) + "px"
    });
    $("#tishiRefresh").css({
        "height": (innerWidth * 1.05 - 20) + "px"
    });

    createTXcode(payCode);

    $("#container").css({
        "width": innerWidth * 1.2 + "px",
        "height": innerWidth * 1.2 + "px",
        "margin-top": (0 - innerWidth) * 0.25 + "px",
        "margin-left": (0 - innerWidth) * 0.15 + "px"
    });
    setTimeout(function() {
        updateQrCode(payCode);
        changeHistoryBack();
    }, 200);

    $("#fanhui").on('touchstart', function() {
        location.href = 'instalmentsSearch.html?openid=' + open_id;

    });
    $("#searchA").attr("href", 'instalmentsSearch.html?openid=' + open_id);

    $(".countdown-parent").css("margin-top", innerWidth * 0.65 + "px");


    $("#tishiRefresh").on("touchstart", reCreateOrder);

    searchStatusHandle = setInterval(searchOrderStatus, 3000);
    getConfig();
});

function getTXcodeOption() {
    var txOption = {
        width: 3,
        height: innerWidth * 0.3,
        format: "CODE128",
        displayValue: true,
        //        fontOptions: "bold",
        fontOptions: "",
        font: "Helvetica",
        //        fontSize: 20,
        textAlign: "center",
        textMargin: 3,
        fontSize: 30
    };
    return txOption;

}

// 创建条形码
function createTXcode(text) {
    var options = getTXcodeOption();
    var parent = $("#barcodeBoxParent");
    var barcodeBox = document.createElement("div");
    barcodeBox.className = "barcodeBox";

    var format = (typeof options !== "undefined" && options.format) || "auto";

    barcodeBox.innerHTML = '<img class="barcode"/>';

    try {
        JsBarcode(barcodeBox.querySelector('.barcode'), text, options);
    } catch (e) {
        barcodeBox.className = "errorbox";
        barcodeBox.onclick = function() {
            throw e;
        }
    }

    parent.html(barcodeBox);
}

// 更新二维码
function updateQrCode(payCode) {
    var outerSize = innerWidth * 1.2;
    var options = {
        render: "canvas",
        ecLevel: "L",
        minVersion: 3,

        fill: "#000000",
        //        background: "#ffffff",
        //fill: $('#img-photo')[0],

        text: payCode,
        size: outerSize,
        radius: 0.1,
        quiet: 1,

        mode: 4,

        mSize: 0.13,
        //        mPosX: 0.5,
        //        mPosY: 0.5,

        //        label: "tonglianzhifu",
        fontname: "Ubuntu",
        fontcolor: "#333333",
        //        src:"./images/photo.png"
        image: $('#img-photo')[0]
    };

    $('#container').empty().qrcode(options);
    var countdownValue = 120;
    var lastTime = new Date().getTime();
    var sihadle = setInterval(function() {
        var nowTime = new Date().getTime();
        var cTimes = Math.floor((nowTime - lastTime) / 1000);
        countdownValue = 120 - cTimes;
        if (countdownValue < 0) {
            countdownValue = 0;
        }
        $("#countdown").text(countdownValue);
        if (countdownValue == 0) {
            $("#tishiRefresh").show()
            clearInterval(sihadle);
            clearInterval(searchStatusHandle);
        }
    }, 1000)
}

// 刷新 重新生成该订单
function reCreateOrder() {
    var param = {
        open_id: open_id,
        serial_no: payCode,
        card_6th: card_6th,
        lat: latitude,
        lng: longitude,
        servlet_type: "recreate_order"
    };

    var url = LFQ_ORDER_CREATE_URL;
    zcom.getAjax(url, param, function(msg) {
        if (msg.error_response != undefined) {
            cmodal.showBodalBody(msg.error_response.sub_msg);
            return;
        }

        if (msg.lft_orderinfo_response.resp_code != "0000") {
            cmodal.showBodalBody(msg.lft_orderinfo_response.resp_msg);
            return;
        }

        if (msg.lft_orderinfo_response.resp_code == "0000") { //如果成功
            $("#tishiRefresh").hide()
            createTXcode(msg.lft_orderinfo_response.serial_no);
            updateQrCode(msg.lft_orderinfo_response.serial_no);
            payCode = msg.lft_orderinfo_response.serial_no;
            searchStatusHandle = setInterval(searchOrderStatus, 3000)
        } else {
            cmodal.showBodalBody(msg.lft_orderinfo_response.resp_msg);
            return;
        }
    });

}

// 每10秒查询扫码结果
function searchOrderStatus() {

    var param = {
        open_id: open_id,
        serial_no: payCode,
        nowTime: new Date().getTime()
    };
    zcom.getAjax(LFQ_QRCODEPAY_RESULT_URL, param, function(data) {
        console.log("扫码结果");
        console.dir(data);
        if (data.msg == "03") {
            $("#tishijycg").show();
        } else if (data.msg == "04") {
            cmodal.showBodalBody("此订单已退货");
        } else if (data.msg == "99") {
            $("#tishijysb").show();
        } else if (data.msg == "订单不存在") {
            $("#tishisx").show();
        }
        if (data.msg == "03" || data.msg == "04" || data.msg == "99" || data.msg == "订单不存在") {
            clearInterval(searchStatusHandle);
        }

    });
}

function changeHistoryBack() {
//    historyPushState();
    // 监听返回按钮并跳转到查询页面
    window.addEventListener("popstate", function() {
        wx.closeWindow();
        //        location.href = 'instalmentsSearch.html?openid=' + QueryString.GetValue("open_id");
    });
}


// 往浏览记录插入一条
function historyPushState() {
    history.pushState({
            title: "小通分期查询"
        },
        "小通分期查询",
        BASE_URL + "/FuLiBao/lfq/instalmentsSearch.html?openid=" + zcom.QueryString.GetValue("open_id"));
}

// 配置config
function getConfig() {
    console.log("getLocation.....");
    map.getConfig({
        mapUrl: "/lfq/qrcodePay.html" + location.search
    });
    getLocation();
}
// 配置成功获取经纬度
function getLocation() {
    wx.ready(function() {
        type:"gcj02",
        wx.getLocation({
            success: function(res) {

                console.log("getLocation data");
                console.dir(res);
                latitude = res.latitude;
                longitude = res.longitude;
                //               alert(res.latitude + " " + res.longitude);

            },
            cancel: function(res) {
                alert('用户拒绝授权获取地理位置');
            }
        });
    });
}