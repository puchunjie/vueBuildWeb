import * as types from '../mutation-types'

//打开模块数据修改面板
export const openTemplate = ({ commit }, payload) => {
    commit(types.OPEN_TEMPLATE, payload);
}

//隐藏模块数据修改面板
export const closeTemplate = ({ commit }) => {
    commit(types.CLOSE_TEMPLATE);
}