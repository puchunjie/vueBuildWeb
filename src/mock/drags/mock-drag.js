export function singleDragMock() {
    return {
        "moduleId": "drag_1", //id后端动态给
        "moduleName": "drag", //模块名，前端渲染用不能改动！
        "name": "通栏S0-复制", //通栏名字后端动态给
        "isfull": false, //是否为宽屏通栏
        "type": "normal", //通栏类型（普通－normal,公共－public,系统－system）
        "isLock": false, //是否锁定，针对公共模块编辑需要手动解锁
        "isShow": true, //通栏是否显示
        "settings": {
            "styles": { "height": "900px" },
            "background": {
                "out": {
                    "background-color": "transparent",
                    "background-image": "url('')",
                    "background-position": "center",
                    "background-repeat": "no-repeat",
                    "background-size": '',
                },
                "in": {
                    "background-color": "transparent",
                    "background-image": "url('')",
                    "background-position": "center",
                    "background-repeat": "no-repeat",
                    "background-size": '',
                }
            },
        },
        "slotModeules": []
    }
}