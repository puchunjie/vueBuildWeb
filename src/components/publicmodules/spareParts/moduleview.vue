<template>
    <div class="bst-left-viewbox" v-show="ishide">
        <div class="viewbox-bottom-content">
            <i class="iconfont iconfont-guanbi" @click="closeModuleView">&#xe60d;</i>
            <component :is="componentName" :moduleInfo="moduleInfo"></component>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import leftNormal from './leftNormal.vue';
    import leftWord from './leftWord.vue';
    import leftMenu from './leftMenu.vue';
    import leftAtlas from './leftAtlas.vue';
    import leftSideBanner from './leftSideBanner.vue';
    import leftPlugin from './leftPlugin.vue';
    import leftLine from './leftLine.vue';
    import leftBanner from './leftBanner.vue';
    import leftGraph from './leftGraph.vue';
    import columnview from './columnview.vue';
    import leftSys from './leftSys.vue';
    export default {
        props: {
            moduleInfo: Object,
            ishide: Boolean,
            componentName: String
        },
        components: {
            leftNormal,
            leftWord,
            leftMenu,
            leftAtlas,
            leftSideBanner,
            leftPlugin,
            columnview,
            leftLine,
            leftBanner,
            leftGraph,
            leftSys
        },
        data() {
            return {}
        },
        methods: {
            ...mapActions([
                'closeModuleView'
            ])
        }
    }
