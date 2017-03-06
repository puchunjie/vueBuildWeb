/**
 * 切换需要操作的模块，所有切换都需要走这里
 * @param state
 * @param keys = { dragKey: 0, slotModuleKey: 0 }
 */
export function _switchSelectModuleKey(state, payload) {
    state.selectModule.keys = payload.keys;
    state.selectModule.container = payload.container;
}
/**
 * 获取当前选中模块
 * @param state
 * @returns {state.selectModule.keys|{dragKey, slotModuleKey}}
 */
export function _getSelectModuleKey(state) {
    return state.selectModule.keys;
}

/**
 * 获取当前选中模块的数据
 * @param state
 * @returns {*}
 */
export function _getSelectModuleState(state) {
    return state.pageInfo.layouts[state.selectModule.keys.dragKey].slotModeules[state.selectModule.keys.slotModuleKey];
}

/**
 * 修改当前选中模块的数据
 * @param state
 * @param payload
 */
export function _modifySelectModuleData(state, payload) {
    state.pageInfo.layouts[state.selectModule.keys.dragKey].slotModeules[state.selectModule.keys.slotModuleKey] = payload;
}


/**
 * 通过id修改模块的数据
 * @param state
 * @param payload
 */
export function _modifySelectModuleDataById(state, payload) {
    state.pageInfo.layouts[payload.dragIndex].slotModeules[payload.slotModuleIndex] = payload.module;
}


/**
 * 关闭所有设置面板操作面板
 */
export function _closeAll(state) {
    // 页面管理面板关闭
    state.pageManageInfo.ishide = false;
    // 添加页面面板关闭
    state.pageManageInfo.addPagePanelShow = false;
    //左侧列表关闭
    state.leftBar.ishide = false;
    //模块工具条关闭
    state.toolSet.ishide = false;
}