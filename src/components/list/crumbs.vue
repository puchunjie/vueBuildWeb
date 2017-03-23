<template>
        <div class="crumbs fl" v-show="module.moduleSet.advancedSetting.crumbsfalse" @mouseover="fixedBlockcrumbsFalg=true"  @mouseout="fixedBlockcrumbsFalg=false">

            <div class="fixedBlock"  @click="crumbsElFalse=true" v-show="fixedBlockcrumbsFalg"></div>

            <el-dialog title="面包屑导航设置" v-model="crumbsElFalse">
            <crumbsSet :module="module" :sortType="sortType" :cid="cid" v-on:pagination="paginationFather" v-on:childPage="fatherPage"></crumbsSet>
            </el-dialog>

            <el-breadcrumb separator=">>">
            <el-breadcrumb-item :to="{ path: paths }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{detailTitle}}</el-breadcrumb-item>
            <el-breadcrumb-item v-show="level1!==''">{{level1}}</el-breadcrumb-item>
            <el-breadcrumb-item v-show="module.moduleSet.advancedSetting.crumbsMenu2IsShow">{{level2}}</el-breadcrumb-item>
            </el-breadcrumb>
       </div>
</template>

<script>
    require('./style.css')
    import crumbsSet from '../moduleSets/crumbsSet.vue';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    //接口url
    import {
        getPageList,
        getPageInfo
    } from 'ajaxAPI';
    export default {
        name: 'crumbs',
        props: {
            module: Object,
            sortType: String,
            cid:String
        },
        methods: {
            paginationFather: function (msg) {
                this.pList = msg
            },
            fatherPage: function (msg) {
                this.pageCount = msg
            }
        },
        components: {
            crumbsSet
        },
        computed: {
            level1:function(){
                return this.module.moduleSet.advancedSetting.value==''?'':this.module.moduleSet.advancedSetting.value.split("|")[1]
            },
            level2:function(){
                return this.module.moduleSet.advancedSetting.value2==''?'':this.module.moduleSet.advancedSetting.value.split("|")[1]
            }
        },
        data(){
            return {
                fixedBlockcrumbsFalg: false, //列表右侧设置按钮标记
                crumbsElFalse: false,//面包屑导航弹出框标记
                pList: [],
                pageCount: Number,
                paths:String,
                mainId:Number,
                detailTitle:String
            }
        },
        created() {
            let _this=this
            getPageList(_this, {
                siteid: this.$route.params.siteid,
                field: ['unSysPage']
            }, function(response) {
                //console.log(response)
                $(response.unSysPage).each(function(index){
                     if(this.isMain){
                            _this.mainId=this.id
                            _this.paths="/build/page/"+_this.$route.params.siteMode+"-"+_this.$route.params.siteid+"-"+_this.$route.params.memberid+"-"+_this.mainId
                     }
                })
            })
            getPageInfo(_this, {
                siteid: _this.$route.params.siteid,
                pageid: _this.$route.params.pageid
            }, function (response) {
                if (response.err_code === 0) {
                    _this.detailTitle = response.info.name;
                }
            })
        },
        watch:{
            pList:function(){
                this.$emit("pagination",this.pList)
            },
            pageCount:function(){
                this.$emit("childPage",this.pageCount)
            }
        }
    }
</script>