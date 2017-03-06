<template>
    <el-tabs type="border-card">
        <el-tab-pane label="背景颜色">
            <background-set :min="0" :max="150" v-if="module.type='product'" :backgroundData="backgroundData" :elementTarget="'.fenlei_title'" :imgTarget="'$styles>.fenlei_title>background-image'" :isBack="true"></background-set>
            <background-set :min="0" :max="150" v-if="module.type!='product'" :backgroundData="backgroundCaseData" :elementTarget="'.product_left_case ul li" +
    " a:hover'" :imgTarget="'$styles>.product_left_case ul li a:hover>background-image'" :isBack="true"></background-set>
        </el-tab-pane>
        <el-tab-pane label="边框" v-if="module.type='product'">
            <border-set :borderData="borderData" :elementTarget="'.product_left_fenlei'"></border-set>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex';

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
        ishide: Boolean,
        module:Object
    },
    computed: {
        ...mapGetters([
            'getModuleData'
        ]),
        borderData: function() {
            return getBorderData(this, '.product_left_fenlei');
        },
        paddingData: function() {
            return getMPData(this, '.txt', 'p');
        },
        opacityData: function() {
            return getOpacityData(this)
        },
        backgroundData: function() {
            return getBackgroundData(this, '.fenlei_title');
        },
        backgroundCaseData: function() {
            return getBackgroundData(this, '.product_left_case ul li a:hover');
        },
        fontData: function() {
            return getFontData(this);
        }
    },
    created: function() {
        this.hasBar = this.getModuleData.moduleSet.advancedSetting.hasBar;
        this.height = $("#" + this.getModuleData.moduleId + " .ckText").css("height");
        if (this.hasBar) {
            let scrollBarBg = getScrollData(this," .mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar");
            this.backgroundColor = scrollBarBg.backgroundColor;
        }
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
                let bgColor = _this.backgroundColor;
                _this.height = "100%";
                this.modifyModuleStyle({
                    elTarget: ".ckText",
                    attributetarget: {
                        'height': _this.height
                    }
                });
                $("#"+this.getModuleData.moduleId).find(".ckText").mCustomScrollbar({
                    scrollButtons: {
                        enable: false,
                        scrollType: "continuous",
                        scrollSpeed: 20,
                        scrollAmount: 40
                    }
                });
            } else {
                _this.height = "auto";
                this.modifyModuleStyle({
                    elTarget: ".ckText",
                    attributetarget: {
                        'height': _this.height
                    }
                });
                $("#" + this.getModuleData.moduleId).find(".ckText").mCustomScrollbar('destroy')
            }
        },
        setBarColor: function() {
            var _this=this;
            //if (this.hasBar) {
                let bgColor = _this.backgroundColor;
                this.modifyModuleStyle({
                    elTarget: ".mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar",
                    attributetarget: {
                        'background-color': bgColor
                    }
                });
            //}
        }


    },
    mounted: function() {

    },
    data() {
        return {
            height: "auto",
            backgroundColor: "#105c7c",
            options: ["#000", "#ffff00"],
            hasBar: true
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
</style>
