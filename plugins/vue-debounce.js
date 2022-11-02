import Vue from 'vue'
import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce)

// Or if you want to pass in the lock option
// Vue.use(vueDebounce, {
//   lock: true
// })

// Setting a different event to listen to
// Vue.use(vueDebounce, {
//   listenTo: 'input'
// })

// Listening to multiple events
// Vue.use(vueDebounce, {
//   listenTo: ['input', 'keyup', 'change']
// })

// Setting a default timer This is set to '300ms' if not specified
// Vue.use(vueDebounce, {
//   defaultTime: '700ms'
// })
