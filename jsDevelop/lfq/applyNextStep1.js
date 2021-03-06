var zcom = require("../components/winLocation.js");
zcom.QueryString.Initial();
var myDialog = require("./cmodal.js");
var authentication = require("./authentication.js");
var view = require("./views/applyView.js");
var num = require("../components/number.js");
var map = require("../components/map.js");
var getVerifyCodeDJS = 60; // 取验证码倒计时
var openid = '';
var cardFeeRate, merName, merId, prdt_no, lfq_amt, lfq_cnt, stageNumber, latitude, longitude;
var creditCard, userId, cvn2Num, userName, timeNum, hp_no, verify_code;
var $userName, $userId, $cvn2Num, $timeNum, $userPhone, $verifyCode;
var dlsq = 'wxn'; // wxn:
var wxReady = 0; // 0 wx.js没初始化好 1 初始化好了
$verifyBtn = $("#verifyBtn");
$(function() {
    zcom.checkBrowser();
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 通过下面这个API隐藏右上角按钮
        wx.hideOptionMenu();
    });
    inintUserNameEvent();
    initUserIdEvent();
    inintCreditCardEvent();
    initCVN2Event();
    initTimeNumEvent();
    inintphoneEvent();
    inintYZMEvent();
    initYanjingIconEvent();
    initVale();
    $("#submitA").on("touchstart", applyLfqOrder);
    $("#submitApply").on("touchend", applyLfqOrder2);
    $("#submitCancel").on("touchstart", function() {
        $("#orderTiShi").hide();
    });
    $("#orderTiShi .close_div").on("touchstart", function() {
        $("#orderTiShi").hide();
    });
    $("#modalButton").parent().on("touchend", function() {
        myDialog.hideModal();
        event.preventDefault();
    });
    $("#verifyBtn").on("touchstart", getVerifyCode);

    setInfo();
    $("#fanhui").on("touchstart", function() {
        location.href = "./applyInstalment.html" + location.search;
    });
    initStyle();
    getConfig();
});


function initVale() {
    cardFeeRate = parseFloat(zcom.QueryString.GetValue("cardFeeRate"));
    merId = zcom.QueryString.GetValue("merId");
    openid = zcom.QueryString.GetValue("openid");
    merName = zcom.QueryString.GetValue("merName");
    prdt_no = zcom.QueryString.GetValue("prdt_no");
    if (merName) {
        document.title = decodeURI(merName);
    }
    getSessionStorage();
    if (!lfq_amt || lfq_amt == "" || !stageNumber || stageNumber == "") {
        location.href = "./applyInstalment.html" + location.search;
        $("#msg_lable").html("请填写分期金额");
        myDialog.showModals();
    }
}

// 根据设备计算一些样式
function initStyle() {
    setInterval(function() {
        var orderTiShiHeight = parseInt(($("body")[0].scrollHeight - 360) / 2);
        $("#orderTiShi .modal-dialog").css("margin-top", orderTiShiHeight + "px");

    }, 500);

}


function applyLfqOrder() {
    $("input").blur();
    if ($("#submitA").hasClass("btn_disabled")) {
        return;
    }

    var contentMonet = (parseFloat(lfq_amt) * (1 + cardFeeRate / 100) + 0.0001).toFixed(2);
    var eachMoney = num.hold2bit(parseFloat(contentMonet) / stageNumber);
    var eachPrincipal = num.hold2bit(lfq_amt / stageNumber);
    var eachFeeNum = parseFloat(eachMoney) - parseFloat(eachPrincipal);
    //    $("#ts_amt").text(lfq_amt + "元");
    $("#ts_cnt").text(lfq_cnt + "期");
    //    $("#ts_sxf").text(parseFloat(lfq_amt * cardFeeRate / 100).toFixed(2) + "元");
    //    $("#ts_yhk").text($("#creditCard").val());
    $("#ts_amt").text(lfq_amt + "元");
    $("#ts_mqhk").text(eachMoney + "元");
    $("#ts_mqsxf").text(eachFeeNum.toFixed(2));
    myDialog.showModals("orderTiShi");

}

// 确认申请分期提交表单
function applyLfqOrder2() {
    $("#orderTiShi").hide();
    $(".modal-content").hide();
    $(".modal-content2").show();
    myDialog.showModals();

    var param = getParameters(); // 参数字符形式 
    console.log(param); //把字符串打印到控制台 调试用的  


    try {
        $.post(LFQ_ORDER_CREATE_URL, param, retnFunc);
    } catch (e) {
        $("#msg_lable").text("网络无法连接");
        $(".modal-content").show();
        $(".modal-content2").hide();
        myDialog.showModals(); // 显示提示框
    }

}

