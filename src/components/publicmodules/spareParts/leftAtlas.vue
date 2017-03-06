<template>
    <ul class="clearfix left-atlas">
        <li data-base="true" class="draggle-module side-module" 
        v-for="view in moduleInfo.bar.views"
        :jsonkey="view.id">
            <img :src="view.value">
        </li>
    </ul>
</template>
<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        props: {
            moduleInfo: Object,
            ishide: Boolean
        },
        data() {
            return {
                isVertical: false,
                num: 0
            }
        },
        methods: {
            ...mapActions([
                'closeModuleView'
            ])

        }
    }
</script>
<style>
    .left-atlas li {
        width: 80%;
        text-align: center;
        margin: 0 auto 5px;
    }
    
    .left-atlas li img {
        width: 100%;
    }
</style>