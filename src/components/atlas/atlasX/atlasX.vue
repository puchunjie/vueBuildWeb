<template>
    <div class="bst-module atlasX-module draggle-module smartMenu"
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
        <a  class="prev btn" 
            :class="['prev-'+module.moduleSet.advancedSetting.btnPos,module.moduleSet.advancedSetting.btnStyle]"  
            v-if="module.moduleSet.advancedSetting.btnShow"></a>
        <a 
            class="next btn" 
            :class="['next-'+module.moduleSet.advancedSetting.btnPos,module.moduleSet.advancedSetting.btnStyle]" 
            v-if="module.moduleSet.advancedSetting.btnShow"></a>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import {
        commonEventInit
    } from 'commonEventInit';
    import modulemixin from '../../moduleMixin.js';
    require('./atlasX.css');
    export default {
        mixins: [modulemixin],
        methods: {
            ...mapActions([
                'modifyModuleStyle'
            ]),
            eventInit() {
                let _this = this
                let $el = $(_this.$el)
                commonEventInit({
                    vm: _this,
                    resizeStop:function(){

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
            let $el = $(this.$el);
            this.slide()
            this.$watch(
                function(){
                    return  this.module.$styles['.atlas-slide-item'].width + this.module.$styles['.atlas-slide-item']['margin-right'] + this.module.moduleSet.advancedSetting.autoPlay + this.module.moduleSet.advancedSetting.interTime + this.module.moduleSet.advancedSetting.delayTime + this.module.moduleSet.advancedSetting.vis + this.module.moduleSet.advancedSetting.scroll+this.module.moduleSet.advancedSetting.cover
                },
                function(newVal, oldVal){
                    this.slide()
                    if(this.containerWidth>$('.tempWrap',$el).width()) {
                        $el.css('width',$('.tempWrap',$el).width());
                        this.modifyModuleStyle({
                            elTarget:'container',
                            attributetarget: {
                                'width': $('.tempWrap',$el).width()+'px'
                            }
                        })
                    }
                }
            )
        },
        computed:{
            containerWidth(){
                return parseInt(this.module.$styles['container'].width);
            },
            list(){
                return this.module.moduleSet.list
            },
            isCovers(){
                return this.module.moduleSet.advancedSetting.cover == 'all' ? 'coverBack' : this.module.moduleSet.advancedSetting.cover == "local" ? 'coverBack' : ''
            },
            paddingWidth(){
                return parseInt(this.module['$styles']['.atlas-slide-item']['margin-right'])
            }
        },
        watch:{
            list:{
                handler(){
                    let _this = this
                    let $el = $(_this.$el)
                    setTimeout(function(){
                        _this.slide()
                    },100)
                },
                deep:true
            }
        }
    }
</script>