import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index.vue'
import Address from '../components/index/address.vue'
Vue.use(Router)
export default new Router({
    // mode: 'history',
    routes: [

        {
            path:'/address',
            component:Address
        },
        {
            path: '/',
            component: Index
        },
    ]
})
