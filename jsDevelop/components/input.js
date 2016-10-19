/* 存放一些input标签常用的处理 */

// 把光标放到文本最后面
function cursorEnd(obj) {
    obj.focus();
    var r = obj.createTextRange();
    r.moveStart('character', obj.value.length);
    r.collapse(true);
    r.select();
}