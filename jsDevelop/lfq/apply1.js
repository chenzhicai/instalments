var wl = require("../components/winLocation.js");
var myDialog = require("./cmodal.js");
var num = require("../components/number.js");
var stageNumber = 6;
var cardFeeRate = 0.00;
var applyNum = 0.00;
var maxApply = 0.00;
var isAllow = false;
var openid = '';
var amtUplimit = 20000;
var amtLowLimit = 600;
var selectItems = [];
var rateArrays = [];
var lfq_mer_no = 0;

var merName, merId, sceneId, prdt_no;
$(function() {
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 通过下面这个API隐藏右上角按钮
        wx.hideOptionMenu();
    });
    wl.QueryString.Initial();
    initVale();
    getParameter();
    $("#applyInstalmentNum").on("input", inputApplyInstalmentNum);
    inint();
    initAgreementCheck();
    $("#next-step").on("touchstart", function() {
        nextStepFunc();
    });
    setContractHref();
});

//  设置合同的连接
function setContractHref() {
    var theHref = "contract.html?openid=" + openid + "&sceneId=" + sceneId + "&cardFeeRate=" + cardFeeRate + "&merId=" + merId + "&merName=" + merName + "&lfq_cnt=" + stageNumber;
    if (applyNum != 0.00 && applyNum != "") {
        theHref += "&lfq_amt=" + applyNum;
    }
    $("#contract").attr("href", theHref);

}

//  初始化变量
function initVale() {
    sceneId = wl.QueryString.GetValue("sceneId");
    /*    cardFeeRate = parseFloat(wl.QueryString.GetValue("cardFeeRate"));
        merName = wl.QueryString.GetValue("merName");
        merId = wl.QueryString.GetValue("merId");*/
    openid = wl.QueryString.GetValue("openid");

    if (wl.QueryString.GetValue("lfq_cnt")) {
        stageNumber = wl.QueryString.GetValue("lfq_cnt");
    }


}

// 请求期数和费率
function getParameter() {
    var param = {
        "servlet_type": "query_mer_info",
        "sceneId": sceneId
    }
    wl.postAjax(LFQ_ORDER_CREATE_URL, param, parameterCallBack);
}

// 请求期数回调函数
function parameterCallBack(retn) {

    console.log(retn);
    if (retn.lfq_merinfo_response) {
        lfq_mer_no = retn.lfq_merinfo_response.lfq_mer_no;
        var merinfo = retn.lfq_merinfo_response;
        merName = merinfo.mer_short_name ? merinfo.mer_short_name : merinfo.mer_name;
        if (merinfo.mer_name) {
            document.title = decodeURI(merName);
        }
        merId = merinfo.mer_id;
        if (merinfo.mer_prdt_rate_arrays) { // 过渡先取6期12期
            rateArrays = merinfo.mer_prdt_rate_arrays.mer_prdt_rate;
            var rateArrays0 = rateArrays[0];
            sessionStorage.setItem("prdtNo",rateArrays[0].prdtNo);
            for (var i = 0, l = rateArrays.length; i < l; i++) {
                if (parseInt(rateArrays[i].stageCount) == parseInt(stageNumber)) {
                    rateArrays0 = rateArrays[i];
                }
                var eachItem = {};
                eachItem.title = rateArrays[i].stageCount + "期";
                eachItem.value = rateArrays[i].custRate;
                selectItems.push(eachItem);
            }
            initRateInput(rateArrays0);
        }
    }
    if (selectItems.length == 0) {
        myDialog.setModalBody('<p>商家未设置费率</p>', 'tishuModal')
        myDialog.showModals("tishuModal");
    }
    creatSelect(selectItems);

}

// 找出选中的期数数据
function getSelectItem(stageNumber) {
    var rateArrays0 = [];
    for (var i = 0, l = rateArrays.length; i < l; i++) {
        if (parseInt(rateArrays[i].stageCount) == parseInt(stageNumber)) {
            rateArrays0 = rateArrays[i];
        }
    }

    return rateArrays0;
}

// 设置最高额度 和最低额度
function setlimit(selectRateItem) {
    amtUplimit = selectRateItem.amtUplimit ? selectRateItem.amtUplimit : 20000;
    amtLowLimit = selectRateItem.amtLowLimit ? selectRateItem.amtLowLimit : 600;
}

// 创建分期选项插件
function creatSelect(selectItems) {
    selectItems.sort(function(a, b) {
        return parseInt(a.title) - parseInt(b.title)
    });
    $("#rate").select({
        title: "分期期数",
        items: selectItems,
        onChange: function(d) {
            cardFeeRate = d.values;
            stageNumber = parseInt(d.titles);
            var selectRateItem = getSelectItem(stageNumber);
            setlimit(selectRateItem);
            maxApply = amtUplimit / (1 + cardFeeRate / 100);
            allowApplyNum();
            computesEachPayNumber();
            isDisabledNext();
            $("#applyInstalmentNum").attr("placeholder", "目前只支持" + amtLowLimit + "-" + Math.floor(maxApply));
            $("#maxApplyNum").text(Math.floor(maxApply));
            $("#minApplyNum").text(amtLowLimit);
            setContractHref();
        }
    });
}

