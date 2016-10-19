// 获取url参数
var QueryString = {
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

function postAjax(url, param, callBack, asyncVal) {
    var av = asyncVal ? asyncVal : false;
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

function getAjax(url, param, callBack) {
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

//   不打包形式
/*
require.register("../components/winLocation.js", function(module, exports, require) {
    module.exports = {
        QueryString: QueryString,
        checkBrowser: checkBrowser,
        postAjax: postAjax,
        getAjax: getAjax
    }
});
*/
// 打包形式

module.exports = {
    QueryString: QueryString,
    checkBrowser: checkBrowser,
    postAjax: postAjax,
    getAjax: getAjax
}