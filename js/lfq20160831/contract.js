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
    $("#wrapper").css("height", window.innerHeight - 44 + "px");
    QueryString.Initial();
    if (QueryString.GetValue("lastPage") == "orderDetails") {
        setInfo();
    }
    $("#fanhui").on("touchstart", fanhuiClick);


    /*    $(".check_label").on("touchstart", function() {
            if ($("#agreeInput").attr("checked")) {
                $("#agreeInput").removeAttr("checked");
            } else {
                $("#agreeInput").attr("checked", true);
            }
            setAgreeDate()
        });*/
    setUpImgPosition();
    $("#wrapper").on("touchmove", showUpimge);
    $("#upImg").on("touchstart", toTop);
    theIScroll = new IScroll("#wrapper");
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
    var keyArray = ["htId", "order_id", "user_name", "user_phone", "ty_name", "stageNumber"]
    for (var i = 0, l = keyArray.length; i < l; i++) {
        var key = keyArray[i];
        if (QueryString.GetValue(key)) {
            $("#" + key).text(QueryString.GetValue(key));
        }
    }
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

//  设置分期交易时间
function setAgreeDate(trans_date) {
    if ($("#agreeInput").attr("checked")) {
        var theDate = new Date();
        $("#agreeYear").text(trans_date.substr(0, 4));
        $("#agreeMonth").text(trans_date.substr(4, 2));
        $("#agreeDate").text(trans_date.substr(6, 2));
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
    history.back();
}