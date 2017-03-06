<template>
    <ul class="coordinate-content">
        <li>
            <el-input v-model="x" size="mini" :disabled="true"><template slot="prepend">X:</template></el-input>
</li>
<li>
    <el-input v-model="y" size="mini" :disabled="true"><template slot="prepend">Y:</template></el-input>
</li>
<li>
    <el-input v-model="w" size="mini" :disabled="true"><template slot="prepend">W:</template></el-input>
</li>
<li>
    <el-input v-model="h" size="mini" :disabled="true"><template slot="prepend">H:</template></el-input>
</li>
</ul>
</template>

<script>
    export default {
        props: {
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            w: {
                type: Number,
                default: 0
            },
            h: {
                type: Number,
                default: 0
            }
        },
        methods: {

        },
        mounted: function() {

        },
        data() {
            return {

            }
        }
    }
</script>

<style>
    .coordinate-content {
        height: 40px;
    }
    
    .coordinate-content li {
        float: left;
        margin-top: 8px;
        width: 65px;
    }
    
    .coordinate-content li .el-input-group__prepend {
        background-color: transparent;
        border: none;
    }
    
    .coordinate-content li .el-input-group__prepend,
    .coordinate-content li .el-input__inner {
        border-radius: 0;
        padding: 0 5px;
    }
</style>