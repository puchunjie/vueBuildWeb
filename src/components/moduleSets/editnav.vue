<template>
    <div id="menuEdit">
        <div class="menuEdit-step1" v-show="showStep==1">
            <div class="" style="display: block">
                <div class="menuEdit-top  clearfix">
                    <ul class="title clearfix">
                        <li class="frist">栏目名称</li>
                        <li class="two">栏目类型</li>
                        <li class="three">显示/隐藏</li>
                        <li class="four">打开方式</li>
                        <li class="five">操作</li>
                    </ul>
                    <div class="navEdit nestable-lists">
                        <div class="columnedit-nav reset clearfix dd" id="nestable">
                            <ol class="dd-list clearfix">
                                <li class="dd-item" v-for="item in navdata.data" :data-id="item.id">
                                    <div class="dl dd-handle">
                                        <div class="mark"></div>
                                        <div class="itemName">{{item.name}}</div>
                                        <div class="itemType">{{item.pageName}}</div>
                                        <div class="itemOpen">
                                            <span class="itemOpenIco dd-nodrag" 
                                            :class="item.isDisplay =='1'?'checked_on':'checked_off'" 
                                            @click="ChangeNavStatus(item,'isDisplay')">
                                            </span>
                                        </div>
                                        <div class="itemStyle dd-nodrag">跳转
                                            <span class="itemStyleIco" 
                                              :class="item.target =='_self'?'checked_off':'checked_on'"
                                              @click="ChangeNavStatus(item,'target')">
                                            </span>
                                        </div>
                                        <div class="itemManage dd-nodrag" @click="edit(item.id)">
                                            编辑<span class="itemManageIco"></span></div>
                                        <em class=" dd-nodrag del" @click="delNav(item.id)"><i class="iconfont edit-remove">
                                        &#xe60d;</i></em>
                                    </div>
                                    <ol class="dd-list">
                                        <li class="dd-item" v-for='nav2 in item.navs' :data-id="nav2.id" >
                                            <div class="dl dd-handle">
                                                <div class="mark"></div>
                                                <div class="itemName">{{nav2.name}}</div>
                                                <div class="itemType">{{nav2.pageName}}</div>
                                                <div class="itemOpen dd-nodrag">
                                                    <span class="itemOpenIco" 
                                                    :class="nav2.isDisplay =='1'?'checked_on':'checked_off'"
                                                    @click="ChangeNavStatus(nav2,'isDisplay')">
                                                    </span>
                                                </div>
                                                <div class="itemStyle dd-nodrag">跳转
                                                    <span class="itemStyleIco" 
                                                    :class="nav2.target =='_self'?'checked_off':'checked_on'"
                                                    @click="ChangeNavStatus(nav2,'target')">
                                                    </span>
                                                </div>
                                                <div class="itemManage dd-nodrag" @click="edit(nav2.id)">编辑<span class="itemManageIco"></span>
                                                </div>
                                                <em class="dd-nodrag del" @click="delNav(nav2.id)"><i class="iconfont edit-remove">&#xe60d;</i></em>
                                            </div>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div class="edit-sub">
                        <el-button type="primary" @click="closePanel">完成</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="menuEdit-step2" v-show="showStep==2">
            <h3 class="title">您正在编辑“{{navName}}”栏目</h3>
            <ul class="page-set columnadd-set clearfix">
                <li class="clearfix">
                    <label class="lab-title"><i class="red">*</i>栏目名称</label>
                    <el-input placeholder="栏目名" v-model="navdata.lanmu.name" class="addNav-name">
                    </el-input>
                    <el-input placeholder="副标题" v-model="navdata.lanmu.ename" class="addNav-ename">
                    </el-input>
                </li>
                <li class="clearfix">
                    <label class="lab-title">上级栏目</label>
                    <el-select v-model="navdata.lanmu.pid" placeholder="请选择" class="selbox">
                        <el-option label="顶级栏目" value="0"></el-option>
                        <el-option v-for="item in navdata.fnav" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <!--v-if="choselinkType!=null && choselinkType!=''"-->
                <li class="clearfix">
                    <el-radio-group v-model="choselinkType" @change="getLinkListFn">
                        <label class="lab-title">跳转设置</label>
                        <el-radio class="radio lineHeight36" data-type="product" label="product" v-model="choselinkType">产品</el-radio>
                        <el-radio class="radio lineHeight36" data-type="article" label="article" v-model="choselinkType">新闻</el-radio>
                        <el-radio class="radio lineHeight36" data-type="case" label="case" v-model="choselinkType">案例</el-radio>
                        <el-radio class="radio lineHeight36" data-type="page" label="page" v-model="choselinkType">页面（页面管理中的部分页面）</el-radio>
                        <el-radio class="radio lineHeight36" data-type="custom" label="custom" v-model="choselinkType">手动输入链接</el-radio>
                    </el-radio-group>
                </li>
                <li class="clearfix">
                    <label class="lab-title">指向页面</label>
                    <el-select v-model="link" placeholder="请选择" class="selbox" v-show="choselinkType!='custom'">
                        <el-option v-for="item in linkList" :label="item.name" :value="item.link">
                        </el-option>
                    </el-select>
                    <el-input placeholder="输入网址,如http://www.baidu.com" v-model="link" class="link-cus" v-show="choselinkType=='custom'">
                    </el-input>
                </li>
                <li class="clearfix targetType">
                    <label class="lab-title">跳转方式</label>
                    <el-radio v-for="(item,index) in navdata.targets" class="radio" v-model="navdata.lanmu.target" :label="item.val">{{ item.name }}</el-radio>
                </li>
            </ul>
            <div class="edit-sub">
                <el-button @click="goBack">返回</el-button>
                <el-button type="primary" @click="commit" :disabled="navdata.lanmu.name==''?true:false">完成</el-button>
            </div>
        </div>
    </div>
