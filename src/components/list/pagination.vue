<template>
<div class="block">
    <el-pagination
@size-change="handleSizeChange"
@current-change="handleCurrentChange"
:current-page="currentPage1"
:page-sizes="[12, 20, 28, 36]"
:page-size="module.moduleSet.advancedSetting.pages.productNum"
layout="total,prev, pager, next, jumper"
:total   = "itemCount">
    </el-pagination>
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
        name: 'pagination',
        props: {
            module: Object,
            sortType: String,
            pageCount:Number,
            cid:String,
            name:String,
            itemCount:Number
        },
        data: {
            value: null
        },
        computed: {
            ...mapGetters([
                "getModuleData"
            ]),
        },
        methods: {
            handleSizeChange(val) {
                let _this = this
                _this.value = parseInt(`${val}`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                let _this = this;
                // 获取产品列表
                let typep = _this.sortType
                let pageSize =_this.module.moduleSet.advancedSetting.pages.productNum;
                let cid = _this.cid
                let page = _this.currentPage
                let type = _this.module.type
                let name=_this.name
                if (typep == '') {
                    getItemList(this, {
                        "moduleid": _this.module.id,
                        "siteid": _this.$route.params.siteid,
                        "page_size": pageSize,
                        "page": page,
                        "cateid": cid,
                        "source": type,
                        "name":name
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.$emit("pagination", response.list)
                        }
                    });
                } else if (typep == "price asc") {
                    getItemList(this, {
                        "moduleid": _this.module.id,
                        "siteid": _this.$route.params.siteid,
                        "page_size": pageSize,
                        "page": page,
                        "cateid": cid,
                        "sort": "price asc",
                        "source": type,
                        "name":name
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.$emit("pagination", response.list)
                        }
                    });
                } else if (typep == "price desc") {
                    getItemList(this, {
                        "moduleid": _this.module.id,
                        "siteid": _this.$route.params.siteid,
                        "page_size": pageSize,
                        "page": page,
                        "cateid": cid,
                        "sort": "price desc",
                        "source": type,
                        "name":name
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.$emit("pagination", response.list)
                        }
                    });
                } else if (typep == "addTime ASC") {
                    getItemList(this, {
                        "moduleid": _this.module.id,
                        "siteid": _this.$route.params.siteid,
                        "page_size": pageSize,
                        "page": page,
                        "cateid": cid,
                        "sort": "addTime ASC",
                        "source": type,
                        "name":name
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.$emit("pagination", response.list)
                        }
                    });
                } else if (typep == "addTime DESC") {
                    getItemList(this, {
                        "moduleid": _this.module.id,
                        "siteid": _this.$route.params.siteid,
                        "page_size": pageSize,
                        "page": page,
                        "cateid": cid,
                        "sort": "addTime DESC",
                        "source": type,
                        "name":name
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.$emit("pagination", response.list)
                        }
                    });
                }
            }
        },
        data() {
            return {
                currentPage1: 1
            };
        }
    }
</script>