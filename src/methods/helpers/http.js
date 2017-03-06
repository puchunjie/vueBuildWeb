/**
 *
 * 调用方法
 * import { getApi } from 'httpHelper'
 * getApi('http://192.168.40.33:8080/', {test:1}, true).then(function(s) {
 *      console.log(s);
 * })
 *
 */

//==========================================================================================//

/**
 * ajax get
 * @param url 请求url地址
 * @param data 参数object
 * @param outputJson 输出数据类型是否为json
 * @returns {*}
 */
export function getApi (url, data, outputJson) {
    var param = apiParam(url, data, outputJson);
    param.type = 'get';
    return $.when($.ajax(param))
}

/**
 * ajax post
 * @param url 请求url地址
 * @param data 参数object
 * @param outputJson 输出数据类型是否为json
 * @returns {*}
 */
export function postApi(url, data, outputJson) {
    var param = apiParam(url, data, outputJson);
    param.type = 'post';
    return $.when($.ajax(getParam))
}

/**
 * ajax post [post请求数据为application/json类型]
 * @param url
 * @param data
 * @param outputJson
 * @returns {*}
 */
export function postJsonApi(url, data, outputJson) {
    var param = apiParam(url, data);
    param.type = 'post';
    param.contentType =  "application/json";
    return $.when($.ajax(param))
}

/**
 * 拼接公用ajax请求参数
 * @param url
 * @param data
 * @returns {{url: *}}
 */
function apiParam (url, data, outputJson) {
    var param = {url: url};
    if(data && typeof data == "object") {
        param.data = data;
    }
    if(outputJson) {
        param.dataType = 'json';
    }
    return param;
}