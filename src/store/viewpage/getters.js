// 获取页面宽度信息
export const pageInfo = state => state.pageInfo;
//获取撤销状态
export const snapShots = state => state.snapShots;

//获取通栏设置面板信息
export const bannerSet = state => state.bannerSet;

//获取通栏设置公共面板信息
export const bannerPublic = state => state.bannerPublic;

//获取选中通栏数据
export const getSelectBanner = state => {
        return state.pageInfo.layouts[state.selectBanner.dragKey];
    }
    //获取选中通栏数据
export const getDragKey = state => {
    return state.selectBanner.dragKey;
}