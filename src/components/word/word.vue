<template>
    <div class="bst-module  draggle-module smartMenu bst-move word-module" :id="module.moduleId"
         :class="module.moduleId + 'styles'" style="position: absolute;" @mousemove="eventInit">
         <a :_href="module.moduleSet.advancedSetting.href" :_target="module.moduleSet.advancedSetting.target">
            <div class="wordContent">
                <div class="txt bst-word-editor" :id="module.moduleId + 'txt'"
                     v-html="module.moduleSet.advancedSetting.wordDetails"></div>
            </div>
        </a>    
    </div>
</template>
<script>
    import modulemixin from '../moduleMixin.js';
    import {
        mapActions
    } from 'vuex';
    import {
        commonEventInit
    } from 'commonEventInit';
    import {
        rtByTinymce
    } from 'commonMethods/rtByTinymce'
    export default {
        mixins: [modulemixin],
        methods: {
            ...mapActions([
                'openLinkSet',
                'modifyModuleDataByIndex'
            ]),
            eventInit: function() {
                let _this = this
                commonEventInit({
                    vm: this,
                    resizeStop: function() {
                        $(_this.$el).find(".wordContent").mCustomScrollbar("update");
                    }
                });
            },
            componentDbclickEvent() {
                this.closeToolbar(); //关闭toolbar
                rtByTinymce(this, this.module.moduleId + 'txt');
            }
        },
        mounted: function() {
            if (this.module.moduleSet.advancedSetting.hasBar) {
                $(this.$el).find(".wordContent").mCustomScrollbar({
                    scrollButtons: {
                        enable: false,
                        scrollType: "continuous",
                        scrollSpeed: "auto",
                        scrollAmount: 40
                    }
                });
            }
        },
        data() {
            return {
                hasBar: false
            }
        }
    }
</script>
<style>
    .nohide {
        overflow: visible!important;
    }

    .bst-word-editor {
        -webkit-user-select: auto!important;
        -moz-user-select: text!important;
    }
    .richTextIndex {
        z-index: 100!important;
    }
    
    .bst-move {
        cursor: move;
    }
    .word-module>a{
        width: 100%;
        height: 100%;
        display: block;
    }
    .wordContent p {
        margin: 0;
        padding: 0;
    }
    
    .wordContent em {
        padding-right: 5px;
        font-style: italic;
    }
    
    .wordContent {
        color: #666666;
    }
    
    .wordContent a {
        text-decoration: none;
        color:#1d8ce0;
    }
    .wordContent .txt{
        word-wrap:break-word;
        word-break:break-all;
    }
</style>