<template>
    <el-tabs type="border-card">
        <el-tab-pane label="边框">
            <border-set :borderData="borderData" :elementTarget="'.wordContent'"></border-set>
        </el-tab-pane>
        <el-tab-pane label="常用">
            <div>
                <span class="font-set-title">行高</span>
                <el-slider class="lineHeight-slider" v-model="lineHeight" :min="0" :max="100" @change="saveLHeight" show-input></el-slider>
            </div>    
            <mp-set :mpData="paddingData" :elementTarget="'.txt'" :type="true"></mp-set>
            <opacity-set :opacityData="opacityData"></opacity-set>
        </el-tab-pane>
        <el-tab-pane label="背景">
            <background-set :backgroundData="backgroundData" :elementTarget="'.wordContent'" :imgTarget="'$styles>.wordContent>background-image'" :isBack="true"></background-set>
        </el-tab-pane>
        <el-tab-pane label="滚动条">
            <ul class="clearfix">
                <li class="scroll-set-part ">
                    <span class="scroll-set-title">是否开启</span>
                    <el-switch v-model="hasBar" on-color="#13ce66" off-color="#ff4949" on-text="是" off-text="否" @change="setShowBar"></el-switch>
                </li>
                <li class="scroll-set-part ">
                    <span class="scroll-set-title">颜色选择</span>
                    <input type="text" class="color-pick" v-model="backgroundColor" target="backgroundColor">
                    <div class="scrollPane">
                        <div class="bar" v-show="hasBar" :style="{'background-color':backgroundColor}"></div>
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
} from 'vuex';
import {
        colorpickerInit
    } from "commonMethods/colorpickerInit";
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
    getScrollData
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
        borderData: function() {
            return getBorderData(this, '.wordContent');
        },
        paddingData: function() {
            return getMPData(this, '.txt', 'p');
        },
        opacityData: function() {
            return getOpacityData(this)
        },
        backgroundData: function() {
            return getBackgroundData(this, '.wordContent');
        },
        fontData: function() {
            return getFontData(this);
        },
        scrollBarData: function() {
            return getScrollData(this,'.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar');
        }
    },
    created: function() {
        this.hasBar = this.getModuleData.moduleSet.advancedSetting.hasBar;
        this.backgroundColor = this.scrollBarData.backgroundColor;
        this.lineHeight = parseInt(this.getModuleData.$styles[".txt"]["line-height"]);
    },
    methods: {
        ...mapActions([
            'closeModuleSet',
            'modifyModuleStyle',
            'modifyModuleAdvanced'
        ]),
        setShowBar: function() {
            var _this = this;
            this.modifyModuleAdvanced({
                attributetarget:{
                    'hasBar': _this.hasBar
                }
            });
            if (this.hasBar) {
                $("#"+this.getModuleData.moduleId).find(".wordContent").mCustomScrollbar({
                    scrollButtons: {
                        enable: false,
                        scrollType: "continuous",
                        scrollSpeed: 20,
                        scrollAmount: 40
                    }
                });
            } else {
                $("#" + this.getModuleData.moduleId).find(".wordContent").mCustomScrollbar('destroy')
            }
        },
        saveLHeight:function(){
            this.modifyModuleStyle({
                    elTarget: ".txt",
                    attributetarget: {
                        'line-height': this.lineHeight+'px'
                    }
            });
        },
        save: function() {
            var _this=this;
            if (this.hasBar) {
                let bgColor = _this.backgroundColor;
                this.modifyModuleStyle({
                    elTarget: ".mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar",
                    attributetarget: {
                        'background-color': bgColor
                    }
                });
            }
        }


    },
    mounted: function() {
        colorpickerInit(this);
    },
    data() {
        return {
            backgroundColor: "#105c7c",
            //options: ["#000", "#ffff00"],
            hasBar: true,
            lineHeight:""
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
.font-set-title{
    float: left;
    width: 42px;
    height: 42px;
    line-height: 42px;
    margin-right: 25px;
    color: #787878;
    font-size: 14px;
}
.lineHeight-slider{
    width: 550px;
    float: left;
}
/*fix coolor picker hide bug*/


/*滚动条面板设置*/

.scroll-set-part {
    float: left;
    margin-bottom: 10px;
    font-size: 14px;
    color: #787878;
    min-width: 600px;
}

.scroll-set-part>* {
    float: left;
    display: block;
    margin-right: 25px;
}

.scroll-set-part .scroll-set-title {
    display: block;
    float: left;
    width: 64px;
    height: 42px;
    line-height: 42px;
    margin-right: 25px;
}

.scroll-set-part .el-switch {
    margin-top: 12px;
}

.scroll-set-part .scrollPane {
    width: 200px;
    height: 100px;
    float: left;
    margin-left: 20px;
    position: relative;
    background: #eee;
}

.scroll-set-part .scrollPane .bar {
    width: 4px;
    height: 90px;
    position: absolute;
    top: 5px;
    right: 2px;
    border-radius: 10px;
}
.scroll-set-part .evo-colorind,.scroll-set-part .evo-colorind-ie,.scroll-set-part .evo-colorind-ff {
        width: 36px;
        height: 36px;
    }
</style>
