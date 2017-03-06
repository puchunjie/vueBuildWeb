<template>
    <el-tabs type="border-card">
        <el-tab-pane label="边框">
            <border-set :borderData="borderData" :elementTarget="'span'"></border-set>
        </el-tab-pane>
        <el-tab-pane label="常用">
            <mp-set :mpData="paddingData" :elementTarget="'span'" :type="true"></mp-set>
            <opacity-set :opacityData="opacityData"></opacity-set>
        </el-tab-pane>
        <!-- <el-tab-pane label="大小">
            <li class="atlas-set-part clearfix">
                <span class="atlas-set-title">宽度</span>
                <el-slider v-model="width" show-input :min="0" :max="2000" @change="save('container')"></el-slider>
            </li>
            <li class="atlas-set-part clearfix">
                <span class="atlas-set-title">高度</span>
                <el-slider v-model="height" show-input :min="0" :max="2000" @change="save('container')"></el-slider>
            </li>
        </el-tab-pane> -->
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
        opacitySet
    } from './styleSpareParts';
    import {
        getBorderData,
        getMPData,
        getOpacityData
    } from '../../methods/helpers/getcss.js'

    export default {
        components: {
            borderSet,
            mpSet,
            opacitySet
        },
        props: {
            ishide: Boolean
        },
        created(){
            this.width = parseInt(this.getModuleData['$styles'].container.width)
            this.height = parseInt(this.getModuleData['$styles'].container.height)
        },
        computed: {
            ...mapGetters([
                'getModuleData'
            ]),
            borderData: function() {
                return getBorderData(this, 'span');
            },
            paddingData: function() {
                return getMPData(this, 'span', 'p');
            },
            opacityData: function() {
                return getOpacityData(this)
            }
        },
        methods: {
            ...mapActions([
                'closeModuleSet',
                'modifyModuleStyle'
            ]),
            save(elementTarget){
                let width = this.width + 'px'
                let height = this.height+ 'px'
                this.modifyModuleStyle({
                    elTarget: elementTarget,
                    attributetarget: {
                        'width': width,
                        'height': height
                    }
                })
            }
        },
        mounted: function() {
        },
        data() {
            return {
                width: 0,
                height:0
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
</style>