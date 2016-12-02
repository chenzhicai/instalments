var getLocation,openLocation;

// 获取config配置数据
function getConfig(param) {
    var locationObject;
    $.ajax({
        type: 'post',
        dataType: "json",
        url: LFQ_PLACE_URL,
        data: param,
        cache: false,
        async: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(msg) {
            console.dir(msg);
            locationObject = msg;
            setConfig(msg);
        },
        error: function(msg) {
            var response = JSON.parse(msg.response);
            console.dir(response);
            setConfig(response);

        }
    });

    return locationObject;
}


function setConfig(msg) {
    wx.config({
        debug: false,
        appId: msg.appid, //'wxf8b4f85f3a794e77',
        timestamp: msg.timestamp,
        nonceStr: msg.nonceStr,
        signature: msg.signature,
        jsApiList: [
            'openLocation',
            'getLocation'
        ]
    });

}

// 打包形式

module.exports = {
    getConfig: getConfig,
    getLocation: getLocation,
    openLocation: openLocation
}