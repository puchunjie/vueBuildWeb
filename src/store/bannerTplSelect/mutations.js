import * as base from '../main/base'
import * as types from '../mutation-types'

export default {
    // 打开模版选择
    [types.OPEN_BANNERTPL](state, payload) {
        base._closeAll(state);
        state.bannerTplSelect.ishide = true;
        state.bannerTplSelect.data = payload;
    },
    // 关闭模版选择
    [types.CLOSE_BANNERTPL](state) {
        state.bannerTplSelect.ishide = false;
    }
}