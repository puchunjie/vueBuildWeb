<template>
    <el-dialog title="选择图片" v-model="imgUpload.ishide" size="tiny" class="imgUploadBox">
        <el-tabs type="border-card" v-model="activeName" @tab-click="getTabData">
          <el-tab-pane name="first" :label="isUser?'我的图库':'上传图片'">
                <div class="upImg">您可以上传大小在 3MB 以内，格式为JPG或PNG的图片文件。
                    <el-upload
                      class="upBtn"
                      :action="uploadUrl"
                      :multiple="true"
                      :show-upload-list="false"
                      :on-success="handlSuccess"
                      >
                      <el-button type="primary"><i class="el-icon-upload"></i>上传</el-button>
                    </el-upload>
                </div>
                <div class="imgUploadBox-body">
                    <div class="imgUploadBox-left" v-if="isUser">
                        <ul>
                            <li class="active">默认</li>
                        </ul>
                    </div>
                    <div class="imgUploadBox-right" :class="{'sys':!isUser}">
                        <el-upload :action="uploadUrl" type="drag"
                        :multiple="true"
                        :show-upload-list="false"
                        :on-preview="handlePreview" 
                        :on-remove="handleRemove"  
                        :on-success="handlSuccess" v-if="fileList.list.length==0">
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                        <ul class="upload-select clearfix userImg" v-if="fileList.list.length!=0">
                            <li v-for="(item,index) in fileList.list" :class="{'active':activeImg == item.path}" 
                            @click="itemActive(item.path)" :id="index">
                                  <img  :src="item.path" :alt="item.name">
                            </li>
                        </ul>
                        <el-pagination class="text-right"
                          layout="prev, pager, next"
                          @current-change="userChangePage" :current-page="userCurrentPage"
                          :page-count="fileList.pageCount" v-if="fileList.pageCount>0">
                        </el-pagination>
                    </div>
                </div>
          </el-tab-pane>
          <el-tab-pane name="second" :label="tabName" style="margin-top:10px" >
                <div class="used" v-if="isUser">
                    <span>素材用途：</span>
                    <el-select v-model="usedId" placeholder="请选择" size="small" @change="usedSelected">
                        <el-option
                          v-for="item in usedList"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="imgUploadBox-left" v-if="isUser">
                    <ul>
                        <li v-for="item in sysPicList.cateList" :class="{'active':item.selected}" @click="cateFn(item.id)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="imgUploadBox-right" :class="{'sys':!isUser}">
                    <div class="no-pic" v-if="sysPicList.list.length==0"><i class="el-icon-picture"></i><p>暂无图片</p></div>
                    <ul class="upload-select clearfix" v-if="sysPicList.list.length>0">
                        <li v-for="(item,index) in sysPicList.list" :class="{'active':activeImg === item.path}" @click="itemActive(item.path)">
                            <img :src="item.path" :alt="item.name">
                        </li>
                    </ul>
                    <el-pagination class="text-right"
                      layout="prev, pager, next"
                      @current-change="sysChangePage" :current-page="sysCurrentPage"
                      :page-count="sysPicList.pageCount" v-if="sysPicList.pageCount>0">
                    </el-pagination>
                </div>
          </el-tab-pane>
        </el-tabs>         
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="btnLoading" @click="doSelect">使用图片</el-button>
            <el-button  @click="closeUpload">取消</el-button>
         </div>
    </el-dialog>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    //接口url
    import URL from 'configs'
    import {
        getUploadList,
        getMaterial,
        getColumnPic,
        getTemplatePic
    } from 'ajaxAPI';

    export default {
        data() {
            return {
                activeName:'first',
                fileList: {
                    list: [],
                    pageCount: 0
                },
                cid: '0',
                activeImg: "",
                btnLoading: false,
                sysPicList: {
                    cateList: [],
                    list: [],
                    pageCount: 0
                },
                userCurrentPage: 1,
                sysCurrentPage: 1,
                usedList: [{
                    name: "",
                    id: "",
                    selected: false
                }],
                usedId: '0'

            };
        },
        computed: {
            ...mapGetters([
                'imgUpload'
            ]),
            tabName() {
                if (this.$route.params.siteMode === 'user') {
                    return "素材库";
                } else if (this.$route.params.siteMode === 'bannerMake') {
                    return "通栏图片";
                } else if (this.$route.params.siteMode === 'templateMake') {
                    return "模板图片";
                }
            },
            isUser() {
                return this.$route.params.siteMode === 'user';
            },
            uploadUrl() {
                let siteid = this.$route.params.siteid || this.$route.params.columnid;
                return URL[this.$route.params.siteMode + 'ImgUpload'] + '/' + siteid;
            },
            showUsed() {
                return this.$route.params.siteMode === 'user' || this.$route.params.siteMode === 'templateMake';
            }
        },
        methods: {
            ...mapActions([
                'closeUpload',
                'modifyModuleAdvanced',
                'modifyModuleImg',
                'updateBannerData'
            ]),
            handleRemove(file, fileList) {

            },
            handlePreview(file) {

            },
            //分页我的图库
            userChangePage(page) {
                let _this = this;
                _this.userCurrentPage = page;
                getUploadList(_this, {
                    "siteid": _this.$route.params.siteid,
                    "memberid": _this.$route.params.memberid,
                    "page_size": 10,
                    "page": page
                }, function(response) {
                    _this.fileList.list=[];
                    if(!!response.list){
                        _this.fileList.list = response.list;
                        _this.fileList.pageCount=response.page_count;
                    }
                    _this.activeImg="";
                    
                });
            },
            //素材库分页
            sysChangePage(page) {
                let _this = this;
                _this.sysCurrentPage = page;
                if (_this.tabName === '素材库') {
                    getMaterial(_this, {
                        "siteid": _this.$route.params.siteid,
                        "page_size":10,
                        "cid":_this.cid,
                        "page":page
                    },function(response){
                        _this.sysPicList.list=[];
                        if(!!response.list){
                            _this.sysPicList.list=response.list;
                            _this.sysPicList.pageCount=response.page_count;
                        }
                        _this.activeImg="";
                    })
                }else if(_this.tabName==='通栏图片'){
                    getColumnPic(_this,{
                        "columnId":_this.$route.params.columnid,
                        "page":page
                    },function(response){
                        _this.sysPicList.list=[];
                        if(!!response.list){
                            _this.sysPicList.list=response.list;
                            _this.sysPicList.pageCount=response.page_count;
                        }
                         _this.activeImg="";
                        
                    })
                } else if (_this.tabName === '模板图片') {
                    getTemplatePic(_this, {
                        "siteid": _this.$route.params.siteid,
                        "page":page
                    },function(response){ 
                        _this.sysPicList.list=[];
                        if(!!response.list){
                            _this.sysPicList.list=response.list;
                            _this.sysPicList.pageCount=response.page_count;
                        }
                        _this.activeImg="";
                        
                    })
                }

            },
            //获取素材库的内容
            getTabData(tab) {
                //console.log(tab.name, event);
                let _this = this;
                _this.sysCurrentPage = 1;
                _this.activeImg = "";
                if (tab.label == '素材库') {
                    _this.cid = '0';
                    _this.usedId = '0';
                    getMaterial(_this, {
                        "siteid": _this.$route.params.siteid,
                        "page_size":10,
                        "cid":_this.cid,
                        "used":_this.usedId
                    },function(response){
                        _this.sysPicList.list=!!response.list?response.list:[];    //图片列表
                        _this.sysPicList.cateList=!!response.cateList?response.cateList:[];   //图片分类
                        _this.usedList= !!response.usedList?response.usedList:[];            //用途
                        _this.sysPicList.pageCount=!!response.page_count?response.page_count:0;
                    })  
                }else if(tab.label=='通栏图片'){
                    getColumnPic(_this,{
                        "columnId":_this.$route.params.columnid
                    },function(response){
                        _this.sysPicList.list=!!response.list?response.list:[];
                        _this.sysPicList.pageCount=!!response.page_count?response.page_count:0;
                    })
                } else if (tab.label == '通栏图片') {
                    getColumnPic(_this, {
                        "columnId": _this.$route.params.columnid
                    }, function(response) {
                        _this.sysPicList.list = response.list || [];
                        _this.sysPicList.pageCount = response.page_count || 0;
                    })
                } else if (tab.label == '模板图片') {
                    getTemplatePic(_this, {
                        "siteid": _this.$route.params.siteid
                    },function(response){ 
                        _this.sysPicList.list=!!response.list?response.list:[];
                        _this.sysPicList.pageCount=!!response.page_count?response.page_count:0;
                    })
                }
            },
            //素材库分类点击
            cateFn(cid){
                let _this=this;
                _this.cid=cid;
                _this.sysCurrentPage=1;
                getMaterial(_this,
                    {
                        "siteid": _this.$route.params.siteid,
                        "page_size":10,
                        "cid":cid,
                        "used":_this.usedId
                    },function(response){
                        if(response.err_code===0){
                            _this.sysPicList.list=response.list || [];
                            _this.sysPicList.cateList=response.cateList || [];
                            _this.sysPicList.pageCount=response.page_count || 0;
                        }
                    }) 
            },
            //用途选择
            usedSelected(){
                let _this=this;
                getMaterial(_this,
                    {
                        "siteid": _this.$route.params.siteid,
                        "page_size":10,
                        "cid":_this.cid,
                        "used":_this.usedId
                    },function(response){
                        if(!!response.list){
                            _this.sysPicList.list=response.list;
                            _this.sysPicList.cateList=response.cateList;
                            _this.sysPicList.pageCount=response.page_count;
                        }
                    }) 
            },
            handlSuccess(response, file, fileList) {
                if (response.err_code == 0) {
                    let _this = this;
                    let item = {
                        cate: "",
                        name: response.info.client_name,
                        path: response.info.web_path,
                        size: response.info.file_size
                    };
                    if (this.isUser) {
                        _this.userChangePage(1)
                    } else {
                        this.fileList.list.unshift(item);
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: "上传失败!",
                        type: 'warning'
                    });
                }
            },
            itemActive(path) {
                this.activeImg = path;
            },
            doSelect() {
                console.log(this.activeImg)
                if (this.activeImg != "") {
                    if (this.imgUpload.mode === "module") {
                        this.modifyModuleImg({
                            target: this.imgUpload.target,
                            imgUrl: this.activeImg,
                            isBack: this.imgUpload.isBack,
                            container: this.imgUpload.container
                        });
                    } else {
                        this.updateBannerData({
                            target: this.imgUpload.target,
                            data: {
                                "background-image": "url(" + this.activeImg + ")"
                            }
                        });
                    }
                    // 关闭上传面板
                    this.closeUpload();
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择图片!',
                        type: 'warning'
                    });
                }
            }
        },
        created() {
            let _this = this;
            //用户图片列表
            if (_this.$route.params.siteMode === 'user') {
                getUploadList(_this, {
                    "siteid": this.$route.params.siteid,
                    "memberid": this.$route.params.memberid,
                    "page_size": 10
                }, function(response) {
                    if(!!response.list){
                        _this.fileList.list = response.list;
                        _this.fileList.pageCount=response.page_count;
                    }
                });
            }

            /*getMaterial(_this,{"siteid": _this.$route.params.siteid,"page_size":10},function(response){
                _this.sysPicList.list=response.list;
                _this.sysPicList.pageCount=response.page_count;
            })*/
        }
    }
