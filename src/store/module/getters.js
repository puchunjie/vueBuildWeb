/**
 * 获取所有通栏数据
 * @param state
 */
export const layouts = state => state.pageInfo.layouts

/**
 * 获取当前选中模块的key
 * @param state
 */
export const selectModule = state => state.selectModule

/**
 * 获取指定模块数据
 * @param state
 * @param getters
 * @returns {*}
 */

export const getModuleData = (state, getters) => {
    let dragKey = getters.selectModule.keys.dragKey;
    let slotModuleKey = getters.selectModule.keys.slotModuleKey;
    if(getters.selectModule.container=='floatModules'){
    	return state.pageInfo.floatModules[dragKey].slotModeules[slotModuleKey];
    }else{
    	return getters.layouts[dragKey].slotModeules[slotModuleKey];
    }
    
}


/**
 * 获取模块设置面板状态数据
 * @param state
 */
export const moduleSetDate = (state) => state.moduleSet

//linkset
export const linkSetData = (state) => state.linkSet