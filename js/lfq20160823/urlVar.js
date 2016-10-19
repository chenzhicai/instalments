//调用服务器链接
window.BASE_URL = window.location.protocol + "//wxtest.ulinkpay.com/";

//调用服务器链接
//var BASE_URL = window.location.protocol + "//www.ulinkpay.com/";
window.LFQ_SMS_SEND_URL = BASE_URL+"FuLiBao/LFQSendSMSServlet";
window.LFQ_ORDER_CREATE_URL = BASE_URL+"FuLiBao/LFQCreateOrderServlet";
window.LFQ_QRCODEPAY_RESULT_URL = BASE_URL + "FuLiBao/LFQSearchOrderServlet";