// 回调函数
function retnFunc(retn) {
    retn =  JSON.parse(retn);
    var tipmsg = "init";
    var resmsg = "";
    var des_openid = "";
    if (retn.lft_orderinfo_response != undefined) {
        if (retn.lft_orderinfo_response.resp_code == "0000") { //如果成功
            sessionStorage.clear();
            window.location.href = "qrcodePay.html?payCode=" + retn.lft_orderinfo_response.serial_no + '&card_6th=' + card_6th + '&open_id=' + openid;
            return;
        } else {
            tipmsg = retn.lft_orderinfo_response.resp_msg;
        }
    } else {
        if (retn.error_response != undefined) {
            resmsg = retn.error_response.resp_code;
            tipmsg = retn.error_response.resp_msg ? retn.error_response.resp_msg : retn.error_response.sub_msg;
        } else if (retn.user_acct_response != undefined) {
            resmsg = retn.user_acct_response.is_black;
            des_openid = retn.des_open_id
        } else {
            tipmsg = "当前服务请求出错，请重新查询";
        }

        if (resmsg == 'WRONG0001') {
            tipmsg = "短信验证码出错";
        } else if (resmsg == 'WRONG999') {
            tipmsg == "申请服务异常";
        }
    }

    if (resmsg == 'B00002') { //表示该手机号已开某通联卡，但是未有绑定微信号
        //直接跳转到绑定通联卡页面
        var parameters = getParameters();
        for (var i = 0, l = parameters.length; i < l; i++) {
            if (parameters[i].name == "lfq_amt") {
                parameters[i].value = parameters[i + 1].value;
            }
        }
        parameters.lfq_amt = parameters.goods_amount;
        var paramStr = $.param(parameters);
        window.location.href = BASE_URL + "FuLiBao/protocol_members.html?" + paramStr + "&jm_openid=" + openid + "&openid=" + des_openid + "&merName=" + merName;
        return;
    }

    if (tipmsg != "init") {
        if (tipmsg == "经度不能为空") {
            location.href = "./positionPrompt.html";
            tipmsg = "请授权微信和小通金服获得地理位置</br>功能后再办理该业务。"
        }
        $("#msg_lable").html(tipmsg);
        $(".modal-content").show();
        $(".modal-content2").hide();
        myDialog.showModals(); // 显示提示框
    }
}

// 拼接请求参数
function getParameters() {
    var userName = $userName.val().replace(/ /g, "");
    var userId = $userId.val().replace(/ /g, "");
    var CardNum = $("#creditCard").val().replace(/ /g, "");
    var parameters = [{
        name: "open_id",
        value: openid
    }, {
        name: "hp_no",
        value: $userPhone.val().replace(/ /g, "")
    }, {
        name: "cust_name",
        value: userName
    }, {
        name: "id_no",
        value: userId
    }, {
        name: "lfq_cnt",
        value: lfq_cnt
    }, {
        name: "lfq_amt",
        value: (parseFloat(lfq_amt) * (1 + cardFeeRate / 100) + 0.0001).toFixed(2)
    }, {
        name: "goods_amount",
        value: lfq_amt
    }, {
        name: "creditCard",
        value: CardNum
    }, {
        name: "cvn2Num",
        value: $cvn2Num.val()
    }, {
        name: "timeNum",
        value: $timeNum.val()
    }, {
        name: "servlet_type",
        value: "create_order"
    }, {
        name: "merId",
        value: merId
    }, {
        name: "cardFeeRate",
        value: cardFeeRate
    }, {
        name: "verify_code",
        value: $verifyCode.val()
    }, {
        name: "prdt_no",
        value: prdt_no
    }, {
        name: "lat",
        value: latitude
    }, {
        name: "lng",
        value: longitude
    }]; //请求参数

    card_6th = CardNum.substr(CardNum.length - 6); // 传到付款码页面用于重新生成串码
    return parameters;
}

// 配置config
function getConfig() {
    console.log("getLocation.....");
    wx.ready(function() {
        wxReady = 1;
    });
    map.getConfig({
        mapUrl: "/lfq/applyNextStep.html" + location.search
    });

    getLocation();

}
// 配置成功获取经纬度
function getLocation() {
    var locationhandle = setInterval(function() {
        if (wxReady == 1) {
            clearInterval(locationhandle);
            wx.getLocation({
                type: "gcj02",
                success: function(res) {

                    console.log("getLocation data");
                    console.dir(res);
                    latitude = res.latitude;
                    longitude = res.longitude;
                    //               alert(res.latitude + " " + res.longitude);

                },
                fail: function() {
                    location.href = "./positionPrompt.html";
                },
                cancel: function(res) {
                    location.href = "./positionPrompt.html";
                }
            });
        }
    }, 500);
}



