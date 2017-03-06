<template>
    <div class="left-banner-viewbox">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="moduleInfo.bar.subList[0].name" name="first">
                    <ul class="clearfix left-banner-box">
                        <li data-base="true" class="draggle-module side-module" 
                        v-for="(view,index) in moduleInfo.bar.subList[0].views" 
                        :isBanner="view.keyName"
                        :jsonkey="view.id">
                            <img :src="view.value">
                            <p class="name">{{ view.name }}</p>
                        </li>
                    </ul>
            </el-tab-pane>
            <el-tab-pane :label="moduleInfo.bar.subList[1].name" name="second">
                 <ul class="clearfix left-banner-box">
                    <li data-base="true" class="draggle-module side-module" 
                    v-for="(view,index) in moduleInfo.bar.subList[1].views" 
                    :isBanner="view.keyName"
                    :jsonkey="view.id">
                        <img :src="view.value">
                        <p class="name">{{ view.name }}</p>
                    </li>
                </ul> 
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    import {
        dragInit
    } from '../../../methods/common/moduleDragInit'
    export default {
        props: {
            moduleInfo: Object,
            ishide: Boolean
        },
        data() {
            return {
                activeName: 'first'
            }
        },
        methods: {
            ...mapActions([
                'closeModuleView'
            ])
        },
        mounted: function() {
            dragInit(this);
            $(this.$el).find(".left-banner-box li").hover(function() {
                $(this).find(".name").fadeIn();
            }, function() {
                $(this).find(".name").fadeOut();
            })
        },
        updated: function() {
            dragInit(this);
            $(this.$el).find(".left-banner-box li").hover(function() {
                $(this).find(".name").fadeIn();
            }, function() {
                $(this).find(".name").fadeOut();
            })
        }
    }
</script>
<style>
    .left-banner-box {
        width: 100%;
    }
    
    .left-banner-box li {
        width: 230px;
        position: relative;
        margin-bottom: 10px;
        cursor: move;
    }
    
    .left-banner-box li img {
        display: block;
        width: 100%;
    }
    
    .left-banner-box li p {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        margin: 0;
        background-color: rgba(51, 51, 51, 0.85);
        display: none;
    }
</style>