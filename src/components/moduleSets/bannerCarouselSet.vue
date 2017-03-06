<template>
    <el-radio-group v-model="active" @change="save">
        <el-radio-button v-for="(item,index) in excessive" :label="item"></el-radio-button>
    </el-radio-group>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    export default {
        data() {
            return {
                active: '',
                excessive: [
                    'cubeH',
                    'cubeV',
                    'fade',
                    'sliceH',
                    'sliceV',
                    'slideH',
                    'slideV',
                    'scale',
                    'blockScale',
                    'kaleidoscope',
                    'fan',
                    'blindH',
                    'blindV'
                ]
            }
        },
        mounted() {
            this.active = this.getModuleData.moduleSet.advancedSetting.transition;
        },
        computed: {
            ...mapGetters([
                'getModuleData'
            ]),
        },
        methods: {
            ...mapActions([
                'modifyModuleData'
            ]),
            save() {
                let module = this.getModuleData;
                module.moduleSet.advancedSetting.transition = this.active;
                this.modifyModuleData(module);
            }
        }
    }
</script>