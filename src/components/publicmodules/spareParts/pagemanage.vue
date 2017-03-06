<template>
    <div class="page-manage-content fl" v-if="!isBannerMake">
        <div class="active-page" @click="togglePageViews"><span class="active-page-name">{{ pageInfo.pageName }}</span><i class="el-icon-arrow-down"></i></div>
        <i class="el-icon-plus add-page-button" @click="openAddPage"></i>
        <add-page :list="pageTypeList"></add-page>
        <page-views v-if="pageManageInfo.ishide"></page-views>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    //接口url
    import {
        getPageList,
        getPageType
    } from 'ajaxAPI';

    import addPage from './addpage.vue';
    import pageViews from '../spareParts/pageviews.vue';
    export default {
        components: {
            addPage,
            pageViews
        },
        computed: {
            ...mapGetters([
                'pageInfo',
                'pageManageInfo'
            ]),
            // 是否为通栏制作
            isBannerMake() {
                return this.$route.params.siteMode === 'bannerMake';
            }
        },
        methods: {
            ...mapActions([
                'openPageManagePanel',
                'closePageManagePanel',
                'openAddPagePanel',
                'closeAddPagePanel'
            ]),
            openAddPage() {
                let _this = this;
                //获取页面类型
                getPageType(_this, {
                    siteid: this.$route.params.siteid,
                    memberid: this.$route.params.memberid
                }, function(response) {
                    _this.pageTypeList = response.list;
                    // 打开页面添加面板
                    _this.openAddPagePanel();
                })
            },
            togglePageViews() {
                let _this = this;
                if (!this.pageManageInfo.ishide) {
                    _this.openPageManagePanel();
                } else {
                    _this.closePageManagePanel();
                }
            }
        },
        data() {
            return {
                selectPage: NaN,
                pageTypeList: [], //页面类型数据
                pageViewList: {
                    privateList: [], //所有页面数据
                    publicList: [] //系统页面数据
                }
            }
        }
    }
</script>

<style>
    .active-page {
        display: inline-block;
        width: 135px;
        height: 28px;
        background-color: #fff;
        color: #1f2d3d;
        text-indent: 10px;
        line-height: 28px;
        cursor: pointer;
        vertical-align: middle;
    }
    
    .active-page i {
        float: right;
        margin-top: 10px;
        margin-right: 4px;
        vertical-align: middle;
    }
    
    .active-page-name {
        float: left;
        width: 98px;
        height: 28px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .add-page-button {
        cursor: pointer;
    }
</style>