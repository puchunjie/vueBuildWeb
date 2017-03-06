<template>
    <ul class="clearfix" v-if="!onTogether">
       <li class="border-set-part">
            <span class="border-img borderTop"></span>
            <el-select v-model="borderTopStyle" placeholder="请选择" @change="save">
                <el-option v-for="item in borderStyleOption" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <input type="text" class="color-pick" v-model="borderTopColor" target="borderTopColor">
            <div class="border-width">
                <el-slider v-model="borderTopWidth" show-input :min="0" :max="20" @change="save"></el-slider>
            </div>
        </li>
        <li class="border-set-part" v-if="mode !== 'banner'">
            <span class="border-img borderRight"></span>
            <el-select v-model="borderRightStyle" placeholder="请选择" @change="save">
                <el-option v-for="item in borderStyleOption" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <input type="text" class="color-pick" v-model="borderRightColor" target="borderRightColor">
            <div class="border-width">
                <el-slider v-model="borderRightWidth" show-input :min="0" :max="20" @change="save"></el-slider>
            </div>
        </li>
        <li class="border-set-part">
            <span class="border-img borderBottom"></span>
            <el-select v-model="borderBottomStyle" placeholder="请选择" @change="save">
                <el-option v-for="item in borderStyleOption" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <input type="text" class="color-pick" v-model="borderBottomColor" target="borderBottomColor">
            <div class="border-width">
                <el-slider v-model="borderBottomWidth" show-input :min="0" :max="20" @change="save"></el-slider>
            </div>
        </li>
        <li class="border-set-part" v-if="mode !== 'banner'">
            <span class="border-img borderLeft"></span>
            <el-select v-model="borderLeftStyle" placeholder="请选择" @change="save">
                <el-option v-for="item in borderStyleOption" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <input type="text" class="color-pick" v-model="borderLeftColor" target="borderLeftColor">
            <div class="border-width">
                <el-slider v-model="borderLeftWidth" show-input :min="0" :max="20" @change="save"></el-slider>
            </div>
        </li>
        <li class="border-set-part" v-if="onRadius">
            <span class="border-img borderRadius"></span>
            <div class="border-width">
                <el-slider class="inputNumber"
                  v-model="borderRadius" @change="save" :min="0" :max="10000"
                  show-input>
                </el-slider>
                <!-- <el-input-number v-model="borderRadius" @change="save" :min="0"></el-input-number> -->
            </div> 
        </li>
    </ul>
    <ul v-else>
         <li class="border-set-part">
            <span class="border-img border">边框</span>
            <el-select v-model="borderStyle" placeholder="请选择" @change="save">
                <el-option v-for="item in borderStyleOption" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <input type="text" class="color-pick" v-model="borderColor" target="borderColor">
            <div class="border-width">
                <el-slider v-model="borderWidth" show-input :min="0" :max="20" @change="save"></el-slider>
            </div>
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
            borderData: Object,
            elementTarget: {
                type: String,
                default: "container"
            },
            mode: {
                type: String,
                default: 'module'
            },
            onTogether: {
                type: Boolean,
                default: false
            },
            onRadius: {
                type: Boolean,
                default: true
            }
        },
        created: function() {
            //console.log(this.mode)
            this.borderWidth = this.borderData.borderWidth;
            this.borderStyle = this.borderData.borderStyle;
            this.borderColor = this.borderData.borderColor;
            this.borderTopWidth = this.borderData.borderTopWidth || this.borderData["border-top-width"];
            this.borderTopStyle = this.borderData.borderTopStyle || this.borderData["border-top-style"];
            this.borderTopColor = this.borderData.borderTopColor || this.borderData["border-top-color"];
            this.borderRightWidth = this.borderData.borderRightWidth;
            this.borderRightStyle = this.borderData.borderRightStyle;
            this.borderRightColor = this.borderData.borderRightColor;
            this.borderBottomWidth = this.borderData.borderBottomWidth || this.borderData["border-bottom-width"];
            this.borderBottomStyle = this.borderData.borderBottomStyle || this.borderData["border-bottom-style"];
            this.borderBottomColor = this.borderData.borderBottomColor || this.borderData["border-bottom-color"];
            this.borderLeftWidth = this.borderData.borderLeftWidth;
            this.borderLeftStyle = this.borderData.borderLeftStyle;
            this.borderLeftColor = this.borderData.borderLeftColor;
            this.borderRadius = this.borderData.borderRadius;
        },
        mounted: function() {
            colorpickerInit(this);
        },
        methods: {
            ...mapActions([
                'updateBannerData',
                'modifyModuleStyle'
            ]),
            save: function() {
                //修改数据后更新视图，更新state状态（actions）
                if (this.mode === 'module') {
                    let brd = this.borderRadius + "px";
                    if (this.onTogether) {
                        let border = this.borderWidth + "px " + this.borderStyle + " " + this.borderColor;
                        this.modifyModuleStyle({
                            elTarget: this.elementTarget,
                            attributetarget: {
                                'border': border,
                                'border-radius': brd
                            }
                        })
                    } else {
                        let bt = this.borderTopWidth + "px " + this.borderTopStyle + " " + this.borderTopColor;
                        let br = this.borderRightWidth + "px " + this.borderRightStyle + " " + this.borderRightColor;
                        let bb = this.borderBottomWidth + "px " + this.borderBottomStyle + " " + this.borderBottomColor;
                        let bl = this.borderLeftWidth + "px " + this.borderLeftStyle + " " + this.borderLeftColor;
                        this.modifyModuleStyle({
                            elTarget: this.elementTarget,
                            attributetarget: {
                                'border-top': bt,
                                'border-right': br,
                                'border-bottom': bb,
                                'border-left': bl,
                                'border-radius': brd
                            }
                        })
                    }
                } else {
                    let bt = this.borderTopWidth + "px " + this.borderTopStyle + " " + this.borderTopColor;
                    let bb = this.borderBottomWidth + "px " + this.borderBottomStyle + " " + this.borderBottomColor;
                    this.updateBannerData({
                        target: this.elementTarget,
                        data: {
                            "border-top": bt,
                            "border-bottom": bb
                        }
                    });
                }

            }
        },
        data() {
            return {
                borderStyleOption: [{
                    value: 'solid',
                    label: '实线'
                }, {
                    value: 'dashed',
                    label: '虚线'
                }],
                borderWidth: 0,
                borderStyle: '',
                borderColor: '',
                borderTopWidth: 0,
                borderTopStyle: '',
                borderTopColor: '',
                borderRightWidth: 0,
                borderRightStyle: '',
                borderRightColor: '',
                borderBottomWidth: 0,
                borderBottomStyle: '',
                borderBottomColor: '',
                borderLeftWidth: 0,
                borderLeftStyle: '',
                borderLeftColor: '',
                borderRadius: 0
            }
        }
    }
