<template>
        <div class="left-column">
            <el-tabs v-model="activeName">
                <el-tab-pane label="全部通栏" name="first">
                    <div class="left-column-info">
                        <ul class="columns" v-show="isShow">
                            <draggable :list="pageInfo.layouts">
                                <transition-group>
                                    <li class="col" 
                                    :ref="item.id"
                                    @click.stop.prevent="scrollBanner(index)"
                                    :class="item.type+'-col'" 
                                    v-for="(item,index) in pageInfo.layouts" 
                                    :index="index" 
                                    :key="item.moduleId">
                                        <i class="icon icon-nav"></i>
                                        <div class="bannertitle">
                                            <span class="column-title" @click.stop.prevent="showRename(item,index)">{{ item.name ? item.name : '保存后重命名' }}</span>
                                        </div>
                                        <b class="fr">
                                            <i class="icon icon-public" @click="openPubSet(index)" v-if="item.type !== 'system'"></i>
                                            <i class="icon icon-copy" @click="openCopySet(index)" v-if="item.type !== 'system'"></i>
                                            <i class="icon icon-delete"  @click="removeBannerItem(index)" v-if="item.type !== 'system'"></i>
                                            <i class="icon icon-eyes" @click="hideBannerItem(index)" v-if="item.type === 'normal' && item.isShow"></i>
                                            <i class="icon icon-close-eyes" @click="showBannerItem(index)" v-if="item.type === 'normal' && !item.isShow"></i>    
                                        </b>
                                        <el-input size="mini" placeholder="重命名" v-model="newName" @blur="bannerRename(item,index)"></el-input>
                                    </li>
                                </transition-group>
                            </draggable>
                            <li class="addBanner" @click="addB">+添加通栏</li>
                        </ul>
                    </div>        
                </el-tab-pane>
                <el-tab-pane label="公共通栏" name="second">
                    <div class="left-column-info">
                        <ul class="columns" v-show="isShow">
                            <li class="col" :class="item.type+'-col'" v-for="(item,index) in publicBannerList" :index="index" :key="item.moduleId">
                                <i class="icon icon-nav"></i>
                                <div class="bannertitle">
                                    <span class="column-title">{{ item.name }}</span>
                                </div>
                                <!--<b class="fr">-->
                                    <!--<i class="icon icon-public" @click="openPubSet(index)" v-if="item.type !== 'system'"></i>-->
                                    <!--<i class="icon icon-copy" @click="openCopySet(index)" v-if="item.type !== 'system'"></i>-->
                                    <!--<i class="icon icon-delete"  @click="" v-if="item.type !== 'system'"></i>-->
                                <!--</b>-->
                            </li>
                        </ul>
                    </div> 
                </el-tab-pane>
            </el-tabs>
        </div>    
</template>


