<template>
    <ul class="clearfix">
       <li class="background-set-part bg-view">
           <span class="background-view" 
           :style="{backgroundImage:bgshowImage,backgroundRepeat:backgroundRepeat,backgroundPosition:backgroundPosition,backgroundSize:backgroundSizeString}">
               </span>
            <el-button-group>
                <el-button type="primary" @click="uploadImg">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                <el-button type="danger" @click="setBGImgNone">移除<i class="el-icon-delete el-icon--right"></i></el-button>
            </el-button-group>
        </li> 
        <li class="background-set-part">
            <span class="background-set-title">背景重复</span>
            <el-radio-group v-model="backgroundRepeat" @change="save">
                <el-radio :label="'repeat'">平铺</el-radio>
                <el-radio :label="'repeat-x'">横向平铺</el-radio>
                <el-radio :label="'repeat-y'">纵向平铺</el-radio>
                <el-radio :label="'no-repeat'">不平铺</el-radio>
            </el-radio-group>
        </li>
        <li class="background-set-part">
            <span class="background-set-title">是否拉伸</span>
            <el-switch v-model="backgroundSize" on-color="#13ce66" off-color="#ff4949" on-text="是" off-text="否" @change="save"></el-switch>
        </li>
        <li class="background-set-part">
            <span class="background-set-title">对齐方式</span>
            <el-select v-model="backgroundPosition" placeholder="请选择" @change="save">
                <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </li>
        <li class="background-set-part">
            <span class="background-set-title">背景颜色</span>
            <input type="text" class="color-pick" v-model="backgroundColor" target="backgroundColor">
            <!-- <el-input placeholder="输入16进制值" v-model="backgroundColor" @change="save"></el-input> -->
            <i class="delcolor el-icon-delete" @click="setBGColorNone">移除背景色</i>
            <!--预留清除背景按钮，后期完善-->
            <!--<i class="el-icon-circle-cross"></i>-->
        </li>
        <li class="background-set-part">
            <span class="background-set-title">自定义背景</span>
            <el-input placeholder="输入16进制值如:#000000" v-model="backgroundColor" @change="save" class="background-set-input"></el-input>
            <span class="tips" v-if="!colorTips"><i class="el-icon-circle-cross"></i>请输入正确的颜色值如#000000</span>
        </li>
    </ul>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import {
        colorpickerInit
    } from "commonMethods/colorpickerInit";

    export default {
        props: {
            backgroundData: Object,
            elementTarget: {
                type: String,
                default: "container"
            },
            imgTarget: String,
            //是否为背景图
            isBack: {
                type: Boolean,
                default: true
            },
            mode: {
                type: String,
                default: 'module'
            },
        },
        computed: {
            ...mapGetters([
                'getSelectBanner',
                'getModuleData'
            ]),
            backgroundSizeString: function() {
                return this.backgroundSize ? 'cover' : 'auto';
            },
            bgshowImage() {
                return this.mode === 'module' ? this.getModuleData.$styles[this.elementTarget]['background-image'] : this.getSelectBanner.settings.background[this.elementTarget]['background-image'];
            },
            borderNewColor: function() {
                if (this.colorTips) {
                    return this.backgroundColor
                } else {
                    return "";
                }
            },
            colorTips: function() {
                let reg = /^#[0-9a-fA-F]{6}$/;
                if (reg.test(this.backgroundColor) || $.trim(this.backgroundColor) == '') {
                    return true
                } else {
                    return false;
                }
            }
        },
        created: function() {
            this.backgroundRepeat = this.backgroundData.backgroundRepeat || this.backgroundData['background-repeat'];
            this.backgroundPosition = this.backgroundData.backgroundPosition || this.backgroundData['background-position'];
            this.backgroundColor = this.backgroundData.backgroundColor || this.backgroundData['background-color'];
            if (this.backgroundColor === 'transparent') {
                this.backgroundColor = '';
            }
            this.backgroundImage = this.backgroundData.backgroundImage || this.backgroundData['background-image'];
            this.backgroundAttachment = this.backgroundData.backgroundAttachment || this.backgroundData['background-attachment'];;
            this.backgroundSize = this.backgroundData.backgroundSize ? this.backgroundData.backgroundSize === 'cover' : this.backgroundData['background-size'] === 'cover';
        },
        mounted: function() {
            colorpickerInit(this);
        },
        methods: {
            ...mapActions([
                'updateBannerData',
                'modifyModuleStyle',
                'openUpload'
            ]),
            uploadImg() {
                this.openUpload({
                    target: !!this.imgTarget ? this.imgTarget : this.elementTarget,
                    isBack: this.isBack,
                    mode: this.mode
                })
            },
            save() {
                //修改数据后更新视图，更新state状态（actions）
                let br = this.backgroundRepeat;
                let bc = this.borderNewColor;
                let bp = this.backgroundPosition;
                let ba = this.backgroundAttachment;
                let bi = this.bgshowImage;
                let bs = this.backgroundSize ? 'cover' : 'auto';

                let newBackground = {
                    "background-color": bc,
                    "background-image": bi,
                    "background-position": bp,
                    "background-repeat": br,
                    "background-size": bs,
                }

                //修改colorpicker的颜色
                $(this.$el).find(".evo-pointer.evo-colorind").css("background-color", bc);

                if (this.mode === "module") {
                    this.modifyModuleStyle({
                        elTarget: !this.elementTarget ? 'container' : this.elementTarget,
                        attributetarget: newBackground
                    })
                } else {
                    this.updateBannerData({
                        target: this.elementTarget,
                        data: newBackground
                    });
                }
            },
            setBGImgNone: function() {
                if (this.mode === "module") {
                    let target = !!this.elementTarget ? this.elementTarget : "container";
                    this.getModuleData.$styles[target]['background-image'] = "none"
                    this.backgroundImage = 'none';
                } else {
                    this.getSelectBanner.settings.background[this.elementTarget]['background-image'] = 'none';
                    this.backgroundImage = 'none';
                }
            },
            setBGColorNone: function(e) {
                this.backgroundColor = '';
                $(e.target).parents(".background-set-part").find(".evo-pointer").css("background-color", "")
                this.save();
            },
        },
        data() {
            return {
                backgroundRepeat: 'repeat',
                backgroundPosition: "left top",
                backgroundColor: "",
                backgroundImage: 'none',
                backgroundAttachment: "scroll",
                backgroundSize: false,
                options: [{
                    value: 'left top',
                    label: '左上'
                }, {
                    value: 'center top',
                    label: '上'
                }, {
                    value: 'right top',
                    label: '右上'
                }, {
                    value: 'left center',
                    label: '左'
                }, {
                    value: 'center',
                    label: '居中'
                }, {
                    value: 'right center',
                    label: '右'
                }, {
                    value: 'left bottom',
                    label: '左下'
                }, {
                    value: 'center bottom',
                    label: '下'
                }, {
                    value: 'right bottom',
                    label: '右下'
                }]
            }
        }
    }
