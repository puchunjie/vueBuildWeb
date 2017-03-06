<template>
    <template-manage v-if="tplMangeHide.is" :ishide="tplMangeHide"></template-manage> 
</template>

<script>
    import templateManage from '../components/publicmodules/spareParts/templatemanage.vue';

    export default {
        components: {
            templateManage
        },
        data() {
            return {
                tplMangeHide: {
                    is: true
                }
            }
        }
    }
</script>