<script type="text/ecmascript-6">
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    //接口url
    import {
        getBannerList, //通栏列表
        getIndustryList, //行业分类
        getBannerCates, //通栏分类
        getPublicBannerList, //公共通栏列表
        modifyBannerInfo //修改通栏信息

    } from 'ajaxAPI';

    import draggable from 'vuedraggable';

    export default {
        components: {
            draggable
        },
        computed: {
            ...mapGetters([
                'pageInfo'
            ]),
            // publicBannerList() {
            //     return this.pageInfo.layouts.filter(function(el) {
            //         return el.isPublic;
            //     });
            // }
        },
        data() {
            return {
                activeName: 'first',
                isShow: true,
                bannerData: {},
                newName: '', //通栏重命名
                oldName: '',
                publicBannerList: []
            }
        },
        methods: {
            ...mapActions([
                'switchBanner',
                'addBanner',
                'openBannerTpl',
                'changeBannerPlace',
                'removeBanner',
                'openPublicSet',
                'toggleBanner',
                'modifyBannerData'
            ]),
            viewboxShow(flag) {
                this.isShow = flag;
            },
            // 单击通栏滚动到屏幕当前位置
            scrollBanner(index) {
                let $banner = $($(".bst-banner-content")[index]);
                $(".bst-main-view").addClass("hideV");
                $banner.addClass("pulse animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass("pulse animated");
                    $(".bst-main-view").removeClass("hideV");
                });
                // 获取窗口高度
                let windowHeight = $(window).height();
                // 获取通栏距离浏览器顶部距离
                let bannerToTop = $banner.offset().top;
                //获取通栏高度
                let bannerHeight = $banner.height();
                //获取滚动条距离顶部距离
                let srcollToTop = $banner.scrollTop();
                // 如果有滚动条
                if (bannerToTop + bannerHeight > windowHeight) {
                    let scrollPX = bannerToTop - windowHeight - srcollToTop + bannerHeight;
                    $('body,html').animate({
                        scrollTop: scrollPX
                    }, 300);
                } else {
                    $('body,html').animate({
                        scrollTop: 0
                    }, 300);
                }
            },
            //双击出现修改名字输入框
            showRename(item, index) {
                if (item.name) {
                    let $itemBanner = $(this.$refs[item.id]);
                    this.newName = item.name;
                    this.oldName = item.name;
                    $itemBanner.find(".el-input.el-input--mini").show();
                    $itemBanner.find("input").focus();
                }
            },
            bannerRename(item, index) {
                let _this = this;
                let $itemBanner = $(this.$refs[item.id]);
                if (this.newName !== this.oldName) {
                    modifyBannerInfo(this, {
                        "columnid": item.id,
                        "moduleName": this.newName
                    }, function(response) {
                        if (response.err_code === 0) {
                            // 先获取到当前通栏的数据
                            let bannerData = _.cloneDeep(_this.pageInfo.layouts[index]);
                            bannerData.name = _this.newName;
                            $itemBanner.find(".column-title").html(_this.newName);
                            // 更新通栏信息
                            _this.modifyBannerData({
                                dragKey: index,
                                data: bannerData
                            });
                            _this.newName = '';
                            _this.oldName = '';
                            $itemBanner.find(".el-input.el-input--mini").hide();
                            _this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                        }
                    });
                } else {
                    $itemBanner.find(".el-input.el-input--mini").hide();
                }
            },
            // 打开添加通栏界面
            addB() {
                let _this = this;
                //行业分类
                getIndustryList(_this, function(response1) {
                    if (response1.err_code == 0) {
                        _this.bannerData.industryList = response1.list;
                        //通栏分类
                        getBannerCates(_this, function(response2) {
                            if (response2.err_code == 0) {
                                _this.bannerData.bannerCates = response2.list;
                                //通栏列表
                                getBannerList(this, {
                                    "industryid": "0", //行业类型
                                    "cateid": "0", //通栏类型
                                    "page_size": 8,
                                    "page": 1,
                                    "platform": "PC"
                                }, function(response) {
                                    if (response.err_code == 0) {
                                        _this.bannerData.bannerTemList = response.list;
                                        _this.bannerData.allPage = response.page_count;
                                        // 打开模版列表
                                        _this.openBannerTpl(_this.bannerData);
                                    }
                                });
                            }
                        });
                    }
                });
            },
            //通栏设置公共
            openPubSet(index) {
                this.switchBanner(index);
                this.openPublicSet('public');
            },
            // 复制通栏
            openCopySet(index) {
                this.switchBanner(index);
                this.openPublicSet('copy');
            },
            //删除通栏
            removeBannerItem(index) {
                this.$confirm('确定删除此通栏?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.removeBanner(index);
                });
            },
            // 隐藏通栏
            hideBannerItem(index) {
                this.toggleBanner({
                    index: index,
                    isShow: false
                });
            },
            // 显示通栏
            showBannerItem(index) {
                this.toggleBanner({
                    index: index,
                    isShow: true
                });
            }
        },
        mounted() {
            let _this = this;
            getPublicBannerList(this, {
                siteid: this.$route.params.siteid
            }, function(response) {
                if (response.err_code === 0)
                    _this.publicBannerList = response.list;
            });
        }
    }
