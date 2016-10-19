function hideModal() {
    var theModal = document.getElementById("tishuModal");
    theModal.style.display = "none";
}

function showModals(modalIs) {

    var theModal = document.getElementById("tishuModal");
    var back = document.getElementById("back");
    var bWidth = parseInt(document.documentElement.clientWidth);
    var bHeight = parseInt(document.documentElement.clientHeight);

    var styleStr = "top:0px;left:0px;position:absolute;background:#666;width:" + bWidth + "px;height:" + bHeight + "px;";
    styleStr += (false) ? "filter:alpha(opacity=40);" : "opacity:0.40;";
    back.style.cssText = styleStr;
    theModal.style.display = "block";

}

// 不打包形式
/*
require.register("./myDialog.js", function(module, exports, require) {
    module.exports = {
        hideModal: hideModal,
        showModals: showModals
    }
});
*/


// 打包形式
module.exports = {
    hideModal: hideModal,
    showModals: showModals
}
