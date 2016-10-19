// 验证身份证格式
authentication = {};
authentication.isSFZNo = function(card) {
    var iscarNum = true;
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) { //身份证输入不合法
        iscarNum = false;
    }

    return iscarNum;
}

// 验证信用卡格式
authentication.isXYKNum = function(sText) {
    if (sText.length > 12 && sText.length < 17) {
        return true;
    } else {
        return false;
    }
}

// 验证四位时间 2016年04月 0416
authentication.isTimeNum = function(timeNum) {
    var istNum = true;
    if (timeNum.length < 4 || parseInt(timeNum.substr(0, 2)) > 12 || parseInt(timeNum.substr(0, 2)) < 1) {
        istNum = false;
    }

    return istNum;
}

//验证手机号
authentication.isPhoneNumber = function(phoneNumber) {
    var reVisa = /\d{11}/;
    if (reVisa.test(phoneNumber)) {
        return true;
    } else {
        return false;
    }
}

// 检查中文名，不能包含非中文字符
authentication.isCnName = function(cnName) {
    var cnNameLength = cnName.length;
    var mathArrayLength = cnName.match(/[\u4e00-\u9fa5]/g) ? cnName.match(/[\u4e00-\u9fa5]/g).length : 0;
    if (cnNameLength == mathArrayLength && cnNameLength < 9 && cnNameLength != 0) {
        return true;
    } else {
        return false;
    }
}

// 添加或移除错误提示
authentication.addOrRemoveErro = function(isErro, erroId, erroText, $eventTargetParentNode) {
    var $erroDom = $("#" + erroId);
    if (isErro) {
        if ($erroDom.length > 0) {
            $erroDom.remove();
        }
    } else if ($erroDom.length == 0) {
        $eventTargetParentNode.after('<div class="input-erro" id="' + erroId + '">' + erroText + '！</div>');
    }
}