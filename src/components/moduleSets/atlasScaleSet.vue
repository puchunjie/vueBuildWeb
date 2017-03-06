<template>
    <el-tabs>
        <el-tab-pane label="标题">
            <el-tabs type="border-card">
                <el-tab-pane label="字体设置">
                    <ul class = "clearfix">
                        <li class="atlas-set-part">
                            <span class="atlas-set-title">标题显示</span>
                            <el-switch v-model="titleShow" on-color="#13ce66" off-color="#ff4949" on-text="显示" off-text="隐藏"  @change="onChange">
                            </el-switch>
                        </li>
                        <li class="atlas-set-part">
                            <font-set :fontData="fontData" :elementTarget="'.title'"></font-set>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="标题背景">
                    <ul class = "clearfix">
                        <li class="atlas-set-part">
                            <background-set
                                :backgroundData="backgroundData"
                                :elementTarget="'.title'"
                                :imgTarget="'$styles>.title>background-image'"
                                :isBack="true">
                            </background-set>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="按钮">
            <ul class = "clearfix">
                <li class="atlas-set-part">
                    <span class="atlas-set-title">按钮样式</span>
                    <el-radio class="radio" v-model="btnStyle" :label="'styleOne'">样式一</el-radio>
                    <el-radio class="radio" v-model="btnStyle" :label="'styleTwo'">样式二</el-radio>
                    <el-radio class="radio" v-model="btnStyle" :label="'styleThree'">样式三</el-radio>
                </li>
            </ul>
        </el-tab-pane>
        <el-tab-pane label="缩略图">
            <el-tabs type="border-card">
                <el-tab-pane label="基本">
                    <li class="atlas-set-part">
                        <span class="atlas-set-title">宽&nbsp;&nbsp;&nbsp;&nbsp;度</span>
                        <el-slider v-model="width" show-input :max="300" :mix="0" @change="save('.item')"></el-slider>
                    </li>
                    <li class="atlas-set-part">
                        <span class="atlas-set-title">高&nbsp;&nbsp;&nbsp;&nbsp;度</span>
                        <el-slider v-model="height" show-input :max="300" :mix="0" @change="save('.item')"></el-slider>
                    </li>
                    <li class="atlas-set-part">
                        <mp-set :mpData="paddingData" :elementTarget="'.item'" :onTogether="true" :type="true"></mp-set>
                    </li>
                    <li class="atlas-set-part">
                        <border-set :borderData="borderData" :elementTarget="'.item'" :onTogether="true"></border-set>
                    </li>
                </el-tab-pane>
                <el-tab-pane label="当前图片">
                    <li class="atlas-set-part">
                        <border-set :borderData="borderOnData" :elementTarget="'.on'" :onTogether="true"></border-set>
                    </li>
                </el-tab-pane>
            </el-tabs>
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
        getFontData
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
                return getBorderData(this, '.item');
            },
            borderOnData: function() {
                return getBorderData(this, '.on');
            },
            paddingData: function() {
                return getMPData(this, '.item','p');
            },
            backgroundData(){
                return getBackgroundData(this,'.title')
            },
            fontData: function() {
                return getFontData(this,'.title');
            }
        },
        
        created(){
            this.width          = parseInt(this.getModuleData['$styles']['.item'].width)
            this.height         = parseInt(this.getModuleData['$styles']['.item'].height)
            this.titleShow      = this.getModuleData.moduleSet.advancedSetting.titleShow,
            this.btnStyle       = this.getModuleData.moduleSet.advancedSetting.btnStyle
        },
        watch:{
            btnStyle(){
                this.onChange()
            }
        },
        methods: {
            ...mapActions([
                'closeModuleSet',
                'modifyModuleStyle',
                'modifyModuleData'
            ]),
            save: function(elementTarget) {
                //修改数据后更新视图，更新state状态（actions）
                let width = this.width+'px'
                let height = this.height + 'px'
                this.modifyModuleStyle({
                    elTarget:elementTarget,
                    attributetarget: {
                        'width': width,
                        'height':height
                    }
                })
            },
            onChange:function(data){
                this.getModuleData.moduleSet.advancedSetting.btnStyle = this.btnStyle
                this.getModuleData.moduleSet.advancedSetting.titleShow = this.titleShow
                var payload = JSON.parse(JSON.stringify(this.getModuleData))
                this.modifyModuleData(payload)
            }
        },
        mounted: function() {
            
        },
        data() {
            return {
                item:0,
                width:0,
                height:0,
                titleShow:true,
                btnStyle:"styleOne",
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
    .atlas-set-part {
        margin-bottom: 10px;
        font-size: 14px;
        color: #787878;
        display:block
    }
    .atlas-set-part:after{
        content:".";
        display:block;
        height:0;
        clear:both;
        visibility:hidden
    }
    .atlas-set-part>* {
        float: left;
        display: block;
        margin-right: 25px;
    }
    .atlas-set-part>.atlas-set-title{
        line-height:36px
    }
    .atlas-set-part>.el-switch el-switch--wide{
        margin-top:6px;
    }
    .atlas-set-part>ul {
        margin-right: 0;
    }
    .atlas-set-part .border-img {
        width: 36px;
        height: 36px;
        background-size: contain;
    }
    
    .color-pick {
        display: none
    }
    
    .evo-cp-wrap>.evo-colorind {
        width: 36px;
        height: 36px;
    }
    
    .color-pick {
        width: 10px;
        height: 10px;
    }
    
    /* .atlas-set-part .border-width,.atlas-set-part .el-slider {
        width: 270px;
    } */
    .atlas-set-part .el-select {
        width:100px;
    }
    /*fix coolor picker hide bug*/
</style>