<template>
    <div id="setlink">
        <ul class="setlink-header">
            <li  :class="{'selected':linkType=='product'}" @click="getlinkdata('product')" v-if="!isbannerMake">产品</li>
            <li  :class="{'selected':linkType=='article'}" @click="getlinkdata('article')" v-if="!isbannerMake">新闻</li>
            <li  :class="{'selected':linkType=='case'}" @click="getlinkdata('case')" v-if="!isbannerMake">案例</li>
            <li  :class="{'selected':linkType=='page'}" @click="getlinkdata('page')" v-if="!isbannerMake">页面</li>
            <li  :class="{'selected':linkType=='custom'}" @click="getlinkdata('custom')"><a>自定义</a></li>
        </ul>
        <div class="setlink-body">
            <div class="setlink-info">
                <ul>
                    <li class="clearfix">
                        <label class="label-link">指向页面</label>
                        <el-select v-model="linkdata.link" placeholder="请选择" class="selbox" v-show="linkType!='custom'" v-if="!isbannerMake">
                            <el-option v-for="item in linkdata.linkList" :label="item.name" :value="item.link">
                            </el-option>
                        </el-select>
                        <el-input placeholder="输入网址,如http://www.baidu.com" v-model="linkdata.link" class="link-sd" v-show="linkType=='custom'">
                        </el-input>
                    </li>
                    <li v-if="linkSetData.hasTarget">
                        <label class="label-link">跳转方式</label>
                        <el-radio class="radio" v-model="target" label="_self">本页跳转</el-radio>
                        <el-radio class="radio" v-model="target" label="_blank">打开新页面</el-radio>
                    </li>
                </ul>
            </div>
            <div class="setlink-btm">
                <el-button type="primary" id="setLinkSub" @click="submitLinkData">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    getLinkList
} from 'ajaxAPI';
export default {
    name: 'linkpane',
    computed: {
        ...mapGetters([
            'toolSet',
            'websiteInfo',
            'getModuleData',
            'linkSetData'
        ]),
        isbannerMake(){
            return this.$route.params.siteMode==='bannerMake'
        }
    },
    props: {
        ishide: Boolean
    },
    created: function() {
        let _this=this,
        siteid=_this.websiteInfo.siteid;
        _this.target=_this.linkSetData.target;
        if(_this.isbannerMake){
            _this.linkType='custom'
        }else{
            _this.linkType=_this.linkSetData.linkType;
        }
        
        _this.oldLink=_this.linkdata.link=_this.linkSetData.href;
        if(_this.linkType!='custom'){
            let sendLinkParam = {
                "siteid": siteid,
                "type": _this.linkType
            };
            getLinkList(_this, sendLinkParam, function(response) {
                var linkList = response.info;
                /*$.each(linkList, function(i, v) {
                    if (v.link != null) {
                        var linkStr = "/pages/" + v.link.split(".")[0].toString().split("_")[0] + "/" + v.link.split(".")[0].toString().split("_")[0] + ".html?pid=" + v.id + '&wid=' + siteid;
                        v.link = linkStr;
                    }
                })*/
                _this.linkdata.linkList = linkList;
            });
        }    
    },
    methods: {
        ...mapActions([
            'closeLinkSet',
            'modifyModuleData',
            'switchSelectModuleKey',
            'modifyModuleLink'
        ]),

        getlinkdata: function(type) {
            let _this = this;
            _this.linkType = type; 
            if(type==_this.linkSetData.linkType){
                _this.linkdata.link=_this.oldLink;
            }else{
                _this.linkdata.link="";
            }
            let siteid = _this.websiteInfo.siteid;
            if (type && type != "" && type != "custom") {
                let sendLinkParam = {
                    "siteid": siteid,
                    "type": type
                };
                getLinkList(_this, sendLinkParam, function(response) {
                    var linkList = response.info;
                    /*$.each(linkList, function(i, v) {
                        if (v.link != null) {
                            var linkStr = "/pages/" + v.link.split(".")[0].toString().split("_")[0] + "/" + v.link.split(".")[0].toString().split("_")[0] + ".html?pid=" + v.id + '&wid=' + siteid;
                            v.link = linkStr;
                        }
                    })*/
                    _this.linkdata.linkList = linkList;

                    
                })
            }
        },
        IsURL:function(str_url){
                let re=/^(https?:\/\/)([\w\.-=\?&]+)/;
                if (re.test(str_url)){
                    return true;
                }else{
                    return false;
                }
        },
        submitLinkData: function() {
            let _this=this;
             _this.linkdata.target = this.targetType;
            let linkurl= _this.linkdata.link;
            let linkType=_this.linkType;
            /*if(linkurl===""){
                _this.$message({
                    showClose: true,
                    message: '请输入链接!',
                    type: 'warning'
                })
                return false;
            }else if(linkType=='custom' && !_this.IsURL(linkurl)){
                 _this.$message({
                    showClose: true,
                    message: '请输入正确链接,以http开头!',
                    type: 'warning'
                })
                return false;
            }*/
            if(linkType=='custom' && linkurl!="" && !_this.IsURL(linkurl)){
                 _this.$message({
                    showClose: true,
                    message: '请输入正确链接,以http开头!',
                    type: 'warning'
                })
                return false;
            }
            /*if(_this.getModuleData.moduleName==='word'){
               let activeEditor = tinymce.activeEditor;
               //console.log(activeEditor.selection.getContent({'format':'raw'}))
                tinyMCE.execCommand('mceReplaceContent',false,
                    '<a data-href="'+linkurl+'"  data-target="'+_this.linkdata.target+'" linktype="'+linkType+'">'+activeEditor.selection.getContent({'format':'raw'})+'</a>');
                let moduleData = _this.getModuleData;
                moduleData.moduleSet.advancedSetting.wordDetails=activeEditor.getContent();
                _this.modifyModuleData(moduleData);
                tinymce.remove();  
            }else{
                _this.modifyModuleLink({
                    el: _this.linkSetData.el,
                    iTarget:_this.linkSetData.iTarget,
                    iType:_this.linkSetData.iType,
                    href:_this.linkdata.link,
                    target:_this.target,
                    linkType:_this.linkType
                })
            }*/
            _this.modifyModuleLink({
                    el: _this.linkSetData.el,
                    iTarget:_this.linkSetData.iTarget,
                    iType:_this.linkSetData.iType,
                    href:_this.linkdata.link,
                    target:_this.target,
                    linkType:_this.linkType
            })
            _this.closePane()
        },
        closePane(){
            this.closeLinkSet();
            this.linkType='custom';
            this.target='_self';
            this.oldLink='';
            this.linkdata.link='';
        }
    },
    data() {
        return {
            linkType: 'custom',
            target:'_self',
            oldLink:'',
            linkdata: {
                pageId: null,
                pid: 0,
                name: "",
                ename: "",
                link: "",
                linkList: [] //请求获取所有链接
            }
        }
    },
    mounted: function() {
        /*var _this = this;
        $(_this.$el).find(".setlink-header li").click(function() {
            var index = $(this).index()
            $(this).addClass("selected").siblings().removeClass("selected")
        })*/
    }
}
</script>
<style>
/*setlink*/
#setlink {
    background: #fff;
    border: 1px solid #d3dce6;
    font-size: 14px;
}

