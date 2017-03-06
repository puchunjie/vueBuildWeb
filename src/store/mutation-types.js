//关闭所有设置面板等
export const CLOSE_ALL = 'CLOSE_ALL';

//更新状态机为用户制作页面信息
export const SET_WEBSITEDATA = 'SET_WEBSITEDATA';
//更新状态机为通栏制作页面信息
export const SET_BANNERMAKE = 'SET_BANNERMAKE';
//设置状态机中页面模式：用户制作／通栏制作／模版制作
export const SET_SITEMODE = 'SET_SITEMODE';
//设置复制容器信息
export const SET_MODULE_COPY = 'SET_MODULE_COPY';


//设置页面为loading状态
export const SET_PAGELOADING = 'SET_PAGELOADING';
//移除页面loading状态
export const REMOVE_PAGELOADING = 'REMOVE_PAGELOADING';

//获取页面信息
export const SET_PAGEDATA = 'SET_PAGEDATA';

//获取layouts数据
export const RECEIVE_ALL = 'RECEIVE_ALL';

//模块重新渲染
export const MODULE_RESET = 'MODULE_RESET';

// 跟新导航数据
export const UPDATE_NAV_DATA = 'UPDATE_NAV_DATA';


//选中通栏
export const SET_SELECT_BANNER = 'SET_SELECT_BANNER';
// 添加通栏
export const ADD_BANNER = 'ADD_BANNER';
//删除通栏
export const REMOVE_BANNER = 'REMOVE_BANNER';
//通栏显示隐藏
export const TOGGLE_BANNER = 'TOGGLE_BANNER';
//通栏上移
export const MOVEUP_BANNER = 'MOVEUP_BANNER';
//通栏下移
export const MOVEDOWN_BANNER = 'MOVEDOWN_BANNER';
//通栏插入
export const CHANGE_BANNER_PLACE = 'CHANGE_BANNER_PLACE';
//修改通栏数据
export const MODIFY_BANNER_DATA = 'MODIFY_BANNER_DATA';
//打开通栏设置
export const OPEN_BANNER_SET = 'OPEN_BANNER_SET';
//关闭通栏设置
export const CLOSE_BANNER_SET = 'CLOSE_BANNER_SET';
//打开通栏设置公共
export const OPEN_PUBLIC_SET = 'OPEN_PUBLIC_SET';
//关闭通栏设置公共
export const CLOSE_PUBLIC_SET = 'CLOSE_PUBLIC_SET';
//跟新通栏样式
export const UPDATE_BANNER_DATA = 'UPDATE_BANNER_DATA';
//更新通栏高度
export const UPDATE_BANNER_SIZE = 'UPDATE_BANNER_SIZE';

//添加模块数据到layouts
export const ADD_MODULE_TO_LAYOUTS = 'ADD_MODULE_TO_LAYOUTS';
//粘贴模块数据到layouts
export const PASTE_MODULE_TO_LAYOUTS = 'PASTE_MODULE_TO_LAYOUTS';
//清空复制的模块
export const CLEAR_MODULE_COPY = 'CLEAR_MODULE_COPY';
//删除模块数据
export const DELETE_MODULE = 'DELETE_MODULE';
//跨通栏移动模块时候删除旧模块添加新模块
export const DELETE_OLD_ADD_NEW = 'DELETE_OLD_ADD_NEW';
//修改模块信息
export const MODIFY_MODULE_DATA = 'MODIFY_MODULE_DATA';
export const MODIFY_FLOATMODULE_DATA = 'MODIFY_FLOATMODULE_DATA';

//样式设置面板修改模块信息
export const MODIFY_MODULE_STYLE = 'MODIFY_MODULE_STYLE';
//advancedSetting数据修改
export const MODIFY_MODULE_ADVANCED = 'MODIFY_MODULE_ADVANCED';
//更新两个模块
export const MODIFY_MODULE_ZINDEX = 'MODIFY_MODULE_ZINDEX';



//切换选中模块
export const SWITCH_SELECT_MODULE_KEY = 'SWITCH_SELECT_MODULE_KEY';

//显示模块数据修改面板
export const OPEN_SETPANEL = 'OPEN_SETPANEL';
//隐藏模块数据修改面板
export const CLOSE_SETPANEL = 'CLOSE_SETPANEL';


//传入模块设置条数据，打开toolbar
export const OPEN_TOOLBAR = 'OPEN_TOOLBAR';
//清空模块设置条数据，关闭toolbar
export const CLOSE_TOOLBAR = 'CLOSE_TOOLBAR';
//重置选中的模块数据
export const RESET_SELEMODULE='RESET_SELEMODULE';

// leftBar
// 打开模块展示面板
export const OPEN_MODULE_VIEW = 'OPEN_MODULE_VIEW';
// 关闭模块展示面板
export const CLOSE_MODULE_VIEW = 'CLOSE_MODULE_VIEW';
//加载模块数据
export const SET_MODULE_LIST = 'SET_MODULE_LIST';
//设置选中模块分类
export const SET_ACTIVE_TYPE = 'SET_ACTIVE_TYPE';
//重置选中磨垮分类
export const RESET_ACTIVE_TYPE = 'RESET_ACTIVE_TYPE';


//更新导航
export const UPDATE_NAV_INFO = 'UPDATE_NAV_INFO';



//图片上传
export const OPEN_UPLOAD = 'OPEN_UPLOAD';
export const CLOSE_UPLOAD = 'CLOSE_UPLOAD';
export const MODIFY_MODULE_IMAGE = 'MODIFY_MODULE_IMAGE';

//模版选择面板
export const OPEN_TEMPLATE = 'OPEN_TEMPLATE';
export const CLOSE_TEMPLATE = 'CLOSE_TEMPLATE';

//通栏模版选择面板
export const OPEN_BANNERTPL = 'OPEN_BANNERTPL';
export const CLOSE_BANNERTPL = 'CLOSE_BANNERTPL';

//链接面板
export const OPEN_LINKSET = 'OPEN_LINKSET';
export const CLOSE_LINKSET = 'CLOSE_LINKSET';
export const MODIFY_MODULE_LINK = 'MODIFY_MODULE_LINK'

export const MODIFY_BANNER_MODULE = 'MODIFY_BANNER_MODULE';
//撤销和崇左
export const UNDO = 'UNDO';
export const REDO = 'REDO';

//通过id修改整个模块数据
export const MODIFY_MODULE_DATA_BY_INDEX = 'MODIFY_MODULE_DATA_BY_INDEX';

//页面管理面板
export const OPEN_PAGE_MANAGE_PANEL = 'OPEN_PAGE_MANAGE_PANEL';
export const CLOSE_PAGE_MANAGE_PANEL = 'CLOSE_PAGE_MANAGE_PANEL';
export const OPEN_ADD_PAGE_PANEL = 'OPEN_ADD_PAGE_PANEL';
export const CLOSE_ADD_PAGE_PANE = 'CLOSE_ADD_PAGE_PANE';

//页面设置
export const OPEN_PAGE_SET = 'OPEN_PAGE_SET';
export const CLOSE_PAGE_SET = 'CLOSE_PAGE_SET';
//网站管理
export const OPEN_WEB_SET = 'OPEN_WEB_SET';
export const CLOSE_WEB_SET = 'CLOSE_WEB_SET';
export const SET_PAGE_WIDTH = 'SET_PAGE_WIDTH';

//公共设置面板
export const GET_SETTING_INFO = 'GET_SETTING_INFO';
export const CLOSE_SETTING_PANE = 'CLOSE_SETTING_PANE';
