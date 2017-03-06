import * as base from '../main/base'
import * as types from '../mutation-types'
import cssJson from 'cssJson';

export default {
    /*
     * 模块重新渲染
     * @param state
     */
    [types.MODULE_RESET](state, payload) {
        let dragKey = payload.dragKey;
        let slotModeulesKey = payload.slotModeulesKey;
        state.pageInfo.layouts[dragKey].slotModeules.splice(slotModeulesKey, 1);
    },
    /**
     * 页面所有数据的初始化
     * @param state
     * @param drags
     */
    [types.RECEIVE_ALL](state, { drags }) {
        state.header = drags.json.header;
        state.pageInfo.layouts = drags.json.content;
        state.footer = drags.json.footer;
    },

    /**
     * 修改模块数据（整个module数据）
     * @param state
     * @param payload
     */
    [types.MODIFY_MODULE_DATA](state, { payload }) {
        base._modifySelectModuleData(state, payload);
    },

    [types.MODIFY_FLOATMODULE_DATA](state, { payload }) {
        state.pageInfo.floatModules[state.selectModule.keys.dragKey].slotModeules[state.selectModule.keys.slotModuleKey] = payload;
    },

    /**
     * 通过id修改模块数据（整个module数据）
     * @param state
     * @param payload
     */
    [types.MODIFY_MODULE_DATA_BY_INDEX](state, { payload }) {
        base._modifySelectModuleDataById(state, payload);
    },


    /**
     * 修改模块样式（整个module样式数据）
     * @param state
     * @param payload
     */
    [types.MODIFY_MODULE_STYLE](state, payload) {
        payload.index = payload.index || state.selectModule.keys.slotModuleKey;
        let module = state.pageInfo.layouts[state.selectModule.keys.dragKey].slotModeules[payload.index];
        let style = module.$styles;
        let targetContar = module.$styles[payload.elTarget];
        for (let key in payload.attributetarget) {
            targetContar[key] = payload.attributetarget[key];
        }
        cssJson.toStyleHEAD(module, true)
    },

    [types.MODIFY_MODULE_ZINDEX](state, payload) {
        let slotModuleKey = state.selectModule.keys.slotModuleKey;
        let module1 = state.pageInfo.layouts[state.selectModule.keys.dragKey].slotModeules[slotModuleKey];
        let style1 = module1.$styles;
        let targetContar1 = module1.$styles[payload.elTarget];
        for (let key in payload.attributetarget1) {
            targetContar1[key] = payload.attributetarget1[key];
        }
        cssJson.toStyleHEAD(module1, true)
        let arrData = payload.arrData;
        arrData.forEach(function(item, i) {
            let module2 = state.pageInfo.layouts[state.selectModule.keys.dragKey].slotModeules[item.index];
            let targetContar2 = module2.$styles[payload.elTarget];
            for (let key in item.attrs) {
                targetContar2[key] = item.attrs[key];
            }
            cssJson.toStyleHEAD(module2, true)
        })
    },


    [types.MODIFY_MODULE_IMAGE](state, payload) {
        let container = payload.container || 'layouts';
        let module = state.pageInfo[container][state.selectModule.keys.dragKey].slotModeules[state.selectModule.keys.slotModuleKey];
        let hierarchy = payload.target.split(">");
        let stringKey = '';
        hierarchy.forEach(function(el) {
            stringKey += '["' + el + '"]';
        });
        let imgVal = payload.isBack ? '"url("+payload.imgUrl+")"' : 'payload.imgUrl';
        //拼装语句
        let actionString = 'module' + stringKey + '=' + imgVal;
        //执行语句
        eval(actionString);
        //console.log(module)
        cssJson.toStyleHEAD(module, true);
    },


    /*更新链接*/
    [types.MODIFY_MODULE_LINK](state, payload) {
        let module = state.pageInfo.layouts[state.selectModule.keys.dragKey].slotModeules[state.selectModule.keys.slotModuleKey];
        let hierarchy = payload.el.split(">");
        let stringKey = '';
        hierarchy.forEach(function(el) {
            stringKey += '["' + el + '"]';
        });
        let linkVal = 'payload.href';
        let actionString = 'module' + stringKey + '=' + linkVal;
        //执行语句
        eval(actionString);
        //设置target
        if (payload.iTarget) {
            let targetArr = payload.iTarget.split(">");
            let targetStr = '';
            targetArr.forEach(function(el) {
                targetStr += '["' + el + '"]';
            });
            let linkTarget = 'payload.target';
            let actionTarget = 'module' + targetStr + '=' + linkTarget;
            //执行语句
            eval(actionTarget);
        }
        if (payload.iType) {
            let typeArr = payload.iType.split(">");
            let typeStr = '';
            typeArr.forEach(function(el) {
                typeStr += '["' + el + '"]';
            });
            let linkType = 'payload.linkType';
            let actionType = 'module' + typeStr + '=' + linkType;
            //执行语句
            eval(actionType);
        }
    },
    /**
     * 切换选中模块，所有切换模块操作都走这里
     * @param state
     * @param payload
     */
    [types.SWITCH_SELECT_MODULE_KEY](state, payload) {
        base._switchSelectModuleKey(state, payload);
    },
    /**
     * 添加模块到页面/粘贴
     * @param state
     * @param payload
     */
    [types.ADD_MODULE_TO_LAYOUTS](state, payload) {
        state.pageInfo.layouts[payload.dragKey].slotModeules.push(payload.moduleData);
    },
    [types.PASTE_MODULE_TO_LAYOUTS](state, payload) {
        if (state.moduleCopy === '') {
            return;
        }
        let module = _.cloneDeep(state.moduleCopy);
        module.moduleId = module.moduleName + new Date().getTime();
        module.id = '';
        module.$styles.container.left = (parseInt(state.moduleCopy.$styles.container.left) + 10) + "px";
        module.$styles.container.top = (parseInt(state.moduleCopy.$styles.container.top) + 10) + "px";
        let modeules = state.pageInfo.layouts[payload].slotModeules;
        let zIndexArr = [];
        if (modeules.length) {
            $(modeules).each(function(i, v) {
                zIndexArr.push(v.$styles.container['z-index'])
            })
            zIndexArr.sort(function(a, b) {
                return a - b;
            })
        }
        if (zIndexArr.length > 0) {
            module.$styles.container["z-index"] = zIndexArr[zIndexArr.length - 1] + 1
        } else {
            module.$styles.container["z-index"] = 1
        }

        state.pageInfo.layouts[payload].slotModeules.push(module);
    },

    //清空复制的模块内容
    [types.CLEAR_MODULE_COPY](state) {
        state.moduleCopy = ''
    },
    /**
     * 添加模块到通栏，同时删除当前选中模块，为了配合回退模式的mutation快照
     * @param state
     * @param payload
     */
    [types.DELETE_OLD_ADD_NEW](state, payload) {
        state.pageInfo[state.selectModule.container][state.selectModule.keys.dragKey].slotModeules.splice(state.selectModule.keys.slotModuleKey, 1);
        state.pageInfo[state.selectModule.container][payload.dragKey].slotModeules.push(payload.moduleData);
        let newModuleKey = state.pageInfo.layouts[payload.dragKey].slotModeules.length - 1;
        state.selectModule.keys = {
            dragKey: payload.dragKey,
            slotModuleKey: newModuleKey
        };
        // 火狐会有BUG 手动跟新下dom位置
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            setTimeout(function() {
                state.pageInfo[state.selectModule.container][payload.dragKey].slotModeules[newModuleKey].$styles.container.left = payload.moduleData.$styles.container.left;
                state.pageInfo[state.selectModule.container][payload.dragKey].slotModeules[newModuleKey].$styles.container.top = payload.moduleData.$styles.container.top;
            }, 0);
        }
    },
    /**
     * 删除模块
     * @param state
     * @param payload(1.payload.container－区分layouts和floatModules)
     */
    [types.DELETE_MODULE](state) {
        if (!isNaN(state.selectModule.keys.slotModuleKey) && state.selectModule.container != '') {
            state.pageInfo[state.selectModule.container][state.selectModule.keys.dragKey].slotModeules.splice(state.selectModule.keys.slotModuleKey, 1);
            // 清除选中模块的key
            state.selectModule = {
                container: '',
                keys: {
                    dragKey: 0,
                    slotModuleKey: 0
                }
            };
        }

    },

    /**
     * 修改模块中advancedSetting数据
     * @param state 
     * @param payload
     */
    [types.MODIFY_MODULE_ADVANCED](state, payload) {
        let container = payload.container || 'layouts';
        let module = state.pageInfo[container][state.selectModule.keys.dragKey].slotModeules[state.selectModule.keys.slotModuleKey];
        let advs = module.moduleSet.advancedSetting;
        for (let key in payload.attributetarget) {
            advs[key] = payload.attributetarget[key];
        }
        state.pageInfo[container][state.selectModule.keys.dragKey].slotModeules[state.selectModule.keys.slotModuleKey].moduleSet.advancedSetting = advs;
    },

    /**
     * 修改backToTop数据
     * @param state
     * @param payload
     */
        [types.MODIFY_MODULE_BACKTOTOP](state, payload) {
        state.backToTop.isShow=!state.backToTop.isShow;
    }
    

}