</template>
<script>
require('nestable')
import {
    mapGetters,
    mapActions
} from 'vuex';
import {
    navGetPageType,
    navGetFirstList,
    getLinkList,
    addNav,
    addNavCus,
    navGetNavList,
    delNav,
    getNavInfo,
    saveNavInfo,
    ChangeNavStatus,
    ChangeNavSort
} from 'ajaxAPI';
export default {
    props: {
        ishide: Boolean
    },
    methods: {
        ...mapActions([
            'closeModuleSet',
            'updateNav',
            'modifyModuleData'
        ]),
        /*获取链接指向*/
        getLinkListFn: function() {
            let _this = this;
            let sendLinkParam = {
                "siteid": _this.websiteInfo.siteid,
                "type": _this.choselinkType
            };
            getLinkList(_this, sendLinkParam, function(response) {
                _this.linkList = response.info;
                if(_this.choselinkType==_this.navdata.lanmu.linkType){
                    _this.link=_this.navdata.lanmu.link
                }else{
                    _this.link=""
                }

            })
        },
        goBack: function() {
            this.showStep = 1;
        },
        //编辑导航栏目
        edit: function(id) {
            this.showStep = 2;
            let _this = this;
            getNavInfo(_this, {
                id: id
            }, function(response) {
                _this.navdata.lanmu = response.info;
                _this.choselinkType = response.info.linkType;
                _this.link=response.info.link;
                _this.navName=response.info.name;
                if(_this.navdata.lanmu.child=="0") {
                    //获取一级栏目
                    let sendFnavData={
                            "siteid":_this.websiteInfo.siteid,
                            "nid":_this.getModuleData.nid
                        };
                    navGetFirstList(_this,sendFnavData,function(response){
                            if (response.err_code === 0) {
                                var fnavArr = response.info;
                                    $(fnavArr).each(function (i, v) {
                                        if (v.id == _this.navdata.lanmu.id) {
                                            fnavArr.splice(i, 1)
                                        }
                                    })
                                _this.navdata.fnav = fnavArr;
                            }
                    });
                }    
                if (_this.choselinkType != null) {
                    let sendLinkParam = {
                        "siteid": _this.websiteInfo.siteid,
                        "type": _this.choselinkType
                    };
                    getLinkList(_this, sendLinkParam, function(response) {
                        _this.linkList = response.info;

                    })
                }
            })
        },
        //删除导航栏目
        delNav: function(id) {
            let _this = this;
            delNav(_this, {
                id: id
            }, function(response) {
                if (response.err_code == 0) {
                    _this.$message({
                              message: '删除成功！',
                              type: 'success'
                    });
                    _this.handlerNav();
                }else{
                    _this.$message.error(response.msg)
                }
            })
        },
        //设置显示隐藏
        ChangeNavStatus: function (item,option) {
            let _this=this;
            let jsonData={
                "nid": item.id, 
                "option": option,
                "value": item[option]
            };
            ChangeNavStatus(_this,jsonData, function(response) {
                if(response.err_code == 0){
                    _this.$message({
                            message: '更改成功！',
                            type: 'success'
                    });
                    if(option=='isDisplay'){
                        item.isDisplay=(item.isDisplay=='1')?'0':'1';
                    }else{
                        item.target = (item.target == "_self") ? '_blank' : '_self';
                    }
                    //重新渲染导航
                    _this.handlerNav();
                }       
            })           
        },
        //点击完成
        commit:function(){
            let _this=this;
            let data={
                    "link": _this.link,
                    "linkType": _this.choselinkType,
                    "id": _this.navdata.lanmu.id,
                    "name": _this.navdata.lanmu.name,
                    "ename": _this.navdata.lanmu.ename,
                    "pid": _this.navdata.lanmu.pid,
                    "target": _this.navdata.lanmu.target
                };
            saveNavInfo(_this, data, function(response) {
                    if(response.err_code==0){
                        _this.$message({
                              message: '保存成功！',
                              type: 'success'
                        });
                        _this.showStep=1;
                        _this.handlerNav();
                    }
                })
        },
        //完成后关闭面板
        closePanel:function(){
            this.handlerNav();
            this.closeModuleSet()
        },
        //重新渲染导航
        handlerNav:function(){
            let _this=this;
            let sendNavParam = {
                "siteid": _this.websiteInfo.siteid,
                "nid": _this.getModuleData.nid
            };
            navGetNavList(_this, sendNavParam, function(res) {
                _this.navdata.data = res.info;
                _this.updateNav({
                    'navs': res.info
                });
            })
        }
    },
    computed: {
        ...mapGetters([
                'websiteInfo',
                'getModuleData'
            ])

    },
    created: function() {
        let _this = this;
        let sendNavParam = {
            "siteid": _this.websiteInfo.siteid,
            "nid": _this.getModuleData.nid
        };
        navGetNavList(_this, sendNavParam, function(response) {
            _this.navdata.data = response.info;

        })
    },
    mounted: function() {
        //排序
        let _this=this;
        var updateOutput = function() {
            //console.log(JSON.stringify($("#nestable").nestable('serialize')))
            ChangeNavSort(_this,$("#nestable").nestable('serialize'),function(response){
                //console.log(response);
                
            })
        }
        $('#nestable').nestable({
            group: 1,
            maxDepth: 2,
        }).on('change', updateOutput);
    },
    data() {
        return {
            choselinkType: "product",
            link:"",
            showStep: 1,
            linkList: [], //指向连接
            navName:"",
            navdata: {
                data: [], //导航数据
                lanmu: { //编辑栏目的数据
                    pid: 0,
                    pageId: null,
                    id: null,
                    target: "_self",
                    link: "",
                    name: "",
                    ename: "",
                    linkType: ""
                },
                targets: [{
                    val: "_self",
                    name: "本页跳转"
                }, {
                    val: "_blank",
                    name: "打开新页面"
                }],
                pagetype: [], //页面管理中的页面信息
                fnav: [], //上级栏目
                sorts: false

            }
        }
    }
}
</script>
<style>
.el-dialog {
    
}

