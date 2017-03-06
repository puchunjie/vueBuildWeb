<template>
    <div class="setting-pane" v-show="settingInfo.isShow">
       <div class="setting-pane-header">
            <span class="dian"></span>
           <i class="el-icon-close close" @click="closeSettingPane"></i>
       </div> 
       <div class="setting-pane-body">
           <h4>尺寸</h4>
           <div class="size setting-box">
               <ul>
                   <li :class="{'disable':isNaN(moduleData.width)}">
                       <span>W:</span><input class="m_width" min="0" type="number" v-model="moduleData.width"  :disabled="isNaN(moduleData.width)" @input="setModuleData('width')">
                   </li>
                   <li :class="{'disable':isNaN(moduleData.height)}">
                       <span>H:</span><input class="m_height" min="0" type="number" v-model="moduleData.height"  :disabled="isNaN(moduleData.height)" @input="setModuleData('height')">
                   </li>
               </ul>
           </div>
           <h4>位置</h4>
           <div class="position setting-box">
               <ul>
                   <li :class="{'disable':isNaN(moduleData.left)}">
                       <span>X:</span><input class="m_left"  type="number" v-model="moduleData.left" :disabled="isNaN(moduleData.left)" @input="setModuleData('left')">
                   </li>
                   <li :class="{'disable':isNaN(moduleData.top)}">
                       <span>Y:</span><input class="m_top"  type="number" v-model="moduleData.top" :disabled="isNaN(moduleData.top)" @input="setModuleData('top')">
                   </li>
               </ul>
           </div>
       </div>
       <div class="setting-pane-footer">
           <a>在线教程</a>
       </div>
    </div>
</template>

<script>
    import {
        any2Px
    } from "bUtils";
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        components: {

        },
        computed: {
            ...mapGetters([
                'settingInfo',
                'getDragKey'
            ]),
            moduleData() {
                this.setData.width = this.settingInfo.width;
                this.setData.height = this.settingInfo.height;
                this.setData.left = this.settingInfo.left;
                this.setData.top = this.settingInfo.top;
                return this.setData;
            }
        },
        methods: {
            ...mapActions([
                'getSettingInfo',
                'closeSettingPane',
                'updateBannerSize',
                'modifyModuleStyle'
            ]),
            setModuleData(type) {
                let _this = this;
                let setData = {};
                if (type == 'width') {
                    setData = {
                        width: any2Px($(".m_" + type).val())
                    }
                } else if (type == 'height') {
                    setData = {
                        height: any2Px($(".m_" + type).val())
                    }
                } else if (type == 'left') {
                    setData = {
                        left: any2Px($(".m_" + type).val())
                    }
                } else if (type == 'top') {
                    setData = {
                        top: any2Px($(".m_" + type).val())
                    }
                }

                if (isNaN(_this.moduleData.width)) {
                    //更新数据到状态机
                    _this.updateBannerSize({
                        dragKey: _this.getDragKey,
                        data: setData
                    });
                } else {
                    _this.modifyModuleStyle({
                        elTarget: 'container',
                        attributetarget: setData
                    })
                }

            }
        },
        mounted: function() {
            let _this = this;
            this.moduleData.width = 'NaN';
            this.moduleData.height = 'NaN';
            this.moduleData.left = 'NaN';
            this.moduleData.top = 'NaN';
            $(this.$el).draggable({
                //handle:".setting-pane-header",
                containment: "window"
            })
            $(window).resize(function() {
                let cWidth = $(window).width() - 96;
                if ($(_this.$el).offset().left > cWidth) {
                    $(_this.$el).css("left", cWidth)
                }
            })
        },
        data() {
            return {
                setData: {
                    width: '',
                    height: '',
                    left: '',
                    top: ''
                }
            }
        }
    }
</script>

<style>
    .setting-pane {
        position: fixed;
        right: 65px;
        top: 15%;
        width: 96px;
        background: #555555;
        border-radius: 5px;
        box-shadow: 0 0 14px rgba(0, 0, 0, 0.3);
        z-index: 1300;
        cursor: move;
    }
    
    .setting-pane-header {
        height: 30px;
        position: relative;
    }
    
    .dian {
        width: 18px;
        height: 6px;
        background: url(../../../static/images/setpane_dian.jpg);
        float: left;
        margin-left: 15px;
        margin-top: 12px;
    }
    
    .setting-pane-header .close {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        color: #cccccc;
        font-size: 12px;
    }
    
    .setting-pane-body {
        border-top: solid 1px #4c4c4c;
        border-bottom: solid 1px #4c4c4c;
        height: 322px;
    }
    
    .setting-pane-body h4 {
        color: #cccccc;
        font-size: 14px;
        text-align: center;
        line-height: 35px;
    }
    
    .setting-pane-body .setting-box {
        padding: 0 13px;
    }
    
    .setting-pane-body .setting-box li {
        margin-bottom: 5px;
        color: #fff;
    }
    
    .setting-pane-body .setting-box li.disable {
        color: #6b6b6b;
    }
    
    .setting-pane-body .setting-box li span {
        width: 24px;
        display: inline-block;
    }
    
    .setting-pane-body .setting-box input {
        width: 44px;
        background: #4a4a4a;
        border: none;
        border-radius: 5px;
        text-align: center;
        line-height: 20px;
        color: #fff;
    }
    
    .setting-pane-footer {
        height: 30px;
        text-align: center;
    }
    
    .setting-pane-footer a {
        color: #cccccc;
        line-height: 30px;
        font-size: 14px;
    }
</style>