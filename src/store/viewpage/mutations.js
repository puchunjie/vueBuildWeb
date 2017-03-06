import * as base from '../main/base'
import * as types from '../mutation-types'

export default {
    //通栏操作
    [types.CLOSE_ALL](state, payload) {
        base._closeAll(state);
    },
    [types.SET_PAGEDATA](state, payload) {
        state.pageInfo.pageid = payload.pageid;
        // //清空数据
        state.pageInfo.layouts = [];
        state.pageInfo.floatModules = [];
        //给已个等待时间，否则组件跳过重新渲染，vue的渲染机制
        setTimeout(function() {
            state.pageInfo.layouts = payload.content;
            state.pageInfo.floatModules = payload.floatModules;
            state.isLoading = false;
        }, 2000)
        state.pageInfo.pageName = payload.name;
    },
    //通栏操作
    [types.ADD_BANNER](state, payload) {
        // 如果给出了位置就往指定位置插入，没有则放到最后
        if (payload.index) {
            state.pageInfo.layouts.splice(payload.index, 0, payload.drag);
        } else {
            state.pageInfo.layouts.push(payload.drag);
        }

    },
    [types.REMOVE_BANNER](state, payload) {
        state.pageInfo.layouts.splice(payload, 1);
    },
    [types.TOGGLE_BANNER](state, payload) {
        state.pageInfo.layouts[payload.index].isShow = payload.isShow;
    },
    [types.MOVEUP_BANNER](state, payload) {
        upRecord(state.pageInfo.layouts, payload);
    },
    [types.MOVEDOWN_BANNER](state, payload) {
        downRecord(state.pageInfo.layouts, payload);
    },
    [types.CHANGE_BANNER_PLACE](state, payload) {
        // 保存移动模块的数据
        let moveItem = state.pageInfo.layouts[payload.index1];
        // 把原模块删除
        state.pageInfo.layouts.splice(payload.index1, 1);
        state.pageInfo.layouts.splice(payload.index2, 0, moveItem);
    },
    [types.MODIFY_BANNER_DATA](state, payload) {
        state.pageInfo.layouts[payload.dragKey] = payload.data;
    },
    [types.SET_SELECT_BANNER](state, payload) {
        state.selectBanner.dragKey = payload;
    },
    [types.OPEN_BANNER_SET](state) {
        base._closeAll(state);
        state.bannerSet.ishide = true;
    },
    [types.CLOSE_BANNER_SET](state) {
        state.bannerSet.ishide = false;
    },
    [types.OPEN_PUBLIC_SET](state, payload) {
        base._closeAll(state);
        state.bannerPublic.ishide = true;
        state.bannerPublic.mode = payload;
    },
    [types.CLOSE_PUBLIC_SET](state) {
        state.bannerPublic.ishide = false;
        state.bannerPublic.mode = '';
    },
    [types.UPDATE_BANNER_DATA](state, payload) {
        let banner = state.pageInfo.layouts[state.selectBanner.dragKey];
        let targetContar = banner.settings.background[payload.target];
        for (let key in payload.data) {
            targetContar[key] = payload.data[key];
        }
    },
    [types.UPDATE_BANNER_SIZE](state, payload) {
        let banner = state.pageInfo.layouts[state.selectBanner.dragKey];
        let targetContar = banner.settings.styles;
        for (let key in payload.data) {
            targetContar[key] = payload.data[key];
        }
    },


    //控制页面加载层
    [types.REMOVE_PAGELOADING](state) {
        state.isLoading = false;
    },
    [types.SET_PAGELOADING](state) {
        state.isLoading = true;
    },


    //更新导航数据UPDATE_NAV_INFO
    [types.UPDATE_NAV_INFO](state, payload) {
        let module = state.pageInfo.layouts[state.selectModule.keys.dragKey].slotModeules[state.selectModule.keys.slotModuleKey];
        module.moduleSet.navs = payload.navs;
    },

    //更新通栏模块
    [types.MODIFY_BANNER_MODULE](state, payload) {
        state.pageInfo.layouts[payload.dragKey].slotModeules = []
        state.pageInfo.layouts[payload.dragKey].slotModeules = payload.data;
    },

}


// 通栏排序方法
// 交换数组元素
function swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}
// 上移动
function upRecord(arr, $index) {
    if ($index == 0) {
        return;
    }
    swapItems(arr, $index, $index - 1);
};
//下移
function downRecord(arr, $index) {
    if ($index == arr.length - 1) {
        return;
    }
    swapItems(arr, $index, $index + 1);
};