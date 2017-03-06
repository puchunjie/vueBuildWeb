<template>
    <div class="bst-module atlasY-module draggle-module smartMenu"
         :class="module.moduleId + 'styles'"
         :id="module.moduleId" @mousemove="eventInit">
        <div class="atlas-slide">
            <div class="tempWrap">
                <ul>
                    <li v-for="(el,index) in list" class="atlas-slide-item">
                        <a v-bind="{'_href': el.title,'_target': module.moduleSet.advancedSetting.target }" class="atlas-slide-box">
                            <img :src="el.imgUrl" />
                            <p class="atlas-slide-title" :class="['atlas-slide-title-'+module.moduleSet.advancedSetting.cover,isCovers]"  v-if="module.moduleSet.advancedSetting.titleShow">{{el.title}}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <a class="prev btn"
           :class="['prev-'+module.moduleSet.advancedSetting.btnPos,module.moduleSet.advancedSetting.btnStyle]"
           v-if="module.moduleSet.advancedSetting.btnShow"><img src="" /></a>
        <a class="next btn"
           :class="['next-'+module.moduleSet.advancedSetting.btnPos,module.moduleSet.advancedSetting.btnStyle]"
           v-if="module.moduleSet.advancedSetting.btnShow"><img src="" /></a>
    </div>
</template>

<script>
    import {
        commonEventInit
    } from 'commonEventInit';
    import modulemixin from '../../moduleMixin.js';
    require('./atlasY.css');
    export default {
        mixins: [modulemixin],
        methods: {
            eventInit() {
                let _this = this
                let $el = $(_this.$el)
                commonEventInit({
                    vm: _this,
                    resizeing:function(ui){
                        let tempHeight = $('.tempWrap',$el).height()
                        if(ui.size.height>tempHeight) {
                            ui.size.height = tempHeight
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
            }
        },
        mounted() {
            let $el = $(this.$el)
            this.slide()
            this.$watch(
                function(){
                    return  this.module.$styles['.atlas-slide-item'].height + this.module.$styles['.atlas-slide-item']['margin-bottom'] + this.module.moduleSet.advancedSetting.autoPlay + this.module.moduleSet.advancedSetting.interTime + this.module.moduleSet.advancedSetting.delayTime + this.module.moduleSet.advancedSetting.vis + this.module.moduleSet.advancedSetting.scroll
                },
                function(newVal, oldVal){
                    this.slide()
                    if($el.height()>$('.tempWrap',$el).height()) $el.css('height',$('.tempWrap',$el).height())
                }
            )
        },
        computed:{
            list (){
                return this.module.moduleSet.list
            },
            isCovers(){
                return this.module.moduleSet.advancedSetting.cover == 'all' ? 'coverBack' : this.module.moduleSet.advancedSetting.cover == "local" ? 'coverBack' : ''
            }
        },
        watch:{
            list:{
                handler(){
                    let _this = this
                    let $el = $(this.$el)
                    _this.slide()
                    if($el.height()>$('.tempWrap',$el).height()) $el.css('height',$('.tempWrap',$el).height())
                },
                deep: true
            }
        }
    }
</script>