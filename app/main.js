import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'
import firebase from "nativescript-plugin-firebase";

import Login from '@/components/Login';

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')



firebase.init({
  // optional but useful to immediately re-logon the user when he re-visits your app
  onAuthStateChanged: (data) => {
    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
    if (data.loggedIn) {
      console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
      console.dir(data);
    }
  },

}).then(instance => {
  console.log("firebase.init done");
}).catch(err => {
  console.log("Firebase init error: " + err);
});

new Vue({
  render: h => h('frame', [h(Login)])
}).$start()
