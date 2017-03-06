<template>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated fadeOutDown">
        <ul class="bst-tool-bar" :style="toolSet.position" v-show="toolSet.ishide">
            <li v-for="tool in currentTools()">
                <div class="bst-tool-bar-li" :class="tool.type" @click.stop="tool.fun(thisVm)">
                    <i class="iconfont" :class="tool.icon"></i>
                    <a>{{ tool.name }}</a>
                </div>
                <div v-if="tool.type == 'level'" class="toolbar-layer" :class="tool.type + '-layer'">
                    <p @click="moduleLevel('indexAdd')">上一层</p>
                    <p @click="moduleLevel('indexMinus')">下一层</p>
                    <p @click="moduleLevel('indexTop')">顶层</p>
                    <p @click="moduleLevel('indexBottom')">底层</p>
                </div>
                <div v-if="tool.type == 'hover'" class="toolbar-layer" :class="tool.type + '-layer'">
                    <p @click="setImgHover">设置悬停</p>
                    <p @click="clearImgHover">清除悬停</p>
                </div>
            </li>
        </ul>
     </transition>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    // require('assets/css/moduleSets.css');
    /**!!!!!注册所有的组件工具条到这里!!!!!**/
    import pictureTools from 'components/picture/tools.js';
    import blankTools from 'components/blank/tools.js';
    import menubaseTools from 'components/menubase/tools.js';
    import wordTools from 'components/word/tools.js';
    import atlasXTools from 'components/atlas/atlasX/tools.js';
    import atlasXDataTools from 'components/atlas/atlasXData/tools.js';
    import atlasYTools from 'components/atlas/atlasY/tools.js';
    import atlasScaleTools from 'components/atlas/atlasScale/tools.js';
    import atlasScaleDataTools from 'components/atlas/atlasScaleData/tools.js';
    import productTools from 'components/product/tools.js';
    import atlasPianoTools from 'components/atlas/atlasPiano/tools.js';
    import horizontallineTools from 'components/line/horizontalline/tools.js';
    import verticallineTools from 'components/line/verticalline/tools.js';
    import setLevel from 'setLevel';
    export default {
        name: 'toolbar',
        computed: {
            ...mapGetters([
                'toolSet',
                'layouts',
                'getModuleData',
                'selectModule',
                'getSelectBanner'
            ]),
            thisVm: function() {
                return this
            },
            isBannerMake() {
                return this.$route.params.siteMode === 'bannerMake';
            }

        },
        /*mounted:function(){
            $(this.$el).find("li").hover(function(){
                $(this).find(".toolbar-layer").show();
            },function(){
                $(this).find(".toolbar-layer").hide();
            })
        },*/
        methods: {
            ...mapActions([
                'openModuleSet',
                'closeToolbar',
                'openUpload',
                'deleteModule',
                'modifyBannerModule',
                'setModuleCopy',
                'modifyModuleStyle',
                'modifyModuleZindex',
                'modifyModuleImg',
                'openLinkSet'
            ]),
            currentTools: function() {
                let tools = [];
                if (this.tools[this.toolSet.moduleName]) {
                    tools = _.cloneDeep(this.tools[this.toolSet.moduleName]);
                    if (this.toolSet.moduleName === 'menubase' && this.isBannerMake) {
                        tools.splice(1, 2);
                    }
                    return tools;
                }

            },
            //层级
            moduleLevel: function(type) {
                let _this = this;
                let dragKey = _this.selectModule.keys.dragKey;
                let slotModuleKey = _this.selectModule.keys.slotModuleKey;
                setLevel.setLevelMenu(_this, dragKey, slotModuleKey, type)
                    //_this.IsLevelHide = false;
            },
            //复制
            copyModule() {
                if (this.getModuleData) {
                    let m = _.cloneDeep(this.getModuleData);
                    this.setModuleCopy(m);
                    this.$message('复制成功！');
                } else {
                    this.$message.error('错了哦!');
                }
            },
            // 锁定／解锁
            toggleModuleLock() {
                let $module = $('#' + this.getModuleData.moduleId);
                if ($module.hasClass("frozen")) {
                    $module.draggable("enable").resizable("enable").removeClass("frozen");
                    this.$message('模块已解锁');
                } else {
                    $module.draggable("disable").resizable("disable").addClass("frozen");
                    this.$message('模块已锁定');
                }
            },
            //设置悬停
            setImgHover(){
                this.openUpload({
                    target: 'moduleSet>advancedSetting>imgUrl_1',
                    isBack: false,
                    mode: 'module'
                });
                this.isHoverShow=false;
            },
            clearImgHover(){
                this.modifyModuleImg({
                    target: 'moduleSet>advancedSetting>imgUrl_1',
                    imgUrl: null,
                    isBack: false
                })
                this.$message('清除成功');
                this.isHoverShow=false;
            }
        },
        data() {
            return {
                tools:{
                    blank:blankTools,
                    picture: pictureTools, //注册组件工作条
                    menubase: menubaseTools,
                    word: wordTools,
                    atlasX: atlasXTools,
                    atlasXData: atlasXDataTools,
                    atlasY: atlasYTools,
                    atlasScale: atlasScaleTools,
                    atlasScaleData: atlasScaleDataTools,
                    product: productTools,
                    atlasPiano: atlasPianoTools,
                    horizontalline: horizontallineTools,
                    verticalline: verticallineTools
                },
                IsLevelHide: false,
                isHoverShow:false
            }
        }
    }