</script>
<style>
    /*左侧公共栏*/
    
    .left-column {
        width: 238px;
        margin: 0 auto;
        font-size: 14px;
    }
    
    .left-column-top {
        height: 42px;
        line-height: 42px;
        border-bottom: solid 1px #d5dbe7;
    }
    
    .left-column-top ul li {
        width: 88px;
        float: left;
        text-align: center;
        cursor: pointer;
        color: #8492a6;
    }
    
    .left-column-top ul li.active {
        color: #1ea0fe;
        border-bottom: solid 3px #1ea0fe;
    }
    
    .left-column-info {
        margin-top: 10px;
    }
    
    .left-column-info ul li {
        padding: 0 10px;
        width: 238px!important;
        height: 25px!important;
        line-height: 25px;
        border: solid 1px #cfcfcf;
        border-radius: 5px;
        margin-bottom: 4px;
        background: #fff;
        position: relative;
    }
    
    .left-column-info ul li.public-col {
        border: solid 1px #fb8f33;
        color: #fb8f33;
    }
    
    .left-column-info ul li.system-col {
        border: solid 1px #96c72e;
        color: #96c72e;
    }
    
    .left-column-info ul li .bannertitle {
        font-style: normal;
        width: 110px;
        display: inline-block;
        overflow: hidden;
        height: 25px;
        cursor: pointer;
        vertical-align: middle;
        line-height: 25px;
        font-weight: normal;
        margin-top: -3px;
    }
    
    .left-column-info ul li .bannertitle span {
        display: inline-block;
        max-width: 100%;
        height: 25px;
        overflow: hidden;
    }
    
    .left-column-info ul li.addBanner {
        color: #4d93db;
        border: solid 1px #4d93db;
        text-align: center;
        cursor: pointer;
    }
    
    .left-column-info li .fr {
        font-size: 0;
    }
    
    .left-column-info li .fr .icon {
        cursor: pointer;
    }
    
    .left-column-info .icon {
        width: 17px;
        height: 17px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 2px;
    }
    
    .left-column-info i.icon-ye {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -7px -53px;
    }
    
    .left-column-info i.icon-eyes {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -52px -2px;
    }
    
    .left-column-info i.icon-eyes:hover {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -52px -26px;
    }
    
    .left-column-info i.icon-nav {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -30px -54px;
        cursor: move;
    }
    
    .left-column-info i.icon-close-eyes {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -76px -3px;
    }
    
    .left-column-info i.icon-close-eyes:hover {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -76px -27px;
    }
    
    .left-column-info i.icon-copy {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -3px -3px;
    }
    
    .left-column-info i.icon-copy:hover {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -3px -27px;
    }
    
    .left-column-info i.icon-delete {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -27px -3px;
    }
    
    .left-column-info i.icon-delete:hover {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -27px -27px;
    }
    
    .left-column-info i.icon-public {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -5px -72px;
    }
    
    .left-column-info i.icon-public:hover {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -27px -72px;
    }
    
    .left-column-info ul li.public-col i.icon-nav {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -53px -54px;
    }
    
    .left-column-info ul li.system-col i.icon-nav {
        background: url(../../../assets/images/v3_baseico.png) no-repeat -77px -54px;
    }
    
    .highlight {
        background: #f7e9db;
    }
    
    .left-column-info .el-input.el-input--mini {
        position: absolute!important;
        left: 24px!important;
        top: 0!important;
        width: 120px;
        display: none;
    }
    
    .left-column-info .el-input.el-input--mini input {
        background: #fff!important;
        border: 0!important;
        width: 120px!important;
        font-size: 14px;
    }
</style>