<template>
    <el-dialog :title="bannerTitle" v-model="bannerPublic.ishide" size="small">
    <div class="bannerManage">
        <dl class="clearfix">
            <dt class="manage-title">选择页面:</dt>
            <dd class="manage-info">
                <el-select v-model="sList" multiple placeholder="请选择需要添加的页面" size="large" @change="verification">
                    <el-option
                    v-for="item in list"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <!--<el-switch  v-model="sallcheck" on-text="全选" off-text="全不选" on-color="#13ce66" off-color="#ff4949" @change="AllCheck(specialList,ssList,sallcheck)"></el-switch>-->
            </dd>
        </dl>
        <!--<dl class="clearfix">
            <dt class="manage-title">我的页面:</dt>
            <dd class="manage-info">
                <el-select v-model="smList" multiple placeholder="请选择需要添加的页面" size="large">
                    <el-option
                    v-for="item in myList"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-switch  v-model="mallcheck" on-text="全选" off-text="全不选" on-color="#13ce66" off-color="#ff4949" @change="AllCheck(myList,smList,mallcheck)"></el-switch>
            </dd>
        </dl>
        <dl class="clearfix">
            <dt class="manage-title">系统页面:</dt>
            <dd class="manage-info">
                <el-select v-model="ssyList" multiple placeholder="请选择需要添加的页面" size="large">
                    <el-option
                    v-for="item in sysList"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-switch  v-model="syallcheck" on-text="全选" off-text="全不选" on-color="#13ce66" off-color="#ff4949" @change="AllCheck(sysList,ssyList,syallcheck)"></el-switch>
            </dd>
        </dl>-->
        <div class="publicSet-tips" v-if="bannerPublic.mode === 'public'">设置成功后，您可以在”公共通栏”操作栏中管理您的公共通栏</div>
        <div class="publicSet-tips" v-else>复制成功后，您可以在您选择的页面中看到您复制的通栏</div>
       <div slot="footer" class="dialog-footer">
            <el-button @click="closePublicSet">取消</el-button>
            <el-button type="primary" @click="submitData">确定</el-button>
        </div>
    </div>
     </el-dialog>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    //接口url
    import {
        getPageList,
        setBannerPub,
        copyBanner,
        savePage,
        getBannerInfoForPub
    } from 'ajaxAPI';

    export default {
        components: {

        },
        computed: {
            ...mapGetters([
                'pageInfo',
                'websiteInfo',
                'bannerPublic',
                'getSelectBanner'
            ]),
            bannerTitle() {
                if (this.bannerPublic.mode === 'public' && this.getSelectBanner.isPublic) {
                    return '公共通栏设置';
                } else if (this.bannerPublic.mode === 'public' && !this.getSelectBanner.isPublic) {
                    return '设为公共通栏';
                } else if (this.bannerPublic.mode === 'copy') {
                    return '通栏复制';
                }
            }
        },
        methods: {
            ...mapActions([
                'closePublicSet',
                'modifyBannerData'
            ]),
            //全选
            AllCheck(arr1, arr2, isAll) {
                let _this = this;
                if (isAll) {
                    arr1.forEach(function(el) {
                        arr2.push(el.id);
                    });
                } else {
                    arr2.splice(0, arr2.length)
                }
            },
            // 提交选中页面
            submitData() {
                let _this = this;
                let newBannerData = _.clone(this.getSelectBanner)
                    //如果通栏已经保存拥有id
                if (this.getSelectBanner.id) {
                    this.savePageInfo(function() {
                        //设置公共通栏
                        if (_this.bannerPublic.mode === 'public') {
                            setBannerPub(_this, {
                                pageids: _this.sList,
                                columnid: _this.getSelectBanner.id,
                                isPublic: 1
                            }, function(response) {
                                if (response.err_code === 0) {
                                    _this.$message('设置成功！');
                                    _this.closePublicSet();
                                    window.location.reload();
                                } else {
                                    _this.$message(response.msg);
                                }
                            })
                        }
                        //复制通栏 
                        else if (_this.bannerPublic.mode === 'copy') {
                            copyBanner(_this, {
                                columnid: _this.getSelectBanner.id,
                                siteid: _this.$route.params.siteid,
                                pageids: _this.sList
                            }, function(response) {
                                if (response.err_code === 0) {
                                    _this.$message('复制成功！');
                                    _this.closePublicSet();
                                    window.location.reload();
                                } else {
                                    _this.$message(response.msg);
                                }
                            });
                        }
                    });
                }
                //如果通栏还没保存，没有id
                else {
                    this.$confirm('此操作需要先保存页面，是否保存页面后重新操作？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.savePageInfo(function() {
                            window.location.reload();
                        });
                    }).catch(() => {

                    });
                }


            },
            //操作前的保存通栏
            savePageInfo(fun) {
                let _this = this;
                savePage(_this, {
                    pageid: this.pageInfo.pageid,
                    memberid: this.websiteInfo.memberid,
                    siteid: this.websiteInfo.siteid,
                    content: this.pageInfo.layouts,
                    floatModules: this.pageInfo.floatModules,
                    columnid: parseInt(this.$route.params.columnid)
                }, function(response) {
                    if (response.err_code === 0) {
                        fun()
                    } else {
                        _this.$message.error(response.msg);
                    }
                })
            },
            verification(arr) {
                let _this = this;
                if (arr.length === 0) {
                    _this.list.forEach(function(el, index) {
                        if (el.id === _this.$route.params.pageid) {
                            _this.sList.push(el.id);
                            return false
                        }
                    });
                    _this.$message({
                        message: '必须保留一个页面!',
                        type: 'warning'
                    });
                }

            }
        },
        created() {
            let _this = this;
            //区分是获取设置公共还是复制的页面
            let screenKey = '';
            if (this.bannerPublic.mode === 'public') {
                screenKey = "PublicColumn";
            } else if (this.bannerPublic.mode === 'copy') {
                screenKey = "Copy";
            }
            //获取页面列表
            getPageList(this, {
                siteid: this.$route.params.siteid,
                field: [screenKey]
            }, function(response) {
                if (response.err_code === 0) {
                    //插入所有页面数据
                    _this.list = response[screenKey];

                    //如果是公共通栏设置，就把有次通栏的页面都放进已选列表
                    if (_this.bannerPublic.mode === 'public' && _this.getSelectBanner.isPublic) {
                        getBannerInfoForPub(_this, {
                            columnid: _this.getSelectBanner.id,
                            siteid: _this.$route.params.siteid
                        }, function(response) {
                            response.content[0].whitelist.forEach(function(el, index) {
                                _this.sList.push(el);
                            });
                            // _this.sList = response.content[0].whitelist;
                        });
                    } else {
                        //把当前页面先默认添加进去
                        _this.list.forEach(function(el, index) {
                            if (el.id === _this.$route.params.pageid) {
                                _this.sList.push(el.id);
                                return false
                            }
                        });
                    }


                }
            })
        },
        data() {
            return {
                list: [],
                sList: [],
                // specialList: [], //特殊页面
                // ssList: [],
                // sallcheck: false,
                // myList: [], //标准页面列表
                // smList: [],
                // mallcheck: false,
                // sysList: [], //系统页面列表
                // ssyList: [],
                // syallcheck: false,
            }
        }
    }
</script>
<style>
    .el-dialog--small {
        min-width: 740px;
    }
    
    .bannerManage .manage-title {
        width: 70px;
        color: #1f2d3d;
        float: left;
        font-size: 14px;
    }
    
    .bannerManage .manage-info {
        margin-left: 70px;
        font-size: 14px;
    }
    
    .bannerManage .manage-info .el-checkbox {
        margin-left: 15px;
        margin-bottom: 15px;
    }
    
    .bannerManage dl {
        margin-top: 20px;
    }
    
    .bannerManage .publicSet-tips {
        line-height: 28px;
        color: #ff9625;
        text-align: center;
        width: 420px;
        border: solid 1px #fdd899;
        font-size: 14px;
        margin: 10px auto;
        border-radius: 5px;
    }
    
    .manage-btn {
        text-align: center;
        margin-top: 15px;
    }
    
    .el-select {
        display: block;
    }
</style>