<template>
    <el-tabs type="border-card">
        <el-tab-pane label="位置设置">
            <ul class="clearfix">
                <li class="plugin-set-part clearfix">
                    <div class="plugin-set-con clearfix">
                        <span class="plugin-set-con-l">顶部距离:</span>
                        <!-- <el-input  placeholder="请输入内容" class="plugin-set-input" v-model="top" @change="setTop"></el-input> -->
                        <!-- <input type="number" placeholder="请输入数值" autocomplete="off" v-model="top" class="topinput el-input__inner" @change="setTop"> -->
                        <div class="plugin-set-width">
                            <el-slider class="onlyInput" v-model="top" :min="0" :max="1000" @change="setTop" show-input>
                            </el-slider>
                        </div>
                        <!-- <span class="plugin-set-tips">同时填写单位(px或%)</span> -->
                        <el-radio-group v-model="unit" @change="setTop">
                            <el-radio :label="'true'">px</el-radio>
                            <el-radio :label="'false'">%</el-radio>
                            
                          </el-radio-group>
                         <!-- <el-radio class="radio" v-model="unit" label="px" @change="setTop">px</el-radio>
                         <el-radio class="radio" v-model="unit" label="%" @change="setTop">%</el-radio> -->
                    </div>
                </li>
            </ul>
        </el-tab-pane>
        <el-tab-pane label="QQ设置">
            <ul>
                <li class="plugin-set-part clearfix">
                    <div class="plugin-set-con clearfix">
                        <span class="plugin-set-con-l">是否显示:</span>
                        <el-switch
                          on-color="#13ce66"
                          off-color="#ff4949" v-model="qqShow" class="switch-set" @change="setShow('qqShow')"> 
                        </el-switch>
                    </div>
                    <div v-show="qqShow"> 
                        <div class="plugin-set-con clearfix" v-for="(item,index) in qqList" :key="index">
                            <span class="plugin-set-con-l">QQ账号:</span>
                            <el-input  placeholder="请输入QQ账号" class="plugin-set-input" v-model="item.title"></el-input>
                            <i class="el-icon-close plugin-set-close" @click="removeQQ(index)"></i>
                        </div>
                        <el-button type="primary" @click="addItem('qq')">添加</el-button>
                    </div>
                    
                </li>
             </ul>
        </el-tab-pane>  
        <el-tab-pane label="电话设置">
            <ul> 
                <li class="plugin-set-part clearfix">
                    <div class="plugin-set-con clearfix">
                        <span class="plugin-set-con-l">是否显示:</span>
                        <el-switch
                          on-color="#13ce66"
                          off-color="#ff4949" v-model="telShow" class="switch-set" @change="setShow('telShow')">
                        </el-switch>
                    </div>
                    <div v-show="telShow">
                        <div class="plugin-set-con clearfix" v-for="(item,index) in teList" :key="index">
                            <span class="plugin-set-con-l">电话号码:</span>
                            <el-input  placeholder="请输入电话号码" class="plugin-set-input" v-model="item.title"></el-input>
                            <i class="el-icon-close plugin-set-close"></i>
                        </div>
                        <el-button type="primary" @click="addItem('tel')">添加</el-button>
                    </div>
                    
                </li>
            </ul>
        </el-tab-pane>
        <el-tab-pane label="二维码设置">  
            <ul>  
                <li class="plugin-set-part clearfix">
                    <div class="plugin-set-con clearfix">
                        <span class="plugin-set-con-l">是否显示:</span>
                        <el-switch
                          on-color="#13ce66"
                          off-color="#ff4949" v-model="codeShow" class="switch-set" @change="setShow('codeShow')">
                        </el-switch>
                    </div>
                    <div class="plugin-set-con clearfix">
                        <span class="plugin-set-con-l">图片设置:</span>
                        <div class="plugin-set-con-r">
                            <span class="codePic">
                                <img :src="codeImage">
                            </span>
                            <el-button-group class="plugin-set-buttons">
                                <el-button type="primary" @click="uploadImg">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                                <el-button type="danger" @click="setImgNone">移除<i class="el-icon-delete el-icon--right"></i></el-button>
                            </el-button-group>
                        </div>   
                    </div>
                </li>
            </ul>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
        getBaseData
    } from '../../methods/helpers/getcss.js'
