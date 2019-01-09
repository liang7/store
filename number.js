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
let add = function (arg1, arg2) {
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

let mul = function (arg1, arg2) {
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

let div = function (arg1, arg2) {
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
 * floatObj 包含加减乘除四个方法，能确保浮点数运算不丢失精度
 *
 * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
 * 以下是十进制小数对应的二进制表示
 *      0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
 *      0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
 * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。舍去的部分就是精度丢失的部分。
 *
 * ** method **
 *  add / subtract / multiply /divide
 *
 * ** explame **
 *  0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
 *  0.2 + 0.4 == 0.6000000000000001  （多了 0.0000000000001）
 *  19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
 *
 * floatObj.add(0.1, 0.2) >> 0.3
 * floatObj.multiply(19.9, 100) >> 1990
 *
 */
var floatObj = function () {

    /*
     * 判断obj是否为一个整数
     */
    function isInteger(obj) {
        return Math.floor(obj) === obj;
    }

    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
        var ret = {
            times: 1,
            num: 0
        };
        if (isInteger(floatNum)) {
            ret.num = floatNum;
            return ret;
        }
        var strfi = floatNum + '';
        var dotPos = strfi.indexOf('.');
        var len = strfi.substr(dotPos + 1).length;
        var times = Math.pow(10, len);
        var intNum = parseInt(floatNum * times + 0.5, 10);
        ret.times = times;
        ret.num = intNum;
        return ret;
    }

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, op) {
        var o1 = toInteger(a);
        var o2 = toInteger(b);
        var n1 = o1.num;
        var n2 = o2.num;
        var t1 = o1.times;
        var t2 = o2.times;
        var max = t1 > t2 ? t1 : t2;
        var result = null;
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2;
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2);
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2;
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2;
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2);
                } else {
                    result = n1 * (t2 / t1) - n2;
                }
                return result / max;
            case 'multiply':
                result = (n1 * n2) / (t1 * t2);
                return result;
            case 'divide':
                result = (n1 / n2) * (t2 / t1);
                return result;
        }
    }

    // 加减乘除的四个接口
    function add(a, b) {
        return operation(a, b, 'add');
    }

    function subtract(a, b) {
        return operation(a, b, 'subtract');
    }

    function multiply(a, b) {
        return operation(a, b, 'multiply');
    }

    function divide(a, b) {
        return operation(a, b, 'divide');
    }

    // exports
    return {
        add: add, // 加
        subtract: subtract, // 减
        multiply: multiply, // 乘
        divide: divide // 除
    }
}();

// toFixed精度问题解决方案一
function toFixed(num, s) {
    var times = Math.pow(10, s)
    var des = num * times + 0.5
    des = parseInt(des, 10) / times
    return des + ''
}

// toFixed精度问题解决方案二
Number.prototype.toFixed = function (n) {
    if (n != undefined && (isNaN(n) || Number(n) > 17 || Number(n) < 0)) {
        return this
    }
    // 拆分小数点整数和小数
    var num = this;
    var numList = num.toString().split(".");
    // 整数
    var iN = numList[0];
    // 小数
    var dN = numList[1];
    n = parseInt(n);
    if (isNaN(n) || Number(n) === 0) {
        // 0或者不填的时候，按0来处理
        if (dN === undefined) {
            return num + '';
        }
        var idN = Number(dN.toString().substr(0, 1));
        if (idN >= 5) {
            iN += 1;
        }
        return iN;
    } else {
        var dNL = dN === undefined ? 0 : dN.length;
        if (dNL < n) {
            // 如果小数位不够的话，那就补全
            var oldN = num + '.';
            var a = Number(n) - dNL;
            while (a > 0) {
                oldN += '0';
                a--;
            }
            return oldN;
        }
        // 正常
        var dN1 = Number(dN.toString().substring(0, n));
        var dN2 = Number(dN.toString().substring(n, n + 1));
        if (dN2 >= 5) {
            dN1 += 1;
        }
        return iN + '.' + dN1;
    }
}

// toFixed精度问题解决方案三 来源：http://www.chengfeilong.com/toFixed
Number.prototype.toFixed = function (length) {
    var carry = 0; //存放进位标志
    var num, multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
    var str = this + ''; //将调用该方法的数字转为字符串
    var dot = str.indexOf("."); //找到小数点的位置
    if (str.substr(dot + length + 1, 1) >= 5) carry = 1; //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
    multiple = Math.pow(10, length); //设置浮点数要扩大的倍数
    num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
    var result = num / multiple + ''; //将进位后的整数再缩小为原浮点数
    /*
     * 处理进位后无小数
     */
    dot = result.indexOf(".");
    if (dot < 0) {
        result += '.';
        dot = result.indexOf(".");
    }
    /*
     * 处理多次进位
     */
    var len = result.length - (dot + 1);
    if (len < length) {
        for (var i = 0; i < length - len; i++) {
            result += 0;
        }
    }
    return result;
}