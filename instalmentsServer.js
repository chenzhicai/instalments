var express = require('express');
var session = require('express-session');
// var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser');
var util = require('util');

var dataAgent = require('./servers/getDateAgent.js');


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
// app.use(cookieParser());

app.use(session({
    secret: '12345',
    name: 'sessionID', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: "2342312324423", //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));
app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/html/qrcodePay.html', function(req, res) {
    res.sendFile(__dirname + "/html/qrcodePay.html");
});
app.get('/html/applyNextStep.html', function(req, res) {
    res.sendFile(__dirname + "/html/applyNextStep.html");
});

app.get('/html/applyInstalment.html', function(req, res) {
    res.sendFile(__dirname + "/html/applyInstalment.html");
});
app.get('/html/instalmentSearch.html', function(req, res) {
    res.sendFile(__dirname + "/html/instalmentsSearch.html");
});

app.get('/html/calculator.html', function(req, res) {
    res.sendFile(__dirname + "/html/calculator.html");
});
app.get('/html/contract.html', function(req, res) {
    res.sendFile(__dirname + "/html/contract.html");
});
app.get('/html/flbHome.html', function(req, res) {
    res.sendFile(__dirname + "/html/flbHome.html");
});
app.get('/html/instalmentsSearch.html', function(req, res) {
    res.sendFile(__dirname + "/html/instalmentsSearch.html");
});
app.get('/html/orderDetails.html', function(req, res) {
    res.sendFile(__dirname + "/html/orderDetails.html");
});



app.get('/js/libs/flexible.js', function(req, res) {
    res.sendFile(__dirname + "/js/libs/flexible.js");
});
app.get('/js/libs/jquery-1.11.1.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/libs/jquery-1.11.1.min.js");
});

app.get('/js/libs/jquery-3.1.1.js', function(req, res) {
    res.sendFile(__dirname + "/js/libs/jquery-3.1.1.js");
});
app.get('/js/libs/jquery.mobile-1.4.5.js', function(req, res) {
    res.sendFile(__dirname + "/js/libs/jquery.mobile-1.4.5.js");
});
app.get('/js/libs/jquery.mobile-1.4.5.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/libs/jquery.mobile-1.4.5.min.js");
});

app.get('/js/libs/zepto.js', function(req, res) {
    res.sendFile(__dirname + "/js/libs/zepto.js");
});
app.get('/js/lfq/jquery-weui.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/jquery-weui.min.js");
});
app.get('/js/lfq/apply.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/apply.min.js");
});
app.get('/js/lfq/jquery-weui.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/jquery-weui.min.jss");
});
app.get('/js/lfq/jquery-weui.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/jquery-weui.min.jss");
});


app.get('/js/lfq/zepto.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/zepto.min.js");
});
app.get('/js/lfq/jquery-1.11.1.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/jquery-1.11.1.min.js");
});

app.get('/js/lfq/JsBarcode.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/JsBarcode.js");
});
app.get('/js/lfq/JsBarcode.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/JsBarcode.js");
});
app.get('/js/lfq/CODE128.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/CODE128.js");
});
app.get('/js/lfq/jquery.qrcode-0.12.0.js ', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/jquery.qrcode-0.12.0.js ");
});
app.get('/js/lfq/CODE39.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/CODE39.js");
});
app.get('/js/lfq/contract.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/contract.js");
});


app.get('/js/lfq/applyNextStep.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/applyNextStep.min.js");
});
app.get('/js/lfq/common.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/common.min.js");
});
app.get('/js/lfq/orderDetails.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/orderDetails.min.js");
});
app.get('/js/lfq/instalmentsSearch.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/instalmentsSearch.min.js");
});

app.get('/js/lfq/qrcodePay.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/qrcodePay.min.js");
});
app.get('/js/lfq/urlVar.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/urlVar.js");
});
app.get('/js/lfq/JsBarcode.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/JsBarcode.js");
});
app.get('/js/lfq/jquery.qrcode-0.12.0.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/jquery.qrcode-0.12.0.js");
});
app.get('/js/lfq/iscroll5.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/iscroll5.js");
});
app.get('/js/lfq/contract.js ', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/contract.js ");
});


