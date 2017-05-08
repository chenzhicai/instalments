var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var util = require('util');
var signServletAgent = require('./servers/getSignServletAgent.js');
var vCodeAgent = require('./servers/verficationCodeAgent.js');
var getNumServletAgent = require('./servers/getNumServletAgent.js');
var youtouAgent = require('./servers/youtuServletAgent.js');
var hengFengAgent = require('./servers/hengFengAgent.js');
var kexinBarbrecordAgent = require('./servers/kexinbadrecordAgent.js');
var kexinBrokenAgent = require('./servers/kexinBrokenAgent.js');
var dataAgent = require('./servers/getDateAgent.js');
var smsSeverAgent = require('./servers/sendSMSServletAgent.js');
var configAgent = require('./servers/getConfigAgent.js');
var wxtestAgent = require('./servers/wxtestAgent.js');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/dist/faceDetect/faceDetect.html', function(req, res) {
    res.sendFile(__dirname + "/dist/faceDetect/faceDetect.html");
});
app.get('/dist/creditLoan/apply.html', function(req, res) {
    res.sendFile(__dirname + "/dist/creditLoan/apply.html");
});
app.get('/dist/creditLoan/loanInquiry.html', function(req, res) {
    res.sendFile(__dirname + "/dist/creditLoan/loanInquiry.html");
});
app.get('/dist/creditLoan/promptBrowser.html', function(req, res) {
    res.sendFile(__dirname + "/dist/creditLoan/promptBrowser.html");
});
app.get('/dist/creditLoan/details.html', function(req, res) {
    res.sendFile(__dirname + "/dist/creditLoan/details.html");
});
app.get('/dist/creditLoan/query.html', function(req, res) {
    res.sendFile(__dirname + "/dist/creditLoan/query.html");
});
app.get('/dist/creditLoan/inquiry.html', function(req, res) {
    res.sendFile(__dirname + "/dist/creditLoan/inquiry.html");
});
app.get('/dist/creditLoan/question.html', function(req, res) {
    res.sendFile(__dirname + "/dist/creditLoan/question.html");
});
app.get('/html/applyInstalment.html', function(req, res) {
    res.sendFile(__dirname + "/html/applyInstalment.html");
});
app.get('/html/qrcodePay.html', function(req, res) {
    res.sendFile(__dirname + "/html/qrcodePay.html");
});
app.get('/html/applyNextStep.html', function(req, res) {
    res.sendFile(__dirname + "/html/applyNextStep.html");
});
app.get('/html/positionPrompt.html', function(req, res) {
    res.sendFile(__dirname + "/html/positionPrompt.html");
});
app.get('/html/instalmentsSearch.html', function(req, res) {
    res.sendFile(__dirname + "/html/instalmentsSearch.html");
});
app.get('/html/orderDetails.html', function(req, res) {
    res.sendFile(__dirname + "/html/orderDetails.html");
});











app.get('/dist/js/libs/jquery-1.11.1.min.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/libs/jquery-1.11.1.min.js");
});
app.get('/dist/js/libs/jquery-3.0.0.min.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/libs/jquery-3.0.0.min.js");
});
app.get('/dist/js/libs/iscroll5.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/libs/iscroll5.js");
});


app.get('/dist/js/faceDetect/urlValue.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/faceDetect/urlValue.js");
});
app.get('/dist/js/libs/jquery.mobile-1.4.5.min.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/libs/jquery.mobile-1.4.5.min.js");
});
app.get('/dist/js/libs/iscroll5.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/libs/iscroll5.js");
});

app.get('/dist/js/faceDetect/common.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/faceDetect/common.js");
});
app.get('/dist/js/faceDetect/faceIndex.min.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/faceDetect/faceIndex.min.js");
});
app.get('/dist/js/creditLoan/common.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/creditLoan/common.js");
});
app.get('/dist/js/creditLoan/creditApply.min.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/creditLoan/creditApply.min.js");
});
app.get('/dist/js/creditLoan/iscroll5.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/creditLoan/iscroll5.js");
});

app.get('/dist/js/creditLoan/loanInquiry.min.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/creditLoan/loanInquiry.min.js");
});
app.get('/dist/js/creditLoan/details.min.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/creditLoan/details.min.js");
});

