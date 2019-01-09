// 删除<%@与%>之间的内容
replace(/\<\%@(.|[\r\n])*?\%\>/g, "")
// 删除<%--与--%>之间的内容
replace(/\<\%--(.|[\r\n])*?--\%\>/g, "")

//千位符
'123456789000.7890'.replace(/(?=\B(?:\d{3})+\b)(\d{3}(\.\d+$)?)/g, ',$1');
(123456789.5645).toLocaleString('en-US');


/**
* 加法运算
*/
function numAdd(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
};

/**
* 减法运算
*/
function numSub(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    var precision;
    //精度
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}

/**
* 乘法运算
*/
function numMulti(num1, num2) {
    var baseNum = 0;
    try {
        baseNum += num1.toString().split(".")[1].length;
    } catch (e) {}
    try {
        baseNum += num2.toString().split(".")[1].length;
    } catch (e) {}
    return Number(num1.toString().replace(".", "")) *
        Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};


/**
* 除法運算
*/
function numDiv(num1, num2) {
    var baseNum1 = 0,
        baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    with(Math) {
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
    }
}

// 加减乘除
var add = function (arg1, arg2) {
    var m = 0,
        temp, r1, r2,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    temp = s1.split(".");
    r1 = temp.length > 1 ? temp[1].length : 0;
    temp = s2.split(".");
    r2 = temp.length > 1 ? temp[1].length : 0;
    m = Math.pow(10, Math.max(r1, r2));
    return (mul(arg1, m) + mul(arg2, m)) / m;
}

Number.prototype.add = function (arg) {
    return add(arg, this);
}

