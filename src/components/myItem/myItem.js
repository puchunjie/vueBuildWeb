import Vue from 'vue'
Vue.component('my-item-zh', {
    functional: true,
    render: function (h, ctx) {
        var item = ctx.props.item;
        return h('li', ctx.data, [
            h('div', { attrs: { class: 'name' } }, [item.title])
        ]);
    },
    props: {
        item: { type: Object, required: true }
    }
});