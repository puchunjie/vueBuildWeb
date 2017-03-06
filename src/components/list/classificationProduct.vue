<template>
<div class="product_left_fenlei" v-show="module.moduleSet.advancedSetting.classificationFlag" @mouseover="fixedBlockFalg=true" @mouseout="fixedBlockFalg=false">

    <div class="fixedBlock" @click="show" v-show="fixedBlockFalg"></div>

    <!--<el-dialog title="产品二级分类设置" v-model="elfalse">
        <component :is="'listSet'+module.type" :module="module"></component>
    </el-dialog>-->
    <!--模块设置面板-->
    <transition enter-active-class="animated fadeIn">
    <div class="bst-cover-content" v-if="elfalse">
    <div class="moduleSetBox" v-draggable>
        <h3 class="moduleSetBox-header">二级分类设置<i class="el-icon-close closeSet" @click="elfalse=false"></i></h3>
    <component :is="'listSet'+module.type" :module='module'></component>
    </div>
    </div>
    </transition>
    <!--模块设置面板-->

    <div class="fenlei_title">{{detailTitle}}</div>
    <span class="fenlei_span" @click="viewAll">查看所有</span>
    <ul>
        <li v-for="(item,index) in list" class="listclass">
            <a @click="fenlei(item.id)">{{ item.title }}</a>
            <span class="fenlei_list_span" @mouseover="dropMouse(dropStyle,index)" @click="dropClick(dropStyle,index)"
v-if="item.menu.child.length!=0 && !subductionFlag">+</span>
            <span class="fenlei_list_span" @mouseover="dropMouse(dropStyle,index)" @click="dropClick(dropStyle,index)"
v-if="item.menu.child.length!=0 && subductionFlag">-</span>
            <ul v-show="showFlag">
                <li v-for="subItem in item.menu.child">
                    <a @click="fenlei(subItem.id)">{{ subItem.title }}</a>
                </li>
            </ul>
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
            sortType:String,
            name:String,
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
            ]),
            dropStyle(){
                return this.module.moduleSet.advancedSetting.dropStyle;
            }
        },
        methods: {
            ...mapActions([
                'modifyModuleData',
                'openModuleSet',
                'closeModuleSet',
                'switchSelectModuleKey'
            ]),
            dropClick:function(dropStyle,index){
                if(dropStyle == 'clickOpen'){
                    $(".product_left_fenlei ul li.listclass").eq(index).find("span.fenlei_list_span").html("-").parents(".product_left_fenlei ul li.listclass").siblings().find("span.fenlei_list_span").html("+")
                    $(".product_left_fenlei ul li.listclass").eq(index).find("ul").show().parents(".product_left_fenlei ul li.listclass").siblings().find("ul").hide()
                }else if(dropStyle == 'allOpen'){
                    $(".product_left_fenlei ul li.listclass").eq(index).find("span.fenlei_list_span").html("-").parents(".product_left_fenlei ul li.listclass").siblings().find("span.fenlei_list_span").html("+")
                    $(".product_left_fenlei ul li.listclass").eq(index).find("ul").toggle()
                }
            },
            dropMouse:function(dropStyle,index){
                if(dropStyle == 'hoverOpen'){
                    $(".product_left_fenlei ul li.listclass").eq(index).find("span.fenlei_list_span").html("-").parents(".product_left_fenlei ul li.listclass").siblings().find("span.fenlei_list_span").html("+")
                    $(".product_left_fenlei ul li.listclass").eq(index).find("ul").show().parents(".product_left_fenlei ul li.listclass").siblings().find("ul").hide()
                }
            },
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
            viewAll:function(){
                window.location=window.location.pathname
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
                    "page_size":productNum,
                    "page":1,
                    "cateid":"["+cid+"]",
                    "sort":_this.sortType,
                    "source": _this.module.type,
                    "name":_this.name
                }, function(response) {
                    if (response.err_code === 0) {
                        console.log(response)
                        _this.$emit("pagination",response.list)
                        _this.$emit("childPage",response.page_count)
                        _this.$emit("childItemCount",response.item_count)
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
                detailTitle:'',
                //dropStyle:this.module.moduleSet.advancedSetting.dropStyle,//下拉按钮样式标记
                showFlag:false,
                subductionFlag:false
            }
        },
        created(){
            let _this = this;
            getPageInfo(_this, {
                siteid: _this.$route.params.siteid,
                pageid: _this.$route.params.pageid
            }, function (response) {
                if (response.err_code === 0) {
                    _this.detailTitle = response.info.name;
                }
            })
            if (_this.module.moduleSet.advancedSetting.dropStyle == 'allOpen'){
                _this.showFlag=true
                _this.subductionFlag=true
            }
        },
        watch: {
            'module.moduleSet.advancedSetting.dropStyle':function(newValue, oldValue){
                if(newValue=='allOpen') {
                    $(".product_left_fenlei ul li.listclass ul").show()
                    $(".product_left_fenlei ul li.listclass").each(function(index){
                        $(this).find("span.fenlei_list_span").html("-")
                        }
                    )
                }else{
                    $(".product_left_fenlei ul li.listclass ul").hide()
                }
             }
         }
    }
</script>