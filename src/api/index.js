import Vue from 'vue'
import VueResource from 'vue-resource';
import apiConfig from "../configs/api";
import { merge } from 'bUtils';
Vue.use(VueResource);

function errMsg(vm) {
    vm.$message.error(response.data.msg)
};


// 发布、备份列表、退回版本
export function publishSite(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig['publish'];

    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//备份
export function setPublish(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig['backup'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
export function getPublishList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig['publishList'];

    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

export function rollBack(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig['rollBack'];

    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}


// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝站点＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//登陆验证
export function checkLogin(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'Login'];

    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//获取左侧栏模块列表
export function getModuleList(vm, cb) {
    let Url = apiConfig['moduleList'];
    if (Url) {
        Vue.http.post(Url).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//获取模块数据
export function getModuleData(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'ModuleData'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//保存页面（保存用户站点，保存通栏，保存模版）
export function savePage(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'Save'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//获取页面列表数据（站点／模版有所有页面）
export function getPageList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'PageList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//新建页面时后去页面类型
export function getPageType(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'PageType'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//设置页面
export function getPageInfo(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'PageGet'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//更改页面设置
export function setPageInfo(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'PageSet'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//获取页面数据根据pageID
export function getPageData(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'PageData'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//添加页面
export function addPage(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'AddPage'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//复制页面
export function copyPage(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'CopyPage'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//删除页面
export function deletePage(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'DeletePage'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝通栏＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//获取通栏列表
export function getPublicBannerList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'GetPublicBanner'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//获取通栏信息
export function getBannerInfoForPub(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'GetBannerInfo'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//修改通栏信息
export function modifyBannerInfo(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'ModifyBanner'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//添加通栏
export function getBannerInfo(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'AddBanner'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//设置公共通栏
export function setBannerPub(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'SetBannerPub'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}


//复制通栏
export function copyBanner(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'CopyBanner'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

// 添加空白通栏
export function addBlankBanner(vm, body, cb) {
    let Url = apiConfig['addBlank'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//获取行业分类
export function getIndustryList(vm, cb) {
    let Url = apiConfig['industryList'];
    if (Url) {
        Vue.http.post(Url).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//获取通栏分类
export function getBannerCates(vm, cb) {
    let Url = apiConfig['columnTemCates'];
    if (Url) {
        Vue.http.post(Url).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

// 获取通栏列表
export function getBannerList(vm, body, cb) {
    let Url = apiConfig['columnTemList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝导航＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//获取页面类型
export function navGetPageType(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'NavPageType'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//获取分类
export function navGetCate(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'NavPageCate'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}


//获取导航所有栏目
export function navGetNavList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'GetNavList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            console.log(response)
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//获取一级导航栏目
export function navGetFirstList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'FirstNavList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//获取备选链接指向
export function getLinkList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'GetSitUrl'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//新增导航栏目并创建页面
export function addNav(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'AddNav1'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//新增导航栏目自定义栏目
export function addNavCus(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'AddNav2'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//删除导航栏目
export function delNav(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'DelNav'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//获取导航栏目信息
export function getNavInfo(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'GetNavInfo'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//保存导航栏目栏目
export function saveNavInfo(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'SaveNav'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//改变导航栏目状态
export function ChangeNavStatus(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'ChangeStatus'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//导航排序
export function ChangeNavSort(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'SetSort'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝图片上传＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//获取用户图片库
export function getUploadList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'ImgList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//获取素材库
export function getMaterial(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'Material'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//获取通栏图片
export function getColumnPic(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'ColumnPic'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//获取模板图片
export function getTemplatePic(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'TemplatePic'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}


// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝数据源＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//获取分类列表
export function getClassification(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'Classification'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//获取分类产品列表
export function getClassificationSub(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'ClassificationSub'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//获取分类产品列表
export function saveDataSource(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'SaveDataSource'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//添加分类
export function addClassification(vm, body, cb) {
    let Url = apiConfig['addClassification'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//删除分类
export function removeClassification(vm, body, cb) {
    let Url = apiConfig['removeClassification'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//修改数据源分类
export function editClassification(vm, body, cb) {
    let Url = apiConfig['editClassification'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝产品，案例，文章 获取列表数据＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//获取产品列表信息
export function getItemList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'Itemlist'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
//产品分类信息
export function listCateList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'CateList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}


// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝模版选择，替换＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//模版列表
export function getTemplateList(vm, body, cb) {
    // let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig['templateList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//切换模版
export function switchTpList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig['switchTpList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}

//网站设置
export function getWebSetting(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'GetWholeSetting'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}
export function saveWebSetting(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig[siteMode + 'SaveWholeSetting'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}


/*********获取留言列表************/
export function getGuestbookList(vm, body, cb) {
    let siteMode = vm.$route.params.siteMode;
    let Url = apiConfig['GuestbookList'];
    if (Url) {
        Vue.http.post(Url, body).then((response) => {
            cb(response.body)
        }, (response) => {
            vm.$message.error(response.data.msg)
        });
    } else {
        console.log('error apiName');
    }
}