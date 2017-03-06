<template>
    <div class="font-viewbox">
        <el-tabs v-model="activeName">
            <el-tab-pane :label="moduleInfo.bar.subList[0].name" name="first">
                    <ul class="font-body">
                        <li data-base="true" class="draggle-module side-module"
                        v-for="view in moduleInfo.bar.subList[0].views"
                        :class="view.keyName"
                        :jsonkey="view.id">
                            <p :style="{fontSize:view.value+'px'}">{{view.name}}</p>
                        </li>
                    </ul>
            </el-tab-pane>
            <el-tab-pane :label="moduleInfo.bar.subList[1].name" name="second">
                 <ul class="font-body">
                    <li data-base="true" class="draggle-module side-module"
                        v-for="view in moduleInfo.bar.subList[1].views"
                        :class="view.keyName"
                        :jsonkey="view.id">
                        <p :style="{fontSize:view.value+'em',fontWeight:'bold'}">{{view.name}}</p>
                    </li>
                </ul>   
            </el-tab-pane>
        </el-tabs>
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
        data() {
            return {
                activeName: 'first'
            }
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
    .font-body li {
        width: 230px;
    }
    
    .font-body li {
        margin-bottom: 15px;
        width: 100%;
        cursor: move;
    }
    
    .font-body li h1,
    .font-body li h2,
    .font-body li h3,
    .font-body li h4,
    .font-body li h5,
    .font-body li h6 {
        font-size: 1em;
    }
</style>