import cssJson from 'cssJson';
export default {
    props: {
        ishide: Boolean
    },
    computed: {
        ...mapGetters([
            'getModuleData'
        ]),
        qqList:function(){
            //let list= _.clone(this.getFloatModuleData.moduleSet.advancedSetting.qq);
            let list= this.getModuleData.moduleSet.advancedSetting.qq;
            return list;
        },
        teList:function(){
            let list=this.getModuleData.moduleSet.advancedSetting.tel;
            return list;
        },
        codeImage:function(){
            return this.getModuleData.moduleSet.advancedSetting.code;
        }
        
    },
    created: function() {
        this.qqShow=this.getModuleData.moduleSet.advancedSetting.qqShow;
        this.telShow=this.getModuleData.moduleSet.advancedSetting.telShow;
        this.codeShow=this.getModuleData.moduleSet.advancedSetting.codeShow;
        this.unit=this.getModuleData.$styles.container.top.indexOf("px")>-1?"true":"false";
        this.top=parseInt(this.getModuleData.$styles.container.top);
    },
    methods: {
        ...mapActions([
            'closeModuleSet',
            'modifyModuleStyle',
            'modifyModuleData',
            'openUpload',
            'modifyModuleAdvanced',
                'modifyFloatModuleData'
        ]),
        uploadImg:function(){
            this.openUpload({
                target: 'moduleSet>advancedSetting>code',
                isBack: false,
                mode: 'module',
                container:'floatModules'
            })
        },
        setTop:function(){
            let _this=this;
            
            let module = _this.getModuleData;
            let danwei="";
            if(this.unit=='true'){
                danwei="px"
            }else{
                danwei="%"
            }
            module.$styles.container.top=this.top+danwei;
            //this.modifyFloatModuleData(module);
            cssJson.toStyleHEAD(module, true);
        },
        addItem:function(prop) {
            let item=null;
            if(prop=='qq'){
               item = _.clone(this.QQItem);
               this.qqList.push(item) 
            }else{
                item = _.clone(this.telItem)
                this.teList.push(item) 
            }
                
        },
        setShow(prop){
            let _this=this;
            if(prop=='qqShow'){
                _this.modifyModuleAdvanced({
                    attributetarget: {
                        "qqShow": _this.qqShow
                    },
                    container: 'floatModules'
                });
            }else if(prop=='telShow'){
                _this.modifyModuleAdvanced({
                    attributetarget: {
                        "telShow": _this.telShow
                    },
                    container: 'floatModules'
                });
            }else{
                _this.modifyModuleAdvanced({
                    attributetarget: {
                        "codeShow": _this.codeShow
                    },
                    container: 'floatModules'
                });
            }
             
        },
        removeQQ(index){
            this.qqList.splice(index,1)
        },
        setImgNone(){
            let _this=this;
            _this.modifyModuleAdvanced({
                attributetarget: {
                    "code":""
                },
                container: 'floatModules'
            });
            
        },
        save: function() {
            /*let bL = this.borderWidth + "px " + this.borderStyle + " " + this.borderColor;
            this.modifyModuleStyle({
                elTarget: ".line",
                attributetarget: {
                    'border-left': bL
                }
            });*/
        }


    },
    mounted: function() {
        //console.log(this.getModuleData.moduleSet.advancedSetting.qq)
    },
    data() {
        return {
            shows:['qqShow','telShow','telShow'],
            qqShow:true,
            telShow:true,
            codeShow:true,
            codePic:"",
            unit:"true",
            top:0,
            QQItem:{
                "title": "123456789"
            },
            telItem:{
                "title": "1234567890"
            },
            List:[
                {"qq":"21342432"},
                {"qq":"234324324"}
            ]
        }
    }
}
</script>
<style>
.set-panel {
    width: 300px;
    height: 300px;
    background-color: #fff;
    margin: 100px auto 0;
}
.plugin-set-width{
    width: 130px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
}
.set-content {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.23);
    z-index: 10001;
}
.plugin-set-part{
    margin-bottom: 10px;
}
.topinput{
    width: 150px;
    display: inline-block;
}
.plugin-set-title{
    color: #333333;
    font-size: 9px;
    font-size: 14px;
}

.plugin-set-con-l{
    font-size: 14px;
    float: left;
    width: 64px;
    height: 42px;
    line-height: 42px;
    margin-right: 25px;
}
.plugin-set-con-r{
    float: left;
}
.plugin-set-input{
    float: left;
    width: 200px;
}
.plugin-set-close{
    margin-left: 10px;
    margin-top: 12px;
    cursor: pointer;
}
.switch-set{
    margin-top: 10px;
}
.codePic{
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 10px;
}
.codePic img{
    width: 100px;
    height: 100px;
}
.plugin-set-buttons{
    margin-top: 15px;
}
.plugin-set-tips{
    line-height: 40px;
    padding-left: 10px;
}
</style>
