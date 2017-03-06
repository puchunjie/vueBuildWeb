<template>
    <div>
        <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            custom-item="my-item-zh"
            placeholder="请输入内容"
            @select="handleSelect"
        ></el-autocomplete>
    </div>
</template>

<script>
    import Vue from 'vue'
        Vue.component('my-item-zh', {
            functional: true,
            render: function (h, ctx) {
                var item = ctx.props.item;
                return h('li', ctx.data, [
                    h('div', { attrs: { class: 'name' } }, [item[value]])
                ]);
            },
            props: {
                item: { type: Object, required: true }
            }
     });
    export default{
        name:"my-autocomplete",
        props:{
            state:{
                type:String,
                default:''
            },
            value:{
                type:String,
                default:''
            }

        },
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
<style>

</style>
