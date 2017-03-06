import * as mockApi from '../../mock/alldata'
import * as httpApi from '../../api'
import * as types from '../mutation-types'

let api = mockApi

export const moduleReset = ({ commit }, payload) => {
    commit(types.MODULE_RESET, payload)
}

/**
 * 获取页面所有数据
 * @param commit
 */
export const getAllDrags = ({ commit }, payload) => {
    api.getAllDrags(drags => {
        commit(types.RECEIVE_ALL, {
            drags
        }, payload)
    })
}

/**
 * 修改模块信息
 * @param commit
 * @param payload
 */
export const modifyModuleData = ({ commit }, payload) => {
    commit(types.MODIFY_MODULE_DATA, {
        payload
    });
}
export const modifyFloatModuleData = ({ commit }, payload) => {
    commit(types.MODIFY_FLOATMODULE_DATA, {
        payload
    });
}

/**
 * 通过id修改模块信息
 * @param commit
 * @param payload
 */
export const modifyModuleDataByIndex = ({ commit }, payload) => {
    commit(types.MODIFY_MODULE_DATA_BY_INDEX, {
        payload
    });
}

/**
 * 修改模块中图片地址
 * @param commit
 * @param payload
 */
export const modifyModuleImg = ({ commit }, payload) => {
    commit(types.MODIFY_MODULE_IMAGE, payload);
}


/**
 * 样式设置面板修改更新state
 * @param commit
 * @param payload
 */
export const modifyModuleStyle = ({ commit }, payload) => {
    commit(types.MODIFY_MODULE_STYLE, payload);
}

export const modifyModuleZindex = ({ commit }, payload) => {
    commit(types.MODIFY_MODULE_ZINDEX, payload);
}

/**
 * 设置面板修改更新advancedSetting
 * @param commit
 * @param payload
 */
export const modifyModuleAdvanced = ({ commit }, payload) => {
    commit(types.MODIFY_MODULE_ADVANCED, payload);
}

/**
 * 切换当前选中模块
 * @param commit
 * @param payload
 */
export const switchSelectModuleKey = ({ commit }, payload) => {
    commit(types.SWITCH_SELECT_MODULE_KEY, payload);
}

/**
 * 添加模块到通栏
 * @param commit
 * @param payload
 */
export const addModuleToLayouts = ({ commit }, payload) => {
    commit(types.ADD_MODULE_TO_LAYOUTS, payload);
}

export const pasteModuleToLayouts = ({ commit }, payload) => {
    commit(types.PASTE_MODULE_TO_LAYOUTS, payload);
}

export const clearModuleCopy = ({ commit }) => {
    commit(types.CLEAR_MODULE_COPY);
}

/**
 * 添加模块到通栏，同时删除当前选中模块，为了配合回退模式的mutation快照
 * @param commit
 * @param payload
 */
export const deleteOldAndAddNew = ({ commit }, payload) => {
    commit(types.DELETE_OLD_ADD_NEW, payload);
}


/**
 * 删除模块
 * @param commit
 * @param payload
 */
export const deleteModule = ({ commit }) => {
    commit(types.DELETE_MODULE);
}

/*设置链接*/
export const modifyModuleLink = ({ commit }, payload) => {
    commit(types.MODIFY_MODULE_LINK, payload);
}