// 禁用或启用按钮
function isDisabledSubmit() {
    var isCnName = authentication.isCnName($userName.val());
    var isSFZNo = authentication.isSFZNo($userId.val().replace(/ /g, ""));
    var isCvn2Num = $cvn2Num.val().length < 3 ? false : true;
    var istimeNum = authentication.isTimeNum($timeNum.val());
    var isPhone = $userPhone.val().replace(/ /g, "").length == 11;
    var isYZM = authentication.isNum($verifyCode.val(), 4);
    var XYKNum = $creditCard.val().replace(/ /g, "");
    var isXYKNum = authentication.isXYKNum(XYKNum);

    if (isCnName && isSFZNo && isCvn2Num && istimeNum && isPhone && isYZM && isXYKNum) {
        $("#submitA").removeClass("btn_disabled");
        $("#submitA").addClass("btn_primary");
    } else {
        $("#submitA").removeClass("btn_primary");
        $("#submitA").addClass("btn_disabled");
    }
}

// 绑定姓名输入框事件
function inintUserNameEvent() {
    $userName = $("#user-name");
    $userName.on("input", function() {
        isDisabledSubmit();
    });
    $userName.on("change  blur", changUserName);
    $userName.on("keyup", function() {
        view.getFocus("#user-id");
    });
}
// 姓名输入完 验证
function changUserName() {

    var $eventTargetParentNode = $userName.parent().parent();
    var isCnName = authentication.isCnName($userName.val());
    var userNameLength = authentication.strLen($userName.val());
    authentication.addOrRemoveErro(true, "userName-erro", "名字错误", $eventTargetParentNode);
    if (!isCnName || userNameLength > 20) {
        if (userNameLength > 20 || userNameLength < 4) {
            authentication.addOrRemoveErro(false, "userName-erro", "名字长度不符合要求", $eventTargetParentNode);
        } else {
            authentication.addOrRemoveErro(isCnName, "userName-erro", "名字错误", $eventTargetParentNode);
        }
    } else {
        sessionStorage.setItem("userName", $userName.val());
    }

}

// 绑定身份证号输入框事件
function initUserIdEvent() {
    $userId = $("#user-id");
    $userId.on("change blur", changeUserId);
    $userId.on("input", function() {
        $(this).val($(this).val().toUpperCase());
        deleteNoNumberX($(this)[0]);
        if (!($cvn2Num.val().length == 3)) {
            view.getFocus("#cvn2Num");
        }
        isDisabledSubmit();
    });
    $userId.on("keyup", function() {
        view.deleteSpace(event.keyCode, "#user-id");
        if (event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39) {
            view.spaceuserId();
        }
        view.getFocus("#creditCard");
    });
}

function deleteNoNumberX(obj) {
    var reg = /[^\dX\*\s]/;
    if (reg.test(obj.value) || obj.value == "") {
        obj.value = obj.value.replace(/[^\dX\*\s]/g, "");
    }
    if (/[\*]/.test(obj.value)) {
        obj.value = obj.value.replace(/[\*]/g, "X");
    }
}


// 身份者输入完毕验证 
function changeUserId() {
    var $eventTargetParentNode = $userId.parent().parent();
    var isSFZNo = authentication.isSFZNo($userId.val().replace(/  /g, ""));
    authentication.addOrRemoveErro(isSFZNo, "sfz-erro", "身份证号码格式错误", $eventTargetParentNode);
    if (isSFZNo) {
        sessionStorage.setItem("userId", $userId.val().replace(/  /g, ""));
    }

}

// 绑定信用卡输入事件
function inintCreditCardEvent() {
    $creditCard = $("#creditCard");
    $creditCard.on("change blur", changeCreditCard);
    $creditCard.on("keyup", function() {
        view.deleteSpace(event.keyCode, "#creditCard");
        if (event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39) {
            view.deleteNoNumber(this);
            view.spaceCardNum();
        }
        view.getFocus("#cvn2Num");
    });
    $creditCard.on("input", function() {
        isDisabledSubmit();
    });
}

// 信用卡输入完毕验证
function changeCreditCard() {
    $creditCard = $("#creditCard");
    var $eventTargetParentNode = $creditCard.parent().parent();
    var XYKNum = $creditCard.val().replace(/ /g, "");
    var isXYKNum = authentication.isXYKNum(XYKNum);
    authentication.addOrRemoveErro(isXYKNum, "isXYKNum-erro", "信用卡格式错误", $eventTargetParentNode);
    if (isXYKNum) {
        sessionStorage.setItem("creditCard", $creditCard.val().replace(/ /g, ""));
    }

}

