var zcom = require("./zeptoCommon.js");
var myDialog = require("./myDialog.js");
var authentication = require("./authentication.js");
$(function() {
    $("#fanhui").on("touchstart", function() {
        location = "./applyInstalment.html";
    });
    initCreditCardEvent();
    initCVN2Event();
    initTimeNumEvent();
    initYanjingIconEvent();
    $("#submitA").on("touchstart", applyLfqOrder);
    QueryString.Initial();
    $("#modalButton").parent().on("touchend", function() {
        myDialog.hideModal();
        event.preventDefault();
    });

});

function applyLfqOrder() {
    if ($("#submitA").hasClass("btn_disabled")) {
        return;
    }
    $(".modal-content").hide();
    $(".modal-content2").show();
    myDialog.showModals();

    var param = getParameters(); // 参数字符形式 
    console.log(param); //把字符串打印到控制台 调试用的  


    
    zcom.getAjax(LFQ_ORDER_CREATE_URL, param, retnFunc);
    //    retnFunc({});
}

// 回调函数
function retnFunc(retn) {
    var tipmsg = "init";
    if (retn.lft_orderinfo_response != undefined) {
        if (retn.lft_orderinfo_response.resp_code == "0000") { //如果成功 
            window.location.href = "qrcodePay.html?payCode=" + retn.serial_no;
        } else {
            tipmsg = retn.lft_orderinfo_response.resp_msg;
        }
    } else {
        tipmsg = "当前服务请求出错，请重新查询";
    }

    if (tipmsg != "init") {
        $("#msg_lable").text(tipmsg);
        $("#verifyBtn").removeClass("disabled");
        $(".modal-content").show();
        $(".modal-content2").hide();
        myDialog.showModals(); // 显示提示框
    }
}

// 拼接请求参数
function getParameters() {
    var parameters = [{
        name: "open_id",
        value: QueryString.GetValue("open_id")
    }, {
        name: "hp_no",
        value: QueryString.GetValue("hp_no")
    }, {
        name: "cust_name",
        value: decodeURI(QueryString.GetValue("cust_name"))
    }, {
        name: "id_no",
        value: QueryString.GetValue("id_no")
    }, {
        name: "lfq_cnt",
        value: QueryString.GetValue("lfq_cnt")
    }, {
        name: "lfq_amt",
        value: QueryString.GetValue("lfq_amt")
    }, {
        name: "creditCard",
        value: $("#creditCard").val()
    }, {
        name: "cvn2Num",
        value: $("#cvn2Num").val()
    }, {
        name: "timeNum",
        value: $("#timeNum").val()
    }, {
        name: "servlet_type",
        value: "create_order"
    }]; //请求参数

    return $.param(parameters);
}

// 禁用或启用按钮
function isDisabledSubmit() {
    var isXYKNum = authentication.isXYKNum($("#creditCard").val());
    var isCvn2Num = $("#cvn2Num").val().length < 3 ? false : true;
    var istimeNum = authentication.isTimeNum($("#timeNum").val());
    if (isXYKNum && isCvn2Num && istimeNum) {
        $("#submitA").removeClass("btn_disabled");
        $("#submitA").addClass("btn_primary");
    } else {
        $("#submitA").removeClass("btn_primary");
        $("#submitA").addClass("btn_disabled");
    }


}

// 绑定CVN2输入框事件
function initCVN2Event() {
    $cvn2Num = $("#cvn2Num");
    $cvn2Num.on("change", changeCvn2Num);
    $cvn2Num.on("keyup", function() {
        var cvn2NumVal = new String($cvn2Num.val());
        if (cvn2NumVal.length > 3) {
            $cvn2Num.val(cvn2NumVal.substr(0, 3));
        }
        isDisabledSubmit();
    });
}

// 绑定时间输入框事件
function initTimeNumEvent() {
    $timeNum = $("#timeNum");
    $timeNum.on("change", changeTimeNum);
    $timeNum.on("keyup", function() {
        var timeNumVal = new String($timeNum.val());
        if (timeNumVal.length > 4) {
            $timeNum.val(timeNumVal.substr(0, 4));
        }
        isDisabledSubmit();
    });
}

// 绑定信用卡输入事件
function initCreditCardEvent() {
    $creditCard = $("#creditCard");
    $creditCard.on("change", changeCreditCard);
    $creditCard.on("keyup", function() {
        isDisabledSubmit();
    })
}

// 验证 信用卡输入
function changeCreditCard() {
    var XYKNum = $("#creditCard").val();
    var $eventTargetParentNode = $("#creditCard").parent().parent();
    var isXYKNum = authentication.isXYKNum(XYKNum);
    authentication.addOrRemoveErro(isXYKNum, "isXYKNum-erro", "信用卡格式错误", $eventTargetParentNode);
}

//验证CVN2 格式
function changeCvn2Num() {
    var cvn2Num = $("#cvn2Num").val();
    var isCvn2Num = cvn2Num.length < 3 ? false : true;
    var $eventTargetParentNode = $("#cvn2Num").parent().parent();
    authentication.addOrRemoveErro(isCvn2Num, "isCvn2Num-erro", "CVN2格式错误", $eventTargetParentNode);
}

// 验证有效时间
function changeTimeNum() {
    var timeNum = $("#timeNum").val();
    var istimeNum = authentication.isTimeNum(timeNum);
    var $eventTargetParentNode = $("#timeNum").parent().parent();
    authentication.addOrRemoveErro(istimeNum, "istimeNum-erro", "有效时间格式错误", $eventTargetParentNode);
}

// 查看输入CVN2事件
function initYanjingIconEvent() {
    $(".yanjing_icon").on("touchstart", function() {
        setBackground("yanjing2_icon.png");
        $("#cvn2Num").attr("type", "number");
        
    });
    $(".yanjing_icon").on("touchend", function() {
        setTimeout(function() {
            setBackground("yanjing_icon.png");
            $("#cvn2Num").attr("type", "password");
        },3000)

    });

    function setBackground(pngName) {
        $(".yanjing_icon").css("background", 'url("../images/' + pngName + '")');
        $(".yanjing_icon").css("background-repeat", 'no-repeat');
        $(".yanjing_icon").css("background-position", '5px 5px');
        $(".yanjing_icon").css("background-size", '23px 14px');
    }
}