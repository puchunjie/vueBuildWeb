<template>
    <ul class="clearfix left-side-banner">
        <li data-base="true" class="draggle-module side-module"  
        v-for="view in moduleInfo.bar.views"
        :isBanner="view.keyName"
        :jsonkey="view.id">
            <img :src="view.value">
            <p class="name">{{ view.name }}</p>
        </li>
    </ul>
</template>

<script>
    import {
        dragInit
    } from '../../../methods/common/moduleDragInit'
    export default {
        props: {
            moduleInfo: Object,
            ishide: Boolean
        },
        mounted: function() {
             dragInit(this);
            $(this.$el).find("li").hover(function() {
                $(this).find(".name").fadeIn();
            }, function() {
                $(this).find(".name").fadeOut();
            })
        },
        updated: function() {
             dragInit(this);
            $(this.$el).find("li").hover(function() {
                $(this).find(".name").fadeIn();
            }, function() {
                $(this).find(".name").fadeOut();
            })
        }
    }
</script>

<style>
    .left-side-banner {
        width: 100%;
    }
    
    .left-side-banner li {
        width: 230px;
        position: relative;
        margin-bottom: 10px;
        cursor: move;
    }
    
    .left-side-banner li img {
        display: block;
        width: 100%;
    }
    
    .left-side-banner li p {
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
</style>