import * as base from '../main/base'
import * as types from '../mutation-types'

export default {
    [types.SET_WEBSITEDATA](state, payload) {
        state.websiteInfo.memberid = payload.memberid;
        state.websiteInfo.siteid = payload.siteid;
        if (payload.pageWidth)
            state.websiteInfo.pageWidth = payload.pageWidth;
        // let n = 1;
        // payload.content[1].slotModeules.forEach(function(el) {
        //     el.$styles.container["z-index"] = n;
        //     n++;
        // });
        state.pageInfo.layouts = payload.content;
        state.pageInfo.floatModules = payload.floatModules;
        state.pageInfo.pageid = payload.pageid;
        state.pageInfo.pageName = payload.name;

        state.snapShots = [];
        state.preState = false;
        state.snapShotOffset = -1;

    },
    [types.SET_BANNERMAKE](state, payload) {
        state.websiteInfo.memberid = payload.memberid;
        state.pageInfo.layouts = payload.content;
    },
    [types.SET_SITEMODE](state, payload) {
        state.websiteInfo.siteMode = payload;
    },
    [types.SET_MODULE_COPY](state, payload) {
        state.moduleCopy = payload;
    },
    [types.SET_PAGE_WIDTH](state, payload) {
        state.websiteInfo.pageWidth = payload;
    }
}