<template>
    <el-tabs type="border-card">
        <el-tab-pane label="背景颜色">
                <span>一级导航设置</span>
                <el-select v-model="module.moduleSet.advancedSetting.value" placeholder="请选择"
                        @change="show(module.moduleSet.advancedSetting.value)"
                >
                <el-option
                    v-for="item in menuList"
                    :label="item.title"
                    :value='item.id+"|"+item.title'
                    >
                </el-option>
                </el-select>
                <!--<span v-show="module.moduleSet.advancedSetting.crumbsMenu2IsShow">二级导航设置</span>
                <el-select v-model="module.moduleSet.advancedSetting.value2" placeholder="请选择"
                           v-show="module.moduleSet.advancedSetting.crumbsMenu2IsShow"
                           @change="show2(module.moduleSet.advancedSetting.value2)"

                >
                <el-option
                    v-for="item in crumbsMenu2"
                    :label="item.title"
                     :value='item.id+"|"+item.title'
                >
                </el-option>
                </el-select>-->

        </el-tab-pane>
    </el-tabs>
</template>
<script>
//接口url
import {
    listCateList,
    getItemList
} from 'ajaxAPI';
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    components: {

    },
    props: {
        module: Object,
        sortType:String,
        cid:String
    },
    computed: {
        ...mapGetters([
            "getModuleData"
        ])
    },
    created() {
        let _this = this;
        // 获取产品列表
        listCateList(this, {
            moduleid: _this.module.id,
            source: _this.module.type,
            siteid: _this.$route.params.siteid
        }, function(response) {
            console.log(response)
            if (response.err_code === 0) {
                _this.menuList = response.list;
            }
        });
    },
    methods: {
        show:function(id){
            let _this=this
            var productNum=this.module.moduleSet.advancedSetting.pages.productNum
            let cid='['+id.split("|")[0]+']'
            listCateList(_this, {
                "moduleid": _this.module.id,
                "siteid": _this.$route.params.siteid,
                "cateid":cid,
                "source": _this.module.type
            }, function(response) {
                if (response.err_code === 0) {
                    /*if(response.list.length==0){
                        _this.module.moduleSet.advancedSetting.crumbsMenu2IsShow=false
                    }else{
                        _this.module.moduleSet.advancedSetting.crumbsMenu2IsShow=true
                        _this.crumbsMenu2 = response.list
                    }*/
                    getItemList(_this,{
                        "moduleid": _this.module.id,
                        "siteid": _this.$route.params.siteid,
                        "page_size":productNum,
                        "page":1,
                        "cateid":cid,
                        "sort":_this.sortType,
                        "source": _this.module.type
                    }, function(response) {
                        console.log(response)
                        if (response.err_code === 0)
                        {
                            _this.$emit("pagination",response.list)
                            _this.$emit("childPage",response.page_count)
                        }
                    });
                }
            });
        }/*,
        show2:function(id){
            let _this=this
            var productNum=_this.getModuleData.moduleSet.advancedSetting.pages.productNum
            let cid='['+id.split("|")[0]+']'
            _this.module.moduleSet.advancedSetting.pages.cid=id.split("|")[0]
            getItemList(_this,{
                "moduleid": _this.module.id,
                "siteid": _this.$route.params.siteid,
                "page_size":productNum,
                "page":1,
                "cateid":cid,
                "sort":_this.sortType,
                "source": _this.module.type
            }, function(response) {
                console.log(response)
                if (response.err_code === 0)
                {
                    _this.$emit("pagination",response.list)
                    _this.$emit("childPage",response.page_count)
                }
            });
        }*/
    },
    mounted: function() {

    },
    data() {
        return {
            value: '',
            value2: '',
            menuList:[],
            crumbsMenu2:[]
        }
    }
}
</script>