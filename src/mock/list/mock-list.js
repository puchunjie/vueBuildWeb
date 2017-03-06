export function singleListMock() {
    return {
        "moduleName": "list",
        "moduleId": "list1479201924739",
        "type": "product", //产品 product 案例 case 文章 article
        "moduleSet": {
            "moduleTitle": [],
            "advancedSetting": {
                "classificationFlag": true, //分类模块标记
                "crumbsfalse": true, //分类弹出框模块标记
                "prolistFlag": true, //产品列表模块标记
                "crumbsMenu2IsShow": false,
                "color": '#000',
                "display": ["主标题", "评价", "购物车"],
                "selected": ["主标题", "评价", "购物车"],
                "crumbsMenu2": [],
                "value": '',
                "value2": '',
                "pages": {
                    "sortType": '',
                    "page_count": 4,
                    "every_line": 4, //每行产品
                    "productNum": 12, //每页产品
                    "cid": "",
                    "cart": null //购物车图标
                }
            }
        },
        "menuList": [{
                "title": "高温合金",
                "link": "",
                "menu": [
                    { "title": "合金1", "link": null },
                    { "title": "合金1", "link": null },
                    { "title": "合金1", "link": null },
                    { "title": "合金1", "link": null }
                ]
            },
            {
                "title": "高温合金",
                "link": "",
                "menu": [
                    { "title": "合金1", "link": null },
                    { "title": "合金1", "link": null },
                    { "title": "合金1", "link": null },
                    { "title": "合金1", "link": null }
                ]
            }
        ],
        "proList": [{
                "pic": "../../../images/prolist_img.jpg",
                "title": "产品1",
                "price": "10.5",
                "assess": "102",
                "cart": "/images/cart.jpg",
                "link": null
            },
            { "pic": "../../../images/prolist_img.jpg", "title": "产品1", "price": "10.5", "assess": "102", "cart": "/images/cart.jpg", "link": null },
            { "pic": "../../../images/prolist_img.jpg", "title": "产品1", "price": "10.5", "assess": "102", "cart": "/images/cart.jpg", "link": null },
            { "pic": "../../../images/prolist_img.jpg", "title": "产品1", "price": "10.5", "assess": "102", "cart": "/images/cart.jpg", "link": null },
            { "pic": "../../../images/prolist_img.jpg", "title": "产品1", "price": "10.5", "assess": "102", "cart": "/images/cart.jpg", "link": null }
        ],
        "$styles": {
            "container": {

            },
            ".product_left_fenlei": {
                "border-radius": "0px",
                "border-top": "1px solid #ddd",
                "border-bottom": "1px solid #ddd",
                "border-left": "1px solid #ddd",
                "border-right": "1px solid #ddd"
            },
            ".fenlei_title": {
                "background-color": "#1153aa",
                "background-image": "",
                "background-position": "left center",
                "background-repeat": "repeat-x",
                "backgroundSize": "auto"
            },
            ".prolist dl": {
                "border-radius": "0px",
                "border-top": "1px solid #ddd",
                "border-bottom": "1px solid #ddd",
                "border-left": "1px solid #ddd",
                "border-right": "1px solid #ddd"
            }
        }
    }
}