</script>

<style>
    .border-set-part {
        float: left;
        margin-bottom: 10px;
        font-size: 14px;
        color: #787878;
    }
    
    .border-set-part>* {
        float: left;
        display: block;
        margin-right: 25px;
    }
    
    .border-img.borderTop {
        background: url('../../../assets/images/takko_top.png') no-repeat center;
    }
    
    .border-img.borderRight {
        background: url('../../../assets/images/takko_right.png') no-repeat center;
    }
    
    .border-img.borderBottom {
        background: url('../../../assets/images/takko_bottom.png') no-repeat center;
    }
    
    .border-img.borderLeft {
        background: url('../../../assets/images/takko_left.png') no-repeat center;
    }
    
    .border-img.borderRadius {
        background: url('../../../assets/images/fillet.png') no-repeat center;
    }
    
    .border-set-part .border-img {
        width: 36px;
        height: 36px;
        background-size: contain;
    }
    
    .color-pick {
        display: none
    }
    
    .border-set-part .evo-colorind,
    .border-set-part .evo-colorind-ie,
    .border-set-part .evo-colorind-ff {
        width: 36px;
        height: 36px;
    }
    
    .color-pick {
        width: 10px;
        height: 10px;
    }
    
    .border-set-part .border-width {
        width: 270px;
    }
    
    .border-set-part .border-img {
        width: 36px;
        height: 36px;
        line-height: 36px;
        background-size: contain;
    }
</style>