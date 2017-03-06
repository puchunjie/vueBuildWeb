<template>
    <div class="bst-module draggle-module smartMenu vline-module bst-move"
         :id="module.moduleId"
         :class="module.moduleId + 'styles'"
         @mousemove="eventInit">
        <div class="line"></div>
    </div>
</template>
<script>
    import {
            commonEventInit
    } from 'commonEventInit';
    import modulemixin from '../../moduleMixin.js';
    export default {
        mixins: [modulemixin],
        computed:{

        },
        methods:{
            eventInit: function() {
                let _this = this
                commonEventInit({
                    vm: this,
                    handles:'n,s'
                });
            },
        },
        data(){
            return {

            }
        }
    }

</script>
<style>
.vline-module:after{
        height: 100%;
        content: "";
        display: block;
        position: absolute;
        width: 10px;
        left:50%;
        top: 0;
        margin-left: -5px;
    }
</style>