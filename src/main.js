import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router.js";
import store from "./store/store";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