</script>

<style>
.imgUploadBox .el-dialog{
    width: 740px;
}
.imgUploadBox .el-dialog__header{
    background: #1d8ce0;
    padding-top: 0;
    height: 30px;
    line-height: 30px;
    color: #fff;
}
.imgUploadBox .el-dialog__title {
    color: #fff;
    font-size: 14px;
}
.imgUploadBox .el-dialog__close{
    color: #fff;
}
.imgUploadBox .el-dialog__body{
    padding: 0;
}
.imgUploadBox .upImg{
    height: 46px;
    line-height: 46px;
    padding-left: 27px;
    color: #9aa6b6;
    border-bottom: solid 1px #d3dce6;
}

.imgUploadBox .upImg .upBtn{
    display: inline-block;
    width: 74px;
}

.imgUploadBox .el-tabs--border-card .el-tabs__content{
    padding: 0;
}
.imgUploadBox .imgUploadBox-body{
    height: 340px;
}
.imgUploadBox-left{
    height: 340px;
    width: 106px;
    float: left;
    border-right: solid 1px #d3dce6;
}
.imgUploadBox-left ul li{
    height: 25px;
    line-height: 25px;
    position: relative;
    color: #20a0ff;
    text-align: center;
    cursor: pointer;
}
.imgUploadBox-left ul li.active,.imgUploadBox-left ul li:hover{
    background: #20a0ff;
    color: #fff;
}

