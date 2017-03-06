import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import store from '../store'
import router from './routes'
import directives from './directives'

Vue.use(Element);

router.beforeEach((to, from, next) => {
    // console.log(to);
    next()
})

new Vue({
    el: "#app",
    router,
    store
})