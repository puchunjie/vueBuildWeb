<template>
    <div class="bst-header">
        <div class="bst-logo fl">
            <img src="../../assets/images/logo.png" alt="">
        </div>
        <!--页面管理-->
        <page-manage></page-manage>
        <!--页面管理-->
        <!--模版管理-->
        <div class="fl-bar fl" v-if="isUserMake">
            <a @click="show">模板管理</a>
            <a @click="openWebSet">网站管理</a>
        </div>
        <template-manage v-if="tplMangeHide.is" :ishide="tplMangeHide"></template-manage>
        <!--模版管理-->
        <page-set v-if="pageSet.isShow"></page-set>
        <web-set v-if="webSet.isShow"></web-set>
        <div class="fl-bar fl">
            <a @click="rulerToggle">标尺</a>
            <!-- <a @click="preState"><i class="iconfont">&#xe61c;</i>撤销</a>
        <a @click="postState"><i class="iconfont">&#xe61d;</i>恢复</a> -->
        </div>
        <div class="fl-bar fl">
            <a @click="savePageInfo">保存</a>
            <a :href="previewUrl" target="_blank">预览</a>
            <a @click="doPublish" v-if="isUserMake">发布</a>
            <a @click="showBackups" v-if="isUserMake">还原备份</a>
            <el-dialog title="备份列表" v-model="backupListShow">
                <el-button type="primary" :loading="loading" class="backupBtn" size="small" @click="backup">{{backupText}}</el-button>
                <el-table :data="backupList" height="350">
                    <el-table-column property="version" label="版本" width="150"></el-table-column>
                    <el-table-column property="showtime" label="备份时间"></el-table-column>
                    <el-table-column property="showname" label="描述"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                            <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">还原</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
        <div class="fr" v-if="isUserMake">
            <div class="fl-bar fl">
                <a class="active">pc</a>
                <a>手机</a>
            </div>
            <div class="fl-bar fl">
                <a>建站教程</a>
            </div>
            <div class="fl-bar fl">
                <a>消息</a>
            </div>
        </div>
    </div>
</template>
<script>
//接口url
import {
    savePage,
    publishSite,
    getPublishList,
    rollBack
} from 'ajaxAPI';

import {
    mapGetters,
    mapActions
} from 'vuex';
import coordinate from './spareParts/coordinate.vue';
import pageManage from './spareParts/pagemanage.vue'; //页面管理模块
import templateManage from './spareParts/templatemanage.vue'; //模版管理
import pageSet from './spareParts/pageSet.vue'; //页面设置
import webSet from './spareParts/webSet.vue'; //网站管理
import rulerInit from 'rulerInit'
export default {
    components: {
        coordinate,
        pageManage,
        templateManage,
        pageSet,
        webSet
    },
    computed: {
        ...mapGetters([
            'websiteInfo',
            'pageInfo',
            'preAvailable',
            'postAvailable',
            'pageSet',
            'webSet'
        ]),
        // 是否为用户制作界面
        isUserMake() {
            return this.$route.params.siteMode === 'user';
        },
        //预览
        previewUrl() {
            let siteid = this.$route.params.siteid;
            let pageid = this.$route.params.pageid;
            if (this.$route.params.siteMode === 'templateMake') {
                return '/site/preview/template/' + pageid;
            } else if (this.$route.params.siteMode === 'bannerMake') {
                let columnid = this.$route.params.columnid;
                return '/site/preview/bannerMake/' + columnid;
            } else {
                return '/site/preview/' + siteid + '/' + pageid;
            }
        }
    },
    methods: {
        ...mapActions([
            'undo',
            'redo',
            'openWebSet',
            'setLoading',
            'removeLoading'
        ]),
        savePageInfo() {
            let _this = this;
            savePage(this, {
                pageid: this.$route.params.pageid,
                memberid: this.$route.params.memberid,
                siteid: this.$route.params.siteid,
                content: this.pageInfo.layouts,
                floatModules: this.pageInfo.floatModules,
                columnid: parseInt(this.$route.params.columnid)
            }, function(response) {
                if (response.err_code === 0) {
                    _this.$message({
                        message: response.msg,
                        type: 'success',
                        duration: 500,
                        onClose: function() {
                            location.reload();
                        }
                    });
                } else {
                    _this.$message.error(response.msg);
                }

            })
        },
        preState() {
            if (this.preAvailable) {
                this.undo();
            }
        },
        postState() {
            if (this.postAvailable) {
                this.redo();
            }
        },
        // 打开模版页面
        show() {
            this.tplMangeHide.is = true
        },
        rulerToggle() {
            let _this = this;
            var rgOverlay = !!(document.getElementById("rg-overlay"));
            if (rgOverlay) {
                $("#rg-overlay").remove()
                $('.bst-mian-contnet').removeAttr('style')
            } else {
                rulerInit(_this)
                $('.bst-mian-contnet').css('paddingTop', '57px')
            }
        },
        // 发布
        doPublish() {
            let _this = this;
            this.setLoading();
            publishSite(this, {
                siteid: this.websiteInfo.siteid
            }, function(response) {
                console.log(response);
                if (response.err_code === 0) {
                    _this.removeLoading();
                    _this.$message({
                        message: '恭喜你，这是一条成功消息',
                        type: 'success'
                    });
                } else {
                    _this.$message.error(response.msg);
                }
            });
        },
        showBackups() {
            let _this = this;
            this.backupListShow = true;
            getPublishList(this, {
                siteid: this.websiteInfo.siteid
            }, function(response) {
                _this.backupList = response.list;
            });
        },
        backup() {
            this.loading = true;
            this.backupText = "备份中";
            /*setBackup(this, {
                siteid: this.websiteInfo.siteid
            }, function(response) {
                this.loading=false;
                this.backupText="备份";
            });*/
        },
        // 还原版本
        handleEdit(index, row) {
            rollBack(this, {
                siteid: this.websiteInfo.siteid,
                version: row.version
            }, function(response) {
                console.log(response)
            });
        },
        // 删除版本
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
    mounted: function() {},
    data() {
        return {
            tplMangeHide: {
                is: false
            },
            backupListShow: false, //备份列表显隐
            loading: false,
            backupText: "备份",
            backupList: []
        }
    }
}
</script>
<style>
.bst-header {
    position: fixed;
    left: 0;
    top: 0;
    min-width: 1440px;
    width: 100%;
    z-index: 1400;
    height: 37px;
    background: #1d8ce0;
    color: #fff;
    line-height: 37px !important;
}

.bst-header a {
    color: #ffffff;
    /*vertical-align: middle;*/
}

.fl-bar {
    height: 37px;
}

.fl-bar a {
    height: 37px;
    line-height: 37px !important;
}

.fl-bar .iconfont {
    margin: 0;
    vertical-align: middle;
}

.backupBtn {
    margin-bottom: 10px;
}
</style>
