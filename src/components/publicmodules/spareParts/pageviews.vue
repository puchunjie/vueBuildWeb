<template>
    <div class="page-views-content" v-loading.body="loadingHide">
        <el-tabs :active-name="activeName">
            <el-tab-pane label="标准页面" name="all">
                <ul>
                    <li v-for="(item,index) in pageViewData.privateList" :id="item.id" :class="{'active':item.id==pageInfo.pageid}">
                        <router-link :to="getPageTo(item.id)">{{ item.name }}<span v-if="item.isMain==='1'">[唯一]</span></router-link>
                        <router-link class="page-edit" :to="getPageTo(item.id)">管理</router-link>
                        <div class="page-set">
                            <a :href="previewUrl + item.id" target="_blank">预览</a>
                            <span @click="copyP(item.id)">复制</span>
                            <span @click="setP">设置</span>
                            <span v-if="!item.isMain" @click="deleteP(item,index,'privateList')">删除</span>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="系统页面" name="public">
                <ul>
                    <li v-for="(item,index) in pageViewData.publicList" :class="{'active':item.id==pageInfo.pageid}">
                        <router-link :to="getPageTo(item.id)">{{ item.name }}</router-link>
                        <router-link class="page-edit" :to="getPageTo(item.id)">管理</router-link>
                        <div class="page-set">
                            <a :href="previewUrl + item.id" target="_blank">预览</a>
                            <span @click="copyP(item.id)">复制</span>
                            <span @click="setP">设置</span>
                            <span v-if="!item.isMain" @click="deleteP(item,index,'privateList')">删除</span>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    //接口url
    import {
        getPageData,
        deletePage,
        copyPage,
        getPageList
    } from 'ajaxAPI';

    export default {
        props: {
            // pageViewData: Object
        },
        computed: {
            ...mapGetters([
                'pageInfo',
                'pageManageInfo'
            ]),
            //预览
            previewUrl() {
                let siteid = this.$route.params.siteid;
                let pageid = this.$route.params.pageid;
                if (this.$route.params.siteMode === 'templateMake') {
                    return '/site/preview/template/';
                } else {
                    return '/site/preview/' + siteid + '/';
                }
            }
        },
        mounted() {
            this.loadingHide = true;
            let _this = this;
            getPageList(_this, {
                siteid: this.$route.params.siteid,
                field: ['unSysPage', 'SysPage']
            }, function(response) {
                _this.pageViewData.privateList = response.unSysPage;
                _this.pageViewData.publicList = response.SysPage;
                _this.loadingHide = false;
            });
        },
        methods: {
            ...mapActions([
                'setPageData',
                'setLoading',
                'closePageManagePanel',
                'openPageSet',
                'clearModuleCopy'
            ]),
            // 切换页面
            getPageTo(id) {
                this.clearModuleCopy();
                var rgOverlay = !!(document.getElementById("rg-overlay"));
                if (rgOverlay) {
                    $("#rg-overlay").remove()
                }
                return {
                    name: 'main',
                    params: {
                        siteMode: this.$route.params.siteMode,
                        siteid: this.$route.params.siteid,
                        memberid: this.$route.params.memberid,
                        pageid: id
                    }
                }
            },
            // 复制页面
            copyP(id) {
                let _this = this;
                copyPage(this, {
                    siteid: this.$route.params.siteid,
                    pageid: id
                }, function(response) {
                    if (response.err_code === 0) {
                        _this.pageViewData.publicList = response.SysPage;
                        _this.pageViewData.privateList = response.unSysPage;
                        _this.$message('复制成功！');
                    }
                });
            },
            // 删除页面
            deleteP(el, index, key) {
                let _this = this;
                this.$confirm('此操作将永久删除该页面, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deletePage(_this, {
                        siteid: _this.$route.params.siteid,
                        pageid: el.id
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.pageViewData[key].splice(index, 1);
                            //跳转到首页
                            _this.pageViewData.privateList.forEach(function(el) {
                                if (el.isMain) {
                                    _this.setLoading();
                                    getPageData(_this, {
                                        pageid: el.id
                                    }, function(response1) {
                                        _this.$router.push({
                                            name: 'main',
                                            params: {
                                                siteMode: _this.$route.params.siteMode,
                                                siteid: _this.$route.params.siteid,
                                                memberid: _this.$route.params.memberid,
                                                pageid: response1.pageid
                                            }
                                        });
                                        _this.closePageManagePanel();
                                        _this.$message('删除成功');
                                    });
                                    return false
                                }
                            });
                        } else {
                            console.log(response)
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //设置页面
            setP() {
                this.openPageSet();
            }
        },
        data() {
            return {
                activeName: 'all',
                pageViewData: {
                    privateList: [],
                    publicList: []
                },
                loadingHide: true
            }
        }
    }
</script>

<style>
    .page-views-content {
        position: fixed;
        width: 300px;
        top: 37px;
        left: 107px;
        background-color: #fff;
        color: #000;
        border: 1px solid #ddd;
        padding: 10px;
    }
    
    .page-views-content .el-tabs {
        width: 100%;
    }
    
    .page-views-content .el-tabs__content {
        height: 300px;
        overflow-x: hidden!important;
    }
    
    .page-views-content ul li {
        color: #666666;
        padding: 0 16px;
        height: 32px;
        line-height: 32px;
        position: relative;
        border-bottom: 1px solid #eeeeee;
    }
    
    .page-views-content ul li .page-set {
        display: none;
        position: absolute;
        right: 10px;
        top: 0;
    }
    
    .page-views-content ul li a {
        color: #666666;
    }
    /*  .page-views-content ul li:hover {
       background: #f1f3f2;
       border-bottom: none;
   }
   
   .page-views-content ul li .page-set {
       display: none;
       position: absolute;
       right: 0;
       top: 0;
   }
   
   .page-views-content ul li:hover .page-set {
       display: block;
   } */
</style>