<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="bst-content">
            <div class="banner-inside"
                :floatIndex="floatIndex">
                <component
                    v-for="(slotModule,index) in drag.slotModeules"
                    :key="slotModule.moduleId"
                    :module="slotModule"
                    :floatIndex="floatIndex"
                    :container = "container"
                    :floatModuleIndex="index"
                    :is="slotModule.moduleName" v-if="slotModule.moduleSet.advancedSetting.isShow">
                </component>
            </div>
        </div>
    </transition>
</template>

<script>
    import {
        any2Px
    } from "bUtils";
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    //接口url
    import {
        getModuleData,
        addBlankBanner
    } from 'ajaxAPI';

    import system from '../system/system.vue';
    import backToTop from '../backToTop/backToTop.vue';
    // import service from '../plugin/service/service.vue';
    export default {
        name: 'floatModules',
        props: {
            container: String,
            drag: Object,
            floatIndex: null
        },
        components: {
            system,
            backToTop,
            //service
        },
        computed: {
            ...mapGetters([
                'websiteInfo',
                'pageInfo',
                'layouts',
                'getModuleData',
                'getSelectBanner'
            ])
        },
        data() {
            return {
                maskShow: true, //是否显示遮罩
            }
        },
        methods: {
            ...mapActions([
                'switchBanner',
                'modifyBannerData',
                'addModuleToLayouts',
                'removeBanner',
                'moveUpBanner',
                'moveDownBanner',
                'openBannerSet',
                'openPublicSet',
                'pasteModuleToLayouts',
                'deleteOldAndAddNew',
                'addBanner',
                'getSettingInfo'
            ])
        },
        mounted: function() {

        }
    }
</script>