var mul = function (arg1, arg2) {
    var m = 0,
        temp,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    temp = s1.split(".");
    m += temp.length > 1 ? temp[1].length : 0;
    temp = s2.split(".");
    m += temp.length > 1 ? temp[1].length : 0;
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

Number.prototype.mul = function (arg) {
    return mul(arg, this);
}

var div = function (arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString(),
        r1, r2, temp;
    temp = s1.split(".");
    t1 = temp.length > 1 ? temp[1].length : 0;
    temp = s2.split(".");
    t2 = temp.length > 1 ? temp[1].length : 0;
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return mul((r1 / r2), Math.pow(10, t2 - t1));
}

Number.prototype.div = function (arg) {
    return div(arg, this);
}

Number.prototype.divBy = function (arg) {
    return div(this, arg);
}


/**
* 添加一个cookie
* @param {String} name cookie的名字
* @param {String} val cookie的内容
* @param {String} path 有效路径（默认/）
* @param {Number} days 只存日期天数（默认半小时）
*/
function addCookie(name, val, path, days) {
    path = path || "/";
    var ss = days ? (days * 24 * 60 * 60 * 1000) : (30 * 60 * 1000);
    var expires = (new Date((new Date()).getTime() + ss)).toGMTString();
    document.cookie = name + "=" + encodeURIComponent(val) + ";path=" + path + ";expires=" + expires;
}

/**
* 获取一个cookie
* 
* @param {String} name cookie的名字
* @returns {String}
*/
function getCookie(name) {
    var cookieStr = document.cookie;
    var ArrCookie = cookieStr.split(";");
    for (var i = 0; i < ArrCookie.length; i++) {
        var arr = ArrCookie[i].split("=");
        arr[0] = arr[0].replace(/\s/g, "");
        if (arr[0] == name) return decodeURIComponent(arr[1]);
    }
    return "";
}

/**
* 删除一个cookie
* 
* @param {String} name cookie的名字
* @param {String} path 有效路径（默认/）
*/
function delCookie(name, path) {
    path = path || '/';
    if (getCookie(name) != "") {
        document.cookie = name + "=;path=" + path + ";expires=" + new Date((new Date()).getTime() - 10000).toGMTString();
    }
}


// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
var throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function () {
        var last = new Date().getTime() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

/**
 * [queryString 获取URL的参数值]
 * @param  {[type]} name [参数名]
 * @return {[type]}      [返回值或null]
 */
function queryString(name) {
    var qs = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)"));
    return qs ? qs[1] : qs;
};

/**
 * [将当前页面 URL 地址参数串转化成 Object（有解码）]
 * @returns {[Object]}    [返回值]
 */
function getQueryStrObj() {
    var search = window.location.search;
    return this.param2Obj(search, true);
};

/**
 * [将当前页面 URL 地址参数串转化成 Object（无解码）]
 * @return {[Object]}     [返回值]
 */
function getQueryStringObj() {
    var search = window.location.search;
    return this.param2Obj(search);
};

/**
 * [将url中的 query string 转化为 Object]
 * @param   {[String]}  params   [参数名]
 * @param   {[Boolean]} isDecode [参数名]
 * @returns {[Object]}           [返回值]
 */
function param2Obj(params, isDecode) {
    var obj = {};
    if (params != null && params != undefined && params != "") {
        params = params.replace(/\?/, "");
        var arr = params.split('&');
        for (var index = 0; index < arr.length; index++) {
            var pair = arr[index];
            var indexOf = pair.indexOf('=');
            if (indexOf != -1) {
                var name = pair.substring(0, indexOf);
                var val = "";
                if (indexOf != pair.length - 1) {
                    val = pair.substring(indexOf + 1);
                }
                if (isDecode) {
                    obj[name] = decodeURIComponent(val);
                } else {
                    obj[name] = val;
                }
            } else {
                obj[pair] = "";
            }
        }
    }
    return obj;
}

/**
 * milliFormat:添加千位符，及相关小数位处理
 * @param {string}  s   [需要格式化的字符串或数值]
 * @param {Boolean || Number} dp  [默认为数值true，或2]
 *                            (1)、dp===false时，只添加千位符，不做小数位处理
 *                            (2)、dp===true时与da===2一样，默认保留两位小数
 *                            (3)、dp为数字时，则保留dp设置的小数位，支持整数补0，默认不补0
 * @param {Boolean} r   [r===true时，进行四舍五入取值，否则只截取两位，默认为false]
 */
function milliFormat(s, dp, r) {
    if (!s || s == "null") {
        // 传入的数值不存在时，重置为0，避免出现null.00
        s = "0";
    }
    if (/,/g.test(s)) {
        //最后两位小数为00时，则取整
        var arr = s.split(".");
        s = arr[1] == "00" ? arr[0] : s;
        return s;
    }
    s = "" + s;
    var val = "";
    var reg = /(\d)(?=(\d{3})+(?!\d))/g;
    //不足则补0
    var addZero = function (num, digit) {
        var arr = ("" + num).split(".");
        var dlen = 0;
        if (arr.length == 2) {
            dlen = (arr[1] + "").replace(/,/g, "").length;
        } else {
            num += ".";
        }
        if (dlen < digit) {
            for (var i = dlen; i < digit; i++) {
                num += "0";
            }
        }
        return num;
    };
    //不做小数位处理,只添加千位符
    if (dp === false) {
        val = s.replace(reg, "$1,");
        return val;
    }
    //强制保留两位小数或多位小数,dp===true时默认为2位
    var digit = dp === true ? 2 : dp;
    if (dp || dp == 0) {
        if (r === true) {
            //四舍五入
            val = (s * 1).toFixed(digit).replace(reg, "$1,");
        } else {
            //不进行四舍五入,直接截取
            var reg2 = new RegExp("(\\d*\\.\\d{" + digit + "})\\d*");
            s = s.replace(reg2, "$1");
            val = s.replace(reg, "$1,");
        }
        return addZero(val, digit);
    }
    //默认保留两位小数（不进行四舍五入），且小数为00时，保留为整数
    s = addZero((s).replace(/(\d*\.\d{2})\d*/, "$1"), 2);
    var arr = s.split(".");
    s = arr[1] == "00" ? arr[0] : s;
    val = s.replace(reg, "$1,");
    return val;
}

function milliFormat(number) {
    let str = number.toFixed(3);
    str = str.replace(/(\d*\.\d{2})\d*/, "$1");
    str = str.split('.');

    let point = str[1] ? '.' + str[1] : '';
    let newStr = str[0].split('').reverse().join('')
        .replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^,/g, '');
    return newStr + point
}