app.get('/dist/js/creditLoan/urlValue.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/creditLoan/urlValue.js");
});
app.get('/dist/js/creditLoan/inquiry.js', function(req, res) {
    res.sendFile(__dirname + "/dist/js/creditLoan/inquiry.js");
});
app.get('/js/lfq/urlVar.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/urlVar.js");
});
app.get('/js/lfq/zepto.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/zepto.min.js");
});
app.get('/js/lfq/apply.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/apply.min.js");
});
app.get('/js/lfq/common.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/common.min.js");
});
app.get('/js/lfq/jquery-weui.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/jquery-weui.min.js");
});
app.get('/js/lfq/JsBarcode.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/JsBarcode.js");
});
app.get('/js/lfq/jquery.qrcode-0.12.0.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/jquery.qrcode-0.12.0.js");
});
app.get('/js/lfq/CODE128.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/CODE128.js");
});
app.get('/js/lfq/CODE39.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/CODE39.js");
});
app.get('/js/lfq/qrcodePay.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/qrcodePay.min.js");
});
app.get('/js/lfq/applyNextStep.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/applyNextStep.min.js");
});
app.get('/js/lfq/iscroll5.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/iscroll5.js");
});
app.get('/js/lfq/instalmentsSearch.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/instalmentsSearch.min.js");
});
app.get('/js/lfq/orderDetails.min.js', function(req, res) {
    res.sendFile(__dirname + "/js/lfq/orderDetails.min.js");
});







app.get('/dist/css/faceDetect/faceMain.css', function(req, res) {
    res.sendFile(__dirname + "/dist/css/faceDetect/faceMain.css");
});
app.get('/dist/css/test/fixedLayout.css', function(req, res) {
    res.sendFile(__dirname + "/dist/css/test/fixedLayout.css");
});
app.get('/dist/css/creditLoan/apply.css', function(req, res) {
    res.sendFile(__dirname + "/dist/css/creditLoan/apply.css");
});
app.get('/dist/css/creditLoan/query.css', function(req, res) {
    res.sendFile(__dirname + "/dist/css/creditLoan/query.css");
});
app.get('/css/applyInstalment2.css', function(req, res) {
    res.sendFile(__dirname + "/css/applyInstalment2.css");
});
app.get('/css/qrcodePay.css', function(req, res) {
    res.sendFile(__dirname + "/css/qrcodePay.css");
});
app.get('/css/applyNextStep.css', function(req, res) {
    res.sendFile(__dirname + "/css/applyNextStep.css");
});
app.get('/css/positionPrompt.css', function(req, res) {
    res.sendFile(__dirname + "/css/positionPrompt.css");
});
app.get('/css/instalmentsSearch.css', function(req, res) {
    res.sendFile(__dirname + "/css/instalmentsSearch.css");
});
app.get('/css/orderDetails.css', function(req, res) {
    res.sendFile(__dirname + "/css/orderDetails.css");
});







app.get('/dist/images/faceDetect/saomiao.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/faceDetect/saomiao.png");
});
app.get('/dist/images/faceDetect/lansebeijing_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/faceDetect/lansebeijing_icon.png");
});
app.get('/dist/images/faceDetect/demo.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/faceDetect/demo.png");
});
app.get('/dist/images/faceDetect/demo2_0.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/faceDetect/demo2_0.png");
});
app.get('/dist/images/faceDetect/demo3.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/faceDetect/demo3.png");
});
app.get('/dist/images/faceDetect/demo2_1.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/faceDetect/demo2_1.png");
});
app.get('/dist/images/faceDetect/demo2_2.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/faceDetect/demo2_2.png");
});
app.get('/dist/images/faceDetect/naixindengdai_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/faceDetect/naixindengdai_icon.png");
});
app.get('/dist/images/creditLoan/banner-2.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/banner-2.png");
});
app.get('/dist/images/creditLoan/xiaotongxinyongdai_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/xiaotongxinyongdai_icon.png");
});
app.get('/dist/images/creditLoan/underline.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/underline.png");
});
app.get('/dist/images/creditLoan/fanhui.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/fanhui.png");
});
app.get('/dist/images/creditLoan/dingdan_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/dingdan_icon.png");
});
app.get('/dist/images/creditLoan/loading.gif', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/loading.gif");
});
app.get('/dist/images/creditLoan/shenqingchenggong_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/shenqingchenggong_icon.png");
});
app.get('/dist/images/creditLoan/shibai_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/shibai_icon.png");
});
app.get('/dist/images/creditLoan/shuaxin_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/shuaxin_icon.png");
});
app.get('/dist/images/creditLoan/chenggong_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/chenggong_icon.png");
});
app.get('/dist/images/creditLoan/sb_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/sb_icon.png");
});
app.get('/dist/images/creditLoan/guanbi_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/guanbi_icon.png");
});
app.get('/dist/images/creditLoan/tianxiejiekuanjine_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/tianxiejiekuanjine_icon.png");
});
app.get('/dist/images/creditLoan/xiaotongxinyongdai_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/xiaotongxinyongdai_icon.png");
});
app.get('/dist/images/creditLoan/xuanzehuankuanfangshi_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/xuanzehuankuanfangshi_icon.png");
});
app.get('/dist/images/creditLoan/tianxiebenrenxinxi_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/tianxiebenrenxinxi_icon.png");
});
app.get('/dist/images/creditLoan/tiqianhuankuan_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan//tiqianhuankuan_icon.png");
});
app.get('/dist/images/creditLoan/tianxiexinyongkaxinxi.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/tianxiexinyongkaxinxi.png");
});
app.get('/dist/images/creditLoan/yanjing_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/yanjing_icon.png");
});




