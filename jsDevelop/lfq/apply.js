var zcom = require("./zeptoCommon.js");
var myDialog = require("./myDialog.js");
var authentication = require("./authentication.js");
//默认为6月免息
var stageNumber = 6;
//申请分期总金额
var applyInstalmentNum = 0;

var getVerifyCodeDJS = 60; // 取验证码倒计时
var openid = '';
document.body.addEventListener('touchmove', function(e) {
    e.stopPropagation();
    //e.preventDefault();
});

//页面加载完事件绑定
$(function() {
    //    checkBrowser();
    $("#stageNumberBox>span").on("touchstart", selectStageNumber);
    $("#all-box").on("touchmove", function(e) {
        e.stopPropagation(); //阻止滚动事件继续传播，防止页面拖动
        //        e.preventDefault();
    });
    initAgreementCheck();
    $("#next-step").on("touchstart", nextStepFunc);
    $("#applyInstalmentNum").on("change", changeApplyInstalmentNum);
    $("#user-id").on("change", changeUserId);
    $("#user-phone").on("change", changeUserPhone);
    $("#user-name").on("change", changUserName);
    $("#verifyBtn").on("touchstart", getVerifyCode);
    $("#modalButton").parent().on("touchend", function() {
        myDialog.hideModal();
        event.preventDefault();
    });
    QueryString.Initial();
    openid = QueryString.GetValue("openid");
    initKeyup();
    init();

});

function init() {
    if (isPhone = $("#user-phone").val().length == 11) {
        $("#verifyBtn").removeClass("disabled");
    }
}


// 下一步 拼参数 发起请求
function nextStepFunc() {
    if ($("#next-step").hasClass("btn_disabled")) {
        return false;
    }
    var parameters = $('form').serializeArray(); //请求参数
    parameters.push({
        name: "servlet_type",
        value: "next_step"
    });
    parameters.push({
        name: "open_id",
        value: openid
    });
    parameters.push({
        name: "lfq_cnt",
        value: stageNumber
    });

    var paramStr = $.param(parameters); // 参数字符形式 或许没用
    //    console.log(param);     //把字符串打印到控制台 调试用的

    //创建订单类。
    var nextUrl = LFQ_ORDER_CREATE_URL;
    var tipmsg = "init";
    var resmsg = "";
    zcom.getAjax(nextUrl, parameters, function(retn) {
        if (retn.msg != undefined) {
            resmsg = retn.msg;
        } else {
            tipmsg = "当前服务请求出错，请重新查询";
        }
    });

    if (resmsg == 'WRONG001') {
        tipmsg = "短信验证码出错";
    } else if (resmsg == 'WRONG999') {
        tipmsg == "申请服务异常";
    } else {

    };

    if (tipmsg != "init") {
        $("#msg_lable").text(tipmsg);
        $("#verifyBtn").removeClass("disabled");
        myDialog.showModals(); // 显示提示框
        return;
    };

    if (resmsg == 'B00002') { //表示该手机号已开某通联卡，但是未有绑定微信号
        //直接跳转到绑定通联卡页面
        window.location.href = BASE_URL + "protocol_members.html?openid=" + openid;

    } else {
        window.location.href = "applyNextStep.html?" + paramStr;

    }
}

// 申请金额输入完成
function changeApplyInstalmentNum(argument) {
    var $eventTargetParentNode = $("#applyInstalmentNum").parent().parent();
    var isApply = isAllowedBand();
    authentication.addOrRemoveErro(isApply, "applyInstalmentNum-erro", "目前不支持您的分期金额", $eventTargetParentNode);
    computesEachPayNumber();
}

// 验证是否在 600~20000 之间
function isAllowedBand() {
    applyInstalmentNum = $("#applyInstalmentNum").val();
    var isApply = true;
    if (parseFloat(applyInstalmentNum) < 600 || parseFloat(applyInstalmentNum) > 20000 || isNaN(parseFloat(applyInstalmentNum))) {
        isApply = false;
    }

    return isApply;
}

// 姓名输入完 验证
function changUserName() {
    var $eventTargetParentNode = $(event.target.parentNode);
    var isCnName = authentication.isCnName($("#user-name").val());
    authentication.addOrRemoveErro(isCnName, "userName-erro", "中文名字错误", $eventTargetParentNode);
}
//电话输入完 验证
function changeUserPhone() {
    var userPhone = $(event.target).val();
    var $eventTargetParentNode = $(event.target.parentNode);
    var isPhone = !(userPhone.length < 11);
    authentication.addOrRemoveErro(isPhone, "phoneNum-erro", "手机号码错误", $eventTargetParentNode);
}

// 身份者输入完毕验证
function changeUserId() {
    var $eventTargetParentNode = $(event.target.parentNode);
    var isSFZNo = authentication.isSFZNo($("#user-id").val());
    authentication.addOrRemoveErro(isSFZNo, "sfz-erro", "身份证号码格式错误", $eventTargetParentNode);

}



