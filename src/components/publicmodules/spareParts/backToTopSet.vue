<template>
    <el-tabs type="border-card">
        <el-tab-pane label="图片">
        <ul class="clearfix">
        <li class="backgroundNormalColor">默认图片</li>
        <li class="background-set-part bg-view">
            <span class="background-view backToTopSet-img">
                <img :src="advData.imgUrl" alt="">
            </span>
            <div class="el-button-group">
            <button type="button" class="el-button el-button--primary" @click="imgUpload(true)">
                <span>上传
                    <i class="el-icon-upload el-icon--right"></i>
                </span>
            </button>
            <button type="button" class="el-button el-button--danger" @click="setBGImgNone(true)">
            <span>移除
                    <i class="el-icon-delete el-icon--right"></i>
            </span>
            </button>
            </div>
        </li>
        <li class="backgroundNormalColor">悬停图片</li>
            <li class="background-set-part bg-view">
            <span class="background-view backToTopSet-img">
                <img :src="advData.imgUrl_1" alt="">
            </span>
            <div class="el-button-group">
            <button type="button" class="el-button el-button--primary" @click="imgUpload(false)">
            <span>上传
                <i class="el-icon-upload el-icon--right"></i>
            </span>
            </button>
            <button type="button" class="el-button el-button--danger" @click="setBGImgNone(false)">
            <span>移除
                <i class="el-icon-delete el-icon--right"></i>
            </span>
            </button>
            </div>
        </li>
        </ul>
        </el-tab-pane>
        <el-tab-pane label="位置">
        <ul class="clearfix">
            <li class="mp-set-part">
                <span class="mp-set-title">右偏移</span>
                <div class="mp-width">
                    <el-slider v-model="right" :min="0" :max="300" @change="save" show-input></el-slider>
                </div>
            </li>
            <li class="mp-set-part">
                <span class="mp-set-title">下偏移</span>
                <div class="mp-width">
                    <el-slider v-model="bottom" :min="0" :max="300" @change="save" show-input></el-slider>
                </div>
            </li>
        </ul>
        </el-tab-pane>
        <el-tab-pane label="宽度">
            <ul class="clearfix">
                <li class="mp-set-part">
                    <span class="mp-set-title">宽度</span>
                <div class="mp-width">
                    <el-slider v-model="width" :min="10" :max="200" @change="save" show-input></el-slider>
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
    import cssJson from 'cssJson';
    export default {
        data(){
          return{
              right:null,
              bottom:null,
              width:60
          }
        },
        computed: {
            ...mapGetters([
                'pageInfo',
                'getModuleData'
            ]),
            advData(){
                return this.getModuleData.moduleSet.advancedSetting
            }
        },
        methods: {
            ...mapActions([
                'openUpload',
                'modifyModuleData',
                'getSettingInfo',
                'switchSelectModuleKey'
            ]),
            imgUpload:function(b) {
                let _this=this
                _this.openUpload({
                    target: b?'moduleSet>advancedSetting>imgUrl':'moduleSet>advancedSetting>imgUrl_1',
                    isBack: false,
                    mode: 'module',
                    container: 'floatModules'
                 });
            },
            setBGImgNone:function(b) {
                b?this.getModuleData.moduleSet.advancedSetting.imgUrl="":this.getModuleData.moduleSet.advancedSetting.imgUrl_1=""
            },
            save:function(){
                let module=this.getModuleData;
                    //更新数据同步模块
                module['$styles']['container'].right = this.right+'px';
                module['$styles']['container'].bottom = this.bottom+'px';
                module['$styles']['container'].width = this.width+'px';
                //let module = this.pageInfo.floatModules[0].slotModeules[0];
                cssJson.toStyleHEAD(module, true);

            }
        },
        created(){
            let _this=this
            _this.right=parseInt(this.getModuleData['$styles']['container'].right)
            _this.bottom=parseInt(this.getModuleData['$styles']['container'].bottom)
            _this.width=parseInt(this.getModuleData['$styles']['container'].width)
        }
    }
</script>
<style>
    .backgroundNormalColor{float: left;height: 20px;width: 500px}
    .backToTopSet-img {
        text-align: center;
        line-height: 64px;
    }
    .backToTopSet-img img{
        width: auto;
        max-width: 100%;
        max-height: 100%;
        display: inline-block;
        vertical-align: middle;
        margin-top: -3px;
    }
</style>