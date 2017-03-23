<template>
    <div class="addnav">
        <!--<div id="step1" class="step1" v-show="showStep==1">
            <div class="addnav-header">
                <h3 class="title">第一步：选择您需要的栏目添加方式</h3>
            </div>
            <ul class="columnadd-type clearfix">
                <li class="systemType" :class="{'active':(chosed==1)}" @click="setChose(1)">
                    <i class="el-icon-circle-check"></i>添加栏目并创建页面
                </li>
                <li class="customType" :class="{'active':(chosed==2)}" @click="setChose(2)">
                    <i class="el-icon-circle-check"></i>自定义栏目跳转
                </li>
            </ul>
            <div class="addnav-btn">
                <el-button type="primary" :disabled="tosec" id="next1" @click="gotoSec">下一步</el-button>
            </div>
        </div>
        <div class="step2" id="step2-sys" v-show="showStep==12">
            <h3 class="title">第二步：选择页面类型</h3>
            <div class="step2-pagetype">
                <el-radio v-for="(item,index) in navdata.pagetype" class="radio" v-model="navdata.pageId" :label="item.id">{{ item.name }}</el-radio>
            </div>
            <div class="addnav-btn">
                <el-button  id="prev" @click="setStep(1)">上一步</el-button>
                <el-button type="primary" id="next1" :disabled="navdata.pageId==''?true:false" @click="gotoThird">下一步</el-button>
            </div>
        </div>
        <div class="step3" id="complete-sys" v-show="showStep==13">
            <h3 class="title"> 第三步：完成设置</h3>
            <ul class="clearfix complete-set">
                <li class="clearfix">
                    <label class="lab-title"><i class="red">*</i>栏目名称</label>
                    <el-input
                      placeholder="栏目名"
                      v-model="navdata.name"
                      class="addNav-name"
                      >
                    </el-input>
                    <el-input
                      placeholder="副标题"
                      v-model="navdata.ename"
                      class="addNav-ename"
                      >
                    </el-input>
                </li>
                <li class="clearfix">
                    <label class="lab-title">上级栏目</label>
                    <el-select v-model="navdata.pid" placeholder="请选择" class="selbox">
                        <el-option label="顶级栏目" value="0"></el-option>
                        <el-option
                          v-for="item in navdata.fnav"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <li class="clearfix">
                    <label class="lab-title">选择分类</label>
                    <el-select v-model="navdata.leiId" placeholder="请选择" class="selbox">
                        <el-option label="所有分类" value="0"></el-option>
                        <el-option
                          v-for="item in fenlei"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <li class="clearfix targetType">
                    <label class="lab-title">跳转方式</label>
                    <el-radio v-for="(item,index) in navdata.targets" class="radio" v-model="navdata.target" :label="item.val">{{ item.name }}</el-radio>
                </li>
            </ul>
            <div class="addnav-btn">
                <el-button  id="prev" @click="setStep(12)">上一步</el-button>
                <el-button type="primary" :disabled="navdata.name==''?true:false"  @click="seccessSub">完 成</el-button>
            </div>
        </div>-->
        <!-- v-show="showStep==22"-->
        <div class="step2" id="complete-cus">
            <!--<h3 class="title">第二步：完成设置</h3>-->
            <ul class="clearfix complete-set">
                <li class="clearfix">
                    <label class="lab-title"><i class="red">*</i>栏目名称</label>
                    <el-input
                      placeholder="栏目名"
                      v-model="navdata.name"
                      class="addNav-name"
                      >
                    </el-input>
                    <el-input
                      placeholder="副标题"
                      v-model="navdata.ename"
                      class="addNav-ename"
                      >
                    </el-input>
                </li>
                <li class="clearfix">
                    <label class="lab-title">上级栏目</label>
                    <el-select v-model="navdata.pid" placeholder="请选择" class="selbox">
                            <el-option label="顶级栏目" value="0"></el-option>
                            <el-option
                              v-for="item in navdata.fnav"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                    </el-select> 
                </li>
                <li class="clearfix">
                    <label class="lab-title">跳转设置</label>
                    <el-radio-group v-model="choselinkType" @change="getLinkListFn">
                        <el-radio  class="radio lineHeight36" data-type="product" label="product"   >产品</el-radio>
                        <el-radio  class="radio lineHeight36" data-type="article" label="article">新闻</el-radio>
                        <el-radio  class="radio lineHeight36" data-type="case" label="case">案例</el-radio>
                        <el-radio  class="radio lineHeight36" data-type="page" label="page">页面（页面管理中的部分页面）</el-radio>
                        <el-radio  class="radio lineHeight36" data-type="custom" label="custom" >手动输入链接</el-radio>
                    </el-radio-group>    
                </li>
                <li class="clearfix">
                    <label class="lab-title"><!--<i class="red">*</i>-->指向页面</label>
                    <el-select v-model="navdata.link" placeholder="请选择" class="selbox" v-show="choselinkType!='custom'">
                            <el-option
                              v-for="item in linkList"
                              :label="item.name"
                              :value="item.link">
                            </el-option>
                    </el-select> 
                    <el-input
                          placeholder="输入网址,如http://www.baidu.com"
                          v-model="navdata.link"
                          class="link-cus" v-show="choselinkType=='custom'">
                    </el-input>
                </li>
                <li class="clearfix targetType">
                    <label class="lab-title">跳转方式</label>
                    <el-radio v-for="(item,index) in navdata.targets" class="radio" v-model="navdata.target" :label="item.val">{{ item.name }}</el-radio>
                </li>
            </ul>
            <div class="addnav-btn">
                <!--<el-button  id="prev" @click="setStep(1)">上一步</el-button>-->
                <el-button type="primary" :disabled="navdata.name==''?true:false" @click="seccessSub">完 成</el-button>
            </div>
        </div> 
    </div>   
    
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import {
        navGetPageType,
        navGetCate,
        navGetFirstList,
        getLinkList,
        addNav,
        addNavCus,
        navGetNavList
    } from 'ajaxAPI';
    export default {
        props: {
            ishide: Boolean
        },
        created:function(){
            this.gotoCusSet();
            this.getLinkListFn();
        },
        methods: {
            ...mapActions([
                'closeModuleSet',
                'updateNav',
                'modifyModuleData'
            ]),
            setChose:function(val){
                this.chosed=val
            },

            //跳到第几步
            setStep:function(val){
                this.showStep=val
            },

            /*进入第二步*/
            gotoSec:function(){
                let _this = this;
                if(this.chosed==1){
                    navGetPageType(_this,{"siteid":_this.websiteInfo.siteid,"nid":_this.getModuleData.nid},function(response){
                        if (response.err_code === 0) {
                            _this.showStep=12;
                            _this.navdata.pagetype = response.list;
                            _this.pageId=response.list[0].id;
                        }
                    })
                }else{
                    let _this=this;
                    let sendFnavData={
                        "siteid":_this.websiteInfo.siteid,
                        "nid":_this.getModuleData.nid
                    };
                    navGetFirstList(_this,sendFnavData,function(response){
                            if (response.err_code === 0) {
                                _this.showStep=22;
                                _this.navdata.fnav = response.info;
                            }
                    })
                    let sendLinkParam={
                        "siteid":_this.websiteInfo.siteid,
                        "type":_this.choselinkType
                    };
                    getLinkList(_this,sendLinkParam,function(response){
                            _this.linkList = response.info;
                        }) 

                }
            },
            /*进入第三步*/
            gotoThird:function(){
                let _this=this;
                navGetFirstList(_this,{"siteid":_this.websiteInfo.siteid,"nid":_this.getModuleData.nid},function(response){
                        if (response.err_code === 0) {
                            _this.showStep=13;
                            _this.navdata.fnav = response.info;
                        }
                    })
                //获取分类 
                navGetCate(_this,{"pageId":_this.navdata.pageId,"siteid":_this.websiteInfo.siteid},function(response){
                    _this.fenlei=response.list;
                })
            },
            /*
            自定义第二步
             */
            gotoCusSet:function(){
                let _this=this;
                let setData={
                    "siteid":_this.websiteInfo.siteid,
                    "nid":_this.getModuleData.nid
                };
                navGetFirstList(_this,setData,function(response){
                        if (response.err_code === 0) {
                            _this.showStep=13;
                            _this.navdata.fnav = response.info;
                        }
                })
            },
            /*获取链接指向*/
            getLinkListFn:function(){
                let _this=this;
                _this.navdata.link="";
                let sendLinkParam={
                        "siteid":_this.websiteInfo.siteid,
                        "type":_this.choselinkType
                    };
                getLinkList(_this,sendLinkParam,function(response){
                        _this.linkList = response.info;
                        
                    })
            },

            /*点击完成*/
            seccessSub:function(){
                let _this=this;
                if(_this.chosed==1){
                    let json={
                        "siteid":_this.websiteInfo.siteid,
                        "nid":_this.getModuleData.nid,    //导航列id
                        "pid":_this.navdata.pid,      //顶级栏目
                        "cid":_this.navdata.leiId,
                        "name":_this.navdata.name,
                        "ename":_this.navdata.ename,
                        "target": _this.navdata.target,
                        "pageId": _this.navdata.pageId
                    };
                    addNav(_this,json,function(response){
                        if(response.err_code==0){
                            let sendNavParam={
                                "siteid":_this.websiteInfo.siteid,
                                "nid":_this.getModuleData.nid
                            }
                            navGetNavList(_this,sendNavParam,function(response){
                                let navList=response.info;
                                //console.log(navList);
                                _this.updateNav({
                                    'navs':navList
                                });
                                _this.$message({
                                  message: '添加成功！',
                                  type: 'success'
                                });
                                _this.closeModuleSet()
                            })
                        }else{
                                _this.$message.error(response.msg);
                        } 
                    }) 
                }else{
                    /*if(_this.navdata.link==''){
                         _this.$message.error("指向页面不能为空！");
                         return;
                    }*/
                    let json={
                        "siteid":_this.websiteInfo.siteid,
                        "nid":_this.getModuleData.nid,    //导航列id
                        "pid":_this.navdata.pid,      //顶级栏目
                        "cid":_this.navdata.leiId,
                        "name":_this.navdata.name,
                        "ename":_this.navdata.ename,
                        "link": _this.navdata.link,   //导航url
                        "target": _this.navdata.target,
                        "linkType": _this.choselinkType
                    };
                    addNavCus(_this,json,function(response){
                        if(response.err_code==0){
                            let sendNavParam={
                                "siteid":_this.websiteInfo.siteid,
                                "nid":_this.getModuleData.nid
                            }
                            navGetNavList(_this,sendNavParam,function(response){
                                let navList=response.info;
                                //console.log(navList);
                                _this.updateNav({
                                    'navs':navList
                                });
                                _this.$message({
                                  message: '添加成功！',
                                  type: 'success'
                                });
                                _this.closeModuleSet()
                            })
                        }else{
                                _this.$message.error(response.msg);
                        }    
                        
                    }) 
                }  
            },
  
        },
        computed:{
            ...mapGetters([
                'websiteInfo',
                'getModuleData'
            ]),
            tosec:function(){
                if(this.chosed!=0){
                    return false
                }else{
                    return true
                }
            }
        },
        data() {
            return {
                chosed:0,
                showStep:22,
                choselinkType:"product",
                fenlei:[],      //分类
                navdata: {
                    pageId: "",   //页面类型id
                    pid:"0",      //顶级栏目id
                    name: "",
                    ename: "",
                    target: "_self",
                    linkType: "product",
                    link: "",
                    lanmu: [],      
                    fnav:[],//一级栏目
                    leiId:"0",
                    pagetype: [
                        {id:1,name:"交易中心"},
                        {id:2,name:"交易中心"},
                        {id:3,name:"交易中心"},
                    ],
                    targets:[
                        {
                            val:"_self",
                            name:"本页跳转"
                        },
                        {
                            val:"_blank",
                            name:"打开新页面"
                        }
                    ]
                },
                linkList:[]
            }
        }
    }