app.get('/css/qrcodePay.css', function(req, res) {
    res.sendFile(__dirname + "/css/qrcodePay.css");
});
app.get('/css/applyInstalment2.css', function(req, res) {
    res.sendFile(__dirname + "/css/applyInstalment2.css");
});
app.get('/css/instalmentsSearch.css', function(req, res) {
    res.sendFile(__dirname + "/css/instalmentsSearch.css");
});
app.get('/css/orderDetails.css', function(req, res) {
    res.sendFile(__dirname + "/css/orderDetails.css");
});
app.get('/css/contract.css', function(req, res) {
    res.sendFile(__dirname + "/css/contract.css");
});


app.get('/dist/fonts/fontawesome-webfont.eot', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/fontawesome-webfont.eot");
});
app.get('/dist/fonts/fontawesome-webfont.ttf', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/fontawesome-webfont.ttf");
});
app.get('/dist/fonts/fontawesome-webfont.woff', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/fontawesome-webfont.woff");
});
app.get('/dist/fonts/fontawesome-webfont_2d2816fe.eot', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/fontawesome-webfont_2d2816fe.eot");
});
app.get('/dist/fonts/montserrat-bold-webfont.eot', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-bold-webfont.eot");
});
app.get('/dist/fonts/montserrat-bold-webfont.svg', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-bold-webfont.svg");
});
app.get('/dist/fonts/montserrat-bold-webfont.ttf', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-bold-webfont.ttf");
});
app.get('/dist/fonts/montserrat-bold-webfont.woff', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-bold-webfont.woff");
});
app.get('/dist/fonts/montserrat-bold-webfont_2d2816fe.eot', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-bold-webfont_2d2816fe.eot");
});
app.get('/dist/fonts/montserrat-regular-webfont.eot', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-regular-webfont.eot");
});
app.get('/dist/fonts/montserrat-regular-webfont.svg', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-regular-webfont.svg");
});
app.get('/dist/fonts/montserrat-regular-webfont.ttf', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-regular-webfont.ttf");
});
app.get('/dist/fonts/montserrat-regular-webfont.woff', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-regular-webfont.woff");
});
app.get('/dist/fonts/montserrat-regular-webfont_2d2816fe.eot', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/montserrat-regular-webfont_2d2816fe.eot");
});
app.get('/dist/fonts/bootstrap/glyphicons-halflings-regular.woff', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/bootstrap/glyphicons-halflings-regular.woff");
});
app.get('/dist/fonts/bootstrap/glyphicons-halflings-regular.ttf', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/bootstrap/glyphicons-halflings-regular.ttf");
});
app.get('/dist/fonts/bootstrap/glyphicons-halflings-regular.eot', function(req, res) {
    res.sendFile(__dirname + "/dist/fonts/bootstrap/glyphicons-halflings-regular.eot");
});


app.get('/images/photo.png', function(req, res) {
    res.sendFile(__dirname + "/images/photo.png");
});
app.get('/images/qrcodeRefresh.png', function(req, res) {
    res.sendFile(__dirname + "/images/qrcodeRefresh.png");
});
app.get('/images/qrcodeRefresh.png', function(req, res) {
    res.sendFile(__dirname + "/images/qrcodeRefresh.png");
});
app.get('/images/jycg.png', function(req, res) {
    res.sendFile(__dirname + "/images/jycg.png");
});
app.get('/images/jysb.png', function(req, res) {
    res.sendFile(__dirname + "/images/jysb.png");
});
app.get('/images/jysx.png', function(req, res) {
    res.sendFile(__dirname + "/images/jysx.png");
});
app.get('/images/jysx.png', function(req, res) {
    res.sendFile(__dirname + "/images/jysx.png");
});
app.get('/images/wudingdan.png', function(req, res) {
    res.sendFile(__dirname + "/images/wudingdan.png");
});
app.get('/images/open_bottom.jpg', function(req, res) {
    res.sendFile(__dirname + "/images/open_bottom.jpg");
});
app.get('/images/key_del.png', function(req, res) {
    res.sendFile(__dirname + "/images/key_del.png");
});
app.get('/images/pull-icon@2x.png', function(req, res) {
    res.sendFile(__dirname + "/images/pull-icon@2x.png");
});
app.get('/images/tmup.png', function(req, res) {
    res.sendFile(__dirname + "/images/tmup.png");
});
app.get('/images/blue@2x.png', function(req, res) {
    res.sendFile(__dirname + "/images/blue@2x.png");
});