</script>
<style>
    /*左侧公共栏*/
    
    .dragHelper {
        list-style: none;
        position: fixed;
        z-index: 9999;
        min-width: 230px;
        /*max-height: 230px;*/
    }
    
    .dragHelper img {
        max-width: 100%;
    }
    
    .dragHelper .name {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        margin: 0;
        background-color: rgba(51, 51, 51, 0.85);
        display: none;
    }
    
    .viewbox-header {
        border-bottom: solid 1px #dcdcdc;
        line-height: 30px;
        margin-bottom: 15px;
    }
    
    .viewbox-header span {
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
        margin-right: 5px;
    }
    
    .viewbox-header span:hover,
    .viewbox-header span.active {
        background: #4d8ed0;
        border-radius: 10px;
        color: #FFF;
    }
    
    .font-body li {
        margin-bottom: 10px;
    }
    
    .font-body li p {
        margin: 0;
        padding: 0;
    }
    
    .bst-left-viewbox {
        padding: 12px 10px;
        background: url(../../../assets/images/bst-left-viewboxbg.png) repeat-y;
        width: 276px;
        position: fixed;
        left: 51px;
        top: 37px;
        /*height: 100%;*/
        bottom: 0;
        overflow-y: auto;
        z-index: 1001;
        transition: left .15s;
        -moz-transition: left .15s;
        -webkit-transition: left .15s;
        -o-transition: left .15s;
    }
    
    .bst-left-viewbox.leave {
        left: -276px;
    }
    
    .viewbox-title {
        position: relative;
    }
    
    .viewbox-title>ul {
        border-bottom: 1px solid #cccccc
    }
    
    .viewbox-title>ul>li {
        font-size: 14px;
        float: left;
        line-height: 28px;
        margin: 5px 8px;
    }
    
    .viewbox-title>ul>li a {
        color: #666666;
        display: block;
        padding: 0 10px;
        text-decoration: none;
    }
    
    .viewbox-title>ul>li a:hover {
        background: #4d8ed0;
        border-radius: 10px;
        color: #FFF
    }
    
    .viewbox-title>ul>li a.selected {
        background: #4d8ed0;
        border-radius: 10px;
        color: #FFF
    }
    
    .viewbox-title>ul a.icon-guanbi {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
    
    .viewbox-bottom-content {
        /*overflow:auto;*/
        position: relative;
        padding: 15px 10px 10px 4px;
        background: #FFF;
        margin: 7px 0 7px 7px;
        max-width: 97%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #666666
    }
    
    .viewbox-bottom-content .iconfont-guanbi {
        position: absolute;
        width: 20px;
        height: 20px;
        font-size: 16px;
        right: 4px;
        top: -5px;
        color: #000;
        cursor: pointer;
    }
    
    .p_module {
        width: 100px;
        float: left;
        margin: 0 12px 12px 0;
        overflow: hidden;
        background: #ccc;
    }
    
    .p_module img {
        width: 100%;
        display: block;
    }
    
    .p_module_1 {
        border-radius: 10px;
    }
    
    .p_module_2 {
        border-radius: 20px;
    }
    
    .p_module_3 {
        border-radius: 0;
    }
    
    .p_module_4 {
        border-radius: 0;
        position: relative;
    }
    
    .p_module_4:after {
        content: '';
        width: 90px;
        height: 54px;
        position: absolute;
        border: 1px solid #fff;
        left: 4px;
        top: 4px;
    }
    
    .p_module_5,
    .p_module_6 {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: relative;
        margin-right: 22px;
        margin-left: 9px;
    }
    
    .p_module_5 img,
    .p_module_6 img {
        height: 100%;
        border-radius: 50%;
    }
    
    .p_module_6 {
        border: 4px solid #666
    }
    
    .wqdComponentTextD h1 {
        font-size: 30px;
        font-weight: normal;
        line-height: 60px;
    }
    
    .wqdComponentTextD h2 {
        font-size: 24px;
        font-weight: normal;
        line-height: 60px;
    }
    
    .wqdComponentTextD h3 {
        font-size: 18px;
        font-weight: normal;
        line-height: 40px;
    }
    
    .wqdComponentTextD h4 {
        font-size: 16px;
        font-weight: normal;
        line-height: 40px;
    }
    
    .wqdComponentTextD h5 {
        font-size: 14px;
        font-weight: normal;
        line-height: 40px;
    }
    
    .wqdComponentTextD h6 {
        font-size: 12px;
        font-weight: normal;
        line-height: 40px;
    }
    /*通栏设置*/
    
    .wqdComponentBanner li {
        border: 1px solid #cfcfcf;
        border-radius: 5px;
        height: 27px;
        line-height: 27px;
        margin-bottom: 4px;
        padding: 0 10px 0 0;
        font-size: 14px;
        color: #5a5a5a;
    }
    
    .wqdComponentBanner.publicBanner li {
        border: 1px solid #e97300;
        border-radius: 5px;
        height: 27px;
        line-height: 27px;
        margin-bottom: 4px;
        padding: 0 10px 0 0;
        font-size: 14px;
        color: #5a5a5a;
        background: #fff;
    }
    
    .wqdComponentBanner.publicBanner li:hover {
        background: #ffd08e;
    }
    
    .wqdComponentBanner li .iconfont-common {
        cursor: pointer;
        width: 22px;
        height: 24px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 -2px;
    }
    
    .wqdComponentBanner li div {
        font-style: normal;
        width: 110px;
        display: inline-block;
        overflow: hidden;
        height: 25px;
        cursor: pointer;
    }
    
    .wqdComponentBanner li input {
        display: none;
        width: 110px;
        border: none;
        height: 19px;
        float: left;
        margin-top: 3px;
        color: #5a5a5a;
        font-size: 14px;
        outline: none;
    }
    
    .wqdComponentBanner li:hover {
        background: #e9f8ff;
    }
    
    .wqdComponentBanner li.selected {
        background: #e9f8ff;
    }
    
    .wqdComponentBanner li em .em_input {
        border: none;
    }
    
    .wqdComponentBanner li.add_wqdComponentBanner {
        border: 1px solid #4d93db;
        text-align: center;
    }
    
    .wqdComponentBanner li.add_wqdComponentBanner a {
        color: #4d93db;
        text-decoration: none;
    }
    
    .column {
        position: relative;
    }
    
    .column .ui-state-default {
        background: #fff!important;
    }
    
    .column .ui-state-default-hover,
    .column .ui-state-default:hover {
        background: #E9F8FF!important;
    }
    
    .column .ui-state-default span {
        font-weight: normal!important;
    }
    
    .column-info {
        background: #fff;
        position: absolute;
        top: -12px;
        left: 264px;
    }
    
    .column-info-content {
        position: relative;
        padding: 10px;
        font-family: "Microsoft YaHei";
    }
    
    .column-info-content .icon-guanbi {
        width: 16px;
        cursor: pointer;
        position: absolute;
        right: 16px;
        top: 6px;
        z-index: 100;
    }
    
    .column-info-content .hr1 {
        background: #efefef;
        width: 100%;
        height: 1px
    }
    
    .column-info-select {
        position: relative;
        padding: 10px 0 5px 80px
    }
    
    .column-info-select .fenlei {
        position: absolute;
        left: 0;
        top: 15px;
        font-weight: bold;
        display: block;
        line-height: 30px;
    }
    
    .column-info-select li {
        line-height: 40px;
        overflow: hidden;
        color: #333;
        position: relative
    }
    
    .column-info-select li a {
        display: inline-block;
        padding: 0 10px;
        margin: 5px 10px;
        color: #333;
        line-height: 30px;
        text-decoration: none
    }
    
    .column-info-select li a.selected {
        background: #32baf6;
        color: #FFF;
        border-radius: 5px;
    }
    
    .column-info-select li a:hover {
        background: #32baf6;
        color: #FFF;
        border-radius: 5px;
    }
    
    .column-info-select li .v-option {
        height: 25px;
        position: absolute;
        right: 0;
        top: 5px;
        width: 40px;
    }
    
    .column-info-select li .o-more {
        color: #005aa0;
        cursor: pointer;
        float: left;
        line-height: 30px;
        position: relative;
        text-decoration: none;
        width: 40px;
        display: none
    }
    
    .column-info-select li .o-more b {
        background: url(../../../assets/images/jtxx.gif) no-repeat scroll 0 0;
        height: 5px;
        overflow: hidden;
        position: absolute;
        right: 5px;
        top: 15px;
        width: 7px
    }
    
    .column-info-select li .o-more.fold b {
        background: url(../../../assets/images/jtxs.gif) no-repeat scroll 0 0;
    }
    
    .column-pro {
        text-align: center;
    }
    
    .column-pro .column-list {
        text-align: center;
    }
    
    .column-pro .column-empty {
        text-align: center;
        line-height: 160px;
        font-size: 18px;
        color: #aaa;
        font-weight: bold;
        cursor: pointer;
    }
    
    .column-pro .column-list li {
        position: relative;
        border: 1px solid #ccc;
        width: 240px;
        height: 160px;
        float: left;
        box-shadow: 0 0 5px #ccc;
        margin: 20px 15px;
        overflow: hidden
    }
    
    .column-pro .column-list li a {
        display: block;
        cursor: pointer
    }
    
    .column-pro .column-list li a span {
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: pointer;
        height: 40px;
        text-align: center;
        width: 100%;
        color: #FFF;
        display: block;
        line-height: 40px;
        background: url(../../../assets/images/spanbg.png) repeat
    }
    /* ver_pic */
    
    .ver_pic {
        width: 240px;
        height: 160px;
        text-align: center;
        position: relative;
        display: table-cell;
        vertical-align: middle;
    }
    
    .ver_pic .subpic {
        *position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.5px;
    }
    
    .ver_pic .subpic img {
        *position: relative;
        top: -50%;
        left: -50%;
        max-width: 100%;
        display: block;
        margin: 0 auto
    }
    
    .viewbox-bottom-content .vertical {
        width: 50%;
        float: left;
        height: 100px;
        text-align: center;
    }
    
    .viewbox-bottom-content .vertical img {
        width: auto;
        height: 100%;
        max-width: 100%;
    }
    
    .menuPage {
        margin-top: 10px;
        text-align: center;
    }
    
    .menuPage button {
        width: 70px;
        text-align: center;
        cursor: pointer;
        margin: 0 5px;
    }
    
    .left-bar-shop {
        color: #666666;
        font-size: 14px;
    }
    
    .left-bar-shop h3 {
        font-size: 14px;
        font-weight: normal;
        border-bottom: solid 1px #cccccc;
        color: #000000;
    }
    
    .shoplugs li {
        width: 115px;
        float: left;
        margin-right: 2px;
    }
    
    .shop_nav_set_body {
        margin-top: 15px;
    }
    
    .shop_nav_set .set_bar {
        float: right;
        line-height: 20px;
        width: 42px;
        height: 22px;
        padding: 1px;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
    }
    
    .shop_nav_set .set_bar .isShow {
        height: 18px;
        width: 18px;
        line-height: 18px;
        text-align: center;
    }
    
    .shop_nav_set .set_bar .bar {
        background: #d0dbfb;
        cursor: pointer;
        height: 18px;
        width: 18px;
    }
</style>