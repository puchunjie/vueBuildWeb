<template>
    <el-dialog title="页面设置" class="pageSet" v-model="pageSet.isShow" @close="closePageSet">
        <div class="setpage">
            <i class="el-icon-close closeSet" @click="closePageSet"></i>
            <el-tabs>
                <el-tab-pane label="页面设置">
                    <el-form ref="addPageForm" :model="form" label-width="100px" label-position="right" :rules="rules">
                        <el-form-item label="页面名称" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="title设置">
                            <el-input v-model="form.seoTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="页面关键词">
                            <el-input v-model="form.seoKeyword"></el-input><span class="tips">2-3个词最适,请用","分割</span>
                        </el-form-item>
                        <el-form-item label="页面描述">
                            <el-input v-model="form.seoDes" type="textarea"></el-input><span class="tips">150字以内,搜索引擎最易收录</span>
                        </el-form-item>
                    </el-form>
                    <div class="pageSet-button">
                        <el-button type="primary" @click="closePageSet">取消</el-button>
                        <el-button type="primary" @click="setPageData" :disabled="form.name==''?true:false">保存</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-dialog>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    //接口url
    import {
        getPageInfo,
        setPageInfo
    } from 'ajaxAPI';

    export default {
        created: function() {
            let _this = this;
            getPageInfo(_this, {
                siteid: _this.$route.params.siteid,
                pageid: _this.$route.params.pageid
            }, function(response) {
                if (response.err_code === 0) {
                    _this.form = response.info;
                    //_this.openPageSet();
                }
            })
        },
        computed: {
            ...mapGetters([
                'pageSet'
            ])
        },
        methods: {
            ...mapActions([
                'setLoading',
                'openPageSet',
                'closePageSet'
            ]),
            setPageData() {
                let _this = this;
                let setData = {
                    siteid: _this.$route.params.siteid,
                    pageid: _this.$route.params.pageid,
                    name: _this.form.name,
                    seoTitle: _this.form.seoTitle,
                    seoKeyword: _this.form.seoKeyword,
                    seoDes: _this.form.seoDes
                };
                setPageInfo(_this, setData, function(response) {
                    _this.closePageSet();
                    if (response.err_code === 0) {
                        _this.$message({
                            message: '修改成功！',
                            type: 'success',
                            duration:1000
                        });
                        
                    } else {
                        this.$message.error(response.msg);
                    }

                })
            }
        },
        data() {
            return {
                isNew: false, //用来判断是修改还是新建
                isLoading: false, //下一步按钮是否显示在加载
                radio: 0,
                form: {
                    name: "",
                    seoTitle: "",
                    seoKeyword: "",
                    seoDes: ""
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入页面名称',
                        trigger: 'blur'
                    }]
                },
                newId: NaN
            }
        }
    }
</script>
<style>
    .pageSet .el-dialog__header {
        display: none;
    }
    
    .pageSet .el-dialog__body {
        padding: 10px 20px 20px;
    }
    
    .setpage {
        position: relative;
    }
    
    .setpage .closeSet {
        position: absolute;
        right: 10px;
        top: 8px;
        cursor: pointer;
        display: block;
        z-index: 1600;
    }
    
    .moduleSetBox {
        width: 800px;
        position: fixed;
        top: 15%;
        left: 50%;
        margin-left: -400px;
        background: #fff;
        border: solid 1px #d3dce6;
        padding: 0 15px 15px;
        z-index: 1600;
    }
    
    .moduleSetBox-header {
        height: 40px;
        line-height: 40px;
        cursor: move;
    }
    
    .moduleSetBox .closeSet {
        position: absolute;
        right: 10px;
        top: 14px;
        cursor: pointer;
    }
    
    .pageSet textarea {
        resize: none;
    }
    
    .pageSet .pageSet-button {
        text-align: center;
    }
    
    .pageSet .tips {
        color: #fd9536;
    }
</style>