<template>
    <el-tabs type="border-card">
        <el-tab-pane label="背景颜色">
            <background-set :backgroundData="backgroundData" :elementTarget="'.fenlei_title'" :imgTarget="'$styles>.fenlei_title>background-image'" :isBack="true"></background-set>
        </el-tab-pane>
        <el-tab-pane label="边框">
            <border-set :borderData="borderData" :elementTarget="'.product_left_fenlei'"></border-set>
        </el-tab-pane>
        <el-tab-pane label="下拉效果">
            <span>下拉样式</span>
            <el-radio-group v-model="radio2" @change="changeRadio">
                <el-radio :label="'clickOpen'">点击展开</el-radio>
                <el-radio :label="'hoverOpen'">悬停展开</el-radio>
                <el-radio :label="'allOpen'">全部展开</el-radio>
            </el-radio-group>
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
        fontData: function() {
            return getFontData(this);
        }
    },
    created: function() {

    },
    methods: {
        ...mapActions([
            'modifyModuleAdvanced'
        ]),
        changeRadio:function(){
            var _this = this;
            this.modifyModuleAdvanced({
                attributetarget:{
                    'dropStyle': _this.radio2
                }
            });
        }
    },
    data() {
        return {
            height: "auto",
            backgroundColor: "#105c7c",
            options: ["#000", "#ffff00"],
            hasBar: true,
            radio2:this.module.moduleSet.advancedSetting.dropStyle
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
