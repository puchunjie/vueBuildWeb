<template>
    <el-tabs>
        <el-tab-pane label="整体样式" name="">
            <el-tabs type="border-card">
                <el-tab-pane label="边框">
                    <div class="data-edit-part clearfix">
                        <border-set :borderData="borderData"></border-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="内边距">
                    <div class="data-edit-part clearfix">
                        <mp-set :mpData="paddingData" :elementTarget="'container'" :type="true"></mp-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="背景">
                    <div class="data-edit-part clearfix">
                        <background-set :backgroundData="backgroundData" :imgTarget="'$styles>container>background-image'" :isBack="true">
                        </background-set>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="商品样式" name="">
            <el-tabs type="border-card">
                <el-tab-pane label="边框">
                    <div class="data-edit-part clearfix">
                        <border-set :borderData="itemBorder" :elementTarget="'.itemBox'" :onTogether="true"></border-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商品间距">
                    <div class="data-edit-part clearfix">
                        <mp-set :mpData="itemPadding" :elementTarget="'.item'" :type="true" :nobottomMp="true"></mp-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="图片间距">
                    <div class="data-edit-part clearfix">
                        <mp-set :mpData="imgPadding" :elementTarget="'.itemBox'" :type="true"></mp-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商品背景">
                    <div class="data-edit-part clearfix">
                        <background-set :backgroundData="probackgroundData" :elementTarget="'.itemBox'" :imgTarget="'$styles>.itemBox>background-image'" :isBack="true">
                        </background-set>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="商品标题" name="">
            <el-tabs type="border-card">
                <el-tab-pane label="字体">
                    <div class="data-edit-part clearfix" v-if="getModuleData.moduleSet.advancedSetting.cover != 'titleCover'">
                        <span class="data-edit-title">标题显示</span>
                        <el-switch v-model="getModuleData.moduleSet.advancedSetting.titleShow"
                            on-color="#13ce66" off-color="#ff4949" on-text="显示" off-text="隐藏"  @change="onChange">
                        </el-switch>
                    </div>
                    <div class="data-edit-part clearfix">
                        <font-set :fontData="titleFont" :elementTarget="'.title'"></font-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="边框">
                    <div class="data-edit-part clearfix">
                        <border-set :borderData="titleBorder" :elementTarget="'.title'" :onRadius="false"></border-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="内边距">
                    <div class="data-edit-part clearfix">
                        <mp-set :mpData="titlePadding" :elementTarget="'.title'" :type="true"></mp-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="外边距" v-if="getModuleData.moduleSet.advancedSetting.cover != 'titleCover'">
                    <div class="data-edit-part clearfix">
                        <mp-set :mpData="titleMargin" :elementTarget="'.title'" :type="false"></mp-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="背景">
                    <div class="data-edit-part clearfix">
                        <background-set :backgroundData="titleBack" :elementTarget="'.title'" :imgTarget="'$styles>.title>background-image'" :isBack="true">
                        </background-set>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <!--
        <el-tab-pane label="商品价格" name="">
            <el-tabs type="border-card">
                <el-tab-pane label="字体">
                    <div class="data-edit-part clearfix">
                        <span class="data-edit-title">价格显示</span>
                        <el-switch v-model="getModuleData.moduleSet.advancedSetting.priceShow" on-color="#13ce66" off-color="#ff4949" on-text="显示" off-text="隐藏"  @change="onChange">
                        </el-switch>
                    </div>
                    <div class="data-edit-part clearfix">
                        <font-set :fontData="priceFont" :elementTarget="'.price'"></font-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="边框">
                    <div class="data-edit-part clearfix">
                        <border-set :borderData="priceBorder" :elementTarget="'.price'" :onRadius="false"></border-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="内边距">
                    <div class="data-edit-part clearfix">
                        <mp-set :mpData="pricePadding" :elementTarget="'.price'" :type="true"></mp-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="外边距">
                    <div class="data-edit-part clearfix">
                        <mp-set :mpData="priceMargin" :elementTarget="'.price'" :type="false"></mp-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="背景">
                    <div class="data-edit-part clearfix">
                        <background-set :backgroundData="priceBack" :elementTarget="'.price'" :imgTarget="'$styles>.price>background-image'" :isBack="true">
                        </background-set>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>-->
        <el-tab-pane label="鼠标移入" name="" v-if="cover == 'standard'">
            <el-tabs type="border-card">
                <el-tab-pane label="商品边框">
                    <div class="data-edit-part clearfix">
                        <border-set :borderData="standardBorder" :elementTarget="'.standard .itemBox:hover'" :onTogether="true" ></border-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="图片间距">
                    <div class="data-edit-part clearfix">
                        <mp-set :mpData="standardPadding" :elementTarget="'.standard .itemBox:hover'" :type="true"></mp-set>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="鼠标移入" name="" v-if="cover == 'covers'">
            <el-tabs type="border-card">
                <el-tab-pane label="背景">
                    <div class="data-edit-part clearfix">
                        <background-set :backgroundData="coverBack" :elementTarget="'.cover'" :imgTarget="'$styles>.cover>background-image'" :isBack="true"></background-set>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="透明度">
                    <div class="data-edit-part clearfix">
                        <opacity-set :opacityData="coverOpacity" :elementTarget="'.cover'"></opacity-set>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="">
            <div class="data-edit-part clearfix">
                <span class="data-edit-title">每行显示</span>
                <el-select v-model="getModuleData.moduleSet.advancedSetting.column" placeholder="请选择">
                    <el-option
                            v-for="el in getModuleData.moduleSet.advancedSetting.columns"
                            :label="el"
                            :value="el">
                    </el-option>
                </el-select>
                <span class="data-edit-title">个</span>
            </div>
            <div class="data-edit-part clearfix">
                <span class="data-edit-title">跳转方式</span>
                <el-select v-model="getModuleData.moduleSet.advancedSetting.target" placeholder="请选择" @change="onChange">
                    <el-option
                            v-for="el in getModuleData.moduleSet.advancedSetting.targets"
                            :label="el.label"
                            :value="el.value">
                    </el-option>
                </el-select>
            </div>
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
        fontSet,
        backgroundSet,
        mpSet,
        opacitySet
    } from './styleSpareParts';


    import {
        getBorderData,
        getBackgroundData,
        getFontData,
        getMPData,
        getOpacityData
    } from '../../methods/helpers/getcss.js'

    export default {
        components: {
            borderSet,
            backgroundSet,
            fontSet,
            mpSet,
            opacitySet
        },
        props: {
            ishide: Boolean
        },
        computed: {
            ...mapGetters([
                'getModuleData'
            ]),
            borderData() {
                return getBorderData(this);
            },
            itemBorder(){
                return getBorderData(this,'.itemBox');
            },
            standardBorder(){
                return getBorderData(this,'.standard .itemBox:hover');
            },
            titleBorder(){
                return getBorderData(this,'.title');
            },
            priceBorder(){
                return getBorderData(this,'.price');
            },
            paddingData: function() {
                return getMPData(this,'','p');
            },
            itemPadding(){
                return getMPData(this,'.item','p');
            },
            titlePadding(){
                return getMPData(this,'.title','p');
            },
            titleMargin(){
                return getMPData(this,'.title','m');
            },
            pricePadding(){
                return getMPData(this,'.price','p');
            },
            priceMargin(){
                return getMPData(this,'.price','m');
            },
            imgPadding(){
                return getMPData(this,'.itemBox','p');
            },
            standardPadding(){
                return getMPData(this,'.standard .itemBox:hover','p');
            },
            titleFont(){
                return getFontData(this,'.title')
            },
            priceFont(){
                return getFontData(this,'.price')
            },
            backgroundData(){
                return getBackgroundData(this)
            },
            probackgroundData(){
                return getBackgroundData(this,'.itemBox')
            },
            titleBack(){
                return getBackgroundData(this,'.title')
            },
            priceBack(){
                return getBackgroundData(this,'.price')
            },
            coverBack(){
                return getBackgroundData(this,'.cover')
            },
            coverOpacity(){
                return getOpacityData(this,'.cover')
            },
            cover(){
                return this.getModuleData.moduleSet.advancedSetting.cover
            }
        },
        methods: {
            ...mapActions([
                'closeModuleSet',
                'modifyModuleAdvanced'
            ]),
            onChange(){
                this.modifyModuleAdvanced(this.getModuleData.moduleSet.advancedSetting)
            }
        }
    }
</script>

<style>
    .data-edit-part {
        padding:10px;
    }
    .data-edit-part>* {
        float: left;
        display: block;
        margin-right: 25px;
        /*line-height:36px;*/
    }
    .data-edit-title{
        color: #787878;
        font-size: 14px;
    }
    .data-edit-part .el-switch{
        margin-top: 8px;
    }
</style>