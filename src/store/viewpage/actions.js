import * as httpApi from '../../api'
import * as types from '../mutation-types'

/**
 * 跟换页面数据
 * @param commit
 */
export const setPageData = ({ commit }, payload) => {
    commit(types.SET_PAGEDATA, payload);
}

/**
 * 通栏操作
 */
export const switchBanner = ({ commit }, payload) => {
    commit(types.SET_SELECT_BANNER, payload);
}
export const addBanner = ({ commit }, payload) => {
    commit(types.ADD_BANNER, payload);
}
export const removeBanner = ({ commit }, payload) => {
    commit(types.REMOVE_BANNER, payload);
}
export const toggleBanner = ({ commit }, payload) => {
    commit(types.TOGGLE_BANNER, payload);
}
export const moveUpBanner = ({ commit }, payload) => {
    commit(types.MOVEUP_BANNER, payload);
}
export const moveDownBanner = ({ commit }, payload) => {
    commit(types.MOVEDOWN_BANNER, payload);
}
export const changeBannerPlace = ({ commit }, payload) => {
    commit(types.CHANGE_BANNER_PLACE, payload);
}
export const modifyBannerData = ({ commit }, payload) => {
    commit(types.MODIFY_BANNER_DATA, payload);
}
export const openBannerSet = ({ commit }) => {
    commit(types.OPEN_BANNER_SET);
}
export const closeBannerSet = ({ commit }) => {
    commit(types.CLOSE_BANNER_SET);
}
export const openPublicSet = ({ commit }, payload) => {
    commit(types.OPEN_PUBLIC_SET, payload);
}
export const closePublicSet = ({ commit }) => {
    commit(types.CLOSE_PUBLIC_SET);
}
export const updateBannerData = ({ commit }, payload) => {
        commit(types.UPDATE_BANNER_DATA, payload);
    }
    /*更新通栏模块*/
export const modifyBannerModule = ({ commit }, payload) => {
    commit(types.MODIFY_BANNER_MODULE, payload);
}
//更新通栏高度
export const updateBannerSize = ({ commit }, payload) => {
        commit(types.UPDATE_BANNER_SIZE, payload);
    }






/**
 * 设置页面加载状态
 */
export const setLoading = ({ commit }) => {
    commit(types.SET_PAGELOADING);
}
export const removeLoading = ({ commit }) => {
    commit(types.REMOVE_PAGELOADING);
}

/*
	更新导航数据
 */
export const updateNav = ({ commit }, payload) => {
    commit(types.UPDATE_NAV_INFO, payload);
}


/*
 *  关闭所有面板设置和遮罩
 */
export const closeAll = ({ commit }) => {
    commit(types.CLOSE_ALL);
}