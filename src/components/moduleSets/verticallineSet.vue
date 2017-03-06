<template>
    <el-tabs type="border-card">
        <el-tab-pane label="样式设置">
            <ul class="clearfix">
                <li class="line-set-part clearfix">
                    <span class="line-set-title">样式选择</span>
                    <el-select v-model="borderStyle" placeholder="请选择" class="line-set-borderStyle" @change="save">
                        <el-option
                          v-for="item in borderStyles"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </li>
                <li class="line-set-part clearfix">
                    <span class="line-set-title">粗细选择</span>
                    <div>
                        <el-slider
                          v-model="borderWidth" show-input :min="0" :max="20"
                          class="line-set-slider" @change="save">
                        </el-slider>
                    </div>    
                </li>
                <li class="line-set-part clearfix">
                    <span class="line-set-title">颜色选择</span>
                    <div class="line-set-con">
                        <input type="text" class="color-pick" v-model="borderColor" target="borderColor">
                        <i class="delcolor el-icon-delete" @click="setColorNone">移除</i>
                    </div>
                </li>
                <li class="line-set-part clearfix">
                    <span class="line-set-title">自定义颜色</span>
                    <div class="line-set-con">
                        <el-input class="inline-input" placeholder="输入16进制值如:#000000" v-model="borderColor" @change="save"></el-input>
                        <span class="tips" v-if="!colorTips"><i class="el-icon-circle-cross"></i>请输入正确的颜色值#000000</span>
                    </div>
                </li>
            </ul>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {colorpickerInit} from "commonMethods/colorpickerInit"
import {getBorderData} from '../../methods/helpers/getcss.js'

export default {
    props: {
        ishide: Boolean
    },
    computed: {
        ...mapGetters([
            'getModuleData'
        ]),
        borderData: function() {
            return getBorderData(this,".line");
        },
        borderNewColor:function(){
            if(this.colorTips){
                return this.borderColor 
            }else{
                return "#000000";
            }
        },
        colorTips:function(){
            let reg=/^#[0-9a-fA-F]{6}$/;
            if(reg.test(this.borderColor) || this.borderColor==''){
                return true 
            }else{
                return false;
            }
        }
        
    },
    created: function() {
        this.borderStyle=this.borderData.borderLeftStyle;
        this.borderWidth=this.borderData.borderLeftWidth;
        this.borderColor=(this.borderData.borderLeftColor=='initial' || this.borderData.borderLeftColor=='')?"":this.borderData.borderLeftColor;
        if(this.borderColor==''){
            this.borderColor='#000000';
        }
    },
    methods: {
        ...mapActions([
            'closeModuleSet',
            'modifyModuleStyle'
        ]),
        
        save: function() {
            let _this=this;
            let bL = this.borderWidth + "px " + this.borderStyle + " " + this.borderNewColor;
            $(this.$el).find(".evo-pointer").css("background-color", _this.borderNewColor);
            this.modifyModuleStyle({
                elTarget: ".line",
                attributetarget: {
                    'border-left': bL
                }
            });
        },
        setColorNone: function(e) {
                this.borderColor = '#000000';
                $(e.target).parents(".line-set-con").find(".evo-pointer").css("background-color", "#000000")
                this.save();
       }


    },
    mounted: function() {
        colorpickerInit(this);
    },
    data() {
        return {
            borderStyle:"solid",
            borderWidth:1,
            borderColor:"#cccccc",
            borderStyles:[
                {
                    "label":"实线",
                    "value":"solid"
                },
                {
                    "label":"虚线",
                    "value":"dashed"
                },
                {
                    "label":"点线",
                    "value":"dotted"
                }
            ]
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

.line-set-title{
    font-size: 14px;
    float: left;
    width: 70px;
    height: 42px;
    line-height: 42px;
    margin-right: 25px;
    color: #787878;
}
.line-set-con{
    float: left;
}
.line-set-borderStyle{
    width: 200px;
    float: left;
}
.line-set-slider{
    width: 300px;
    float: left;
}
.line-set-con .evo-cp-wrap{
    float: left;
}
.line-set-con .delcolor{
    float: left;
    margin-left: 15px;
    font-size: 14px;
    color: #787878;
}
.line-set-con .inline-input{
    float: left;
    width: 200px!important;
}

</style>
