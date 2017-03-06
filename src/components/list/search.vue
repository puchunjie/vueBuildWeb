<template>
        <div class="search fr">
            <form action="#">
                <input type="button" value="搜索" @click="search"/>
                <input type="text" placeholder="商品搜索" v-model="name" @keyup.enter="search"/>
            </form>
        </div>
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
        name: 'search',
        props: {
            module: Object
        },
        computed: {
            ...mapGetters([
                "getModuleData"
            ])
        },
        methods:{
            //获取产品
            search:function() {
                let _this=this
                var productNum=_this.module.moduleSet.advancedSetting.pages.productNum
                getItemList(this, {
                    moduleid: _this.module.id,
                    source: _this.module.type,
                    siteid: _this.$route.params.siteid,
                    page: 1,
                    page_size: productNum,
                    cateId:"",
                    sort:"",
                    name:_this.name
                }, function(response) {
                    if (response.err_code === 0) {
                        _this.$emit("pagination",response.list)
                        _this.$emit("childPage",response.page_count)
                        _this.$emit("childItemCount",response.item_count)
                        _this.$emit("childName",_this.name)
                    }
                });
                return false
            }

        },
        data() {
            return {
                name:""
            }
        }
    }
</script>