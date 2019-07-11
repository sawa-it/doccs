import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCu22ojPTS29LXHZfvPlSIx6Y96AxE6EGg",
  authDomain: "doccs-dev.firebaseapp.com",
  databaseURL: "https://doccs-dev.firebaseio.com",
  projectId: "doccs-dev",
  storageBucket: "doccs-dev.appspot.com",
  messagingSenderId: "529408163459",
  appId: "1:529408163459:web:d6e6d26574e88ad3"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
