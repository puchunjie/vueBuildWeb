<template>
    <div class="menu-viewbox">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="moduleInfo.bar.subList[0].name" name="first">
                    <ul class="clearfix menubox">
                        <li data-base="true" class="draggle-module side-module" 
                        v-for="(view,index) in moduleInfo.bar.subList[0].views" 
                        :isBanner="view.keyName"
                        :jsonkey="view.id">
                            <img :src="view.value">
                        </li>
                    </ul>
            </el-tab-pane>
            <el-tab-pane :label="moduleInfo.bar.subList[1].name" name="second">
                 <ul class="clearfix menubox">
                    <li data-base="true" class="draggle-module side-module" 
                    v-for="(view,index) in moduleInfo.bar.subList[1].views" 
                    :isBanner="view.keyName"
                    :jsonkey="view.id">
                        <img :src="view.value">
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
             dragInit(this)
        },
        updated: function() {
             dragInit(this)
        }
    }
</script>
<style>
    .menu-viewbox .menubox li {
        width: 222px;
        margin-bottom: 10px;
    }
    
    .menu-viewbox .menubox li img {
        width: 100%;
    }
    
    .vertical {
        width: 50%;
        float: left;
    }
    
    .menuPage button {
        background: #e5e5e5;
        border: none;
        line-height: 20px;
        border-radius: 3px;
    }
    
    .menuPage button:hover {
        background: #4d8ed0;
        color: #fff;
    }
    
    .viewbox-body .menubox li {
        cursor: move;
    }
</style>