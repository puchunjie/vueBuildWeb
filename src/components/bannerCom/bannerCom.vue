<template>
    <div class="bst-module"
         :id="module.moduleId"
         :class="[module.moduleId + 'styles','bannerCom']">
        <ul class="rs-slider">
            <li v-for="item in module.moduleSet.list" >
                <a :_href="item.href" :style="[{backgroundImage:'url('+item.imgUrl+')'},bgData]"></a>
            </li>
        </ul>
        <el-button-group class="slider-set-btn">
            <el-button type="primary" @click="openStyle"><i class="iconfont icon-xtgl6 setIcon"></i>设置样式</el-button>
            <el-button type="primary" icon="edit" @click="open">添加数据</el-button>
            <el-button type="danger" icon="delete" @click="deleteM">删除横幅</el-button>
        </el-button-group>
    </div>
</template>

<script>
    require('../../../static/vendor/refineslide-master/jquery.refineslide.js')
    import cssJson from 'cssJson';
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    export default {
        props: {
            module: Object,
            dragIndex: null,
            slotModuleIndex: null,
            container: String
        },
        computed: {
            ...mapGetters([
                'getModuleData'
            ]),
            bgData() {
                return {
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: this.module.moduleSet.advancedSetting.position ? this.module.moduleSet.advancedSetting.position.backgroundPosition : 'center top',
                    backgroundSize: this.module.moduleSet.advancedSetting.position ? this.module.moduleSet.advancedSetting.position.backgroundSize : 'auto'
                }
            }
        },
        methods: {
            ...mapActions([
                'openToolbar',
                'closeToolbar',
                'modifyModuleData',
                'switchSelectModuleKey',
                'openModuleSet',
                'deleteModule'
            ]),
            set() {
                this.switchSelectModuleKey({
                    keys: {
                        dragKey: this.dragIndex,
                        slotModuleKey: this.slotModuleIndex,
                    },
                    container: this.container
                });
                this.openModuleSet('bannercarousel-set');
            },
            open() {
                this.switchSelectModuleKey({
                    keys: {
                        dragKey: this.dragIndex,
                        slotModuleKey: this.slotModuleIndex,
                    },
                    container: this.container
                });
                this.openModuleSet('moduleEdit');
            },
            openStyle() {
                this.switchSelectModuleKey({
                    keys: {
                        dragKey: this.dragIndex,
                        slotModuleKey: this.slotModuleIndex,
                    },
                    container: this.container
                });
                this.openModuleSet('banner-position-set');
            },
            deleteM() {
                this.switchSelectModuleKey({
                    keys: {
                        dragKey: this.dragIndex,
                        slotModuleKey: this.slotModuleIndex,
                    },
                    container: this.container
                });
                this.deleteModule();
            },
            restSlide(newVal) {
                let _this = this;
                $(this.$el).find(".rs-wrap").remove();
                $(this.$el).append('<ul class="rs-slider"></div>');
                let con = $(this.$el).find(".rs-slider");
                newVal.forEach(function(el, index) {
                    let elStr = '<li><a _href="item.href" style="background:url(' + el.imgUrl + ') center center no-repeat;background-size:cover"></a></li>';
                    con.append(elStr);

                });
                $(this.$el).find(".rs-slider").refineSlide({
                    transition: _this.module.moduleSet.advancedSetting.transition,
                    controls: 'arrows',
                    delay: 1000,
                    arrowTemplate: '<div class="rs-arrows"><a href="#" class="rs-prev"></a><a href="#" class="rs-next"></a></div>',
                    onInit: function() {
                        _this.contrl = this.slider;
                    }
                });
            }
        },
        mounted: function() {
            cssJson.toStyleHEAD(this.module);
            // 初始化轮播
            let _this = this;
            $(this.$el).find(".rs-slider").refineSlide({
                transition: _this.module.moduleSet.advancedSetting.transition,
                controls: 'arrows',
                arrowTemplate: '',
                onInit: function() {
                    _this.contrl = this.slider;
                }
            });

            this.$watch('module.moduleSet.advancedSetting.transition', function(newVal, oldVal) {
                this.contrl.settings['transition'] = newVal;
            })

            this.$watch('module.moduleSet.list', function(newVal, oldVal) {
                this.restSlide(newVal);
            }, {
                deep: true
            });
        },
        data() {
            return {
                draggable: false,
                ts: "cubeV", //slider动画效果
                contrl: {}, //接收slider实例
            }
        }
    }
</script>

<style>
    .bannerCom {
        overflow: hidden;
    }
    
    .bannerCom .rs-wrap {
        width: 100%;
        height: 100%;
    }
    
    .bannerCom .rs-slider {
        height: 100%;
    }
    
    .bannerCom .rs-slide-bg {
        height: 100%;
    }
    
    .bannerCom .rs-slider>li a {
        width: 100%;
        height: 100%;
        display: block;
    }
    
    .bannerCom .slider-set-btn {
        position: absolute;
        right: 0;
        z-index: 1000;
        bottom: 0;
    }
    
    .bannerCom .setIcon {
        line-height: 0px;
        vertical-align: middle;
    }
</style>