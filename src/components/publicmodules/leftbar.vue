<template>
    <div class="bst-left">
        <div class="bst-left-sidebar unselectable">
            <ul>
                <li v-if="!isBannerMake" @click.stop="toggleColumn" :class="{'active':isColums}" id="bannerMake">通栏</li>
                <li v-for="(bar,index) in leftBar.bars" 
                v-if="!hideItem(bar)"
                :class="bar.moduleType === activeModule.bar.moduleType ? 'active' : ''" 
                @click.stop="selectModule(index,bar)">{{ bar.name }}</li>
            </ul>
        </div>
        <module-view :moduleInfo="activeModule" :ishide="leftBar.ishide" :componentName='activeName'></module-view>

         <!--模版选择面板-->
        <banner-select v-if="bannerTplSelect.ishide"></banner-select>
        <!--模版选择面板-->

        <!--通栏设置面板-->
        <ban-set v-if="bannerSet.ishide"></ban-set>
         <!--通栏设置面板-->

         <!--通栏设置公共面板-->
        <pub-set v-if="bannerPublic.ishide"></pub-set>
         <!--通栏设置公共面板-->
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    //接口url
    import {
        getBannerList
    } from 'ajaxAPI';

    import moduleView from './spareParts/moduleview.vue';
    import bannerSelect from './spareParts/bannerselect.vue';
    import banSet from '../moduleSets/bannerSet.vue';
    import pubSet from '../moduleSets/publicBannerSet.vue';



    export default {
        components: {
            moduleView,
            bannerSelect,
            banSet,
            pubSet
        },
        computed: {
            ...mapGetters([
                'leftBar',
                'pageInfo',
                'websiteInfo',
                'templateSelect',
                'bannerTplSelect',
                'bannerSet',
                'bannerPublic'
            ]),
            // 是否为通栏制作
            isBannerMake() {
                return this.$route.params.siteMode === 'bannerMake';
            },
            bannerSelShow(){
                return this.bannerTplSelect.ishide;
            },
            moduleViewShow(){
                return this.leftBar.ishide;
            },
            
        },
        methods: {
            ...mapActions([
                'openModuleView',
                'closeModuleView',
                'addBanner',
                'openTemplate'
            ]),
            // 是否为通栏制作隐藏商城和插件
            hideItem(item) {
                return this.$route.params.siteMode === 'bannerMake' && item.moduleType === 'plugIn' ||
                    this.$route.params.siteMode === 'bannerMake' && item.moduleType === 'shoppingMall' ||
                    this.$route.params.siteMode === 'bannerMake' && item.moduleType === 'nav' ||
                    this.$route.params.siteMode === 'bannerMake' && item.moduleType === 'datalist' ||
                    this.$route.params.siteMode === 'bannerMake' && item.moduleType === 'banner';
            },
            selectModule(index, bar) {
                // 如果点击已经打开的模块展示，就关闭
                this.isColums = false;
                if (this.activeModule.index === index) {
                    this.activeModule.index = 'none';
                    this.activeModule.bar = {};
                    this.activeName = "";
                    this.closeModuleView();
                } else {
                    this.activeModule.index = index;
                    this.activeModule.bar = bar;
                    if (bar.name === '文字') {
                        this.activeName = "leftWord";
                    } else if (bar.name === '导航') {
                        this.activeName = "leftMenu";
                    } else if (bar.name === '图形') {
                        this.activeName = "leftGraph";
                    } else if (bar.name === '横幅') {
                        this.activeName = "leftBanner";
                    }else if (bar.name === '系统') {
                        this.activeName = "leftSys";
                    }else {
                        this.activeName = "leftNormal";
                    }
                    this.openModuleView();
                }
            },
            toggleColumn() {
                let _this = this;
                if (_this.isColums) {
                    _this.isColums = false;
                    _this.activeName = ""
                    _this.closeModuleView();
                } else {
                    _this.isColums = true;
                    _this.activeModule.index = 'none';
                    _this.activeModule.bar = {};
                    _this.activeName = "columnview"
                    _this.openModuleView();
                }

            }
        },
        watch:{
            bannerSelShow:function(newVal, oldVal){
                if(this.bannerTplSelect.ishide){
                    this.isColums=false;
                }
            },
            moduleViewShow:function(){
                if(!this.leftBar.ishide){
                    this.isColums=false;
                    this.activeName = ""
                    this.activeModule.index = 'none';
                    this.activeModule.bar = {};
                }
            }

        },
        data() {
            return {
                activeModule: {
                    index: "none",
                    bar: {},
                    name: ''
                },
                activeName: "",
                isColums: false

            }
        }
    }
</script>

<style>
    .bst-left-sidebar {
        position: fixed;
        left: 0;
        top: 37px;
        width: 51px;
        height: 100%;
        z-index: 1001!important;
        background: url(../../assets/images/bst-left-sidebarbg.jpg) repeat-y;
    }
    
    .bst-left-sidebar ul li {
        cursor: pointer;
        margin-top: 10px;
        line-height: 49px;
        color: #ccc;
        text-align: center;
    }
    
    .bst-left-sidebar ul li.active,
    .bst-left-sidebar ul li:hover {
        background: #FFF;
        color: #333333;
        font-weight: 900;
    }
</style>