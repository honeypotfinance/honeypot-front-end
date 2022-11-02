import * as VueGoogleMaps from 'vue2-google-maps';
import VueGeolocation from 'vue-browser-geolocation';
import Vue from 'vue'

// google maps
Vue.use(VueGoogleMaps, {
  load: {
    key: '',
  },
})
// geolocation
Vue.use(VueGeolocation);

export default (VueGoogleMaps, VueGeolocation);