.setlink-header {
    height: 42px;
    background: #eff2f7;
}

.setlink-header li {
    border: 1px solid transparent;
    border-top: 0;
    margin-right: -1px;
    margin-left: -1px;
    float: left;
    line-height: 42px;
    padding: 0 16px;
    height: 42px;
    font-size: 14px;
    color: #8492a6;
    margin-bottom: -1px;
    cursor: pointer;
}

.setlink-header li.selected {
    background: #fff;
    border-left-color: #d3dce6;
    border-right-color: #d3dce6;
}

.setlink-body {
    padding: 40px 30px;
}

.setlink-info {
    height: 150px;
}

#setlink .el-select {
    width: 200px;
    float: left;
    vertical-align: middle;
}

#setlink .label-link {
    font-size: 14px;
    margin-right: 15px;
    float: left;
    height: 36px;
    line-height: 36px;
}

#setlink .link-target {
    vertical-align: middle;
}

#setlink ul li {
    font-size: 14px;
    margin-bottom: 15px;
}

#setlink .selbox {
    width: 250px;
    height: 25px;
}

#setlink .link-sd {
    height: 25px;
    width: 300px;
    float: left;
}

#setlink .setlink-btm {
    text-align: center;
}

#setlink .popup-tj .linkbtn {
    background: #5e87b0;
    width: 135px;
    height: 36px;
    border: none;
    line-height: 36px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    display: block;
    margin: 0 auto;
    cursor: pointer;
}

#setLinkSub {
    width: 100px;
}
#setlink  .radio{
    line-height: 36px;
}
</style>
