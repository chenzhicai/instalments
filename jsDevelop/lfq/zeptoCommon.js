(function init() {
    $("input").on("keyup", function() {
        if ($(event.target).val() != "") {
            $(event.target).removeClass("light");
        } else {
            $(event.target).addClass("light");
        }
    })
})();

function getAjax(url, param, callBack) {
    $.ajax({
        type: 'post',
        dataType: "json",
        url: url,
        data: param,
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(msg) {
            callBack(msg);
        },
        error: function(msg) {
            callBack(msg);
        }
    });
}

function getUrlAjax(url, param, callBack) {
    $.ajax({
        type: 'get',
        dataType: "json",
        url: url,
        data: param,
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(msg) {
            callBack(msg);
        },
        error: function(msg) {
            callBack(msg);
        }
    });
}

// 获取url参数
window.QueryString = {
    data: {},
    Initial: function() {
        var aPairs, aTmp;
        var queryString = new String(window.location.search);
        queryString = queryString.substr(1, queryString.length);
        aPairs = queryString.split("&");
        for (var i = 0; i < aPairs.length; i++) {
            aTmp = aPairs[i].split("=");
            this.data[aTmp[0]] = aTmp[1];
        }
    },
    GetValue: function(key) {
        return this.data[key];
    }
}

//移动端检查
function checkBrowser() {
    var u = navigator.userAgent.toLowerCase();
    if (u.indexOf('mobile') == -1 && u.indexOf('iphone') == -1) {
        window.location.href = "../error_browser.html";
    }
}

// 注册真实点击
function registerReallyClick($selector) {
    var falg = false;
    $selector.on('touchstart', function() {
        falg = false;
    });
    $selector.on('touchmove', function() {
        falg = true;
    });
    $selector.on('touchend', function() {
        if (!falg) {
            $selector.trigger("reallyClick", [$(event.target)]);
        }
    });
}

/*
// 不打包形式
require.register("./zeptoCommon.js", function(module, exports, require) {
    module.exports = {
        getAjax: getAjax,
        getUrlAjax: getUrlAjax,
        checkBrowser: checkBrowser,
        registerReallyClick: registerReallyClick
    }
});
*/

// 打包形式
module.exports = {
    getAjax: getAjax,
    getUrlAjax: getUrlAjax,
    checkBrowser: checkBrowser,
    registerReallyClick: registerReallyClick
}
