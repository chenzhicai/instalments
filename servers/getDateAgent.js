var Agent = require('../servers/agentservice.js');
var post_data = {
     "servlet_type": "query_openday"
};

var options = {
    hostname: 'wxtest.allinpaycard.com',  //'10.2.235.41',  //
//    hostname: '10.2.235.45',
//    port: '8080',
//    port: '18001',
    path: '/FuLiBao/LFQCreateOrderServlet',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};

function getAgent(theoptions,postData) {
    if(postData){
        post_data = postData;
    }
    if(theoptions && theoptions.path){
        options.path = theoptions.path;
        console.log("path----" + options.path);
    }
    console.log("###########*******__________")
    console.log(options);
    console.log(post_data)
    var theAgent = new Agent(options, post_data);

    return theAgent;
}

var agentObjet = getAgent({ hostname: 'wxtest.allinpaycard.com',
  path: '/FuLiBao/LFQCreateOrderServlet',
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
} },{ open_id: '6FNIUDMNr%2BaEvk9at%2BxbZNHbOmdtSGJjXfTYwKJ6Ogg%3D',
  serial_no: '011478656467580916',
  servlet_type: 'query_orderByOrderId' })
agentObjet.request();
module.exports = {
    getAgent: getAgent
};