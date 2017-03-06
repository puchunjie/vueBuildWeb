import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './main/getters'
import * as actions from './main/actions'
import mutations from './main/mutations'

Vue.use(Vuex)

const state = {
    //站点信息
    websiteInfo: {
        pageWidth: '1100px',
        siteid: NaN, //站点id
        memberid: NaN, //用户id
        publicBanners: [], //公共通栏数据容器
    },
    //页面信息
    pageInfo: {
        pageid: NaN, //当前页面id
        pageName: "", //当前页面名字
        layouts: [], //页面通栏数据
        floatModules: [
            {
                "moduleId": "floatModels_1", //id后端动态给
                "moduleName": "floatModels", //模块名，前端渲染用不能改动！
                "name": "通栏S0-复制", //通栏名字后端动态给
                "isfull": false, //是否为宽屏通栏
                "type": "normal", //通栏类型（普通－normal,公共－public,系统－system）
                "isLock": false, //是否锁定，针对公共模块编辑需要手动解锁
                "isShow": true, //通栏是否显示
                "settings": {
                    "styles": {
                        "width": "0",
                        "height": "0",
                        "position":"fixed",
                        "right": "0",
                        "bottom": "0",
                        "z-index": "1"
                    },
                    "background": {
                        "out": {
                            "background-color": "transparent",
                            "background-image": "url('')",
                            "background-position": "center",
                            "background-repeat": "no-repeat",
                            "background-size": "",
                        },
                        "in": {
                            "background-color": "transparent",
                            "background-image": "url('')",
                            "background-position": "center",
                            "background-repeat": "no-repeat",
                            "background-size": ""
                        }
                    }
                },
                "slotModeules": [
                    {
                        "moduleName": "backToTop",
                        "moduleId": "backToTop1479201924962",
                        "moduleSet": {
                            "advancedSetting": {
                                "isShow":false,
                                "title": "图片",
                                "details": "",
                                "imgUrl": "../../static/images/go.png",
                                "imgUrl_1": null,
                                "href": "javascript:",
                                "target": "_self"
                            }
                        },
                        "$styles": {
                            "container": {
                                "width": "100px",
                                "height": "165px",
                                "position":"fixed",
                                "right": "0",
                                "bottom": "0",
                                "z-index": "9999",
                                "filter": "alpha(opacity=100)",
                                "-moz-opacity": "1",
                                "-khtml-opacity": "1",
                                "opacity": "1",
                                "background": "url()"
                            }
                        }
                    }
                ]
            }
        ] //浮动模块数据
    },
    //被选中模块的状态数据
    selectModule: {
        container: '', //选中模块在哪个容器里
        keys: {
            dragKey: 0,
            slotModuleKey: 0
        }
    },
    //选中操作的通栏
    selectBanner: {
        dragKey: 0, //当前通栏的下标
    },
    // 通栏设置面板
    bannerSet: {
        ishide: false
    },
    //通栏设置公共/复制
    bannerPublic: {
        mode: "", //是设置公共还是复制 public/copy
        ishide: false
    },
    //工具栏数据状态信息
    toolSet: {
        position: {}, //工具栏位置信息
        ishide: false //工具栏是否隐藏
    },
    moduleSet: { //模块设置面板调用名  
        setName: '', //设置面板调用的组件名
        ishide: false //设置面板是否显示
    },
    //图片上传面板
    imgUpload: {
        ishide: false, //图片上传面板显隐
        target: '', //图片上传后要改变的模块的属性位置  --->'moduleSet>advancedSetting>imgUrl'
        isBack: false, //是否为背景图
        mode: 'module' //是模块还是通栏
    },
    //模版选择面板
    templateSelect: {
        ishide: false, //模版选择面板显隐
        data: {}
    },
    //通栏选择面板
    bannerTplSelect: {
        ishide: false, //通栏选择面板显隐
        data: {}
    },
    //左侧模块栏数据
    leftBar: {
        bars: [],
        activeBarType: '',
        ishide: false
    },
    //页面管理面板
    pageManageInfo: {
        addPagePanelShow: false, //添加页面面板显示
        ishide: false, //页面管理面板显示
    },
    //链接设置面板
    linkSet: {
        ishide: false,
        hasTarget: true,
        el: '', //设置链接地址的目标
        iTarget: '', //设置target的目标
        iType: '', //设置type的目标
        href: '', //初始href值
        target: '_self', // target的值
        linkType: 'custom', //链接类型

    },
    isLoading: false, //是否开启loading遮罩
    snapShots: [], //撤销退回快照队列
    preState: false,
    snapShotOffset: -1,
    //模块复制容器
    moduleCopy: '',
    pageSet: {
        isShow: false
    },
    webSet: {
        isShow: false
    },
    settingInfo: {
        width: "",
        height: "",
        left: "",
        top: "",
        isShow: true
    }
}


const snapshot = store => {
    store.subscribe((mutation, state) => {
        let jsondiffpatch = require('jsondiffpatch').create({
            propertyFilter: function(name, context) {
                return name.slice(0, 2) !== '$$';
            }
        });
        let currentState = _.cloneDeep(state.pageInfo); //深拷贝当前状态

        if (state.pageInfo.pageid || state.pageInfo.layouts.length > 0) {
            let preState = _.cloneDeep(state.preState); //深拷贝前一次状态
            let delta = jsondiffpatch.diff(currentState, preState); //diff delta

            if (delta !== undefined) { //如果有差异
                if (state.preState && mutation.type !== 'UNDO' && mutation.type !== 'REDO') {
                    if (state.snapShotOffset == (state.snapShots.length - 1)) {
                        state.snapShotOffset++;
                    } else {
                        state.snapShotOffset = state.snapShots.length;
                    }
                    state.snapShots.push(delta);

                    /**另一个版本
                    if (state.preState && mutation.type !== 'UNDO' && mutation.type !== 'REDO') {
                        state.snapShots.push(delta);
                        state.snapShotOffset++;
                    }**/
                }

                state.preState = currentState; //把当前的状态拷贝到preState状态中
            }

        }

    })
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [snapshot]
})