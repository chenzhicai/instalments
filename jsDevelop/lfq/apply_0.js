var zcom = require("./zeptoCommon.js");
var myDialog = require("./cmodal.js");
var authentication = require("./authentication.js");
var view = require("./views/applyView.js");
//默认为6月免息
var stageNumber = 6;
//申请分期总金额
var applyInstalmentNum = 0;

var getVerifyCodeDJS = 60; // 取验证码倒计时
var openid = '';
$verifyBtn = $("#verifyBtn");
document.body.addEventListener('touchmove', function(e) {
    e.stopPropagation();
    //e.preventDefault();
});

//页面加载完事件绑定
$(function() {
    zcom.checkBrowser();
    $("#stageNumberBox>span").on("touchstart", selectStageNumber);
    $("#all-box").on("touchmove", function(e) {
        e.stopPropagation(); //阻止滚动事件继续传播，防止页面拖动
        //        e.preventDefault();
    });
    initAgreementCheck();
    $("#next-step").on("touchstart", nextStepFunc);

    initChangEvent();
    $("#applyInstalmentNum").on("blur", changeFloat);
    $("#verifyBtn").on("touchstart", getVerifyCode);
    $("#modalButton").parent().on("touchend", function() {
        myDialog.hideModal();
        event.preventDefault();
    });
    QueryString.Initial();
    openid = QueryString.GetValue("openid");
    initKeyup();
    init();
    setInfo();
    setContract();
});

function init() {
    if (isPhone = $("#user-phone").val().replace(/ /g, "").length == 11) {
        $("#verifyBtn").removeClass("disabled");
    }
}

function initChangEvent() {
    $("#applyInstalmentNum").on("change blur", changeApplyInstalmentNum);
    $("#user-phone").on("change blur", changeUserPhone);
    $("#verify-code").on("change blur", changeYZM);
    $("#creditCard").on("change blur", changeCreditCard);
}


// 下一步 拼参数 发起请求
function nextStepFunc() {
    if ($("#next-step").hasClass("btn_disabled")) {
        verifyPromptAll();
        return false;
    }
    var parameters = $('form').serializeArray(); //请求参数
    repacleSpace(parameters);
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

    var parameterNext = $('form').serializeArray(); //请求参数
    repacleSpace(parameterNext);
    var paramStr = $.param(parameterNext); // 参数字符形式 或许没用
    //    console.log(param);     //把字符串打印到控制台 调试用的

    //创建订单类。
    var nextUrl = LFQ_ORDER_CREATE_URL;
    var tipmsg = "init";
    var resmsg = "";
    var des_openid = "";
    try {
        zcom.getAjax(nextUrl, parameters, function(retn) {
            if (retn.error_response != undefined) {
                resmsg = retn.error_response.resp_code;
                tipmsg = retn.error_response.resp_msg;
            } else if (retn.user_acct_response != undefined) {
                resmsg = retn.user_acct_response.is_black;
                des_openid = retn.des_open_id
            } else {
                tipmsg = "当前服务请求出错，请重新查询";
            };
        });
    } catch (e) {
        tipmsg = "网络无法连接";
    }
    if (resmsg == 'WRONG0001') {
        tipmsg = "短信验证码出错";
    } else if (resmsg == 'WRONG999') {
        tipmsg == "申请服务异常";
    } else {

    };

    // 一直报验证码错误 为了配合测试 前端暂时不报错
    if (tipmsg != "init") {
        $("#msg_lable").text(tipmsg);
        //        $("#verifyBtn").removeClass("disabled");
        myDialog.showModals(); // 显示提示框
        return;
    };

    if (resmsg == 'B00002') { //表示该手机号已开某通联卡，但是未有绑定微信号
        //直接跳转到绑定通联卡页面
        window.location.href = BASE_URL + "FuLiBao/protocol_members.html?" + paramStr + "&lfq_cnt=" + stageNumber + "&jm_openid=" + openid + "&openid=" + des_openid;

    } else {
        window.location.href = "applyNextStep.html?" + paramStr + "&lfq_cnt=" + stageNumber + "&open_id=" + openid;

    }
}

/* 替换条件里的空格 */
function repacleSpace(parameterNext) {
    for (var i = 0, l = parameterNext.length; i < l; i++) {
        parameterNext[i].value = parameterNext[i].value.replace(/  /g, "");
    }
}

function verifyPromptAll() {
    changeApplyInstalmentNum();
    changeCreditCard();
    changeUserPhone();
    changeYZM();
}

// 申请金额输入完成
function changeApplyInstalmentNum(argument) {
    var $applyInstalmentNum = $("#applyInstalmentNum");
    /*    if ($applyInstalmentNum.val() == "") { //没有输入金额
            computesEachPayNumber();
            return;
        }*/
    var $eventTargetParentNode = $applyInstalmentNum.parent().parent();
    var isApply = isAllowedBand();
    authentication.addOrRemoveErro(isApply, "applyInstalmentNum-erro", "目前不支持您的分期金额", $eventTargetParentNode);
    computesEachPayNumber();
}

