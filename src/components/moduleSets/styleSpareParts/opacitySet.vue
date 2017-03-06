<template>
    <div class="opacity-set-part">
        <span class="padding-set-title">透明度</span>
        <div class="opacity-width">
            <el-slider v-model="opacity" :min="0" :max="10" @change="save" show-input>
            </el-slider>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';

    export default {
        props: {
            opacityData: Object,
            elementTarget:{
                type:String,
                default:"container"
            }
        },
        created: function() {
            this.opacity = this.opacityData.opacity;
        },
        methods: {
            ...mapActions([
                'modifyModuleStyle'
            ]),
            save: function() {
                //修改数据后更新视图，更新state状态（actions）
                let filter = "alpha(opacity=" + (this.opacity * 10) + ")";
                let opa = this.opacity / 10;
                this.modifyModuleStyle({
                    elTarget: this.elementTarget,
                    attributetarget: {
                        'opacity': opa,
                        "filter": filter,
                        "-moz-opacity": opa,
                        "-khtml-opacity": opa,
                    }
                })
            }
        },
        data() {
            return {
                opacity: 0
            }
        }

    }
</script>

<style>
    .opacity-set-part {
        /*min-width: 600px;*/
    }
    
    .opacity-set-part .padding-set-title {
        display: block;
        float: left;
        width: 42px;
        height: 42px;
        line-height: 42px;
        margin-right: 25px;
        font-size: 14px;
        color:#787878;
    }
    
    .opacity-set-part .opacity-width {
        width: 550px;
        float: left;
    }
</style>