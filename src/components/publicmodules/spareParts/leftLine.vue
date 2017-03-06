<template>
    <div class="line-viewbox">
        <ul class="clearfix">
                    <li data-base="true" class="draggle-module side-module line_x" v-for="(view,index) in moduleInfo.bar.subList[0].views" :jsonkey="view.id">
                        <img :src="view.value">
                    </li>
        </ul>
        <ul class="clearfix v">
            <li data-base="true" class="draggle-module side-module line_y" v-for="(view,index) in moduleInfo.bar.subList[1].views" :jsonkey="view.id">
                <img :src="view.value">
            </li>
        </ul>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    import {
        dragInit
    } from '../../../methods/common/moduleDragInit'
    export default {
        props: {
            moduleInfo: Object
        },
        methods: {
            ...mapActions([
                'closeModuleView'
            ])
        },
        mounted: function() {
             dragInit(this)
        },
        updated: function() {
             dragInit(this)
        }

    }
</script>
<style>
    .line-viewbox .line_x {
        width: 230px;
    }
    
    .line-viewbox li {
        margin-bottom: 15px;
        cursor: move;
    }
    
    .line-viewbox li img {
        max-width: 100%;
    }
    .line-viewbox .v{
        padding-left: 15px;
    }
    
    .line-viewbox .line_y {
        width: 28%;
        height: 100px;
        float: left;
        margin: 0 1%;
        text-align: center;
        overflow: hidden;
    }
    /* .line-viewbox .line_y img{
        height: 100%;
    } */
</style>