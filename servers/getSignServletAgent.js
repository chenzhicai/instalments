var Agent = require('../servers/agentservice.js');
var post_data = {
    mapUrl: "/faceDetect/faceDetect.html"
};

var options = {
    hostname: 'dzc0cba0gi.proxy.qqbrowser.cc',
    //    port: 8002,
    path: '/liveDec/GetSignServlet',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};

function getAgent(theoptions, postData) {
    if (postData) {
        post_data = postData;
    }

    var theAgent = new Agent(options, post_data);

    return theAgent;
}

module.exports = {
    getAgent: getAgent
};