</script>

<style>
    .background-set-part {
        float: left;
        margin-bottom: 10px;
        font-size: 14px;
        color: #787878;
        min-width: 600px;
    }
    
    .background-set-part>* {
        float: left;
        display: block;
        margin-right: 25px;
    }
    
    .background-view {
        display: block;
        width: 64px;
        height: 64px;
        border: 1px solid #ccc;
    }
    
    .background-view>img {
        display: block;
        width: 100%;
    }
    
    .bg-view .el-button-group {
        margin-top: 12px;
    }
    
    .background-set-part .background-set-title {
        display: block;
        float: left;
        width: 70px;
        height: 42px;
        line-height: 42px;
        margin-right: 25px;
    }
    
    .background-set-part .el-radio-group,
    .background-set-part .el-switch {
        margin-top: 12px;
    }
    
    .delcolor {
        cursor: pointer;
        margin-top: 10px;
    }
    
    .delcolor:hover {
        color: #20a0ff;
    }
    
    .background-set-input {
        width: 217px!important;
    }
    
    .background-set-part .evo-colorind,
    .background-set-part .evo-colorind-ie,
    .background-set-part .evo-colorind-ff {
        width: 36px;
        height: 36px;
    }
    
    .background-set-part .tips {
        color: red;
        line-height: 36px;
        margin-left: 5px;
    }
</style>