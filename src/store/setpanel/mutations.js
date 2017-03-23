import * as base from '../main/base'
import * as types from '../mutation-types'

export default {
    /**
     * 打开控制面板
     * @param state
     * @param payload
     */
    [types.OPEN_SETPANEL](state, payload) {
        base._closeAll(state);
        //确保数组为空
        state.moduleSet.setName = '';
        //把需要打开的对应模块的设置面板名字传入
        state.moduleSet.setName = payload;
        //打开设置面板
        state.moduleSet.ishide = true;
    },

    /**
     * 关闭控制面板
     * @param state
     */
    [types.CLOSE_SETPANEL](state) {
        //关闭设置面板
        state.moduleSet.setName = ''
        state.moduleSet.ishide = false
    },

    [types.OPEN_LINKSET](state, payload) {
        base._closeAll(state);
        state.linkSet.ishide = true;
        if (payload) {
            state.linkSet.hasTarget = payload.hasTarget;
            state.linkSet.el = payload.el;
            state.linkSet.iTarget = payload.iTarget;
            state.linkSet.iType = payload.iType;
            state.linkSet.target = payload.target;
            state.linkSet.linkType = payload.linkType;
            state.linkSet.href = payload.href;
        }

    },
    [types.CLOSE_LINKSET](state) {
        state.linkSet.ishide = false;
        state.linkSet.hasTarget = true;
        state.linkSet.el ='';
        state.linkSet.iTarget ='';
        state.linkSet.iType = '';
        state.linkSet.target ='_self';
        state.linkSet.linkType = 'custom';
        state.linkSet.href = '';
    },
    // 页面管理面板
    [types.OPEN_PAGE_MANAGE_PANEL](state) {
        base._closeAll(state);
        state.pageManageInfo.ishide = true;
    },
    [types.CLOSE_PAGE_MANAGE_PANEL](state) {
        state.pageManageInfo.ishide = false;
    },
    [types.OPEN_ADD_PAGE_PANEL](state) {
        base._closeAll(state);
        state.pageManageInfo.addPagePanelShow = true;
    },
    [types.CLOSE_ADD_PAGE_PANE](state) {
        state.pageManageInfo.addPagePanelShow = false;
    },
    //页面设置
    [types.CLOSE_PAGE_SET](state) {
        state.pageSet.isShow = false;
        state.pageSet.pageId='';
    },
    [types.OPEN_PAGE_SET](state,payload) {
        base._closeAll(state);
        state.pageSet.isShow = true;
        state.pageSet.pageId=payload.pageId
    },
    //网站管理
    [types.CLOSE_WEB_SET](state) {
        state.webSet.isShow = false;
    },
    [types.OPEN_WEB_SET](state) {
        base._closeAll(state);
        state.webSet.isShow = true;
    },
    [types.GET_SETTING_INFO](state,payload) {
        state.settingInfo.isShow = true;
        state.settingInfo.width=payload.width;
        state.settingInfo.height=payload.height;
        state.settingInfo.left=payload.left;
        state.settingInfo.top=payload.top;
    },
    [types.CLOSE_SETTING_PANE](state) {
        state.settingInfo.isShow = false;
    }


}