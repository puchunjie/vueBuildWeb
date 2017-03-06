<template>
	<div class="bst-module draggle-module smartMenu hline-module bst-move"
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
                    handles:'e,w'
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
    .hline-module .line{
        width: 100%;
        height: 0;
        border-top-width: 1px;
    }
    .hline-module:hover{
        padding-bottom: 20px;
    }
    .hline-module:after{
        width: 100%;
        content: "";
        display: block;
        position: absolute;
        height: 10px;
        top:50%;
        margin-top: -5px;
    }
</style>