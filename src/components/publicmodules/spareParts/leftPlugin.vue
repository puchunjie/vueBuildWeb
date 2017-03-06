<template>
    <div class="plugin-viewbox">
        <div class="viewbox-header">
            <span :class="{'active':flag==0}" @click="showCon(0)">客服</span>
            <span :class="{'active':flag==1}" @click="showCon(1)">分享</span>
            <span :class="{'active':flag==2}" @click="showCon(2)">地图</span>
            <span :class="{'active':flag==3}" @click="showCon(3)">其他</span>
        </div>
        <ul class="clearfix left-plugin" v-show="flag==0">
            <li data-base="true" class="clearfix">
                <div class="pic">
                    <img src="../../../../static/images/left-plugin-totop.jpg">
                </div>
                <div class="show">
                    <span>开启</span>
                    <el-switch
                      v-model="service1On"
                      on-color="#13ce66"
                      off-color="#ff4949"
                      @change="setService1Show"
                      >
                    </el-switch>
                </div>
                <div class="set" v-show="service1On">
                    <span>设置</span>
                    <i class="el-icon-setting" @click="openServiceEdit"></i>
                </div>
            </li>
        </ul>
        <ul class="clearfix left-plugin" v-show="flag==1">
            <li data-base="true"
             class="clearfix">
                
            </li>
        </ul>
        <ul class="clearfix left-plugin" v-show="flag==2">
            <li data-base="true"
                 class="clearfix">
            </li>
        </ul>
        <ul class="clearfix left-plugin" v-show="flag==3">
            <li data-base="true"
                 class="clearfix">
                <div class="pic">
                    <img src="../../../../static/images/left-plugin-totop.jpg">
                </div>
                <div class="show">
                    <span>开启</span>
                    <el-switch
                            v-model="service3On"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </div>
                <div class="set">
                    <span>设置</span>
                    <i class="el-icon-setting"></i>
                </div>
            </li>
        </ul>
    </div>
    
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        props: {
            moduleInfo: Object
        },
        computed: {
            ...mapGetters([
                'pageInfo'
            ])
        },
        created:function(){
            this.service1On=this.pageInfo.floatModules[0].slotModeules[0].moduleSet.advancedSetting.isShow
        },
        data() {
            return {
                service1On: false,
                service2On: false,
                service3On:false,
                flag:0
            }
        },
        methods: {
            ...mapActions([
                'closeModuleView',
                'switchSelectModuleKey',
                'modifyModuleAdvanced',
                'openModuleSet'
            ]),
            showCon(flag){
                this.flag=flag;
            },
            setService1Show(){
                this.switchSelectModuleKey({
                    keys: {
                        dragKey: 0,
                        slotModuleKey: 0
                    },
                    container: "floatModules"
                });
                this.modifyModuleAdvanced({
                    container:"floatModules",
                    attributetarget:{
                        isShow:this.service1On
                    }
                })
            },
            openServiceEdit(){
                this.switchSelectModuleKey({
                    keys: {
                        dragKey: 0,
                        slotModuleKey: 0
                    },
                    container: "floatModules"
                });
                this.openModuleSet('serviceSet')
            }

        }
    }
</script>
<style>
    .left-plugin li {
        width: 230px;
        margin-bottom: 10px;
    }
    .left-plugin li .pic{
        width: 110px;
        min-height: 110px;
        float: left;
        margin-right:10px;
    }
    .left-plugin li img {
        width:100%;
    }
    .left-plugin li .show,.left-plugin li .set{
        font-size: 14px;
    }
    .left-plugin li .show{
        margin-bottom: 10px;
    }
    .left-plugin li .set i{
        cursor: pointer;
    }
</style>