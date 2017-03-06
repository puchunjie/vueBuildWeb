<template>
<div class="menu bst-module draggle-module smartMenu move" 
:id="module.moduleId" 
:class="module.moduleId + 'styles'" 
@mousemove="eventInit">
    <ul class="ul1">
        <template v-for="(nav1,index) in module.moduleSet.navs" v-if="nav1.isDisplay!='0'">
            <li class="nav1">
                <a class="lia1" :data-pageid="nav1.pageId">
                    {{ nav1.name }}
                    <p class="ename1"  v-show="module.moduleSet.advancedSetting.enameshow">{{nav1.ename }}</p>
                </a>
                <ul class="ul2" v-if="nav1.navs && nav1.navs.length>0">
                    <li v-for="nav2 in nav1.navs" class="nav2" v-if="nav2.isDisplay!='0'">
                        <a class="lia2" :data-pageid="nav2.pageId">{{ nav2.name }}</a>
                    </li>
                </ul>
            </li>
            <div class="mid" v-if="index!=(module.moduleSet.navs.length-1)"></div>       
        </template>
</ul>
</div>
</template>


<script>
    require('./menubase.css');
    import modulemixin from '../moduleMixin.js';

    export default {
        mixins: [modulemixin],
        data() {
            return {
                ishover: false
            }
        },
        mounted: function() {
            $("#" + this.module.moduleId).find(".nav1").eq(0).addClass("nav1active");
        }

    }
</script>
<style>
    /**基础导航**/
    
    .menu:after,
    .menu ul:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
        overflow: hidden;
    }
    
    .menu>ul>li {
        float: left;
    }
    
    .menu .nav1_ename {
        margin: 0;
        padding: 0;
    }
    
    .moveFloat {
        background: #eee;
        position: relative;
        width: 100%;
    }
    
    .menu li .ul2 {
        min-width: 100%;
        display: none;
    }
    
    .menu li:hover .ul2 {
        display: block;
    }
    
    .menu li p {
        margin: 0;
        padding: 0;
    }
    
    .menu.move {
        cursor: move;
    }
</style>