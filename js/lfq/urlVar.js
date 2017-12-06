//调用服务器链接
// window.BASE_URL = window.location.protocol + "//wxtest.ulinkpay.com/";
// window.BASE_URL = window.location.protocol + "//192.168.1.122:9082/";
// window.BASE_URL = "https:" + "//wxtest.allinpaycard.com/";
window.BASE_URL = location.protocol + "//" + location.host+"/";

//调用服务器链接
//var BASE_URL = window.location.protocol + "//www.allinpaycard.com/";
window.LFQ_SMS_SEND_URL = BASE_URL+"FuLiBao/LFQSendSMSServlet";
window.LFQ_ORDER_CREATE_URL = BASE_URL+"FuLiBao/LFQCreateOrderServlet";
window.LFQ_QRCODEPAY_RESULT_URL = BASE_URL + "FuLiBao/LFQSearchOrderServlet";

// 微信号appId
window.appIdValue = "wx69be6f067db3c95a";


var LFQ_PLACE_URL = BASE_URL+"FuLiBao/LFQPlaceServlet";