function changeFloat() {
    var $applyInstalmentNum = $("#applyInstalmentNum");
    $applyInstalmentNum.val(parseFloat($applyInstalmentNum.val()));
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

//电话输入完 验证
function changeUserPhone() {
    var userPhone = $("#user-phone").val().replace(/ /g, "");
    var $eventTargetParentNode = $("#user-phone").parent();
    var isPhone = !(userPhone.length < 11);
    authentication.addOrRemoveErro(isPhone, "phoneNum-erro", "手机号码错误", $eventTargetParentNode);
}


// 验证码输完后验证提示
function changeYZM() {
    var verifyCode = $("#verify-code");
    var $eventTargetParentNode = verifyCode.parent();
    var isNum = authentication.isNum(verifyCode.val(), 4);
    authentication.addOrRemoveErro(isNum, "yzm-erro", "验证码错误", $eventTargetParentNode);
}

// 信用卡输入完毕验证
function changeCreditCard() {
    $creditCard = $("#creditCard");
    var $eventTargetParentNode = $creditCard.parent();
    var XYKNum = $creditCard.val().replace(/ /g, "");
    var isXYKNum = authentication.isXYKNum(XYKNum);
    authentication.addOrRemoveErro(isXYKNum, "isXYKNum-erro", "信用卡格式错误", $eventTargetParentNode);


}

//计算每期还款数
function computesEachPayNumber() {
    if (isNaN(applyInstalmentNum) || applyInstalmentNum == "") {
        applyInstalmentNum = 0;
    }
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
    isDisabledNext();
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
    if ($verifyBtn.hasClass("disabled")) { //60秒之内
        return;
    } else { //发送短信 禁用60秒
        //发送短信
        // 禁用60秒
        $verifyBtn.addClass("disabled");
        $verifyBtn.text("重新获取(" + getVerifyCodeDJS + "S)");
        var url = LFQ_SMS_SEND_URL;
        var hp_no = $("#user-phone").val().replace(/ /g, "");
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

// 获得焦点
function getFocus(focusId) {
    if (event.keyCode == 13) {
        $(focusId).focus();
    }
}

// 输入框回车事件
function initKeyup() {
    $("input").on("input", function() {
        isDisabledNext();
    });
    $("#applyInstalmentNum").on("keyup", function() {
        setTimeout(function(argument) {
            computesEachPayNumber();
        }, 300);
        view.clearNoNum(this);
        getFocus("#creditCard");

    });
    $("#creditCard").on("keyup", function() {
        view.deleteSpace(event.keyCode, "#creditCard");
        if (event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39) {
            view.deleteNoNumber(this);
            view.spaceCardNum();
        }
        if (!($("#user-phone").val().replace(/ /g, "").length == 11)) {
            getFocus("#user-phone");
        }
    });
    $("#user-phone").on("keyup", function() {
        view.deleteSpace(event.keyCode, "#user-phone");
        if (event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39) {
            view.deleteNoNumber(this);
            view.spacePhoneNum();
        }

        if (getVerifyCodeDJS == 60 && $("#user-phone").val().replace(/ /g, "").length == 11) {
            $("#verifyBtn").removeClass("disabled");
        }
        if ($("#verify-code").val().length == 4) {} else {
            getFocus("#verify-code");
        }
    });

    $("#verify-code").on("input", function() {
        view.deleteNoNumber(this);
        getFocus("#next-step");
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
    setContract();
}

// 检查所有输入框是否符合要求
function checkAllInput() {
    var isOk = false;
    var isApply = isAllowedBand();
    var isPhone = $("#user-phone").val().replace(/ /g, "").length == 11,
        isverifyCode = $("#verify-code").val().length == 4,
        isAgreementCheckEd = $("#agreement-check").is(":checked"),
        isYzmNum = authentication.isNum($("#verify-code").val(), 4),
        isXYKNum = authentication.isXYKNum($("#creditCard").val().replace(/ /g, ""));
    if (isApply && isPhone && isverifyCode && isAgreementCheckEd && isYzmNum) {
        isOk = true;
    }
    return isOk;
}

// 设置合同链接
function setContract() {
    var parameterNext = $('form').serializeArray();
    repacleSpace(parameterNext);
    var contractHref = "contract.html?" + $.param(parameterNext) + "&openid=" + openid + "&lfq_cnt=" + stageNumber + "&lastPage=applyInstalment";
    $("#contract").attr("href", contractHref)
}

// 根据链接填写资料
function setInfo() {
    var nameKeys = ["lfq_amt", "creditCard", "hp_no", "verify_code"];
    for (var i = 0, l = nameKeys.length; i < l; i++) {
        if (QueryString.GetValue(nameKeys[i]) && QueryString.GetValue(nameKeys[i]) != "") {
            $("[name=" + nameKeys[i] + "]").val(QueryString.GetValue(nameKeys[i]));
        }
    }
    view.spaceCardNum();
    view.spacePhoneNum();


    if (QueryString.GetValue("lfq_cnt") && QueryString.GetValue("lfq_cnt") != "") {
        $("#stageNumberBox>span").removeClass("checked");
        $("span[data-number='" + QueryString.GetValue("lfq_cnt") + "']").addClass("checked");
        stageNumber = parseInt(QueryString.GetValue("lfq_cnt"));
    }
    if (QueryString.GetValue("lfq_amt") && QueryString.GetValue("lfq_amt") != "") {
        $("#applyInstalmentNum").change();
    }
    if (QueryString.GetValue("lfq_amt") && QueryString.GetValue("lfq_amt") != "") {
        if ($("#user-phone").val().replace(/ /g, "").length == 11) {
            $("#verifyBtn").removeClass("disabled");
        }
    }
    computesEachPayNumber();
}