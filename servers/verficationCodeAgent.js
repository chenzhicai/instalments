var Agent = require('../servers/agentservice.js');
var post_data = {
    hp_no: "18616952720",
    orderid: "201702081016533722",
    idno:"350125198512230071"
};

var options = {
    hostname: 'dzc0cba0gi.proxy.qqbrowser.cc',
//    port: '8002',
    path: '/liveDec/SMSSendServlet',
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