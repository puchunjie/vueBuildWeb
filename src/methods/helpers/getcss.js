import { rgbToHex } from './utils';
/**
 *
 * 获取模块border,边框
 * @export
 * @param {当前模块vm} _this
 * @param {需要获取的元素节点 $styles下的属性按照css的选择器规则} targetNode
 * @returns  返回当前模块边框的组合对象，用于传入border-set组件
 */
export function getBorderData(_this, targetNode) {
    //使用jquery获取模块实时css属性，需要知道模块设置项在哪个节点上
    let borderContainer = getCssFromStyleSheets(_this, targetNode);
    if (!borderContainer) return {}

    return {
        borderWidth: borderContainer.attr('border-width'),
        borderStyle: borderContainer.attr('border-style'),
        borderColor: borderContainer.attr('border-color'),
        borderTopWidth: borderContainer.attr('border-top-width'),
        borderTopStyle: borderContainer.attr('border-top-style'),
        borderTopColor: borderContainer.attr('border-top-color'),
        borderRightWidth: borderContainer.attr('border-right-width'),
        borderRightStyle: borderContainer.attr('border-right-style'),
        borderRightColor: borderContainer.attr('border-right-color'),
        borderBottomWidth: borderContainer.attr('border-bottom-width'),
        borderBottomStyle: borderContainer.attr('border-bottom-style'),
        borderBottomColor: borderContainer.attr('border-bottom-color'),
        borderLeftWidth: borderContainer.attr('border-left-width'),
        borderLeftStyle: borderContainer.attr('border-left-style'),
        borderLeftColor: borderContainer.attr('border-left-color'),
        borderRadius: borderContainer.attr('border-radius')
    }

}

/**
 *
 * 获取模块padding/margin,边距
 * @export
 * @param {any} _this
 * @param {any} targetNode
 * @param {'p'/'m'} type
 */
export function getMPData(_this, targetNode, type) {
    type = type === 'p' ? 'padding' : type === 'm' ? 'margin' : false;
    if (!type) {
        console.log("getMPData方法参数错误！请检查");
        return
    }
    //使用jquery获取模块实时css属性，需要知道模块设置项在哪个节点上
    let paddingContainer = getCssFromStyleSheets(_this, targetNode);

    if (!paddingContainer) return {}

    return {
        mp: paddingContainer.attr(type),
        mpTop: paddingContainer.attr(type + "-top"),
        mpRight: paddingContainer.attr(type + "-right"),
        mpBottom: paddingContainer.attr(type + "-bottom"),
        mpLeft: paddingContainer.attr(type + "-left")
    }
}



/**
 * 获取模块opacity,透明度
 * @export
 * @param {any} _this
 * @returns
 */
export function getOpacityData(_this, targetNode) {

    let opacityContainer = getCssFromStyleSheets(_this,targetNode);

    if (!opacityContainer) return {}

    return { opacity: opacityContainer.attr("opacity") * 10 }
}

/**
 * 获取模块background,背景
 * @export
 * @param {any} _this
 * @param {any} targetNode
 * @returns
 */
export function getBackgroundData(_this, targetNode) {

    let backgroundContainer = getCssFromStyleSheets(_this, targetNode);

    if (!backgroundContainer) return {}

    let br = backgroundContainer.attr("background-repeat");
    let bp = backgroundContainer.attr("background-position") == 'center center'?'center' : backgroundContainer.attr("background-position");
    let bi = backgroundContainer.attr("background-image");
    let ba = backgroundContainer.attr("background-attachment");
    //处理颜色值为16进制
    let bc = backgroundContainer.attr("background-color");
    let bs = backgroundContainer.attr("background-size");
    
    //背景位置处理，转译
    switch (bp) {
        case '0% 0%':
            bp = 'left top';
            break;
        case '0% 50%':
            bp = 'left center';
            break;
        case '50% 0%':
            bp = 'center top';
            break;
        case "100% 0%":
            bp = 'right top';
            break;
        case "50% 50%":
            bp = 'center';
            break;
        case "100% 50%":
            bp = 'right center';
            break;
        case "0% 100%":
            bp = 'left bottom';
            break;
        case "50% 100%":
            bp = 'center bottom';
            break;
        case "100% 100%":
            bp = 'right bottom';
            break;
    }

    return {
        backgroundRepeat: br,
        backgroundPosition: bp,
        backgroundColor: bc,
        backgroundImage: bi,
        backgroundAttachment: ba,
        backgroundSize: bs
    }
}


/**
 *
 * 获取模块font，字体
 * @export
 * @param {any} _this
 * @param {any} targetNode
 * @returns
 */
export function getFontData(_this, targetNode) {

    let fontContainer = getCssFromStyleSheets(_this, targetNode);

    if (!fontContainer) return {}

    return {
        fontColor: fontContainer.attr("color"),
        fontSize: fontContainer.attr("font-size"),
        fontFamily: fontContainer.attr("font-family"),
        fontWeight: fontContainer.attr("font-weight"),
        lineHeight: fontContainer.attr("line-height"),
        textAlign: fontContainer.attr("text-align"),
        fontStyle: fontContainer.attr("font-style")
    }
}

export function getBaseData(_this, targetNode, prop) {

    let fontContainer = getCssFromStyleSheets(_this, targetNode);

    if (!fontContainer) return {}
    var obj = {};
    for (var i = 0; i < prop.length; i++) {
        obj[prop[i]] = fontContainer.attr(prop[i])
    }
    return obj
}

export function getScrollData(_this, targetNode) {

    let fontContainer = getCssFromStyleSheets(_this, targetNode);

    if (!fontContainer) return {}

    return {
        backgroundColor: fontContainer.attr("background-color")
    }
}

function getCssFromStyleSheets(_this, target) {
    let parent = '#style_' + _this.getModuleData.moduleId;
    let rules = $(parent).prop('sheet').cssRules;
    target = !target ? '' : ' ' + target;

    for (let i = 0; i < rules.length; i++) {
        if (rules[i].selectorText == parent.replace('style_', '') + target) {
            return {
                data: rules[i].style,
                attr: function(attributes) {
                    let originValue = this.data[attributes];
                    if (attributes.indexOf('width') > -1 ||
                        attributes.indexOf('height') > -1 ||
                        (attributes.indexOf('size') > -1 && attributes.indexOf('background')<0) ||
                        attributes.indexOf('radius') > -1 ||
                        attributes.indexOf('padding') > -1 ||
                        attributes.indexOf('margin') > -1
                    ) {
                        originValue = parseInt(originValue);
                    } else if (attributes.indexOf('color') > -1) {
                        originValue = rgbToHex(originValue);
                    }
                    return originValue;
                }
            };
        }
    }
    return false;
}