//计算每期还款数
function computesEachPayNumber() {
    var eachPayNumber = (parseFloat(applyInstalmentNum) / stageNumber).toFixed(2);
    $("#eachPayNumber").text("预计" + eachPayNumber);
}

//选择分期数改变
function selectStageNumber($this) {
    $("#stageNumberBox>span").removeClass("checked");
    var $parentNode = $(event.target.parentNode);
    if ($(event.target).data("number")) {
        $parentNode = $(event.target);
    }
    $parentNode.addClass("checked");
    stageNumber = parseInt($parentNode.attr("data-number"));
    computesEachPayNumber();
}

//初始化已阅读协议复选框
function initAgreementCheck() {
    var $agreementCheck = $("#agreement-check");
    $agreementCheck.on("change", agreementCheckChange);
    $("#checkButton").on("touchstart", agreementCheckParentFunc);
}

function agreementCheckParentFunc() {
    var $agreementCheck = $("#agreement-check");
    if ($agreementCheck.is(":checked")) {
        $agreementCheck.prop('checked', false);
    } else {
        $agreementCheck.prop('checked', true);
    }
    agreementCheckChange();
}
//已阅读协议选择改变
function agreementCheckChange() {
    var $agreementCheck = $("#agreement-check");
    if ($agreementCheck.is(":checked")) {
        $agreementCheck.parent().addClass("checked");
    } else {
        $agreementCheck.parent().removeClass("checked");
    }
    isDisabledNext();
}

//请求 验证码
function getVerifyCode() {
    $verifyBtn = $(event.target);
    if ($verifyBtn.hasClass("disabled")) { //60秒之内
        return;
    } else { //发送短信 禁用60秒
        //发送短信
        // 禁用60秒
        $verifyBtn.addClass("disabled");
        $verifyBtn.text("重新获取(" + getVerifyCodeDJS + "S)");
        var url = LFQ_SMS_SEND_URL;
        var hp_no = $("#user-phone").val();
        var param = {
            hp_no: hp_no,
            openid: openid
        };
        var setIntervarHandle = setInterval(function() {
            getVerifyCodeDJS--;
            $verifyBtn.text("重新获取(" + getVerifyCodeDJS + "S)")
            if (getVerifyCodeDJS == 0) {
                $verifyBtn.text("重新获取");
                clearInterval(setIntervarHandle);
                $verifyBtn.removeClass("disabled");
                getVerifyCodeDJS = 60;
            };
        }, 1000);
    }


    zcom.getAjax(url, param, function(retn) {
        if (retn.msg != undefined) {

        } else {

        }
    });


}

// 输入框回车事件
function initKeyup() {
    $("#applyInstalmentNum").on("keyup",function(){
        zcom.clearNoNum(this)
    })
    $("input").on("keyup", function() {
        isDisabledNext();
    });

    $("#user-name").on("keyup", function() {
        if (authentication.isSFZNo($("#user-id").val())) {} else {
            getFocus("#user-id");
        }

    });
    $("#user-id").on("keyup", function() {
        if ($("#user-phone").val().length == 11) {} else {
            getFocus("#user-phone");
        }

    });
    $("#user-phone").on("keyup", function() {
        this.value = this.value.replace(/[^\d]/g,"");
        if (getVerifyCodeDJS == 60 && $("#user-phone").val().length == 11) {
            $("#verifyBtn").removeClass("disabled");
        }
        if ($("#verify-code").val().length == 4) {} else {
            getFocus("#verify-code");
        }

    });

    $("#verify-code").on("keyup", function() {
        getFocus("#verify-code");
    });
    $("#applyInstalmentNum").on("keyup", function() {
        getFocus("#verify-code");
    });

}
//  禁用或启用下一步
function isDisabledNext() {
    $nextStep = $("#next-step");
    if (checkAllInput()) {
        $nextStep.removeClass("btn_disabled");
        $nextStep.addClass("btn_primary");
    } else {
        $nextStep.removeClass("btn_primary");
        $nextStep.addClass("btn_disabled");
    }
}

// 检查所有输入框是否符合要求
function checkAllInput() {
    var isOk = false;
    var isApply = isAllowedBand();
    var isPhone = $("#user-phone").val().length == 11,
        isSFZNo = authentication.isSFZNo($("#user-id").val()),
        isCnName = authentication.isCnName($("#user-name").val()),
        isverifyCode = $("#verify-code").val().length == 4,
        isAgreementCheckEd = $("#agreement-check").is(":checked");
    if (isApply && isPhone && isSFZNo && isCnName && isverifyCode && isAgreementCheckEd) {
        isOk = true;
    }
    return isOk;
}



// 获得焦点
function getFocus(focusId) {
    if (event.keyCode == 13) {
        $(focusId).focus();
    }
}

//移动端检查
function checkBrowser() {
    var u = navigator.userAgent.toLowerCase();
    if (u.indexOf('mobile') == -1 && u.indexOf('iphone') == -1) {
        window.location.href = "error_browser.html";
    }
}
