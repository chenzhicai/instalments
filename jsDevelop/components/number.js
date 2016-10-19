// 清除"数字"和"."以外的字符
function clearNoNum(obj) {
    obj.value = parseFloat(obj.value.replace(/[^\d.]/g, "")); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}

// 把输入的大于可输入的最大值时，替换成最大值
function monreMax(obj, max) {
    inputValue = obj.value;
    if (parseFloat(inputValue) > parseFloat(max)) {
        obj.value = max;
    }
}

// 保留两位小数
function input2bit(obj) {
    if (obj.value.search(/\.\d{3,}/) != -1) {
        clearNoNum(obj);
    }
}

// 禁止数字和.以外的字符输入
function deleteNoNumber(obj) {
    var reg = /[^\d.]/;
    if (reg.test(obj.value) || obj.value == "") {
        obj.value = obj.value.replace(/[^\d.]/g, "");
    }
}

// 截取两位小数
function hold2bit(theNum) {
    var theNum2bit = String(theNum);
    if(String(theNum).match(/[0-9,]{0,}\.\d\d/)){
        theNum2bit = String(theNum).match(/[0-9,]{0,}\.\d\d/)[0];
    }else if(String(theNum).match(/[0-9,]{0,}\.\d/)){
        theNum2bit += '0';
    }else if(String(theNum).match(/[0-9,]{0,}\./)){
        theNum2bit += '00';
    }else if(String(theNum).match(/[0-9,]{0,}/)){
        theNum2bit += '.00';
    }
    return theNum2bit;
}



// 打包形式

module.exports = {
    clearNoNum: clearNoNum,
    monreMax: monreMax,
    input2bit: input2bit,
    deleteNoNumber: deleteNoNumber,
    hold2bit: hold2bit
}