#menuEdit {
    width: 700px;
    margin: 0 auto;
}
#menuEdit .red{
    color:#FF0000;
}
.menuEdit-top .title li {
    float: left;
    text-align: center;
    color: #939393;
    line-height: 25px;
    width: 60px;
}

.menuEdit-top .title > li.frist {
    margin: 0 0 0 24px;
}

.menuEdit-top .title > li.two {
    margin: 0 80px;
}

.menuEdit-top .title> li.three {}

.menuEdit-top .title > li.four {
    margin: 0 0 0 86px;
}

.menuEdit-top .title > li.five {
    margin: 0 0 0 86px;
}

.columnedit-nav {
    height: 250px;
    overflow-y: auto;
}

#menuEdit .menuEditsel {
    min-width: 128px;
    height: 23px;
}

#menuEdit .edit-remove {
    color: #666666;
    font-size: 14px;
    cursor: pointer;
}

#menuEdit .popup-columnadd .columnadd-set > li {
    margin-bottom: 10px;
}

.dd-handle {
    height: 34px;
    line-height: 34px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #e2e2e2;
    margin: 0 0 10px 0;
    color: #333333;
    cursor: move;
    overflow: hidden;
}
.navEdit{
    margin-top: 15px;
}
.navEdit .dd-list .dd-list {
    padding-left: 28px;
}

.navEdit .dd-list .dd-list .mark {
    background: url(../../assets/images/columnedit-navbg.png);
    clear: left;
    float: left;
    height: 10px;
    width: 10px;
    margin: 10px 0 0 10px;
    display: block;
}

.navEdit .itemName {
    float: left;
    width: 125px;
    height: 1px;
    /*overflow: hidden;*/
    display: inline-block;
    text-align: left;
    text-indent: 36px;
}

.navEdit .itemType {
    float: left;
    width: 140px;
    height: 1px;
    text-align: center;
}

