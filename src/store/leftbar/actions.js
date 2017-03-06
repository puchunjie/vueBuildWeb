import * as types from '../mutation-types'

//获取权限内模块数据
export const setModuleList = ({ commit }, payload) => {
    commit(types.SET_MODULE_LIST, payload);
}

//打开模块数据修改面板
export const openModuleView = ({ commit }) => {
    commit(types.OPEN_MODULE_VIEW);
}

//隐藏模块数据修改面板
export const closeModuleView = ({ commit }) => {
    commit(types.CLOSE_MODULE_VIEW);
}

//设置选中分类
export const setActiveType = ({ commit }, payload) => {
    commit(types.SET_ACTIVE_TYPE, payload);
}

//重置选中分类
export const resetActiveType = ({ commit }, payload) => {
    commit(types.RESET_ACTIVE_TYPE, payload);
}