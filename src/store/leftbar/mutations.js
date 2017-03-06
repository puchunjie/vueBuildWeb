import * as base from '../main/base'
import * as types from '../mutation-types'

export default {
    // 打开模块展示panel
    [types.OPEN_MODULE_VIEW](state) {
        base._closeAll(state);
        state.leftBar.ishide = true;
    },
    // 关闭模块展示panel
    [types.CLOSE_MODULE_VIEW](state) {
        state.leftBar.ishide = false;
        state.leftBar.activeBarType = '';
    },
    [types.SET_MODULE_LIST](state, payload) {
        state.leftBar.bars = payload;
    },
    [types.SET_ACTIVE_TYPE](state, payload) {
        state.leftBar.activeBarType = payload;
    },
    [types.RESET_ACTIVE_TYPE](state) {
        state.leftBar.activeBarType = '';
    }
}