</script>

<style>
    .addnav .red{ color: red; }
    .columnadd-type {
        margin-top: 20px;
    }
    .columnadd-type li{
        line-height: 30px;
        border:solid 1px #d5d5d5;
        padding: 10px;
        font-size: 16px;
        margin-top: 10px;
        cursor: pointer;
    }
    .el-icon-circle-check{
        font-size: 30px;
        color:#e7e6e2;
        margin-right: 10px;
        vertical-align: middle;
    }
    .addnav-btn{ margin-top: 20px; text-align: center;}
    .columnadd-type li.active{
        background: #5e88b0;
        color: #ffffff;
    }
    /*step2-sys*/
    .step2-pagetype{ margin: 15px 0; text-align: center; }
    .complete-set{ padding-top: 20px; }
    .complete-set li{ margin-bottom: 10px; }
    .lab-title{ width: 80px; float: left; font-size: 14px; line-height: 36px; }
    .addNav-name,.addNav-ename{
        width: 150px;
        float: left;
    }
    .addNav-ename{ margin-left: 10px; }
    .selbox{ width: 200px; float: left; }
    .complete-set .targetType{ line-height: 36px; }
    .lineHeight36{line-height: 36px;}
    .link-cus{ width: 200px; float: left; }

    .add-success{ display: none; }
</style>