/**
 * 获取toolbar数据
 * @param state
 */
export const toolSet = state => state.toolSet

export const preAvailable = state => {
    return state.snapShotOffset > -1;
}

export const postAvailable = state => {
    return state.snapShotOffset < state.snapShots.length;
}