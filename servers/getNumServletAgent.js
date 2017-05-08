var Agent = require('../servers/agentservice.js');
var post_data = {
    orderId: "UyDL7d7VXqVWtDX2KF%2F%2BPl7Nf%2FDlfn6z%0D%0A",
    sign: "YzI4MGVhZTRhNjNiZTYwODU3ZDgyMmE2ZTE3Njc0MjU%3D"
};

var options = {
    hostname: 'dzc0cba0gi.proxy.qqbrowser.cc',
//    port: 8002,
    path: '/liveDec/GetCheckNumServlet',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};

function getAgent(theoptions,postData) {
    if(postData){
        post_data = postData;
    }
    
    var theAgent = new Agent(options, post_data);

    return theAgent;
}

module.exports = {
    getAgent: getAgent
};