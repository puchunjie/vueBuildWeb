<template>
<div class="bst-module draggle-module smartMenu list-content" :id="module.moduleId" :class="module.moduleId + 'styles'">
    <crumbs :module="module" :sortType="sortType" :cid="cid" v-on:pagination="paginationFather" v-on:childPage="fatherPage"></crumbs>
    <search v-show="module.type=='product'" :module="module" v-on:pagination="paginationFather" v-on:childPage="fatherPage" v-on:childName="fatherName" v-on:childItemCount="childItemCountFather"></search>
    <div class="clearfix"></div>
    <div class="product_left">
    <component :is="'classification'+module.type"  :dragIndex="dragIndex" :slotModuleIndex="slotModuleIndex" :module="module" :list="menuList" :name="name" :sortType="sortType" v-on:pagination="paginationFather" v-on:functionCid="functionCidFather" v-on:childItemCount="childItemCountFather" v-on:childPage="fatherPage"></component>
    <!--<focus v-show="module.type=='product'"></focus>-->
    </div>
    <div class="productblock_right">
    <protop v-show="module.type=='product'" :module="module" v-on:child="father" :cid="cid" :name="name" v-on:pagination="paginationFather" v-on:childPage="fatherPage"></protop>
    <component :is="'prolist'+module.type" :module="module" :list="pList" :sortType="sortType"></component>
    <div class="clearfix"></div>
    <pagination :module="module" :sortType="sortType" :itemCount="itemCount" :pageCount="pageCount" :name="name" :cid="cid" v-on:childPage="fatherPage" v-on:pagination="paginationFather"></pagination>
    </div>

    <button @click="showSelet" v-if="isTemplate" style="float:right">设置数据源</button>

    <!--<data-souse :dataSetIshide="dataSetIshide" :module="module" v-if="dataSetIshide.is"></data-souse>-->
    <data-sou :dataSetIshide="dataSetIshide" :module="module" v-if="dataSetIshide.is"></data-sou>
    <div class="clearfix"></div>
    </div>
</template>



<script type="text/ecmascript-6">
    /*==================模块设置组件======================*/
    import crumbs from './crumbs.vue';
    import search from './search.vue';
    import classificationproduct from './classificationProduct.vue';
    import classificationcase from './classificationCase.vue';
    import classificationarticle from './classificationCase.vue';
    import focus from './focus.vue';
    import protop from './protop.vue';
    import prolistproduct from './prolist.vue';
    import prolistcase from './prolist.vue';
    import prolistarticle from './prolistarticle.vue';
    import pagination from './pagination.vue';
    import dataSouse from './datasouse.vue'
    import dataSou from './datasouses.vue';

    import cssJson from 'cssJson';

    import {
        mapActions,
        mapGetters
    } from 'vuex';

    //接口url
    import {
        listCateList,
        getItemList
    } from 'ajaxAPI';

    export default {
        name: 'list',
        components: {
            crumbs,
            search,
            classificationproduct,
            classificationcase,
            classificationarticle,
            focus,
            protop,
            prolistproduct,
            prolistcase,
            prolistarticle,
            pagination,
            dataSouse,
            dataSou
        },
        props: {
            module: Object,
            dragIndex: null,
            slotModuleIndex: null
        },
        computed: {
            ...mapGetters([
                "getModuleData"
            ]),
            //是否为模版制作界面
            isTemplate() {
                return this.$route.params.siteMode === 'templateMake'
            }
        },
        methods: {
            ...mapActions([
                'modifyModuleData',
                'switchSelectModuleKey'
            ]),
            functionCidFather: function(msg) {
                this.cid = msg
            },
            father: function(msg) {
                this.sortType = msg
            },
            paginationFather: function(msg) {
                this.pList = msg
            },
            fatherPage: function(msg) {
                this.pageCount = msg
            },
            fatherName: function(msg) {
                this.name = msg
            },
            childItemCountFather: function(msg) {
                this.itemCount = msg
            },
            //加载数据源分类，选择产品面板显示
            showSelet() {
                let _this = this;
                // 选中当前模块
                this.switchSelectModuleKey({
                    keys: {
                        dragKey: _this.dragIndex,
                        slotModuleKey: _this.slotModuleIndex,
                    },
                    container: 'layouts'
                });

                this.dataSetIshide.is = true;
            }
        },
        mounted: function() {
            cssJson.toStyleHEAD(this.module);
        },
        data() {
            return {
                draggabale: false,
                dataSetIshide: {
                    is: false
                }, //选择产品面板显隐
                menuList: [], //分类列表数据
                pList: [], //产品数据
                sortType: "",
                pageCount: 0,
                cid: '',
                name: "",
                itemCount: 0
            }
        },
        created() {
            let _this = this;
            let productNum = this.module.moduleSet.advancedSetting.pages.productNum;
            // 获取产品列表
            listCateList(this, {
                moduleid: _this.module.id,
                source: _this.module.type,
                siteid: _this.$route.params.siteid
            }, function(response) {
                if (response.err_code === 0) {
                    _this.menuList = response.list;
                }
            });

            //获取产品
            getItemList(this, {
                moduleid: _this.module.id,
                source: _this.module.type,
                siteid: _this.$route.params.siteid,
                page: 1,
                cateid:_this.module.moduleSet.advancedSetting.value.split("|")[0],
                page_size: productNum
            }, function(response) {
                if (response.err_code === 0) {
                    if(response.item_count==0){
                        _this.$message({
                            message: '内容为空,请去后台录入数据！！！',
                            type: 'error'
                        });
                    }
                    _this.pList = response.list
                    _this.pageCount = response.page_count
                    _this.itemCount = response.item_count
                        /*_this.itemlistcount(response.page_count)*/
                }
            });
        }
    }
</script>
<style>
    .list-content {
        width: 1100px;
        margin: 0 auto;
        width: 100%;
        font-size: 14px;
        font-family: 微软雅黑;
        font-weight: bold;
        line-height: 14px;
        text-align: left;
        color: #ddd
    }
    
    .list-content .el-dialog__wrapper {
        z-index: 999;
    }
</style>