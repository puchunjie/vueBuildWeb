<template>
    <div class="bst-plugin-service bst-module draggle-module smartMenu" :id="module.moduleId" :class="module.moduleId + 'styles'">
        <div class="rightArrow">
            <a href="javascript:void(0);" title="在线客户"></a>
        </div>
        <div class="floatDivBoxs">
            <div class="floatDtt">在线客服</div>
            <div class="floatShadow">
                <ul class="floatDqq" v-show="module.moduleSet.advancedSetting.qqShow">
                    <li v-for="(v,k) in module.moduleSet.advancedSetting.qq">
                        <a target="_blank" :href="'tencent://message/?uin='+v.title+'&Site=sc.chinaz.com&Menu=yes'">
                            <img src="../../../../static/images/qq.png"> &nbsp;{{module.moduleSet.advancedSetting.qqTitle}}{{k+1}}
                        </a>
                    </li>
                </ul>
                <div v-show="module.moduleSet.advancedSetting.telShow">
                    <div class="floatDtxt">热线电话</div>
                    <div class="floatDtel">
                        <p v-for="el in module.moduleSet.advancedSetting.tel">{{el.title}}</p>
                    </div>
                </div>
                <div style="text-align: center;padding: 10px 0 5px;background:#EBEBEB;" v-show="module.moduleSet.advancedSetting.codeShow">
                    <img :src="module.moduleSet.advancedSetting.code" class="plugin-codepic">
                    <p>微信公众账号</p>
                </div>
            </div>
            <div class="floatDbg"></div>
        </div>
    </div>
</template>
<script>
    import {
        commonEventInit
    } from 'commonEventInit';
    import cssJson from 'cssJson';
    export default {
        props: {
            module: Object,
            floatIndex: null,
            floatModuleIndex: null,
            container: String
        },
        data() {
            return {
                //draggable:true
            }
        },
        methods: {
            
            /*eventInit: function() {
                let _this = this
                commonEventInit({
                    vm: this
                    
                });
            }*/
        },
        mounted: function() {
            cssJson.toStyleHEAD(this.module);
            var _this = this
            var flag = 1;
            var rightArrow = $(_this.$el).find(".rightArrow")
            rightArrow.on('click', function () {
                if (flag == 1) {
                    $(_this.$el).animate({right: '-175px'}, 300);
                    $(this).animate({right: '-5px'}, 300);
                    $(this).css('background-position', '-50px 0');
                    flag = 0;
                } else {
                    $(_this.$el).animate({right: '0'}, 300);
                    $(this).animate({right: '170px'}, 300);
                    $(this).css('background-position', '0px 0');
                    flag = 1;
                }
            });
        }

    }
</script>
<style>
.bst-plugin-service {
    position: fixed;
    /* width: 170px;
    top: 180px;
    right: 0; */
    z-index: 9999;
}

.floatDivBoxs {
    width: 170px;
    background: #fff;
}

.floatDivBoxs .floatDtt {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #f08326;
    color: #fff;
    font-size: 18px;
    text-indent: 22px;
    position: relative;
}

.floatDivBoxs .floatDqq {
    padding: 0 14px;
}

.floatDivBoxs .floatDqq li {
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    border-bottom: 1px solid #e3e3e3;
}

.floatDivBoxs .floatDqq li a {
    display: block;
    height: 100%;
    line-height: 45px;
    color:#333333;
}

.floatDivBoxs .floatDqq li a img {
    vertical-align: middle;

}

.floatDivBoxs .floatDtxt {
    font-size: 18px;
    color: #333;
    padding: 12px 14px 4px;
}

.floatDivBoxs .floatDtel p {
    padding-left: 14px;
    font-size: 20px;
    color: #cd5c0a;
    line-height: 30px
}

.floatDivBoxs .floatDtel img {
    display: block;
}

.floatDivBoxs .floatDbg {
    width: 100%;
    height: 20px;
    background: url(../../../../static/images/online_botbg.jpg) no-repeat;
    box-shadow: -2px 0 3px rgba(0, 0, 0, 0.25);
}

.floatShadow {
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
}

.rightArrow {
    width: 50px;
    height: 45px;
    background: red;
    background: url(../../../../static/images/online_arrow.jpg) no-repeat;
    position: absolute;
    top: 0;
    left: -50px;
    z-index: 999;
}

.rightArrow a {
    display: block;
    height: 45px;
}

.rightArrow a {
    display: block;
    height: 45px;
}
.plugin-codepic{
    width: 136px;
    height: 136px;
    margin-bottom: 5px;
}
</style>