app.post('/FuLiBao/LFQPlaceServlet', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({
        "path": "/FuLiBao/LFQPlaceServlet"
    }, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
/*    var singInData = monidata.getSingInData(req.body);
    console.log(JSON.stringify(singInData));
    res.end(JSON.stringify(singInData));*/
});

app.post('/FuLiBao/LFQSearchOrderServlet', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({
        "path":"/FuLiBao/LFQSearchOrderServlet"
    }, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
/*    var queryRecord = monidata.getQueryRecordServlet(req.body);
    console.log(JSON.stringify(queryRecord));
    res.end(JSON.stringify(queryRecord));*/
});

app.post('/FuLiBao/LFQCreateOrderServlet', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({
        "path":"/FuLiBao/LFQCreateOrderServlet"
    }, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
/*    var queryRecord = monidata.getQueryRecordServlet(req.body);
    console.log(JSON.stringify(queryRecord));
    res.end(JSON.stringify(queryRecord));*/
});

app.post('/wjttest/pkg/log/detail', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        // res.end(data);
    });
    agentObjet.request();
    var queryRecord = monidata.getAccountsDetails(req.body);
//    var queryRecord = monidata.getDetails2(req.body);
    console.log(JSON.stringify(queryRecord));
    res.end(JSON.stringify(queryRecord));
});


app.post('/wjttest/user/uppwd', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        // res.end(data);
    });
    agentObjet.request();
    var queryRecord = monidata.getQueryRecordServlet(req.body);
    console.log(JSON.stringify(queryRecord));
    res.end(JSON.stringify(queryRecord));
});

app.post('/wjttest/mer/manag/pwd', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({path:"/wjttest/mer/manag/pwd"}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        // res.end(data);
    });
    agentObjet.request();
    var queryRecord = monidata.getQueryRecordServlet(req.body);
    console.log(JSON.stringify(queryRecord));
    res.end(JSON.stringify(queryRecord));
});

app.post('/wjttest/appraisal/accountsDetailsServlet', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        // res.end(data);
    });
    agentObjet.request();
    var queryRecord = monidata.getAccountsDetails(req.body);
    console.log(JSON.stringify(queryRecord));
    res.end(JSON.stringify(queryRecord));
});

