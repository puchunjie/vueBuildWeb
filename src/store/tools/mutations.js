import * as base from '../main/base'
import * as types from '../mutation-types'

export default {
    [types.OPEN_TOOLBAR](state, payload) {
        base._closeAll(state);
        // 传入鼠标位置
        state.toolSet.position = payload.position;
        //传入的设置项
        state.toolSet.moduleName = payload.moduleName;
        // 打开设置面板
        state.toolSet.ishide = true;
    },

    [types.CLOSE_TOOLBAR](state) {
        state.toolSet.ishide = false;
    },
    [types.RESET_SELEMODULE](state) {
        state.selectModule = {
            container: '',
            keys: {
                dragKey: 0,
                slotModuleKey: 0
            }
        }
    },
    //撤销
    [types.UNDO](state) {
        if (state.snapShotOffset > -1) {
            let jsondiffpatch = require('jsondiffpatch').create({
                propertyFilter: function(name, context) {
                    return name.slice(0, 2) !== '$$';
                }
            });
            let currentInfo = _.cloneDeep(state.pageInfo);
            let currentOffset = state.snapShotOffset;
            let delta = _.cloneDeep(state.snapShots[currentOffset]);
            jsondiffpatch.patch(currentInfo, delta);
            jsondiffpatch.reverse(delta);
            state.pageInfo.layouts = currentInfo.layouts;
            state.snapShotOffset--;
        } else {
            console.log('到底了！');
        }

    },

    [types.REDO](state) {

        if (state.snapShots.length > 0 && state.snapShotOffset < state.snapShots.length) {
            let jsondiffpatch = require('jsondiffpatch').create({
                propertyFilter: function(name, context) {
                    return name.slice(0, 2) !== '$$';
                }
            });
            state.snapShotOffset++;
            let currentInfo = _.cloneDeep(state.pageInfo);
            let currentOffset = state.snapShotOffset;
            let delta = _.cloneDeep(state.snapShots[currentOffset]);
            jsondiffpatch.unpatch(currentInfo, delta);
            jsondiffpatch.reverse(delta);
            state.pageInfo.layouts = currentInfo.layouts;
        } else {
            console.log('到顶了！');
        }
    }

}