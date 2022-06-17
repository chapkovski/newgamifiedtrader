import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";
// import VueNativeSock from "vue-native-websocket";
import BreathingColors from "vue-breathing-colors";
import "animate.css";
Vue.use(BreathingColors);
import VueParticlesBg from "particles-bg-vue";
Vue.prototype.$gamified = window.gamified;
Vue.use(VueParticlesBg);
import vueAwesomeCountdown from "vue-awesome-countdown";
Vue.use(vueAwesomeCountdown, "vac"); 

import "vuetify/dist/vuetify.min.css";

import store from "./store";
Stock(Highcharts);
Vue.use(HighchartsVue);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