app.post('/wjttest/mer/manag/index', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        // res.end(data);
    });
    agentObjet.request();
    var queryRecord = monidata.getUsers(req.body);
    console.log(JSON.stringify(queryRecord));
    res.end(JSON.stringify(queryRecord));
});
app.post('/wjttest/score/index', urlencodedParser, function(req, res) {
    /*    res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        }); //设置response编码为utf-8*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        // res.end(data);
    });
    agentObjet.request();
    var sindex = monidata.getScoreIndex(req.body);
    console.log(JSON.stringify(sindex));
    res.end(JSON.stringify(sindex));
});

var sessions = {};
var key = "session_id";
var EXPIRES = 20 * 60 * 1000;
var generate = function() {
    var session = {};
    session.id = (new Date()).getTime + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session;
};


app.post('/wjttest/pkg/query', urlencodedParser, function(req, res) {
/*    var id = req.cookie[key];
    if(!id){
        req.session = generate();
    }else{
        var session = sessions[id];
        if(session){
            req.session = session;
        } 
    }*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("req.session:-----" + JSON.stringify(req.session));
    console.log("req.sessionID---" + req.sessionID);
    console.log("验证请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({
        "path": "/wjttest/pkg/query"
    }, req.body);
    agentObjet.on("databack", function(data) {
        console.log("验证回调 datback......");
        console.log('data: ' + data);
//        res.end(data);
    });
    agentObjet.request();
        var queryRecord = monidata.getIdentify1(req.body);
        console.log(JSON.stringify(queryRecord));
        res.end(JSON.stringify(queryRecord));
});
app.post('/wjttest/mer/manag/show', urlencodedParser, function(req, res) {
/*    var id = req.cookie[key];
    if(!id){
        req.session = generate();
    }else{
        var session = sessions[id];
        if(session){
            req.session = session;
        } 
    }*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("req.session:-----" + JSON.stringify(req.session));
    console.log("req.sessionID---" + req.sessionID);
    console.log("验证请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({
        "path": "/wjttest/mer/manag/show"
    }, req.body);
    agentObjet.on("databack", function(data) {
        console.log("验证回调 datback......");
        console.log('data: ' + data);
//        res.end(data);
    });
    agentObjet.request();
        var queryRecord = monidata.getshowData(req.body);
        console.log(JSON.stringify(queryRecord));
        res.end(JSON.stringify(queryRecord));
});
app.post('/wjttest/main/home', urlencodedParser, function(req, res) {
/*    var id = req.cookie[key];
    if(!id){
        req.session = generate();
    }else{
        var session = sessions[id];
        if(session){
            req.session = session;
        } 
    }*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("req.session:-----" + JSON.stringify(req.session));
    console.log("req.sessionID---" + req.sessionID);
    console.log("验证请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({
        "path": "/wjttest/main/home"
    }, req.body);
    agentObjet.on("databack", function(data) {
        console.log("验证回调 datback......");
        console.log('data: ' + data);
//        res.end(data);
    });
    agentObjet.request();
        var queryRecord = monidata.gethomeData(req.body);
        console.log(JSON.stringify(queryRecord));
        res.end(JSON.stringify(queryRecord));
});

app.post('/wjttest/mer/manag/save', urlencodedParser, function(req, res) {
/*    var id = req.cookie[key];
    if(!id){
        req.session = generate();
    }else{
        var session = sessions[id];
        if(session){
            req.session = session;
        } 
    }*/
    // application/json  接口返回json数据
    // charset=utf-8 解决json数据中中文乱码
    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8"
    });
    console.log("req.session:-----" + JSON.stringify(req.session));
    console.log("req.sessionID---" + req.sessionID);
    console.log("验证请求条件" + util.inspect(req.body));
    //   res.end(mndata.signIn);
    var agentObjet = dataAgent.getAgent({
        "path": "/wjttest/mer/manag/save"
    }, req.body);
    agentObjet.on("databack", function(data) {
        console.log("验证回调 datback......");
        console.log('data: ' + data);
//        res.end(data);
    });
    agentObjet.request();
        var queryRecord = monidata.getaddUser(req.body);
        console.log(JSON.stringify(queryRecord));
        res.end(JSON.stringify(queryRecord));
});



app.post('/wjttest/liveDec/SMSSendServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = vCodeAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});
app.post('/wjttest/liveDec/GetCheckNumServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = getNumServletAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});
app.post('/wjttest/liveDec/YouTuDetectServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = youtouAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});
app.post('/wjttest/liveDec/KexinBrokenServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = kexinBrokenAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});
app.post('/wjttest/liveDec/KexinBadrecordServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = kexinBarbrecordAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});
app.post('/wjttest/liveDec/HengFengServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = hengFengAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});
app.post('/wjttest/LFQSendSMSServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = dataAgent.getAgent({
        path: "/wjttest/LFQSendSMSServlet"
    }, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});

app.post('/wjttest/FuLiBao/LFQSendSMSServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = smsSeverAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});