$(function() {
    QueryString.Initial();
    var payCode = QueryString.GetValue("payCode");
    var parent = $("#barcodeBoxParent")[0];
    var innerWidth = window.innerWidth;
    $("section").css({
        "width": innerWidth * 0.9 + "px",
        "height": (innerWidth * 1.05 + 30) + "px"
    });
    var txHeight = innerWidth * 0.3;
    createTXcode(parent, payCode, {
        width: 2,
        height: txHeight,
        format: "CODE39",
        displayValue: true,
        //        fontOptions: "bold",
        fontOptions: "",
        font: "Helvetica",
        //        fontSize: 20,
        textAlign: "center",
        textMargin: 3,
        fontSize: 30
    });

    $("#container").css({
        "width": innerWidth * 1.2 + "px",
        "height": innerWidth * 1.2 + "px",
        "margin-top": (0 - innerWidth) * 0.25 + "px",
        "margin-left": (0 - innerWidth) * 0.15 + "px"
    });
    updateQrCode(payCode);

    $(".countdown-parent").css("margin-top",innerWidth*0.65 + "px");
})

// 创建条形码
function createTXcode(parent, text, options) {
    var barcodeBox = document.createElement("div");
    barcodeBox.className = "barcodeBox";

    var format = (typeof options !== "undefined" && options.format) || "auto";

    barcodeBox.innerHTML = '<img class="barcode"/>';

    try {
        JsBarcode(barcodeBox.querySelector('.barcode'), text, options);
    } catch (e) {
        barcodeBox.className = "errorbox";
        barcodeBox.onclick = function() {
            throw e;
        }
    }

    parent.appendChild(barcodeBox);
}

// 更新二维码
function updateQrCode(payCode) {
    var outerSize = window.innerWidth * 1.2;
    var options = {
        render: "canvas",
        ecLevel: "L",
        minVersion: 3,

        fill: "#000000",
        //        background: "#ffffff",
        //fill: $('#img-photo')[0],

        text: payCode,
        size: outerSize,
        radius: 0.1,
        quiet: 1,

        mode: 4,

        mSize: 0.13,
        //        mPosX: 0.5,
        //        mPosY: 0.5,

        //        label: "tonglianzhifu",
        fontname: "Ubuntu",
        fontcolor: "#333333",
        //        src:"./images/photo.png"
        image: $('#img-photo')[0]
    };

    $('#container').empty().qrcode(options);
    var countdownValue = 120;
    var sihadle = setInterval(function() {
        countdownValue--;
        $("#countdown").text(countdownValue);
        if (countdownValue == 0) {
            clearInterval(sihadle);
        }
    }, 1000)
}
