<template>
        <div class="pro_top">
            <ul>
                <li class="on" @click="newProduct('')">热门排序</li>
                <!--<li>价格
                    <ul>
                        <li @click="newProduct('price asc')">升序</li>
                        <li @click="newProduct('price desc')">降序</li>
                    </ul>
               </li>-->
               <li>新品
                    <ul>
                        <li @click="newProduct('addTime ASC')">升序</li>
                        <li @click="newProduct('addTime DESC')">降序</li>
                    </ul>
                </li>

                <div class="clearfix"></div>
            </ul>
        </div>
</template>

<script>
    require('./style.css')
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
        name: 'protop',
        props: {
            module: Object,
            cid:String,
            name:String
        },
        data(){
            return {
                sortType:''
            }
        },
        computed: {
            ...mapGetters([
                "getModuleData"
            ]),
        },
        methods: {
            newProduct:function(typeP){
                let _this=this
                var productNum=_this.module.moduleSet.advancedSetting.pages.productNum
                _this.sortType=typeP
                _this.$emit("child",_this.sortType)
                getItemList(this, {
                        "moduleid": _this.module.id,
                        "siteid": _this.$route.params.siteid,
                        "page_size": productNum,
                        "page":1,
                        "cateid":_this.cid,
                        "sort":_this.sortType,
                        "source": _this.module.type,
                        "name":_this.name
                        }, function(response) {
                            console.log(response)
                            if (response.err_code === 0)
                            {
                                _this.$emit("pagination",response.list)
                                _this.$emit("childPage",response.page_count)
                            }
                        });

            }
        }
    }
</script>