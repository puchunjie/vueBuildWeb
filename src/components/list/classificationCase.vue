<template>
<div class="product_left_fenlei product_left_case" v-show="module.moduleSet.advancedSetting.classificationFlag" @mouseover="fixedBlockFalg=true" @mouseout="fixedBlockFalg=false">

    <div class="fixedBlock" @click="show" v-show="fixedBlockFalg"></div>

    <!--模块设置面板-->
    <transition enter-active-class="animated fadeIn">
    <div class="bst-cover-content" v-if="elfalse">
    <div class="moduleSetBox" v-draggable>
        <h3 class="moduleSetBox-header">二级分类设置<i class="el-icon-close closeSet" @click="elfalse=false"></i></h3>
    <component :is="'listSet'+module.type"></component>
    </div>
    </div>
    </transition>
    <!--模块设置面板-->
    <div class="fenlei_title">{{detailTitle}}</div>
    <ul>
        <li v-for="(item,index) in list">
            <a @click="fenlei(item.id)">{{ item.title }}</a>
        </li>
    </ul>
</div>
</template>

<script>
    //接口url
    import {
        listCateList,
        getItemList,
        getPageInfo
    } from 'ajaxAPI';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    require('./style.css')
    import listSetproduct from '../moduleSets/listSetproduct.vue';
    import listSetcase from '../moduleSets/listSetcase.vue';
    import listSetarticle from '../moduleSets/listSetcase.vue';

    export default {
        props: {
            module: Object,
            list: Array, //菜单列表数据
            sortType: String,
            name: String,
            dragIndex: null,
            slotModuleIndex: null
        },
        components: {
            listSetproduct,
            listSetcase,
            listSetarticle
        },
        computed: {
            ...mapGetters([
                "getModuleData"
            ])
        },
        methods: {
            ...mapActions([
                'modifyModuleData',
                'openModuleSet',
                'closeModuleSet',
                'switchSelectModuleKey'
            ]),
            show:function(){
                this.elfalse=true;
                this.switchSelectModuleKey({
                    keys: {
                        dragKey: this.dragIndex,
                        slotModuleKey: this.slotModuleIndex
                    },
                    container: this.container
                })
            },
            fenlei: function(cid) {
                let _this=this
                let productNum=this.module.moduleSet.advancedSetting.pages.productNum
                // 获取产品列表
                _this.$emit("functionCid","["+cid+"]")
                //获取产品
                getItemList(this, {
                    "moduleid": _this.module.id,
                    "siteid": _this.$route.params.siteid,
                    "page_size": productNum,
                    "page": 1,
                    "cateid": "[" + cid + "]",
                    "sort": _this.sortType,
                    "source": _this.module.type,
                    "name": _this.name
                }, function(response) {
                    if (response.err_code === 0) {
                        console.log(response)
                        _this.$emit("pagination", response.list)
                        _this.$emit("childPage", response.page_count)
                        _this.$emit("childItemCount", response.item_count)
                    }
                });

            }
        },
        data() {
            return {
                draggable: false,
                hasBar: false,
                fixedBlockFalg: false, //分类右侧设置按钮标记
                elfalse: false, //分类模块标记
                detailTitle:''
            }
        },
        created(){
            let _this = this;
            getPageInfo(_this, {
                siteid: _this.$route.params.siteid,
                pageid: _this.$route.params.pageid
            }, function(response) {
                if (response.err_code === 0) {
                    _this.detailTitle = response.info.name;
                    //_this.openPageSet();
                }
            })
        }
    }
</script>
<style type="text/css">
    .bst-banner-content .product_left_case {
        margin-top: 20px
}
.bst-banner-content .product_left_case .fenlei_title{
    height:38px;line-height:38px
}
    
    .bst-banner-content .product_left_case ul li a {
        height: 43px;
        line-height: 43px;
        background: none;
        color: #666
    }

    .bst-banner-content .product_left_case ul li a:hover {
        color:#a8a8a8
    }
    
    .bst-banner-content .product_left_case>ul>li>a {
            border:1px dashed #dfdfdf;
            border-width:0 0 1px
    }
</style>