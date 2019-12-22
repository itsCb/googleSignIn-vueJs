import Vue from 'vue'
import GoogleSignIn from './GoogleSignIn.vue'

Vue.config.productionTip = false;

new Vue({
    render: h => h(GoogleSignIn),
}).$mount('#app');