.imgUploadBox-right{
    width: 630px;
    height: 340px;
    float: left;
    overflow:hidden;
}
.imgUploadBox-right.sys{
    overflow-y:auto;
    float:none;
    margin: 0 auto; 

}
.imgUploadBox-right .el-upload{
    width: 100%;
    height:335px;
}
.imgUploadBox-right .el-dragger{
    width: 100%;
    height: 100%;
    border:0;
    padding-top: 50px;
}
.userImg{
    padding-top: 20px;
}
.upload-select {
    display: block;
    width: 100%;
    margin-bottom: 30px;
}

.upload-select li {
    display: block;
    width:97px;
    height:97px;
    background: #a69e9c;
    float: left;
    margin:0 0 7px 23px;
    border:solid 2px #fff;
    position: relative;
    cursor: pointer;
    line-height: 97px;
    overflow: hidden;
    text-align: center;
}


.upload-select li img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle; 
    margin-top: -3px;
}

.upload-select li.active {
    border: 2px solid #58b7ff;
}
.upload-select li.active:after{
    width: 15px;
    height: 15px;
    display: block;
    content: "";
    background: url(../../assets/images/sActive.png);
    position: absolute;
    top: 0;
    left: 0;
}
.imgUploadBox-right .text-right{
    text-align: right;
    padding-right: 30px;
}
.imgUploadBox .dialog-footer{
    text-align: center;
}

.no-pic{
    width: 50%;
    margin: 10px auto;
    text-align: center;
    font-size:200px;
    color: #dcdcdc;
}
.no-pic p{
    font-size: 16px;
}
.used{
    padding: 0 15px;
    margin-bottom: 10px;

}
.used .el-select{
    width: 120px;
    display: inline-block;
    vertical-align: middle;
}
</style>