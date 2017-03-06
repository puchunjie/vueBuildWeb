import * as types from '../mutation-types'

//打开模块数据修改面板
export const openUpload = ({ commit }, payload) => {
    commit(types.OPEN_UPLOAD, payload);
}

//隐藏模块数据修改面板
export const closeUpload = ({ commit }) => {
    commit(types.CLOSE_UPLOAD);
}