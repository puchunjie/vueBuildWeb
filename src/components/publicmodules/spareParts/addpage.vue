<template>
    <el-dialog title="添加页面" v-model="pageManageInfo.addPagePanelShow" size="small" class="add-page-content" @close="reset">
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft">
            <div class="step-content addpage-step1" v-show="step === 1">
                <p>请选择合适的页面类型</p>
                <el-radio v-for="(item,index) in list" class="radio" v-model="radio" :label="index">{{ item.name }}</el-radio>
                <br>
                <p class="add-msg">{{ list.length>0?list[radio].desc:'' }}</p>
                <div class="step-button-container">
                    <el-button type="primary" @click="stepOne">下一步</el-button>
                </div>
            </div>
        </transition>

        <transition enter-active-class="animated bounceInRight" leave-active-class="animated fadeOut">
            <div class="step-content page-info" v-show="step === 2">
                <el-form ref="addPageForm" :model="form" label-width="100px" label-position="right" :rules="rules">
                    <el-form-item label="页面名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="title设置">
                        <el-input v-model="form.seoTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="页面关键词">
                        <el-input v-model="form.seoKeyword"></el-input>
                        <span class="tips">2-3个词最适,请用","分割</span>
                    </el-form-item>
                    <el-form-item label="页面描述">
                        <el-input v-model="form.seoDes" type="textarea"></el-input>
                        <span class="tips">150字以内,搜索引擎最易收录</span>
                    </el-form-item>
                </el-form>
                <div class="step-button-container">
                    <el-button type="primary" :loading="isLoading" @click="stepTwo">立即创建</el-button>
                    <el-button type="primary" @click="backToOne">返回上一步</el-button>
                </div>
            </div>
         </transition>

         <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
            <div class="step-content addpage-step3" v-show="step === 3">
                <p class="feedback"><i class="el-icon-circle-check"></i>页面已创建成功，开始完善您的页面吧 -v-</p>
                <a class="jump-link" @click="jump">跳转至新创建页面</a>
            </div>
         </transition>
    </el-dialog>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    //接口url
    import {
        addPage,
        getPageData
    } from 'ajaxAPI';

    export default {
        props: {
            list: Array
        },
        computed: {
            ...mapGetters([
                'pageManageInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'setLoading',
                'setPageData',
                'closeAddPagePanel'
            ]),
            reset() {
                this.step = 1;
                this.isLoading = false;
                this.createPageData = {
                    pagetypeid: ''
                };
                this.radio = 0;
                this.$refs.addPageForm.resetFields();
            },
            stepOne() {
                this.step = 2;
                this.createPageData.pagetypeid = this.list[this.radio].id; // 要创建页面的type ID
            },
            stepTwo() {
                let _this = this;
                // 如果页面名称填写就往下执行
                if (this.form.name !== "") {
                    this.isLoading = true;
                    // 创建页面
                    addPage(_this, {
                        siteid: this.$route.params.siteid,
                        name: this.form.name,
                        seoTitle: this.form.seoTitle,
                        seoKeyword: this.form.seoKeyword,
                        seoDes: this.form.seoDes,
                        pagetypeid: this.list[this.radio].id
                    }, function(response) {
                        if (response.err_code === 0) {
                            _this.isLoading = false;
                            _this.step = 3;
                            _this.newId = response.pageid;
                        }
                    });
                } else {
                    this.$message({
                        message: '请填写页面名称！',
                        type: 'warning'
                    });
                }
            },
            backToOne() {
                this.step = 1;
            },
            // 跳转到新建的页面中去
            jump() {
                let _this = this;
                this.setLoading();
                getPageData(this, {
                    pageid: this.newId
                }, function(response) {
                    _this.$router.push({
                        name: 'main',
                        params: {
                            siteMode: _this.$route.params.siteMode,
                            siteid: _this.$route.params.siteid,
                            memberid: _this.$route.params.memberid,
                            pageid: _this.newId
                        }
                    });
                    _this.closeAddPagePanel();
                });
            }
        },
        data() {
            return {
                step: 1, //步骤
                isLoading: false, //下一步按钮是否显示在加载
                createPageData: {
                    pagetypeid: ''
                },
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
    .add-page-content .el-form-item {
        height: 46px
    }
    
    .add-page-content .el-form-item:nth-child(4n) {
        height: 100px
    }
    
    .add-page-content .el-input {
        display: inline
    }
    
    .add-page-content .el-textarea textarea {
        height: 70px
    }
    
    .add-page-content .el-dialog__body {
        position: relative;
        height: 380px;
        padding: 15px 0;
        overflow: hidden;
    }
    
    .add-page-content .el-form-item {
        margin-bottom: 18px;
    }
    
    .step-content {
        width: 100%;
        position: absolute;
        /*position: relative;*/
    }
    
    .addpage-step1 {
        text-align: center;
    }
    
    .step-button-container {
        margin-top: 5px;
        text-align: center;
    }
    
    .add-page-content .page-info {
        padding: 0 100px 20px 60px;
    }
    
    .step-content .add-msg {
        border: 1px solid #e2a527;
        display: inline-block;
        padding: 10px 20px;
        color: #e2a527;
    }
    
    .step-content .feedback {
        font-size: 18px;
        color: #bfbfbf;
        margin-top: 80px;
    }
    
    .feedback i {
        font-size: 24px;
        margin: 0 20px;
        color: #13ce66;
    }
    
    .step-content .jump-link {
        font-size: 24px;
        text-decoration: underline;
        margin-top: 30px;
        display: inline-block;
        cursor: pointer;
        color: #a29b9b;
    }
    
    .step-content textarea {
        resize: none;
    }
    
    .step-content .tips {
        color: #fd9536;
    }
    
    .addpage-step3 {
        text-align: center;
    }
</style>