</script>

<style>
    .bst-tool-bar {
        position: absolute;
        z-index: 10000;
    }
    
    .bst-tool-bar li {
        position: relative;
        float: left;
    }
    
    .bst-tool-bar-li {
        float: left;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #4f84d5;
        color: #fff;
        margin-left: 10px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .bst-tool-bar li i {
        position: absolute;
        display: block;
        font-size: 20px;
        text-align: center;
        top: 4px;
        -webkit-transition: top .2s;
        -moz-transition: top .2s;
        -ms-transition: top .2s;
        -o-transition: top .2s;
        transition: top .2s;
    }
    
    .bst-tool-bar li a {
        position: absolute;
        display: block;
        width: 30px;
        height: 30px;
        font-size: 12px;
        text-align: center;
        top: 38px;
        -webkit-transition: top .2s;
        -moz-transition: top .2s;
        -ms-transition: top .2s;
        -o-transition: top .2s;
        transition: top .2s;
    }
    
    .bst-tool-bar li.delete:hover {
        background-color: red;
    }
    
    .bst-tool-bar li:hover i {
        top: -34px;
    }
    
    .bst-tool-bar li:hover a {
        top: 8px;
    }

    .bst-tool-bar .toolbar-layer {
        position: absolute;
        top: 42px;
        left: 2px;
        background: #fff;
        width: 72px;
        text-align: center;
        line-height: 30px;
        border-radius: 4px;
        padding: 4px 0;
        box-shadow: 0 0 6px #ccc;
        display: none;
    }

    .bst-tool-bar .toolbar-layer:after {
        position: absolute;
        content: "";
        top: -12px;
        left: 16px;
        height: 0;
        width: 0;
        overflow: hidden;
        border: 6px #fff solid;
        border-color: transparent transparent #fff transparent;
    }

    .bst-tool-bar .toolbar-layer p {
        border-bottom: 1px solid #EBEBEB;
        cursor: pointer;
        color: #333;
        margin: 0;
    }

    .bst-tool-bar .toolbar-layer p:last-child {
        border-bottom: none;
    }

    .bst-tool-bar .toolbar-layer p:hover {
        background-color: #D8F1FF;
    }
    .bst-tool-bar li:hover .toolbar-layer{
        display: block;
    }
</style>