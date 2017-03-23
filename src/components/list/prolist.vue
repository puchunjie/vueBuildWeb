<template>
 <div class="prolist" v-show="module.moduleSet.advancedSetting.prolistFlag" @mouseover="fixedProlistFlag=true" @mouseout="fixedProlistFlag=false">
    <div class="fixedBlockList" @click="prolistElFlag=true" v-show="fixedProlistFlag && module.type!='case'"></div>

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

    <dl v-for="(val,key) in list">
        <dt>
        <!--:href="val.link"-->
         <a><img :src="val.pic" alt=""></a>
        </dt>
        <!--<dd v-show="module.type!='case'">{{val.price==null?'暂无定价':val.price}}</dd>-->
        <dd class="prolistName" v-show="module.moduleSet.advancedSetting.selected.indexOf('主标题')!==-1"><a :href="val.link">{{val.name}}</a></dd>
        <!--<ul v-if="module.type=='product'" v-bind:style="{backgroundImage:(module.moduleSet.advancedSetting.selected.indexOf('评价')==-1 || module.moduleSet.advancedSetting.selected.indexOf('购物车')==-1) ? 'none' : ''}" v-show="module.moduleSet.advancedSetting.selected.indexOf('评价')!==-1 || module.moduleSet.advancedSetting.selected.indexOf('购物车')!==-1">
            <li v-show="module.moduleSet.advancedSetting.selected.indexOf('评价')!==-1"><span class="list">{{val.salenum}}人+</span>评价</li>
            <li class="prolist_li" v-show="module.moduleSet.advancedSetting.selected.indexOf('购物车')!==-1"><a href="#">购物车</a></li>
        </ul>-->
        <div class="clearfix"></div>
    </dl>
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