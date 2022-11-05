import Vue from 'vue'
import App from './App'
 
  

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import sku from 'components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue'
 Vue.component('vk-data-goods-sku-popup',sku)
 import skuNum from 'components/vk-data-input-number-box/vk-data-input-number-box.vue'
 Vue.component('vk-data-input-number-box',skuNum)
import Net from './Net'  
 
Vue.prototype.$net = Net;


Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
    ...App
})
app.$mount()

 



