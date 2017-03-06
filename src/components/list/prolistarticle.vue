<template>
 <div class="prolist prolist_article" v-show="module.moduleSet.advancedSetting.prolistFlag" @mouseover="fixedProlistFlag=true" @mouseout="fixedProlistFlag=false">
    <div class="fixedBlockList" @click="prolistElFlag=true" v-show="module.fixedProlistFlag"></div>

    <!--
    <el-dialog title="产品列表设置" v-model="prolistElFlag">
    <prolistSet :module="module"></prolistSet>
    </el-dialog>
    -->

    <!--模块设置面板-->
    <transition enter-active-class="animated fadeIn">
    <div class="bst-cover-content" v-if="prolistElFlag">
    <div class="moduleSetBox" v-draggable>
    <h3 class="moduleSetBox-header">产品列表设置<i class="el-icon-close closeSet" @click="prolistElFlag=false"></i></h3>
        <prolistSet :module="module"></prolistSet>
    </div>
    </div>
    </transition>
    <!--模块设置面板-->
    <ul>
        <!--:href="val.link"-->
        <li v-for="(val,key) in list">
            <span><h3>{{val.addTime.split("-")[2]}}</h3><h4>{{val.addTime.split("-")[0]}}/</h4><h5>{{val.addTime.split("-")[1]}}</h5></span>
            <h2>{{val.name}}</h2>
            <p>{{val.des}}</p>
        </li>
        <div class="clearfix"></div>
    </ul>
    <div class="clearfix"></div>
</div>       
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
    import prolistSet from '../moduleSets/prolistSet.vue';

    export default {
        name: 'prolist',
        props: {
            module: Object,
            list: Array
        },
        components: {
            prolistSet
        },
        methods: {

        },
        computed: {
            ...mapGetters([
                "getModuleData"
            ]),
        },
        data() {
            return {
                draggable: false,
                hasBar: false,
                prolistElFlag: false,
                fixedProlistFlag: false
            }
        },
        created() {

        }
    }
</script>
<style type="text/css">
    .bst-banner-content .prolist_article ul{width:100%; display:block;border:none; background:none;margin-top:20px}
    .bst-banner-content .prolist_article ul li{height:130px; padding:30px 0; line-height:40px;border-bottom:1px dashed #f7f7f7; display:block; width:100%; text-align:left}
    .bst-banner-content .prolist_article ul li span{ background:#f2f2f2; float:left; color:#b3b3b1;font-size:12px;width:76px; height:76px;line-height:20px;text-align:center}
    .bst-banner-content .prolist_article ul li span h4,.bst-banner-content .prolist_article ul li span h5{float:left}
    .bst-banner-content .prolist_article ul li span h3{font-size:24px;padding-top: 18px;padding-bottom: 4px}
    .bst-banner-content .prolist_article ul li span h4{margin-left:13px}
    .bst-banner-content .prolist_article ul li h2{padding-left: 20px;height: 30px;overflow: hidden; text-overflow:ellipsis}
    .bst-banner-content .prolist_article ul li p{padding-left: 20px;overflow: hidden;height: 35px; text-overflow:ellipsis}
</style>