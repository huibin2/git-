//余额格式化显示
export function NumFormat(value) {
    if (!value) return "0.00";
    value = value.toFixed(2);
    var intPart = Number(value).toFixed(0); // 获取整数部分
    var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
    var floatPart = ".00"; // 预定义小数部分
    var value2Array = value.split(".");
    // =2表示数据有小数位
    if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
            // 补0,实际上用不着
            return intPartFormat + "." + floatPart + "0";
        } else {
            return intPartFormat + "." + floatPart;
        }
    } else {
        return intPartFormat + floatPart;
    }
}
//银行卡号格式化
export function cardFormat(value) {
    if(value != "")
    var cardid = value.toString();   //把卡号转为String 
    var front = cardid.substring(0, 6); //截取前6位
    var after = cardid.substring(cardid.length-4, cardid.length); //后四位
    return front + "****" + after;   
}
//手机号格式化
export function phoneFormat(value) {
    if(value != ""){
    var cardid = value.toString();   //把手机号转为String 
    var front = cardid.substring(0, 3); //截取前6位
    var after = cardid.substring(cardid.length-4, cardid.length); //后四位
    return front + "****" + after;   
    }
}




