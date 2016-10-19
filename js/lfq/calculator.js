$(function() {
    $("#xzms").bind("change", changePlan);
    $("#ainputBox input").bind("input", ainputChange);
    $("#binputBox input").bind("input", binputChange);
    $("#spje").bind("input", spjeChange);
});

// 选择模式改变
function changePlan() {
    var xzValue = $("#xzms").val();
    console.log(xzValue);
    if (xzValue == "1") {
        setClassBc($("#ainputBox"));
        $("#binputBox input").attr("placeholder", "自动计算，不可修改");
        $("#binputBox input").attr("readonly", "readonly");
        $("#ainputBox input").attr("placeholder", "请输入");
        $("#ainputBox input").removeAttr("readonly");
    } else if (xzValue == "2") {
        setClassBc($("#binputBox"));
        $("#binputBox input").attr("placeholder", "请输入");
        $("#binputBox input").removeAttr("readonly");
        $("#ainputBox input").attr("placeholder", "自动计算，不可修改");
        $("#ainputBox input").attr("readonly", "readonly");
    } else if (xzValue == "3") {
        setClassBc($("#ainputBox"));
        $("#binputBox input").attr("placeholder", "自动计算，不可修改");
        $("#binputBox input").attr("readonly", "readonly");
        $("#ainputBox input").attr("placeholder", "请输入");
        $("#ainputBox input").removeAttr("readonly");
    } else if (xzValue == "4") {
        $("#ainputBox input").attr("placeholder", "请输入");
        $("#ainputBox input").removeAttr("readonly");
        $("#binputBox input").attr("placeholder", "请输入");
        $("#binputBox input").removeAttr("readonly");
        $("#ainputBox").addClass("bc");
        $("#binputBox").addClass("bc");
    }
    initInput();
}

function setClassBc(selectBox) {
    $("#ainputBox").removeClass("bc");
    $("#binputBox").removeClass("bc");
    selectBox.addClass("bc");
}

function initInput() {
    var xzmsVal = $("#xzms").val();
    $("#ainputBox input").val("");
    $("#binputBox input").val("");
    $("#jsje").text("");
    if (xzmsVal == "3") {
        $("#binputBox input").val("0.00");
        $("#zje").text(hold2bit($("#spje").val()) );
    } else if (xzmsVal == "1" || xzmsVal == "2") {
        $("#jsje").text(hold2bit($("#spje").val()));
        $("#zje").text("");
    } else if (xzmsVal == "4") {
        $("#jsje").text("");
        $("#zje").text("");
    }
}

function ainputChange() {
    input2bit($("#ainputBox input")[0]);
    console.log("ainputChange");
    var xzmsVal = $("#xzms").val();
    var aVal = parseFloat($("#ainputBox input").val());
    if ($("#ainputBox input").val() == "") {
        aVal = 0;
    }
    if (xzmsVal == "1") {
        var bval = hold2bit(parseFloat(Math.ceil(aVal / (100 - aVal) * 10000)) / 100);
        $("#binputBox input").val(bval);
        setMoney(bval);
    } else if (xzmsVal == "3") {
        setMoney3(aVal / 100);
    } else if (xzmsVal == "4") {
        setMoney4();
        setMoney4_2();
    }

}

function binputChange() {
    input2bit($("#binputBox input")[0]);
    var xzmsVal = $("#xzms").val();
    if (xzmsVal != "4") {
        var bVal = $("#binputBox input").val();
        if(bVal == ""){
            bVal =0.00;
        }
        bVal = parseFloat(bVal);
        var aVal = hold2bit(bVal / (100 + bVal) * 100);
        $("#ainputBox input").val(aVal);
        setMoney(bVal);
    } else {
        setMoney4_2();
        setMoney4();
    }

}

function spjeChange() {
    input2bit($("#spje")[0]);
    var xzmsVal = $("#xzms").val();
    if (xzmsVal == "1" || xzmsVal == "2") {
        var binputVal = $("#binputBox input").val();
        if (binputVal == "") {
            binputVal = 0.00;
        }
        setMoney(binputVal);
    } else if (xzmsVal == "3") {

        var aVal = parseFloat($("#ainputBox input").val()) / 100;
        if ($("#ainputBox input").val() == "") {
            aVal = 0.00;
        }
        setMoney3(aVal);
    } else if (xzmsVal == "4") {
        setMoney4();
        setMoney4_2();
    }
}

function setMoney(bval) {
    var spjeVal = $("#spje").val();
    if (spjeVal == "") {
        spjeVal = 0.00;
    }
    var zjeVal = (parseFloat(spjeVal) * (1 + parseFloat(bval) / 100) + 0.0001).toFixed(2);
    $("#zje").text(zjeVal);
    $("#jsje").text(spjeVal);
}

function setMoney3(aval) {
    var spjeVal = $("#spje").val();
    var zjeVal = (parseFloat(spjeVal) * (1 - aval) + 0.0001).toFixed(2);
    $("#jsje").text(zjeVal);
}

function setMoney4() {
    var ainputVal = $("#ainputBox input").val();
    var spjeVal = $("#spje").val();
    if (ainputVal == "") {
        ainputVal = 0.00;
    } else {
        ainputVal = parseFloat($("#ainputBox input").val()) / 100;
    }
    if (spjeVal == "") {
        spjeVal = 0.00;
    } else {
        spjeVal = parseFloat(spjeVal);
    }
    var binputVal = $("#binputBox input").val();
    if (binputVal == "") {
        binputVal = 0.00;
    } else {
        binputVal = parseFloat($("#binputBox input").val()) / 100;
    }

    var jsjeVal = (spjeVal * (1 + binputVal) * (1 - ainputVal) + 0.0001).toFixed(2);
    $("#jsje").text(jsjeVal);
}

function setMoney4_2() {
    var spjeVal = $("#spje").val();
    if (spjeVal == "") {
        spjeVal = 0.00;
    } else {
        spjeVal = parseFloat(spjeVal);
    }

    var binputVal = $("#binputBox input").val();
    if (binputVal == "") {
        binputVal = 0.00;
    } else {
        binputVal = parseFloat($("#binputBox input").val()) / 100;
    }
    var zjeVal = (parseFloat((spjeVal * (1 + binputVal) + 0.0001).toFixed(2)) + 0.0001).toFixed(2);
    $("#zje").text(zjeVal);
}


// 截取两位小数
function hold2bit(theNum) {
    var theNum2bit = String(theNum);
    if (String(theNum).match(/[0-9,]{0,}\.\d\d/)) {
        theNum2bit = String(theNum).match(/[0-9,]{0,}\.\d\d/)[0];
    } else if (String(theNum).match(/[0-9,]{0,}\.\d/)) {
        theNum2bit += '0';
    } else if (String(theNum).match(/[0-9,]{0,}\./)) {
        theNum2bit += '00';
    } else if (String(theNum).match(/[0-9,]{0,}/)) {
        theNum2bit += '.00';
    }
    return theNum2bit;
}

// 清除"数字"和"."以外的字符
function clearNoNum(obj) {
    obj.value = parseFloat(obj.value.replace(/[^\d.]/g, "")); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}

// input输入多于2位小数保留两位小数
function input2bit(obj) {
    if (obj.value.search(/\.\d{3,}/) != -1) {
        clearNoNum(obj);
    }
}
