import * as base from '../main/base'
import * as types from '../mutation-types'

export default {
    // 打开模版选择
    [types.OPEN_TEMPLATE](state, payload) {
        base._closeAll(state);
        state.templateSelect.ishide = true;
        state.templateSelect.data = payload;
    },
    // 关闭模版选择
    [types.CLOSE_TEMPLATE](state) {
        state.templateSelect.ishide = false;
    }
}