function initRateInput(rateArrays0) {
    prdt_no = rateArrays0.prdtNo;
    setlimit(rateArrays0);
    stageNumber = parseInt(rateArrays0.stageCount);
    $("#rate").val(rateArrays0.stageCount + "期");
    $("#rate").attr("data-values", rateArrays0.custRate);
    cardFeeRate = rateArrays0.custRate;
}

// 初始化页面
function inint() {
    maxApply = amtUplimit / (1 + cardFeeRate / 100);
    $("#maxApplyNum").text(Math.floor(maxApply));
    $("#minApplyNum").text(amtLowLimit);
    $("#applyInstalmentNum").attr("placeholder", "目前只支持" + amtLowLimit + "-" + Math.floor(maxApply));
    //    $("#merName").text(decodeURI(merName));
    setEachFee();
    if (wl.QueryString.GetValue("lfq_cnt")) {
        stageNumber = parseInt(wl.QueryString.GetValue("lfq_cnt"));
        var theselecter = 'span[data-number="' + stageNumber + '"]';
        var $parentNode = $(theselecter);
        //        setStageNumClass($parentNode);
    }
    if (wl.QueryString.GetValue("lfq_amt")) {
        $("#applyInstalmentNum").val(wl.QueryString.GetValue("lfq_amt"));
        inputApplyInstalmentNum();
    }
    if ($("#applyInstalmentNum").val() != "") {
        inputApplyInstalmentNum();
    }
}

// 申请金额输入
function inputApplyInstalmentNum() {
    $applyInstalmentNum = $("#applyInstalmentNum");
    num.input2bit($applyInstalmentNum[0]);
    num.deleteNoNumber($applyInstalmentNum[0]);
    num.monreMax($applyInstalmentNum[0], num.hold2bit(maxApply));
    applyNum = $applyInstalmentNum.val();
    if (applyNum == "") {
        applyNum = 0.00;
    } else {
        applyNum = parseFloat(applyNum);
    }

    computesEachPayNumber();
    allowApplyNum();
    isDisabledNext();
    setContractHref();
}



// 技术总金额，和每期金额
function computesEachPayNumber() {
    setEachFee();
    var contentMonet = parseFloat(applyNum * (parseFloat(cardFeeRate) / 100) + 0.00001 + applyNum).toFixed(2);

    var eachMoney = num.hold2bit(parseFloat(contentMonet) / stageNumber);
    var eachPrincipal = num.hold2bit(applyNum / stageNumber);
    var eachFeeNum = parseFloat(eachMoney) - parseFloat(eachPrincipal);
    $("#eachFee").next().text(Math.round(parseFloat(applyNum) * parseFloat(cardFeeRate)) / 100);
    $(".eachFeeNum").text(eachFeeNum.toFixed(2));
    $("#eachPrincipal").text(eachPrincipal);
    $("#eachMoney").text(eachMoney);
    //    $("#countMoney").text(contentMonet);
}

function setEachFee() {
    var eachFee = cardFeeRate / stageNumber;
    $("#eachFee").text((eachFee + 0.0001).toFixed(2) + '%');
}

// 提示是否在允许的申请金额内
function allowApplyNum() {

    if (applyNum < amtLowLimit || applyNum > maxApply) {
        isAllow = false;
        $("label[for=applyInstalmentNum]").next().show();
    } else {
        isAllow = true;
        $("label[for=applyInstalmentNum]").next().hide();
    }

    return isAllow;
}

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

// 是否允许下一步
function isDisabledNext(argument) {

    var agreementValue = $("#agreement-check").is(":checked");
    if (agreementValue && isAllow && selectItems.length != 0 /* && lfq_mer_no == "1"*/ ) {
        $("#next-step").attr("class", "weui_btn weui_btn_primary");
        setApplySessionStorage();
    } else {
        $("#next-step").attr("class", "weui_btn weui_btn_disabled weui_btn_default");
    }
}

// 下一步 拼参数 发起请求
function nextStepFunc() {
    if (selectItems.length == 0) {
        myDialog.setModalBody('<p>商家未设置费率</p>', 'tishuModal')
        myDialog.showModals("tishuModal");
        return;
    }
    var agreementValue = $("#agreement-check").is(":checked");
    if (agreementValue && isAllow) {        
        window.location.href = "applyNextStep.html"+location.search;
    }
}

// 设置本地存储SessionStorage
function setApplySessionStorage() {
    sessionStorage.setItem("lfq_amt", applyNum);
    sessionStorage.setItem("lfq_cnt", stageNumber);
    sessionStorage.setItem("openid", openid);
    sessionStorage.setItem("sceneId", sceneId);
    sessionStorage.setItem("merId", merId);
    sessionStorage.setItem("cardFeeRate", cardFeeRate);
    sessionStorage.setItem("merName", merName);
    sessionStorage.setItem("prdt_no", prdt_no);
}