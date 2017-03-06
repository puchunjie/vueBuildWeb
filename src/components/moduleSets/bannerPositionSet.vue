<template>
        <el-tabs  type="border-card" class="bannerPositionSet">
            <el-tab-pane label="横幅设置">
                <span class="bannerPositionSet-name">图片位置：</span>
                <el-select v-model="active" placeholder="请选择" class="bannerPositionSet-sel" @change="setPosition">
                    <el-option
                      v-for="item in positionData"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-tab-pane>
        </el-tabs>
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
                backgroundSize:'',
                backgroundPosition:'',
                positionData: [
                    {
                        label:"上",
                        value:"top"
                    },
                    {
                        label:"居中",
                        value:"center"
                    },
                    {
                        label:"下",
                        value:"bottom"
                    },
                    {
                        label:"自适应",
                        value:"auto"
                    }
                ]
            }
        },
        created() {
            if(this.getModuleData.moduleSet.advancedSetting.position){
                if(this.getModuleData.moduleSet.advancedSetting.position.backgroundPosition=='center top'){
                    this.active='top';
                }else if(this.getModuleData.moduleSet.advancedSetting.position.backgroundPosition=='center center' && this.getModuleData.moduleSet.advancedSetting.position.backgroundSize=='auto'){
                    this.active='center';
                }else if(this.getModuleData.moduleSet.advancedSetting.position.backgroundPosition=='center bottom'){
                    this.active='bottom';
                }else if(this.getModuleData.moduleSet.advancedSetting.position.backgroundSize=='cover'){
                    this.active='auto';
                }
            }else{
                this.active='top';
            }
            
        },
        mounted() {},
        computed: {
            ...mapGetters([
                'getModuleData'
            ]),

        },
        methods: {
            ...mapActions([
                'modifyModuleData'
            ]),
            setPosition(){
                let obj={};
                if(this.active=='top'){
                    obj.backgroundPosition="center top";
                    obj.backgroundSize="auto";
                }else if(this.active=='center'){
                    obj.backgroundPosition="center center";
                    obj.backgroundSize="auto";
                }else if(this.active=='bottom'){
                    obj.backgroundPosition="center bottom";
                    obj.backgroundSize="auto";
                }else if(this.active=='auto'){
                    obj.backgroundPosition="center center";
                    obj.backgroundSize="cover";
                }
                this.getModuleData.moduleSet.advancedSetting.position=obj;
            }
            
        }
    }
</script>
<style>
.bannerPositionSet{
    height: 300px;
}
.bannerPositionSet-name{
    float: left;
    height: 35px;
    line-height: 35px;
    margin-right: 25px;
    color: #787878;
}
.bannerPositionSet-sel{
    width: 200px;
    float: left;
}
</style>