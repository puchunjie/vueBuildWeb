<template>
    <el-tabs type="border-card">
        <el-tab-pane label="基本设置">
            <div v-if="module.type='product'">
            <div style="float:left">列表显示:</div>
            <el-checkbox-group v-model="module.moduleSet.advancedSetting.selected">
            <el-checkbox v-for="(val,key) in module.moduleSet.advancedSetting.display" :label="val"></el-checkbox>
            </el-checkbox-group>
            </div>
            <!--<div style="float:left">产品个数:</div>
            <el-select v-model="value">
                <el-option v-for="item in options" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div style="float:left">一行几个:</div>
            <el-select v-model="value">
                <el-option v-for="item in options" :label="item.label" :value="item.value">
                </el-option>
            </el-select>-->

        </el-tab-pane>
        <el-tab-pane label="样式设置">
            <border-set :borderData="borderData" :elementTarget="'.prolist dl'"></border-set>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex';

import {
    borderSet
} from './styleSpareParts';


import {
    getBorderData,
} from '../../methods/helpers/getcss.js'

export default {
    components: {
        borderSet
    },
    props: {
        module: Object
    },
    computed: {
        ...mapGetters([
            'getModuleData'
        ]),
        borderData: function() {
            return getBorderData(this, '.prolist dl');
        }
    },
    created: function() {

    },
    methods: {
        change:function(){


        }
    },
    mounted: function() {

    },
    data() {
        return {
            options: [{
                value: 4,
                label: 4
            }],
            value: ''
        }
    }
}
</script>
<style>
.el-tabs {
    display: inline-block;
    width: 100%;
}
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
