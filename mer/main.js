import Vue from 'vue'
import App from './App'
import store from './store.js'

import Net from './Net'

Vue.prototype.$net = Net;

import basics from './pages/basics/home.vue'
Vue.component('basics', basics)
import home from './pages/index/home.vue'
Vue.component('home', home)
import product from './pages/index/product.vue'
Vue.component('product', product)
import shop from './pages/index/shop.vue'
Vue.component('shop', shop)
import order from './pages/index/order.vue'
Vue.component('order', order)
import orderSale from './pages/index/orderSale.vue'
Vue.component('orderSale', orderSale)
 
import sku from './components/sku.vue'
Vue.component('sku', sku)
import orderPay from './components/orderPay.vue'
Vue.component('orderPay', orderPay)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store

})
app.$mount()
