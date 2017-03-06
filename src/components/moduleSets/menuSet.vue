<template>
    <div id="menuset">
        <el-tabs>
            <el-tab-pane label="全局">
                <div class="menuset-body">
                    <el-tabs type="border-card">
                        <!-- <el-tab-pane label="基本">
                            <ul class="clearfix">
                                <li class="background-set-part">
                                    <span class="background-set-title">是否固定</span>
                                    <el-switch 
                                    v-model="fixed" 
                                    on-color="#13ce66" off-color="#ff4949" on-text="是" off-text="否" @change="updateFixed">
                                    </el-switch>
                                </li>
                            </ul>
                        </el-tab-pane> -->
                        <el-tab-pane label="背景">
                            <background-set :backgroundData="outData" :imgTarget="'$styles>container>background-image'" :isBack="true"></background-set>
                        </el-tab-pane>
                        <el-tab-pane label="副标题设置">
                            <ul class="clearfix">
                                        <li class="menuSet-set-part">
                                            <span class="menuSet-set-title">是否显示</span>
                                            <el-switch v-model="enameshow" on-color="#13ce66" off-color="#ff4949" on-text="是" off-text="否" @change="showEname"></el-switch>
                                        </li>
                            </ul>
                            <font-set :fontData="enameData" :elementTarget="'.ename1'"></font-set>
                        </el-tab-pane> 
                    </el-tabs>              
                </div>
            </el-tab-pane>
            <el-tab-pane label="中间项设置">
                <el-tabs type="border-card">
                    <el-tab-pane label="基本">
                        <ul class="clearfix">
                            <li class="menuSet-set-part kg-set">
                                <span class="menuSet-set-title">宽</span>
                                <!--<el-input-number v-model="mid.width" :min="0" @change="updateBaseData('mid')"></el-input-number>-->
                                <div class="el-input-number">
                                    <div class="el-input">
                                        <input type="text" v-model="mid.width" autocomplete="off"
                                               class="el-input__inner"
                                               @input="updata($event,'mid')"
                                               @blur="checkData('mid','width')"
                                        >
                                    </div>
                                    <span class="el-input-number__decrease el-icon-minus" @click="changeNum('mid','width',0)"></span>
                                    <span class="el-input-number__increase el-icon-plus" @click="changeNum('mid','width',1)"></span>
                                </div>
                                <span class="menuSet-set-title">高</span>
                                <!--<el-input-number v-model="mid.height" :min="0" @change="updateBaseData('mid')"></el-input-number>-->
                                <div class="el-input-number">
                                    <div class="el-input">
                                        <input type="text" v-model="mid.height" autocomplete="off"
                                               class="el-input__inner"
                                               @input="updata($event,'mid')"
                                               @blur="checkData('mid','height')"
                                        >
                                    </div>
                                    <span class="el-input-number__decrease el-icon-minus" @click="changeNum('mid','height',0)"></span>
                                    <span class="el-input-number__increase el-icon-plus" @click="changeNum('mid','height',1)"></span>
                                </div>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="背景">
                        <background-set :backgroundData="midBgData" :elementTarget="'.mid'"  :imgTarget="'$styles>.mid>background-image'" :isBack="true"></background-set>
                    </el-tab-pane>
                    <el-tab-pane label="外边距">
                        <mp-set :mpData="midMaData" :elementTarget="'.mid'" :type="false" :minNum="-100"></mp-set>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="一级">
                <div class="menuset-body">
                    <el-tabs type="border-card">
                        <el-tab-pane label="基本">
                            <ul class="clearfix">
                                <li class="menuSet-set-part kg-set">
                                    <span class="menuSet-set-title">宽</span>
                                    <!--<el-input-number v-model="nav1.width" :min="0" @change="updateBaseData('nav1')"></el-input-number>-->
                                    <div class="el-input-number">
                                        <div class="el-input">
                                            <input type="text" v-model="nav1.width" autocomplete="off"
                                                   class="el-input__inner"
                                                   @input="updata($event,'nav1')"
                                                   @blur="checkData('nav1','width')"
                                            >
                                        </div>
                                        <span class="el-input-number__decrease el-icon-minus" @click="changeNum('nav1','width',0)"></span>
                                        <span class="el-input-number__increase el-icon-plus" @click="changeNum('nav1','width',1)"></span>
                                    </div>
                                    <span class="menuSet-set-title">高</span>
                                    <!--<el-input-number v-model="nav1.height" :min="0" @change="updateBaseData('nav1')"></el-input-number>-->
                                    <div class="el-input-number">
                                        <div class="el-input">
                                            <input type="text" v-model="nav1.height" autocomplete="off"
                                                   class="el-input__inner"
                                                   @input="updata($event,'nav1')"
                                                   @blur="checkData('nav1','height')"
                                            >
                                        </div>
                                        <span class="el-input-number__decrease el-icon-minus" @click="changeNum('nav1','height',0)"></span>
                                        <span class="el-input-number__increase el-icon-plus" @click="changeNum('nav1','height',1)"></span>
                                    </div>
                                </li>
                            </ul>                          
                        </el-tab-pane>
                        <el-tab-pane label="内边距">
                            <mp-set :mpData="nav1PaData" :elementTarget="'.nav1'" :type="true"></mp-set>
                        </el-tab-pane>
                        <el-tab-pane label="外边距">
                            <mp-set :mpData="nav1MaData" :elementTarget="'.nav1'" :type="false" :minNum="-100"></mp-set>
                        </el-tab-pane>
                        <el-tab-pane label="字体">
                            <font-set :fontData="nav1fontData" :elementTarget="'.lia1'"></font-set>
                        </el-tab-pane>
                        <el-tab-pane label="背景">
                            <background-set :backgroundData="nav1BgData" :elementTarget="'.lia1'" :imgTarget="'$styles>.lia1>background-image'" :isBack="true"></background-set>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="二级">
                <div class="menuset-body">
                    <el-tabs type="border-card">
                        <el-tab-pane label="基本">
                            <ul class="clearfix">
                                <li class="menuSet-set-part kg-set">
                                    <span class="menuSet-set-title">宽</span>
                                    <!--<el-input-number v-model="lia2.width"  :min="0" @change="updateBaseData('lia2')"></el-input-number>-->
                                    <div class="el-input-number">
                                        <div class="el-input">
                                            <input type="text" v-model="lia2.width" autocomplete="off"
                                                   class="el-input__inner"
                                                   @input="updata($event,'lia2')"
                                                   @blur="checkData('lia2','width')"
                                            >
                                        </div>
                                        <span class="el-input-number__decrease el-icon-minus" @click="changeNum('lia2','width',0)"></span>
                                        <span class="el-input-number__increase el-icon-plus" @click="changeNum('lia2','width',1)"></span>
                                    </div>
                                    <span class="menuSet-set-title">高</span>
                                    <!--<el-input-number v-model="lia2.height"  :min="0" @change="updateBaseData('lia2')"></el-input-number>-->
                                    <div class="el-input-number">
                                        <div class="el-input">
                                            <input type="text" v-model="lia2.height" autocomplete="off"
                                                   class="el-input__inner"
                                                   @input="updata($event,'lia2')"
                                                   @blur="checkData('lia2','height')"
                                            >
                                        </div>
                                        <span class="el-input-number__decrease el-icon-minus" @click="changeNum('lia2','height',0)"></span>
                                        <span class="el-input-number__increase el-icon-plus" @click="changeNum('lia2','height',1)"></span>
                                    </div>
                                </li>
                            </ul>                         
                        </el-tab-pane>
                        <el-tab-pane label="边框">
                            <border-set :borderData="nav2BorderData" :elementTarget="'.lia2'" :onRadius="false"></border-set>
                        </el-tab-pane>
                        <el-tab-pane label="内边距">
                            <mp-set :mpData="nav2PaData" :elementTarget="'.lia2'" :type="true"></mp-set>
                        </el-tab-pane>
                        <el-tab-pane label="外边距">
                            <mp-set :mpData="nav2MaData" :elementTarget="'.lia2'" :type="false" :minNum="-100"></mp-set>
                        </el-tab-pane>
                        <el-tab-pane label="字体">
                            <font-set :fontData="nav2fontData" :elementTarget="'.lia2'"></font-set>
                        </el-tab-pane>
                        <el-tab-pane label="背景">
                            <background-set :backgroundData="nav2BgData" :elementTarget="'.lia2'" :imgTarget="'$styles>.lia2>background-image'" :isBack="true"></background-set>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
           <el-tab-pane label="一级悬停">
                <div class="menuset-body">
                    <el-tabs type="border-card">
                        <el-tab-pane label="背景">
                            <background-set :backgroundData="nav1HoverBgData"  :elementTarget="'.nav1:hover .lia1'" :imgTarget="'$styles>.nav1:hover .lia1>background-image'" :isBack="true"></background-set>
                        </el-tab-pane> 
                        <el-tab-pane label="字体">
                            <font-set :fontData="nav1HoverFontData" :elementTarget="'.nav1:hover .lia1'"></font-set> 
                        </el-tab-pane>
                        <el-tab-pane label="副标题设置">
                            <font-set :fontData="nav1HoverEnameData" :elementTarget="'.nav1:hover .ename1'"></font-set> 
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="选中状态">
                <div class="menuset-body">
                    <el-tabs type="border-card">
                        <el-tab-pane label="背景">
                            <background-set :backgroundData="nav1ActiveBgData"  :elementTarget="'.nav1active .lia1'" :imgTarget="'$styles>.nav1active .lia1>background-image'" :isBack="true"></background-set>
                        </el-tab-pane> 
                        <el-tab-pane label="字体">
                            <font-set :fontData="nav1ActiveFontData" :elementTarget="'.nav1active .lia1'"></font-set> 
                        </el-tab-pane>
                        <el-tab-pane label="副标题设置">
                            <font-set :fontData="nav1ActiveEnameData" :elementTarget="'.nav1active .ename1'"></font-set> 
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="二级悬停">
                <div class="menuset-body">
                    <el-tabs type="border-card">
                        <el-tab-pane label="背景">
                            <background-set :backgroundData="lia2HoverBgData"  :elementTarget="'.lia2:hover'" :imgTarget="'$styles>.lia2:hover>background-image'" :isBack="true"></background-set>
                        </el-tab-pane>
                        <el-tab-pane label="边框">
                            <border-set :borderData="nav2HoverBorderData" :elementTarget="'.lia2:hover'" :onRadius="false"></border-set>
                        </el-tab-pane>
                        <el-tab-pane label="字体">
                            <font-set :fontData="lia2HoverFontData" :elementTarget="'.lia2:hover'"></font-set> 
                        </el-tab-pane>
                    </el-tabs>
                </div>    
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import {
        rgbToHex
    } from '../../methods/helpers/utils';
    import {
        borderSet,
        mpSet,
        opacitySet,
        backgroundSet,
        fontSet
    } from './styleSpareParts';


    import {
        getBorderData,
        getMPData,
        getOpacityData,
        getBackgroundData,
        getFontData,
        getBaseData
    } from '../../methods/helpers/getcss.js'

    export default {
        components: {
            borderSet,
            mpSet,
            opacitySet,
            backgroundSet,
            fontSet
        },
        props: {
            ishide: Boolean
        },
        computed: {
            ...mapGetters([
                'getModuleData'
            ]),
            outData: function() {
                return getBackgroundData(this);
            },
            outPosition: function() {
                return getBaseData(this, '', ['position']);
            },
            midBgData: function() {
                return getBackgroundData(this, ".mid");
            },
            /**中间项宽高*/
            midBaseData: function() {
                return getBaseData(this, ".mid", ['width', 'height']);
            },
            enameData: function() {
                return getFontData(this, ".ename1");
            },
            midMaData:function(){
                return getMPData(this, ".mid", 'm');
            },
            /*一级栏目*/
            nav1BgData: function() {
                return getBackgroundData(this, ".lia1");
            },
            nav1PaData: function() {
                return getMPData(this, ".nav1", 'p');
            },
            nav1MaData: function() {
                return getMPData(this, ".nav1", 'm');
            },
            nav1fontData: function() {
                return getFontData(this, ".lia1");
            },
            nav1BaseData: function() {
                return getBaseData(this, ".nav1", ['width', 'height']);
            },

            /*二级栏目*/
            nav2BgData: function() {
                return getBackgroundData(this, ".lia2");
            },
            nav2PaData: function() {
                return getMPData(this, ".lia2", 'p');
            },
            nav2MaData: function() {
                return getMPData(this, ".lia2", 'm');
            },
            nav2fontData: function() {
                return getFontData(this, ".lia2");
            },
            nav2BorderData: function() {
                return getBorderData(this, ".lia2");
            },
            nav2BaseData: function() {
                return getBaseData(this, ".lia2", ['width', 'height']);
            },
            /*一级悬停*/
            nav1HoverBgData: function() {
                return getBackgroundData(this, ".nav1:hover .lia1");
            },
            nav1HoverFontData: function() {
                return getFontData(this, ".nav1:hover .lia1");
            },
            nav1HoverEnameData: function() {
                return getFontData(this, ".nav1:hover .ename1");
            },
            nav1ActiveBgData: function() {
                return getBackgroundData(this, ".nav1active .lia1");
            },
            nav1ActiveFontData: function() {
                return getFontData(this, ".nav1active .lia1");
            },
            nav1ActiveEnameData: function() {
                return getFontData(this, ".nav1active .ename1");
            },

            /*二级悬停*/
            lia2HoverBgData: function() {
                return getBackgroundData(this, ".lia2:hover");
            },
            lia2HoverFontData: function() {
                return getFontData(this, ".lia2:hover");
            },
            nav2HoverBorderData:function(){
                return getBorderData(this, ".lia2:hover");
            }


        },
        methods: {
            ...mapActions([
                'closeModuleSet',
                'modifyModuleStyle',
                'modifyModuleAdvanced'
            ]),
            changeNum(el,prop,flag){    //改变数字  flag：1为加 0为减
                if(flag==1){
                    this[el][prop]++; 
                    //$(event.target).prev(".el-icon-minus").removeClass("is-disabled")
               }else{
                    if(this[el][prop]==0){
                        //$(event.target).addClass("is-disabled")
                        return;
                    }
                    this[el][prop]--; 
               }
                this.updateBaseData(el)

            },
            /*minusNum(el){
                this[el].width--;
                this.updateBaseData("mid")

            },*/
            updata(e,el){
                let val= $(e.target).val();
                if(!isNaN(val)){
                    this.updateBaseData(el)
                }
                
            },
            checkData(el,prop){
                if(isNaN(this[el][prop])){
                    this[el][prop]=0;
                    this.updateBaseData(el)
                }
            },
            showEname: function() {
                var _this = this;
                this.modifyModuleAdvanced({
                    attributetarget: {
                        'enameshow': _this.enameshow
                    }
                });
                
            },
            //是否固定导航
            updateFixed: function() {
                var _this = this;
                //this.getModuleData.$styles.container.position = (_this.fixed ? 'fixed' : 'absolute');
                this.modifyModuleStyle({
                    elTarget: "container",
                    attributetarget: {
                        'position': _this.fixed ? 'fixed' : 'absolute',
                    }
                });
            },
            //更新宽高
            updateBaseData: function(el) {
                var _this = this;
                /*中间项*/
                this.modifyModuleStyle({
                    elTarget: "." + el,
                    attributetarget: {
                        'width': _this[el].width + 'px',
                        'height': _this[el].height + 'px'
                    }
                });
                
            }
        },
        created: function() {
            this.fixed = this.outPosition.position == 'fixed';
            this.mid.width = this.midBaseData.width;
            this.mid.height = this.midBaseData.height;
            /*副标题*/
            this.enameshow = this.getModuleData.moduleSet.advancedSetting.enameshow;

            /*一级标题*/
            this.nav1.width = this.nav1BaseData.width;
            this.nav1.height = this.nav1BaseData.height;
            /*二级标题*/
            this.lia2.width = this.nav2BaseData.width;
            this.lia2.height = this.nav2BaseData.height;

        },
        mounted: function() {

        },
        data() {
            return {
                fixed: false,
                enameshow: false,
                container: {
                    "width": 0,
                    "height": 0,
                    "left": "",
                    "top": "",
                    "position": "absolute"
                },
                nav1: {
                    "margin": "0px 0px 0px 0px",
                    "padding": "0px 0px 0px 0px",
                    "float": "left",
                    "width": 0,
                    "height": 0,
                    "display": "block",
                    "position": "relative",
                    "font-style": "normal",
                    "text-decoration": "none"
                },
                lia1: {
                    "width": "",
                    "height": "",
                    "display": "block",
                    "background-color": "",
                    "background-image": "",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    "font-size": "",
                    "font-family": "微软雅黑",
                    "font-weight": "700",
                    "text-align": "center",
                    "color": "#fff",
                    "line-height": ""
                },
                mid: {
                    "width": 0,
                    "height": 0,
                    "display": "block",
                    "background-color": "",
                    "background-image": "",
                    "background-position": "center center",
                    "background-repeat": "no-repeat"
                },
                nav1hover_lia1: {
                    "backgroundColor": "#105c7c",
                    "backgroundImage": "",
                    "backgroundPosition": "center center",
                    "backgroundRepeat": "no-repeat",
                    "fontSize": "16px",
                    "fontFamily": "微软雅黑",
                    "fontWeight": "bold",
                    "textAlign": "center",
                    "fontColor": "#ffffff",
                    "lineHeight": "66px"
                },
                li1active_lia1: {
                    "background-color": "#105c7c",
                    "background-image": "",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    "font-size": "16px",
                    "font-family": "微软雅黑",
                    "font-weight": "700",
                    "font-style": "normal",
                    "text-align": "center",
                    "color": "#fff",
                    "text-decoration": "none",
                    "line-height": "66px",
                    "border-top": "0px dashed #000",
                    "border-left": "0px solid #323455",
                    "border-right": "0px solid #000",
                    "border-bottom": "0px solid #956546"
                },
                ename1Data: {
                    "fontSize": 0,
                    "fontColor": "#000",
                    "lineHeight": 20,
                    "fontFamily": "微软雅黑",
                    "fontWeight": "normal"
                },
                li1hover_ename1: {
                    "color": "#000"
                },
                "ul2": {
                    "border-top": "0px solid #ccc",
                    "border-bottom": "0px solid #ccc",
                    "border-left": "0px solid #ccc",
                    "border-right": "0px solid #ccc",
                    "background-color": "#0e84b5",
                    "background-image": "",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    "position": "absolute",
                    "min-width": "100%"
                },
                lia2: {
                    "background-color": "#0e84b5",
                    "background-image": "",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    "border-top": "0px solid #034a9b",
                    "border-bottom": "1px solid #034a9b",
                    "border-left": "0px solid #034a9b",
                    "border-right": "0px solid #ccc",
                    "margin": "0px 0px 0px 0px",
                    "padding": "0px 0px 0px 0px",
                    "font-size": "16px",
                    "font-family": "微软雅黑",
                    "font-weight": "700",
                    "font-style": "normal",
                    "text-align": "center",
                    "color": "#fff",
                    "text-decoration": "none",
                    "line-height": "40px",
                    "float": "auto",
                    "width": 0,
                    "min-width": "100%",
                    "height": 0,
                    "display": "block",
                    "position": "relative",
                    "white-space": "nowrap"
                },
                "lia2hover": {
                    "backgroundColor": "#105c7c",
                    "backgroundImage": "",
                    "backgroundPosition": "center center",
                    "backgroundRepeat": "no-repeat",
                    "fontSize": "16px",
                    "fontFamily": "微软雅黑",
                    "fontWeight": "bold",
                    "fontStyle": "normal",
                    "textAlign": "center",
                    "fontColor": "#fff",
                    "lineHeight": "40px"
                }
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
    
    #menuset .el-tabs {
        width: 100%;
    }
    
    .evo-cp-wrap {
        position: relative;
    }
    
    #menuset .menuset-body {
       /* max-height: 400px;
        overflow: auto;*/
    }
    
    .set-content {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.23);
        z-index: 10001;
    }
    
    .el-tabs__content {
        overflow: inherit!important;
    }
    
    .menuSet-title {
        color: #787878;
        line-height: 30px;
        font-size: 15px;
    }
    
    .menuset-body {
        width: 100%;
    }
    
    .menuSet-set-title {
        display: block;
        float: left;
        width: 64px;
        height: 42px;
        line-height: 42px;
        margin-right: 25px;
        font-size: 14px;
        color: #787878;
    }
    
    .menuSet-set-part .el-switch {
        margin-top: 10px;
    }
    
    .kg-set .el-input-number {
        float: left;
        margin-right: 20px;
    }
    
    .kg-set .menuSet-set-title {
        width: 23px;
        margin-right: 3px;
        font-size: 14px;
        color: #787878;
    }
    /*fix coolor picker hide bug*/
</style>