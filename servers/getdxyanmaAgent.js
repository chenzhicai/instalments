var Agent = require('../servers/agentservice.js');
var post_data = {
    hp_no: "18616952720",
    openid:"6FNIUDMNr%2BaEvk9at%2BxbZNHbOmdtSGJjXfTYwKJ6Ogg%3D",
    prdt_no:0200
};

var options = {
    hostname: 'wxtest.ulinkpay.com',
//    port: '8002',
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