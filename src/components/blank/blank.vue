<template>
    <a class="bst-module draggle-module blank-module smartMenu" :id="module.moduleId" :class="module.moduleId + 'styles'" @mousemove="eventInit">

         <span class="move" >

         </span>
        <!--<div class="picBox">-->
            <!--&lt;!&ndash;<img :src="module.moduleSet.advancedSetting.imgUrl" class="picture">&ndash;&gt;-->
            <!--&lt;!&ndash;<img :src="module.moduleSet.advancedSetting.imgUrl_1" class="coverPic" v-if="isCover">&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="lines" v-if="covers"></i>&ndash;&gt;-->
        <!--</div>-->

    </a>
</template>
<script>
require('./blank.css');
import {
    commonEventInit
} from 'commonEventInit';
import modulemixin from '../moduleMixin.js';
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    mixins: [modulemixin],
    computed: {

    },
    mounted: function() {
    },
    watch: {
    },
    methods: {
        ...mapActions([
            'modifyModuleStyle',
            'openLinkSet'
        ])

    }
}
</script>
<style>
.blank-module {
    position: absolute
}
.blank-module .move{
    width: 100%;
    height: 100%;
    display: block;
}
.blank-module .picBox {
    overflow: hidden;
    height: 100%;
    position: relative
}

.blank-module .lines {
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    border: 1px solid #fff
}

.blank-module img {
    vertical-align: top;
}

.blank-module .cover .coverPic{
    display: none;
}
.blank-module .cover:hover .coverPic {
    display: block;
}
.blank-module .cover:hover .picture {
    display: none;
}
</style>
