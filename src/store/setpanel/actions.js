import * as types from '../mutation-types'

//打开模块数据修改面板
export const openModuleSet = ({ commit }, payload) => {
    commit(types.OPEN_SETPANEL, payload);
}

//隐藏模块数据修改面板
export const closeModuleSet = ({ commit }) => {
    commit(types.CLOSE_SETPANEL);
}

//打开设置链接面板
export const openLinkSet = ({ commit }, payload) => {
    commit(types.OPEN_LINKSET, payload);
}

//隐藏设置链接面板
export const closeLinkSet = ({ commit }) => {
    commit(types.CLOSE_LINKSET);
}

//显示隐藏页面管理面板
export const openPageManagePanel = ({ commit }) => {
    commit(types.OPEN_PAGE_MANAGE_PANEL);
}
export const closePageManagePanel = ({ commit }) => {
    commit(types.CLOSE_PAGE_MANAGE_PANEL);
}

//显示隐藏页面添加面板
export const openAddPagePanel = ({ commit }) => {
    commit(types.OPEN_ADD_PAGE_PANEL);
}
export const closeAddPagePanel = ({ commit }) => {
    commit(types.CLOSE_ADD_PAGE_PANE);
}
//页面设置
export const openPageSet = ({ commit }) => {
    commit(types.OPEN_PAGE_SET);
}
export const closePageSet = ({ commit }) => {
    commit(types.CLOSE_PAGE_SET);
}
//网站管理
export const openWebSet = ({ commit }) => {
    commit(types.OPEN_WEB_SET);
}
export const closeWebSet = ({ commit }) => {
    commit(types.CLOSE_WEB_SET);
}
//右侧设置面板
export const getSettingInfo = ({ commit },payload) => {
    commit(types.GET_SETTING_INFO,payload);
}
export const closeSettingPane = ({ commit }) => {
    commit(types.CLOSE_SETTING_PANE);
}
