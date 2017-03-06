import * as base from '../main/base'
import * as types from '../mutation-types'

export default {
    // 打开图片上传
    [types.OPEN_UPLOAD](state, payload) {
        state.imgUpload.ishide = true;
        state.imgUpload.target = payload.target;
        state.imgUpload.isBack = payload.isBack;
        state.imgUpload.mode = payload.mode;
        state.imgUpload.container = payload.container;
        //state.imgUpload.floatIndex = payload.floatIndex;
    },
    // 关闭图片上传
    [types.CLOSE_UPLOAD](state) {
        state.imgUpload.ishide = false;
    }
}