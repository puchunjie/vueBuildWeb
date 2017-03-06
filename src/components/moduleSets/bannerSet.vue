<template>
    <el-dialog title="通栏设置" v-model="bannerSet.ishide" size="small">
        <div class="bannerManage">
            <el-tabs type="border-card">
                <el-tab-pane label="整体设置">
                    <background-set :backgroundData="backgroundData1" :elementTarget="'out'" :isBack="true" :mode="'banner'"></background-set>
                    <border-set :borderData="borderData" :elementTarget="'out'" :onRadius="false" :mode="'banner'"></border-set>
                </el-tab-pane>
                <el-tab-pane label="内容背景设置">
                    <background-set :backgroundData="backgroundData2" :elementTarget="'in'" :isBack="true" :mode="'banner'"></background-set>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-dialog>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex';

    import {
        backgroundSet,
        borderSet
    } from './styleSpareParts';

    export default {
        components: {},
        computed: {
            ...mapGetters([
                'bannerSet',
                'getSelectBanner'
            ])
        },
        components: {
            backgroundSet,
            borderSet
        },
        methods: {

        },
        created() {

        },
        mounted() {
            this.backgroundData1 = {
                "background-color": this.getSelectBanner.settings.background.out["background-color"],
                "background-image": this.getSelectBanner.settings.background.out["background-image"],
                "background-position": this.getSelectBanner.settings.background.out["background-position"],
                "background-repeat": this.getSelectBanner.settings.background.out["background-repeat"],
                "background-size": this.getSelectBanner.settings.background.out["background-size"],
            };
            this.backgroundData2 = {
                "background-color": this.getSelectBanner.settings.background.in["background-color"],
                "background-image": this.getSelectBanner.settings.background.in["background-image"],
                "background-position": this.getSelectBanner.settings.background.in["background-position"],
                "background-repeat": this.getSelectBanner.settings.background.in["background-repeat"],
                "background-size": this.getSelectBanner.settings.background.in["background-size"],
            };
            let borderTopArr = this.getSelectBanner.settings.background.out['border-top'].split(" ");
            let borderBottomArr = this.getSelectBanner.settings.background.out['border-bottom'].split(" ");
            this.borderData = {
                "border-top-width": parseInt(borderTopArr[0]),
                "border-top-style": borderTopArr[1],
                "border-top-color": borderTopArr[2],
                "border-bottom-width": parseInt(borderBottomArr[0]),
                "border-bottom-style": borderBottomArr[1],
                "border-bottom-color": borderBottomArr[2]
            }
        },
        data() {
            return {
                backgroundData1: {},
                backgroundData2: {},
                borderData: {}
            }
        }
    }
</script>
<style>
    .el-dialog--small {
        min-width: 740px;
    }
</style>