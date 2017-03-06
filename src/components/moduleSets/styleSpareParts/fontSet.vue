<template>
    <ul class="clearfix">
        <li class="font-set-part clearfix">
            <span class="font-set-title">字体</span>
            <el-select v-model="fontFamily" placeholder="请选择" @change="save">
                <el-option v-for="item in fontF" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span class="font-set-title">字号</span>
            <div class="font-set-width">
                <el-slider class="onlyInput" v-model="fontSize" :min="0" :max="100" @change="save" show-input>
                </el-slider>
            </div>

        </li>
        <li class="font-set-part clearfix">
            <span class="font-set-title" v-if="hasTextAlign">对齐</span>
            <el-select v-model="textAlign" placeholder="请选择" @change="save" v-if="hasTextAlign">
                <el-option v-for="item in textA" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span class="font-set-title">行高</span>
            <div class="font-set-width">
                <el-slider class="onlyInput" v-model="lineHeight" :min="0" :max="100" @change="save" show-input>
                </el-slider>
            </div>

        </li>
        <li class="font-set-part clearfix">
            <span class="font-set-title">颜色</span><input type="text" class="color-pick" v-model="fontColor" target="fontColor">
            <span class="font-set-title setBold">加粗</span>
            <el-switch v-model="fontWeight" on-color="#13ce66" off-color="#13ce66" on-text="加粗" off-text="常规" @change="save"></el-switch>
        </li>
    </ul>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import {
        colorpickerInit
    } from "commonMethods/colorpickerInit";


    export default {
        props: {
            fontData: Object,
            elementTarget: String,
            hasTextAlign:{
                type: Boolean,
                default: true
            }
        },
        computed: {

        },
        created: function() {
            this.fontColor  = this.fontData.fontColor;
            this.fontSize   = this.fontData.fontSize;
            this.fontFamily = this.fontData.fontFamily;
            this.fontWeight = this.fontData.fontWeight === 'bold' || this.fontData.fontWeight === "500";
            this.lineHeight = this.fontData.lineHeight;
            this.textAlign  = this.fontData.textAlign;
        },
        mounted: function() {
            colorpickerInit(this);
        },
        methods: {
            ...mapActions([
                'modifyModuleStyle'
            ]),
            save: function() {
                //修改数据后更新视图，更新state状态（actions)
                let fs = this.fontSize + "px";
                let fw = this.fontWeight ? 'bold' : 'normal';
                let fh = this.lineHeight + "px";
                this.modifyModuleStyle({
                    elTarget: !this.elementTarget ? 'container' : this.elementTarget,
                    attributetarget: {
                        'color': this.fontColor,
                        'font-size': fs,
                        'font-weight': fw,
                        'line-height': fh,
                        'text-align': this.textAlign,
                        'font-family': this.fontFamily
                    }
                })
            }
        },

        data() {
            return {
                fontColor: "",
                fontSize: "",
                fontFamily: "",
                fontWeight: "",
                lineHeight: "",
                textAlign: "",
                fontF: [{
                    value: '微软雅黑',
                    label: '微软雅黑'
                }, {
                    value: '宋体',
                    label: '宋体'
                }, {
                    value: '新宋体',
                    label: '新宋体'
                }, {
                    value: '黑体',
                    label: '黑体'
                }, {
                    value: 'Arial',
                    label: 'Arial'
                }, {
                    value: 'Verdana',
                    label: 'Verdana'
                }],
                textA: [{
                    value: 'left',
                    label: '左对齐'
                }, {
                    value: 'center',
                    label: '居中'
                }, {
                    value: 'right',
                    label: '右对齐'
                }]
            }
        },
    }
</script>

<style>
    .font-set-part {
        float: left;
        margin-bottom: 10px;
        font-size: 14px;
        color: #787878;
    }
    .font-set-part .evo-colorind,.font-set-part .evo-colorind-ie,.font-set-part .evo-colorind-ff {
        width: 36px;
        height: 36px;
    }
    .font-set-part>* {
        float: left;
        display: block;
        margin-right: 25px;
    }
    
    .font-set-part .font-set-title {
        display: block;
        float: left;
        width: 42px;
        height: 42px;
        line-height: 42px;
        margin-right: 25px;
    }
    
    .font-set-part .el-switch {
        margin-top: 10px;
    }
    .evo-colorind, .evo-colorind-ie, .evo-colorind-ff{
        margin-left: 0;
    }
    .font-set-part  .setBold{
        margin-right: 10px;
    }
    .onlyInput{
        width: 130px;
    }
    .onlyInput .el-slider__runway{
        display: none;
    }
</style>