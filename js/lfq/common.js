/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		4:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"apply","1":"applyNextStep","2":"instalmentsSearch","3":"qrcodePay"}[chunkId]||chunkId) + ".min.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	
	//调用服务器链接
	var BASE_URL = window.location.protocol + "//wxtest.ulinkpay.com/";

	//调用服务器链接
	//var BASE_URL = window.location.protocol + "//www.ulinkpay.com/";
	window.LFQ_ORDER_CREATE_URL = BASE_URL+"FuLiBao/LFQCreateOrderServlet";
	window.LFQ_SMS_SEND_URL = BASE_URL+"FuLiBao/LFQSendSMSServlet";
	window.LFQ_ORDER_CREATE_URL = BASE_URL+"FuLiBao/LFQCreateOrderServlet";



	(function init() {
	    $("input").on("keyup", function() {
	        if ($(event.target).val() != "") {
	            $(event.target).removeClass("light");
	        } else {
	            $(event.target).addClass("light");
	        }
	    })
	})();
	function getAjax(url, param, callBack) {
	    $.ajax({
	        type: 'post',
	        dataType: "json",
	        url: url,
	        data: param,
	        cache: false,
	        async: false,
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        success: function(msg) {
	            callBack(msg);
	        },
	        error: function(msg) {
	            callBack(msg);
	        }
	    });
	}

	function getUrlAjax(url, param, callBack) {
	    $.ajax({
	        type: 'get',
	        dataType: "json",
	        url: url,
	        data: param,
	        cache: false,
	        async: false,
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        success: function(msg) {
	            callBack(msg);
	        },
	        error: function(msg) {
	            callBack(msg);
	        }
	    });
	}

	// 获取url参数
	window.QueryString = {
	    data: {},
	    Initial: function() {
	        var aPairs, aTmp;
	        var queryString = new String(window.location.search);
	        queryString = queryString.substr(1, queryString.length);
	        aPairs = queryString.split("&");
	        for (var i = 0; i < aPairs.length; i++) {
	            aTmp = aPairs[i].split("=");
	            this.data[aTmp[0]] = aTmp[1];
	        }
	    },
	    GetValue: function(key) {
	        return this.data[key];
	    }
	}

	//移动端检查
	function checkBrowser() {
	    var u = navigator.userAgent.toLowerCase();
	    if (u.indexOf('mobile') == -1 && u.indexOf('iphone') == -1) {
	        window.location.href = "error_browser.html";
	    }
	}

	// 注册真实点击
	function registerReallyClick($selector) {
	    var falg = false;
	    $selector.on('touchstart', function() {
	        falg = false;
	    });
	    $selector.on('touchmove', function() {
	        falg = true;
	    });
	    $selector.on('touchend', function() {
	        if (!falg) {
	            $selector.trigger("reallyClick",[$(event.target)]);
	        }
	    });
	}

	function clearNoNum(obj){
	obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是
	obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
	}

	module.exports = {
	    getAjax: getAjax,
	    getUrlAjax: getUrlAjax,
	    getUrlAjax: getUrlAjax,
	    checkBrowser: checkBrowser,
	    registerReallyClick: registerReallyClick,
	    clearNoNum: clearNoNum
	}

/***/ }
/******/ ]);