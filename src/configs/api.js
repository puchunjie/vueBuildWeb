// let domain = 'http://192.168.40.42:8090';
let domain = ''; //打包用
export default {

    // 发布、备份列表、退回版本
    publish: domain + "/site/Website/release", //站点发布
    publishList: domain + "/site/Website/backuplist", //版本列表
    rollBack: domain + "/site/Website/rollback", //回滚版本

    /** =====================用户制作页面接口============================*/
    userLogin: domain + "/site/Check/website", //用户制作页面登陆检查
    userSave: domain + "/site/WebSitePage/edit", //用户制作页面保存页面
    userPageData: domain + "/site/WebSitePage/info", //根据id获取对应页面数据
    userPageType: domain + "/site/WebSitePage/type", //获取可新建页面类型
    userPageList: domain + "/site/WebSitePage/list", //获取站点所有页面
    userAddPage: domain + "/site/WebSitePage/add", //用户制作添加页面
    userAddBanner: domain + "/site/BuildColumn/info", //添加通栏!!!!和模版相同!!!!!!
    userBannerList: domain + "/site/BuildColumn/list", //获取上架通栏列表 !!!!和模版相同!!!!!!
    userImgUpload: domain + "/site/WebUpload/pic", //图片上传
    userImgList: domain + "/site/WebUpload/list", //用户图片列表
    userMaterial: domain + "/site/WebUpload/material_user", //用户图片素材库

    //页面设置
    userPageGet: domain + "/site/WebSitePage/get", //获取页面信息
    userPageSet: domain + "/site/WebSitePage/set", //设置页面信息
    //全站设置
    userGetWholeSetting: domain + "/site/Website/getWholeSetting", //获取全站设置信息
    userSaveWholeSetting: domain + "/site/Website/saveWholeSetting", //保存全站设置信息

    //通栏操作
    userCopyBanner: domain + "/site/WebSiteColumn/copy", //复制通栏
    userSetBannerPub: domain + "/site/WebSiteColumn/setpublic", //设置通栏为公共
    userGetBannerInfo: domain + "/site/WebSiteColumn/info", //获取通栏信息
    userGetPublicBanner: domain + "/site/WebSiteColumn/getpublic", //获取公共通栏列表
    userModifyBanner: domain + "/site/WebSiteColumn/setinfo", //修改通栏信息

    //页面
    userCopyPage: domain + "/site/WebSitePage/copy", //复制页面
    userDeletePage: domain + "/site/WebSitePage/del", //删除页面

    //导航管理接口
    userNavPageType: domain + '/site/WebSitePage/type', //页面类型
    userFirstNavList: domain + '/site/WebSiteNav/first', //获取一级栏目
    userAddNav1: domain + '/site/WebSiteNav/add1', //新增导航栏目并创建页面
    userAddNav2: domain + '/site/WebSiteNav/add2', //新增导航栏目自定义栏目
    userGetNavList: domain + '/site/WebSiteNav/list', //获取导航列表
    userGetSitUrl: domain + '/site/WebSiteNav/Linfo', //获取链接信息

    userGetNavInfo: domain + '/site/WebSiteNav/Ninfo', //获取栏目信息
    userDelNav: domain + '/site/WebSiteNav/del', //删除导航
    userChangeStatus: domain + '/site/WebSiteNav/change', //设置导航打开方式 显隐状态
    userSetSort: domain + '/site/WebSiteNav/sort', //导航排序
    userSaveNav: domain + '/site/WebSiteNav/save', //保存导航栏目
    userNavPageCate: domain + '/site/WebSiteNav/cate', //获取分类

    //产品列表接口
    userItemlist: domain + '/site/WebSiteSource/list', //获取产品列表
    userCateList: domain + '/site/WebSiteSource/cate_list', //获取产品分类列表

    // 数据源选择
    userClassification: domain + "/site/WebSiteData/get", //获取分类列表
    userClassificationSub: domain + "/site/WebSiteData/choose", //获取分类产品列表
    userSaveDataSource: domain + "/site/WebSiteData/save", //获取分类产品列表

    //获取模块数据
    userModuleData: domain + '/site/WebSiteModule/create',
    /** =====================通栏制作页面接口============================*/

    bannerMakeLogin: domain + "/site/Check/column", //通栏制作页面登陆检查
    bannerMakeSave: domain + "/site/BuildColumn/save", //通栏制作页面保存页面
    bannerMakeImgUpload: domain + "/site/WebUpload/cpic", //图片上传
    bannerMakeImgList: domain + "/site/WebUpload/material", //后台制作图片列表
    bannerMakeMaterial: domain + "/site/WebUpload/material_manage", //后台图片素材库
    bannerMakeColumnPic: domain + "/site/WebUpload/columnPic", //后台通栏图片
    bannerMakeTemplatePic: domain + "/site/WebUpload/templatePic", //后台模板图片
    //产品列表接口
    bannerMakeItemlist: domain + '/site/TemplateSource/list', //获取产品列表
    bannerMakeCateList: domain + '/site/TemplateSource/cate_list', //获取产品分类列表

    // 数据源选择
    bannerMakeClassification: domain + "/site/TemplateData/get", //获取分类列表
    bannerMakeClassificationSub: domain + "/site/TemplateData/choose", //获取分类产品列表
    bannerMakeSaveDataSource: domain + "/site/TemplateData/save", //获取分类产品列表
    //获取模块数据
    bannerMakeModuleData: domain + '/site/WebSiteModule/create',

    /** =====================模版制作页面接口============================*/

    templateMakeLogin: domain + "/site/Check/template", //模版制作页面登陆检查
    templateMakeSave: domain + "/site/TemplatePage/edit", //用户制作页面保存页面
    templateMakePageData: domain + "/site/TemplatePage/info", //模版制作根据id获取对应页面数据
    templateMakePageType: domain + "/site/TemplatePage/type", //模版制作获取可新建页面类型
    templateMakePageList: domain + "/site/TemplatePage/list", //模版制作获取站点所有页面
    templateMakeAddPage: domain + "/site/TemplatePage/add", //模版制作添加页面
    //templateMakeBannerList: domain + "/site/BuildColumn/list", //获取上架通栏列表 !!!!和模版相同!!!!!!
    templateMakeAddBanner: domain + "/site/BuildColumn/info", //添加通栏!!!!和模版相同!!!!!!
    templateMakeImgUpload: domain + "/site/WebUpload/tpic", //图片上传
    templateMakeImgList: domain + "/site/WebUpload/material", //后台制作图片列表
    templateMakeMaterial: domain + "/site/WebUpload/material_manage", //后台图片素材库
    templateMakeColumnPic: domain + "/site/WebUpload/columnPic", //后台通栏图片
    templateMakeTemplatePic: domain + "/site/WebUpload/templatePic", //后台模板图片
    //通栏操作
    templateMakeCopyBanner: domain + "/site/BuildColumn/copy", //复制通栏
    templateMakeSetBannerPub: domain + "/site/BuildColumn/setpublic", //设置通栏为公共
    templateMakeGetBannerInfo: domain + "/site/BuildColumn/columnInfo", //获取通栏信息
    templateMakeGetPublicBanner: domain + "/site/BuildColumn/getpublic", //获取公共通栏列表
    templateMakeModifyBanner: domain + "/site/BuildColumn/setinfo", //修改通栏信息

    //页面
    templateMakeCopyPage: domain + "/site/TemplatePage/copy", //复制页面
    templateMakeDeletePage: domain + "/site/TemplatePage/del", //删除页面
    templateMakePageGet: domain + "/site/TemplatePage/get", //获取页面信息
    templateMakePageSet: domain + "/site/TemplatePage/set", //获取页面信息

    //产品列表接口
    templateMakeItemlist: domain + '/site/TemplateSource/list', //获取产品列表
    templateMakeCateList: domain + '/site/TemplateSource/cate_list', //获取产品分类列表

    //导航管理接口
    templateMakeNavPageType: domain + '/site/TemplatePage/type', //页面类型
    templateMakeFirstNavList: domain + '/site/TemplateNav/first', //获取一级栏目
    templateMakeAddNav1: domain + '/site/TemplateNav/add1', //新增导航栏目并创建页面
    templateMakeAddNav2: domain + '/site/TemplateNav/add2', //新增导航栏目自定义栏目
    templateMakeGetNavList: domain + '/site/TemplateNav/list', //获取导航列表
    templateMakeGetSitUrl: domain + '/site/TemplateNav/Linfo', //获取链接信息

    templateMakeGetNavInfo: domain + '/site/TemplateNav/Ninfo', //获取栏目信息
    templateMakeDelNav: domain + '/site/TemplateNav/del', //删除导航
    templateMakeChangeStatus: domain + '/site/TemplateNav/change', //设置导航打开方式 显隐状态
    templateMakeSetSort: domain + '/site/TemplateNav/sort', //导航排序
    templateMakeSaveNav: domain + '/site/TemplateNav/save', //保存导航栏目
    templateMakeNavPageCate: domain + '/site/TemplateNav/cate', //获取分类

    // 数据源选择
    templateMakeClassification: domain + "/site/TemplateData/get", //获取分类列表
    templateMakeClassificationSub: domain + "/site/TemplateData/choose", //获取分类产品列表
    templateMakeSaveDataSource: domain + "/site/TemplateData/save", //获取分类产品列表
    //获取模块数据
    templateMakeModuleData: domain + '/site/TemplateModule/create',




    /** =====================公用接口============================*/
    //获取模块列表
    moduleList: domain + '/site/WebSiteModule/list',

    //添加空白通栏
    addBlank: domain + "/site/WebSiteColumn/create",

    //获取模版列表
    templateList: domain + "/site/Template/list",
    // 切换模版
    switchTpList: domain + "/site/Template/change",

    //添加数据源分类
    addClassification: domain + "/site/TemplateData/add", //添加分类-------只有后台制作有添加！！！！

    /*******通栏模板接口********/
    //获取通栏行业分类
    industryList: domain + "/site/BuildColumn/industry",
    //获取通栏分类
    columnTemCates: domain + "/site/BuildColumn/cate",
    //通栏模板列表
    columnTemList: domain + "/site/BuildColumn/list",



}