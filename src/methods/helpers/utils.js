/**
 * 生成唯一key
 * @param len
 * @returns {string}
 */
export function getUuid(len) {
    var radix = 16; //16进制
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

// RGB颜色转换为16进制
export function rgbToHex(rgb) {
    if (rgb.includes('rgba')) {
        return 'transparent';
    } else if (rgb.includes('rgb')) {
        let rgbArr = rgb.substring(4, rgb.length - 1).split(", ")
        return "#" + toHex(rgbArr[0]) + toHex(rgbArr[1]) + toHex(rgbArr[2]);
    } else {
        return rgb;
    }


}
// RGB颜色转换为16进制
function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
        "0123456789ABCDEF".charAt(n % 16);
}

/**
 * 合并对象属性
 * @param args
 * @returns {*}
 */
export function merge(...args) {
    let obj = {}
    args.unshift(obj)

    return Object.assign.apply(null, args)
}

/**
 * 为字符串或者数字添加px
 * @param any
 * @returns {string}
 */
export function any2Px(any) {
    return parseInt(any) + 'px';
}