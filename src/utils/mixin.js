import AREA_CODE from "./area-code.min";
import {ERROR_CODE, input_verify, MONEY_MAX, WhInvalidDateError, WhInvalidInputError} from "./constants"
// import WhParameter from "csui/parameter/WhParameter";
import WhParameter from '@/common/utils/parameter.js'
// import CookieConst from "@/constant/CookieConst";


const mixin = {
  methods: {
    /**
     * 删除cookie
     * @param key
     */
    deleteCookie(key) {
      let exp = new Date();
      exp.setTime(exp.getTime() -6000);
      this.$cookies.set(key, "",exp);
    },
    /**
     * 从localStorage中取值
     * @param objectName
     * @param valName
     * @param defaultVal
     */
    getStoreItem(valName, defaultVal) {
      if (undefined === defaultVal) {
        return localStorage[valName];
      }
      if ("true" == localStorage[valName]) {
        return true;
      }
      if ("false" == localStorage[valName]) {
        return false;
      }
      if ("undefined" == localStorage[valName]) {
        return undefined;
      }
      return !!localStorage[valName] ? localStorage[valName] : defaultVal
    },
    /**
     * 向localStorage中存值
     * @param valName
     * @param val
     */
    setStoreItem(valName, val) {
      localStorage.setItem(valName, val);
    },
    setSessionStoreItem(valName, val) {
      sessionStorage.setItem(valName, val);
    },
    getSessionStoreItem(objectName, valName, defaultVal) {
      if (undefined === defaultVal) {
        return sessionStorage[objectName];
      }
      if ("true" == sessionStorage[objectName]) {
        return true;
      }
      if ("false" == sessionStorage[objectName]) {
        return false;
      }
      if ("undefined" == sessionStorage[objectName]) {
        return undefined;
      }
      return !!sessionStorage[objectName] ? JSON.parse(sessionStorage[objectName])[valName] : defaultVal
    },
    /**
     * 时间转日期
     * @param time
     * @returns {string}
     */
    timeToDate(time){
      return this.isEmpty(time)?"":time.substring(0,10)
    },

    /**
     * 计算总页码
     * @returns int
     */
    totalPage(totalnum, limit){
      return totalnum > 0 ? ((totalnum < limit) ? 1 : ((totalnum % limit) ? (parseInt(totalnum / limit) + 1) : (totalnum / limit))) : 1;
    },

    /**
     * 获取url请求前缀
     * @return http://127.0.0.1
     */
    getRequestPrefix() {
      // 获取网络协议
      let protocol = window.location.protocol;
      // 获取主机名+端口号
      let domainPort = window.location.host;
      // 获取发布项目的名称
      let url = window.location.pathname;
      let webApp = url.split('/')[1];
      return protocol + "//" + domainPort + "/" + webApp;
    },

    escape2Html(str) {
      var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    },
    /**
     * 获取身份证信息
     * @param idNum
     */
    getIDCardInfo(idNum = "  ") {
      const person = {};
      person.province = AREA_CODE[idNum.substring(0, 2) + "0000"];
      switch (person.province) {
        case "北京市":
        case "天津市":
        case "上海市":
        case "重庆市":
        case "台湾省":
        case "香港特别行政区":
        case "澳门特别行政区":
          person.city = person.province;
          break;
        default:
          person.city = AREA_CODE[idNum.substring(0, 4) + "00"];
          break;
      }
      person.birthday = idNum.substring(6, 10) + "-" + idNum.substring(10, 12) + "-" + idNum.substring(12, 14);
      const sexno = idNum.substring(16, 17);
      if (0 === sexno % 2) {
        person.sex = "女"
      } else {
        person.sex = "男"
      }
      person.age = this.getAge(person.birthday);
      return person;
    },
    /**
     * 获取年龄
     * @param birthday
     */
    getAge(birthday) {
      var returnAge;
      var birthdayArr = birthday.split("-");
      var birthYear = birthdayArr[0];
      var birthMonth = birthdayArr[1];
      var birthDay = birthdayArr[2];

      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();

      if (nowYear === birthYear) {
        returnAge = 0;//同年 则为0岁
      } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth === birthMonth) {
            var dayDiff = nowDay - birthDay;//日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birthMonth;//月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge;//返回周岁年龄
    },
    /**
     * 获取文件类型
     * @param filePath
     * @return {*}
     */
    getFileType(filePath) {
      var startIndex = filePath.lastIndexOf(".");
      if (startIndex != -1)
        return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
      else return "";
    },

    /**
     * 手机号校验
     * @param phone
     * @return {Array}
     */
    checkPhone(phone) {
      var reg=/^1\d{10}$/;
      return reg.test(phone);
    },

    retainNonNegative(param) {
      return param.replace(/[^\d.]/g, "")
          .replace(/^[0]{2,}/g, "0")
          .replace(/^(\d+)\.(\d{0,2}).*$/, '$1.$2');
    },

    inputLimitPositiveFloat(el) {
      el.target.value = this.retainNonNegative(el.target.value);
    },

    formatPositiveFloat(el) {
      this.inputLimitPositiveFloat(el);
      let str = el.target.value + "";
      if(!this.isEmpty(str)){
        if ("." === str.charAt(str.length - 1)) {
          str = str.substring(0, str.length - 1);
        }
        if(str.indexOf(".") != -1){
          str = parseFloat(str.split(".")[0])+"."+str.split(".")[1];
        }else{
          str = parseFloat(str);
        }
      }
      el.target.value = str;
      return el.target.value;
    },

    /**
     * 限制输入身份证号[数字、字母X]
     */
    checkIDNum(el) {
      if (el.target.value.length === 1) {
        el.target.value = el.target.value.replace(/[^1-9]/g, '');
      } else if (obj.value.length === 18) {
        el.target.value = el.target.value.replace(/[^0-9xX]/g, '');
      } else {
        el.target.value = el.target.value.replace(/\D/g, '');
      }
    },
    /**
     * 校验输入正整数
     * @param el
     */
    checkPositiveInt(el) {
      if (el.target.value.length === 1) {
        el.target.value = el.target.value.replace(/[^1-9]/g, '');
      } else {
        el.target.value = el.target.value.replace(/\D/g, '');
      }
      return el.target.value;
    },

    /**
     * 校验输入数字
     * @param el
     */
    checkNonNegativeInt(el) {
      el.target.value = el.target.value.replace(/\D/g, '');
    },

    /**
     * 手机号脱敏
     * @param obj
     * @returns {XML|void|string}
     */
    phoneNumMask(obj) {
      var pat = /(\d{3})\d*(\d{4})/;
      return obj.replace(pat, '$1****$2');
    },

    /**
     * 去除数字前面的0
     * @param obj
     */
    checkNonNegativeIntBlur(obj) {
      if (parseInt(obj.value) === 0) {
        obj.value = 0;
      } else {
        obj.value = obj.value.replace(/\b(0+)/gi, "");
      }
    },

    /**
     * 金额分转成元
     *
     * @param money
     * @returns
     */
    moneyToYuan(money) {
      if (this.isEmpty(money)) {
        return money;
      } else {
        return (money / 100).toFixed(2);
      }
    },
    /***
     * 金额千分符
     */
    toQian(val) {
        if (typeof (val) === 'string') {
            return (val).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        }
    },
    /****
     * 数字金额转中文金额
     */
    toChies(numberValue){
      var numberValue=new String(Math.round(numberValue*100)); // 数字金额
      var chineseValue=""; // 转换后的汉字金额
      var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
      var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
      var len=numberValue.length; // numberValue 的字符串长度
      var Ch1; // 数字的汉语读法
      var Ch2; // 数字位的汉字读法
      var nZero=0; // 用来计算连续的零值的个数
      var String3; // 指定位置的数值
      if(len>15){
      alert("超出计算范围");
      return "";
      }
      if (numberValue==0){
      chineseValue = "零元整";
      return chineseValue;
      }

      String2 = String2.substr(String2.length-len, len); // 取出对应位数的STRING2的值
      for(var i=0; i<len; i++){
      String3 = parseInt(numberValue.substr(i, 1),10); // 取出需转换的某一位的值
      if ( i != (len - 3) && i != (len - 7) && i != (len - 11) && i !=(len - 15) ){
      if ( String3 == 0 ){
      Ch1 = "";
      Ch2 = "";
      nZero = nZero + 1;
      }
      else if ( String3 != 0 && nZero != 0 ){
      Ch1 = "零" + String1.substr(String3, 1);
      Ch2 = String2.substr(i, 1);
      nZero = 0;
      }
      else{
      Ch1 = String1.substr(String3, 1);
      Ch2 = String2.substr(i, 1);
      nZero = 0;
      }
      }
      else{ // 该位是万亿，亿，万，元位等关键位
      if( String3 != 0 && nZero != 0 ){
      Ch1 = "零" + String1.substr(String3, 1);
      Ch2 = String2.substr(i, 1);
      nZero = 0;
      }
      else if ( String3 != 0 && nZero == 0 ){
      Ch1 = String1.substr(String3, 1);
      Ch2 = String2.substr(i, 1);
      nZero = 0;
      }
      else if( String3 == 0 && nZero >= 3 ){
      Ch1 = "";
      Ch2 = "";
      nZero = nZero + 1;
      }
      else{
      Ch1 = "";
      Ch2 = String2.substr(i, 1);
      nZero = nZero + 1;
      }
      if( i == (len - 11) || i == (len - 3)){ // 如果该位是亿位或元位，则必须写上
      Ch2 = String2.substr(i, 1);
      }
      }
      chineseValue = chineseValue + Ch1 + Ch2;
      }

      if ( String3 == 0 ){ // 最后一位（分）为0时，加上“整”
      chineseValue = chineseValue + "整";
      }

      return chineseValue;
    },
    moneyFenToWan(money) {
      if (this.isEmpty(money)) {
        return money;
      } else {
        return parseFloat((money / 1000000).toFixed(6));
      }
    },

    /**
     * 判断字符串是否为空字符串
     *
     * @param str
     *            字符串
     * @returns {Boolean}
     */
    isEmpty(str) {
      return null == str || undefined == str || 0 == (str + "").trim().length;
    },

    /**
     * 金额元转成分
     *
     * @param money
     * @returns
     */
    moneyToFen(money) {
      return Math.round((money * 100) * 1000) / 1000;
    },

    /**
     * 金额元转成分
     * 金额可以为空
     * @param money
     * @returns
     */
    moneyToFenEmpty(money) {
      if (this.isEmpty(money)) {
        return money;
      } else {
        return Math.round((money * 100) * 1000) / 1000;
      }
    },

    /**
     * 获取当前日期
     * @returns
     * 格式2017-07-02
     */
    getNowDate() {
      var nowtime = new Date();
      var year = nowtime.getFullYear();
      var month = this.padleft0(nowtime.getMonth() + 1);
      var day = this.padleft0(nowtime.getDate());
      return year + "-" + month + "-" + day;
    },

    /**
     * 获取当前日期的前一天
     *
     */
    getYesterday() {
      var date = new Date();
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
      var yyyy = date.getFullYear();
      var mm = this.padleft0(date.getMonth() + 1);
      var dd = this.padleft0(date.getDate());
      return yyyy + "-" + mm + "-" + dd;
    },

    /**
     * 获取当前日期的后一天
     *
     */
    getTomorrow() {
      var date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      var yyyy = date.getFullYear();
      var mm = this.padleft0(date.getMonth() + 1);
      var dd = this.padleft0(date.getDate());
      return yyyy + "-" + mm + "-" + dd;
    },

    /**
     * 获取当前日期时间
     * @returns
     * 格式2017-07-02 02:05:50
     */
    getNowTime() {
      var nowtime = new Date();
      var year = nowtime.getFullYear();
      var month = this.padleft0(nowtime.getMonth() + 1);
      var day = this.padleft0(nowtime.getDate());
      var hour = this.padleft0(nowtime.getHours());
      var minute = this.padleft0(nowtime.getMinutes());
      var second = this.padleft0(nowtime.getSeconds());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },
    getTomorrowMinTime(){
      var date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      var yyyy = date.getFullYear();
      var mm = this.padleft0(date.getMonth() + 1);
      var dd = this.padleft0(date.getDate());
      return yyyy + "-" + mm + "-" + dd+" 00:00:00";
    },
    getNowDateMinTime(){
      var nowtime = new Date();
      var year = nowtime.getFullYear();
      var month = this.padleft0(nowtime.getMonth() + 1);
      var day = this.padleft0(nowtime.getDate());
      return year + "-" + month + "-" + day + " 00:00:00";
    },
    /**
     *
     * @returns {string}
     */
    getNowTimeFloor10Min(){
      var nowtime = new Date();
      var year = nowtime.getFullYear();
      var month = this.padleft0(nowtime.getMonth() + 1);
      var day = this.padleft0(nowtime.getDate());
      var hour = this.padleft0(nowtime.getHours());
      var minute = this.padleft0(parseInt(nowtime.getMinutes()/10)*10);
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00";
    },
    /**
     * 补齐两位数
     */
    padleft0(obj) {
      return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
    },

    /**
     * 获取前一个月的日期时间
     * @param dateTime
     * @returns
     * 格式2017-07-02 02:05:50
     */
    getLastMonthTime(dateTime) {
      var dateStr = dateTime.replace(/-/g, "/");
      var date = new Date(dateStr);
      var currentYear = date.getFullYear();
      var currentMonth = date.getMonth() + 1;
      var currentDate = date.getDate();
      var daysInMonth = [[0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]];
      if (currentYear % 4 == 0 && currentYear % 100 != 0) {
        daysInMonth[2] = 29;
      }
      var prevYear = 0;
      var prevMonth = 0;
      if (currentMonth == 1) {
        prevYear = currentYear - 1;
        prevMonth = 12;
      } else {
        prevYear = currentYear;
        prevMonth = currentMonth - 1;
      }
      currentDate = daysInMonth[prevMonth] >= currentDate ? currentDate : daysInMonth[prevMonth];
      var hour = this.padleft0(date.getHours());
      var minute = this.padleft0(date.getMinutes());
      var second = this.padleft0(date.getSeconds());
      return prevYear + "-" + this.padleft0(prevMonth) + "-" + this.padleft0(currentDate) + " " + hour + ":" + minute + ":" + second;
    },

    /**
     * 获取前一个月的日期
     * @param originalDate
     * @returns
     * 格式2017-07-02
     */
    getLastMonthDate(originalDate) {
      // var dateStr = originalDate.replace(/-/g, "/");
      // var date = new Date(dateStr);
      // var currentYear = date.getFullYear();
      // var currentMonth = date.getMonth() + 1;
      // var currentDate = date.getDate();
      // var daysInMonth = [[0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]];
      // if (currentYear % 4 == 0 && currentYear % 100 != 0) {
      //   daysInMonth[2] = 29;
      // }
      // var prevYear = 0;
      // var prevMonth = 0;
      // if (currentMonth == 1) {
      //   prevYear = currentYear - 1;
      //   prevMonth = 12;
      // } else {
      //   prevYear = currentYear;
      //   prevMonth = currentMonth - 1;
      // }
      // currentDate = daysInMonth[prevMonth] >= currentDate ? currentDate : daysInMonth[prevMonth];
      // return prevYear + "-" + this.padleft0(prevMonth) + "-" + this.padleft0(currentDate);
      return '2014-01-01'
    },

    /**
     * 获取后n个月的日期时间
     * @param originalDate
     * @param num
     * @returns
     * 格式2017-07-02
     */
    getNextNMonthDate(originalDate, num) {
      var dateStr = originalDate.replace("-", "/").replace("-", "/");
      var date = new Date(dateStr);
      var currentYear = date.getFullYear();
      var currentMonth = date.getMonth() + 1;
      var currentDate = date.getDate();
      var daysInMonth = [[0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]];
      if (currentYear % 4 == 0 && currentYear % 100 != 0) {
        daysInMonth[2] = 29;
      }
      var nextYear = 0;
      var nextMonth = 0;
      if ((currentMonth + num) > 12) {
        nextYear = currentYear + 1;
        nextMonth = currentMonth + num - 12;
      } else {
        nextYear = currentYear;
        nextMonth = currentMonth + num;
      }
      currentDate = daysInMonth[nextMonth] >= currentDate ? currentDate : daysInMonth[nextMonth];
      var hour = this.padleft0(date.getHours());
      var minute = this.padleft0(date.getMinutes());
      var second = this.padleft0(date.getSeconds());
      return nextYear + "-" + this.padleft0(nextMonth) + "-" + this.padleft0(currentDate)+" "+ hour + ":" + minute + ":" + second;
    },

    /**
     * 获取近num+1个月的年月
     * @param num
     * @return {Array}
     */
    getRecentYearMonth(num) {
      var d = new Date();
      var year = d.getFullYear();
      var month = this.padleft0(d.getMonth() + 1);
      var result = [year + "-" + month];
      for (var i = 0; i < num; i++) {
        d.setMonth(d.getMonth() - 1);
        var m = this.padleft0(d.getMonth() + 1);
        result.push(d.getFullYear() + "-" + m);
      }
      return result;
    },

    /**
     * 判断变量是否在数组中
     * @param str
     * @param arry
     * @return {boolean}
     */
    isInArray(str, arry) {
      for (var i = 0; i < arry.length; i++) {
        if (arry[i] === str) {
          return true;
        }
      }
      return false;
    },

    /**
     * 返回元素在数组中的索引
     * @param a
     * @param obj
     * @return {boolean}
     */
    arrayIndex(a, obj) {
      var i = a.length;
      while (i--) {
        if (a[i] === obj) {
          return i;
        }
      }
      return false;
    },

    /**
     * 判断字符串长度大于自然长度engLen时，后面加省略号
     */
    retainStringFixLenEng(str, engLen) {
      if (this.getLenEng(str) <= engLen) {
        return str;
      }
      // 进行截断操作
      var result = "";
      var iLengthEng = 0;
      for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
          iLengthEng += 1;
        } else {
          iLengthEng += 2;
        }
        if (iLengthEng < engLen - 3) {
          result += str.substr(i, 1);
        } else {
          break;
        }
      }
      return result + '...';
    },

    /**
     * 判断字符串长度大于len是，后面加省略号
     */
    retainStringFixLen(str, len) {
      return str.length > len ? str.slice(0, len - 3) + '...' : str;
    },

    /**
     * 获取字符自然长度
     *
     * @param str
     * @returns {Number}
     */
    getLenEng(str) {
      var lengthEng = 0;
      for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
          lengthEng += 1;
        } else {
          lengthEng += 2;
        }
      }
      return lengthEng;
    },

    /**
     * 百分比
     * @param num
     * @param total
     * @return {*}
     * @constructor
     * @return {string}
     */
    GetPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "-";
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
    },

    /**
     * 获取浏览器类型
     * myBrowser，保存在sessionStorage中
     */
    myExplorer() {
      var explorer = window.navigator.userAgent;
      if (!!window.ActiveXObject || "ActiveXObject" in window) {//IE
        if (!window.XMLHttpRequest) {
          sessionStorage.setItem("myBrowser", "IE");
        } else if (window.XMLHttpRequest && !document.documentMode) {
          sessionStorage.setItem("myBrowser", "IE");
        } else if (!-[1,] && document.documentMode && !("msDoNotTrack" in window.navigator)) {
          sessionStorage.setItem("myBrowser", "IE");
        } else {//IE9 10 11
          var hasStrictMode = (function () {
            "use strict";
            return this === undefined;
          }());
          if (hasStrictMode) {
            if (!!window.attachEvent) {
              sessionStorage.setItem("myBrowser", "IE");
            } else {
              sessionStorage.setItem("myBrowser", "IE");
            }
          } else {
            sessionStorage.setItem("myBrowser", "IE");
          }
        }
      } else {//非IE
        if (explorer.indexOf("LBBROWSER") >= 0) {
          sessionStorage.setItem("myBrowser", "猎豹");
        } else if (explorer.indexOf("360ee") >= 0) {
          sessionStorage.setItem("myBrowser", "360极速浏览器");
        } else if (explorer.indexOf("360se") >= 0) {
          sessionStorage.setItem("myBrowser", "360安全浏览器");
        } else if (explorer.indexOf("se") >= 0) {
          sessionStorage.setItem("myBrowser", "搜狗浏览器");
        } else if (explorer.indexOf("aoyou") >= 0) {
          sessionStorage.setItem("myBrowser", "遨游浏览器");
        } else if (explorer.indexOf("qqbrowser") >= 0) {
          sessionStorage.setItem("myBrowser", "QQ浏览器");
        } else if (explorer.indexOf("baidu") >= 0) {
          sessionStorage.setItem("myBrowser", "百度浏览器");
        } else if (explorer.indexOf("Firefox") >= 0) {
          sessionStorage.setItem("myBrowser", "火狐");
        } else if (explorer.indexOf("Maxthon") >= 0) {
          sessionStorage.setItem("myBrowser", "遨游");
        } else if (explorer.indexOf("Chrome") >= 0) {
          sessionStorage.setItem("myBrowser", "谷歌（或360伪装）");
        } else if (explorer.indexOf("Opera") >= 0) {
          sessionStorage.setItem("myBrowser", "欧朋");
        } else if (explorer.indexOf("TheWorld") >= 0) {
          sessionStorage.setItem("myBrowser", "世界之窗");
        } else if (explorer.indexOf("Safari") >= 0) {
          sessionStorage.setItem("myBrowser", "Safari");

        } else {
          sessionStorage.setItem("myBrowser", "其他");
        }
      }
    },


    /**
     * 校验金额格式
     *
     * @param money
     * @returns
     */
    validMoney(money) {
      const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      return reg.test(money);
    },

    /**
     * 校验数值格式
     * 小数点后6位
     * @param number
     * @returns
     */
    valid6Point(number) {
      const reg = /^\d+(\.\d{1,6})?$/;
      return reg.test(number);
    },


    /**
     * 校验日期
     */
    validDate(date) {
      const reg = /^(\d{4})-(\d{2})-(\d{2})$/;
      return reg.test(date);
    },

    /**
     * 校验日期时间
     */
    validDateTime(dateTime) {
      var timeReg = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
      return timeReg.test(dateTime);
    },

    /**
     * 校验百分比
     */
    validPercent(number) {
      var reg = /^(\d{1,2}(\.\d{1,5})?|100)$/;
      return reg.test(number);
    },

    /**
     * 校验非空
     * @param val
     * @param hintKey
     */
    verifyNotEmpty(val, hintKey, maxLen = -1) {
      if(WhParameter.isInvalid(val)){
        throw new WhInvalidInputError(ERROR_CODE.INPUT_EMPTY, hintKey);
      }

      if(maxLen <= 0){
        return;
      }

      if((val + "").length > maxLen){
        throw new WhInvalidInputError(ERROR_CODE.MAX_LENGTH, hintKey, maxLen);
      }
    },

    /**
     * 校验字符串不超过maxLen
     * @param val
     * @param hintKey
     * @param maxLen
     */
    verifyEmptyAble(val, hintKey, maxLen) {
      if(this.isEmpty(val)){
        return;
      }

      if(maxLen <= 0){
        return;
      }

      if((val + "").length > maxLen){
        throw new WhInvalidInputError(ERROR_CODE.MAX_LENGTH, hintKey, maxLen);
      }
    },

    /**
     * 校验非空
     * @param val
     * @param hintKey
     */
    verifyGt0(val, hintKey) {
      this.verifyNotEmpty(val, hintKey);

      if(val <= 0){
        throw new WhInvalidInputError(ERROR_CODE.VALUE_GT_ZERO, hintKey);
      }
    },

    /**
     * 校验非空
     * @param val
     * @param hintKey
     */
    verifyGte0(val, hintKey) {
      this.verifyNotEmpty(val, hintKey)

      if(val < 0){
        throw new WhInvalidInputError(ERROR_CODE.VALUE_GTE_ZERO, hintKey);
      }
    },

    /**
     * 判断是否在取值范围内
     * @param amount
     * @param hintKey
     * @param min
     * @param max
     */
    verifyAmountInRange(amount, hintKey, min, max) {
      this.verifyNotEmpty(amount, hintKey);

      if (amount > max) {
        throw new WhInvalidInputError(ERROR_CODE.MAX_VALUE, hintKey, max);
      }

      if (amount <= min) {
        throw new WhInvalidInputError(ERROR_CODE.MIN_VALUE, hintKey, min);
      }
    },

    /**
     * 校验输入的百分比格式
     *
     * @param percent
     * @param varName
     * @param isExplicit
     * @param errorHandler
     * @returns {Boolean}
     */
    verifyPercentNotEmpty(percent, varName, isExplicit, errorHandler = this.$CsuiToast) {
      if (this.isEmpty(amount)) {
        if (isExplicit) {
          errorHandler(varName + "不能为空，请重新输入！");
        }
        return false;
      }
      if (!this.validPercent(percent)) {
        if (isExplicit) {
          errorHandler("无效的百分比格式(" + varName + ")，请重新输入！");
        }
        return false;
      }
      return true;
    },

    /**
     * 校验金额
     *
     * @param money
     * @param varName
     * @param isExplicit 是否显示异常
     * @param errorHandler
     * @returns {Boolean}
     */
    verifyMoney(money, varName, isExplicit, errorHandler = this.$CsuiToast) {
      if (!this.validMoney(money)) {
        if (isExplicit) {
          errorHandler("无效的金额格式(" + varName + ")，请重新输入！");
        }
        return false;
      }

      if (money > MONEY_MAX) {
        if (isExplicit) {
          errorHandler("输入金额(" + varName + ")超出范围，请重新输入！");
          return false;
        }
      }
      return true;
    },

    /**
     * 校验字符串非空，且长度在minLen至maxLen之间
     *
     * @param str
     * @param varName
     * @param maxLen
     * @param minLen
     * @param isExplicit
     * @param errorHandler
     * @returns {Boolean}
     */
    verifyStringInRange(str, varName, minLen, maxLen, isExplicit, errorHandler = this.$CsuiToast) {
      if (this.isEmpty(str)) {
        if (isExplicit) {
          errorHandler(varName + "不能为空，请重新输入！");
        }
        return false;
      }
      if ((str + "").length < minLen) {
        if (isExplicit) {
          errorHandler("输入字符串(" + varName + ")长度不能少于" + minLen + "个字符，请重新输入！");
        }
        return false;
      }
      if ((str + "").length > maxLen) {
        if (isExplicit) {
          errorHandler("输入字符串(" + varName + ")长度不能超过" + maxLen + "个字符，请重新输入！");
        }
        return false;
      }
      return true;
    },

    /**
     * 校验日期时间，非空
     *
     * @param dateTime
     * @param hintKey
     */
    verifyDateTimeNotEmpty(dateTime, hintKey) {
      this.verifyNotEmpty(dateTime, hintKey);

      if (!this.validDateTime(dateTime)) {
        throw new WhInvalidInputError(ERROR_CODE.INVALID_DATE , hintKey);
      }
    },

    /**
     * 校验日期非空
     *
     * @param dateTime
     * @param hintKey
     */
    verifyDateNotEmpty(dateTime, hintKey) {
      this.verifyNotEmpty(dateTime, hintKey);

      if (!this.validDate(date)) {
        throw new WhInvalidInputError(ERROR_CODE.INVALID_DATE , hintKey);
      }
    },
    /**
     * 比较开始与截止日期或日期时间
     *
     * @param startDate
     * @param startHintKey
     * @param endDate
     * @param endHintKey
     */
    verifyStartEndDate(startDate, startHintKey, endDate, endHintKey) {
      this.verifyNotEmpty(startDate, startHintKey);
      this.verifyNotEmpty(endDate, endHintKey);

      const start = new Date(startDate.replace("-", "/").replace("-", "/"));
      const end = new Date(endDate.replace("-", "/").replace("-", "/"));
      if (start > end) {
        throw new WhInvalidDateError(ERROR_CODE.INVALID_DATE_INTERVAL, startHintKey, endHintKey);
      }
    },

    /**
     * 合法性校验
     * @param content 内容
     * @param type 类型
     * @returns {boolean}
     */
    validate(content, type) {
      if (this.isEmpty(content)) {
        return false;
      }
      var regex = "^[";
      // 包含数字
      if (0 !== (type & input_verify.TYPE_NUMERIC)) {
        regex += "0-9";
      }
      // 包含小写字母
      if (0 !== (type & input_verify.TYPE_LOWER_LETTER)) {
        regex += "a-z";
      } // 大写字母
      if (0 !== (type & input_verify.TYPE_UPPER_LETTER)) {
        regex += "A-Z";
      } // 包含下划线
      if (0 !== (type & input_verify.TYPE_UNDER_LINE)) {
        regex += "_";
      } // 包含汉字
      if (0 !== (type & input_verify.TYPE_CHINESE_CHAR)) {
        regex += "\\u4e00-\\u9fa5";
      }
      // 包含特殊字符
      if (0 !== (type & input_verify.TYPE_SPECIAL_CHAR)) {
        regex += "`~!@#\\$%\\^&\\*\\(\\)_\\+\\-=\\{\\}\\|\\[\\]\\\\:\";'<>\\?,\\./";
      }
      // 包含中文标点符号
      if (0 !== (type & input_verify.TYPE_CHINESE_PRINT_CHAR)) {
        regex += "。？！，、；：“”‘'（）《》〈〉【】…—～￥";
      }
      regex += "]+$";

      var reg = new RegExp(regex);
      return reg.test(content);
    }
    ,

    countVarType(content) {
      var amount = 0;
      //是否存在数字
      if (new RegExp(".*[0-9]+.*").test(content)) {
        amount++;
      }
      // 是否存在小写字母
      if (new RegExp(".*[a-z]+.*").test(content)) {
        amount++;
      }
      // 是否存在大写字母
      if (new RegExp(".*[A-Z]+.*").test(content)) {
        amount++;
      }
      // 是否存在特殊字符
      if (new RegExp(".*[`~!@#\\$%\\^&\\*\\(\\)_\\+\\-=\\{\\}\\|\\[\\]\\\\:\";'<>\\?,\\./]+.*").test(content)) {
        amount++;
      }

      return amount;
    }
    ,

    /**
     * 校验输入字符类型合法性
     */
    verifyCharacterType(content, varName, type, errorHandler = this.$CsuiToast) {
      var typeTxt = [];
      // 包含数字
      if (0 !== (type & input_verify.TYPE_NUMERIC)) {
        typeTxt.push("数字");
      }
      // 包含小写字母
      if (0 !== (type & input_verify.TYPE_LOWER_LETTER)) {
        typeTxt.push("小写字母");
      } // 大写字母
      if (0 !== (type & input_verify.TYPE_UPPER_LETTER)) {
        typeTxt.push("大写字母");
      } // 包含下划线
      if (0 !== (type & input_verify.TYPE_UNDER_LINE)) {
        typeTxt.push("下划线");
      } // 包含汉字
      if (0 !== (type & input_verify.TYPE_CHINESE_CHAR)) {
        typeTxt.push("汉字");
      }
      // 包含特殊字符
      if (0 !== (type & input_verify.TYPE_SPECIAL_CHAR)) {
        typeTxt.push("特殊字符");
      }
      //包含中文标点符号
      if (0 !== (type & input_verify.TYPE_CHINESE_PRINT_CHAR)) {
        typeTxt.push("中文标点符号");
      }

      var alertContent = "";
      for (var i = 0; i < typeTxt.length; i++) {
        if (i === typeTxt.length - 1) {
          alertContent += typeTxt[i];
          continue;
        }
        alertContent += typeTxt[i] + "、";
      }

      if (!this.validate(content, type)) {
        errorHandler(varName + "输入限制为" + alertContent + "，请重新输入！");
      }
      return validate(content, type);
    },


    // TODO、移动方法位置
    hintError(error, errorHandler = this.$CsuiToast) {
      // 输入为空
      if(ERROR_CODE.INPUT_EMPTY === error.errorCode){
        errorHandler(error.hintKey + "不能为空，请重新输入！");
        return;
      }

      // 输入超过最大要求
      if(ERROR_CODE.MAX_LENGTH === error.errorCode){
        errorHandler(error.hintKey + "不能超过" + error.limitValue + "位，请重新输入！");
        return;
      }

      // 输入小于MIN
      if(ERROR_CODE.MIN_VALUE === error.errorCode){
        errorHandler(error.hintKey + "不能小于" + error.limitValue + "位，请重新输入！");
        return;
      }

      // 输入大于MAX
      if(ERROR_CODE.MAX_VALUE === error.errorCode){
        errorHandler(error.hintKey + "不能大于" + error.limitValue + "，请重新输入！");
        return;
      }

      // 输入大于0
      if(ERROR_CODE.VALUE_GT_ZERO === error.errorCode){
        errorHandler(error.hintKey + "必须大于零，请重新输入！");
        return;
      }

      // 输入大于0
      if(ERROR_CODE.VALUE_GTE_ZERO === error.errorCode){
        errorHandler(error.hintKey + "必须大于或等于零，请重新输入！");
        return;
      }

      // 无效的日期
      if(ERROR_CODE.INVALID_DATE === error.errorCode){
        errorHandler("无效的日期时间格式(" + error.hintKey + ")，请重新输入！");
      }

      // 无效的日期间隔
      if(ERROR_CODE.INVALID_DATE_INTERVAL === error.errorCode){
        errorHandler(error.startHintKey + "不能超过" + error.endHintKey);
      }
    }

  }

}
export default mixin