app.get('/dist/images/creditLoan/dianjiliaojie_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/dianjiliaojie_icon.png");
});
app.get('/dist/images/creditLoan/xuanzehuankuanqishu_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/xuanzehuankuanqishu_icon.png");
});
app.get('/dist/images/creditLoan/wozhidaola.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/wozhidaola.png");
});
app.get('/dist/images/creditLoan/daozhangshijian_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/daozhangshijian_icon.png");
});
app.get('/dist/images/creditLoan/huankuanfangshi_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/huankuanfangshi_icon.png");
});
app.get('/dist/images/creditLoan/jiekuanjine_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/jiekuanjine_icon.png");
});
app.get('/dist/images/creditLoan/shijian_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/shijian_icon.png");
});
app.get('/dist/images/creditLoan/shoukuankahao_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/shoukuankahao_icon.png");
});
app.get('/dist/images/creditLoan/tiaojian_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/tiaojian_icon.png");
});
app.get('/dist/images/creditLoan/tiqianhuankuan_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/tiqianhuankuan_icon.png");
});
app.get('/dist/images/creditLoan/tiaojian_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/tiaojian_icon.png");
});
app.get('/dist/images/creditLoan/tiqianhuankuan_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/tiqianhuankuan_icon.png");
});
app.get('/dist/images/creditLoan/shoukuankahao_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/shoukuankahao_icon.png");
});
app.get('/images/photo.png', function(req, res) {
    res.sendFile(__dirname + "/images/photo.png");
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
app.get('/images/photo.png', function(req, res) {
    res.sendFile(__dirname + "/images/photo.png");
});
app.get('/images/qrcodeRefresh.png', function(req, res) {
    res.sendFile(__dirname + "/images/qrcodeRefresh.png");
});
app.get('/images/fanhui.png', function(req, res) {
    res.sendFile(__dirname + "/images/fanhui.png");
});
app.get('/images/tjloading.gif', function(req, res) {
    res.sendFile(__dirname + "/images/tjloading.gif");
});
app.get('/images/yanjing_icon.png', function(req, res) {
    res.sendFile(__dirname + "/images/yanjing_icon.png");
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









app.get('/dist/images/creditLoan/yemianwufaxianshi_icon.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/yemianwufaxianshi_icon.png");
});
app.get('/dist/images/creditLoan/tmup.png', function(req, res) {
    res.sendFile(__dirname + "/dist/images/creditLoan/tmup.png");
});




 


app.post('/liveDec/GetSignServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = signServletAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});

app.post('/liveDec/SMSSendServlet', urlencodedParser, function(req, res) {
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
app.post('/liveDec/GetCheckNumServlet', urlencodedParser, function(req, res) {
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
app.post('/liveDec/YouTuDetectServlet', urlencodedParser, function(req, res) {
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
app.post('/liveDec/KexinBrokenServlet', urlencodedParser, function(req, res) {
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
app.post('/liveDec/KexinBadrecordServlet', urlencodedParser, function(req, res) {
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
app.post('/liveDec/HengFengServlet', urlencodedParser, function(req, res) {
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
app.post('/FuLiBao/LFQCreateOrderServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = dataAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});

app.post('/FuLiBao/LFQSendSMSServlet', urlencodedParser, function(req, res) {
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
app.post('/FuLiBao/LFQPlaceServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("取验证码条件" + util.inspect(req.body));
    var agentObjet = configAgent.getAgent({}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});


app.post('/FuLiBao/LFQSearchOrderServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("LFQSearchOrderServlet条件" + util.inspect(req.body));
    var agentObjet = wxtestAgent.getAgent({"path":"/FuLiBao/LFQSearchOrderServlet"}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});
app.post('/FuLiBao/LFQPlaceServlet', urlencodedParser, function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    }); //设置response编码为utf-8
    console.log("LFQPlaceServlet条件" + util.inspect(req.body));
    var agentObjet = wxtestAgent.getAgent({"path":"/FuLiBao/LFQPlaceServlet"}, req.body);
    agentObjet.on("databack", function(data) {
        console.log("datback......");
        console.log('data: ' + data);
        res.end(data);
    });
    agentObjet.request();
});




var server = app.listen(9082, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});