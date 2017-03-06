export const pageLoading = state => state.isLoading;

/**
 * 模块getter
 */
export {
    layouts,
    selectModule,
    getModuleData,
    moduleSetDate,
    linkSetData
}
from '../module/getters'

/**
 * 工具栏getter
 */
export {
    toolSet,
    preAvailable,
    postAvailable
}
from '../tools/getters'

/**
 * 页面信息   getter
 */
export {
    pageInfo,
    getSelectBanner,
    bannerSet,
    bannerPublic,
    getDragKey,
    snapShots
}
from '../viewpage/getters'

/**
 * 站点信息   getter
 */
export {
    websiteInfo,
    moduleCopy
}
from '../webstie/getters'

/**
 * 左侧栏   getters
 */
export {
    leftBar
}
from '../leftbar/getters'



/**
 * 图片上传   getters
 */
export {
    imgUpload
}
from '../imgUpload/getters.js'


/**
 * 模版选择   getters
 */
export {
    templateSelect
}
from '../templateSelect/getters.js'

/*
通栏选择
 */
export {
    bannerTplSelect
}
from '../bannerTplSelect/getters.js'

/*
页面管理面板
 */
export {
    pageManageInfo,
    pageSet,
    webSet,
    settingInfo
}
from '../setpanel/getters.js'