<template>
    <el-dialog title="" class="webSetDialog" v-model="webSet.isShow" @close="closeWebSet">
        <div class="webSet">
            <i class="el-icon-close closeSet" @click="closeWebSet"></i>
            <el-tabs>
                <el-tab-pane label="网站设置">
                    <el-form label-width="120px" label-position="right" :rules="rules">
                        <el-form-item label="网站名称" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="浏览器标题">
                            <el-input v-model="form.seoTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="全站SEO关键词">
                            <el-input v-model="form.seoKeywords"></el-input><span class="tips">2-3个词最适,请用","分割</span>
                        </el-form-item>
                        <el-form-item label="全站描述">
                            <el-input v-model="form.seoDes" type="textarea"></el-input><span class="tips">150字以内,搜索引擎最易收录</span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="样式">
                    <el-form  label-width="120px" label-position="right">
                        <el-form-item label="网站主区域">
                            <el-select v-model="pageWidth" placeholder="请选择" class="width240">
                                <el-option
                                  v-for="item in options"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                            <span class="setWidth-tips">注意：非专业设计人员请勿更改网站主区域</span>
                        </el-form-item>
                        <el-form-item label="收藏夹图标">
                            <div class="iconSet">
                                <span class="shortcutIcon" :style="{backgroundImage:'url('+form.pic+')',backgroundSize:'16px 16px'}"></span>网站标题
                            </div>
                            <span class="shortcutIcon-tips">推荐上传16*16像素的.ico图标格式的文件</span>
                            <div>
                                <el-upload
                                  :action="uploadUrl"
                                  :multiple="false"
                                  :show-upload-list="false"
                                  :before-upload="beforeUpload"
                                  :on-success="handlSuccess">
                                  <el-button size="small">点击上传</el-button>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </el-form>  
                </el-tab-pane>
                <el-tab-pane label="插件管理">
                    <el-form label-width="120px" label-position="right" :rules="rules">
                        <el-form-item label="返回顶部插件">
                            <el-switch
                            v-model="backTop"
                            on-color="#13ce66"
                            off-color="#ff4949" @change="switchChange">
                            </el-switch>
                            <span class="shortcutIcon-tips backTopEdit" v-if="backTop" @click="backTopEdit">[编辑]</span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div class="webSet-button">
                <el-button type="primary" @click="setWebData" :disabled="form.name==''?true:false">保存</el-button>
            </div>
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
        getWebSetting,
        saveWebSetting
    } from 'ajaxAPI';
    import URL from 'configs'
    import cssJson from 'cssJson';
    import backToTopSet from './backToTopSet.vue';
    export default {
        components: {
            backToTopSet
        },
        computed: {
            ...mapGetters([
                'webSet',
                'websiteInfo',
                'pageInfo'
            ]),
            uploadUrl() {
                let siteid = this.$route.params.siteid || this.$route.params.columnid;
                return URL[this.$route.params.siteMode + 'ImgUpload'] + '/' + siteid;
            }
        },
        created: function() {
            let _this = this;
            _this.pageWidth = _this.websiteInfo.pageWidth;
            getWebSetting(_this, {
                siteid: _this.$route.params.siteid
            }, function(response) {
                if (response.err_code === 0) {
                    _this.form = response.list;
                }
            })
            _this.backTop=this.pageInfo.floatModules[0].slotModeules[0].moduleSet.advancedSetting.isShow || false
        },
        methods: {
            ...mapActions([
                'setLoading',
                'openWebSet',
                'closeWebSet',
                'setWebsiteData',
                'setPageWidth',
                'modifyModuleAdvanced',
                'openUpload',
                'openModuleSet',
                'switchSelectModuleKey'
            ]),
            switchChange: function() {
                //this.backToTOP();
                var _this = this
                _this.switchSelectModuleKey({
                    keys: {
                        dragKey: 0,
                        slotModuleKey: 0,
                    },
                    container: 'floatModules'
                });
                _this.modifyModuleAdvanced({
                    attributetarget: {
                        'isShow': _this.backTop
                    },
                    container: 'floatModules'
                });
                let module = this.pageInfo.floatModules[0].slotModeules[0];
                cssJson.toStyleHEAD(module, true);
            },
            backTopEdit:function(){
                    this.closeWebSet();
                    this.openModuleSet('backToTopSet')
            },
            setWebData() {
                let _this = this;
                let setData = {
                    siteid: _this.$route.params.siteid,
                    name: _this.form.name,
                    seoTitle: _this.form.seoTitle,
                    seoKeywords: _this.form.seoKeywords,
                    seoDes: _this.form.seoDes,
                    width: _this.pageWidth,
                    pic: _this.form.pic
                };
                saveWebSetting(_this, setData, function(response) {
                    _this.closeWebSet();
                    if (response.err_code === 0) {
                        _this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        _this.setPageWidth(setData.width);
                        var rgOverlay = !!(document.getElementById("rg-overlay"));
                        if (rgOverlay) {
                            $("#rg-overlay").remove()
                            $('.bst-mian-contnet').removeAttr('style')
                        }
                    } else {
                        this.$message.error(response.msg);
                    }

                })
                _this.closeWebSet()
            },
            beforeUpload(response) {
                let _this = this;
                if (response.type === 'image/x-icon') {
                    return true;
                } else {
                    _this.$message({
                        message: '格式错误！',
                        duration: 1000,
                        type: 'warning'
                    });
                    return false;
                }
            },
            handlSuccess(response, file, fileList) {
                if (response.err_code == 0) {
                    let _this = this;
                    /*let item = {
                        cate: "",
                        name: response.info.client_name,
                        path: response.info.web_path,
                        size: response.info.file_size
                    };*/
                    this.form.pic = response.info.web_path;
                } else {
                    this.$message({
                        showClose: true,
                        message: response.msg,
                        type: 'warning'
                    });
                }

            }
        },
        data() {
            return {
                isNew: false, //用来判断是修改还是新建
                isLoading: false, //下一步按钮是否显示在加载
                radio: 0,
                pageWidth: '1100px',
                backTop: null,
                form: {
                    name: "江苏百拓信息技术有限公司",
                    seoTitle: "",
                    seoKeywords: "",
                    seoDes: "",
                    width: '1100px',
                    pic: ''
                },
                options: [{
                    'label': '标准宽度（1100px）',
                    'value': '1100px'
                }, {
                    'label': '宽屏（1200px）',
                    'value': '1200px'
                }, {
                    'label': '窄屏（1000px）',
                    'value': '1000px'
                }],
                rules: {
                    name: [{
                        required: true,
                        message: '请输入网站名称',
                        trigger: 'blur'
                    }]
                }
            }
        }
    }
</script>
<style>
    .webSetDialog .el-dialog__header {
        display: none;
    }
    
    .webSetDialog .el-dialog__body {
        padding: 10px 20px 20px;
    }
    
    .webSet {
        position: relative;
    }
    
    .webSet .closeSet {
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
    
    .webSet textarea {
        resize: none;
    }
    
    .webSet .webSet-button {
        text-align: center;
    }
    
    .webSet .tips {
        color: #fd9536;
    }
    
    .width240 {
        width: 240px;
        display: inline-block;
        margin-right: 5px;
    }
    
    .iconSet {
        width: 240px;
        height: 33px;
        padding-left: 18px;
        background: url(../../../../static/images/iconSetbg.jpg) no-repeat;
        display: inline-block;
        margin-right: 5px;
    }
    
    .shortcutIcon {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        margin-bottom: 4px;
    }
    .setWidth-tips {
        color: #f6473b;
    }
    .shortcutIcon-tips {
        color: #fda55c;
    }
    .backTopEdit{
        color:#0270fb
    }
</style>