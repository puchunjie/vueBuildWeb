<template>
    <transition enter-active-class="animated templateDown">
        <div class="templateManagebg" v-show="ishide.is">
            <div class="templateManage-head">
                <div class="templateManage-con">
                    <span class="tt">模板选择</span>
                    <a class="i-closeTemplate" @click="ishide.is = false"></a>
                </div> 
            </div>
            <div class="templateManage">
                <dl class="cates">
                    <dt>行业分类：</dt>
                    <dd>
                        <span v-for="item in industryList" 
                        :class="industryId === item.id?'active':''"
                        @click='randerTempaleList(item.id,1)'>{{item.name}}</span>
                    </dd>
                </dl>
                <ul class="tpl-ul clearfix">
                    <li v-for="(item,index) in list">
                        <img class="pic" :src="!!item.img?item.img:'../../../assets/images/nopic.png'">
                        <div class="i-templateLayer">
                                <a v-bind:href="item.preview" target="_blank" class="i-templateLayer-preview">
                                    <img src="../../../assets/images/i-templateLayer-search.png" >预览
                                </a>
                                <a class="i-templateLayer-install" @click="switchTPL(item.id)">
                                    <img src="../../../assets/images/i-templateLayer-copy.png">安装
                                </a>
                        </div>
                    </li>
                </ul>
                <el-pagination class="text-center"
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange"
                  :page-count="allPage" v-if="allPage>0">
                </el-pagination>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="ishide.is = false">取 消</el-button>
                    <el-button type="primary" @click="switchTPL">确 定</el-button>
                </span> -->
            </div>
        </div>
    </transition>
</template>
<script>
    //接口url
    import {
        getTemplateList,
        switchTpList,
        getIndustryList, //行业分类
    } from 'ajaxAPI';

    import {
        mapGetters,
        mapActions
    } from 'vuex';

    export default {
        props: {
            ishide: Object
        },
        data() {
            return {
                industryList: [],
                list: [],
                industryId: "0",
                allPage: 0
            }
        },
        computed: {
            ...mapGetters([
                'websiteInfo'
            ])
        },
        methods: {
            ...mapActions([
                'setLoading',
                'removeLoading'
            ]),
            switchTPL(cId) {
                let _this = this;
                if (cId && cId != "") {
                    _this.setLoading();
                    switchTpList(this, {
                        templateid: cId,
                        siteid: this.$route.params.siteid
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.removeLoading()
                            _this.$alert('模版切换准备完毕，请点击确定更换模版！', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.replace({
                                        name: 'main',
                                        params: {
                                            siteMode: response.siteMode,
                                            siteid: response.siteid,
                                            memberid: response.memberid,
                                            pageid: response.index_id
                                        }
                                    });
                                    _this.ishide.is = false
                                }
                            });
                        }
                    });
                }
            },

            randerTempaleList(industryid, page) { //点击行业分类切换模板
                let _this = this;
                _this.industryId = industryid;
                _this.getList(1)

            },
            getList(page) {
                let _this = this;
                getTemplateList(_this, {
                    "industryid": _this.industryId,
                    "page_size": 6,
                    "page": page
                }, function(response) {
                    if (response.err_code === 0)
                        _this.list = response.list;
                    _this.allPage = response.page_count;
                });
            },
            handleCurrentChange(val) {
                this.getList(val)
            }
        },
        mounted() {
            let _this = this;

        },
        created() {
            let _this = this;
            getIndustryList(_this, function(response1) {
                if (response1.err_code == 0) {
                    _this.industryList = response1.list;
                }
            });
            _this.randerTempaleList("0", 1)
        }

    }
