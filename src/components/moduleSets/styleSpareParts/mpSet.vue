<template>
    <ul class="clearfix" v-if="!onTogether">
        <li class="mp-set-part">
            <span class="mp-set-title">上偏移</span>
            <div class="mp-width">
                <el-slider v-model="mpTop" :min="minNum" :max="100" @change="save" show-input></el-slider>
            </div>
        </li>
        <li class="mp-set-part">
            <span class="mp-set-title">右偏移</span>
            <div class="mp-width">
                <el-slider v-model="mpRight" :min="minNum" :max="100" @change="save" show-input></el-slider>
            </div>
        </li>
        <li class="mp-set-part" v-if="!nobottomMp">
            <span class="mp-set-title">下偏移</span>
            <div class="mp-width">
                <el-slider v-model="mpBottom" :min="minNum" :max="100" @change="save" show-input></el-slider>
            </div>
        </li>
        <li class="mp-set-part">
            <span class="mp-set-title">左偏移</span>
            <div class="mp-width">
                <el-slider v-model="mpLeft" :min="minNum" :max="100" @change="save" show-input></el-slider>
            </div>
        </li>
    </ul>
    <ul class="clearfix" v-else>
        <li class="mp-set-part">
            <span class="mp-set-title">{{name}}</span>
            <div class="mp-width">
                <el-slider v-model="mp" :min="minNum" :max="100" @change="save" show-input></el-slider>
            </div>
        </li>
    </ul>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        props: {
            mpData: Object,
            elementTarget: String,
            type: Boolean,
            minNum:{
               type:Number,
               default:0 
            },
            onTogether:{
                type:Boolean,
                default:false
            },
            nobottomMp:Boolean
        },
        created: function() {
            this.mp = this.mpData.mp
            this.mpTop = this.mpData.mpTop;
            this.mpRight = this.mpData.mpRight;
            this.mpBottom = this.mpData.mpBottom;
            this.mpLeft = this.mpData.mpLeft;
            //this.minNum=this.type?0:-100;
            this.type ? this.name = '内边距' : this.name = '外边距'
        },
        methods: {
            ...mapActions([
                'modifyModuleStyle'
            ]),
            save: function() {
                //修改数据后更新视图，更新state状态（actions）
                let mp = 0
                this.onTogether ? mp = this.mp +'px': mp = this.mpTop + "px" + " " + this.mpRight + "px" + " " + this.mpBottom + "px" + " " + this.mpLeft + "px";
                // 根据type来判断是padding还是margin
                let attributetarget = this.type ? {
                    'padding': mp
                } : {
                    'margin': mp
                };

                this.modifyModuleStyle({
                    elTarget: this.elementTarget,
                    attributetarget: attributetarget
                })
            }
        },
        data() {
            return {
                mp:0,
                mpTop: 0,
                mpRight: 0,
                mpBottom: 0,
                mpLeft: 0,
                name:''
            }
        }


    }
</script>

<style>
    .mp-set-part {
        float: left;
        margin-bottom: 10px;
        font-size: 14px;
        color: #787878;
    }
    
    .mp-set-part .mp-set-title {
        display: block;
        float: left;
        width: 42px;
        height: 42px;
        line-height: 42px;
        margin-right: 25px;
    }
    
    .mp-set-part .mp-width {
        width: 550px;
        float: left;
    }
</style>