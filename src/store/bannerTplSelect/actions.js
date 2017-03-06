import * as types from '../mutation-types'

//打开模块数据修改面板
export const openBannerTpl = ({ commit }, payload) => {
    commit(types.OPEN_BANNERTPL, payload);
}

//隐藏模块数据修改面板
export const closeBannerTpl = ({ commit }) => {
    commit(types.CLOSE_BANNERTPL);
}