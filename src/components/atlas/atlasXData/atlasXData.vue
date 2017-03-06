<template>
    <div class="bst-module atlasX-module draggle-module smartMenu"
         :class="module.moduleId + 'styles'"
         :id="module.moduleId" @mousemove="eventInit">
        <div class="atlas-slide">
            <div class="tempWrap">
                <ul>
                    <li v-for="(el,index) in list" class="atlas-slide-item">
                        <a v-bind="{'_href': el.title,'_target': module.moduleSet.advancedSetting.target }" class="atlas-slide-box">
                            <img :src="el.pic" />
                            <p class="atlas-slide-title" :class="['atlas-slide-title-'+module.moduleSet.advancedSetting.cover,isCovers]"  v-if="module.moduleSet.advancedSetting.titleShow">{{el.title}}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <a  class="prev btn" 
            :class="['prev-'+module.moduleSet.advancedSetting.btnPos,module.moduleSet.advancedSetting.btnStyle]"  
            v-if="module.moduleSet.advancedSetting.btnShow"><img src="" /></a>
        <a 
            class="next btn" 
            :class="['next-'+module.moduleSet.advancedSetting.btnPos,module.moduleSet.advancedSetting.btnStyle]" 
            v-if="module.moduleSet.advancedSetting.btnShow"><img src="" /></a>
    </div>
</template>

<script>
    import {
        commonEventInit
    } from 'commonEventInit';
    import modulemixin from '../../moduleMixin.js';
    import {
        savePage,
        getClassification
    } from 'ajaxAPI';
    require('./atlasXData.css');
    export default {
        mixins: [modulemixin],
        methods: {
            eventInit() {
                let _this = this
                let $el = $(_this.$el)
                commonEventInit({
                    vm: _this,
                    resizeing:function(ui){
                        let tempWidth = $('.tempWrap',$el).width()
                        if(ui.size.width>tempWidth) {
                            ui.size.width = tempWidth
                        }
                    }
                })
            },
            slide(){
                var _this = this
                var arg = this.module.moduleSet.advancedSetting
                var slides = this.module.moduleId
                $('#'+slides).trigger('slideDestroy')
                $('#'+slides).slide({
                    mainCell: '.atlas-slide ul',
                    effect: arg.effect,             //效果
                    interTime: arg.interTime,       //播放间隔
                    delayTime: arg.delayTime,       //效果速度
                    autoPlay: arg.autoPlay,         //自动运行
                    scroll: arg.scroll,             //滚动个数
                    autoPage:true
                })
            },
            getList() {
                var _this = this
                var $el = $(_this.$el)
                getClassification(_this, {
                    moduleid: _this.module.id,
                    source: _this.module.moduleSet.cate,
                    dataType: 2,
                    siteid:_this.$route.params.siteid
                }, function(response) {
                    if (!!response.list.length) {
                        _this.module.moduleSet.list = []
                        _this.module.moduleSet.list = response.list
                        _this.slide()
                    }
                })
            }
        },
        mounted() {
            let $el = $(this.$el)
            this.slide()
            if (!!this.module.id) {
                this.getList()
            }
            this.$watch(
                function(){
                    return  this.module.$styles['.atlas-slide-item'].width + this.module.$styles['.atlas-slide-item']['margin-right'] + this.module.moduleSet.advancedSetting.autoPlay + this.module.moduleSet.advancedSetting.interTime + this.module.moduleSet.advancedSetting.delayTime + this.module.moduleSet.advancedSetting.vis + this.module.moduleSet.advancedSetting.scroll+this.module.moduleSet.advancedSetting.cover
                },
                function(newVal, oldVal){
                    this.slide()
                    if($el.width()>$('.tempWrap',$el).width()) $el.css('width',$('.tempWrap',$el).width())
                }
            )
        },
        computed:{
            list(){
                return this.module.moduleSet.list
            },
            isCovers(){
                return this.module.moduleSet.advancedSetting.cover == 'all' ? 'coverBack' : this.module.moduleSet.advancedSetting.cover == "local" ? 'coverBack' : ''
            },
            upData() {
                return this.module.moduleSet.upData
            }
        },
        watch:{
            list:{
                handler(){
                    let _this = this
                    let $el = $(this.$el)
                    setTimeout(function(){
                        _this.slide()
                        if($el.width()>$('.tempWrap',$el).width()) $el.css('width',$('.tempWrap',$el).width())
                    },100)
                },
                deep:true
            },
            upData() {
                var _this = this
                _this.getList()
            }
        }
    }
</script>