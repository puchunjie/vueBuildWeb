<template>
       <div class="product_left_focus">
                               	<div class="focus_title">商品精选</div>
                                   <dl>
                               	<dt><a><img src="" alt=""></a></dt>
                                   <dd>￥12.8</dd>
                                   <dd><a>武汉热干面武汉热干面武汉热干面武汉热干面</a></dd>
                                   <p>已有<span>37</span>人评价</p>
                               </dl>
                               <dl>
                               	<dt><a><img src="" alt=""></a></dt>
                                   <dd>￥12.8</dd>
                                   <dd><a>武汉热干面武汉热干面武汉热干面武汉热干面</a></dd>
                                   <p>已有<span>37</span>人评价</p>
                               </dl>
                               </div>
</template>

<script>
    require('./style.css')

    export default {
        name: 'foucs',
        props: {
            drag: Object,
            dragIndex: null
        }
    }
</script>