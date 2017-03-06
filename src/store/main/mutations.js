import merge from 'webpack-merge';
//工具条model
import toolsMutations from '../tools/mutations';
//模块model
import moduleMutations from '../module/mutations';
//设置面板model
import setpanelMutations from '../setpanel/mutations';
//左侧栏model
import leftbarMutations from '../leftbar/mutations';
//站点信息
import websiteMutations from '../webstie/mutations';
//页面信息
import viewpageMutations from '../viewpage/mutations';
//图片上传
import uploadMutations from '../imgUpload/mutations';
//模版选择
import templateMutations from '../templateSelect/mutations';
//通栏选择
import bannerTplMutations from '../bannerTplSelect/mutations';
export default merge(
    toolsMutations,
    moduleMutations,
    setpanelMutations,
    leftbarMutations,
    websiteMutations,
    viewpageMutations,
    uploadMutations,
    templateMutations,
    bannerTplMutations
)