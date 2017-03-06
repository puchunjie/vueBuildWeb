<template>
    <div class="data-edit-con">
        <div class="data-edit-alert" v-if="!getModuleData.id|| getModuleData.id==='createNewModule'">
            <div class="data-edit-btn">
                <p>获取不到当前模块，请保存页面后重新获取！</p>
                <el-button type="primary" @click="savePage">保 存</el-button>
                <el-button @click="closeModuleSet">取 消</el-button>
            </div>
        </div>
        <el-tabs>
            <el-tab-pane label="内容编辑" name="first">
                <div class="data-edit-part clearfix">
                    <span class="data-edit-title">数据分类</span>
                    <el-radio v-for="el in cateOption" class="radio" v-model="getModuleData.moduleSet.cate" :label="el.label">{{el.name}}</el-radio>
                </div>
                <div class="data-edit-part clearfix">
                    <el-input
                        placeholder="输入检索"
                        icon="search"
                        v-model="retrieval"
                        size="small"
                        @change="retrievalData">
                    </el-input>
                </div>
                <div class="el-row" style="padding:10px">
                    <div class="el-col el-col-11">
                        <ul class="data-edit-data">
                            <li v-for="el in state" @click="select(el)" v-show="!el.isSelected">
                                {{el.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="el-col el-col-2">
                        <div class="r-array">
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </div>
                    <div class="el-col el-col-11">
                        <ul class="data-edit-data select-data">
                            <li v-for="(el,index) in selectData" :id="index" :key="el.id">
                                <span>{{el.name}}</span>
                                <div class="data-edit-btn-box">
                                    <i class="el-icon-arrow-up"
                                       title="上移"
                                       @click="operation(index,'up')"
                                       v-show="index != 0"></i>
                                    <i class="el-icon-arrow-down"
                                       title="下移"
                                       @click="operation(index,'down')"
                                       v-show="index != selectData.length-1"></i>
                                    <i class="el-icon-close"
                                       title="删除"
                                       @click="operation(index,'remove')"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="data-edit-updata">
                    <el-button type="success" @click="upData">更新数据</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import {
        getClassificationSub,
        savePage,
        saveDataSource
    } from 'ajaxAPI';

    export default {
        components: {

        },
        props: {
            ishide: Boolean
        },
        computed: {
             ...mapGetters([
                'websiteInfo',
                'pageInfo',
                'getModuleData'
             ]),
             ids(){
                let arr = []
                $(this.selectData).each(function(){
                    arr.push($(this)[0].id)
                })
                return arr.join(',')
             }
        },
        methods: {
            ...mapActions([
                'closeModuleSet',
                'modifyModuleAdvanced'
            ]),
            select(el) {
                this.selectData.push(el)
                el.isSelected = true
            },
            operation(k,t) {
                if(t == 'up'){
                    this.selectData[k] = this.selectData.splice(k-1, 1, this.selectData[k])[0];
                }else if(t == 'down'){
                    this.selectData[k] = this.selectData.splice(k+1, 1, this.selectData[k])[0];
                }else {
                    let _index = this.selectData[k].index
                    this.selectData.splice(k,1)
                    this.state[_index].isSelected = false
                }
            },
            savePage(){
                let _this = this;
                _this.dialogVisible = false
                savePage(_this, {
                    pageid: this.pageInfo.pageid,
                    memberid: this.websiteInfo.memberid,
                    siteid: this.websiteInfo.siteid,
                    content: this.pageInfo.layouts,
                    floatModules: this.pageInfo.floatModules,
                    columnid: parseInt(this.$route.params.columnid)
                }, function(response) {
                    if (response.err_code === 0) {
                        _this.closeModuleSet()
                        _this.$message.success(response.msg);
                        setTimeout(function(){
                            window.location.reload()
                        },1000)
                    } else {
                        _this.closeModuleSet()
                        _this.$message.error(response.msg);
                    }
                })
            },
            chooseData(source){
                var _this = this
                if(!!this.getModuleData.id && this.getModuleData.id!=='createNewModule'){
                    let selectArr=this.getModuleData.moduleSet.list;
                    getClassificationSub(_this,{
                        moduleid:_this.getModuleData.id,
                        siteid:_this.$route.params.siteid,
                        source:source
                    },function(response){
                        _this.searchData = response.list
                        _this.state = response.list
                        _this.selectData = []
                        $(selectArr).each(function(i,v){
                            $(_this.state).each(function(index,el){
                                el.index = index
                                if(el.isSelected && el.id==v.id){
                                    _this.selectData.push(el)
                                }
                            })
                        })
                        /*$(_this.state).each(function(index,el){
                            el.index = index
                            if(el.isSelected){
                                _this.selectData.push(el)
                            }
                        })*/
                    })
                }
            },
            upData(){
                var _this = this
                saveDataSource(_this,{
                    moduleid:_this.getModuleData.id,
                    source:_this.getModuleData.moduleSet.cate,
                    ids:_this.ids,
                    siteid:_this.$route.params.siteid
                },function(){
                    _this.closeModuleSet()
                    _this.getModuleData.moduleSet.upData = !_this.getModuleData.moduleSet.upData
                })
            },
            retrievalData(){
                let _this = this;
                let sd = $.trim(this.retrieval.toUpperCase());
                let arr = [];
                $(_this.searchData).each(function(index,el){
                    if(el.name && el.name.indexOf(sd) != -1){
                        arr.push(el)
                    }
                })
                _this.state = arr
            }
        },
        mounted: function() {
            this.chooseData(this.getModuleData.moduleSet.cate)
            this.$watch('getModuleData.moduleSet.cate',function(newVal,oldVal){
                this.chooseData(newVal)
            })
            this.$watch('retrieval',function(){
                this.retrievalData()
            })
            var _this = this
            var $el = $(_this.$el)
            $(".select-data",$el).sortable({
                cursor: "move",
                items: "li", //只是li可以拖动
                opacity: 0.6, //拖动时，透明度为0.6
                revert: true, //释放时，增加动画
                update: function(event, ui) { //更新排序之后
                    var key = $(ui.item[0]).attr('id')
                    var index = $(ui.item[0]).index()
                    var arr = _this.selectData.splice(key, 1)
                    _this.selectData.splice(index, 0, arr[0])
                }
            })
        },
        data() {
            return {
                cateOption:[
                    {label:"product",name:"商品"},
                    {label:"case",name:"案例"}
                ],
                retrieval:'',
                state:[],
                searchData:[],
                selectData:[],
                cate:''
            }
        }
    }
</script>

<style>
    .data-edit-con {
        position:relative
    }
    .data-edit-alert {
        position:absolute;
        width:100%;
        height:100%;
        background:rgba(255,255,255,.9);
        z-index:10;
        text-align:center
    }
    .data-edit-btn {
        position:absolute;
        width:100%;
        height:180px;
        left:0;
        top:40%;
        margin-top:-80px;
    }
    .data-edit-btn p{
        margin-bottom:100px;
        font-size:16px;
    }
    .data-edit-part {
        padding:10px;
    }
    .data-edit-part>* {
        float: left;
        display: block;
        margin-right: 25px;
        line-height:36px;
    }
    .data-edit-data {
        height: 400px;
        border: 1px solid #ddd;
        border-radius: 10px;
        vertical-align: middle;
        padding: 10px;
        overflow-x: hidden;
    }
    .r-array {
        height:400px;
        text-align:center
    }
    .data-edit-data li {
        width: 100%;
        height: 25px;
        float: left;
        padding: 0 10px;
        line-height:25px;
        border-radius: 3px;
        margin: 5px 0;
        cursor: pointer;
        color: #000;
        overflow:hidden;
        position:relative
    }
    .select-data li{
        cursor: move;
    }
    .select-data li * {
        float:left;
        overflow:hidden
    }
    .select-data li span {
        width: 100px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .select-data li i {
        color:#99A9BF;
        font-size: 12px;
        margin-left: 6px;
        cursor: pointer;
    }
    .select-data li i.el-icon-close {
        color:#FF4949
    }
    .data-edit-btn-box {
        position:absolute;
        right: 0;
        top: 6px;
    }
    .data-edit-updata {
        padding:10px;
    }
   

</style>