// 绑定CVN2输入框事件
function initCVN2Event() {
    $cvn2Num = $("#cvn2Num");
    $cvn2Num.on("change blur", changeCvn2Num);
    $cvn2Num.on("input", function() {
        this.value = this.value.replace(/[^\d]/g, "");
        var cvn2NumVal = new String($cvn2Num.val());
        if (cvn2NumVal.length > 3) {
            $cvn2Num.val(cvn2NumVal.substr(0, 3));
        }
        isDisabledSubmit();
    });
    $cvn2Num.on("keyup", function() {
        view.getFocus("#timeNum");
    });

}
//验证CVN2 格式
function changeCvn2Num() {

    var cvn2Num = $cvn2Num.val();
    var isCvn2Num = cvn2Num.length < 3 ? false : true;
    var $eventTargetParentNode = $cvn2Num.parent().parent();
    authentication.addOrRemoveErro(isCvn2Num, "isCvn2Num-erro", "CVN2格式错误", $eventTargetParentNode);
    if (isCvn2Num) {
        sessionStorage.setItem("cvn2Num", $cvn2Num.val());
    }

}

// 绑定时间输入框事件
function initTimeNumEvent() {
    $timeNum = $("#timeNum");
    $timeNum.on("change blur", changeTimeNum);
    $timeNum.on("input", function() {
        view.deleteNoNumber(this);
        var timeNumVal = new String($timeNum.val());
        if (timeNumVal.length > 4) {
            $timeNum.val(timeNumVal.substr(0, 4));
        }
        isDisabledSubmit();
    });
    $timeNum.on("keyup", function() {
        view.getFocus("#user-phone");
    });
}

// 验证有效时间
function changeTimeNum() {
    var timeNum = $timeNum.val();
    var istimeNum = authentication.isTimeNum(timeNum);
    var $eventTargetParentNode = $timeNum.parent().parent();
    authentication.addOrRemoveErro(istimeNum, "istimeNum-erro", "有效时间格式错误", $eventTargetParentNode);
    if (istimeNum) {
        sessionStorage.setItem("timeNum", $timeNum.val());
    }

}

// 绑定手机号事件
function inintphoneEvent() {
    $userPhone = $("#user-phone");
    $userPhone.on("change blur", changeUserPhone);
    $userPhone.on("keyup", function() {
        view.deleteSpace(event.keyCode, "#user-phone");
        if (event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39) {
            view.deleteNoNumber(this);
            view.spacePhoneNum();
        }

        if (getVerifyCodeDJS == 60 && $userPhone.val().replace(/ /g, "").length == 11) {
            $("#verifyBtn").removeClass("disabled");
        }
        if (event.keyCode == 13) {
            $("input").blur();
        }
        isDisabledSubmit();
    });
}
//电话输入完 验证
function changeUserPhone() {
    var userPhone = $userPhone.val().replace(/ /g, "");
    var $eventTargetParentNode = $userPhone.parent().parent();
    var isPhone = !(userPhone.length < 11);
    authentication.addOrRemoveErro(isPhone, "phoneNum-erro", "手机号码错误", $eventTargetParentNode);
    if (isPhone) {
        sessionStorage.setItem("hp_no", $userPhone.val().replace(/ /g, ""));
    }

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

        var setIntervarHandle = setInterval(function() {
            getVerifyCodeDJS--;
            $verifyBtn.text("重新获取(" + getVerifyCodeDJS + "s)")
            if (getVerifyCodeDJS == 0) {
                $verifyBtn.text("重新获取");
                clearInterval(setIntervarHandle);
                $verifyBtn.removeClass("disabled");
                getVerifyCodeDJS = 60;
            };
        }, 1000);

        getAjaxCode();
    }
}

// 发送验证码请求
function getAjaxCode() {
    var url = LFQ_SMS_SEND_URL;
    var hp_no = $userPhone.val().replace(/ /g, "");
    var param = {
        hp_no: hp_no,
        openid: openid,
        prdt_no: prdt_no
    };
    $.post(url, param, function(retn) {
        console.log("验证码请求结果");
        console.dir(retn);
    });
}


