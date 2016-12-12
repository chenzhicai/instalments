// 验证身份证格式
function isSFZNo(card) {
    var iscarNum = true;
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) { //身份证输入不合法
        iscarNum = false;
    }

    return iscarNum;
}

// 验证信用卡格式
function isXYKNum(sText) {
    if (sText.length >= 13 && sText.length <= 16) {
        var numStr2 = sText.match(/\d*/i)[0];
        return numStr2 == sText ? true : false;
    } else {
        return false;
    }
}

// 验证四位时间 2016年04月 0416
function isTimeNum(timeNum) {
    var istNum = true;
    if (timeNum.length < 4 || parseInt(timeNum.substr(0, 2)) > 12 || parseInt(timeNum.substr(0, 2)) < 1) {
        istNum = false;
    } else {
        //验证是否 大于现在
        istNum = isNextYearMonth(timeNum.substr(2, 2), timeNum.substr(0, 2));
    }


    return istNum;
}

// 年份大于现在 参数字符串数字'16':2016 ,16:2016。年份相同也是大于
function isNextYear(yearStr) {
    var isNext = "more"; // 默认年大于现在
    var theNow = new Date();
    yearStr = yearStr.toString();

    if (yearStr.length == 4) {
        if (theNow.getFullYear() > parseInt(yearStr)) {
            isNext = "less"; // 年份小于现在
        } else if (theNow.getFullYear() == parseInt(yearStr)) {
            isNext == "same" // 同样年份
        }
    } else if (yearStr.length > 4 || yearStr.length == 0) {
        isNext = "erro"; // 位数错误
    } else {
        theYear2 = theNow.getFullYear().toString().substr(2, 4);
        if (parseInt(theYear2) > parseInt(yearStr)) {
            isNext = "less";
        } else if (parseInt(theYear2) == parseInt(yearStr)) {
            isNext = "same" // 同样年份
        }
    }

    return isNext;
}

// 月份是否大于 现在
function isNextMonth(monthStr) {
    var isNext = true;
    var theNow = new Date();
    if (theNow.getMonth() > parseInt(monthStr) - 1) {
        isNext = false;
    }
    return isNext;
}

function isNextYearMonth(yearStr, monthStr) {
    var isMoreYear = isNextYear(yearStr);
    if (isMoreYear == "more") {
        return true;
    } else if (isMoreYear == "less") {
        return false;
    } else if (isMoreYear == "same") {
        if (isNextMonth(monthStr)) {
            return true;
        }
    } else {
        return false;
    }
}

//验证手机号
function isPhoneNumber(phoneNumber) {
    var reVisa = /\d{11}/;
    if (reVisa.test(phoneNumber)) {
        return true;
    } else {
        return false;
    }
}

// 检查中文名，不能包含非中文字符
function isCnName(cnName) {
    var cnNameLength = len(cnName);
    if (cnNameLength > 3 && cnNameLength < 20) {
        return true;
    } else {
        return false;
    }
}

//取字符串长度，中文算2位
function len(s) {
    var l = 0;
    var a = s.split("");
    for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            l++;
        } else {
            l += 2;
        }
    }
    return l;
}

// 验证输入是否为整数
function isNum(numStr, numLength) {
    if (numStr != null && numStr.length == numLength) {
        var numStr2 = numStr.match(/\d*/i)[0];
        return numStr2 == numStr ? true : false;
    }
    return false;
}

// 添加或移除错误提示
function addOrRemoveErro(isErro, erroId, erroText, $eventTargetParentNode) {
    var $erroDom = $("#" + erroId);
    if (isErro) {
        if ($erroDom.length > 0) {
            $erroDom.remove();
        }
    } else if ($erroDom.length == 0) {
        $eventTargetParentNode.after('<div class="input-erro" id="' + erroId + '">' + erroText + '！</div>');
    }
}

//   不打包形式
/*
require.register("./authentication.js", function(module, exports, require) {
    module.exports = {
        isSFZNo: isSFZNo,
        isXYKNum: isXYKNum,
        isTimeNum: isTimeNum,
        isPhoneNumber: isPhoneNumber,
        isCnName: isCnName,
        addOrRemoveErro: addOrRemoveErro,
        isNum: isNum
    }
});
*/
// 打包形式

module.exports = {
    isSFZNo: isSFZNo,
    isXYKNum: isXYKNum,
    isTimeNum: isTimeNum,
    isPhoneNumber: isPhoneNumber,
    isCnName: isCnName,
    addOrRemoveErro: addOrRemoveErro,
    isNum: isNum,
    strLen:len
}