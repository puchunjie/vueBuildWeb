<template>
<a class="bst-module draggle-module smartMenu backToTop" :id="module.moduleId" :class="module.moduleId + 'styles'"
    v-if="module.moduleSet.advancedSetting.isShow && scrolled" @click="goBack()">
    <span :class="!imgurl1IsShow?'':'cover'">
    <div class="picBox">
    <img :src="module.moduleSet.advancedSetting.imgUrl" class="picture">
    <img :src="module.moduleSet.advancedSetting.imgUrl_1" class="coverPic" v-if="imgurl1IsShow">
    </div>
    </span>
    </a>
    </template>
    <script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import cssJson from 'cssJson';
export default {
    data() {
        return {
            draggable: false,
            scrolled: false
        }
    },
    computed: {
        ...mapGetters([
            'pageInfo'
        ]),
        imgurl1IsShow(){
            return this.module.moduleSet.advancedSetting.imgUrl_1!=null && this.module.moduleSet.advancedSetting.imgUrl_1!='none'
        }
    },
    components: {

    },
    created() {
        let module = this.pageInfo.floatModules[0].slotModeules[0];
        cssJson.toStyleHEAD(module, true);
        window.addEventListener('scroll', this.handleScroll);
    },
    props: {
        module: Object,
        floatIndex: null,
        floatModuleIndex: null,
        container: String
    },
    methods: {
        goBack:function(){
            var speed=200;//滑动的速度
            $('body,html').animate({ scrollTop: 0 }, speed);
            return false;
        },
        handleScroll () {
            this.scrolled = window.scrollY > 600;
        }
    }
}
</script>
<style>
.backToTop {
    position: absolute;
    cursor:pointer
}
.backToTop .move{
    width: 100%;
    height: 100%;
    display: block;
}
.backToTop .picBox {
    overflow: hidden;
    height: 100%;
    position: relative
}

.backToTop .lines {
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    border: 1px solid #fff
}

.backToTop img {
    vertical-align: top;
}

.backToTop .cover .coverPic{
    display: none;
}
.backToTop .cover:hover .coverPic {
    display: block;
}
.backToTop .cover:hover .picture {
    display: none;
}
</style>