// 绑定验证码事件
function inintYZMEvent() {
    $verifyCode = $("#verify-code");
    $verifyCode.on("change blur", changeYZM);
    $verifyCode.on("input", function() {
        view.deleteNoNumber(this);
        view.getFocus("#submitA");
        isDisabledSubmit();
    });

}
// 验证码输完后验证提示
function changeYZM() {
    var $eventTargetParentNode = $verifyCode.parent().parent();
    var isNum = authentication.isNum($verifyCode.val(), 4);
    authentication.addOrRemoveErro(isNum, "yzm-erro", "验证码错误", $eventTargetParentNode);
    if (isNum) {
        sessionStorage.setItem("verify_code", $verifyCode.val());
    }

}


// 查看输入CVN2事件
function initYanjingIconEvent() {
    $(".yanjing_icon").on("touchstart", function() {
        setBackground("yanjing2_icon.png");
        $cvn2Num.attr("type", "number");
    });
    $(".yanjing_icon").on("touchend", function() {
        setTimeout(function() {
            setBackground("yanjing_icon.png");
            $cvn2Num.attr("type", "password");
        }, 3000);
    });

    function setBackground(pngName) {
        $(".yanjing_icon").css("background", 'url("../images/' + pngName + '")');
        $(".yanjing_icon").css("background-repeat", 'no-repeat');
        $(".yanjing_icon").css("background-position", '5px 5px');
        $(".yanjing_icon").css("background-size", '23px 14px');
    }
}

// 根据链接填写资料
function setInfo() {
    var nameKeys = ["creditCard", "hp_no", "verify_code", "id_no", "cvn2Num", "timeNum"];
    for (var i = 0, l = nameKeys.length; i < l; i++) {
        if (zcom.QueryString.GetValue(nameKeys[i]) && zcom.QueryString.GetValue(nameKeys[i]) != "") {
            $("[name=" + nameKeys[i] + "]").val(zcom.QueryString.GetValue(nameKeys[i]));
        }
    }
    view.spaceCardNum();
    view.spacePhoneNum();
    view.spaceuserId();

    if (zcom.QueryString.GetValue("cust_name") && zcom.QueryString.GetValue("cust_name") != "") {
        $("[name=cust_name]").val(decodeURI(zcom.QueryString.GetValue("cust_name")));
    }

    if (zcom.QueryString.GetValue("lfq_cnt") && zcom.QueryString.GetValue("lfq_cnt") != "") {
        $("#stageNumberBox>span").removeClass("checked");
        $("span[data-number='" + zcom.QueryString.GetValue("lfq_cnt") + "']").addClass("checked");
        stageNumber = parseInt(zcom.QueryString.GetValue("lfq_cnt"));
    }

    if (zcom.QueryString.GetValue("lfq_amt") && zcom.QueryString.GetValue("lfq_amt") != "") {
        if ($userPhone.val().replace(/ /g, "").length == 11) {
            $("#verifyBtn").removeClass("disabled");
        }
    }

    isDisabledSubmit();
}

// 根据本地存储SessionStorage填写资料
function setInfo() {
    if (creditCard && creditCard != "") {
        $creditCard.val(creditCard);
    }
    if (userName && userName != "") {
        $userName.val(userName);
    }
    if (userId && userId != "") {
        $userId.val(userId);
    }
    if (cvn2Num && cvn2Num != "") {
        $cvn2Num.val(cvn2Num);
    }
    if (timeNum && timeNum != "") {
        $timeNum.val(timeNum);
    }
    if (hp_no && hp_no != "") {
        $userPhone.val(hp_no);
    }
    if (verify_code && verify_code != "") {
        $verifyCode.val(verify_code);
    }
    if (lfq_amt && lfq_amt != "") {
        if ($userPhone.val().replace(/ /g, "").length == 11) {
            $("#verifyBtn").removeClass("disabled");
        }
    }
    view.spaceCardNum();
    view.spacePhoneNum();
    view.spaceuserId();
    isDisabledSubmit();
}


// 取本地存储SessionStorage
function getSessionStorage() {
    openid = sessionStorage.getItem("openid");
    cardFeeRate = sessionStorage.getItem("cardFeeRate");
    merName = sessionStorage.getItem("merName");
    merId = sessionStorage.getItem("merId");
    prdt_no = sessionStorage.getItem("prdt_no");
    lfq_amt = sessionStorage.getItem("lfq_amt");
    stageNumber = sessionStorage.getItem("lfq_cnt");
    lfq_cnt = sessionStorage.getItem("lfq_cnt");
    creditCard = sessionStorage.getItem("creditCard");
    userId = sessionStorage.getItem("userId");
    cvn2Num = sessionStorage.getItem("cvn2Num");
    userName = sessionStorage.getItem("userName");
    timeNum = sessionStorage.getItem("timeNum");
    hp_no = sessionStorage.getItem("hp_no");
    verify_code = sessionStorage.getItem("verify_code");

}