</script>
<style>
    .templateManagebg {
        width: 100%;
        height: 100%;
        background: #fff;
        position: fixed;
        z-index: 1005;
        left: 0;
        top: 0;
        overflow-y: scroll;
    }
    
    .templateManage-head {
        height: 46px;
        line-height: 46px;
        border-bottom: solid 1px #d7d8ea;
    }
    
    .templateManage-head .templateManage-con {
        width: 1200px;
        height: 46px;
        margin: 0 auto;
    }
    
    .templateManage-head .templateManage-con .tt {
        width: 90px;
        height: 48px;
        float: left;
        text-align: center;
        background: url(../../../assets/images/rapidSite.jpg) no-repeat bottom center;
        color: #1ca6e7;
        font-size: 16px;
    }
    
    .templateManage-head .templateManage-con .i-closeTemplate {
        width: 20px;
        height: 20px;
        margin-top: 13px;
        float: right;
        background: url(../../../assets/images/close.png);
        cursor: pointer;
    }
    
    .templateManage {
        width: 1200px;
        margin: 20px auto 0;
    }
    
    .templateManage .cates dt {
        line-height: 35px;
    }
    
    .templateManage .cates {
        font-size: 14px;
        color: #424d58;
        font-weight: bold;
    }
    
    .templateManage .cates dt {
        float: left;
        line-height: 35px;
        width: 74px;
    }
    
    .templateManage .cates dd {
        margin-left: 74px;
    }
    
    .templateManage .cates dd span {
        display: inline-block;
        padding: 0 8px;
        line-height: 28px;
        margin: 5px 10px;
        cursor: pointer;
    }
    
    .templateManage .cates dd span.active,
    .cates dd span:hover {
        background: #32baf6;
        color: #FFF;
        border-radius: 5px;
    }
    
    .tpl-ul {
        margin-left: -80px;
        margin-bottom: 20px;
    }
    
    .tpl-ul li {
        float: left;
        margin: 10px 0 15px 80px;
        background: url(../../../assets/images/template-libg.jpg) no-repeat left top;
        position: relative;
        width: 320px;
        height: 217px;
        padding-top: 17px;
        overflow: hidden;
    }
    /* .tpl-ul li.active {
    border: 2px solid red;
} */
    
    .tpl-ul li img.pic {
        display: block;
        width: 100%;
    }
    
    .tpl-ul li .i-templateLayer {
        width: 320px;
        height: 200px;
        padding-top: 80px;
        overflow: hidden;
        background: url(../../../assets/images/i-templateLayer.png);
        opacity: 0;
        filter: progid: DXImageTransform.Microsoft.Alpha(opacity=0);
        position: absolute;
        left: 0;
        top: 17px;
        z-index: 100;
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
        font-size: 14px;
        text-align: center;
    }
    
    .tpl-ul li .i-templateLayer a {
        background: #338adc;
        border-radius: 20px;
        padding: 5px 10px;
        color: #FFF;
        margin: 0 10px;
        text-decoration: none;
        cursor: pointer;
    }
    
    .tpl-ul li .i-templateLayer a img {
        vertical-align: middle;
        display: inline-block;
        margin: 0 5px;
    }
    
    .tpl-ul li:hover .i-templateLayer {
        opacity: 1;
        filter: progid: DXImageTransform.Microsoft.Alpha(opacity=100);
    }
    
    .templateManage .text-center {
        text-align: center;
    }
    
    @-webkit-keyframes templateDown {
        from,
        60%,
        75%,
        90%,
        to {
            /* -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); */
        }
        0% {
            opacity: 1;
            -webkit-transform: translate3d(0, -3000px, 0);
            transform: translate3d(0, -3000px, 0);
        }
        60% {
            opacity: 1;
            -webkit-transform: translate3d(0, 25px, 0);
            transform: translate3d(0, 25px, 0);
        }
        /* 75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  } */
        90% {
            -webkit-transform: translate3d(0, 5px, 0);
            transform: translate3d(0, 5px, 0);
        }
        to {
            -webkit-transform: none;
            transform: none;
        }
    }
    
    @keyframes templateDown {
        from,
        60%,
        75%,
        90%,
        to {
            /* -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
       animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);  */
        }
        0% {
            opacity: 1;
            -webkit-transform: translate3d(0, -3000px, 0);
            transform: translate3d(0, -3000px, 0);
        }
        60% {
            opacity: 1;
            -webkit-transform: translate3d(0, 25px, 0);
            transform: translate3d(0, 25px, 0);
        }
        /* 75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  } */
        90% {
            -webkit-transform: translate3d(0, 5px, 0);
            transform: translate3d(0, 5px, 0);
        }
        to {
            -webkit-transform: none;
            transform: none;
        }
    }
    
    .templateDown {
        -webkit-animation-name: templateDown;
        animation-name: templateDown;
    }
    /* .dialog-footer {
    text-align: center;
} */
</style>