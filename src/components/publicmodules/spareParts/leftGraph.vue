<template>
    <div class="left-graph">
        <ul class="clearfix" :class="{'v':subList.moduleType=='line_y'}" v-if="moduleInfo.bar.subList" v-for="subList in moduleInfo.bar.subList">
            <li data-base="true" class="draggle-module side-module" :class="subList.moduleType" v-for="(view,index) in subList.views" :jsonkey="view.id">
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
    .left-graph ul{
        margin-bottom: 15px;
    }
    .left-graph .line_x {
        width: 230px;
    }
    
    .left-graph li {
        margin-bottom: 10px;
        cursor: move;
    }
    
    .left-graph li img {
        max-width: 100%;
    }
    .left-graph .v{
        padding-left: 15px;
        margin-bottom: 30px;
    }
    
    .left-graph .line_y {
        width: 28%;
        height: 100px;
        float: left;
        margin: 0 1%;
        text-align: center;
        overflow: hidden;
    }
</style>