<template>
    <div class="bst-module draggle-module product-module smartMenu"
         :id="module.moduleId"
         :class="module.moduleId + 'styles'"
         @mousemove="eventInit">
        <div class="product-wrap">
            <ul class="conBox clearfix" :class="module.moduleSet.advancedSetting.cover == 'zir'? '': module.moduleSet.advancedSetting.cover ">
                <div class="addItem" v-if="isEmpty">
                    <span @click="openDataEdit">+点击添加数据</span>
                </div>
                <li v-for ="(el,index) in module.moduleSet.list" class="item" v-else>
                    <a v-bind="{'_href':el.url,'_target':module.moduleSet.advancedSetting.target}" class="itemBox" >
                        <div class="imgBox">
                            <img :src="el.pic"
                                 :class="module.moduleSet.advancedSetting.cover == 'zir'? module.moduleSet.advancedSetting.cover : ''"
                                 v-if="el.pic != null" />
                            <span v-else>没有缩略图</span>
                        </div>
                        <div class="textBox">
                            <p class="title" v-if="module.moduleSet.advancedSetting.titleShow">{{el.title}}</p>
                            <!--<span class="price" v-if="module.moduleSet.advancedSetting.priceShow">{{el.price}}</span>-->
                        </div>
                        <i class="label" v-if="el.labelShow" :class="el.label"></i>
                        <div class="cover" v-if="module.moduleSet.advancedSetting.cover == 'covers'"></div>
                    </a>
                </li>
            </ul>
        </div>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <p class="dialog_text">获取不到当前模块，请保存页面后重新获取！</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savePage">保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    require('./product.css');
    import modulemixin from '../moduleMixin.js';
    import cssJson from 'cssJson';
    import {
        savePage,
        getClassification
    } from 'ajaxAPI';
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    import {
        commonEventInit
    } from 'commonEventInit';

    export default {
        mixins: [modulemixin],
        computed: {
            ...mapGetters([
                'websiteInfo',
                'pageInfo'
            ]),
            isEmpty() {
                return this.module.moduleSet.list == undefined ? true : this.module.moduleSet.list.length == 0 ? true : false
            },
            upData() {
                return this.module.moduleSet.upData
            },
            itemWidth() {
                return (100 / parseInt(this.module.moduleSet.advancedSetting.column))+ '%'
            }
        },
        methods: {
            ...mapActions([
                'openModuleSet',
                'modifyModuleStyle'
            ]),
            eventInit() {
                var _this = this
                var $el = $(_this.$el)
                commonEventInit({
                    vm: _this,
                    handles:'e,w,ne,se,nw,sw',
                    resizeStart:function(){
                        $el.css('height', 'auto')
                    },
                    resizeing: function() {
                        $el.css('height', 'auto')
                       // _this.setHeight()
                    },
                    resizeStop:function(){
                        _this.module['$styles'].container.height = 'auto'
                        //_this.zoom()
                        /*$el.find(".imgBox").css('height',function(){
                           return  $(this).find("img").height()
                        })*/
                        $el.css('height', 'auto')
                    },
                    dragStart: function() {
                        $el.css('height','auto')
                    },
                    draging:function(){
                        $el.css('height','auto')
                    },
                    dragStop:function(){
                        $el.css('height','auto')
                    }
                });
            },
            /*zoom() {
                if (this.module.moduleSet.advancedSetting.cover == 'zir') {
                    $(".zir").zoomImgRollover();
                }
            },*/
            openDataEdit() {
                if (!!this.module.id && this.module.id!=='createNewModule') {
                    this.openModuleSet('dataEdit')
                } else {
                    this.dialogVisible = true
                }
            },
            savePage() {
                let _this = this;
                savePage(_this, {
                    pageid: this.pageInfo.pageid,
                    memberid: this.websiteInfo.memberid,
                    siteid: this.websiteInfo.siteid,
                    content: this.pageInfo.layouts,
                    floatModules: this.pageInfo.floatModules,
                    columnid: parseInt(this.$route.params.columnid)
                }, function(response) {
                    if (response.err_code === 0) {
                        _this.dialogVisible = false
                        _this.$message.success(response.msg);
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000)
                    } else {
                        _this.dialogVisible = false
                        _this.$message.error(response.msg);
                    }
                })
            },
            getList() {
                var _this = this
                var $el = $(_this.$el)
                getClassification(_this, {
                    moduleid: _this.module.id,
                    source: _this.module.moduleSet.cate,
                    dataType: 2,
                    siteid:_this.$route.params.siteid
                }, function(response) {
                    if (response.list &&　response.err_code==0) {
                        _this.module.moduleSet.list = []
                        _this.module.moduleSet.list = response.list
                    }
                    /*setTimeout(function() {
                        _this.zoom()
                    }, 100)*/
                })
            },
            clearWindow() {
                $(this.$el).addClass("ui-resizable-autohide");
            },
            setHeight(){
                let $el = $(this.$el)
                let h = $('.itemBox',$el).outerHeight()
                let pt = parseInt($('.item',$el).css("padding-top"))
                let pm = parseInt($('.item',$el).css('padding-bottom'))
                this.modifyModuleStyle({
                    elTarget:'.item',
                    attributetarget:{
                        'height':h+pt+pm+'px'
                    }
                })
            }
        },
        mounted: function() {
            let _this = this
            this.module['$styles']['.item'].width = this.itemWidth;

            cssJson.toStyleHEAD(this.module)
           /* setTimeout(function(){
                _this.setHeight()
            },300)*/
            //this.zoom()
            if (!!this.module.id && this.module.id!=='createNewModule') {
                this.getList()
            }
        },
        watch: {
            upData() {
                var _this = this
                _this.getList()
            },
            itemWidth() {
                this.modifyModuleStyle({
                    elTarget:'.item',
                    attributetarget:{
                        'width':this.itemWidth
                    }
                })
                //this.setHeight()
            }
        },
        data() {
            return {
                dialogVisible: false,
                itemHeight:0
            }
        }
    }
</script>
<style>
    .product-module .el-dialog__header,
    .product-module .el-dialog__footer,
    .product-module .dialog_text {
        text-align: center
    }
    
    .product-module .el-dialog__headerbtn {
        display: none
    }
    .product-wrap .conBox .item .imgBox{
        overflow: hidden;
    }
    .product-wrap .conBox .item .imgBox img{
        width: 100%;
    }
    .product-wrap .conBox .item .imgBox .zir{
        transition: all 1s;
        -webkit-transition:all 1s;
        -moz-transition:all 1s;
        -o-transition:all 1s;
        -ms-transition:all 1s;
    }
    .product-wrap .conBox .item .imgBox .zir:hover{
        -moz-transform:scale(1.5); 
        -webkit-transform:scale(1.5); 
        -o-transform:scale(1.5); 
    }
</style>