<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" >
        <div class="bst-banner-content" 
        v-show="drag.isShow"
        :class="{'ordinary-banner':isNormal,'public-banner':isPublic,'system-banner':isSys}"
        :dragIndex="dragIndex"
        :style="[
        {height:isSys?'auto':drag.settings.styles.height},
        {borderTop:drag.settings.background.out['border-top']},
        {borderBottom:drag.settings.background.out['border-bottom']},
        {backgroundImage:drag.settings.background.out['background-image']},
        {backgroundColor:drag.settings.background.out['background-color']},
        {backgroundPosition:drag.settings.background.out['background-position']},
        {backgroundRepeat:drag.settings.background.out['background-repeat']},
        {backgroundSize:drag.settings.background.out['background-size']}
        ]" @click="setBannerIndex">
            <div class="banner-content-inside"
                :dragIndex="dragIndex"
                :style="[
                {width:drag.isFull?'100%':websiteInfo.pageWidth},
                {backgroundImage:drag.settings.background.in['background-image']},
                {backgroundColor:drag.settings.background.in['background-color']},
                {backgroundPosition:drag.settings.background.in['background-position']},
                {backgroundRepeat:drag.settings.background.in['background-repeat']},
                {backgroundSize:drag.settings.background.in['background-size']}
                ]">
                <component
                    v-for="(slotModule,index) in drag.slotModeules"
                    :key="slotModule.moduleId"
                    :module="slotModule"
                    :dragIndex="dragIndex"
                    :container = "container"
                    :slotModuleIndex="index"
                    :is="slotModule.moduleName">
                </component>
                <div class="drag-tips" v-if="drag.slotModeules.length === 0">请添加模块</div>
            </div>
            <div class="banner-content-set" :class="isTransverse">
                <ul>
                    <li v-if="setShow" @click="openBanSet"><span class="setIcon"></span>设置</li>
                    <li v-if="publicShow" @click="openPubSet"><span class="setpublicIcon"></span>公共</li>
                    <li v-if="!isBannermake" @click="move(dragIndex,'up')"><span class="setTotopIcon"></span>上移</li>
                    <li v-if="!isBannermake"  @click="move(dragIndex,'down')"><span class="setToButtomIcon"></span>下移</li>
                    <li v-if="copyShow" @click="copy"><span class="copyIcon"></span>复制</li>
                    <li v-if="deleteShow" @click="removeBannerItem(dragIndex)"><span class="delIcon"></span>删除</li>
                </ul>
            </div>
            <div class="pubBlack" v-if="isPublic && maskShow">
                <div class="pubBlack-inner">
                    <p>公共通栏</p>
                    <button class="openEdit" @click="open">开启编辑模式</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {
        any2Px
    } from "bUtils";
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    //接口url
    import {
        getModuleData,
        addBlankBanner
    } from 'ajaxAPI';

    import picture from '../picture/picture.vue';
    import blank from '../blank/blank.vue';
    import menubase from '../menubase/menubase.vue';
    import word from '../word/word.vue';
    import bannerCarousel from '../bannerCarousel/bannerCarousel.vue';
    import list from '../list/list.vue';
    import atlasX from '../atlas/atlasX/atlasX.vue'
    import atlasXData from '../atlas/atlasXData/atlasXData.vue'
    import atlasY from '../atlas/atlasY/atlasY.vue'
    import atlasScale from '../atlas/atlasScale/atlasScale.vue'
    import atlasScaleData from '../atlas/atlasScaleData/atlasScaleData.vue'
    import atlasPiano from '../atlas/atlasPiano/atlasPiano.vue'
    import product from '../product/product.vue'
    import bannerCom from '../bannerCom/bannerCom.vue'
    import horizontalline from '../line/horizontalline/horizontalline.vue'
    import verticalline from '../line/verticalline/verticalline.vue'
    import detail from '../details/details.vue'
    import caseDetail from '../details/details.vue'
    import articleDetail from '../details/details.vue'
    export default {
        name: 'drag',
        props: {
            container: String,
            drag: Object,
            dragIndex: null
        },
        components: {
            picture,
            blank,
            menubase,
            word,
            bannerCarousel,
            list,
            atlasX,
            atlasY,
            atlasXData,
            atlasScale,
            atlasScaleData,
            atlasPiano,
            product,
            bannerCom,
            horizontalline,
            verticalline,
            detail,
            caseDetail,
            articleDetail
        },
        computed: {
            ...mapGetters([
                'websiteInfo',
                'pageInfo',
                'layouts',
                'getModuleData',
                'getSelectBanner'
            ]),
            //是否为正常通栏
            isNormal() {
                return this.drag.type === 'normal';
            },
            //是否为公共通栏
            isPublic() {
                return this.drag.type === 'public';
            },
            //是否为系统通栏
            isSys() {
                return this.drag.type === 'system';
            },
            // 是否为通栏制作
            isBannermake() {
                return this.$route.params.siteMode === 'bannerMake';
            },
            //是否显示设置项
            setShow() {
                return this.isNormal || this.isSys || this.isPublic && !this.maskShow;
            },
            // 是否显示设置公共
            publicShow() {
                return this.isBannermake ? false : this.isNormal || this.isPublic && !this.maskShow;
            },
            //是否显示复制
            copyShow() {
                return this.isBannermake ? false : !this.isSys;
            },
            //是否显示删除
            deleteShow() {
                return this.isBannermake ? false : this.isNormal || this.isPublic && !this.maskShow;
            },
            // 是否显示横向设置按钮
            isTransverse() {
                return parseInt(this.drag.settings.styles.height) < 130 ? 'smallP' : '';
            }
        },
        data() {
            return {
                maskShow: true, //是否显示遮罩
            }
        },
        methods: {
            ...mapActions([
                'switchBanner',
                'modifyBannerData',
                'addModuleToLayouts',
                'removeBanner',
                'moveUpBanner',
                'moveDownBanner',
                'openBannerSet',
                'openPublicSet',
                'pasteModuleToLayouts',
                'deleteOldAndAddNew',
                'addBanner',
                'getSettingInfo'
            ]),
            // 通栏上移,下移
            move(index, direction, limit = 1) {
                /**
                 * index：当前通栏的下标
                 * 
                 *  direction:移动方向(上－'up',下－'down')
                 * 
                 * limit:默认值1
                 *      如果想上移到第二个位置的时候不能在上移，就传入2
                 *      如果想下移到最后第二个位置不能下移，就传入2
                 * **/
                // 上移
                if (direction === 'up') {
                    // 如果是极限值，上移的时候给出提示
                    if (index > limit - 1) {
                        this.moveUpBanner(index)
                    } else {
                        this.$message({
                            message: '上面有一道不可逾越的鸿沟！',
                            type: 'warning'
                        });
                    }
                } else {
                    // 下移
                    //如果是最后一个通栏，下移时给出提示
                    if (index < this.pageInfo.layouts.length - limit) {
                        this.moveDownBanner(index)
                    } else {
                        this.$message({
                            message: '下面有一道不可逾越的鸿沟!',
                            type: 'warning'
                        });
                    }
                }
            },
            // 公告模块开启编辑
            open() {
                this.$confirm('这是一个公共通栏，可能由多个页面公用，任何修改或删除操作会对所有页面产生作用', '提示', {
                    confirmButtonText: '确认开启',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.maskShow = false
                });
            },
            //通栏设置
            openBanSet() {
                this.switchBanner(this.dragIndex);
                this.openBannerSet();
            },
            //通栏设置公共
            openPubSet() {
                this.switchBanner(this.dragIndex);
                this.openPublicSet('public');
            },
            // 通栏复制
            copy() {
                this.switchBanner(this.dragIndex);
                this.openPublicSet('copy');
            },
            removeBannerItem(index) {
                this.$confirm('确定删除此通栏?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.removeBanner(index)
                });
            },
            setBannerIndex() {
                this.switchBanner(this.dragIndex);
                let setting = {
                    width: 'NaN',
                    height: parseInt(this.getSelectBanner.settings.styles.height),
                    left: 'NaN',
                    top: 'NaN'
                }
                this.getSettingInfo(setting);

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
            }

        },
        mounted: function() {
            let _this = this;
            $(this.$el).droppable({
                greedy: true,
                hoverClass: "bst-reception-hover",
                accept: ".draggle-module", //设置可接收元素的类型
                tolerance: "pointer",
                //完成拖入后的回调,通栏中拖动添加子模块
                drop: function(event, ui) {
                    let isNew = !!$(ui.helper).attr("data-base");
                    //拖入时候判断一下是不是可拖入通栏（系统通栏不可拖入模块，如产品列表通栏等）
                    if (_this.isNormal || (_this.isPublic && !_this.maskShow)) {
                        //拖入通栏的Key
                        let dragKey = $(event.target).attr("arrIndex");
                        //模块json的key,用来向后端请求对应模块数据
                        let jsonKey = $(ui.helper).attr("jsonkey");
                        // 接收元素时判断，有两种情况：
                        // 1.从左侧栏拖入新的模块，
                        // 2.拖动页面上已经添加的模块,已经添加的模块在drag时候已经做过处理，所以无需操作
                        // 添加新模块到指定通栏
                        if (isNew) {
                            // 从服务器请求对应模块，添加到layouts中
                            let slotModeules = _this.layouts[dragKey].slotModeules;
                            let zIndexArr = [];
                            if (slotModeules.length) {
                                $(slotModeules).each(function(i, v) {
                                    zIndexArr.push(v.$styles.container['z-index'])
                                })
                                zIndexArr.sort(function(a, b) {
                                    return a - b;
                                })
                            }
                            getModuleData(_this, {
                                moduleid: jsonKey,
                                siteid: _this.websiteInfo.siteid
                            }, function(response) {
                                if (response.err_code === 0) {
                                    let mData = response.module;
                                    mData.nid = !!response.nid ? response.nid : ""; //这玩意只有导航模块需要，暂时都给加上了，以后要优化掉！
                                    let mDataWidth = 0;
                                    if (mData.$styles.container['width']) {
                                        mDataWidth = parseInt(mData.$styles.container['width']) //获取模块宽度
                                    }
                                    // 如果是横幅，则默认带上通栏一起出来,现在先用两次请求来组合，后续要修改
                                    if (mData.moduleName.indexOf("bannerC") !== -1) {
                                        let isFull = mData.moduleName === 'bannerCom';
                                        let index = parseInt(dragKey) + 1;
                                        _this.addBannerC(isFull, 'normal', mData, index);
                                    } else {
                                        //减去鼠标在模块上的偏移值，之前存储在body的data上
                                        let reduceData = $("body").data("offset");
                                        let reduceX = reduceData.x;
                                        let reduceY = reduceData.y;
                                        let left = event.pageX - $(event.target).find(".banner-content-inside").offset().left - reduceX;
                                        let top = event.pageY - $(event.target).offset().top - reduceY;
                                        //阻止模块拖出超出内部通栏
                                        if (left < 0) {
                                            left = 0 //左边贴边
                                        } else if (left + mDataWidth > $(event.target).find(".banner-content-inside").width()) {
                                            left = $(event.target).find(".banner-content-inside").width() - mDataWidth //右边贴边
                                        }
                                        top = top < 0 ? 0 : top;
                                        mData.$styles.container.left = any2Px(left);
                                        mData.$styles.container.top = any2Px(top);
                                        if (zIndexArr.length > 0) {
                                            mData.$styles.container["z-index"] = zIndexArr[zIndexArr.length - 1] + 1
                                        } else {
                                            mData.$styles.container["z-index"] = 1;
                                        }
                                        // 调用添加模块到通栏action
                                        _this.addModuleToLayouts({
                                            dragKey: dragKey,
                                            moduleData: mData
                                        });
                                    }
                                } else {
                                    _this.$message.error(response.msg);
                                    //_this.$message.error('网络繁忙，请稍后再试！');
                                }
                            });
                        } else {
                            // 这里是页面上现有模块拖拽处理
                            let dragModule = '#' + $(ui.helper[0]).attr("id");
                            // 如果在拖入通栏中找到这个拖动的模块，说明是在本通栏中的拖动，不做任何处理，位置跟新在commonEvebtInit.js的stop钩子中统一处理了
                            if ($(event.target).find(dragModule).length > 0) {
                                return false;
                            } else {
                                // 这里是跨通栏拖动模块处理逻辑
                                // 判断通栏是否为可拖入通栏1.普通通栏，2.开启编辑的公共通栏
                                // 如果是系统通栏或者是没开启编辑的公共通栏就提示不能拖入
                                if (_this.isSys) {
                                    _this.$message.error('系统通栏不能添加自定义模块！');
                                } else if (_this.isPublic && _this.maskShow) {
                                    _this.$message.error('请开启编辑模式！');
                                } else {
                                    // 获得当前模块的下标
                                    let toContIndex = $(event.target).attr("dragindex");
                                    let moduleData = _.cloneDeep(_this.getModuleData);
                                    //获取模块的宽度，高度
                                    let mDataWidth = 0,
                                        mDataHeight = 0;
                                    if (moduleData.$styles.container['width']) {
                                        mDataWidth = parseInt(moduleData.$styles.container['width']);
                                        mDataHeight = parseInt(moduleData.$styles.container['height']);
                                    }

                                    //减去鼠标在模块上的偏移值，之前存储在body的data上
                                    let reduceData = $("body").data("offset");
                                    let reduceX = reduceData.x;
                                    let reduceY = reduceData.y;

                                    // 拖入位置鼠标在模块上的话，就要获取模块的left,top再加上模块的offset
                                    let left, top, bannerContent;

                                    // -webkit内核处理逻辑
                                    if (event.toElement) {
                                        if ($(event.toElement).hasClass("banner-content-inside")) {
                                            bannerContent = $(event.toElement);
                                            left = event.offsetX - reduceX < 0 ? 0 : event.offsetX - reduceX;
                                            top = event.offsetY - reduceY < 0 ? 0 : event.offsetY - reduceY;
                                        } else {
                                            let hoverModule = $(event.toElement).hasClass("bst-module") ? $(event.toElement) : $($(event.toElement).parents(".bst-module"));
                                            bannerContent = hoverModule.parents(".banner-content-inside");
                                            let moduleLeft = parseInt(hoverModule.css('left'));
                                            let moduleTop = parseInt(hoverModule.css('top'));
                                            left = event.offsetX + moduleLeft - reduceX < 0 ? 0 : event.offsetX + moduleLeft - reduceX;
                                            top = event.offsetY + moduleTop - reduceY < 0 ? 0 : event.offsetY + moduleTop - reduceY;
                                        }
                                    } else {
                                        // 火狐处理逻辑
                                        bannerContent = $(event.target).find(".banner-content-inside");
                                        left = event.offsetX < 0 ? 0 : event.offsetX;
                                        top = event.offsetY < 0 ? 0 : event.offsetY;
                                    }

                                    // 如果模块的top+模块的高度 > 通栏的高度，则然模块贴着底边
                                    if (top + mDataHeight > bannerContent.height()) {
                                        top = bannerContent.height() - mDataHeight;
                                    }
                                    // 如果模块的left + 模块宽度 > mDataWidth, 则让模块贴右边
                                    if (left + mDataWidth > bannerContent.width()) {
                                        left = bannerContent.width() - mDataWidth;
                                    }

                                    moduleData.$styles.container.left = any2Px(left);
                                    moduleData.$styles.container.top = any2Px(top);

                                    //测试的的的
                                    // alert('左:' + moduleData.$styles.container.left + '上:' + moduleData.$styles.container.top);
                                    // console.log(state.pageInfo.layouts[payload.dragKey].slotModeules[newModuleKey].$styles.container.left);
                                    // console.log(state.pageInfo.layouts[payload.dragKey].slotModeules[newModuleKey].$styles.container.top)

                                    // 删除掉旧的模块,添加到新的通栏中
                                    _this.deleteOldAndAddNew({
                                        dragKey: toContIndex,
                                        moduleData: moduleData
                                    });
                                }
                            }
                        }
                    } else {
                        if (_this.isPublic && _this.maskShow) {
                            _this.$message.error('请先开启编辑模式!');
                        } else {
                            _this.$message.error('系统通栏不能添加自定义模块！');
                        }
                    }
                }
            }).resizable({
                handles: "s",
                resize: function(event, ui) {
                    let setting = {
                        width: 'NaN',
                        height: ui.size.height,
                        left: 'NaN',
                        top: 'NaN',
                    }
                    _this.getSettingInfo(setting);
                },
                stop: function(event, ui) {
                    //把拖动结束后，通栏的高度获取出来
                    _this.drag.settings.styles.height = any2Px(ui.size.height);
                    //更新数据到状态机
                    _this.modifyBannerData({
                        dragKey: _this.dragIndex,
                        data: _this.drag
                    });
                }
            }).smartMenu([
                [{
                    text: "粘贴",
                    func: function() {
                        _this.pasteModuleToLayouts($(_this.$el).attr('dragindex'));
                    }
                }]
            ], {
                beforeShow: function() {

                }
            });
        }
    }
