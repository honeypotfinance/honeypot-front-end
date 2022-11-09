export default {
  computed: {
    baseUrl() {
      return this.$axios.defaults.baseURL
    },
    isLogged() {
      return this.$store.state.isLogged
    },
    user() {
      return this.$store.state.dataUser
    },
  }
}
