<template>
    <div class="product_left_fenlei" v-show="fenleiFlag" @mouseover="fixedBlockFalg=true"  @mouseout="fixedBlockFalg=false">
    <div class="fixedBlock"  @click="elfalse=true" v-show="module.fixedBlockFalg"></div>
    <el-dialog title="产品二级分类设置" v-model="elfalse">
    <listSet></listSet>
    <el-button @click="elfalse = false">取 消</el-button>
    <el-button type="primary" @click="elfalse = false">确 定</el-button>
    </el-dialog>
    <div class="fenlei_title">产品中心</div>
    <span class="fenlei_span">查看所有</span>
        <ul>
            <li v-for="(val,key) in module.menuList" v-show="val.level==='1'">
                <a href="#" @click="fenlei(val.id)">{{val.name}}</a>
                <ul>
                    <li v-for="(items,item) in module.menuList" v-show="items.level==='2' && val.id===items.pid">
                    <a href="#" @click="fenlei(items.id)">{{items.name}}</a>
                        <ul>
                            <li v-for="(el,key) in module.menuList" v-show="el.level==='3' && items.id===el.pid">
                            <a href="#" @click="fenlei(el.id)">{{items.name}}</a>
                        </li>
                        </ul>
                </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';
//接口url
import {
    listCateList,
    getItemList
} from 'ajaxAPI';

    require('./style.css')
    import listSet from '../moduleSets/listSet.vue';

    export default {
        name: 'fenlei',
        props: {
            module: Object
        },
        components: {
            listSet
        },
        methods: {
            fenlei:function(cid){
                let _this = this;
                // 获取产品列表
                _this.module.moduleSet.advancedSetting.pages.cid='['+cid+']'

                //获取产品
                getItemList(this, {
                    "moduleid": _this.module.id,
                    "siteid": _this.$route.params.siteid,
                    "page_size":_this.module.moduleSet.advancedSetting.pages.productNum,
                    "page":1,
                    "cateid":_this.module.moduleSet.advancedSetting.pages.cid,
                    "sort":_this.module.moduleSet.advancedSetting.pages.sortType,
                    "source": _this.module.type
                }, function(response) {
                    if (response.err_code === 0) {
                        _this.$emit("pagination",response.list)
                        _this.module.moduleSet.advancedSetting.pages.page_count=response.page_count
                    }
                });

            }
        },
         data() {
            return {
                draggbale: false,
                hasBar: false,
                fixedBlockFalg: false, //分类右侧设置按钮标记
                fenleiFlag: false //分类模块标记
                }
            }
         }
</script>