</script>

<style>
    .drag-tips {
        width: 100px;
        height: 100px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    
    .bst-banner-content {
        /*border: 1px solid transparent;*/
        height: 300px;
    }
    
    .system-banner:hover {
        box-shadow: 0 0 0 1px #95c62d inset;
    }
    
    .system-module:hover {
        border: dashed 1px #95c62d;
    }
    
    .ordinary-banner:hover {
        box-shadow: 0 0 0 1px #27a0fd inset;
        /*border: 1px solid #27a0fd;*/
        /*border-color: #27a0fd;*/
    }
    
    .public-banner:hover {
        box-shadow: 0 0 0 1px #febd58 inset;
    }
    
    .public-banner:hover .pubBlack {
        display: block;
    }
    
    .banner-content-inside {
        height: 100%;
    }
    
    .hideV {
        overflow-y: hidden!important;
    }
    
    @-webkit-keyframes bannerpulse {
        from {
            -webkit-box-shadow: 0 0 5px #bbb;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
            z-index: 100000;
        }
        50% {
            -webkit-box-shadow: 0 0 10px red;
            -webkit-transform: scale3d(1.05, 1.05, 1.05);
            transform: scale3d(1.05, 1.05, 1.05);
            z-index: 100000;
        }
        to {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
            z-index: auto;
        }
    }
    
    @keyframes bannerpulse {
        from {
            -webkit-box-shadow: 0 0 5px #bbb;
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
            z-index: 100000;
        }
        50% {
            -webkit-box-shadow: 0 0 10px red;
            -webkit-transform: scale3d(1.05, 1.05, 1.05);
            transform: scale3d(1.05, 1.05, 1.05);
            z-index: 100000;
        }
        to {
            -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
            z-index: auto;
        }
    }
    
    .pulse {
        -webkit-animation-name: bannerpulse;
        animation-name: bannerpulse;
    }
    
    .pubBlack {
        height: 100%;
        width: 100%;
        display: none;
        position: absolute;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
    }
    
    .pubBlack-inner {
        width: 182px;
        height: 66px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -33px 0 0 -91px;
        color: #fff;
        font-size: 14px;
        text-align: center;
    }
    
    .openEdit {
        background: #13ce66;
        line-height: 36px;
        border: none;
        cursor: pointer;
        width: 100%;
        color: #fff;
    }
</style>