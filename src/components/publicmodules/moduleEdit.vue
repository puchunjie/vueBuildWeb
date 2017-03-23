<template>
    <div class="bst-module-edit">
        <ul>
            <li v-for="(el,index) in list" :id="index" :key="el.uuid" class="clearfix">
                <div class="bst-module-edit-wrap">
                    <div class="bst-module-edit-box" :class="{'hasPic':el.imgUrl!='','noPic':el.imgUrl==''}">
                        <img :src="el.imgUrl" />
                        <div class="bst-module-edit-upload">
                            <i @click="imgUpload(index)">更换图片</i>
                        </div>
                    </div>
                    <div class="bst-module-edit-input">
                        <el-input placeholder="链接" :disabled="true" v-model="el.href" size="small">
                            <el-button slot="append" @click="linkPane(index)" type="success">选择链接</el-button>
                        </el-input>
                        <p style="height:20px;margin:0;padding:0"></p>
                        <el-input v-model="el.title" size="small" v-on:blur="onblur(el)">
                        </el-input>
                    </div>
                    <div class="bst-module-edit-buttin">
                        <el-button type="danger" @click="removeItemFun(index)">删除</el-button>
                    </div>
                </div>
            </li>
        </ul>
        <div class="bst-module-add" @click="addItemFun">+ 添加图片</div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        props: {
            ishide: Boolean
        },
        computed: {
            ...mapGetters([
                'getModuleData'
            ]),
            list(){
                let _this = this;
                let list = this.getModuleData.moduleSet.list;
                list.map(function(el,index){
                    _this.$set(el,'uuid',_this.getuuid())
                })
                return list
            }
        },
        created(){
        },
        methods: {
            ...mapActions([
                'openLinkSet',
                'closeModuleSet',
                'modifyModuleData',
                'openUpload'
            ]),
            save(elementTarget) {},
            onChange(data) {
                var payload = JSON.parse(JSON.stringify(this.getModuleData))
                this.modifyModuleData(payload)
            },
            addItemFun() {
                let addItem = _.clone(this.addItem)
                this.getModuleData.moduleSet.list.push(addItem)
            },
            removeItemFun(index) {
                this.list.length == 1 ?   this.$message({message: '必须预留一条数据！',type: 'warning'}) : this.list.splice(index, 1)
            },
            imgUpload(index) {
                this.openUpload({
                    target: 'moduleSet>list>' + index + '>imgUrl',
                    isBack: false,
                    mode: 'module'
                })
            },
            linkPane(index,href){
                let _this=this;
                this.openLinkSet({
                    hasTarget:false,
                    el: 'moduleSet>list>' + index + '>href',
                    //iTarget:'moduleSet>list>' + index + '>target',
                    iType:'moduleSet>list>' + index + '>type',
                    href:_this.getModuleData.moduleSet.list[index].href,
                    target:_this.getModuleData.moduleSet.list[index].target,
                    linkType:_this.getModuleData.moduleSet.list[index].type?_this.getModuleData.moduleSet.list[index].type:'custom'
                })
            },
            getuuid() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";
                var uuid = s.join("");
                return uuid;
            },
            onblur(el){
                if(el.title.length>200){
                   el.title = el.title.substring(0,el.title.length-1);
                   this.$message.error('最多只能输入200个字符!');
                }
            }
        },
        mounted: function() {
            let _this = this
            let $el = $(_this.$el)
            $(".bst-module-edit ul").sortable({
                cursor: "move",
                items: "li", //只是li可以拖动
                opacity: 0.6, //拖动时，透明度为0.6
                revert: true, //释放时，增加动画
                update: function(event, ui) { //更新排序之后
                    var key = $(ui.item[0]).attr('id')
                    var index = $(ui.item[0]).index()
                    var arr = _this.list.splice(key, 1)
                    _this.list.splice(index, 0, arr[0])
                }
            })


        },
        data() {
            return {
                addItem: {
                    "title": "暂无",
                    "href": "",
                    "imgUrl": ""
                }
            }
        }
    }
</script>

<style>
    .bst-module-edit {
        max-height: 400px;
        overflow-y: auto;
    }
    .bst-module-edit li {
        width: 750px!important;
        height: 100px!important;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
        background: #fff
    }
    .bst-module-edit-wrap {

    }
    .bst-module-edit li .bst-module-edit-wrap>* {
        float: left
    }

    .bst-module-edit-box {
        width: 150px;
        height: 88px;
        margin: 5px;
        border-radius: 4px;
        overflow: hidden;
        position: relative
    }
    
    .bst-module-edit-box img {
        width: 100%;
        height: 100%
    }
    
    .bst-module-edit-upload {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 100%;
        top: 0;
        background: rgba(0, 0, 0, 0.6)
    }
    
    .bst-module-edit-upload i {
        display: block;
        width: 70px;
        height: 24px;
        background: #20a0ff;
        font-size: 14px;
        text-align: center;
        line-height: 24px;
        margin: 32px auto 0;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
    }
    
    .bst-module-edit-box.hasPic:hover .bst-module-edit-upload {
        left: 0
    }
    .bst-module-edit-box.noPic .bst-module-edit-upload {
        left: 0
    }
    .bst-module-edit-input {
        width: 270px;
        margin: 10px 0 0 30px;
    }
    
    .bst-module-edit-buttin {
        margin: 32px 0 0 72px
    }
    
    .bst-module-add {
        width:750px;
        height: 40px;
        border: 1px dashed #1d8ce0;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        cursor: pointer
    }
    
    .bst-module-edit-input .el-input-group__append {
        cursor: pointer
    }
</style>