/*
    * 格式化当前时间
    * @param  {[Date或String或Number]} time [时间字符串、时间对象，或毫秒值]
    * @param  {[String]} fmt  [输出的格式]
    * @param  {[String]} zero [是否补0，zero==false时不补0]
    * @return {[String]}      [输出的时间]
    * 默认fmt为：yyyy-MM-dd HH:mm:ss 如2015-01-09 12:00:00
    * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg:
    * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
    * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
    * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
    * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
    * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
    */
function formatTime(time, fmt, zero) {
    if (/-/g.test("" + time)) {
        time = ("" + time).replace(/-/g, "/");
    }
    var dt = new Date(/\//g.test(time) ? time : Number(time));
    if (!fmt) {
        fmt = "yyyy-MM-dd HH:mm:ss";
    }
    var o = {
        "M+": dt.getMonth() < 9 ? (zero == false ? "" : "0") + (dt.getMonth() + 1) : dt.getMonth() + 1, //月份
        "d+": dt.getDate() < 10 ? (zero == false ? "" : "0") + dt.getDate() : dt.getDate(), //日
        "h+": dt.getHours() % 12 === 0 ? 12 : dt.getHours() % 12, //小时
        "H+": dt.getHours() < 10 ? (zero == false ? "" : "0") + dt.getHours() : dt.getHours(), //小时
        "m+": dt.getMinutes() < 10 ? (zero == false ? "" : "0") + dt.getMinutes() : dt.getMinutes(), //分
        "s+": dt.getSeconds() < 10 ? (zero == false ? "" : "0") + dt.getSeconds() : dt.getSeconds(), //秒
        "q+": Math.floor((dt.getMonth() + 3) / 3), //季度
        "S": dt.getMilliseconds() < 10 ? (zero == false ? "" : "0") + dt.getMilliseconds() : dt.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[dt.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (((zero == false ? " " : "00") + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * HTML代码转义
 * @param  {[type]} str [非转义的html代码]
 * @return {[type]}     [转义后的html代码]
 */
function htmlEncode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}

/**
 * HTML代码解转义
 * @param  {[type]} str [转义后的html代码]
 * @return {[type]}     [非转义的html代码]
 */
function htmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}


function checkSafeUrl(url) {
    // 以 / 开头或域名前缀的url为安全的url
    return /^\/[^\/]*/.test(url) || /^(http(s)?:)?\/\/www.xiaoniufax.com(\/[\w-\.\/\?%&=]*)?$/.test(url);
}

/**
 * 密码强度校验
 * eg:new PwdStrength().check(pwd)
 * 0-弱
 * 1-中
 * 2-强
 */
var PwdStrength = function () {}
PwdStrength.prototype = {
    constructor: PwdStrength,
    //Unicode 编码区分数字，字母，特殊字符
    CharMode: function (iN) {
        if (iN >= 48 && iN <= 57) //数字（U+0030 - U+0039）
            return 1; //二进制是0001
        if (iN >= 65 && iN <= 90) //大写字母（U+0041 - U+005A）
            return 2; //二进制是0010
        if (iN >= 97 && iN <= 122) //小写字母（U+0061 - U+007A）
            return 4; //二进制是0100
        else //其他算特殊字符
            return 8; //二进制是1000
    },
    bitTotal: function (num) {
        modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) //num不是0的话
                modes++; //复杂度+1
            num >>>= 1; //num右移1位
        }
        return modes;
    },
    check: function (sPW) {
        if (sPW.length < 6) //小于7位，直接“弱”
            return 0;
        Modes = 0;
        for (i = 0; i < sPW.length; i++) { //密码的每一位执行“位运算 OR”
            Modes |= this.CharMode(sPW.charCodeAt(i));
        }
        return this.bitTotal(Modes);
    }
}
