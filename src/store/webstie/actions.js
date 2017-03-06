import * as httpApi from '../../api'
import * as types from '../mutation-types'

/**
 * 获取页面所有数据
 * @param commit
 */
export const setWebsiteData = ({ commit }, payload) => {
    commit(types.SET_WEBSITEDATA, payload);
}

/**
 * 初始化通栏制作
 * @param commit
 */
export const setBannerMake = ({ commit }, payload) => {
    commit(types.SET_BANNERMAKE, payload);
}

export const setModuleCopy = ({ commit }, payload) => {
    commit(types.SET_MODULE_COPY, payload);
}
//设置页面宽度
export const setPageWidth = ({ commit }, payload) => {
    commit(types.SET_PAGE_WIDTH, payload);
}