import * as types from '../mutation-types'
import { closeRichTextBars } from 'commonMethods/rtByTinymce'
//打开toolbar，传入模块设置条数据
export const openToolbar = ({ commit }, payload) => {
    closeRichTextBars()
    commit(types.OPEN_TOOLBAR, payload);
}

//关闭toolbar，清空模块设置条数据
export const closeToolbar = ({ commit }) => {
    closeRichTextBars()
    commit(types.CLOSE_TOOLBAR);
}
//重置选中的模块数据
export const resetSeleModule = ({ commit }) => {
    commit(types.RESET_SELEMODULE);
}
//撤销
export const undo = ({ commit }) => {
    commit(types.UNDO);
}

//恢复
export const redo = ({ commit }) => {
    commit(types.REDO);
}


