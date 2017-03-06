<template>
    <div class="bannerManage">
        <el-tabs :active-name="activeName">
            <el-tab-pane label="通栏设置" name="first">
                <el-tabs type="border-card">
                    <el-tab-pane label="整体背景设置">
                        <background-set :backgroundData="backgroundData" :elementTarget="'.wordContent'"></background-set>
                    </el-tab-pane>
                    <el-tab-pane label="内容背景设置">
                        <background-set :backgroundData="backgroundData" :elementTarget="'.wordContent'"></background-set>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="模块设置" name="second">
                <dl class="clearfix">
                    <dt class="manage-title">核心模块：</dt>
                    <dd class="manage-info">
                        <el-checkbox-group>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                        </el-checkbox-group>
                    </dd>
                </dl>
                <dl class="clearfix">
                    <dt class="manage-title">扩展模块：</dt>
                    <dd class="manage-info">
                        <el-checkbox-group>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                            <el-checkbox label="产品列表"></el-checkbox>
                        </el-checkbox-group>
                    </dd>
                </dl>
            </el-tab-pane>
            <el-tab-pane label="样式设置" name="third">样式设置</el-tab-pane>
        </el-tabs>
        <div class="manage-btn"><el-button type="primary">保存</el-button></div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
import {
    colorpickerInit
} from "commonMethods/colorpickerInit";
import {
    backgroundSet,
} from './styleSpareParts';
import {
    getBorderData,
    getMPData,
    getOpacityData,
    getBackgroundData,
    getFontData,
    getScrollData
} from '../../methods/helpers/getcss.js'
export default {
    props: {
        bannerSetShow: Boolean
    },
    components: {
        backgroundSet
    },
    computed: {
        ...mapGetters([
            'pageInfo',
            'getModuleData'
        ]),
        backgroundData: function() {
            return getBackgroundData(this, '.wordContent');   //用于测试
        }
    },
    methods: {


    },
    data() {
        return {

        }
    }
}
</script>
<style>
.el-dialog--small{ min-width: 740px; }

.bannerManage .manage-title{
    width:70px;
    color: #1f2d3d;
    float: left;
    font-size: 14px;
}
.bannerManage .manage-info{
    margin-left: 70px;
    font-size: 14px;
}
.bannerManage .manage-info .el-checkbox{
    margin-left: 15px;
    margin-bottom: 15px;
}
.bannerManage  dl{ margin-top: 20px; }
.manage-btn{ text-align:center; margin-top: 15px; }
</style>
