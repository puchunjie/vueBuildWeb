<template>
    <div class="atlasPiano bst-module draggle-module smartMenu move"
         :class="module.moduleId + 'styles'"
         :id="module.moduleId" @mousemove="eventInit">
        <div class="atlasPiano-wrap">
            <div class="item" v-for="(el,index) in list" :style="{background:'url('+el.imgUrl+') center center no-repeat',backgroundSize:'cover'}">
                <a v-bind="{'_href':el.href,target:el.target}">
                    <span class='name' v-show="module.moduleSet.advancedSetting.titleShow"><em>{{el.title}}</em></span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import modulemixin from '../../moduleMixin.js';
    import {
            commonEventInit
    } from 'commonEventInit';
    export default {
        mixins: [modulemixin],
        mounted() {
            $(this.$el).find(".atlasPiano-wrap").fsSlider();
        },
        computed:{
            list (){
                return this.module.moduleSet.list

            }
        },
        methods: {
            eventInit: function () {
                let _this = this
                commonEventInit({
                    vm: this,
                    resizeStop: function () {
                        $(_this.$el).find(".atlasPiano-wrap").fsSlider();
                    }
                });
            }
        },
        watch:{
            list:{
                handler(){
                    var _this = this
                    setTimeout(function(){
                        $(_this.$el).find(".atlasPiano-wrap").fsSlider();
                    },100)
                },
                deep:true
            }
        }
    }
</script>
<style>
    .atlasPiano {
        position: absolute;
    }
    .atlasPiano .atlasPiano-wrap {
        width:100%;
        height:100%;
        position: relative;
        overflow: hidden;
    }
    .atlasPiano .atlasPiano-wrap .item{
        height:100%;
        position:absolute;
        cursor:pointer;
    }
    .atlasPiano .atlasPiano-wrap .item a {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .atlasPiano .atlasPiano-wrap .item img {
        width: 100%;
    }
    .atlasPiano .atlasPiano-wrap .item span {
        position: absolute;
        width: 100%;
        bottom: 0;
        left:0;
        line-height: 25px;
        background-color: #000;
        text-align: left;
    }
    .atlasPiano .atlasPiano-wrap .item span em{
        padding: 0 10px;
    }
</style>