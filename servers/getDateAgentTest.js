var Agent = require('../servers/agentservice.js');
var post_data = {
     "servlet_type": "query_openday"
};

var options = {
    hostname: 'wxtest.ulinkpay.com',  //'10.2.235.41',  //
//    hostname:'cardtest.ulinkpay.com',
//    hostname:'10.2.235.41',
//      hostname:'10.2.235.42',
//      hostname:'10.2.235.33',
//    port: '18001',
//      port: '18007',
//    port: '8080',
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
        console.log("++++++++++++++++++---" +theoptions.hostname + "++++++" +theoptions.port)
    }
/*    if(theoptions && theoptions.hostname){
        options.hostname = theoptions.hostname;

        console.log("++++++++wxtest.ulinkpay.comwxtest.ulinkpay.com++++++++++---" +theoptions.hostname + "++++++" +theoptions.port)
    }
    if(theoptions && theoptions.port){
        options.port = theoptions.port;
        console.log("++++++++++++++++++---" +theoptions.port + "++++++" +theoptions.port)
    }*/
    console.log(options);
    var theAgent = new Agent(options, post_data);

    return theAgent;
}

module.exports = {
    getAgent: getAgent
};
