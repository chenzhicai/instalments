/**
 * 提示框 用于替代myDialog.js
 */
function hideModal(modalId) {
    var idName = modalId ? modalId : "tishuModal";
    var theModal = document.getElementById(idName);
    theModal.style.display = "none";
}

function showModals(modalId) {
    var idName = modalId ? modalId : "tishuModal";
    var theModal = document.getElementById(idName);
    var bWidth = parseInt(document.documentElement.clientWidth);
    var bHeight = parseInt(document.documentElement.clientHeight);

    $(".modal>.back").css({
        "top": "0px",
        "left": "0px",
        "position": "absolute",
        "background": "#666",
        "width": "100%",
        "height": "100%",
        "opacity": 0.40,
    });

    theModal.style.display = "block";

}

// 设置提示内容
function setModalBody(modalBody,modalId) {
    var idName = modalId ? modalId : "tishuModal";
    $("#"+idName+" .modal-body").html(modalBody);
}

function showBodalBody(modalBody,modalId) {
    var idName = modalId ? modalId : "tishuModal";
    setModalBody(modalBody);
    showModals(idName);
}

// 初始化
(function init() {
    $("#modalButton").parent().on("touchend", function() {
        hideModal();
        event.preventDefault();
    });
})();


// 不打包形式  要加载requrie.js
/*
require.register("./cmodal.js", function(module, exports, require) {
    module.exports = {
        setModalBody: setModalBody,
        hideModal: hideModal,
        showModals: showModals,
        showBodalBody: showBodalBody
    };
});
*/
// 打包形式

module.exports = {
    setModalBody: setModalBody,
    hideModal: hideModal,
    showModals: showModals,
    showBodalBody: showBodalBody
}