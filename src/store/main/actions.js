/**
 * 站点信息actions
 */
export {
    setWebsiteData,
    setBannerMake,
    setModuleCopy,
    setPageWidth
}
from '../webstie/actions';

/**
 * 页面信息actions
 */
export {
    switchBanner,
    setPageData,
    addBanner,
    removeBanner,
    modifyBannerData,
    setLoading,
    moveUpBanner,
    moveDownBanner,
    changeBannerPlace,
    removeLoading,
    updateNav,
    openBannerSet,
    closeBannerSet,
    openPublicSet,
    closePublicSet,
    updateBannerData,
    modifyBannerModule,
    toggleBanner,
    closeAll,
    updateBannerSize
}
from '../viewpage/actions';

/**
 * 工具栏actions
 */
export {
    closeToolbar,
    openToolbar,
    undo,
    redo,
    resetSeleModule
}
from '../tools/actions';

/**
 * 模块actions
 */
export {
    getAllDrags,
    modifyModuleData,
    modifyFloatModuleData,
    modifyModuleDataByIndex,
    switchSelectModuleKey,
    modifyModuleStyle,
    addModuleToLayouts,
    pasteModuleToLayouts,
    deleteModule,
    deleteOldAndAddNew,
    modifyModuleAdvanced,
    modifyModuleImg,
    moduleReset,
    modifyModuleLink,
    modifyModuleZindex,
    clearModuleCopy
}
from '../module/actions';

/**
 * 设置面板actions
 */
export {
    openModuleSet,
    closeModuleSet,
    openLinkSet,
    closeLinkSet,
    openPageManagePanel,
    closePageManagePanel,
    openAddPagePanel,
    closeAddPagePanel,
    openPageSet,
    closePageSet,
    openWebSet,
    closeWebSet,
    getSettingInfo,
    closeSettingPane
}
from '../setpanel/actions';


/**
 * 模块展示面板actions
 */
export {
    openModuleView,
    closeModuleView,
    setModuleList,
    setActiveType,
    resetActiveType
}
from '../leftbar/actions';

/**
 * 图片上传actions
 */
export {
    openUpload,
    closeUpload
}
from '../imgUpload/actions.js'

/**
 * 模版选择actions
 */
export {
    openTemplate,
    closeTemplate
}
from '../templateSelect/actions.js'
    /*通栏选择
     */
export {
    openBannerTpl,
    closeBannerTpl
}
from '../bannerTplSelect/actions.js'