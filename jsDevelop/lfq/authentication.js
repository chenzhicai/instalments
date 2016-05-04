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
    if (sText.length > 12 && sText.length < 17) {
        return true;
    } else {
        return false;
    }
}

// 验证四位时间 2016年04月 0416
function isTimeNum(timeNum) {
    var istNum = true;
    if (timeNum.length < 4 || parseInt(timeNum.substr(0, 2)) > 12 || parseInt(timeNum.substr(0, 2)) < 1) {
        istNum = false;
    }

    //验证是否 大于现在
//    istNum = isNextYearMonth(timeNum.substr(0, 2),timeNum.substr(2, 2));
    return istNum;
}

// 年份大于现在 参数字符串数字'16':2016 ,16:2016。年份相同也是大于
function isNextYear(yearStr) {
    var isNext = true;
    var theNow = new Date();
    yearStr = yearStr.toString();

    if (yearStr.length == 4) {
        if (theNow.getFullYear() > parseInt(yearStr)) {
            isNext = false;
        }
    } else if (yearStr.length > 4 || yearStr.length == 0) {
        isNext = false;
    } else {
        theYear2 = theNow.getFullYear().toString().substr(2, 4);
        if (parseInt(theYear2) > parseInt(yearStr)) {
            isNext = false;
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
}

function isNextYearMonth(yearStr, monthStr) {
    var isNext = false;
    if (isNextYear(yearStr)) {
        if (isNextMonth(monthStr)) {
            isNext = true;
        }
    }

    return isNext;
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
    var cnNameLength = cnName.length;
    var mathArrayLength = cnName.match(/[\u4e00-\u9fa5]/g) ? cnName.match(/[\u4e00-\u9fa5]/g).length : 0;
    if (cnNameLength == mathArrayLength && cnNameLength < 9 && cnNameLength != 0) {
        return true;
    } else {
        return false;
    }
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

module.exports = {
    isSFZNo: isSFZNo,
    isXYKNum: isXYKNum,
    isTimeNum: isTimeNum,
    isPhoneNumber: isPhoneNumber,
    isCnName: isCnName,
    addOrRemoveErro: addOrRemoveErro
}