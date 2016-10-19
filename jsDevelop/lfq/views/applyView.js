/* 间隔身份证号 */
function spaceuserId() {
    var $userId = $("#user-id"),
        userIdVal = $userId.val(),
        needUserIdVal = $userId.val().replace(/ /g, "");
    if (needUserIdVal.length > 6 && needUserIdVal.length <= 14) {
        userIdVal = needUserIdVal.substr(0, 6) + "  " + needUserIdVal.substr(6);
    } else if (needUserIdVal.length > 14) {
        userIdVal = needUserIdVal.substr(0, 6) + "  " + needUserIdVal.substr(6, 8) + "  " + needUserIdVal.substr(14);
    }
    $userId.val(userIdVal);
}

/* 间隔手机号 */
function spacePhoneNum() {
    $userPhone = $("#user-phone"),
        userPhoneVal = $userPhone.val(),
        needPhoneVal = $userPhone.val().replace(/ /g, "");
    if (needPhoneVal.length > 3 && needPhoneVal.length < 7) {
        userPhoneVal = needPhoneVal.substr(0, 3) + "  " + needPhoneVal.substr(3);

    } else if (needPhoneVal.length > 7) {
        userPhoneVal = needPhoneVal.substr(0, 3) + "  " + needPhoneVal.substr(3, 4) + "  " + needPhoneVal.substr(7);
    }
    $userPhone.val(userPhoneVal);
}

/* 间隔信用卡号 */
function spaceCardNum() {
    $creditCard = $("#creditCard"),
        creditCardVal = $creditCard.val(),
        needCardVal = $creditCard.val().replace(/ /g, "");
    if (needCardVal.length == 5) {
        creditCardVal = needCardVal.substr(0, 4) + "  " + needCardVal.substr(4);

    } else if (needCardVal.length == 9) {
        creditCardVal = needCardVal.substr(0, 4) + "  " + needCardVal.substr(4, 4) + "  " + needCardVal.substr(8);
    } else if (needCardVal.length == 13) {
        creditCardVal = needCardVal.substr(0, 4) + "  " + needCardVal.substr(4, 4) + "  " + needCardVal.substr(8, 4) + "  " + needCardVal.substr(12);
    }
    $creditCard.val(creditCardVal);
}

/* 删除分隔符 */
function deleteSpace(eventCode, selector) {
    if (eventCode == 8) {
        /* 按backspace键 */
        $selector = $(selector);
        selectorValue = $selector.val();
        while (selectorValue[selectorValue.length - 1] == " ") {
            selectorValue = selectorValue.substr(0, selectorValue.length - 1)
        }
        $(selector).val(selectorValue);
    }

}

/* 删除最后一个键盘输入不是数字 */
function deleteNoNumber(_this) { 
//    var codeValue = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+.,?;:'|-·";
    var reg = /[^\d]/;
    $_this = $(_this);
    var thisValue = $_this.val();
    var lastCode = thisValue[thisValue.length-1];
    if (reg.test(lastCode)) {
        $(_this).val(thisValue.replace(/[^\d]/g,""));
    }
}

// 获得焦点
function getFocus(focusId) {
    if (event.keyCode == 13) {
        $(focusId).focus();
    }
}

// 清除"数字"和"."以外的字符
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}

/*
// 不打包形式  要加载requrie.js
require.register("./views/applyView.js", function(module, exports, require) {
    module.exports = {
        spaceuserId: spaceuserId,
        spacePhoneNum: spacePhoneNum,
        getFocus: getFocus,
        spaceCardNum:spaceCardNum,
        clearNoNum: clearNoNum,
        deleteSpace: deleteSpace,
        deleteNoNumber: deleteNoNumber

    };
});
*/
// 打包形式

module.exports = {
    spaceuserId: spaceuserId,
    spacePhoneNum: spacePhoneNum,
    getFocus: getFocus,
    spaceCardNum: spaceCardNum,
    clearNoNum: clearNoNum,
    deleteSpace: deleteSpace,
    deleteNoNumber: deleteNoNumber
}
