<template>
    <a class="bst-module draggle-module picture-module smartMenu bst-move" :id="module.moduleId" 
    :class="module.moduleId + 'styles'"  @mousemove="eventInit">
        <span  :class="coverClass">
            <div class="picBox">
                <img :src="module.moduleSet.advancedSetting.imgUrl" class="picture">
                <img :src="module.moduleSet.advancedSetting.imgUrl_1" class="coverPic" v-if="isCover">
                <i class="lines" v-if="covers"></i>
            </div>
        </span>
        <div :class="{'fz1':baseData.width<10,'fz2':baseData.height<10}" v-if="baseData.width<10 || baseData.height<10"></div>
    </a>
</template>
<script>
require('./picture.css');
import {
    commonEventInit
} from 'commonEventInit';
import modulemixin from '../moduleMixin.js';
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    mixins: [modulemixin],
    computed: {
        height() {
            let image = new Image();    
            image.src = this.module.moduleSet.advancedSetting.imgUrl;
            let realWidth = image.width;
            let realHeight = image.height;
            return realWidth / realHeight
        },
        isCover() {
            return this.module.moduleSet.advancedSetting.imgUrl_1 == null ? false : true
        },
        coverClass() {
            return this.isCover == false ? '' : 'cover'
        },
        covers() {
            return this.module.moduleSet.advancedSetting.covers == true ? true : false
        },
        imgSrc(){
            return this.module.moduleSet.advancedSetting.imgUrl;
        },
        realImgData() {
            let image = new Image();    
            image.src = this.module.moduleSet.advancedSetting.imgUrl;
            let realWidth = image.width;
            let realHeight = image.height;
            return {
                src:image.src,
                realWidth: realWidth,
                realHeight: realHeight
            }
        },
        baseData(){
            return {
                width:parseInt(this.module.$styles.container.width),
                height:parseInt(this.module.$styles.container.height)
            }
        }
    },
    mounted: function() {
    },
    watch: {
        'imgSrc': function() {
            if (this.realImgData.realWidth <= 500 && this.realImgData.realHeight <= 500) {
                this.modifyModuleStyle({
                    elTarget: 'container',
                    attributetarget: {
                        'width': this.realImgData.realWidth + 'px',
                        'height': this.realImgData.realHeight + 'px'
                    }
                })
            }else{
                let $height = $(this.$el).width() / this.height;
                this.modifyModuleStyle({
                    elTarget: 'container',
                    attributetarget: {
                        'width': $(this.$el).width() + 'px',
                        'height': $height + 'px'
                    }
                })
            }
        }
    },
    methods: {
        ...mapActions([
            'modifyModuleStyle',
            'openLinkSet'
        ]),
        eventInit() {
            var _this = this
            var $el = $(_this.$el)
            commonEventInit({
                vm: _this,
                resizeing: function(ui) {
                    let h = $el.height()
                    if (h > $el.width() / _this.height) {
                        ui.size.height = parseInt($el.width() / _this.height)
                    }
                }
            });
        }
    }
}
</script>
<style>
.picture-module {
    position: absolute
}
.picture-module>span{
    width: 100%;
    height: 100%;
    display: block;
}
.picture-module .picBox {
    overflow: hidden;
    height: 100%;
    position: relative
}

.picture-module .lines {
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    border: 1px solid #fff
}

.picture-module img {
    vertical-align: top;
}

.picture-module .cover .coverPic{
    display: none;
}
.picture-module .cover:hover .coverPic {
    display: block;
}
.picture-module .cover:hover .picture {
    display: none;
}

.picture-module .fz1{
    width: 10px;
    height: 100%;
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top:0;
    margin-left: -5px;
}
.picture-module .fz2{
    width: 100%;
    height: 10px;
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top:50%;
    margin-top: -5px;
}
</style>
