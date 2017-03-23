<template>
    <div class="loading-content" v-loading.fullscreen.lock="pageLoading" element-loading-text="正在准备您的模板，请耐心等待。">
        <!--顶部栏-->
        <top-bar></top-bar>
        <!--左侧栏-->
        <left-bar></left-bar>
        <div class="bst-mian-contnet" @click="closeAll()">
            <div class="bst-main-view" id="bst-main-view">
                <drag v-for="(drag,index) in pageInfo.layouts" :container="'layouts'" :drag="drag" :dragIndex="index" :arrIndex="index"></drag>
            </div>
            <!--模块设置工具条-->
            <tool-bar></tool-bar>
            <!--模块设置工具条-->
        </div>
        <float-container v-if="!!pageInfo.floatModules && pageInfo.floatModules.length>0" :drag="pageInfo.floatModules[0]" :container="'floatModules'" :floatIndex="0"></float-container>
        <!--模块设置面板-->
        <transition enter-active-class="animated fadeIn">
            <div class="bst-cover-content" v-if="moduleSetDate.ishide">
                <div class="moduleSetBox" v-draggable>
                <h3 class="moduleSetBox-header">设置<i class="el-icon-close closeSet" @click="closeModuleSet"></i></h3>
                <component :is="moduleSetDate.setName"></component>
                </div>
            </div>
        </transition>
        <!--模块设置面板-->
        <!--链接面板-->
        <transition enter-active-class="animated bounceInDown">
            <div class="moduleSetBox" v-if="linkSetData.ishide" v-draggable>
                <h3 class="moduleSetBox-header">设置链接<i class="el-icon-close closeSet" @click="closeLinkPane"></i></h3>
                <linkPane></linkPane>
            </div>
        </transition>
        <!--链接面板-->
        <!--图片上传模版-->
        <img-upload v-if="imgUpload.ishide"></img-upload>
        <!--图片上传模版--> 
        <!--页面设置-->
        <setting-pane></setting-pane>
         <!--页面设置-->
    </div>
    
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    //接口url
    import {
        checkLogin,
        getModuleList,
        getModuleData,
        addBlankBanner
    } from 'ajaxAPI';
    import {
        hotKeysInit
    } from '../methods/common/hotKeysInit'

    import imgUpload from '../components/publicmodules/imgupload.vue';
    import drag from 'components/drag/drag.vue';
    import toolBar from 'components/publicmodules/toolbar.vue';
    import leftBar from 'components/publicmodules/leftbar.vue';
    import topBar from 'components/publicmodules/topbar.vue';
    import moduleEdit from 'components/publicmodules/moduleEdit.vue';
    import dataEdit from 'components/publicmodules/dataEdit.vue';


    /*==================模块设置组件======================*/
    import mapViewSet from 'components/moduleSets/mapViewSet.vue';
    import pictureSet from 'components/moduleSets/pictureSet.vue';
    import blankSet from 'components/moduleSets/blankSet.vue';
    import wordSet from 'components/moduleSets/wordSet.vue';
    import menuSet from 'components/moduleSets/menuSet.vue';
    import linkPane from 'components/moduleSets/linkpane.vue'; //设置链接面板
    import addNav from 'components/moduleSets/addnav.vue'; //新增导航栏目面板
    import editNav from 'components/moduleSets/editnav.vue'; //设置链接面板
    import atlasSet from 'components/moduleSets/atlasSet.vue';
    import atlasScaleSet from 'components/moduleSets/atlasScaleSet.vue';
    import productSet from 'components/moduleSets/productSet.vue';
    import bannercarouselSet from 'components/moduleSets/bannerCarouselSet.vue';
    import atlasPianoSet from 'components/moduleSets/atlasPianoSet.vue'; //手风琴图册设置
    import horizontallineSet from 'components/moduleSets/horizontallineSet.vue';
    import verticallineSet from 'components/moduleSets/verticallineSet.vue';
    import serviceSet from 'components/moduleSets/serviceSet.vue';
    import settingPane from 'components/publicmodules/settingPane.vue';
    import bannerPositionSet from 'components/moduleSets/bannerPositionSet.vue';
    import floatContainer from 'components/floatcontainer/floatcontainer.vue'
    import system from 'components/system/system.vue'
    import backToTopSet from 'components/publicmodules/spareParts/backToTopSet.vue';
    import guestbookSet from 'components/moduleSets/guestbookSet.vue';
    /*====================================================*/

    export default {
        name: 'main',
        components: {
            imgUpload,
            leftBar,
            toolBar,
            topBar,
            moduleEdit,
            dataEdit,
            linkPane,
            drag,
            pictureSet,
            blankSet,
            wordSet,
            menuSet,
            addNav,
            editNav,
            atlasSet,
            atlasScaleSet,
            productSet,
            bannercarouselSet,
            atlasPianoSet,
            horizontallineSet,
            verticallineSet,
            serviceSet,
            floatContainer,
            settingPane,
            bannerPositionSet,
            backToTopSet,
            system,
            mapViewSet,
            guestbookSet
        },
        data() {
            return {
                aaa: true,
                bbb: false
            }
        },
        computed: {
            ...mapGetters([
                'pageLoading',
                'pageInfo',
                'websiteInfo',
                'moduleSetDate',
                'imgUpload',
                'linkSetData',
                'getDragKey',
                'selectModule',
                'getModuleData',
                'snapShots'
            ]),
            pageManageShow() {
                return this.$route.params.siteMode != 'bannerMake';
            },
            addBannerShow() {
                return this.$route.params.siteMode != 'bannerMake';
            }
        },
        watch: {
            '$route': function() {
                this.getMainDataInfo()
            }
        },
        methods: {
            ...mapActions([
                'closeAll',
                'getAllDrags',
                'closeModuleSet',
                'setWebsiteData',
                'setModuleList',
                'setLoading',
                'removeLoading',
                'closeLinkSet',
                'pasteModuleToLayouts',
                'deleteModule',
                'setModuleCopy',
                'modifyModuleStyle',
                'closeToolbar',
                'addBanner'
            ]),
            closeLinkPane() {
                this.closeLinkSet();
                document.selection && document.selection.empty && (document.selection.empty(), 1) ||
                    window.getSelection && window.getSelection().removeAllRanges();
            },
            //添加空白通栏
            addBannerC(full, type, module, index) {
                let _this = this;
                let params = {
                    modulename: 'testColumn',
                    isfull: full,
                    type: type ? type : 'normal'
                }
                addBlankBanner(this, params, function(response) {
                    let dragData = response.info;
                    dragData.slotModeules.push(module);
                    _this.addBanner({
                        drag: dragData,
                        index: index
                    });

                });
                let docHeight = $(document).height();
                $('body,html').animate({
                    scrollTop: docHeight
                }, 300);
            },
            getMainDataInfo() {
                this.setLoading();
                let _this = this;
                // 登陆验证
                checkLogin(_this, {
                    siteid: this.$route.params.siteid,
                    columnid: parseInt(this.$route.params.columnid),
                    memberid: this.$route.params.memberid,
                    pageid: this.$route.params.pageid
                }, function(response) {
                    if (response.err_code === 0) {
                        // let n = 1;
                        // response.content[2].slotModeules.forEach(function(el) {
                        //     el.$styles.container['z-index'] = n;
                        //     n++;
                        // })
                        // console.log(response)
                        // response.content = [];

                        // 成功时保存下用户站点信息
                        _this.setWebsiteData(response);
                        // 请求权限内模块信息
                        getModuleList(_this, function(response1) {
                            if (response.err_code === 0) {
                                _this.setModuleList(response1.list);
                                _this.closeAll();
                                //去除loading遮罩
                                _this.removeLoading();
                            }
                        });
                    } else {
                        _this.removeLoading();
                        _this.$alert(response.msg, {
                            confirmButtonText: '确定',
                            callback: action => {
                                window.location.href = response.url;
                            }
                        });
                    }
                });
            }
        },
        created() {
            this.getMainDataInfo();
        },
        mounted() {
            let _this = this;
            hotKeysInit(_this);

            // 给app也添加一个drop事件，用来接收横幅的拖拽
            $('#app').droppable({
                accept: ".draggle-module", //设置可接收元素的类型
                tolerance: "pointer",
                drop: function(event, ui) {
                    let jsonKey = $(ui.helper).attr("jsonkey");
                    let targetAttr = $(ui.helper[0]).attr("isBanner") || '';
                    if (targetAttr.indexOf('banner') !== -1) {
                        getModuleData(_this, {
                            moduleid: jsonKey,
                            siteid: _this.websiteInfo.siteid
                        }, function(response) {
                            let mData = response.module;
                            let isFull = mData.moduleName === 'bannerCom';
                            mData.nid = !!response.nid ? response.nid : ""; //这玩意只有导航模块需要，暂时都给加上了，以后要优化掉！
                            _this.addBannerC(isFull, 'normal', mData);
                        });
                    } else {
                        _this.$message({
                            showClose: true,
                            message: '请先添加通栏!',
                            type: 'warning'
                        });
                    }
                }
            });

            // window.onbeforeunload = function(e) {
            //     var message = '您输入的内容尚未保存，确定离开此页面吗？' //设定提示消息
            //     if ('Netscape' == navigator.appName) return e.preventDefault(), message //针对Netscape内核的提示方式,阻止默认动作 後返回提示消息即可
            //     window.event.returnValue = message //针对IE等的提示方式
            // }
        }
    }
</script>

<style>
    .loading-content {
        min-height: 100%;
    }
    
    .bst-cover-content {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1500;
    }
    
     ::-webkit-scrollbar {
        width: 3px;
    }
    /* Track */
    
     ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        -webkit-border-radius: 100px;
        border-radius: 100px;
    }
    /* Handle */
    
     ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 100px;
        border-radius: 100px;
        background: rgba(0, 0, 0, 0.8);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    
     ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255, 0, 0, 0.4);
    }
    
    .moduleSetBox {
        width: 800px;
        position: fixed;
        top: 15%;
        left: 50%;
        margin-left: -400px;
        background: #fff;
        border: solid 1px #d3dce6;
        padding: 0 15px 15px;
        z-index: 1600;
    }
    
    .moduleSetBox-header {
        height: 40px;
        line-height: 40px;
        cursor: move;
    }
    
    .moduleSetBox .closeSet {
        position: absolute;
        right: 10px;
        top: 14px;
        cursor: pointer;
    }
</style>