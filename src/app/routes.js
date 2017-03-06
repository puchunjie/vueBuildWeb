import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//  404组件
const NotFoundComponent = resolve => require(['pages/404.vue'], resolve); //lazy load
//主界面
const main = resolve => require(['pages/main.vue'], resolve);
const templateSelect = resolve => require(['pages/templateSelect.vue'], resolve);


export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/build/page/:siteMode-:siteid-:memberid-:pageid',
            name: 'main',
            component: main
        },
        {
            path: '/build/banner/:siteMode-:columnid-:memberid',
            name: "bannerMake",
            component: main
        },
        {
            path: '/build/tplselect/:siteid',
            name: "templateSelect",
            component: templateSelect
        },
        { path: '*', component: NotFoundComponent }
    ]
});