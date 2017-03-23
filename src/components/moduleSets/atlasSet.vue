<template>
    <el-tabs>
        <el-tab-pane label="效果">
            <el-tabs type="border-card">
                <el-tab-pane label="动画设置">
                    <ul class = "clearfix">
                        <li class="atlas-set-part clearfix">
                            <span class="atlas-set-title">播放模式</span>
                            <el-switch v-model="ads.autoPlay" on-color="#13ce66" off-color="#ff4949" on-text="自动" off-text="手动"  @change="onChange">
                            </el-switch>
                        </li>
                        <li class="atlas-set-part clearfix" v-show="ads.autoPlay">
                            <span class="atlas-set-title">展示时间</span>
                            <el-input-number v-model="ads.interTime" :min="1000" :max="5000" :step="100" @change="onChange"></el-input-number>
                        </li>
                        <li class="atlas-set-part clearfix">
                            <span class="atlas-set-title">切换速度</span>
                            <el-input-number v-model="ads.delayTime" :min="10" :max="1000" :step="50" @change="onChange"></el-input-number>
                        </li>
                        <li class="atlas-set-part clearfix" v-if="!isMarquee">
                            <span class="atlas-set-title">滚动个数</span>
                            <el-select v-model="ads.scroll" placeholder="请选择" @change="onChange">
                                <el-option v-for="item in scrollNum" :label="item" :value="item"></el-option>
                            </el-select>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="元件设置">
                    <ul class = "clearfix">
                        <li class="atlas-set-part clearfix">
                            <span class="atlas-set-title">箭头显示</span>
                            <el-switch v-model="ads.btnShow" on-color="#13ce66" off-color="#ff4949" on-text="显示" off-text="隐藏"  @change="onChange">
                            </el-switch>
                        </li>
                        
                        <li class="atlas-set-part clearfix" v-if="ads.btnShow">
                            <span class="atlas-set-title">箭头位置</span>
                            <el-radio-group v-model="ads.btnPos" @change="onChange">
                                <el-radio :label="'in'">里面</el-radio>
                                <el-radio :label="'out'">外面</el-radio>
                            </el-radio-group>
                        </li>
                        <li class="atlas-set-part clearfix" v-if="ads.btnShow">
                            <span class="atlas-set-title">箭头样式</span>
                            <el-radio class="radio" v-model="ads.btnStyle" :label="'styleOne'">样式一</el-radio>
                            <el-radio class="radio" v-model="ads.btnStyle" :label="'styleTwo'">样式二</el-radio>
                            <el-radio class="radio" v-model="ads.btnStyle" :label="'styleThree'">样式三</el-radio>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
            
        </el-tab-pane>
        <el-tab-pane label="悬浮遮罩">
            <el-tabs type="border-card">
                <el-tab-pane label="遮罩显示">
                    <ul class = "clearfix">
                        <li class="atlas-set-part clearfix">
                            <span class="atlas-set-title">遮罩显示</span>
                            <el-radio-group v-model="ads.cover" @change="onChange" class="atlas-set-radio">
                                <el-radio :label="'all'">全部</el-radio>
                                <el-radio :label="'local'">局部</el-radio>
                                <el-radio :label="'routine'">隐藏</el-radio>
                            </el-radio-group>
                        </li>
                        <li class="atlas-set-part clearfix">
                            <background-set
                                :backgroundData="coverBack"
                                :elementTarget="'.coverBack'"
                                :imgTarget="'$styles>.coverBack>background-image'"
                                :isBack="true">
                            </background-set>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="边框突出">
                    <li class="atlas-set-part clearfix">
                        <border-set :borderData="borderHoverData" :elementTarget="'.atlas-slide-box:hover'" :onTogether="true"></border-set>
                    </li>
                </el-tab-pane>
                <el-tab-pane label="标题样式">
                    <li class="atlas-set-part clearfix">
                        <font-set :fontData="fontHoverData" :elementTarget="'.atlas-slide-item:hover .atlas-slide-title'"></font-set>
                    </li>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <!-- <el-tab-pane label="标题">
            <el-tabs type="border-card">
                <el-tab-pane label="字体">
                    <ul class = "clearfix">
                        <li class="atlas-set-part clearfix">
                            <span class="atlas-set-title">标题显示</span>
                            <el-switch v-model="ads.titleShow" on-color="#13ce66" off-color="#ff4949" on-text="显示" off-text="隐藏"  @change="onChange">
                            </el-switch>
                        </li>
                        <li class="atlas-set-part clearfix">
                            <font-set :fontData="fontData" :elementTarget="'.atlas-slide-title'"></font-set>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="边框">
                    <ul class = "clearfix">
                        <li class="atlas-set-part clearfix">
                            <background-set
                                    :backgroundData="backgroundData"
                                    :elementTarget="'.atlas-slide-title'"
                                    :imgTarget="'$styles>.atlas-slide-title>background-image'"
                                    :isBack="true">
                            </background-set>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane> -->
        <el-tab-pane label="样式">
            <el-tabs type="border-card">
                <el-tab-pane label="标题样式">
                    <ul class = "clearfix">
                        <li class="atlas-set-part clearfix">
                            <span class="atlas-set-title">标题显示</span>
                            <el-switch v-model="ads.titleShow" on-color="#13ce66" off-color="#ff4949" on-text="显示" off-text="隐藏"  @change="onChange">
                            </el-switch>
                        </li>
                        <li class="atlas-set-part clearfix">
                            <font-set :fontData="fontData" :elementTarget="'.atlas-slide-title'"></font-set>
                        </li>
                        <li class="atlas-set-part clearfix">
                            <background-set
                                    :backgroundData="backgroundData"
                                    :elementTarget="'.atlas-slide-title'"
                                    :imgTarget="'$styles>.atlas-slide-title>background-image'"
                                    :isBack="true">
                            </background-set>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="边框设置">
                    <li class="atlas-set-part clearfix">
                        <border-set :borderData="borderData" :elementTarget="'.atlas-slide-box'" :onTogether="true"></border-set>
                    </li>
                </el-tab-pane>
                <el-tab-pane label="其他">
                <ul class="clearfix">
                    <li class="atlas-set-part clearfix" v-if="ads.btnShow">
                        <span class="atlas-set-title">跳转方式</span>
                        <el-radio class="radio" v-model="ads.target" :label="'_self'">本页面跳转</el-radio>
                        <el-radio class="radio" v-model="ads.target" :label="'_blank'">新页面跳转</el-radio>
                    </li>
                    <li class="atlas-set-part clearfix">
                        <span class="atlas-set-title">{{setName}}</span>
                        <el-slider class="el-slider-atlas" v-model="item.itemWidth" show-input :min="50" :max="500" @change="save('.atlas-slide-item')"></el-slider>
                    </li>
                    <li class="atlas-set-part clearfix">
                        <span class="atlas-set-title">图片间距</span>
                        <el-slider class="el-slider-atlas" v-model="item.itemMargin" show-input :min="0" :max="100" @change="save('.atlas-slide-item')"></el-slider>
                    </li>
                    <li class="atlas-set-part clearfix">
                        <span class="atlas-set-title">内边填充</span>
                        <el-slider class="el-slider-atlas" v-model="itemPadding" show-input :min="0" :max="100" @change="save('.atlas-slide-box')"></el-slider>
                    </li>
                </ul>
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
                return getBorderData(this, '.atlas-slide-box');  
            },
            borderHoverData: function() {
                return getBorderData(this, '.atlas-slide-box:hover');
            },
            opacityData: function() {
                return getOpacityData(this)
            },
            backgroundData: function() {
                return getBackgroundData(this, '.atlas-slide-title');
            },
            coverBack(){
                return getBackgroundData(this, '.coverBack');
            },
            fontData: function() {
                return getFontData(this,'.atlas-slide-title');
            },
            fontHoverData: function() {
                return getFontData(this,'.atlas-slide-item:hover .atlas-slide-title');
            },
            ads(){
                return this.getModuleData.moduleSet.advancedSetting
            },
            scrollNum(){
                return this.getModuleData.moduleSet.list.length
            },
            setName(){
                return (this.getModuleData.moduleName == 'atlasX'|| this.getModuleData.moduleName =='atlasXData') ? '图片宽度' : '图片高度'
            },
            //判断是否是无缝滚动
            isMarquee(){
               return this.getModuleData.moduleSet.advancedSetting.effect==='leftMarquee' || this.getModuleData.moduleSet.advancedSetting.effect==='topMarquee'
            }
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
                'modifyModuleAdvanced',
                'openUpload'
            ]),
            save(elementTarget) {
                //修改数据后更新视图，更新state状态（actions）
                let item        = this.item.itemWidth + "px ";
                let itemMargin  = this.item.itemMargin + "px ";
                let itemPadding = this.itemPadding + "px ";
                if(this.atlasType){
                    this.modifyModuleStyle({
                        elTarget:elementTarget,
                        attributetarget: {
                            'width': item,
                            'margin-right': itemMargin,
                            'padding': itemPadding
                        }
                    })
                }else {
                    this.modifyModuleStyle({
                        elTarget:elementTarget,
                        attributetarget: {
                            'height': item,
                            'margin-bottom': itemMargin,
                            'padding': itemPadding
                        }
                    })
                }
            },
            onChange(){
                var payload = JSON.parse(JSON.stringify(this.ads))
                this.modifyModuleAdvanced(payload)
            }
        },
        created(){
            this.atlasType = this.getModuleData.moduleName == "atlasX" || this.getModuleData.moduleName == "atlasXQ" || this.getModuleData.moduleName =="atlasXData";
            this.itemPadding = parseInt(this.getModuleData.$styles[".atlas-slide-box"].padding)
            this.item.itemWidth = parseInt(this.getModuleData.$styles[".atlas-slide-item"].width)
            if(this.atlasType){
                this.item.itemWidth = parseInt(this.getModuleData.$styles[".atlas-slide-item"].width)
                this.item.itemMargin = parseInt(this.getModuleData.$styles[".atlas-slide-item"]["margin-right"])
            }else {
                this.item.itemWidth = parseInt(this.getModuleData.$styles[".atlas-slide-item"].height)
                this.item.itemMargin = parseInt(this.getModuleData.$styles[".atlas-slide-item"]["margin-bottom"])
            }
        },
        data(){
            return {
                itemPadding:0,
                item:{
                    itemWidth:0,
                    itemMargin:0
                },
                atlasType:true
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
    .atlas-set-radio{
        line-height: 36px;
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
    .atlas-set-part>.el-switch,.atlas-set-part>.el-radio{
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
    .atlas-reset {
        text-align:center;
        margin-top:10px;

    }
    .el-slider-atlas{
        width: 270px;
    }
    /* .atlas-set-part .border-width,.atlas-set-part .el-slider {
        width: 270px;
    } */
    .atlas-set-part .el-select {
        width:100px;
    }
    /*fix coolor picker hide bug*/
</style>