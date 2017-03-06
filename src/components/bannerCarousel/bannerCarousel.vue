<template>
    <div class="bst-module banner-carousel"
       :id="module.moduleId" 
       :class="module.moduleId + 'styles'">
        <ul class="rs-slider">
            <li v-for="item in module.moduleSet.list"><img :src="item.imgUrl" :alt="item.title" ></li>
        </ul>
        <el-button-group class="slider-set-btn">
            <el-button type="primary" icon="edit" @click="open">添加数据</el-button>
            <el-button type="danger" icon="delete" @click="deleteM">删除横幅</el-button>
            <!--<el-button type="primary" icon="menu" @click="set">设置效果</el-button>-->
        </el-button-group>
    </div>    
</template>

<script>
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
            ])
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
                    con.append('<li><img src="' + el.imgUrl + '" alt="' + el.title + '"></li>')
                });
                $(this.$el).find(".rs-slider").refineSlide({
                    transition: _this.module.moduleSet.advancedSetting.transition,
                    controls: 'arrows',
                    delay: 1000,
                    arrowTemplate: '',
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
                delay: 1000,
                arrowTemplate: '<div class="rs-arrows"><a href="#" class="rs-prev"></a><a href="#" class="rs-next"></a></div>',
                onInit: function() {
                    _this.contrl = this.slider;
                }
            });

            this.$watch('module.moduleSet.advancedSetting.transition', function(newVal, oldVal) {
                this.contrl.settings['transition'] = newVal;
            });

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
    .rs-wrap {
        width: 100%;
        height: 100%;
    }
    
    .rs-slider {
        height: 100%;
    }
    
    .rs-slider>li img {
        width: 100%;
    }
    
    .slider-set-btn {
        position: absolute;
        right: 0;
        z-index: 1000;
        bottom: 0;
    }
    
    .banner-carousel {
        overflow: hidden;
    }
</style>