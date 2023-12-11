window.onload = function () {

    //设置rem数值
    document.querySelector("html").style.fontSize = window.innerWidth / 16+ 'px';
    let rem=window.innerWidth / 16;
    console.log(rem);
    /***
     * 计算设置页面
     */
    document.body.style.margin=0;
    
    (function () { var re = /x/; var i = 0; console.log(re); re.toString = function () { window.close(); return '第' + (++i) + '次打开控制台'; } })();

}
