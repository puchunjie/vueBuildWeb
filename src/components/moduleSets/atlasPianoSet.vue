<template>
            <el-tabs type="border-card">
                <el-tab-pane label="标题设置">
                    <ul class = "clearfix">
                        <li class="atlas-set-part">
                            <span class="atlas-set-title">标题显示</span>
                            <el-switch v-model="titleShow" on-color="#13ce66" off-color="#ff4949" on-text="显示" off-text="隐藏"  @change="onChange">
                            </el-switch>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="样式">
                    <font-set :fontData="fontData" :elementTarget="'.name'" :hasTextAlign="false"></font-set>
                </el-tab-pane>
            </el-tabs>
</template>

<script>
    import {
            mapGetters,
            mapActions
    } from 'vuex';
    import {
            fontSet
    } from './styleSpareParts';

    import {
            getFontData
    } from '../../methods/helpers/getcss.js'

    export default {
        components: {
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
        fontData: function() {
            return getFontData(this,'.name');
        }
    },

    created(){
          this.titleShow = this.getModuleData.moduleSet.advancedSetting.titleShow;
    },
    methods: {
    ...mapActions([
            'closeModuleSet',
            'modifyModuleStyle',
            'modifyModuleData'
        ]),
        onChange:function(data){
            this.getModuleData.moduleSet.advancedSetting.titleShow = this.titleShow
            var payload = JSON.parse(JSON.stringify(this.getModuleData))
            this.modifyModuleData(payload)
        }
    },
    mounted: function() {

    },
    data() {
        return {
            titleShow:true,
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