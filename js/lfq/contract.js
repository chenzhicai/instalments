var QueryString = {
    data: {},
    Initial: function() {
        var aPairs, aTmp;
        var queryString = new String(decodeURI(window.location.search));
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

$(function() {
    //    $("#contractBox").css("height", window.innerHeight - 44 + "px");   
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 通过下面这个API隐藏右上角按钮
        wx.hideOptionMenu();
    });
    $("#wrapper").css("height", window.innerHeight - 44 + "px");
    QueryString.Initial();
    if (QueryString.GetValue("lastPage") == "orderDetails") {
        setInfo();
    }

        $(".check_label").on("touchstart", function() {
            if ($("#agreeInput").attr("checked")) {
                $("#agreeInput").removeAttr("checked");
            } else {
                $("#agreeInput").attr("checked", true);
            }
            setAgreeDate()
        });
    setUpImgPosition();
    $("#wrapper").on("touchmove", showUpimge);
    $("#upImg").on("touchstart", toTop);
    $("#fanhui").on("touchend",fanhuiClick);
    theIScroll = new IScroll("#wrapper");
    setAgreeDate()
});

// 设置数字每3位加，
function formatNum(str) {
    var newStr = "";
    var count = 0;

    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ".00"; //自动补小数点后两位
        console.log(str)

    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        console.log(str)
    }
    return str;
}

// 填写合同内容
function setInfo() {
    console.log(QueryString.GetValue("htId"));
    var keyArray = ["htId", "order_id", "user_name", "user_phone", "ty_name", "stageNumber","card_fee"]
    for (var i = 0, l = keyArray.length; i < l; i++) {
        var key = keyArray[i];
        if (QueryString.GetValue(key)) { 
            $("#" + key).text(QueryString.GetValue(key));
        }
    }
    $("#firstPayNumber").text(setAverageNumber(QueryString.GetValue("instalmentNum"),QueryString.GetValue("stageNumber")));
    $("#averageNumber").text(setAverageNumber(QueryString.GetValue("instalmentNum"),QueryString.GetValue("stageNumber")));
    if (QueryString.GetValue("user_no")) {
        $("#user_no").text(QueryString.GetValue("user_no").toUpperCase());
    }

    if (QueryString.GetValue("instalmentNum")) {
        $("#instalmentNum").text(formatNum(QueryString.GetValue("instalmentNum")));
    }

    if (QueryString.GetValue("htId")) {
        $("#agreeInput").attr("checked", true);
        setAgreeDate(QueryString.GetValue("trans_date"));
    }
}
//   设置每期支付金额
function setAverageNumber(instalmentNum,stageNumber){
    return instalmentNum?(instalmentNum/stageNumber).toFixed(2):'';
}
//  设置分期交易时间
function setAgreeDate() {
    if ($("#agreeInput").attr("checked")) {
        var theDate = new Date();
        var agreeMonth = theDate.getMonth()+1>9?theDate.getMonth()+1:'0'+(theDate.getMonth()+1)
        var agreeDate = theDate.getDate()
        $("#agreeYear").text(theDate.getFullYear());
        $("#agreeMonth").text(agreeMonth);
        $("#agreeDate").text(agreeDate);
    } else {
        $("#agreeYear").text(" ");
        $("#agreeMonth").text(" ");
        $("#agreeDate").text(" ");
    }
}



/* 设置回到头部图标位置 */
function setUpImgPosition() {
    var ptop = (parseInt($("#wrapper").css("height")) - 40) + "px";
    $("#upImg").css({
        "top": ptop,
        "right": "15px"
    });
}

function showUpimge() {
    if (theIScroll.y > -30) {
        $("#upImg").hide();
    } else {
        $("#upImg").show();
    }
}

function toTop() {
    theIScroll.scrollTo(0, 0);
}

// 设置返回事件
function fanhuiClick() {
    if (QueryString.GetValue("lastPage") == "orderDetails") {
        location.href = "orderDetails.html?open_id=" + QueryString.GetValue("open_id") + "&serial_no=" + QueryString.GetValue("serial_no");
    } else {
        location.href = "applyInstalment.html" + location.search;
    }
}