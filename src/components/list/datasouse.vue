<template>
    <el-dialog title="设置数据源" v-model="dataSetIshide.is" :modal="false">
        <el-row :gutter="20">
            <el-col :span="7">
                <div class="select-list-title">分类列表</div>
                <ul class="select-list-content hover clearfix">
                    <li v-for="(item,index) in cfArr" @click="showItems(index,item)" :class="{'active':cfSindex === index} ">
                        {{ item.title }}
                    </li>
                </ul>
                <div>
                    <el-button type="primary" size="mini" @click="addCF">添加分类</el-button>
                </div>
            </el-col>
            <el-col :span="1">
                <div class="r-array">
                    <i class="el-icon-d-arrow-right"></i>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="select-list-title">{{selectListTitle}}列表</div>
                <ul class="select-list-content hover clearfix">
                    <li v-for="(item,index) in itemArr" v-show="!item.isSelected" @click="toggleSelected(item)">
                        <p>{{ item.name }}</p>
                        <i class="el-icon-arrow-right"></i>
                    </li>
                </ul>
            </el-col>
            <el-col :span="1">
                <!--<div class="r-array">
                                <el-button type="primary" icon="plus" @click="addStoF"></el-button>
                            </div>-->
                <div class="r-array">
                    <i class="el-icon-d-arrow-right"></i>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="select-list-title">选中列表</div>
                <ul class="select-list-content show clearfix">
                    <li v-for="(item,index) in itemArr" v-show="item.isSelected" :class="item.isNew?'success':'wrang'">
                        <p>{{ item.name }}</p>
                        <i @click="toggleSelected(item)" class="el-icon-circle-close"></i>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeSelect">取 消</el-button>
            <el-button type="primary" @click="confirmSelect">确 定</el-button>
        </div>
    </el-dialog>   
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    import {
        getClassification,
        getClassificationSub,
        saveDataSource,
        addClassification
    } from 'ajaxAPI';

    export default {
        props: {
            dataSetIshide: Object,
            module: Object
        },
        data() {
            return {
                cfArr: [], //分类列表
                cfSindex: NaN, //分类选中
                itemArr: [], //产品列表
                selectListTitle: ''
            }
        },
        created() {
            let _this = this;
            let selectListTitle = (_this.module.type == 'product' ? '产品' : _this.module.type == 'case' ? '案例' : _this.module.type == 'article' ? '文章' : '')
            this.selectListTitle = selectListTitle
                // 通过页面type来去的获取分类的type
            getClassification(this, {
                source: _this.module.type,
                moduleid: _this.module.id,
                dataType: 1,
                siteid: this.$route.params.siteid
            }, function(response) {
                _this.cfArr = response.list;
                if (response.list.length > 0) {
                    _this.showItems(0)
                }
            });
        },
        methods: {
            ...mapActions([
                'switchSelectModuleKey'
            ]),
            //选中分类显示产品列表
            showItems(index, item) {
                let _this = this;
                _this.cfSindex = index;
                // 根据分类id请求列表数据
                getClassificationSub(this, {
                    dataType: 1,
                    source: _this.module.type,
                    cateid: this.cfArr[this.cfSindex].id, //分类id
                    moduleid: this.module.id, //模块id
                    siteid: this.$route.params.siteid
                }, function(response) {
                    //处理获取到的产品列表数据,填充未选列表和已选列表
                    response.list.map(function(el) {
                        if (el.isSelected) {
                            el.isNew = false
                        } else {
                            el.isNew = true
                        }
                    });
                    _this.itemArr = response.list;
                });

            },
            // 添加/删除选中的产品
            toggleSelected(item) {
                item.isSelected = !item.isSelected;
            },
            //关闭产品面板
            closeSelect() {
                //清空已选择列表
                this.itemArr = [];
                this.cfArr = [];
                this.dataSetIshide.is = false;
            },
            //添加分类面板显示
            addCF() {
                let _this = this;
                //弹出输入分类名筐体
                this.$prompt('请输入分类名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({
                    value
                }) => {
                    // 输入后执行添加
                    addClassification(_this, {
                        siteid: this.$route.params.siteid,
                        type: _this.module.type,
                        moduleid: _this.module.id,
                        source: _this.module.type,
                        name: value
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.$message({
                                message: '恭喜你，添加成功！',
                                type: 'success'
                            });
                            _this.cfArr.push(response.info);
                            if (_this.cfArr.length <= 1) {
                                _this.itemArr = response.list;
                            }
                        } else {
                            _this.$message.error('添加失败！');
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            //确认提交
            confirmSelect() {
                let _this = this;
                if (this.itemArr.length > 0) {
                    //拼装选中的id
                    let ids = '';
                    this.itemArr.forEach(function(el) {
                        if (el.isSelected) {
                            ids += el.id + ','
                        }
                    });
                    ids = ids.substring(0, ids.length - 1);
                    // 执行保存接口
                    saveDataSource(this, {
                        siteid: this.$route.params.siteid,
                        cateid: this.cfArr[this.cfSindex].id,
                        dataType: 1,
                        source: _this.module.type,
                        moduleid: this.module.id,
                        ids: ids
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.$message({
                                message: '恭喜你，添加成功！',
                                type: 'success'
                            });
                            //清空已选择列表
                            _this.itemArr = [];
                            _this.cfArr = [];
                            _this.cfSindex = NaN;
                            _this.dataSetIshide.is = false;
                            window.location.reload();
                        } else {
                            _this.$message.error('请选择需要添加的产品！');
                        }
                    });
                } else {
                    this.$message({
                        message: '请选择需要添加的产品！',
                        type: 'warning'
                    });
                }
            }
        },
    }
</script>

<style>
    .r-array {
        height: 420px;
    }
    
    .r-array>button,
    .r-array>i {
        margin: 210px 0 0 7px;
        /*margin-top: 210px;*/
    }
    
    .select-list-title {
        width: 100%;
        height: 20px;
        margin: 10px 0;
        text-align: center;
    }
    
    .select-list-content {
        height: 400px;
        border: 1px solid #ddd;
        border-radius: 10px;
        vertical-align: middle;
        padding: 10px;
        overflow-x: hidden;
    }
    
    .select-list-content li {
        width: 100%;
        height: 25px;
        float: left;
        padding: 5px 10px;
        border-radius: 3px;
        margin: 5px 0;
        cursor: pointer;
        color: #000;
    }
    
    .select-list-content.show li {
        color: #fff;
    }
    
    .select-list-content.show li>i {
        display: none;
    }
    
    .select-list-content li.success {
        background-color: #13CE66;
    }
    
    .select-list-content li.wrang {
        background-color: #F7BA2A;
    }
    
    .select-list-content.hover li.active,
    .select-list-content.hover li:hover {
        background-color: rgba(32, 160, 255, 0.8);
        color: #fff;
    }
    
    .select-list-content.show li:hover>i {
        display: block;
    }
    
    .select-list-content li.disable {
        background-color: #ddd;
        color: #fff;
    }
    
    .select-list-content li>p {
        width: 90%;
        margin: 0;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .select-list-content li>i {
        float: right;
        font-size: 5px;
    }
</style>