.navEdit .itemOpen {
    float: left;
    width: 125px;
    text-align: center;
}

.navEdit .itemStyle {
    float: left;
    width: 186px;
    cursor: pointer;
    text-align: center;
}

.navEdit .itemManage {
    float: left;
    width: 69px;
    cursor: pointer;
    text-align: right;
}

.navEdit .dd-list .dd-list .itemName {
    width: 87px;
    text-align: left;
    text-indent: 10px;
}

.navEdit .dd-list .dd-list .itemType {
    float: left;
    width: 120px;
}

.navEdit .dd-list .dd-list .itemOpen {
    float: left;
    width: 144px;
}

.navEdit .dd-list .dd-list .itemStyle {
    float: left;
    width: 178px;
}

.navEdit .dd-list .dd-list .itemManage {
    width: 68px;
    cursor: pointer;
    text-align: right;
}

.navEdit .dd-list .mark {
    display: none;
}


/*拖动*/
.dd-dragel {
    position: absolute;
    z-index: 9999;
    pointer-events: none;
}
.dd-dragel .mark {
    display: none;
}

.dd-dragel .itemManage,
.dd-dragel .del {
    display: none;
}

.dd-dragel .itemName {
    float: left;
    width: 125px;
    height: 34px;
    overflow: hidden;
    display: inline-block;
    text-align: left;
    text-indent: 36px;
}

.dd-dragel .itemType {
    float: left;
    width: 140px;
    height: 34px;
    text-align: center;
}

.dd-dragel .itemTips {
    float: left;
    width: 300px;
    color: #5e87b0;
    text-align: center;
}

.dd-dragel .itemOpen {
    float: left;
    width: 125px;
    text-align: center;
}

.dd-dragel .itemStyle {
    float: left;
    width: 186px;
    cursor: pointer;
    text-align: center;
}

.dd-dragel .itemManage {
    float: left;
    width: 69px;
    cursor: pointer;
    text-align: right;
}

.navEdit ol li span {
    cursor: pointer;
    height: 10px;
    width: 10px;
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
}

.itemOpen .itemOpenIco {
    height: 10px;
    margin: 12px auto;
    width: 20px;
    display: block;
    /*background: url(../../assets/images/columnedit-navbg.png) no-repeat -28px 0;*/
}

.itemOpen .checked_off {
    background: url(../../assets/images/columnedit-navbg.png) no-repeat -28px 0;
}

.itemOpen .checked_on {
    background: url(../../assets/images/columnedit-navbg.png) no-repeat -10px 0;
}

.itemStyleIco {
    background: url(../../assets/images/columnedit-navbg.png) no-repeat -48px 0;
}

.itemStyle .checked_off {
    background: url(../../assets/images/columnedit-navbg.png) no-repeat -48px 0;
}

.itemStyle .checked_on {
    background: url(../../assets/images/columnedit-navbg.png) no-repeat -62px 0;
}

.itemManageIco {
    background: url(../../assets/images/columnedit-navbg.png) no-repeat -76px 0;
}





/* Nestable list */

.dd-item > button {
    display: block;
    position: relative;
    cursor: pointer;
    float: left;
    width: 0px;
    height: 0px;
    margin: 0;
    padding: 0;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    border: 0;
    background: transparent;
    font-size: 0px;
    line-height: 1;
    text-align: center;
    font-weight: bold;
}

.dd-item > button:before {
    content: '+';
    display: block;
    position: absolute;
    width: 100%;
    text-align: center;
    text-indent: 0;
    font-size: 0;
    display: none;
    width: 0;
    height: 0;
}

.dd-item > button[data-action="collapse"]:before {
    content: '-';
    font-size: 0;
    display: none;
    width: 0;
    height: 0;
}

.dd-placeholder,
.dd-empty {
    margin: 5px 0;
    padding: 0;
    min-height: 30px;
    background: #f2fbff;
    border: 1px dashed #b6bcbf;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}

.dd-empty {
    border: 1px dashed #bbb;
    min-height: 100px;
    background-color: #e5e5e5;
    background-image: -webkit-linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), -webkit-linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff);
    background-image: linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
}

.dd-dragel {
    position: absolute;
    z-index: 9999;
    pointer-events: none;
}

.dd-dragel > .dd-item .dd-handle {
    margin-top: 0;
}

.dd {
    position: relative;
    display: block;
}


.edit-sub {
    text-align: center;
    margin-top: 20px;
}

.menuEdit-step2 li {
    margin-top: 10px;
}

.menuEdit-step2 .targetType {
    line-height: 36px;
}
</style>
