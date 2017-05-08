var Agent = require('../servers/agentservice.js');
var post_data = {
     "servlet_type": "query_openday"
};

var options = {
    hostname: 'wxtest.ulinkpay.com',
//    port: '18001',
    path: '/FuLiBao/LFQSendSMSServlet',
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