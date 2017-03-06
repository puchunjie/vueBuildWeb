<template>
    <el-dialog title="通栏选择" v-model="bannerTplSelect.ishide" size="large" top="5%">
        <dl class="cates">
            <dt>行业分类：</dt>
            <dd>
                <span v-for="item in bannerData.industryList" 
                :class="selectBannerData.industryId === item.id?'active':''"
                @click='changeIndustryId(item.id)'>{{item.name}}</span>
            </dd>
        </dl>
        <dl class="cates">
                <dt>通栏类型：</dt>
                <dd>
                    <span v-for="item in bannerData.bannerCates" 
                    :class="selectBannerData.bannerCateId === item.id?'active':''"
                    @click='changeCateId(item.id)'>{{item.name}}</span>
                </dd>
        </dl>
        <ul class="clearfix banner-list">
            <li v-for="item in bannerTemList" :class="activeId === item.id?'active':''" @click="activeLi(item.id)"
            :style="{'background':'url('+item.pic+') center center /contain no-repeat'}">
                <p>{{ item.moduleName }}</p>
            </li>
        </ul>
        <el-pagination class="text-center"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-count="bannerData.allPage"
           v-if="bannerData.allPage>0">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeBannerTpl">取 消</el-button>
            <el-button type="primary" @click="addblank(false,'normal')">添加空白通栏</el-button>
            <!--<el-button type="primary" @click="addblank(true,'normal')">添加宽屏空白通栏</el-button>-->
            <el-button type="primary" @click="add">确 定</el-button>
         </span>
    </el-dialog>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    //接口url
    import {
        getBannerList,
        getBannerInfo,
        addBlankBanner
    } from 'ajaxAPI';
    import rulerInit from 'rulerInit';
    export default {
        data() {
            return {
                activeId: "", //选中的通栏id
                bannerData: {
                    industryList: [],
                    bannerCates: [],
                    allPage: 0
                },
                bannerTemList: [],
                selectBannerData: {
                    industryId: "0",
                    bannerCateId: "0"
                }
            }
        },
        computed: {
            ...mapGetters([
                'bannerTplSelect',
                'websiteInfo'
            ])
        },
        methods: {
            ...mapActions([
                'closeBannerTpl',
                'addBanner'
            ]),
            activeLi(id) {
                this.activeId = id;
            },
            //添加空白通栏
            addblank(full, type) {
                let _this = this;
                let params = {
                    modulename: 'testColumn',
                    isfull: full,
                    type: type ? type : 'normal'
                }
                addBlankBanner(this, params, function(response) {
                    _this.addBanner({
                        drag: response.info
                    });
                    _this.closeBannerTpl();
                });
                let docHeight = $(document).height();
                $('body,html').animate({
                    scrollTop: docHeight
                }, 300/*,function(){
                    var rgOverlay = !!(document.getElementById("rg-overlay"));
                    if (rgOverlay) {
                        $("#rg-overlay").remove()
                        $('.bst-mian-contnet').removeAttr('style');
                        rulerInit(_this)
                        $('.bst-mian-contnet').css('paddingTop', '57px')
                    }}*/
                );
                
            },
            //添加通栏模版
            add() {
                let _this = this;
                if (_this.activeId != "") {
                    let id = _this.activeId;
                    getBannerInfo(_this, {
                        columnid: id,
                        siteid: _this.$route.params.siteid,
                    }, function(response) {
                        _this.addBanner({
                            drag: response.content[0]
                        });
                        _this.closeBannerTpl();
                        let docHeight = $(document).height();
                        $('body,html').animate({
                            scrollTop: docHeight
                        }, 300/*,function(){
                            var rgOverlay = !!(document.getElementById("rg-overlay"));
                            if (rgOverlay) {
                                $("#rg-overlay").remove()
                                $('.bst-mian-contnet').removeAttr('style');
                                rulerInit(_this)
                                $('.bst-mian-contnet').css('paddingTop', '57px')
                            }}*/
                        );
                    });
                } else {
                    _this.$message({
                        showClose: true,
                        message: '请选择通栏!',
                        type: 'warning'
                    });
                }
            },
            //选择行业
            changeIndustryId(id) {
                let _this = this;
                _this.activeId = "";
                _this.selectBannerData.industryId = id;
                _this.changeList(1)
            },
            //选择通栏类型
            changeCateId(id) {
                let _this = this;
                _this.activeId = "";
                _this.selectBannerData.bannerCateId = id;
                _this.changeList(1)
            },
            //重新获取通栏list
            changeList(pageNum) {
                let _this = this;
                getBannerList(_this, {
                    "industryid": _this.selectBannerData.industryId, //行业类型
                    "cateid": _this.selectBannerData.bannerCateId, //通栏类型
                    "page_size": 8,
                    "page": pageNum
                }, function(response) {
                    if (response.err_code == 0) {
                        _this.bannerTemList = response.list;
                        _this.bannerData.allPage = response.page_count;
                    }

                });
            },
            handleCurrentChange(val) {
                this.changeList(val)
            }
        },
        created() {
            this.bannerData = this.bannerTplSelect.data;
            this.bannerTemList = this.bannerTplSelect.data.bannerTemList;
        }
    }
</script>

<style scoped>
    .el-dialog__body {
        max-height: 600px;
        overflow: hidden;
    }
    
    .banner-list {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    
    .banner-list li {
        width: 23%;
        float: left;
        margin: 0 1% 10px;
        position: relative;
        /*min-height: 100px;*/
        padding-bottom: 10%;
        background-size: contain;
        cursor: pointer;
    }
    
    .banner-list li.active {
        box-sizing: border-box;
        border: 2px solid red;
    }
    
    .banner-list li img {
        width: 100%;
    }
    
    .banner-list li p {
        position: absolute;
        display: block;
        width: 100%;
        bottom: 0;
        text-align: center;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.31);
        margin: 0;
    }
    
    .text-center {
        text-align: center;
    }
</style>